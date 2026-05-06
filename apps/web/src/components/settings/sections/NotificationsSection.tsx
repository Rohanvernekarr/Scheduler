import { useEffect, useState } from 'react';
import { SettingsToggle } from '../ui/SettingsPrimitives';
import { getNotificationSettings, updateNotificationSettings } from '../../../lib/api';

export function NotificationsSection() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotificationSettings()
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch notification settings:', err);
        setLoading(false);
      });
  }, []);

  const handleToggle = (key: string) => {
    const newVal = !settings[key];
    const updatedSettings = { ...settings, [key]: newVal };
    
    // Optimistic update
    setSettings(updatedSettings);

    updateNotificationSettings({ [key]: newVal })
      .catch((err) => {
        console.error('Failed to update setting:', err);
        // Rollback on error
        setSettings({ ...settings, [key]: !newVal });
      });
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-white/[0.02] border border-white/5 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (!settings) return <p className="text-zinc-500 italic">Failed to load settings.</p>;

  return (
    <div className="space-y-6">
      <SettingsToggle 
        label="Meeting Reminders" 
        description="Receive email alerts 15 minutes before your sessions." 
        active={settings.meetingReminders}
        onToggle={() => handleToggle('meetingReminders')}
      />
      <SettingsToggle 
        label="Weekly Digest" 
        description="Get a summary of your scheduling activity every Monday." 
        active={settings.weeklyDigest}
        onToggle={() => handleToggle('weeklyDigest')}
      />
      <SettingsToggle 
        label="New Booking Alerts" 
        description="Instant notification when someone books a slot." 
        active={settings.newBookingAlerts}
        onToggle={() => handleToggle('newBookingAlerts')}
      />
      <SettingsToggle 
        label="Newsletter" 
        description="Occasional updates about new system features." 
        active={settings.newsletter}
        onToggle={() => handleToggle('newsletter')}
      />
    </div>
  );
}
