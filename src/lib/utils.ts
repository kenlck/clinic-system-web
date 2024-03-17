import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTimeForInput(date: Date) {
  return `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, "0")}-${`${date.getDate()}`.padStart(
    2,
    "0"
  )}T${`${date.getHours()}`.padStart(2, "0")}:${`${date.getMinutes()}`.padStart(2, "0")}`;
}

export function formatDateForInput(date: Date) {
  return `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, "0")}-${`${date.getDate()}`.padStart(2, "0")}`;
}

export const makeSpace = (str: string) => {
  // given string with camel case, make space between each word
  return `${str[0].toUpperCase()}${str
    .slice(1)
    .replace(/([A-Z])/g, " $1")
    .trim()}`;
};

export const toCurrencyString = (amount: number) => {
  return `${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export function formatDateTime(dateString: string) {
  if (dateString === "" || !dateString) {
    return "";
  }
  const date = new Date(dateString);
  return format(date, "dd/MM/yyyy h:mma");
}

export function formatDate(dateString: string) {
  if (dateString === "" || !dateString) {
    return "";
  }
  const date = new Date(dateString);
  return format(date, "dd/MM/yyyy");
}
