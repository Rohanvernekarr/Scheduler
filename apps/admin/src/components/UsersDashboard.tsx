import { useQuery } from '@tanstack/react-query';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from './ui/table';

export function UsersDashboard() {
  const { data: users, isLoading, isError, error } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
      const res = await fetch(`${apiUrl}/admin/users`, { credentials: 'include' });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
      }
      const data = await res.json();
      return data.data.users || [];
    }
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">User Management</h2>
        <p className="text-slate-500 mt-2 text-lg">Oversee all registered platform members, their roles, and verification status.</p>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/60 overflow-hidden ring-1 ring-white/50">
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader className="bg-slate-50/80 backdrop-blur-sm border-b border-slate-200/60">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold text-slate-600 h-14 uppercase text-xs tracking-wider">User Details</TableHead>
                <TableHead className="font-semibold text-slate-600 h-14 uppercase text-xs tracking-wider">Role</TableHead>
                <TableHead className="font-semibold text-slate-600 h-14 uppercase text-xs tracking-wider">Status</TableHead>
                <TableHead className="font-semibold text-slate-600 h-14 text-right uppercase text-xs tracking-wider pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="h-6 w-6 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
                      <span className="text-sm font-medium">Loading user database...</span>
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {isError && (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-red-600 bg-red-50">
                    <div className="font-semibold mb-1">Failed to securely load users</div>
                    <code className="text-xs text-red-500 block max-w-lg mx-auto truncate px-4 py-2 bg-red-100/50 rounded-lg">
                      {error instanceof Error ? error.message : "Unknown Error"}
                    </code>
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && !isError && users?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-slate-500 font-medium">
                    No users found in the system.
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && !isError && users?.map((user: any) => (
                <TableRow key={user.id} className="hover:bg-indigo-50/40 transition-colors border-b border-slate-100 last:border-0 group">
                  <TableCell className="py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors">{user.name}</span>
                      <span className="text-sm text-slate-500">{user.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold tracking-wide shadow-sm ring-1 ${
                      user.role === 'ADMIN' 
                        ? 'bg-indigo-50 text-indigo-700 ring-indigo-200' 
                        : 'bg-slate-100 text-slate-600 ring-slate-200'
                    }`}>
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                      user.emailVerified 
                        ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' 
                        : 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user.emailVerified ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      {user.emailVerified ? 'Verified' : 'Pending'}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 text-right pr-6">
                    <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors opacity-0 group-hover:opacity-100 px-3 py-1.5 hover:bg-indigo-50 rounded-md">
                      Manage
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
