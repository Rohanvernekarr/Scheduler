"use server";

import { prisma } from "@repo/db";

export async function getStats() {
  try {
    const [meetingCount, userCount] = await Promise.all([
      prisma.meeting.count(),
      prisma.user.count(),
    ]);

    return {
      meetings: meetingCount,
      users: userCount,
      satisfaction: 93,
    };
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return {
      meetings: 0,
      users: 0,
      satisfaction: 0,
    };
  }
}
