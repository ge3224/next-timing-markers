"use client";

import { ChangeEvent, useState } from "react";
import { Time } from "@/app/lib/context/shared_state_context";
import { sanitizeText } from "@/app/lib/formatting";

function HoursMinutesSeconds({
  time,
  legend,
  callback,
}: {
  time: Time;
  legend: string;
  callback: (update: Time) => void;
}) {
  const prefix = sanitizeText(legend);

  const [hours, setHours] = useState<string>(time.hours.toString());
  const [minutes, setMinutes] = useState<string>(time.minutes.toString());
  const [seconds, setSeconds] = useState<string>(time.seconds.toString());

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
          value={hours}
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
          value={minutes}
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
          value={seconds}
          id={`${prefix}_seconds`}
          onChange={onChangeSeconds}
        />
      </label>
    </fieldset>
  );
}

export default HoursMinutesSeconds;
