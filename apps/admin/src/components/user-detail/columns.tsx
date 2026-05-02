import { Badge } from "../ui/badge";
import type { Meeting, Booking, AvailSlot } from "./types";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const MEETING_COLS = [
  {
    key: "title", label: "Meeting",
    render: (m: Meeting) => (
      <div>
        <p className="font-medium text-foreground">{m.title}</p>
        <p className="text-xs text-muted-foreground">{m.type}</p>
      </div>
    ),
  },
  {
    key: "participants", label: "Guests",
    render: (m: Meeting) => (
      <span className="text-sm text-muted-foreground">{m.participants.length}</span>
    ),
  },
  {
    key: "start", label: "Start",
    render: (m: Meeting) => (
      <span className="text-xs text-muted-foreground">
        {new Date(m.startTime).toLocaleString()}
      </span>
    ),
  },
  {
    key: "end", label: "End",
    render: (m: Meeting) => (
      <span className="text-xs text-muted-foreground">
        {new Date(m.endTime).toLocaleString()}
      </span>
    ),
  },
  {
    key: "link", label: "Link",
    render: (m: Meeting) =>
      m.meetingLink ? (
        <a href={m.meetingLink} target="_blank" rel="noreferrer"
          className="text-xs text-foreground underline underline-offset-2 hover:text-muted-foreground">
          Open
        </a>
      ) : <Badge variant="secondary">None</Badge>,
  },
];

export const BOOKING_COLS = [
  {
    key: "guest", label: "Guest Email",
    render: (b: Booking) => <span className="text-sm">{b.guestEmail}</span>,
  },
  {
    key: "start", label: "Start",
    render: (b: Booking) => (
      <span className="text-xs text-muted-foreground">
        {new Date(b.startTime).toLocaleString()}
      </span>
    ),
  },
  {
    key: "end", label: "End",
    render: (b: Booking) => (
      <span className="text-xs text-muted-foreground">
        {new Date(b.endTime).toLocaleString()}
      </span>
    ),
  },
  {
    key: "status", label: "Status",
    render: (b: Booking) => (
      <Badge variant={b.status === "CONFIRMED" ? "success" : "destructive"}>
        {b.status}
      </Badge>
    ),
  },
  {
    key: "booked", label: "Booked At",
    render: (b: Booking) => (
      <span className="text-xs text-muted-foreground">
        {new Date(b.createdAt).toLocaleDateString()}
      </span>
    ),
  },
];

export const AVAIL_COLS = [
  {
    key: "day", label: "Day",
    render: (a: AvailSlot) => (
      <span className="text-sm font-medium">{DAYS[a.dayOfWeek]}</span>
    ),
  },
  {
    key: "start", label: "Start",
    render: (a: AvailSlot) => <span className="text-sm font-mono">{a.startTime}</span>,
  },
  {
    key: "end", label: "End",
    render: (a: AvailSlot) => <span className="text-sm font-mono">{a.endTime}</span>,
  },
  {
    key: "duration", label: "Duration",
    render: (a: AvailSlot) => {
      const [sh, sm] = a.startTime.split(":").map(Number);
      const [eh, em] = a.endTime.split(":").map(Number);
      const mins = eh * 60 + em - (sh * 60 + sm);
      return (
        <span className="text-xs text-muted-foreground">
          {Math.floor(mins / 60)}h{mins % 60 > 0 ? ` ${mins % 60}m` : ""}
        </span>
      );
    },
  },
];
