import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRandomNumber = (min: number, max: number) =>
  Math.round(Math.random() * (max - min) + min);
