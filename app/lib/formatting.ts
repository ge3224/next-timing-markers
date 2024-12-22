import { Time } from "@/app/lib/context/timing_context";

export function sanitizeText(input: string): string {
  return input
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_]/g, "_")
    .toLowerCase();
}

export function formatTime(time: Time): string {
  const hs = time.hours.toString().padStart(2, "0");
  const ms = time.minutes.toString().padStart(2, "0");
  const ss = time.seconds.toString().padStart(2, "0");
  return `${hs}:${ms}:${ss}`;
}
