import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Github,
  LoaderCircle,
} from "lucide-react";
import { projects } from "@/components/static/Allproject";

type Project = (typeof projects)[number];

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const isDeployed = project.status === "deployed";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border/60 bg-card/70 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <div className="relative h-40 overflow-hidden bg-muted sm:h-44">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/5 to-transparent" />

        <span
          className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium shadow-sm backdrop-blur-md ${
            isDeployed
              ? "border-emerald-400/30 bg-emerald-950/70 text-emerald-200"
              : "border-amber-400/30 bg-amber-950/70 text-amber-200"
          }`}
        >
          {isDeployed ? (
            <CheckCircle2 className="size-3.5" />
          ) : (
            <LoaderCircle className="size-3.5 animate-spin" />
          )}
          {isDeployed ? "Live" : "In progress"}
        </span>

        {project.demo && (
          <Link
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title} live demo`}
            className="absolute right-3 top-3 grid size-8 place-items-center rounded-md border border-white/20 bg-black/50 text-white shadow-sm backdrop-blur-md transition hover:bg-black/70"
          >
            <ArrowUpRight className="size-4" />
          </Link>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-3">
          <h2 className="mb-1.5 text-lg font-semibold tracking-tight transition-colors group-hover:text-primary sm:text-xl">
            {project.title}
          </h2>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>

        <div className="mb-4 flex min-h-14 flex-wrap content-start gap-1.5 overflow-hidden">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="h-fit rounded-md border border-border/60 bg-muted/60 px-2 py-0.5 text-xs font-medium text-muted-foreground transition-colors group-hover:border-primary/20 group-hover:text-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-2.5 border-t border-border/60 pt-3">
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-xs font-medium transition hover:border-primary/30 hover:bg-muted"
            >
              <Github className="size-4" />
              Source
            </Link>
          )}
          {project.demo && (
            <Link
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 items-center gap-1.5 rounded-md bg-foreground px-3 text-xs font-medium text-background transition hover:bg-foreground/85"
            >
              Live demo
              <ArrowUpRight className="size-4" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
