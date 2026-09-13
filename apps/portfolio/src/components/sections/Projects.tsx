import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "../static/Allproject";

function Projects() {
  return (
   <div className="space-y-6">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    {projects.slice(0, 2).map((project) => (
                      <ProjectCard key={project.title} project={project} />
                    ))}
                    
                  </div>
                  
                  <motion.div 
                    className="text-center pt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Link href="/projects">
                      <Button variant="outline" className="gap-2 transition-colors w-full sm:w-auto">
                        View All Projects
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </Link>
                  </motion.div>
            </div>
  )
}

export default Projects;