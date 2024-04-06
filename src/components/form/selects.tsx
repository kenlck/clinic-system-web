"use client";

import {
  Select as SSelect,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { RefreshCwIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { VList } from "virtua";

type Props = {
  options: {
    label: string;
    value: string;
  }[];
  label?: string;
  name?: string;
  className?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  value?: string;
  resetable?: boolean;
  onChange?: (v: string) => void;
};

export function Select({
  options,
  label,
  name,
  className,
  placeholder,
  required,
  defaultValue,
  disabled,
  value,
  onChange,
  resetable,
}: Props) {
  const [select, setSelect] = useState("");
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (value === "") {
      setSelect("");
    }
    if (value !== select) {
      setSelect(value ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const selection = options.find((opt) => opt.value === select);
  return (
    <div>
      {label && (
        <label className="block text-gray-600 dark:text-gray-300 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}

      <SSelect
        name={name}
        disabled={disabled}
        required={required}
        defaultValue={defaultValue}
        value={value?.toString()}
        onValueChange={(v) => {
          setSelect(v);
          onChange?.(v);
        }}
      >
        <div
          className={cn(
            " shadow-none relative leading-none border-none  rounded flex flex-row items-center",
            className,
            disabled && "bg-slate-200 border-slate-400"
          )}
        >
          <SelectTrigger className="rounded-sm flex-1 border-gray-300 line-clamp-1 shadow-none text-ellipsis w-full disabled:bg-slate-200 disabled:border-slate-400 flex flex-row justify-between">
            {/* <button type="button" className="py-1.5 flex-1 flex flex-row justify-between"> */}
            <span className="pointer-events-none line-clamp-1">
              <SelectValue placeholder={placeholder} />
            </span>

            {/* <CaretSortIcon className="h-4 w-4 opacity-50" /> */}
            {/* </button> */}
          </SelectTrigger>
          <input className="absolute inset-0 opacity-0 -z-20" required={required} value={value} readOnly />
          {resetable && (
            <button
              type="button"
              onClick={() => {
                onChange?.("");
              }}
              className="px-2"
            >
              <RefreshCwIcon className="h-4 w-4 hover:rotate-[360deg] duration-500 text-gray-600" />
            </button>
          )}
        </div>
        <SelectContent>
          {options.length > 50 && !!selection && (
            <>
              <SelectItem value={selection.value}>{selection.label}</SelectItem>
              <SelectSeparator />
            </>
          )}
          {options.length > 50 ? (
            <VList className="min-h-[200px]">
              {options.map((opt, idx) => (
                <SelectItem key={`slt${idx}${opt.value}`} value={opt.value?.toString()}>
                  {opt.label}
                </SelectItem>
              ))}
            </VList>
          ) : (
            <>
              {options.map((opt, idx) => (
                <SelectItem key={`slt${idx}${opt.value}`} value={opt.value?.toString()}>
                  {opt.label}
                </SelectItem>
              ))}
            </>
          )}
        </SelectContent>
      </SSelect>
    </div>
  );
}
