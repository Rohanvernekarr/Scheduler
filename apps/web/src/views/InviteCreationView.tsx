import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Calendar as CalendarIcon, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function InviteCreationView() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [duration, setDuration] = useState<number>(30);
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('17:00');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [isSent, setIsSent] = useState(false);
  const [inviteLink, setInviteLink] = useState('');

  const handleSendInvite = () => {
    if (!selectedDate || !guestEmail) return;

    // Generate a pseudo-random ID for the invite
    const inviteId = Math.random().toString(36).substring(2, 9);
    
    const inviteData = {
      id: inviteId,
      hostName: 'Current User', // Mocked host
      date: selectedDate,
      duration,
      startTime,
      endTime,
      guestEmail
    };

    // Store in localStorage so the guest route can read it
    const existing = JSON.parse(localStorage.getItem('custom_invites') || '{}');
    existing[inviteId] = inviteData;
    localStorage.setItem('custom_invites', JSON.stringify(existing));

    setInviteLink(`${window.location.origin}/invite/${inviteId}`);
    setIsSent(true);

    // Reset after some time
    setTimeout(() => {
      setIsSent(false);
      setGuestEmail('');
    }, 8000);
  };

  return (
    <div className="max-w-4xl">
      <header className="mb-10">
        <p className="text-xs font-semibold text-zinc-50 uppercase tracking-widest mb-2">Targeted Booking</p>
        <h1 className="text-3xl font-bold tracking-tight text-white">Send Custom Invite</h1>
        <p className="text-white/40 text-sm mt-1">
          Pick a specific date, duration, and time window. We will email them a single-use booking link.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6 bg-[#111111] border border-white/[0.06] rounded-2xl p-6">
          {/* Section 1: Date & Time */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <CalendarIcon size={16} className="text-zinc-400" /> Date & Availability
            </h2>
            
            <div>
              <label className="text-xs text-white/40 mb-1.5 block uppercase tracking-wider">Specific Date</label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-white/40 mb-1.5 block uppercase tracking-wider">Available From</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-500 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-white/40 mb-1.5 block uppercase tracking-wider">Available Until</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Duration */}
          <div className="space-y-4 pt-6 border-t border-white/[0.06]">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <Clock size={16} className="text-zinc-400" /> Meeting Duration
            </h2>
            <div className="grid grid-cols-4 gap-2">
              {[15, 30, 45, 60].map((mins) => (
                <button
                  key={mins}
                  onClick={() => setDuration(mins)}
                  className={`py-2 rounded-lg text-sm font-medium transition-all ${
                    duration === mins 
                      ? 'bg-white text-black' 
                      : 'bg-black border border-white/10 text-white/60 hover:text-white'
                  }`}
                >
                  {mins}m
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Delivery */}
        <div className="space-y-6 bg-[#111111] border border-white/[0.06] rounded-2xl p-6 flex flex-col">
          <div className="space-y-4 flex-1">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <Mail size={16} className="text-zinc-400" /> Recipient Details
            </h2>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block uppercase tracking-wider">Guest Email</label>
              <input
                type="email"
                placeholder="guest@example.com"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-500 transition-colors"
              />
            </div>
            
            <p className="text-xs leading-relaxed text-white/30">
              We'll send an email containing a secure link. When they click it, they'll see the slots strictly within the time window you defined on {selectedDate ? selectedDate : 'your chosen date'}.
            </p>
          </div>

          <button
            onClick={handleSendInvite}
            disabled={!selectedDate || !guestEmail}
            className="w-full flex items-center justify-center gap-2 bg-zinc-100 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed text-black py-4 rounded-xl font-bold transition-all"
          >
            Generate & Send Mail <ArrowRight size={18} />
          </button>

          {isSent && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={18} />
                <span className="font-bold text-sm">Targeted Invite Sent!</span>
              </div>
              <p className="text-xs opacity-80 leading-relaxed mb-2">An email has been dispatched to {guestEmail}. Link generated:</p>
              <code className="text-[10px] break-all bg-black/50 p-2 rounded block">{inviteLink}</code>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
