import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Card, Button } from '@repo/ui';
import { Calendar, Clock, Globe, ChevronRight } from 'lucide-react';

const API_URL = 'http://localhost:8000/api/v1';

export default function BookingView() {
  const { username } = useParams();
  
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['public-user', username],
    queryFn: () => axios.get(`${API_URL}/users/profile/${username}`).then(res => res.data.data),
  });

  if (isLoading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-bold animate-pulse">Loading Profile...</div>;
  
  if (error || !user) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-500 font-bold">User Not Found</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-6 md:p-12 selection:bg-indigo-500/30">
      {/* Background blobs for premium feel */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left Side: Profile Info */}
        <Card className="lg:w-1/3 p-8 border-white/5 bg-slate-900/40 sticky top-12 h-fit">
          <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-3xl font-black mb-6 shadow-2xl shadow-indigo-500/20 italic">
            {user.name[0]}
          </div>
          <h1 className="text-3xl font-black mb-2">{user.name}</h1>
          <p className="text-slate-500 font-medium mb-8">@{user.username}</p>
          
          <div className="space-y-4 pt-6 border-t border-white/5">
            <div className="flex items-center gap-3 text-slate-400">
              <Clock size={18} className="text-indigo-400" />
              <span className="text-sm font-semibold">30 Min Meeting</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <Globe size={18} className="text-indigo-400" />
              <span className="text-sm font-semibold">UTC (Greenwich Mean Time)</span>
            </div>
          </div>
        </Card>

        {/* Right Side: Booking Logic */}
        <div className="flex-1 space-y-8">
          <Card className="p-8 border-white/5 bg-slate-900/40">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Calendar className="text-indigo-400" />
              Select a Date & Time
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Calendar Mockup */}
              <div className="space-y-6">
                 {/* This would be the PremiumDateTimePicker in a real app */}
                 <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-black uppercase text-slate-600 tracking-widest mb-4">
                   {['S','M','T','W','T','F','S'].map(d => <div key={d}>{d}</div>)}
                 </div>
                 <div className="grid grid-cols-7 gap-2">
                   {Array.from({ length: 31 }, (_, i) => (
                     <button 
                       key={i} 
                       className={`h-10 rounded-xl font-bold text-sm transition-all ${i === 14 ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/40' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                     >
                       {i + 1}
                     </button>
                   ))}
                 </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-4">
                <p className="font-bold text-slate-400 uppercase tracking-widest text-xs">Available Slots</p>
                {['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'].map(time => (
                  <button 
                    key={time}
                    className="w-full p-4 rounded-2xl border border-white/5 bg-white/3 hover:bg-white/5 hover:border-indigo-500/30 transition-all flex items-center justify-between group"
                  >
                    <span className="font-bold text-slate-200">{time}</span>
                    <ChevronRight size={18} className="text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          </Card>

          <div className="flex justify-end pt-4">
             <Button size="lg" className="px-12 py-4 text-lg shadow-2xl shadow-indigo-500/40">
                Confirm Booking
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
