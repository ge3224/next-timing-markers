"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

export type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

export function isTime(obj: any): obj is Time {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.hours === "number" &&
    obj.hours > -1 &&
    typeof obj.minutes === "number" &&
    obj.minutes > -1 &&
    obj.minutes < 61 &&
    typeof obj.seconds === "number" &&
    obj.seconds > -1 &&
    obj.seconds < 61
  );
}

export const TimingKeys = {
  Total: "total",
  Introduction: "introduction",
  Sections: "sections",
  Conclusion: "conclusion",
} as const;

type Timing = {
  total: Time;
  setTotal: (update: Time) => void;
  introduction: Time;
  setIntroduction: (update: Time) => void;
  conclusion: Time;
  setConclusion: (update: Time) => void;
  sections: number;
  setSections: (update: number) => void;
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

  return (
    <TimingContext.Provider
      value={{
        total,
        setTotal,
        introduction,
        setIntroduction,
        conclusion,
        setConclusion,
        sections,
        setSections,
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
