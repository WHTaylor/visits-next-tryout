import { Visit } from "@/types";
import dayjs, { Dayjs } from "dayjs";
import minMax from "dayjs/plugin/minMax";

dayjs.extend(minMax);

export function withoutItem<T>(a: T[], idx: number): T[] {
  return a.slice(0, idx).concat(a.slice(idx + 1));
}

export function any<T>(l: T[], pred: (t: T) => boolean) {
  return l.filter(pred).length > 0;
}

export function earliestArrival(visit: Visit): null | Dayjs {
  return dayjs.min(visit.visitors.map((v) => v.arrival));
}

export function latestDeparture(visit: Visit): null | Dayjs {
  return dayjs.max(visit.visitors.map((v) => v.departure));
}

export function isUserOnVisit(visit: Visit, user: string) {
  return (
    visit.requester === user ||
    any(visit.visitors, (vis) => vis.userNumber === user)
  );
}

/**
 * Wait for 50-150ms to simulate network delay
 */
export async function networkDelay() {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 100 + 50));
}

export function capitalize(s: string) {
  return s.substring(0, 1).toUpperCase() + s.substring(1);
}
