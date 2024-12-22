"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useCallback } from "react";

import HoursMinutesSeconds from "@/app/lib/ui/hours_minutes_seconds";
import Quantity from "@/app/lib/ui/quantity";
import { Time, useTimingState } from "@/app/lib/context/shared_state_context";

export default function Home() {
  const router = useRouter();

  const {
    totalTime,
    setTotalTime,
    introduction,
    setIntroduction,
    sections,
    setSections,
    conclusion,
    setConclusion,
  } = useTimingState();

  const onUpdateTotalTime = useCallback(
    (update: Time) => setTotalTime({ ...totalTime, ...update }),
    [totalTime, setTotalTime],
  );

  const onUpdateIntroduction = useCallback(
    (update: Time) => setIntroduction({ ...introduction, ...update }),
    [introduction, setIntroduction],
  );

  const onUpdateConclusion = useCallback(
    (update: Time) => setConclusion({ ...conclusion, ...update }),
    [conclusion, setConclusion],
  );

  const onUpdateSections = useCallback(
    (update: number): void => setSections(update),
    [sections, setSections],
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    e.stopPropagation();

    router.push("/result");
  };

  return (
    <>
      <main>
        <form onSubmit={onSubmit}>
          <HoursMinutesSeconds
            time={totalTime}
            legend="Total Time"
            callback={onUpdateTotalTime}
          />
          <HoursMinutesSeconds
            time={introduction}
            legend="Introduction"
            callback={onUpdateIntroduction}
          />
          <Quantity
            value={sections}
            label="Number of Sections"
            callback={onUpdateSections}
          />
          <HoursMinutesSeconds
            time={conclusion}
            legend="Conclusion"
            callback={onUpdateConclusion}
          />
          <button type="submit">Calculate</button>
        </form>
      </main>
    </>
  );
}
