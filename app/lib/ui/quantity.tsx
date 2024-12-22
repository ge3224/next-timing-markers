"use client";

import { ChangeEvent, MouseEventHandler, useState } from "react";
import { sanitizeText } from "@/app/lib/formatting";

function Quantity({
  value,
  label,
  max = 100,
  callback,
  rememberCallback,
}: {
  value: number;
  label: string;
  max?: number;
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

  const onClickRemember: MouseEventHandler<HTMLButtonElement> = (): void => {
    rememberCallback();
  }

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
      <button onClick={onClickRemember}>&#x1F4CC;</button>
    </fieldset>
  );
}

export default Quantity;
