import { NextResponse } from "next/server"
import { getRedis } from "@/lib/redis"

export async function GET() {
  const redis = getRedis()

  if (!redis) {
    return NextResponse.json(
      { error: "Visitor count is unavailable" },
      { status: 503 }
    )
  }

  try {
    const count = await redis.incr("visitor_count")
    return NextResponse.json({ count })
  } catch (error) {
    console.error("Error incrementing visitor count:", error)
    return NextResponse.json(
      { error: "Failed to increment visitor count" },
      { status: 500 }
    )
  }
} 