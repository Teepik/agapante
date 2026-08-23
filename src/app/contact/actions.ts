"use server";

import { headers } from "next/headers";
import { createHash } from "node:crypto";
import { countRecentByIp, insertLead, isDbConfigured } from "@/lib/db";
import { notifyNewLead } from "@/lib/notify";
import type { ContactState } from "@/lib/contact-state";
import {
  isBotUserAgent,
  isDisposableEmail,
  isHoneypotFilled,
  isSubmitTooFast,
  looksLikeSpam,
  verifyFormToken,
  verifyTurnstile,
} from "@/lib/spam";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

function str(form: FormData, key: string): string {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function clamp(value: string, max: number): string {
  return value.length > max ? value.slice(0, max) : value;
}

function fakeSuccess(): ContactState {
  return { status: "success", message: "Merci, votre message a bien été transmis.", errors: {} };
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const values = {
    name: clamp(str(formData, "name"), 120),
    email: clamp(str(formData, "email"), 180),
    company: clamp(str(formData, "company"), 160),
    role: clamp(str(formData, "role"), 120),
    phone: clamp(str(formData, "phone"), 40),
    orgType: clamp(str(formData, "orgType"), 60),
    headcount: clamp(str(formData, "headcount"), 60),
    need: clamp(str(formData, "need"), 80),
    timeline: clamp(str(formData, "timeline"), 60),
    message: clamp(str(formData, "message"), 6000),
  };

  const head = await headers();
  const userAgent = head.get("user-agent");

  // Honeypots : champs invisibles remplis uniquement par les robots.
  if (isHoneypotFilled(str(formData, "website"), str(formData, "company_url"))) {
    return fakeSuccess();
  }

  if (!verifyFormToken(str(formData, "formToken"))) {
    return fakeSuccess();
  }

  if (isBotUserAgent(userAgent)) {
    return fakeSuccess();
  }

  const startedAt = Number(str(formData, "startedAt"));
  if (isSubmitTooFast(startedAt)) {
    return {
      status: "error",
      message: "Votre message a été envoyé un peu trop vite. Merci de réessayer.",
      errors: {},
      values,
    };
  }

  if (!(await verifyTurnstile(str(formData, "cf-turnstile-response")))) {
    return {
      status: "error",
      message: "La vérification anti-robot a échoué. Merci de réessayer.",
      errors: {},
      values,
    };
  }

  const errors: Record<string, string> = {};
  if (values.name.length < 2) errors.name = "Merci d'indiquer votre nom.";
  if (!EMAIL_RE.test(values.email)) errors.email = "Merci d'indiquer une adresse e-mail valide.";
  if (values.message.length < 20)
    errors.message = "Décrivez votre situation en quelques phrases (20 caractères minimum).";
  if (!formData.get("consent")) errors.consent = "Votre accord est nécessaire pour vous recontacter.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Quelques informations doivent être corrigées avant l'envoi.",
      errors,
      values,
    };
  }

  if (isDisposableEmail(values.email) || looksLikeSpam(values)) {
    return fakeSuccess();
  }

  if (!isDbConfigured()) {
    return {
      status: "error",
      message:
        "Le formulaire n'est pas encore relié à sa base de données. Écrivez-nous directement par e-mail en attendant.",
      errors: {},
      values,
    };
  }

  const ip =
    head.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    head.get("x-real-ip") ||
    "inconnue";
  const ipHash = createHash("sha256")
    .update(ip + (process.env.SESSION_SECRET ?? "agapante"))
    .digest("hex")
    .slice(0, 32);

  try {
    const recent = await countRecentByIp(ipHash, 15);
    if (recent >= 2) {
      return {
        status: "error",
        message:
          "Plusieurs demandes ont déjà été envoyées depuis cet appareil. Merci de patienter quelques minutes.",
        errors: {},
        values,
      };
    }

    const id = await insertLead({
      name: values.name,
      email: values.email,
      company: values.company || null,
      role: values.role || null,
      phone: values.phone || null,
      org_type: values.orgType || null,
      headcount: values.headcount || null,
      need: values.need || null,
      timeline: values.timeline || null,
      message: values.message,
      source_path: clamp(str(formData, "sourcePath"), 200) || null,
      referer: head.get("referer"),
      ip_hash: ipHash,
      user_agent: userAgent?.slice(0, 300) ?? null,
    });

    await notifyNewLead({
      id,
      name: values.name,
      email: values.email,
      company: values.company || null,
      orgType: values.orgType || null,
      need: values.need || null,
      timeline: values.timeline || null,
      phone: values.phone || null,
      message: values.message,
    });

    return {
      status: "success",
      message:
        "Message reçu. Nous revenons vers vous sous 24 heures ouvrées avec une proposition de créneau.",
      errors: {},
    };
  } catch (error) {
    console.error("[contact] échec d'enregistrement", error);
    return {
      status: "error",
      message:
        "Une erreur technique nous a empêchés d'enregistrer votre message. Merci de réessayer dans un instant.",
      errors: {},
      values,
    };
  }
}
