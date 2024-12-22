"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

function isTime(obj: any): obj is Time {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.hours === 'number' &&
    obj.hours > -1 &&
    typeof obj.minutes === 'number' &&
    obj.minutes > -1 &&
    obj.minutes < 61 &&
    typeof obj.seconds === 'number' &&
    obj.seconds > -1 &&
    obj.seconds < 61
  );
}

const TimingKeys = {
  Total: "total",
  Introduction: "introduction",
  Sections: "sections",
  Conclusion: "conclusion",
} as const;

type Timing = {
  total: Time;
  setTotal: (update: Time) => void;
  rememberTotal: () => void;
  introduction: Time;
  setIntroduction: (update: Time) => void;
  rememberIntroduction: () => void;
  conclusion: Time;
  setConclusion: (update: Time) => void;
  rememberConclusion: () => void;
  sections: number;
  setSections: (update: number) => void;
  rememberSections: () => void;
};

const TimingContext = createContext<Timing | undefined>(undefined);

export function TimingProvider({ children }: { children: ReactNode }) {
  const [total, setTotal] = useState<Time>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [introduction, setIntroduction] = useState<Time>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [conclusion, setConclusion] = useState<Time>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [sections, setSections] = useState<number>(0);

  useEffect(() => {
    const storedTotal = localStorage.getItem(TimingKeys.Total);
    if (storedTotal) {
      const st = JSON.parse(storedTotal);

      if (isTime(st)) {
        setTotal(st);
      }
    }

    const storedIntro = localStorage.getItem(TimingKeys.Introduction);
    if (storedIntro) {
      const si = JSON.parse(storedIntro);
      if (isTime(si)) {
        setIntroduction(si);
      }
    }

    const storedConclusion = localStorage.getItem(TimingKeys.Conclusion);
    if (storedConclusion) {
      const sc = JSON.parse(storedConclusion);
      if (isTime(sc)) {
        setConclusion(sc);
      }
    }

    const storedSections = localStorage.getItem(TimingKeys.Sections);
    if (storedSections) {
      const ss = JSON.parse(storedSections);
      if (isTime(ss)) {
        setConclusion(ss);
      }
    }
  }, []);

  useEffect(() => {
    console.log("something has changes with total, now %w", total);
  }, [total]);

  const rememberTotal = useCallback(() => {
    localStorage.setItem(TimingKeys.Total, JSON.stringify(total));
  }, [total]);

  const rememberIntroduction = useCallback(() => {
    localStorage.setItem(TimingKeys.Introduction, JSON.stringify(introduction));
  }, [introduction]);

  const rememberConclusion = useCallback(() => {
    localStorage.setItem(TimingKeys.Conclusion, JSON.stringify(conclusion));
  }, [conclusion]);

  const rememberSections = useCallback(() => {
    localStorage.setItem(TimingKeys.Sections, JSON.stringify(sections));
  }, [sections]);

  return (
    <TimingContext.Provider
      value={{
        total,
        setTotal,
        rememberTotal,
        introduction,
        setIntroduction,
        rememberIntroduction,
        conclusion,
        setConclusion,
        rememberConclusion,
        sections,
        setSections,
        rememberSections,
      }}
    >
      {children}
    </TimingContext.Provider>
  );
}

export function useTimingState() {
  const context = useContext(TimingContext);
  if (!context) {
    throw new Error("useTimingState mut be used within a TimeProvider");
  }
  return context;
}
