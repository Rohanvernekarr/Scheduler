"use client";

import { useState } from "react";
import {
  FileText,
  Briefcase,
  Github,
  MapPin,
  Calendar,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { EmailButton } from "./EmailButton";
import { BlogPosts } from "./BlogPosts";
import { Experience } from "../static/Experience";
import { TechStack } from "./TechStack";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";
import Projects  from "./Projects";
import { techStack } from "../static/TechStack";
import { projects } from "../static/Allproject";

export function Hero() {
  const [activeTab, setActiveTab] = useState<"posts" | "projects" | "about" | "experience">("posts");

  return (
    <section className="flex flex-col items-center relative w-full max-w-4xl mx-auto">
      <EmailButton />

      <div className="w-full mt-0 sm:mt-8">
        {/* Cover Image */}
        <motion.div
          className="w-full h-34 sm:h-48 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 sm:rounded-t-xl relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/projects/rog3.jpg"
            alt="Cover"
            fill
            className="object-cover object-center sm:object-cover"
            priority
            sizes="(max-width: 640px) 100vw, 896px"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/60" />
        </motion.div>

        <div className="relative px-4 sm:px-6 pb-4 sm:border-x sm:border-b border-muted sm:rounded-b-xl">
          <motion.div
            className="absolute -top-12 sm:-top-16 left-4 sm:left-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-background hover:scale-105 transition-transform cursor-pointer shadow-lg overflow-hidden relative bg-muted">
              <Image
                src="/projects/rog.jpg"
                alt="Rohan Vernekar"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <div className="flex justify-end items-center gap-1 pt-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-9 w-9 hover:bg-primary/10 hover:text-primary"
              onClick={() => window.open("https://github.com/Rohanvernekarr", "_blank", "noopener,noreferrer")}
            >
              <Github className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-9 w-9 hover:bg-primary/10 hover:text-primary"
              onClick={() => window.open("https://www.linkedin.com/in/rohan-vernekar-b57913283/", "_blank", "noopener,noreferrer")}
            >
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-9 w-9 hover:bg-primary/10 hover:text-primary"
              onClick={() => window.open("https://x.com/Rohanvrnkr", "_blank", "noopener,noreferrer")}
            >
              <Twitter className="h-4 w-4" />
            </Button>
            <div className="w-px h-6 bg-border mx-1" />
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 text-sm rounded-full px-6 h-9"
                >
                  <FileText className="h-4 w-4" />
                  Resume
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>View Resume</DialogTitle>
                  <DialogDescription>
                    This will redirect you to Google Drive to view my resume.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex gap-3 mt-6">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      window.open(
                        "https://drive.google.com/file/d/1ZaN0fbrsEe1U_nGQiE78C3IF2IF_j6Iw/view?usp=drive_link",
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                  >
                    Open Resume
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Name and Bio */}
          <motion.div
            className="mt-4 sm:mt-4 space-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div>
              <h1 className="text-2xl sm:text-xl font-bold tracking-tight">Rohan Vernekar</h1>
              <p className="text-muted-foreground text-sm">@Rohanvrnkr</p>
            </div>

            <p className="leading-relaxed text-sm text-foreground/90">
              I&apos;m a <span className="font-semibold text-foreground">Software Engineer</span> based in Bengaluru.
              <br />
              Building things, exploring AI, and shipping ideas I&apos;d actually use.
            </p>

            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground pt-1">
              <span className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                <MapPin className="h-3.5 w-3.5" />
                Bengaluru, India
              </span>
              <span className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                <Briefcase className="h-3.5 w-3.5" />
                Full-Stack Development
              </span>
              <span className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                <Calendar className="h-3.5 w-3.5" />
                Available for freelance
              </span>
            </div>

            <div className="flex gap-4 pt-2 text-sm">
              <div>
                <span className="font-bold text-foreground">{projects.length}</span>
                <span className="text-muted-foreground ml-1">Projects</span>
              </div>
              <div>
                <span className="font-bold text-foreground">{techStack.reduce((acc, curr) => acc + curr.items.length, 0)}</span>
                <span className="text-muted-foreground ml-1">Skills</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex border-b border-muted mt-2">
          <button
            onClick={() => setActiveTab("posts")}
            className={`flex-1 px-4 py-3 text-sm font-semibold transition-all relative hover:bg-muted/50 ${
              activeTab === "posts"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              {/* <Sparkles className="h-4 w-4" /> */}
              Posts
            </span>
            {activeTab === "posts" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>

             <button
            onClick={() => setActiveTab("experience")}
            className={`flex-1 px-4 py-4 text-sm font-semibold transition-all relative hover:bg-muted/50 ${
              activeTab === "experience"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              {/* <Award className="h-4 w-4" /> */}
              Experience
            </span>
            {activeTab === "experience" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`flex-1 px-4 py-4 text-sm font-semibold transition-all relative hover:bg-muted/50 ${
              activeTab === "projects"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              {/* <Briefcase className="h-4 w-4" /> */}
              Projects
            </span>
            {activeTab === "projects" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab("about")}
            className={`flex-1 px-4 py-4 text-sm font-semibold transition-all relative hover:bg-muted/50 ${
              activeTab === "about"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              {/* <Code2 className="h-4 w-4" /> */}
              Tech
            </span>
            {activeTab === "about" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full mt-6 pb-16 px-4 sm:px-0"
        >
          {/* Posts Tab */}
          {activeTab === "posts" && (
            <div className="space-y-4">
              <BlogPosts />
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <Projects/>
          )}

          {/* Experience Tab */}
          {activeTab === "experience" && (
           <Experience/>
          )}

          {/* Tech Stack Tab */}
          {activeTab === "about" && (
            <TechStack/>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
