import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/src/components/ui/button";
import { Globe, Menu, X, LogIn, LayoutDashboard, Users, Briefcase, Ticket, Receipt, Settings, FileEdit, ChevronDown, LogOut} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/src/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/src/lib/AuthContext";
import { FaLinkedin } from "react-icons/fa";
import { ThemeToggle } from "../ThemeToggle";
import companyLogo from "@/src/assets/companyLogo.png";
import companyname from "@/src/assets/symboltechnologycompayname.png";

export default function WebsiteLayout() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { user, profile } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setAdminDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAdminDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Technology", path: "/technologies" },
    { name: "Partners", path: "/partners" },
    { name: "About Us", path: "/about" },
    { name: "Clients", path: "/clients" },
    { name: "Resources", path: "/resources" },
    { name: "Contact Us", path: "/contact" },
  ];

  const adminLinks = [
    { name: "Dashboard", path: "/portal", icon: LayoutDashboard },
    { name: "CRM", path: "/portal/crm", icon: Users },
    { name: "Projects", path: "/portal/projects", icon: Briefcase },
    { name: "Tickets", path: "/portal/tickets", icon: Ticket },
    { name: "Invoices", path: "/portal/invoices", icon: Receipt },
  ];

  if (profile?.role === 'admin') {
    adminLinks.push({ name: "CMS", path: "/portal/cms", icon: FileEdit });
  }
  adminLinks.push({ name: "Settings", path: "/portal/settings", icon: Settings });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900 rounded-full blur-[120px]"></div>
        <div className="absolute top-[40%] right-[-5%] w-[30%] h-[50%] bg-blue-900 rounded-full blur-[120px]"></div>
      </div>
      {/* Navigation */}
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300 border-b",
          scrolled
            ? "bg-background/80 backdrop-blur-md border-border"
            : "bg-transparent border-transparent"
        )}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground group-hover:scale-105 transition-transform">
              <img src={companyLogo} alt="GreenSymbolTechLogo" className="h-8 w-8 rounded" />
            </div>
            <span className="font-semibold text-lg tracking-tight"><img src={companyname} alt="Company Name" className="h-8 w-50" /></span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((route) => (
              <Link key={route.path} to={route.path} className={cn( "text-sm font-medium transition-colors hover:text-primary", location.pathname === route.path ? "text-primary" : "text-muted-foreground")}>
                {route.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <Button onClick={() => setAdminDropdownOpen(!adminDropdownOpen)} className="gap-2">
                  <div className="h-5 w-5 rounded-full bg-primary-foreground/20 flex items-center justify-center text-xs font-bold">
                    {profile?.firstName?.charAt(0) || 'U'}
                  </div>
                  Portal Access
                  <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", adminDropdownOpen && "rotate-180")} />
                </Button>

                <AnimatePresence>
                  {adminDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 rounded-xl bg-card border border-border shadow-2xl overflow-hidden flex flex-col z-50"
                    >
                      <div className="px-4 py-3 border-b border-border bg-muted/30">
                        <p className="text-sm font-medium text-foreground truncate">{profile?.firstName || 'User'} {profile?.lastName || ''}</p>
                        <p className="text-xs text-muted-foreground truncate">{'Admin User'}</p>
                      </div>
                      <div className="p-2 flex flex-col gap-1">
                        {adminLinks.map((link) => {
                          const isActive = location.pathname === link.path;
                          return (
                            <Link key={link.name} to={link.path} onClick={() => setAdminDropdownOpen(false)} className={cn("flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                isActive 
                                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
                                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                              )}
                            >
                              <link.icon className={cn("h-4 w-4", isActive ? "text-emerald-500" : "")} />
                              {link.name}
                            </Link>
                          );
                        })}
                      </div>
                      <div className="p-2 border-t border-border">
                        <button
                          onClick={() => {
                            setAdminDropdownOpen(false);
                          }}
                          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-rose-500 hover:bg-rose-500/10 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login">
                <Button>
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border shadow-2xl md:hidden overflow-hidden"
            >
              <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
                <nav className="flex flex-col gap-2">
                  {navLinks.map((route) => (
                    <Link
                      key={route.path}
                      to={route.path}
                      className={cn(
                        "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                        location.pathname === route.path 
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" 
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {route.name}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border">
                  <Link to="/contact" className="w-full">
                    <Button variant="outline" className="w-full justify-center">Contact</Button>
                  </Link>
                  {user ? (
                    <div className="flex flex-col gap-2 mt-2 p-3 bg-muted/30 rounded-xl border border-border">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 px-2">Portal Access</p>
                      {adminLinks.map((link) => {
                        const isActive = location.pathname === link.path;
                        return (
                          <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                              isActive 
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                          >
                            <link.icon className={cn("h-4 w-4", isActive ? "text-emerald-500" : "")} />
                            {link.name}
                          </Link>
                        );
                      })}
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-3 px-3 py-2.5 mt-1 rounded-lg text-sm font-medium text-rose-500 hover:bg-rose-500/10 transition-colors w-full text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <Link to="/login" className="w-full">
                      <Button className="w-full justify-center">
                        <LogIn className="mr-2 h-4 w-4" />
                        Login
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/40 backdrop-blur-md py-12 md:py-16 mt-20 relative z-10">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-primary flex items-center justify-center text-primary-foreground">
                <img src={companyLogo} alt="GreenSymbolTechLogo" className="h-6 w-6 rounded" />
              </div>
              <span className="font-semibold text-base tracking-tight"><img src={companyname} alt="Company Name" className="h-6 w-45" /></span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Empowering enterprise digital transformation with world-class technology solutions across Africa.
            </p>
            <div className="pt-4">
              <h4 className="font-semibold mb-3 text-sm">Digital Coordinates</h4>
              <div className="flex gap-4">
                <Link to="https://www.linkedin.com/company/greensymboltechnology" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-emerald-500 transition-colors bg-background p-2 rounded-lg border border-border hover:border-emerald-500/50">
                  <FaLinkedin className="w-4 h-4" />
                </Link>
                
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-emerald-500 transition-colors">Home</Link></li>
              <li><Link to="/technologies" className="hover:text-emerald-500 transition-colors">Technology</Link></li>
              <li><Link to="/partners" className="hover:text-emerald-500 transition-colors">Partners</Link></li>
              <li><Link to="/about" className="hover:text-emerald-500 transition-colors">About Us</Link></li>
              <li><Link to="/clients" className="hover:text-emerald-500 transition-colors">Clients</Link></li>
              <li><Link to="/resources" className="hover:text-emerald-500 transition-colors">Resources</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-500 transition-colors">Contact Us</Link></li>
            </ul> 
          </div>
          <div>
            <h4 className="font-semibold mb-4">Telephone Lines</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><span className="w-16 font-medium text-foreground">Kenya:</span> <a href="tel:+254732602" className="hover:text-emerald-500 transition-colors">+254 722 732 602</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Email Channels</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">Enquiries</div>
                <a href="mailto:sales@greensymboltechnology.com" className="hover:text-emerald-500 transition-colors break-all">sales@greensymboltechnology.com</a>
              </li>
              <li>
                <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">Helpdesk</div>
                <a href="mailto:support@greensymboltechnology.com" className="hover:text-emerald-500 transition-colors break-all">support@greensymboltechnology.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 pt-8 mt-8 border-t text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between">
          <p>© {new Date().getFullYear()} Green Symbol Africa Limited. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Globe className="h-4 w-4" />
            <span>English (Global)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}