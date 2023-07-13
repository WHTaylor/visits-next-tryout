import { NextResponse } from "next/server";
import { Visit } from "@/types";
import dayjs from "dayjs";
import { any } from "@/utils";

const visits: Visit[] = [
  {
    id: 1,
    status: "accepted",
    requester: 1,
    visitors: [
      {
        id: 1,
        arrival: dayjs().subtract(10, "days"),
        departure: dayjs().subtract(8, "days"),
      },
    ],
  },
  {
    id: 2,
    status: "accepted",
    requester: 1,
    visitors: [
      {
        id: 1,
        arrival: dayjs().add(5, "days"),
        departure: dayjs().add(8, "days"),
      },
    ],
  },
  {
    id: 3,
    status: "submitted",
    requester: 1,
    visitors: [
      {
        id: 1,
        arrival: dayjs().add(25, "days"),
        departure: dayjs().add(28, "days"),
      },
    ],
  },
  {
    id: 8,
    status: "draft",
    requester: 1,
    visitors: [
      {
        id: 1,
        arrival: dayjs().add(125, "days"),
        departure: dayjs().add(128, "days"),
      },
    ],
  },
];

function visitsForUser(user: string) {
  return visits.filter(
    (v) =>
      v.requester.toString() === user ||
      any(v.visitors, (vis) => vis.id.toString() === user),
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const user = searchParams.get("user");
  const data = user !== null ? visitsForUser(user) : visits;
  return NextResponse.json(data);
}
