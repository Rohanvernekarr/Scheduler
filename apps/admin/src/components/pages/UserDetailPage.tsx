import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, BookOpen, Clock } from "lucide-react";
import { DataTable } from "../shared/DataTable";
import { SectionHead } from "../shared/SectionHead";
import { UserProfileCard } from "../user-detail/UserProfileCard";
import { UserStatCards } from "../user-detail/UserStatCards";
import { MEETING_COLS, BOOKING_COLS, AVAIL_COLS } from "../user-detail/columns";
import { MeetingSheet } from "../user-detail/MeetingSheet";
import { BookingSheet } from "../user-detail/BookingSheet";
import { AvailabilitySheet } from "../user-detail/AvailabilitySheet";
import type { UserDetail, Meeting, Booking, AvailSlot } from "../user-detail/types";
import { API } from "../../lib/config";

export function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<AvailSlot | null>(null);

  const { data, isLoading, isError, error } = useQuery<UserDetail>({
    queryKey: ["admin-user-detail", id],
    queryFn: async () => {
      const res = await fetch(`${API}/admin/users/${id}`, { credentials: "include" });
      if (!res.ok) throw new Error(await res.text());
      return (await res.json()).data.user as UserDetail;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 gap-3 text-muted-foreground">
        <div className="h-4 w-4 rounded-full border-2 border-foreground border-t-transparent animate-spin" />
        <span className="text-sm">Loading user analytics…</span>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-8 text-center text-destructive text-sm">
        {error instanceof Error ? error.message : "Failed to load user."}
      </div>
    );
  }

  return (
    <>
      <div className="fade-in space-y-6 max-w-7xl">

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} /> Back to Users
        </button>

        <UserProfileCard user={data} />
        <UserStatCards user={data} />

        <section>
          <SectionHead icon={Calendar} title="Meetings Hosted" count={data.meetingsAsHost.length} />
          <DataTable
            data={data.meetingsAsHost} columns={MEETING_COLS}
            rowKey={(m) => m.id} pageSize={10}
            searchField={(m) => m.title} searchPlaceholder="Search by meeting title…"
            onRowClick={(m) => setSelectedMeeting(m)}
          />
        </section>

        <section>
          <SectionHead icon={BookOpen} title="Bookings" count={data.bookingsAsHost.length} />
          <DataTable
            data={data.bookingsAsHost} columns={BOOKING_COLS}
            rowKey={(b) => b.id} pageSize={10}
            searchField={(b) => b.guestEmail} searchPlaceholder="Search by guest email…"
            onRowClick={(b) => setSelectedBooking(b)}
          />
        </section>

        <section>
          <SectionHead icon={Clock} title="Availability Schedule" count={data.availabilities.length} />
          <DataTable
            data={data.availabilities} columns={AVAIL_COLS}
            rowKey={(a) => a.id} pageSize={10}
            onRowClick={(a) => setSelectedSlot(a)}
          />
        </section>

      </div>

      {/* Detail sheets — rendered outside the max-w container so they span full height */}
      <MeetingSheet meeting={selectedMeeting} onClose={() => setSelectedMeeting(null)} />
      <BookingSheet booking={selectedBooking} onClose={() => setSelectedBooking(null)} />
      <AvailabilitySheet slot={selectedSlot} onClose={() => setSelectedSlot(null)} />
    </>
  );
}
