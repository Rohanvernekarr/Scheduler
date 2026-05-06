import { useEffect, useState } from 'react';
import { Trash2, Smartphone, Laptop, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import { authClient } from '@repo/auth/client';

export function SecuritySection() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await authClient.listSessions();
      if (res.data) setSessions(res.data);
    } catch (err) {
      console.error('Failed to fetch sessions:', err);
    } finally {
      setLoadingSessions(false);
    }
  };

  const handleRevokeSession = async (token: string) => {
    if (!confirm('Are you sure you want to log out of this device?')) return;
    setActionLoading(token);
    try {
      await authClient.revokeSession({ token });
      await fetchSessions();
    } catch (err) {
      console.error('Failed to revoke session:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleRevokeOtherSessions = async () => {
    if (!confirm('This will log you out of all other devices. Continue?')) return;
    setActionLoading('others');
    try {
      await authClient.revokeOtherSessions();
      await fetchSessions();
    } catch (err) {
      console.error('Failed to revoke other sessions:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const getDeviceIcon = (userAgent: string) => {
    if (/mobile/i.test(userAgent)) return <Smartphone size={16} />;
    return <Laptop size={16} />;
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Security Intro */}
      <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-[2rem] p-8 flex items-center gap-6">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
          <ShieldCheck size={24} />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg">Account Security</h3>
          <p className="text-zinc-500 text-sm mt-1">
            Manage your active sessions and devices. Revoke any unrecognized access immediately.
          </p>
        </div>
      </div>

      {/* Sessions Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Active Sessions</p>
          {sessions.length > 1 && (
            <button 
              onClick={handleRevokeOtherSessions}
              disabled={actionLoading === 'others'}
              className="text-[10px] font-bold text-destructive hover:underline uppercase tracking-widest disabled:opacity-50"
            >
              {actionLoading === 'others' ? 'Revoking...' : 'Log out of all other devices'}
            </button>
          )}
        </div>

        <div className="grid gap-3">
          {loadingSessions ? (
            [1, 2].map(i => (
              <div key={i} className="h-16 bg-white/[0.02] border border-white/5 rounded-2xl animate-pulse" />
            ))
          ) : sessions.length === 0 ? (
            <div className="p-12 text-center border border-dashed border-white/5 rounded-[2rem]">
              <AlertCircle className="mx-auto text-zinc-800 mb-2" size={24} />
              <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest">No active sessions found</p>
            </div>
          ) : (
            sessions.map((session) => (
              <div 
                key={session.token} 
                className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between group hover:bg-white/[0.04] transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-xl text-zinc-400">
                    {getDeviceIcon(session.userAgent || '')}
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold flex items-center gap-2">
                      {session.userAgent?.split(' ')[0] || 'Device'}
                      {session.isCurrent && (
                        <span className="text-[8px] bg-emerald-500/20 text-emerald-500 px-2 py-0.5 rounded-full font-black uppercase tracking-[0.1em]">Current</span>
                      )}
                    </p>
                    <p className="text-[10px] text-zinc-500 font-bold tracking-widest mt-0.5">
                      {session.ipAddress || '127.0.0.1'} • {new Date(session.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {!session.isCurrent && (
                  <button 
                    onClick={() => handleRevokeSession(session.token)}
                    disabled={actionLoading === session.token}
                    className="text-zinc-700 hover:text-destructive transition-colors p-2"
                  >
                    {actionLoading === session.token ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
