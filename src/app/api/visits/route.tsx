import { NextResponse } from "next/server";
import { createVisit, getVisits, getVisitsForUser } from "@/app/api/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const user = searchParams.get("user");
  const data = user !== null ? getVisitsForUser(user) : getVisits();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const id = createVisit(1);
  return NextResponse.json({ id });
}
