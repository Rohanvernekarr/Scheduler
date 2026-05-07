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
    'http://localhost:5174',
    'https://scheduler-kappa-teal.vercel.app',
    'https://scheduler-web-mu.vercel.app',
    'https://scheduler-9smh.onrender.com',
    'https://scheduler-admin-one.vercel.app',
    'https://schedulers.app',
    'https://dashboard.schedulers.app',
    'https://admin.schedulers.app',
  ],
  advanced: {
    useSecureCookies: true,
    crossTab: {
      enabled: true
    },
    cookies: {
      session_token: {
        attributes: {
          sameSite: "lax",
          secure: true,
          ...(process.env.NODE_ENV === "production" ? { domain: ".schedulers.app" } : {}),
        }
      },
      state: {
        attributes: {
          sameSite: "lax",
          secure: true,
          ...(process.env.NODE_ENV === "production" ? { domain: ".schedulers.app" } : {}),
        }
      },
      callback_url: {
        attributes: {
          sameSite: "lax",
          secure: true,
          ...(process.env.NODE_ENV === "production" ? { domain: ".schedulers.app" } : {}),
        }
      }
    }
  },
  plugins: [
    admin({
      defaultRole: "USER",
      adminRole: "ADMIN"
    }),
    multiSession(),
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        await resend.emails.send({
          from: "Scheduler Auth <auth@rohanrv.tech>",
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
        defaultValue: "USER",
      },
      username: {
        type: "string",
      }
    }
  }
});
