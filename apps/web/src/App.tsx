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

  if (!isPending && !session) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white">
      <Sidebar />
      <main className="ml-64 flex-1 p-12 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}

function AppRoutes() {
  const [searchParams, setSearchParams] = useSearchParams();
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
      <Route path="/login" element={<LoginView />} />

      {/* Private Routes */}
      <Route element={<PrivateLayout />}>
        <Route path="/" element={<DashboardView />} />
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
