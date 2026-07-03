import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/src/components/ui/button";
import { Globe, Menu, X, LogIn, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/src/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/src/lib/AuthContext";

import { ThemeToggle } from "../ThemeToggle";

export default function WebsiteLayout() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes (only update state when menu is open)
  useEffect(() => {
    if (mobileMenuOpen) {
      // Defer closing the mobile menu to avoid synchronous setState inside an effect
      const t = setTimeout(() => setMobileMenuOpen(false), 0);
      return () => clearTimeout(t);
    }
    return;
  }, [location.pathname, mobileMenuOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Technologies", path: "/technologies" },
    { name: "Industries", path: "/industries" },
    { name: "Partners", path: "/partners" },
    { name: "About", path: "/about" },
  ];

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
            <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground group-hover:scale-105 transition-transform">
              <img src="/src/assets/Company Logo.jpg" alt="Green Symbol Logo" className="h-7 w-7 rounded-lg" />
            </div>
            <span className="font-semibold text-lg tracking-tight">Green Symbol Technology</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === route.path ? "text-primary" : "text-muted-foreground"
                )}
              >
                {route.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link to="/contact">
              <Button variant="ghost">Contact Sales</Button>
            </Link>
            {user ? (
              <Link to="/portal">
                <Button>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
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
                    <Button variant="outline" className="w-full justify-center">Contact Sales</Button>
                  </Link>
                  {user ? (
                    <Link to="/portal" className="w-full">
                      <Button className="w-full justify-center">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Button>
                    </Link>
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
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-primary flex items-center justify-center text-primary-foreground">
                <img src="/src/assets/Company Logo.jpg" alt="Green Symbol Logo" className="h-6 w-6 rounded" />
              </div>
              <span className="font-semibold text-base tracking-tight">Green Symbol Technology</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering enterprise digital transformation with world-class technology solutions across Africa.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Cybersecurity</li>
              <li>Industrial Tech</li>
              <li>Business Systems</li>
              <li>Cloud Infrastructure</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>About Us</li>
              <li>Careers</li>
              <li>News & Blog</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 pt-8 mt-8 border-t text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between">
          <p>© {new Date().getFullYear()} Green Symbol Technology. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Globe className="h-4 w-4" />
            <span>English (Global)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}