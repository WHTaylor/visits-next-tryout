import { NextResponse } from "next/server";
import { getUser } from "@/app/api/data";
import { networkDelay } from "@/utils";

export async function GET(
  request: Request,
  { params }: { params: { un: string } },
) {
  await networkDelay();
  const user = getUser(params.un);
  if (user === null) return new Response(null, { status: 404 });
  return NextResponse.json({ user });
}
