import { createAuthClient } from "better-auth/react";
import { emailOTPClient, inferAdditionalFields, adminClient, twoFactorClient, multiSessionClient } from "better-auth/client/plugins";
import type { auth } from "./index.js";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" && window.location.hostname !== "localhost"
    ? "https://scheduler-9smh.onrender.com"
    : "http://localhost:8000",
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

