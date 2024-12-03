import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"


// src/lib/utils.js
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
