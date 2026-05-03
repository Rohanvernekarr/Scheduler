import { Clock, CalendarDays, Mail } from "lucide-react";
import { Badge } from "../ui/badge";
import { DetailSheet } from "../shared/DetailSheet";
import type { Booking } from "./types";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <div className="text-sm text-foreground">{children}</div>
    </div>
  );
}

interface Props {
  booking: Booking | null;
  onClose: () => void;
}

export function BookingSheet({ booking, onClose }: Props) {
  if (!booking) return null;

  const start = new Date(booking.startTime);
  const end = new Date(booking.endTime);
  const durationMin = Math.round((end.getTime() - start.getTime()) / 60000);

  return (
    <DetailSheet isOpen={!!booking} onClose={onClose} title="Booking Details">
      <Field label="Booking ID">
        <span className="font-mono text-xs text-muted-foreground">{booking.id}</span>
      </Field>

      <Field label="Guest Email">
        <span className="flex items-center gap-1.5">
          <Mail size={12} className="text-muted-foreground" />
          {booking.guestEmail}
        </span>
      </Field>

      <Field label="Status">
        <Badge variant={booking.status === "CONFIRMED" ? "success" : "destructive"}>
          {booking.status}
        </Badge>
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

      <Field label="Booked At">
        {new Date(booking.createdAt).toLocaleString()}
      </Field>
    </DetailSheet>
  );
}
