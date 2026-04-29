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
      className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 min-h-[80vh]"
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
            className="space-y-6 md:space-y-10"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 pb-4 md:pb-8 border-b border-white/5">
              <div>
                <h1 className="text-2xl md:text-4xl font-black tracking-tighter text-white uppercase italic leading-none">{activeTab}</h1>
                <p className="text-white/30 text-[10px] md:text-sm mt-1 md:mt-1 font-medium">
                  {getDescription(activeTab)}
                </p>
              </div>
              {activeTab === 'profile' && (
                <div className="flex gap-2 w-full sm:w-auto mt-1 md:mt-0">
                  {isEditing ? (
                    <>
                      <button onClick={() => setIsEditing(false)} className="flex-1 sm:flex-none px-3 py-2 rounded-lg border border-white/10 text-[9px] md:text-xs font-bold uppercase tracking-widest text-zinc-400">Cancel</button>
                      <button onClick={handleSave} className="flex-1 sm:flex-none px-3 py-2 rounded-lg bg-white text-black text-[9px] md:text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-lg">
                        {isSaving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                        Save
                      </button>
                    </>
                  ) : (
                    <button onClick={() => setIsEditing(true)} className="w-full sm:w-auto px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-[9px] md:text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all">Edit Profile</button>
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
