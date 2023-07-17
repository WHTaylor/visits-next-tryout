import { NextResponse } from "next/server";
import { createVisitor } from "@/app/api/data";
import { networkDelay } from "@/utils";
import dayjs from "dayjs";

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  await networkDelay();
  const { userNumber, arrival, departure } = await request.json();
  const id = createVisitor(
    params.id,
    userNumber,
    dayjs(arrival),
    dayjs(departure),
  );
  if (id === null) return new Response(null, { status: 400 });
  return NextResponse.json({ id });
}
