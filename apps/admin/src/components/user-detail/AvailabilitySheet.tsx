import { Clock } from "lucide-react";
import { DetailSheet } from "../shared/DetailSheet";
import type { AvailSlot } from "./types";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <div className="text-sm text-foreground">{children}</div>
    </div>
  );
}

interface Props {
  slot: AvailSlot | null;
  onClose: () => void;
}

export function AvailabilitySheet({ slot, onClose }: Props) {
  if (!slot) return null;

  const [sh, sm] = slot.startTime.split(":").map(Number);
  const [eh, em] = slot.endTime.split(":").map(Number);
  const mins = eh * 60 + em - (sh * 60 + sm);

  return (
    <DetailSheet isOpen={!!slot} onClose={onClose} title="Availability Details">
      <Field label="Day">
        <span className="font-medium">{DAYS[slot.dayOfWeek]}</span>
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Start Time">
          <span className="font-mono">{slot.startTime}</span>
        </Field>
        <Field label="End Time">
          <span className="font-mono">{slot.endTime}</span>
        </Field>
      </div>

      <Field label="Duration">
        <span className="flex items-center gap-1.5">
          <Clock size={12} className="text-muted-foreground" />
          {Math.floor(mins / 60)}h {mins % 60 > 0 ? `${mins % 60}m` : ""}
        </span>
      </Field>

      <Field label="Slot ID">
        <span className="font-mono text-xs text-muted-foreground">{slot.id}</span>
      </Field>
    </DetailSheet>
  );
}
