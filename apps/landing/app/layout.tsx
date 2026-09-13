import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

const geist = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_LANDING_URL || "https://schedulers.app"),
  title: {
    default: "Scheduler - Meeting Scheduling Software",
    template: "%s | Scheduler",
  },
  description:
    "Share one booking link, manage availability, prevent scheduling conflicts, and coordinate meetings across your calendar.",
  applicationName: "Scheduler",
  keywords: [
    "meeting scheduler",
    "calendar booking",
    "appointment scheduling",
    "availability management",
    "Google Calendar scheduling",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Scheduler - Meeting Scheduling Software",
    description:
      "Share one booking link, manage availability, prevent scheduling conflicts, and coordinate meetings across your calendar.",
    url: "/",
    siteName: "Scheduler",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scheduler - Meeting Scheduling Software",
    description:
      "Share one booking link, manage availability, prevent scheduling conflicts, and coordinate meetings across your calendar.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>): Readonly<ReactNode> {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${geist.variable} font-sans`}>
        {children}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#18181b',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '1rem',
              fontSize: '0.875rem',
              fontWeight: '500',
            },
            success: {
              iconTheme: {
                primary: '#fff',
                secondary: '#000',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
