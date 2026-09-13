"use client";

import { Sparkles, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
export default function AboutPage() {
  const router = useRouter();

  const techStack = [
    {
      title: "Frontend",
      items: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Vite",
        "Redux",
      ],
    },
    {
      title: "Backend",
      items: [
        "Node.js",
        "Express",
        "MongoDB",
        "PostgreSQL",
        "Prisma",
        "Firebase",
        "REST",
        "GraphQL",
      ],
    },
    {
      title: "DevOps & Tools",
      items: [
        "Git & GitHub",
        "Docker",
        "AWS",
        "CI/CD",
        "Upstash",
        "Railway",
        "Postman",
      ],
    },
  ];

  const featuredProjects = [
    {
      title: "SmartCV",
      description:
        "Full-stack AI web platform that helps users to create, customize, and optimize professional resumes. With built-in templates, live editing and AI-driven resume analysis.",
    },
    {
      title: "Fusion Chat",
      description:
        "Real-time chat app built using Socket.io and MongoDB with custom avatars and group support.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      <button
        onClick={() => router.back()}
        className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Go back
      </button>

      <div className="relative w-full h-60 md:h-72 lg:h-80 rounded-xl overflow-hidden mb-4">
        <Image
          src="/about-banner.jpg"
          alt="About Rohan Banner"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <h1 className="text-4xl font-serif tracking-tight text-foreground text-center px-4">
            <span className="dark:text-primary text-zinc-200">
              Crafting Code, Shaping Tomorrow&apos;s Web ✨
            </span>
          </h1>
        </div>
      </div>

      <section className="text-center space-y-4">
        <h1 className="text-4xl font-serif tracking-tight text-foreground">
          <span className="text-primary">Rohan Vernekar</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          I&apos;m a{" "}
          <span className="text-primary font-medium">Full-Stack Developer</span>{" "}
          based in <span className="font-medium">Bengaluru</span>, currently
          pursuing my Bachelor&apos;s in Information Science. I build fast,
          responsive, and intelligent web applications using modern tech stacks
          and <span className="font-medium">AI tools</span>. Beyond the screen,
          I&apos;m passionate about sports - especially{" "}
          <span className="font-medium">football</span>,{" "}
          <span className="font-medium">cricket</span>, and{" "}
          <span className="font-medium">volleyball</span>. Always learning,
          always building - one line of code and one game at a time.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-serif text-center">⚒️ Tech Stack</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {techStack.map((stack) => (
            <div
              key={stack.title}
              className="rounded-xl bg-muted/20 border backdrop-blur-md p-6 shadow-md transition hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-3">{stack.title}</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                {stack.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-serif text-center">
          🚀 Featured Projects
        </h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <div
              key={project.title}
              className="rounded-xl bg-muted/20 border backdrop-blur-md p-6 shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" /> {project.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {project.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/projects">
            <button className="text-sm font-medium text-primary hover:underline mt-4">
              View All Projects →
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
