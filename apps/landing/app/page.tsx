import type { ReactNode } from "react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { Footer } from "./components/Footer";
import { getStats } from "./actions";

export default async function Home() {
  const stats = await getStats();

  return (
    <>
      <Nav />
      <main>
        <Hero stats={stats} />
        <Features />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
