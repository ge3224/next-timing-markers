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
    <div className="my-6">
      <div className="flex gap-2 border-b border-neutral-100 pb-6">
        <label
          className="flex w-full items-center justify-between"
          htmlFor={`${prefix}_qty`}
        >
          <span className="font-bold">{label}</span>
          <input
            className="rounded border pb-2.5 pl-4 pt-2 text-xl text-neutral-900"
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
            twStroke={clsx(
              "stroke-2",
              isRemembered ? "stroke-neutral-500" : "stroke-neutral-500/20",
            )}
          />
        </button>
      </div>
    </div>
  );
}

export default Quantity;
