import {
  Briefcase, Calendar,
 
} from "lucide-react";
import { motion } from "framer-motion";


const experiences = [
   {
    id: 1,
    title: "Software Engineer",
    company: "Justwalkinrooms",
    period: "May 2026 - Present",
    description: "Working on a full-stack hospitality booking platform for hotel discovery, destination pages, supplier inventory management, bookings, payments, user dashboards, and AI-assisted travel experiences. Refactoring large frontend modules into scalable feature-based architecture, improving responsive UI with Tailwind CSS, optimizing API usage, and integrating backend services for supplier operations, availability, OTA sync, authentication, and booking workflows.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "PostgreSQL", "Prisma", "TanStack Query", "Axios", "Google Maps API", "Razorpay"],
    type: "Full Time"
  },
     {
    id: 2,
    title: "Agentic AI Intern",
    company: "Innomatics Research Labs",
    period: "Feb 2026 - May 2026",
    description: "Working on building autonomous AI systems that can plan, reason, and take actions across tools and workflows. Focus is on designing agent-based architectures, integrating LLMs with real-world applications, and developing intelligent pipelines for tasks like automation, data analysis, and decision support. Turning complex problems into practical AI-driven solutions.",
    technologies: ["Python", "FastAPI", "AWS", "LangChain", "OpenAI", "LangGraph"],
    type: "Internship"
  },
  {
    id: 3,
    title: "Freelance Full‑Stack Engineer (Available)",
    company: "Independent / Freelance",
    period: "Aug 2025 – Present", 
    description: "Available for freelance contracts. I build production-ready full‑stack web applications with real‑time features, role-based access, and secure payment integration. Recently delivered a multi‑booking platform with real‑time availability checks, multi‑role scheduling, and Razorpay payment processing.",
    technologies: ["Next.js", "TypeScript", "Node.js", "Express", "PostgreSQL", "Razorpay", "Tailwind CSS", "Redis", "Prisma"],
    type: "Freelance"
  },
  
];


export function Experience() {
    return (
       <div className="space-y-3">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative  rounded-xl p-2 transition-all hover:shadow-lg"
                >
                  <div className="mb-3">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <h3 className="text-lg font-bold group-hover:text-primary transition-colors min-w-0 wrap-break-words">
                          {exp.title}
                        </h3>
                        <div className="ml-2 bg-primary/10 text-primary text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          {exp.type}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-primary whitespace-nowrap shrink-0 mt-1.5">
                        <Calendar className="h-3 w-3" />
                        {exp.period}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      {exp.company}
                    </p>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-muted px-3 py-1 rounded-full hover:bg-primary/20 hover:text-primary transition-colors cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  
                </motion.div>
              ))}
            </div>
    );
}