import { Time } from "@/app/lib/context/timing_context";

export function sanitizeText(input: string): string {
  return input
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_]/g, "_")
    .toLowerCase();
}

export function formatTime(time: Time): string {
  const hh = time.hours.toFixed(0).padStart(2, "0");
  const mm = time.minutes.toFixed(0).padStart(2, "0");
  const ss = time.seconds.toFixed(0).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}
