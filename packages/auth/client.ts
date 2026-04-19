import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";

const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" 
    ? (window as any).ENV?.BETTER_AUTH_URL || "http://localhost:8000"
    : (globalThis as any).process?.env?.BETTER_AUTH_URL || "http://localhost:8000",
  plugins: [
    emailOTPClient(),
  ],
});

export const signIn = authClient.signIn;
export const signUp = authClient.signUp;
export const signOut = authClient.signOut;
export const useSession = authClient.useSession;
export const updateUser: (args: any) => Promise<any> = authClient.updateUser;
export const emailOtp = authClient.emailOtp;

