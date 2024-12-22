"use client";

import { ReactNode, createContext, useContext, useState } from "react";

export type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

type Timing = {
  totalTime: Time;
  setTotalTime: (update: Time) => void;
  introduction: Time;
  setIntroduction: (update: Time) => void;
  conclusion: Time;
  setConclusion: (update: Time) => void;
  sections: number;
  setSections: (update: number) => void;
};

const TimingContext = createContext<Timing | undefined>(undefined);

export function TimingProvider({ children }: { children: ReactNode }) {
  const [totalTime, setTotalTime] = useState<Time>({
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
        totalTime,
        setTotalTime,
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
