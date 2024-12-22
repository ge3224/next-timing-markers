"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";

import HoursMinutesSeconds from "@/app/lib/ui/hours_minutes_seconds";
import Quantity from "@/app/lib/ui/quantity";
import {
  isTime,
  Time,
  TimingKeys,
  useTimingState,
} from "@/app/lib/context/timing_context";

export default function Home() {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);

  const {
    total,
    setTotal,
    introduction,
    setIntroduction,
    sections,
    setSections,
    conclusion,
    setConclusion,
  } = useTimingState();

  const [totalIsRemembered, setTotalIsRemembered] = useState<boolean>(false);
  const [introductionIsRemembered, setIntroductionIsRemembered] =
    useState<boolean>(false);
  const [sectionsIsRemembered, setSectionsIsRemembered] =
    useState<boolean>(false);
  const [conclusionIsRemembered, setConclusionIsRemembered] =
    useState<boolean>(false);

  const onUpdateTotalTime = useCallback(
    (update: Time) => setTotal({ ...total, ...update }),
    [total, setTotal],
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

  useEffect(() => {
    if (loading) {
      const t = localStorage.getItem(TimingKeys.Total);
      if (t) {
        const parsed = JSON.parse(t);
        if (isTime(parsed)) {
          setTotal({ ...total, ...parsed });
          setTotalIsRemembered(true);
        }
      }

      const i = localStorage.getItem(TimingKeys.Introduction);
      if (i) {
        const parsed = JSON.parse(i);
        if (isTime(parsed)) {
          setIntroduction({ ...introduction, ...parsed });
          setIntroductionIsRemembered(true);
        }
      }
      setLoading(false);

      const s = localStorage.getItem(TimingKeys.Sections);
      if (s) {
        const parsed = parseInt(s);
        if (!isNaN(parsed) && parsed >= 0) {
          setSections(parsed);
          setSectionsIsRemembered(true);
        }
      }

      const c = localStorage.getItem(TimingKeys.Conclusion);
      if (c) {
        const parsed = JSON.parse(c);
        if (isTime(parsed)) {
          setConclusion({ ...conclusion, ...parsed });
          setConclusionIsRemembered(true);
        }
      }
    }
  }, []);

  const rememberTotal = useCallback(() => {
    console.log("testing here....");
    if (totalIsRemembered) {
      localStorage.removeItem(TimingKeys.Total);
      setTotalIsRemembered(false);
      return;
    }
    localStorage.setItem(TimingKeys.Total, JSON.stringify(total));
    setTotalIsRemembered(true);
  }, [total, totalIsRemembered]);

  const rememberIntroduction = useCallback(() => {
    if (introductionIsRemembered) {
      localStorage.removeItem(TimingKeys.Introduction);
      setIntroductionIsRemembered(false);
      return;
    }
    localStorage.setItem(TimingKeys.Introduction, JSON.stringify(introduction));
    setIntroductionIsRemembered(true);
  }, [introduction, introductionIsRemembered]);

  const rememberSections = useCallback(() => {
    if (sectionsIsRemembered) {
      localStorage.removeItem(TimingKeys.Sections);
      setSectionsIsRemembered(false);
      return;
    }
    localStorage.setItem(TimingKeys.Sections, JSON.stringify(sections));
    setSectionsIsRemembered(true);
  }, [sections, sectionsIsRemembered]);

  const rememberConclusion = useCallback(() => {
    if (conclusionIsRemembered) {
      localStorage.removeItem(TimingKeys.Conclusion);
      setConclusionIsRemembered(false);
      return;
    }
    localStorage.setItem(TimingKeys.Conclusion, JSON.stringify(conclusion));
    setConclusionIsRemembered(true);
  }, [conclusion, conclusionIsRemembered]);

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    e.stopPropagation();

    router.push("/result");
  };

  return (
    <main className="mx-auto w-full max-w-screen-sm flex flex-col justify-center items-center my-12">
      {loading ? (
        <div>loading....</div>
      ) : (
        <form onSubmit={onSubmit}>
          <HoursMinutesSeconds
            time={total}
            legend="Total Time"
            isRemembered={totalIsRemembered}
            callback={onUpdateTotalTime}
            rememberCallback={rememberTotal}
          />
          <HoursMinutesSeconds
            time={introduction}
            legend="Introduction"
            isRemembered={introductionIsRemembered}
            callback={onUpdateIntroduction}
            rememberCallback={rememberIntroduction}
          />
          <Quantity
            value={sections}
            label="Number of Sections"
            isRemembered={sectionsIsRemembered}
            callback={onUpdateSections}
            rememberCallback={rememberSections}
          />
          <HoursMinutesSeconds
            time={conclusion}
            legend="Conclusion"
            isRemembered={conclusionIsRemembered}
            callback={onUpdateConclusion}
            rememberCallback={rememberConclusion}
          />
          <button type="submit">Calculate</button>
        </form>
      )}
    </main>
  );
}
