import { useState } from "react";
import { Send, Loader2, Info } from "lucide-react";
import { API } from "../../lib/config";

export function NewsletterPage() {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !content) return;

    if (!confirm("Are you sure you want to broadcast this newsletter to ALL opted-in users?")) {
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch(`${API}/admin/notifications/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, content }),
        credentials: "include",
      });

      const result = await res.json() as { data: { sentCount: number }, error?: string };

      if (!res.ok) {
        throw new Error(result.error || "Failed to send newsletter.");
      }

      setStatus({ 
        type: "success", 
        message: `Success! Broadcast started for ${result.data.sentCount} users.` 
      });
      setSubject("");
      setContent("");
    } catch (err) {
      console.error(err);
      setStatus({ 
        type: "error", 
        message: err instanceof Error ? err.message : "An unexpected error occurred." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Newsletter Broadcast</h1>
        <p className="text-muted-foreground mt-1 text-sm">Send updates to users who have opted into the newsletter protocol.</p>
      </div>

      <div className="grid gap-6">
        <div className="p-4 rounded-lg bg-zinc-900/50 border border-border flex items-start gap-3">
          <Info size={18} className="text-muted-foreground mt-0.5" />
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Your message will be sent in a professional HTML template.</p>
            <p>BullMQ will handle the sending in the background to ensure reliability.</p>
          </div>
        </div>

        <form onSubmit={handleSend} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Subject</label>
            <input
              type="text"
              placeholder="e.g. Protocol Update: New Features for Q3"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-zinc-950 border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-foreground/20 transition-all placeholder:text-zinc-700"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Content (HTML supported)</label>
            <textarea
              placeholder="Write your message here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              className="w-full bg-zinc-950 border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-foreground/20 transition-all font-mono text-sm placeholder:text-zinc-700"
              required
            />
          </div>

          {status && (
            <div className={`p-4 rounded-xl border text-sm ${
              status.type === "success" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-destructive/10 border-destructive/20 text-destructive"
            }`}>
              {status.message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !subject || !content}
            className="w-full bg-foreground text-background font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-xs"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>
                <Send size={16} />
                Launch Broadcast
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
