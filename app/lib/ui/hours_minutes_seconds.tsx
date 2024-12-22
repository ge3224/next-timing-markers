"use client";

import { ChangeEvent, MouseEventHandler, MouseEvent, useState } from "react";
import { Time } from "@/app/lib/context/timing_context";
import { sanitizeText } from "@/app/lib/formatting";
import IconPushPin from "@/app/lib/ui/icons/push_pin";
import clsx from "clsx";

function HoursMinutesSeconds({
  time,
  legend,
  callback,
  isRemembered,
  rememberCallback,
}: {
  time: Time;
  legend: string;
  callback: (update: Time) => void;
  isRemembered: boolean;
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
    <fieldset>
      <legend>{legend}</legend>
      <label htmlFor={`${prefix}_hour`}>
        H:
        <input
          className="text-black"
          type="number"
          min={0}
          max={24}
          value={localHours}
          id={`${prefix}_hour`}
          onChange={onChangeHours}
        />
      </label>
      <label htmlFor={`${prefix}_minutes`}>
        M:
        <input
          className="text-black"
          type="number"
          min={0}
          max={60}
          value={localMinutes}
          id={`${prefix}_minutes`}
          onChange={onChangeMinutes}
        />
      </label>
      <label htmlFor={`${prefix}_seconds`}>
        S:
        <input
          className="text-black"
          type="number"
          min={0}
          max={60}
          value={localSeconds}
          id={`${prefix}_seconds`}
          onChange={onChangeSeconds}
        />
      </label>
      <button onClick={onClickRemember}>
        <IconPushPin
          tailwind={clsx(
            "stroke-2",
            isRemembered ? "stroke-neutral-500" : "stroke-neutral-500/20",
          )}
        />
      </button>
    </fieldset>
  );
}

export default HoursMinutesSeconds;
