import { Visit } from "@/types";
import dayjs, { Dayjs } from "dayjs";
import minMax from "dayjs/plugin/minMax";

dayjs.extend(minMax);

export function any<T>(l: T[], pred: (t: T) => boolean) {
  return l.filter(pred).length > 0;
}

export function earliestArrival(visit: Visit): null | Dayjs {
  return dayjs.min(visit.visitors.map((v) => v.arrival));
}

export function latestDeparture(visit: Visit): null | Dayjs {
  return dayjs.max(visit.visitors.map((v) => v.departure));
}

export function isUserOnVisit(visit: Visit, user: number) {
  return (
    visit.requester === user || any(visit.visitors, (vis) => vis.id === user)
  );
}

/**
 * Wait for 50-150ms to simulate network delay
 */
export async function networkDelay() {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 100 + 50));
}
