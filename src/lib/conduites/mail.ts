/** Envoi transactionnel via Brevo. Sans clé API, les messages sont seulement journalisés. */

export function appUrl(req?: Request): string {
  const env = process.env.CONDUITES_APP_URL || process.env.NEXT_PUBLIC_SITE_URL;
  if (env) return env.replace(/\/$/, "");
  if (req) {
    const h = req.headers;
    const host = h.get("x-forwarded-host") ?? h.get("host");
    if (host) return `${h.get("x-forwarded-proto") ?? "https"}://${host}`;
  }
  return "https://agapante.com";
}

export type Mail = { to: { email: string; name?: string }[]; subject: string; html: string; text: string };

export async function sendMail(mail: Mail): Promise<boolean> {
  const key = process.env.BREVO_API_KEY;
  const from = { email: process.env.MAIL_FROM || "conduites@agapante.com", name: process.env.MAIL_FROM_NAME || "Conduites" };
  if (!key) {
    console.log(`[mail simulé] à ${mail.to.map(t => t.email).join(", ")} — ${mail.subject}`);
    return false;
  }
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": key, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({ sender: from, to: mail.to, subject: mail.subject, htmlContent: mail.html, textContent: mail.text }),
  });
  if (!res.ok) console.error("[mail] Brevo", res.status, await res.text().catch(() => ""));
  return res.ok;
}

const escapeHtml = (s: string) => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));

/** Gabarit sobre, lisible sur mobile, sans image. */
export function layout(title: string, paragraphs: string[], cta?: { label: string; url: string }): { html: string; text: string } {
  const p = paragraphs.map(t => `<p style="margin:0 0 14px;font-size:16px;line-height:1.5;color:#181a1f">${escapeHtml(t)}</p>`).join("");
  const button = cta ? `<p style="margin:22px 0 0"><a href="${cta.url}" style="display:inline-block;background:#1754d6;color:#fff;text-decoration:none;font-weight:600;font-size:15px;padding:12px 20px;border-radius:12px">${escapeHtml(cta.label)}</a></p>` : "";
  const html = `<!doctype html><html lang="fr"><body style="margin:0;background:#f7f6f3;padding:28px 16px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
<div style="max-width:520px;margin:0 auto;background:#fff;border-radius:20px;padding:28px;border:1px solid #e6e4df">
<p style="margin:0 0 18px;font-size:13px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#8f95a0">Conduites</p>
<h1 style="margin:0 0 16px;font-size:22px;line-height:1.25;color:#181a1f">${escapeHtml(title)}</h1>
${p}${button}
<p style="margin:26px 0 0;font-size:12px;color:#8f95a0">Vous recevez ce message parce que les rappels sont activés dans votre espace Famille. Vous pouvez les désactiver à tout moment.</p>
</div></body></html>`;
  const text = [title, "", ...paragraphs, cta ? `\n${cta.label} : ${cta.url}` : ""].join("\n");
  return { html, text };
}
