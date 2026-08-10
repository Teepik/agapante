import "server-only";

type NotifyPayload = {
  id: number;
  name: string;
  email: string;
  company: string | null;
  orgType: string | null;
  need: string | null;
  timeline: string | null;
  phone: string | null;
  message: string;
};

/**
 * Notification e-mail optionnelle via Resend.
 * Silencieuse si RESEND_API_KEY / NOTIFICATION_EMAIL ne sont pas configurés :
 * la demande est de toute façon enregistrée en base et lisible dans le back-office.
 */
export async function notifyNewLead(payload: NotifyPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFICATION_EMAIL;
  const from = process.env.NOTIFICATION_FROM ?? "Agapante <onboarding@resend.dev>";
  if (!apiKey || !to) return;

  const lines = [
    `Nouvelle demande #${payload.id}`,
    "",
    `Nom       : ${payload.name}`,
    `E-mail    : ${payload.email}`,
    `Téléphone : ${payload.phone ?? "—"}`,
    `Structure : ${payload.company ?? "—"} (${payload.orgType ?? "—"})`,
    `Besoin    : ${payload.need ?? "—"}`,
    `Échéance  : ${payload.timeline ?? "—"}`,
    "",
    payload.message,
  ];

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: payload.email,
        subject: `[Agapante] Nouvelle demande — ${payload.name}${
          payload.company ? ` (${payload.company})` : ""
        }`,
        text: lines.join("\n"),
      }),
    });
  } catch {
    // On n'échoue jamais la soumission à cause d'une notification.
  }
}
