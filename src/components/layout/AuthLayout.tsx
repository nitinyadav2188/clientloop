import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Columns, Search, Bell, HelpCircle, Plus, Settings, LogOut, FileText, Briefcase, IndianRupee } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { store } from '@/lib/store';

export default function AuthLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = store.getUser();

  const navItems = [
    { name: 'Dashboard', path: '/app', icon: LayoutDashboard },
    { name: 'Leads', path: '/app/leads', icon: Users },
    { name: 'Pipeline', path: '/app/pipeline', icon: Columns },
    { name: 'Follow-ups', path: '/app/follow-ups', icon: Bell },
    { name: 'Proposals', path: '/app/proposals', icon: FileText },
    { name: 'Clients', path: '/app/clients', icon: Briefcase },
    { name: 'Revenue', path: '/app/revenue', icon: IndianRupee },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white flex flex-col border-r border-border transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:flex-shrink-0 p-6",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center gap-2 mb-10">
          <Link to="/app" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-accent-lime rounded-sm rotate-45"></div>
            </div>
            <span className="font-black text-xl tracking-tighter uppercase">ClientLoop</span>
          </Link>
        </div>
        
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold transition-colors",
                location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/app')
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:bg-gray-50"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
          
          <div className="my-4 pt-4">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">System</div>
            <Link
              to="/app/settings"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold transition-colors",
                location.pathname.startsWith('/app/settings')
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:bg-gray-50"
              )}
            >
              <Settings className="w-5 h-5" />
              Settings
            </Link>
          </div>
        </nav>

        <div className="mt-auto pt-6 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-lime border-2 border-primary flex items-center justify-center font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{user.name}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold truncate">{user.plan} Plan Member</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-20 flex items-center justify-between px-4 lg:px-10 border-b bg-white flex-shrink-0">
          <div className="flex items-center flex-1 max-w-md gap-4">
            <button 
              className="lg:hidden text-muted-foreground hover:text-primary"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
            <div className="relative w-96 hidden sm:block">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search leads, clients or projects..."
                className="w-full pl-10 pr-4 py-2 bg-background border rounded-xl text-sm focus:outline-none focus:border-accent"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 ml-4">
            <button className="text-muted-foreground hover:text-primary relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-accent-lime rounded-full ring-2 ring-white"></span>
            </button>
            <Button onClick={() => navigate('/app/leads?new=true')}>
              + Add Lead
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto bg-background p-6 lg:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
