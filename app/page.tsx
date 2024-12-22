"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useCallback } from "react";

import HoursMinutesSeconds from "@/app/lib/ui/hours_minutes_seconds";
import Quantity from "@/app/lib/ui/quantity";
import { Time, useTimingState } from "@/app/lib/context/timing_context";

export default function Home() {
  const router = useRouter();

  const {
    total: totalTime,
    setTotal,
    rememberTotal,
    introduction,
    setIntroduction,
    rememberIntroduction,
    sections,
    setSections,
    rememberSections,
    conclusion,
    setConclusion,
    rememberConclusion,
  } = useTimingState();

  const onUpdateTotalTime = useCallback(
    (update: Time) => setTotal({ ...totalTime, ...update }),
    [totalTime, setTotal],
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
            rememberCallback={rememberTotal}
          />
          <HoursMinutesSeconds
            time={introduction}
            legend="Introduction"
            callback={onUpdateIntroduction}
            rememberCallback={rememberIntroduction}
          />
          <Quantity
            value={sections}
            label="Number of Sections"
            callback={onUpdateSections}
            rememberCallback={rememberSections}
          />
          <HoursMinutesSeconds
            time={conclusion}
            legend="Conclusion"
            callback={onUpdateConclusion}
            rememberCallback={rememberConclusion}
          />
          <button type="submit">Calculate</button>
        </form>
      </main>
    </>
  );
}
