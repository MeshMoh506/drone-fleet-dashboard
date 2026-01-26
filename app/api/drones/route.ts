import { NextResponse } from "next/server"; export async function GET() { return NextResponse.json({ data: [{ id: "1", name: "Alpha-1", status: "IDLE" }] }); }
