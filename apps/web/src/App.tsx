import { Sidebar } from './components/Sidebar'
import { Card, Button } from '@repo/ui'
import './index.css'

function App() {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50">
      <Sidebar />
      
      <main className="ml-64 flex-1 p-12">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2">Dashboard</h1>
            <p className="text-slate-400 text-lg">Welcome back, here is what is happening today.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="secondary" className="px-6 py-2.5">Settings</Button>
            <Button className="px-6 py-2.5">Create Meeting</Button>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card title="Total Meetings" className="p-8">
            <p className="text-5xl font-black bg-linear-to-r from-white to-slate-500 bg-clip-text text-transparent">12</p>
            <p className="text-slate-500 mt-2 font-medium">This month</p>
          </Card>
          <Card title="Upcoming Bookings" className="p-8">
            <p className="text-5xl font-black bg-linear-to-r from-white to-slate-500 bg-clip-text text-transparent">4</p>
            <p className="text-slate-500 mt-2 font-medium">Next 7 days</p>
          </Card>
          <Card title="Pending Invites" className="p-8">
            <p className="text-5xl font-black bg-linear-to-r from-white to-slate-500 bg-clip-text text-transparent">2</p>
            <p className="text-slate-500 mt-2 font-medium">Action required</p>
          </Card>
        </section>

        <section className="bg-white/3 backdrop-blur-3xl rounded-[32px] border border-white/5 p-8">
          <h2 className="text-2xl font-bold mb-6 px-2">Upcoming Schedule</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-6 bg-white/3 rounded-2xl border border-white/5 hover:border-indigo-500/30 hover:bg-white/5 transition-all">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold text-xl">
                    {i}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Product Sync with Design Team</h4>
                    <p className="text-slate-500 text-sm">Today at 2:00 PM • 1 hour</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[11px] font-bold rounded-full uppercase tracking-widest border border-emerald-500/20">
                    Confirmed
                  </span>
                  <button className="text-slate-500 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
