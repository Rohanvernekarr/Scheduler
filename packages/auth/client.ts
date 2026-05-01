import { createAuthClient } from "better-auth/react";
import { emailOTPClient, inferAdditionalFields, adminClient } from "better-auth/client/plugins";
import type { auth } from "./index.js";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" 
    ? (window as any).ENV?.BETTER_AUTH_URL || "http://localhost:8000"
    : (globalThis as any).process?.env?.BETTER_AUTH_URL || "http://localhost:8000",
  plugins: [
    emailOTPClient(),
    adminClient(),
    inferAdditionalFields<typeof auth>(),
  ],
});

export const signIn: typeof authClient.signIn = authClient.signIn;
export const signUp: typeof authClient.signUp = authClient.signUp;
export const signOut: typeof authClient.signOut = authClient.signOut;
export const useSession: typeof authClient.useSession = authClient.useSession;
export const updateUser: (args: any) => Promise<any> = authClient.updateUser;
export const emailOtp: any = (authClient as any).emailOtp;

