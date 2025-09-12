import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: Array<string | number | null | undefined | false | Record<string, boolean>>): string {
  // clsx accepts strings, numbers, falsy values, arrays, and object maps; we type the common shapes we use
  return twMerge(clsx(inputs))
}



