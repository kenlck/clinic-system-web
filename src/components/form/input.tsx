import { cn } from "@/lib/utils";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

type Props = {
  label?: string;
  error?: string;
};

export default function Input(
  props: Props & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
) {
  return (
    <>
      <div className="relative">
        <label
          htmlFor={`${props.name}-input`}
          className="block text-gray-600 dark:text-gray-300 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {props.label}
        </label>
        <input
          // placeholder={props.placeholder ?? " "}
          {...props}
          className={cn(
            "block w-full h-[30px] rounded border  py-1 pl-2 dark:bg-slate-800 dark:text-gray-100 dark:border-slate-600 focus:border-slate-500 focus:outline-none focus:ring-slate-500",
            props.error ? "border-red-300 pr-10 text-red-900" : "border-gray-300 pr-2 text-gray-900 dark:text-gray-200",
            "disabled:border-slate-400 disabled:bg-slate-200 disabled:text-slate-500  disabled:shadow-none",
            "read-only:bg-slate-200 read-only:border-slate-400",
            props.className
          )}
          // ref={iRef}
          id={`${props.name}-input`}
        />

        {props.error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
      </div>
      {props.error && <p className="mt-2 text-sm text-red-600">{props.error}</p>}
    </>
  );
}
