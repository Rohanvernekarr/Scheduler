export interface Meeting {
  id: string; title: string; type: string;
  startTime: string; endTime: string; meetingLink?: string; createdAt: string;
  participants: { id: string; email: string; status: string }[];
}

export interface Booking {
  id: string; guestEmail: string;
  startTime: string; endTime: string;
  status: "CONFIRMED" | "CANCELLED"; createdAt: string;
}

export interface AvailSlot {
  id: string; dayOfWeek: number; startTime: string; endTime: string;
}

export interface UserDetail {
  id: string; name: string; email: string; role: string;
  emailVerified: boolean; createdAt: string; username?: string;
  company?: { name: string };
  meetingsAsHost: Meeting[];
  bookingsAsHost: Booking[];
  availabilities: AvailSlot[];
}
