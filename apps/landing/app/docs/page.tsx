import type { ReactNode } from "react";
import { MinimalNav } from "../components/MinimalNav";

export default function DocsPage(): ReactNode {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <MinimalNav />
      <section className="pt-40 pb-24 flex-1 relative overflow-hidden">
        {/* Background Text */}
        <div className="absolute top-[-90px] left-1/2 -translate-x-1/2 select-none pointer-events-none z-0 opacity-[0.01]">
          <span className="text-[20vw] sm:text-[25vw] font-black tracking-tighter uppercase whitespace-nowrap">
            Docs
          </span>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col items-center mb-16 text-center">
              <span className="tech-label mb-4 block">Operation Protocol / v1.0</span>
              <h1 className="tech-heading text-3xl md:text-6xl mb-6">Documentation</h1>
              <p className="text-subtle text-lg max-w-2xl leading-relaxed">
                Everything you need to deploy, integrate, and extend the Scheduler system. 
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
              {/* Sidebar Navigation */}
              <aside className="lg:w-64 flex-shrink-0">
                <div className="lg:sticky lg:top-32 flex flex-row lg:flex-col gap-8 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-hide border-b lg:border-0 border-white/5 px-2 lg:px-0">
                  <div className="flex flex-col gap-3 min-w-fit">
                    <span className="tech-label text-foreground/40 text-[9px]">GETTING STARTED</span>
                    <a href="#overview" className="text-xs font-bold hover:text-accent transition-colors">Overview</a>
                    <a href="#setup" className="text-xs font-bold text-foreground/40 hover:text-accent transition-colors">Local Setup</a>
                    <a href="#structure" className="text-xs font-bold text-foreground/40 hover:text-accent transition-colors">Architecture</a>
                  </div>
                  <div className="flex flex-col gap-3 min-w-fit">
                    <span className="tech-label text-foreground/40 text-[9px]">API REFERENCE</span>
                    <a href="#auth" className="text-xs font-bold text-foreground/40 hover:text-accent transition-colors">Authentication</a>
                    <a href="#endpoints" className="text-xs font-bold text-foreground/40 hover:text-accent transition-colors">Endpoints</a>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <div className="flex-1 space-y-24">
                {/* Overview */}
                <div id="overview" className="space-y-6 scroll-mt-40">
                  <h2 className="tech-heading text-2xl border-l-2 border-accent pl-6 py-1">Overview</h2>
                  <p className="text-subtle text-sm md:text-base leading-relaxed">
                    Scheduler is a high-performance meeting coordination engine. It uses an <b>Industrial Noir</b> aesthetic and is built with a focus on precision and zero scheduling friction.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    <div className="tech-border p-6 rounded-lg bg-white/[0.01]">
                      <h3 className="tech-label text-white text-xs mb-3">Global Sync</h3>
                      <p className="text-subtle text-xs leading-relaxed">Automated coordination across time zones with sub-millisecond precision.</p>
                    </div>
                    <div className="tech-border p-6 rounded-lg bg-white/[0.01]">
                      <h3 className="tech-label text-white text-xs mb-3">Autonomous Workflows</h3>
                      <p className="text-subtle text-xs leading-relaxed">Zero-touch meeting handshake with automated invites and conflict resolution.</p>
                    </div>
                  </div>
                </div>

                {/* Local Setup */}
                <div id="setup" className="space-y-6 scroll-mt-40">
                  <h2 className="tech-heading text-2xl border-l-2 border-accent pl-6 py-1">Local Execution</h2>
                  <p className="text-subtle text-sm md:text-base leading-relaxed">
                    Follow these steps to run the full Scheduler stack on your local machine.
                  </p>
                  
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/80">1. Prerequisites</h3>
                      <ul className="list-disc list-inside text-sm text-subtle space-y-2 ml-4">
                        <li>Node.js 20 or higher</li>
                        <li>pnpm 9 or higher</li>
                        <li>Docker (for database orchestration)</li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/80">2. Installation</h3>
                      <div className="tech-border rounded-lg p-5 bg-black/50">
                        <pre className="text-[11px] font-mono text-accent">
                          <code>
{`# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env
cp apps/web/.env.example apps/web/.env`}
                          </code>
                        </pre>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/80">3. Boot System</h3>
                      <div className="tech-border rounded-lg p-5 bg-black/50">
                        <pre className="text-[11px] font-mono text-green-500">
                          <code>
{`# Launch all services
pnpm dev`}
                          </code>
                        </pre>
                      </div>
                      <p className="text-[10px] text-subtle italic">
                        * Local services will be available at: Web (5174), Landing (3000), API (8000).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Architecture */}
                <div id="structure" className="space-y-6 scroll-mt-40">
                  <h2 className="tech-heading text-2xl border-l-2 border-accent pl-6 py-1">Architecture</h2>
                  <p className="text-subtle text-sm md:text-base leading-relaxed">
                    The system is structured as a Turborepo monorepo for maximum modularity and build efficiency.
                  </p>
                  <div className="tech-border rounded-lg p-6 font-mono text-xs text-subtle bg-white/[0.01]">
                    <div className="space-y-2">
                      <div className="flex gap-4"><span className="text-accent">/apps/web</span> <span>Core dashboard interface</span></div>
                      <div className="flex gap-4"><span className="text-accent">/apps/landing</span> <span>Product presentation site</span></div>
                      <div className="flex gap-4"><span className="text-accent">/apps/api</span> <span>Backend service layer</span></div>
                      <div className="flex gap-4"><span className="text-accent">/packages/@repo/auth</span> <span>Shared authentication logic</span></div>
                      <div className="flex gap-4"><span className="text-accent">/packages/@repo/ui</span> <span>Design system components</span></div>
                    </div>
                  </div>
                </div>

                {/* API Reference */}
                <div id="auth" className="space-y-6 scroll-mt-40">
                  <h2 className="tech-heading text-2xl border-l-2 border-accent pl-6 py-1">Authentication</h2>
                  <p className="text-subtle text-sm md:text-base leading-relaxed">
                    Scheduler uses session-based authentication via <b>Better Auth</b>. All API requests must include session cookies.
                  </p>
                  <div className="tech-border rounded-lg p-5 bg-black/50">
                    <pre className="text-[11px] font-mono text-foreground/70">
                      <code>
{`# Endpoint: /api/auth/login
# Method: POST
{
  "email": "user@example.com",
  "password": "..."
}`}
                      </code>
                    </pre>
                  </div>
                </div>

                <div id="endpoints" className="space-y-6 scroll-mt-40">
                  <h2 className="tech-heading text-2xl border-l-2 border-accent pl-6 py-1">Endpoints</h2>
                  <div className="space-y-4">
                    {[
                      { method: "GET", path: "/api/v1/availability/:userId", desc: "Retrieve user scheduling windows" },
                      { method: "POST", path: "/api/v1/bookings", desc: "Create a new meeting entry" },
                      { method: "GET", path: "/api/v1/meetings", desc: "Fetch active sessions" },
                      { method: "PATCH", path: "/api/v1/bookings/:id/cancel", desc: "Invalidate a booking" }
                    ].map((api, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 tech-border rounded-lg bg-white/[0.02]">
                        <span className={`text-[9px] font-black px-2 py-1 rounded w-12 text-center ${api.method === 'GET' ? 'bg-white/10' : 'bg-accent text-white'}`}>{api.method}</span>
                        <code className="text-xs font-mono text-subtle flex-1">{api.path}</code>
                        <span className="text-[10px] text-foreground/40">{api.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
