"use client";

import { useId, useState } from "react";

type Props = {
  currentUrl?: string | null;
  required?: boolean;
};

export function ShowcaseImageField({ currentUrl, required = true }: Props) {
  const inputId = useId();
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const [fileName, setFileName] = useState<string | null>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setPreview((previous) => {
      if (previous?.startsWith("blob:")) URL.revokeObjectURL(previous);
      return URL.createObjectURL(file);
    });
  };

  return (
    <div>
      {currentUrl ? <input type="hidden" name="existingImageUrl" value={currentUrl} /> : null}

      {preview ? (
        <div className="mt-2 overflow-hidden rounded-[12px] border border-ink-600 bg-ink-900/40">
          <img src={preview} alt="" className="max-h-52 w-full object-cover" />
        </div>
      ) : null}

      <input
        id={inputId}
        name="image"
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        required={required && !currentUrl}
        onChange={onFileChange}
        className="mt-3 block w-full cursor-pointer text-[0.86rem] text-chalk-dim file:mr-3 file:cursor-pointer file:rounded-full file:border-0 file:bg-chalk/10 file:px-4 file:py-2 file:text-[0.82rem] file:font-medium file:text-chalk hover:file:bg-chalk/15"
      />

      <p className="mt-2 text-[0.78rem] text-mute-dim">
        {fileName
          ? `Fichier sélectionné : ${fileName}`
          : currentUrl
            ? "L'image actuelle est conservée si vous n'en choisissez pas une nouvelle."
            : "JPG, PNG, WebP ou GIF — 5 Mo maximum."}
      </p>
    </div>
  );
}
