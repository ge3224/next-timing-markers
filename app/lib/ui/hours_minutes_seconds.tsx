"use client";

import { ChangeEvent, MouseEventHandler, MouseEvent, useState } from "react";
import { Time } from "@/app/lib/context/timing_context";
import { sanitizeText } from "@/app/lib/formatting";
import IconPushPin from "@/app/lib/ui/icons/push_pin";
import clsx from "clsx";

function HoursMinutesSeconds({
  time,
  legend,
  isRemembered,
  callback,
  rememberCallback,
}: {
  time: Time;
  legend: string;
  isRemembered: boolean;
  callback: (update: Time) => void;
  rememberCallback: () => void;
}) {
  const prefix = sanitizeText(legend);

  const { hours, minutes, seconds } = time;

  const [localHours, setHours] = useState<string>(hours.toString());

  const [localMinutes, setMinutes] = useState<string>(minutes.toString());

  const [localSeconds, setSeconds] = useState<string>(seconds.toString());

  const onChangeHours = (e: ChangeEvent<HTMLInputElement>): void => {
    const update = e.currentTarget.value;
    setHours(update);
    callback({ ...time, hours: parseInt(update) });
  };

  const onChangeMinutes = (e: ChangeEvent<HTMLInputElement>): void => {
    const update = e.currentTarget.value;
    setMinutes(update);
    callback({ ...time, minutes: parseInt(update) });
  };

  const onChangeSeconds = (e: ChangeEvent<HTMLInputElement>): void => {
    const update = e.currentTarget.value;
    setSeconds(update);
    callback({ ...time, seconds: parseInt(update) });
  };

  const onClickRemember: MouseEventHandler<HTMLButtonElement> = (
    e: MouseEvent<HTMLButtonElement>,
  ): void => {
    e.preventDefault();
    e.stopPropagation();
    rememberCallback();
  };

  return (
    <div className="my-3 md:my-6">
      <h2 className="mb-3 font-bold text-neutral-800">{legend}</h2>
      <div className="flex items-center gap-2 border-b border-neutral-100 pb-6">
        <label htmlFor={`${prefix}_hour`}>
          <span className="align-top text-xs text-neutral-500">HH</span>{" "}
          <input
            className="rounded border pb-2.5 pl-4 pt-2 text-xl text-neutral-900"
            type="number"
            min={0}
            max={24}
            value={localHours}
            id={`${prefix}_hour`}
            onChange={onChangeHours}
          />
        </label>
        <label htmlFor={`${prefix}_minutes`}>
          <span className="align-top text-xs text-neutral-500">MM</span>{" "}
          <input
            className="rounded border pb-2.5 pl-4 pt-2 text-xl text-neutral-900"
            type="number"
            min={0}
            max={60}
            value={localMinutes}
            id={`${prefix}_minutes`}
            onChange={onChangeMinutes}
          />
        </label>
        <label htmlFor={`${prefix}_seconds`}>
          <span className="align-top text-xs text-neutral-500">SS</span>{" "}
          <input
            className="rounded border pb-2.5 pl-4 pt-2 text-xl text-neutral-900"
            type="number"
            min={0}
            max={60}
            value={localSeconds}
            id={`${prefix}_seconds`}
            onChange={onChangeSeconds}
          />
        </label>
        <button onClick={onClickRemember} aria-label="Remember">
          <IconPushPin
            twStroke={clsx(
              "stroke-2",
              isRemembered ? "stroke-emerald-500/60" : "stroke-neutral-500/20",
            )}
          />
        </button>
      </div>
    </div>
  );
}

export default HoursMinutesSeconds;
