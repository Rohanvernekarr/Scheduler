import { createAuthClient } from "better-auth/react";
import { emailOTPClient, inferAdditionalFields, adminClient, multiSessionClient } from "better-auth/client/plugins";
import type { auth } from "./index.js";

export const authClient = createAuthClient({
  baseURL: typeof window === "undefined"
    ? "https://scheduler-9smh.onrender.com" // Server-side
    : window.location.hostname === "localhost"
      ? "http://localhost:8000" // Local client
      : `${window.location.origin}/api/auth`, // Production client (proxy)
  plugins: [
    emailOTPClient(),
    adminClient(),
    multiSessionClient(),
    inferAdditionalFields<typeof auth>(),
  ],
});

export const signIn: typeof authClient.signIn = authClient.signIn;
export const signUp: typeof authClient.signUp = authClient.signUp;
export const signOut: typeof authClient.signOut = authClient.signOut;
export const useSession: typeof authClient.useSession = authClient.useSession;
export const updateUser: (args: any) => Promise<any> = authClient.updateUser;
export const emailOtp: any = (authClient as any).emailOtp;

