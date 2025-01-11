import { differenceInMinutes, isValid } from "date-fns";
import { Message } from "./types";

export const hideTimestampIfNeeded = (
  messages: Message[],
  index: number
): Date | undefined => {
  const current = messages[index].timestamp;
  const next = messages[index + 1]?.timestamp;

  if (!isValid(next) || differenceInMinutes(next, current) > 2) return current;
};
