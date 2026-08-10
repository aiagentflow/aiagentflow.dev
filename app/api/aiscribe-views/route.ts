import { NextResponse } from "next/server";

// Simple in-memory view counter (resets on deploy, good enough for MVP)
let viewCount = 42; // seed with base count

export async function POST() {
  viewCount++;
  return NextResponse.json({ count: viewCount });
}
