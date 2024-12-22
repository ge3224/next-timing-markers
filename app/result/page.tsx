"use client";

import Link from "next/link";
import { Time, useTimingState } from "@/app/lib/context/timing_context";
import { calculateMarkers } from "@/app/lib/conversions";
import { formatTime } from "@/app/lib/formatting";

function Result() {
  const { total, introduction, sections, conclusion } = useTimingState();
  const markers = calculateMarkers(total, introduction, sections, conclusion);

  return (
    <>
      <Link href="/">Home</Link>
      <div>
        <h2>Timing Markers</h2>
        <ul className="w-full max-w-64">
          {markers.map((marker: Time, index: number) => (
            <li
              className="grid grid-cols-12 odd:bg-neutral-900 even:bg-neutral-950"
              key={index}
            >
              <span className="col-span-8 pl-4">
                &#9201;&emsp;
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
      </div>
    </>
  );
}

export default Result;
