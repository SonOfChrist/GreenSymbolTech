import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, FolderKanban, Ticket, CreditCard, BookOpen, Settings, LogOut, Search, Bell, Shield} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { auth } from "@/src/lib/firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "@/src/lib/AuthContext";

import { ThemeToggle } from "../ThemeToggle";

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const isAdmin = profile?.role === 'admin';

  const sidebarNav = [
    { name: "Overview", href: "/portal", icon: LayoutDashboard },
    { name: "CRM", href: "/portal/crm", icon: Users },
    { name: "Projects", href: "/portal/projects", icon: FolderKanban },
    { name: "Tickets", href: "/portal/tickets", icon: Ticket },
    { name: "Invoices", href: "/portal/invoices", icon: CreditCard },
    ...(isAdmin ? [{ name: "CMS (Admin)", href: "/portal/cms", icon: BookOpen }] : []),
    { name: "Settings", href: "/portal/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen w-full text-foreground font-sans selection:bg-primary/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900 rounded-full blur-[120px]"></div>
        <div className="absolute top-[40%] right-[-5%] w-[30%] h-[50%] bg-blue-900 rounded-full blur-[120px]"></div>
      </div>
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-background/50 backdrop-blur-xl relative z-10">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight text-foreground hover:text-emerald-500 transition-colors">
            <div className="h-6 w-6 rounded bg-emerald-500 flex items-center justify-center text-primary-foreground">
              <span className="text-[10px] font-bold">GS</span>
            </div>
            Green Symbol Technology
          </Link>
        </div>

        <div className="flex-1 overflow-auto py-6 flex flex-col gap-1 px-4">
          <div className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
            <span>Portal Access</span>
            {isAdmin && <span className="text-[9px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">ADMIN</span>}
          </div>
          {sidebarNav.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </div>
        <div className="p-4 border-t border-border">
          <button onClick={handleSignOut} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent transition-colors">
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Top Header */}
        <header className="h-16 border-b border-border bg-background/50 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full hidden sm:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search projects, tickets, or clients..."
                className="w-full h-9 rounded-md border border-input bg-muted/50 pl-9 pr-4 text-sm text-foreground focus-visible:outline-none focus-visible:border-emerald-500/50"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="relative h-8 w-8 rounded-full border border-border bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500 border-2 border-background" />
            </button>
            <div className="h-8 w-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center relative group">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {profile?.firstName?.[0] || ''}{profile?.lastName?.[0] || 'U'}
              </span>
              {isAdmin && (
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5">
                  <Shield className="w-2.5 h-2.5 text-primary-foreground" />
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Outlet */}
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}