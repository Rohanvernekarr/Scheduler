import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { CalendarClock, CheckCircle2, ExternalLink, Loader2, PlugZap, Unplug } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  disconnectGoogleCalendar,
  getGoogleCalendarConnectUrl,
  getIntegrations,
} from '../../../lib/api';

type IntegrationStatus = {
  google?: {
    connected: boolean;
    email?: string | null;
    syncEnabled?: boolean;
    calendarId?: string;
    updatedAt?: string;
  };
};

export function IntegrationsSection() {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery<IntegrationStatus>({
    queryKey: ['integrations'],
    queryFn: getIntegrations,
    retry: 1,
  });

  const connectGoogle = useMutation({
    mutationFn: getGoogleCalendarConnectUrl,
    onSuccess: (url) => {
      window.location.href = url;
    },
    onError: () => toast.error('Could not start Google Calendar connection'),
  });

  const disconnectGoogle = useMutation({
    mutationFn: disconnectGoogleCalendar,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['integrations'] });
      toast.success('Google Calendar disconnected');
    },
    onError: () => toast.error('Could not disconnect Google Calendar'),
  });

  const google = data?.google;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <IntegrationCard
        icon={<CalendarClock size={20} />}
        name="Google Calendar"
        description="Check calendar conflicts before showing slots and create calendar events when guests book."
        connected={!!google?.connected}
        detail={error ? 'Could not load integration status. Check API auth/CORS and server logs.' : google?.email || google?.calendarId}
        loading={isLoading || connectGoogle.isPending || disconnectGoogle.isPending}
        onConnect={() => connectGoogle.mutate()}
        onDisconnect={() => disconnectGoogle.mutate()}
      />
      <IntegrationCard
        icon={<PlugZap size={20} />}
        name="Zoom Meetings"
        description="Generate meeting links for confirmed bookings."
        comingSoon
      />
      <IntegrationCard
        icon={<PlugZap size={20} />}
        name="Slack"
        description="Send booking and cancellation notifications to a workspace channel."
        comingSoon
      />
      <IntegrationCard
        icon={<PlugZap size={20} />}
        name="Outlook"
        description="Sync availability with Microsoft 365 calendars."
        comingSoon
      />
    </div>
  );
}

function IntegrationCard({
  icon,
  name,
  description,
  connected,
  detail,
  comingSoon,
  loading,
  onConnect,
  onDisconnect,
}: {
  icon: ReactNode;
  name: string;
  description: string;
  connected?: boolean;
  detail?: string | null;
  comingSoon?: boolean;
  loading?: boolean;
  onConnect?: () => void;
  onDisconnect?: () => void;
}) {
  return (
    <div className="p-5 md:p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col justify-between hover:bg-white/[0.04] transition-all min-h-[190px]">
      <div>
        <div className="flex justify-between items-start mb-5">
          <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/60">
            {icon}
          </div>
          {connected ? (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-300">
              <CheckCircle2 size={12} />
              Connected
            </span>
          ) : comingSoon ? (
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Soon</span>
          ) : null}
        </div>
        <h4 className="text-white font-bold">{name}</h4>
        <p className="text-zinc-500 text-xs mt-1 leading-relaxed">{description}</p>
        {detail && <p className="text-zinc-400 text-xs mt-4 truncate">{detail}</p>}
      </div>

      <div className="mt-6">
        {comingSoon ? (
          <button disabled className="text-[10px] font-black uppercase tracking-widest text-zinc-700 cursor-not-allowed">
            Not available
          </button>
        ) : connected ? (
          <button
            type="button"
            onClick={onDisconnect}
            disabled={loading}
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white disabled:opacity-50"
          >
            {loading ? <Loader2 size={13} className="animate-spin" /> : <Unplug size={13} />}
            Disconnect
          </button>
        ) : (
          <button
            type="button"
            onClick={onConnect}
            disabled={loading}
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white hover:text-zinc-300 disabled:opacity-50"
          >
            {loading ? <Loader2 size={13} className="animate-spin" /> : <ExternalLink size={13} />}
            Connect
          </button>
        )}
      </div>
    </div>
  );
}
