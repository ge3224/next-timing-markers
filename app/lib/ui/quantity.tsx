"use client";

import { ChangeEvent, MouseEventHandler, MouseEvent, useState } from "react";
import { sanitizeText } from "@/app/lib/formatting";
import IconPushPin from "./icons/push_pin";
import clsx from "clsx";

function Quantity({
  value,
  label,
  max = 100,
  isRemembered,
  callback,
  rememberCallback,
}: {
  value: number;
  label: string;
  max?: number;
  isRemembered: boolean;
  callback: (update: number) => void;
  rememberCallback: () => void;
}) {
  const prefix = sanitizeText(label);

  const [qty, setQty] = useState<string>(value.toString());

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    const update = e.currentTarget.value;
    setQty(update);
    callback(parseInt(update));
  };

  const onClickRemember: MouseEventHandler<HTMLButtonElement> = (
    e: MouseEvent,
  ): void => {
    e.preventDefault();
    e.stopPropagation();
    rememberCallback();
  };

  return (
    <fieldset>
      <label htmlFor={`${prefix}_qty`}>
        {label}:<br />
        <input
          className="text-black"
          type="number"
          min={0}
          max={max}
          value={qty}
          id={`${prefix}_qty`}
          onChange={onChange}
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

export default Quantity;
