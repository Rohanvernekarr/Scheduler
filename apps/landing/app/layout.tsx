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
