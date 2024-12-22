"use client";

import { ChangeEvent, MouseEventHandler, useState } from "react";
import { Time } from "@/app/lib/context/timing_context";
import { sanitizeText } from "@/app/lib/formatting";

function HoursMinutesSeconds({
  time,
  legend,
  callback,
  rememberCallback,
}: {
  time: Time;
  legend: string;
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

  const onClickRemember: MouseEventHandler<HTMLButtonElement> = (): void => {
    rememberCallback();
  }

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
      <button onClick={onClickRemember}>&#x1F4CC;</button>
    </fieldset>
  );
}

export default HoursMinutesSeconds;
