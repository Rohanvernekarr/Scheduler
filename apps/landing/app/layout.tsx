import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import type { ReactNode } from "react";

const geist = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Scheduler - Effortless Meeting Booking",
  description:
    "Share one link. Let people book. Get instant email invites. No back-and-forth ever again.",
  openGraph: {
    title: "Scheduler",
    description: "Effortless meeting booking for everyone.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>): Readonly<ReactNode> {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${geist.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
