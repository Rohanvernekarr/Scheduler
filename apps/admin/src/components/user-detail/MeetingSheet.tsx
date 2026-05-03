import { ExternalLink, Users, Clock, CalendarDays } from "lucide-react";
import { Badge } from "../ui/badge";
import { DetailSheet } from "../shared/DetailSheet";
import type { Meeting } from "./types";

const RSVP_VARIANT: Record<string, "success" | "destructive" | "outline"> = {
  ACCEPTED: "success",
  DECLINED: "destructive",
  PENDING: "outline",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <div className="text-sm text-foreground">{children}</div>
    </div>
  );
}

interface Props {
  meeting: Meeting | null;
  onClose: () => void;
}

export function MeetingSheet({ meeting, onClose }: Props) {
  if (!meeting) return null;

  const start = new Date(meeting.startTime);
  const end = new Date(meeting.endTime);
  const durationMin = Math.round((end.getTime() - start.getTime()) / 60000);

  return (
    <DetailSheet isOpen={!!meeting} onClose={onClose} title="Meeting Details">
      <Field label="Title">{meeting.title}</Field>
      <Field label="Type">
        <Badge variant="secondary">{meeting.type}</Badge>
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Start">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={12} className="text-muted-foreground" />
            {start.toLocaleString()}
          </span>
        </Field>
        <Field label="End">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={12} className="text-muted-foreground" />
            {end.toLocaleString()}
          </span>
        </Field>
      </div>

      <Field label="Duration">
        <span className="flex items-center gap-1.5">
          <Clock size={12} className="text-muted-foreground" />
          {Math.floor(durationMin / 60)}h {durationMin % 60 > 0 ? `${durationMin % 60}m` : ""}
        </span>
      </Field>

      <Field label="Meeting Link">
        {meeting.meetingLink ? (
          <a href={meeting.meetingLink} target="_blank" rel="noreferrer"
            className="flex items-center gap-1.5 text-foreground underline underline-offset-2 hover:text-muted-foreground">
            <ExternalLink size={12} /> Open link
          </a>
        ) : <span className="text-muted-foreground">—</span>}
      </Field>

      <div>
        <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5">
          <Users size={12} /> Participants ({meeting.participants.length})
        </p>
        {meeting.participants.length === 0 ? (
          <p className="text-sm text-muted-foreground">No participants</p>
        ) : (
          <div className="space-y-2">
            {meeting.participants.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm text-foreground truncate">{p.email}</span>
                <Badge variant={RSVP_VARIANT[p.status] ?? "outline"} className="ml-2 flex-shrink-0">
                  {p.status}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>

      <Field label="Created">
        {new Date(meeting.createdAt).toLocaleString()}
      </Field>
    </DetailSheet>
  );
}
