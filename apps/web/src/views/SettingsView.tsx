import { useState, useEffect } from 'react';
import { useSession, updateUser } from '@repo/auth/client';
import { Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Component Imports
import { SettingsSidebar } from '../components/settings/SettingsSidebar';
import { ProfileSection } from '../components/settings/sections/ProfileSection';
import { PreferencesSection } from '../components/settings/sections/PreferencesSection';
import { NotificationsSection } from '../components/settings/sections/NotificationsSection';
import { SecuritySection } from '../components/settings/sections/SecuritySection';
import { IntegrationsSection } from '../components/settings/sections/IntegrationsSection';

type Tab = 'profile' | 'preferences' | 'notifications' | 'security' | 'integrations';

export default function SettingsView() {
  const { data: session, isPending, refetch } = useSession();
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
  });

  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        name: session.user.name || '',
      }));
    }
  }, [session]);

  if (isPending && !session) return <LoadingState />;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateUser({
        name: formData.name,
      });
      await refetch();
      setIsEditing(false);
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 min-h-[80vh]"
    >
      <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-10"
          >
            {/* Header */}
            <div className="flex justify-between items-end pb-8 border-b border-white/5">
              <div>
                <h1 className="text-4xl font-black tracking-tighter text-white uppercase">{activeTab}</h1>
                <p className="text-white/30 text-sm mt-1 font-medium">
                  {getDescription(activeTab)}
                </p>
              </div>
              {activeTab === 'profile' && (
                <div className="flex gap-3">
                  {isEditing ? (
                    <>
                      <button onClick={() => setIsEditing(false)} className="px-4 py-2 rounded-lg border border-white/10 text-zinc-400 text-xs font-bold uppercase tracking-widest">Cancel</button>
                      <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-white text-black text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                        {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                        Save Changes
                      </button>
                    </>
                  ) : (
                    <button onClick={() => setIsEditing(true)} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all">Edit Profile</button>
                  )}
                </div>
              )}
            </div>

            {/* Tab Content */}
            <div className="pt-4">
              {activeTab === 'profile' && (
                <ProfileSection 
                  user={session?.user} 
                  formData={formData} 
                  setFormData={setFormData} 
                  isEditing={isEditing} 
                />
              )}
              {activeTab === 'notifications' && <NotificationsSection />}
              {activeTab === 'security' && <SecuritySection />}
              {activeTab === 'integrations' && <IntegrationsSection />}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </motion.div>
  );
}

function getDescription(tab: Tab) {
  switch (tab) {
    case 'profile': return 'Manage your public identity and profile information.';
    case 'notifications': return 'Control how and when you receive system alerts.';
    case 'security': return 'Review your account security and active sessions.';
    case 'integrations': return 'Connect external platforms to sync your schedule.';
  }
}

function LoadingState() {
  return <div className="max-w-6xl mx-auto h-[60vh] bg-white/5 rounded-[3rem] animate-pulse" />;
}
