export interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  category: 'Internal' | 'External' | 'Availability';
  description?: string;
  status?: string;
}

export interface DayData {
  date: Date;
  isCurrentMonth: boolean;
  events: CalendarEvent[];
}
