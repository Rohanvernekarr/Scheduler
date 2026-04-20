import { prisma } from '@repo/db';
import type { CreateInterviewInput } from '../schemas/interviews.js';

export class InterviewService {
  async createInterview(data: CreateInterviewInput) {
    return prisma.interview.create({
      data: {
        candidateEmail: data.candidateEmail,
        interviewerId: data.interviewerId,
        scheduledAt: new Date(data.scheduledAt),
        meetingLink: data.meetingLink ?? null,
        feedback: data.feedback ?? null,
      }
    });
  }

  async getInterviewsByInterviewer(interviewerId: string) {
    return prisma.interview.findMany({
      where: { interviewerId },
      orderBy: { scheduledAt: 'asc' }
    });
  }

  async updateFeedback(interviewId: string, feedback: string) {
    return prisma.interview.update({
      where: { id: interviewId },
      data: { feedback }
    });
  }
}

export const interviewService = new InterviewService();
