"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { ProjectCard } from "@/components/projects/ProjectCard"
import { projects } from "@/components/static/Allproject"

export default function ProjectsPage() {
  const router = useRouter()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8 sm:space-y-12">
     
      <button
        onClick={() => router.back()}
        className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Go back
      </button>

      <h1 className="text-xl sm:text-2xl font-serif text-center mb-8 sm:mb-12">🚀 Projects Showcase</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  )
}
