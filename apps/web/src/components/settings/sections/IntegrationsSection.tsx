export function IntegrationsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <IntegrationCard 
        name="Google Calendar" 
        description="Sync meetings and check for availability conflicts." 
        connected 
      />
      <IntegrationCard 
        name="Zoom Meetings" 
        description="Automatically generate meeting links for bookings." 
      />
      <IntegrationCard 
        name="Slack" 
        description="Get notifications directly in your team workspace." 
      />
      <IntegrationCard 
        name="Outlook" 
        description="Sync with Microsoft 365 calendar infrastructure." 
      />
    </div>
  );
}

function IntegrationCard({ name, description, connected }: any) {
  return (
    <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col justify-between hover:bg-white/[0.04] transition-all group">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/10" />
          {connected ? (
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Connected</span>
          ) : (
            <button className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white">Connect</button>
          )}
        </div>
        <h4 className="text-white font-bold">{name}</h4>
        <p className="text-zinc-500 text-xs mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
