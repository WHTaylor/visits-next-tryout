import { NextRequest, NextResponse } from "next/server";
import { createVisit, getVisits, getVisitsForUser } from "@/app/api/data";
import { revalidatePath } from "next/cache";
import { networkDelay } from "@/utils";

export async function GET(request: NextRequest) {
  await networkDelay();
  const user = request.nextUrl.searchParams.get("user");
  const data = user !== null ? getVisitsForUser(user) : getVisits();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  await networkDelay();
  const id = createVisit(1);
  revalidatePath("/");
  return NextResponse.json({ id });
}
