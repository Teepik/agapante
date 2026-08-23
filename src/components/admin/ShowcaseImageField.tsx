"use client";

import { useId, useState } from "react";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_BYTES = 4 * 1024 * 1024;

type Props = {
  currentUrl?: string | null;
  displayUrl?: string | null;
  required?: boolean;
  onUploadingChange?: (uploading: boolean) => void;
};

function mimeFromFilename(name: string): string | null {
  const ext = name.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    case "gif":
      return "image/gif";
    default:
      return null;
  }
}

function extensionForFile(file: File): string {
  const fromName = file.name.split(".").pop()?.toLowerCase();
  if (fromName && ["jpg", "jpeg", "png", "webp", "gif"].includes(fromName)) {
    return fromName === "jpeg" ? "jpg" : fromName;
  }
  switch (file.type) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    default:
      return "jpg";
  }
}

export function ShowcaseImageField({
  currentUrl,
  displayUrl,
  required = true,
  onUploadingChange,
}: Props) {
  const inputId = useId();
  const initialPreview = displayUrl ?? currentUrl ?? null;
  const [imageUrl, setImageUrl] = useState(currentUrl ?? "");
  const [preview, setPreview] = useState<string | null>(initialPreview);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const setUploadState = (next: boolean) => {
    setUploading(next);
    onUploadingChange?.(next);
  };

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");
    const mime = file.type || mimeFromFilename(file.name);
    if (!mime || !ALLOWED_TYPES.has(mime)) {
      setError("Format non pris en charge. Utilisez JPG, PNG, WebP ou GIF.");
      event.target.value = "";
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("L'image dépasse la taille maximale de 4 Mo.");
      event.target.value = "";
      return;
    }

    setUploadState(true);
    setFileName(file.name);
    setPreview((previous) => {
      if (previous?.startsWith("blob:")) URL.revokeObjectURL(previous);
      return URL.createObjectURL(file);
    });

    try {
      const body = new FormData();
      body.append("file", file);

      const response = await fetch("/api/admin/showcase/upload", {
        method: "POST",
        body,
        credentials: "same-origin",
      });

      const payload = (await response.json().catch(() => null)) as {
        url?: string;
        previewUrl?: string;
        error?: string;
      } | null;
      if (!response.ok || !payload?.url) {
        throw new Error(payload?.error ?? "Impossible de téléverser l'image.");
      }

      setImageUrl(payload.url);
      setPreview(payload.previewUrl ?? payload.url);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Impossible de téléverser l'image. Réessayez dans quelques instants."
      );
      setImageUrl(currentUrl ?? "");
      setPreview(displayUrl ?? currentUrl ?? null);
      setFileName(null);
      event.target.value = "";
    } finally {
      setUploadState(false);
    }
  };

  return (
    <div>
      <input type="hidden" name="imageUrl" value={imageUrl} />
      {currentUrl && !imageUrl ? (
        <input type="hidden" name="existingImageUrl" value={currentUrl} />
      ) : null}

      {preview ? (
        <div className="mt-2 overflow-hidden rounded-[12px] border border-ink-600 bg-ink-900/40">
          <img src={preview} alt="" className="max-h-52 w-full object-cover" />
        </div>
      ) : null}

      <input
        id={inputId}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,.jpg,.jpeg,.png,.webp,.gif"
        required={required && !currentUrl && !imageUrl}
        disabled={uploading}
        onChange={onFileChange}
        className="mt-3 block w-full cursor-pointer text-[0.86rem] text-chalk-dim file:mr-3 file:cursor-pointer file:rounded-full file:border-0 file:bg-chalk/10 file:px-4 file:py-2 file:text-[0.82rem] file:font-medium file:text-chalk hover:file:bg-chalk/15 disabled:cursor-not-allowed disabled:opacity-60"
      />

      {uploading ? (
        <p className="mt-2 text-[0.78rem] text-iris-300">Téléversement en cours…</p>
      ) : null}

      {error ? (
        <p role="alert" className="mt-2 text-[0.78rem] text-amber-sig">
          {error}
        </p>
      ) : null}

      <p className="mt-2 text-[0.78rem] text-mute-dim">
        {uploading
          ? "Patientez pendant l'envoi de l'image."
          : fileName
            ? `Image prête : ${fileName}`
            : currentUrl
              ? "L'image actuelle est conservée si vous n'en choisissez pas une nouvelle."
              : "JPG, PNG, WebP ou GIF — 4 Mo maximum."}
      </p>
    </div>
  );
}
