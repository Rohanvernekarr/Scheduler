import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthGuard } from "./components/AuthGuard";
import { AdminLayout } from "./components/AdminLayout";
import { UsersPage }       from "./components/pages/UsersPage";
import { UserDetailPage }  from "./components/pages/UserDetailPage";
import { MeetingsPage }    from "./components/pages/MeetingsPage";
import { BookingsPage }    from "./components/pages/BookingsPage";
import { AvailabilityPage } from "./components/pages/AvailabilityPage";
import { SettingsPage }    from "./components/pages/SettingsPage";
import { NewsletterPage }  from "./components/pages/NewsletterPage";
import "./index.css";

class ErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean; error: Error | null}> {
  constructor(props: {children: ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) { return { hasError: true, error }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error("Admin crashed:", error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 min-h-screen bg-background font-mono text-sm">
          <p className="text-destructive font-bold mb-2">Admin crashed</p>
          <pre className="text-muted-foreground whitespace-pre-wrap">{this.state.error?.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const queryClient = new QueryClient();

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthGuard>
          <HashRouter>
            <AdminLayout>
              <Routes>
                <Route path="/"             element={<UsersPage />} />
                <Route path="/users/:id"    element={<UserDetailPage />} />
                <Route path="/meetings"     element={<MeetingsPage />} />
                <Route path="/bookings"     element={<BookingsPage />} />
                <Route path="/availability" element={<AvailabilityPage />} />
                <Route path="/newsletter"   element={<NewsletterPage />} />
                <Route path="/settings"     element={<SettingsPage />} />
              </Routes>
            </AdminLayout>
          </HashRouter>
        </AuthGuard>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
