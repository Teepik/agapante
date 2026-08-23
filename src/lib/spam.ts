import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

const TOKEN_MAX_AGE_MS = 60 * 60 * 1000; // 1 h
const MIN_SUBMIT_MS = 5000;

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "tempmail.com",
  "throwaway.email",
  "yopmail.com",
  "sharklasers.com",
  "grr.la",
  "dispostable.com",
  "trashmail.com",
  "getnada.com",
  "maildrop.cc",
  "10minutemail.com",
]);

const BOT_UA_RE =
  /bot|crawl|spider|scrap|curl|wget|python-requests|axios|headless|phantom|selenium|playwright|puppeteer|httpclient|java\/|go-http|libwww|postman/i;

const SPAM_MESSAGE_RE =
  /\b(viagra|cialis|casino|crypto airdrop|forex signal|seo service|backlink|web traffic|nigerian prince)\b/i;

function secret(): string {
  return process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || "agapante-dev-secret-change-me";
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function createFormToken(): string {
  const expires = Date.now() + TOKEN_MAX_AGE_MS;
  const payload = String(expires);
  const sig = createHmac("sha256", secret()).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function verifyFormToken(token: string | undefined): boolean {
  if (!token) return false;
  const [expires, sig] = token.split(".");
  if (!expires || !sig) return false;
  const expected = createHmac("sha256", secret()).update(expires).digest("base64url");
  if (!safeEqual(sig, expected)) return false;
  const ts = Number(expires);
  return Number.isFinite(ts) && ts > Date.now();
}

export function isSubmitTooFast(startedAt: number): boolean {
  return Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < MIN_SUBMIT_MS;
}

export function isHoneypotFilled(...fields: string[]): boolean {
  return fields.some((value) => value.trim().length > 0);
}

export function isBotUserAgent(userAgent: string | null): boolean {
  if (!userAgent || userAgent.trim().length < 12) return true;
  return BOT_UA_RE.test(userAgent);
}

export function isDisposableEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return false;
  return DISPOSABLE_DOMAINS.has(domain);
}

export function looksLikeSpam(input: {
  name: string;
  email: string;
  message: string;
  company: string;
}): boolean {
  const { name, email, message, company } = input;
  const compactName = name.replace(/\s+/g, "");

  if (compactName.length >= 4 && /^(.)\1+$/i.test(compactName)) return true;
  if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(name)) return true;
  if (SPAM_MESSAGE_RE.test(message)) return true;

  const urls = message.match(/https?:\/\/|www\./gi);
  if (urls && urls.length >= 2) return true;

  if (message.length >= 80 && !message.includes(" ") && !message.includes("\n")) return true;

  const localPart = email.split("@")[0] ?? "";
  if (/^(test|admin|info|contact|demo|user)\d*$/i.test(localPart) && !company.trim()) return true;

  return false;
}

export async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) return true;
  if (!token?.trim()) return false;

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });
    const data = (await response.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export function isTurnstileRequired(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
}
