export interface AvailabilitySlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
}

export const DURATIONS = [15, 30, 45, 60];
export const INTERVALS = [0, 15, 30, 45];
export const HOURS = Array.from({ length: 24 }, (_, i) => i);
