import { SettingsToggle } from '../ui/SettingsPrimitives';

export function NotificationsSection() {
  return (
    <div className="space-y-6">
      <SettingsToggle label="Meeting Reminders" description="Receive email alerts 15 minutes before your sessions." active />
      <SettingsToggle label="Weekly Digest" description="Get a summary of your scheduling activity every Monday." active />
      <SettingsToggle label="New Booking Alerts" description="Instant notification when someone books a slot." />
      <SettingsToggle label="Newsletter" description="Occasional updates about new system features." />
    </div>
  );
}
