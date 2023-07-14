/**
 * This module pretends to be the backend DB
 */

import { User, Visit } from "@/types";
import dayjs from "dayjs";
import { any } from "@/utils";

const visits: Visit[] = [
  {
    id: 1,
    status: "accepted",
    requester: "1",
    visitors: [
      {
        id: 1,
        userNumber: "1",
        arrival: dayjs().subtract(10, "days"),
        departure: dayjs().subtract(8, "days"),
      },
    ],
  },
  {
    id: 2,
    status: "accepted",
    requester: "1",
    visitors: [
      {
        id: 2,
        userNumber: "1",
        arrival: dayjs().add(5, "days"),
        departure: dayjs().add(8, "days"),
      },
    ],
  },
  {
    id: 3,
    status: "submitted",
    requester: "1",
    visitors: [
      {
        id: 3,
        userNumber: "1",
        arrival: dayjs().add(25, "days"),
        departure: dayjs().add(28, "days"),
      },
    ],
  },
  {
    id: 4,
    status: "draft",
    requester: "1",
    visitors: [
      {
        id: 4,
        userNumber: "1",
        arrival: dayjs().add(125, "days"),
        departure: dayjs().add(128, "days"),
      },
    ],
  },
  {
    id: 5,
    status: "draft",
    requester: "2",
    visitors: [],
  },
  {
    id: 6,
    status: "draft",
    requester: "2",
    visitors: [
      {
        id: 5,
        userNumber: "1",
        arrival: dayjs().add(40, "days"),
        departure: dayjs().add(49, "days"),
      },
      {
        id: 6,
        userNumber: "2",
        arrival: dayjs().add(42, "days"),
        departure: dayjs().add(47, "days"),
      },
    ],
  },
];

export function getVisit(id: string) {
  const match = visits.filter((v) => v.id.toString() === id);
  return match.length === 0 ? null : match[0];
}

export function getVisitsForUser(user: string) {
  return visits.filter(
    (v) =>
      v.requester === user ||
      any(v.visitors, (vis) => vis.userNumber.toString() === user),
  );
}

export function getVisits() {
  return visits;
}

export function createVisit(requester: string) {
  const id = Math.max(...visits.map((v) => v.id)) + 1;
  const newVisit: Visit = {
    id,
    requester,
    status: "draft",
    visitors: [],
  };
  visits.push(newVisit);
  return id;
}

const users: User[] = [
  {
    userNumber: "1",
    fullName: "Joe Bloggs",
  },
  {
    userNumber: "2",
    fullName: "Sally Bloggs",
  },
  {
    userNumber: "3",
    fullName: "Other Individual",
  },
];

export function getUser(userNumber: string) {
  const match = users.filter((u) => u.userNumber === userNumber);
  return match.length === 0 ? null : match[0];
}
