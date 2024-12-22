"use client";

import { ChangeEvent, useState } from "react";
import { sanitizeText } from "@/app/lib/formatting";

function Qty({
  value,
  label,
  max = 100,
  callback,
}: {
  value: number;
  label: string;
  max?: number;
  callback: (update: number) => void;
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
    </fieldset>
  );
}

export default Qty;
