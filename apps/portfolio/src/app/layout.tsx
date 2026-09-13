import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { Footer } from "@/components/layout/Footer";
import RunningCat from "@/components/ui/Oneko";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rohan Vernekar | Software Engineer",
  description:
    "Rohan Vernekar is a software engineer who builds useful products and experiments with AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`bg-grid-lines ${inter.className} antialiased min-h-screen `}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RunningCat startPos={{ x: 380, y: 250 }} />
          <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-muted/30">
            <main className="flex-1 ">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
