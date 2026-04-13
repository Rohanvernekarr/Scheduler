import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Sidebar } from './components/Sidebar';
import DashboardView from './views/DashboardView';
import AvailabilityView from './views/AvailabilityView';
import BookingView from './views/BookingView';
import './index.css';

const queryClient = new QueryClient();

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes (No Sidebar) */}
      <Route path="/book/:username" element={<BookingView />} />

      {/* Private Routes (With Sidebar) */}
      <Route
        path="/*"
        element={
          <div className="flex min-h-screen bg-white text-black">

            <Sidebar />
            <main className="ml-64 flex-1 p-12">
              <Routes>
                <Route path="/" element={<DashboardView />} />
                <Route path="/availability" element={<AvailabilityView />} />
              </Routes>
            </main>
          </div>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppRoutes />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
