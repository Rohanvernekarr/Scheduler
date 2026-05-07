import { BrowserRouter as Router, Routes, Route, useNavigate, useSearchParams } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Sidebar } from './components/Sidebar';
import DashboardView from './views/DashboardView';
import AvailabilityView from './views/AvailabilityView';
import BookingView from './views/BookingView';
import ScheduleView from './views/ScheduleView';
// import InviteCreationView from './views/InviteCreationView';
import GuestInviteView from './views/GuestInviteView';
import CalendarView from './views/CalendarView';
import LoginView from './views/LoginView';
import SettingsView from './views/SettingsView';
import BookingsView from './views/BookingsView';
import { useSession } from '@repo/auth/client';
import { Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // Cache data for 10 minutes
      gcTime: 1000 * 60 * 15,    // Keep unused data in memory for 15 minutes
      refetchOnWindowFocus: false, // Don't reload every time user clicks back into tab
      retry: 1,
    },
  },
});

function PrivateLayout() {
  const { data: session, isPending } = useSession();

  // Role Checker
  useEffect(() => {
    if (!isPending && session?.user?.role === 'ADMIN') {
      const adminUrl = window.location.hostname === 'localhost' 
        ? (import.meta.env.VITE_ADMIN_URL || 'http://localhost:5174')
        : 'https://admin.schedulers.app'; 
      window.location.href = adminUrl;
    }
  }, [isPending, session]);

  if (!isPending && !session) {
    const loginUrl = window.location.hostname === 'localhost' 
      ? 'http://localhost:3000/login' 
      : 'https://schedulers.app/login';
    window.location.href = loginUrl;
    return null;
  }

  if (!isPending && session?.user?.role === 'ADMIN') {
    return <div className="flex min-h-screen items-center justify-center">Redirecting to Admin...</div>;
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <Sidebar />
      <main className="flex-1 transition-all duration-300 min-h-screen w-full lg:ml-64 pt-20 p-4 md:pt-8 md:p-8 lg:p-12 overflow-x-hidden">
        <div className="w-full lg:max-w-7xl lg:mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function AppRoutes() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get('login') === 'success') {
      toast.success('Logged in successfully!');
      // Remove the param so it doesn't toast again on refresh
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('login');
      navigate({ search: newParams.toString() }, { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/book/:username" element={<BookingView />} />
      <Route path="/invite/:inviteId" element={<GuestInviteView />} />

      {/* Private Routes */}
      <Route element={<PrivateLayout />}>
        <Route path="/" element={<DashboardView />} />
        <Route path="/calendar" element={<CalendarView />} />
        <Route path="/availability" element={<AvailabilityView />} />
        <Route path="/bookings" element={<BookingsView />} />
        <Route path="/schedule" element={<ScheduleView />} />
        <Route path="/settings" element={<SettingsView />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppRoutes />
      </Router>
      <Toaster 
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#18181b',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '1rem',
            fontSize: '0.875rem',
            fontWeight: '500',
          },
          success: {
            iconTheme: {
              primary: '#fff',
              secondary: '#000',
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
