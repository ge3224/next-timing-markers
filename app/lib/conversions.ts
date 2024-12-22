import { Time } from "@/app/lib/context/timing_context";

export function hoursToSeconds(hours: number): number {
  return hours * 60 * 60;
}

export function minutesToSeconds(minutes: number): number {
  return minutes * 60;
}

export function secondsToMinutes(seconds: number): number {
  return seconds / 60;
}

export function secondsToHours(seconds: number): number {
  return seconds / 60 / 60;
}

function timeToSeconds(time: Time): number {
  return (
    hoursToSeconds(time.hours) + minutesToSeconds(time.minutes) + time.seconds
  );
}

function secondsToTime(seconds: number): Time {
  return {
    hours: Math.floor(secondsToHours(seconds)),
    minutes: Math.floor(secondsToMinutes(seconds % 3600)),
    seconds: seconds % 60,
  };
}

export function calculateMarkers(
  total: Time,
  introduction: Time,
  sections: number,
  conclusion: Time,
): Array<Time> {
  const markers = [{ hours: 0, minutes: 0, seconds: 0 } as Time];

  markers.push(introduction);

  const tt = timeToSeconds(total);
  const it = timeToSeconds(introduction);
  const ct = timeToSeconds(conclusion);
  const remaining = tt - (it + ct);

  const s = remaining / sections;

  for (let i = 1; i <= sections; i++) {
    const current = it + s * i;
    markers.push(secondsToTime(current));
  }

  const cm = secondsToTime(timeToSeconds(markers[markers.length - 1]) + ct);

  markers.push(cm);

  return markers;
}

export function timeToDate(time: Time): Date {
  const d = new Date();
  d.setHours(time.hours, time.minutes, time.seconds, 0);
  return d;
}
