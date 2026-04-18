import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" 
    ? (window as any).ENV?.BETTER_AUTH_URL || "http://localhost:8000"
    : (globalThis as any).process?.env?.BETTER_AUTH_URL || "http://localhost:8000",
  plugins: [
    emailOTPClient(),
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;
