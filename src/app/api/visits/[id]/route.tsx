import { NextResponse } from "next/server";
import { getVisit } from "@/app/api/data";
import { isUserOnVisit } from "@/utils";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const visit = getVisit(params.id);
  if (visit === null) return new Response(null, { status: 404 });
  if (!isUserOnVisit(visit, 1)) return new Response(null, { status: 401 });
  return NextResponse.json({ visit });
}
