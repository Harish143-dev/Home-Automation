"use client";

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, FolderKanban, PenTool, Briefcase, Mail, UserCheck, LogOut, Loader2, ChevronRight, Menu, X, ExternalLink } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('adminToken');
      if (!token && !pathname?.includes('/admin/login')) {
        router.push('/admin/login');
      } else if (token && pathname?.includes('/admin/login')) {
        router.push('/admin');
      } else {
        setIsAuthenticated(!!token);
      }
      setIsLoading(false);
    };
    checkAuth();
  }, [pathname, router]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  // If on login page, render without sidebar
  if (pathname?.includes('/admin/login')) {
    return <div className="min-h-screen bg-background text-foreground font-sans">{children}</div>;
  }

  // Admin Layout following the Organic Editorial Theme
  return (
    <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden selection:bg-accent selection:text-white relative">
      {/* Subtle Noise background across the entire layout */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02] pointer-events-none z-0">
        <filter id="noise-admin"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#noise-admin)" />
      </svg>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar - Dark Green theme */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-64 bg-secondary text-[#F1EBD9] border-r border-black/10 flex flex-col 
        transition-transform duration-300 ease-in-out shadow-[4px_0_24px_rgba(0,0,0,0.05)]
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 md:p-8 flex items-center justify-between border-b border-white/5">
          <Link href="/admin" className="block">
            <img src="/logo.svg" alt="AT Smart Living" className="h-9 w-auto brightness-0 invert" />
          </Link>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden text-white/60 hover:text-white p-1"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="px-6 mt-6 mb-2">
           <h2 className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-semibold">Control Panel</h2>
        </div>

        <nav className="flex-1 px-3 space-y-1 mt-2 overflow-y-auto">
          <NavItem href="/admin" icon={<LayoutDashboard size={18} />} label="Dashboard" active={pathname === '/admin'} />
          <NavItem href="/admin/leads" icon={<Mail size={18} />} label="Leads & Inquiries" active={pathname?.startsWith('/admin/leads')} />
          <NavItem href="/admin/career-applications" icon={<UserCheck size={18} />} label="Job Applications" active={pathname?.startsWith('/admin/career-applications')} />
          <NavItem href="/admin/projects" icon={<FolderKanban size={18} />} label="Projects" active={pathname?.startsWith('/admin/projects')} />
          <NavItem href="/admin/blogs" icon={<PenTool size={18} />} label="Blogs & Journal" active={pathname?.startsWith('/admin/blogs')} />
          <NavItem href="/admin/careers" icon={<Briefcase size={18} />} label="Open Positions" active={pathname?.startsWith('/admin/careers') && !pathname?.startsWith('/admin/career-applications')} />
        </nav>

        <div className="p-4 border-t border-white/10 space-y-1">
          <Link 
            href="/" 
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-xs font-medium"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={14} />
              <span>View Live Site</span>
            </span>
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2.5 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-sm font-medium"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        {/* Mobile Header Bar */}
        <header className="md:hidden flex items-center justify-between px-5 py-4 bg-background border-b border-border">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-foreground hover:bg-black/5 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <img src="/logo.svg" alt="AT Smart Living" className="h-7 w-auto" />
          <div className="w-8" />
        </header>

        <main className="flex-1 overflow-y-auto bg-background p-6 md:p-10 lg:p-12">
          <div className="max-w-6xl mx-auto min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <Link 
      href={href}
      className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group text-sm font-medium ${
        active 
          ? 'bg-white/10 text-white font-semibold' 
          : 'text-white/60 hover:bg-white/5 hover:text-white'
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className={`${active ? 'text-accent-soft' : 'text-white/40 group-hover:text-white/80'} transition-colors`}>
          {icon}
        </div>
        <span>{label}</span>
      </div>
      {active && <ChevronRight size={14} className="text-white/40" />}
    </Link>
  );
}
