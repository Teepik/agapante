"use client";

export function DeleteLeadButton({ leadName }: { leadName: string }) {
  return (
    <button
      type="submit"
      onClick={(event) => {
        const ok = window.confirm(
          `Supprimer définitivement la demande de ${leadName} ? Cette action est irréversible.`
        );
        if (!ok) event.preventDefault();
      }}
      className="mt-4 rounded-full border border-amber-sig/40 px-5 py-2.5 text-[0.84rem] text-amber-sig transition-colors hover:bg-amber-sig/10"
    >
      Supprimer cette demande
    </button>
  );
}
