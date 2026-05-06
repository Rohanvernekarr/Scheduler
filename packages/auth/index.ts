import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@repo/db";
import { emailOTP, admin, multiSession } from "better-auth/plugins";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5174'
  ],
  plugins: [
    admin({
      defaultRole: "USER",
      adminRole: "ADMIN"
    }),
    multiSession(),
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        await resend.emails.send({
          from: process.env.FROM_EMAIL || "onboarding@rohanrv.tech",
          to: email,
          subject: "Your Verification Code",
          html: `Your verification code is: <b>${otp}</b>`,
        });
      },
    }),
  ],
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "USER",
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:8000",
});
