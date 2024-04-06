"use client";

// import { classNames as cn } from "@/lib/classNames";
import clsx from "clsx";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

type Props = {
  label?: string;
  error?: string;
  rows?: number;
  mandatory?: boolean;
};

export default function Textarea(
  props: Props &
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
): JSX.Element {
  // const [v, setV] = useState("");

  // useEffect(() => {
  //   if (props.defaultValue) {
  //     setV(props.defaultValue as string);
  //   } else if (props.defaultValue === "") {
  //     setV("");
  //   }
  // }, [props.defaultValue]);
  return (
    <div>
      <label
        htmlFor={`${props.name}-input`}
        className="block text-sm leading-none text-gray-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-300"
      >
        {props.label} {props.mandatory && <p className="inline-block text-red-500">*</p>}
      </label>
      <div className="relative mt-0.5">
        <textarea
          // placeholder={props.placeholder ?? " "}
          {...props}
          className={clsx(
            "block w-full rounded border  py-1 pl-2 focus:border-slate-500 focus:outline-none focus:ring-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-100",
            props.error
              ? "border-red-300 pr-10 text-red-900 "
              : "border-gray-300 pr-2 text-gray-900 dark:text-gray-200",
            "disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500  disabled:shadow-none",
            "read-only:bg-slate-200 read-only:border-slate-400",
            props.className,
          )}
          // ref={iRef}
          // value={v}
          // onChange={(e) => {
          //   props.onChange?.(e);
          //   setV(e.target.value);
          // }}
          // defaultValue={undefined}
          id={`${props.name}-input`}
          rows={props.rows}
        />

        {props.error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon className="size-5 text-red-500" aria-hidden="true" />
          </div>
        )}
      </div>
      {props.error && <p className="mt-2 text-sm text-red-600">{props.error}</p>}
    </div>
  );
}
