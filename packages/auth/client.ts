import { createAuthClient } from "better-auth/react";
import { emailOTPClient, inferAdditionalFields, adminClient, multiSessionClient } from "better-auth/client/plugins";
import type { auth } from "./index.js";

export const authClient = createAuthClient({
  baseURL: typeof window === "undefined"
    ? "https://api.schedulers.app" // Server-side
    : window.location.hostname === "localhost"
      ? "http://localhost:8000" // Local client
      : "https://api.schedulers.app", // Production client
  plugins: [
    emailOTPClient(),
    adminClient(),
    multiSessionClient(),
    inferAdditionalFields<typeof auth>(),
  ],
});

export const { signIn, signUp, useSession, signOut, emailOtp } = authClient;
