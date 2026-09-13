import {
  Container,
   Palette, Code2, Zap, Layers, Server, Database, Cloud, GitBranch, Box,
  Globe,Cpu, Network, Braces, TerminalSquare, Boxes, Hammer,
} from "lucide-react";

export const techStack = [
  {
    title: "Frontend",
    icon: Palette,
    items: [
      { name: "Next.js", icon: Globe },               
      { name: "React", icon: Braces },                
      { name: "TypeScript", icon: Code2 },            
      { name: "Tailwind CSS", icon: Palette },        
      { name: "Framer Motion", icon: Zap },           
      { name: "Vite", icon: TerminalSquare },         
      { name: "Redux", icon: Boxes },                 
    ],
  },
  {
    title: "Backend",
    icon: Server,
    items: [
      { name: "Node.js", icon: Server },              
      { name: "Express", icon: Network },             
      { name: "MongoDB", icon: Database },            
      { name: "PostgreSQL", icon: Database },         
      { name: "Prisma", icon: Cpu },                  
      { name: "Firebase", icon: Cloud },              
      { name: "REST", icon: Layers },                 
      { name: "GraphQL", icon: Layers },              
    ],
  },
  {
    title: "DevOps & Tools",
    icon: Hammer,
    items: [
      { name: "Git & GitHub", icon: GitBranch },      
      { name: "Docker", icon: Container },            
      { name: "AWS", icon: Cloud },                   
      { name: "CI/CD", icon: GitBranch },             
      { name: "Upstash", icon: Database },            
      { name: "Railway", icon: Server },              
      { name: "Postman", icon: Box },                 
    ],
  },
];