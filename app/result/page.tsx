"use client";

import Link from "next/link";
import { useTimingState } from "@/app/lib/context/shared_state_context";

function Result() {
  const { totalTime, introduction, conclusion, sections } = useTimingState();

  return (
    <>
      <Link href="/">Home</Link>
      <div>
        <p>temporary</p>
        <ul>
          <li>
            {totalTime.hours}:{totalTime.minutes}:{totalTime.seconds}
          </li>
          <li>
            {introduction.hours}:{introduction.minutes}:{introduction.seconds}
          </li>
          <li>
            {conclusion.hours}:{conclusion.minutes}:{conclusion.seconds}
          </li>
          <li>{sections}</li>
        </ul>
      </div>
    </>
  );
}

export default Result;
