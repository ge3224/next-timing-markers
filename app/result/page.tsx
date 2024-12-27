"use client";

import Link from "next/link";
import { Time, useTimingState } from "@/app/lib/context/timing_context";
import { calculateMarkers } from "@/app/lib/conversions";
import { formatTime } from "@/app/lib/formatting";
import IconStopWatch from "../lib/ui/icons/stopwatch";
import IconArrowLeft from "../lib/ui/icons/arrow_left";

function Result() {
  const { total, introduction, sections, conclusion } = useTimingState();
  const markers = calculateMarkers(total, introduction, sections, conclusion);

  return (
    <main className="mx-auto my-10 flex w-full max-w-md flex-col items-center justify-center rounded border py-10">
      <h2 className="text-lg font-bold text-neutral-800">Timing Markers</h2>
      <ul className="my-6 w-64">
        {markers.map((marker: Time, index: number) => (
          <li
            className="grid grid-cols-12 px-3 py-2 even:bg-neutral-100"
            key={index}
          >
            <IconStopWatch />
            <span className="col-span-6 pl-4">
              {index === 0
                ? "Introduction "
                : index < markers.length - 2
                  ? "Section " + index + " "
                  : index < markers.length - 1
                    ? "Conclusion "
                    : "End "}
              &nbsp;
            </span>
            <span>{formatTime(marker)}</span>
          </li>
        ))}
      </ul>
      <Link
        className="mx-auto mt-10 flex gap-2 rounded-lg bg-neutral-800 px-6 py-3 font-bold text-white transition-all duration-150 ease-in hover:bg-emerald-800 hover:px-8"
        href="/"
      >
        <IconArrowLeft twStroke="stroke-[4px] stroke-white" /> Recalculate
      </Link>
    </main>
  );
}

export default Result;
