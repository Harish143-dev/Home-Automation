"use client";

import { useEffect, useState } from 'react';
import { fetchWithAuth } from './api';
import { Loader2, Mail, UserCheck, FolderKanban, PenTool, Briefcase, ArrowUpRight, Plus, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface RecentLead {
  id: string;
  name: string;
  email: string;
  inquiryType: string;
  createdAt: string;
}

interface RecentApp {
  id: string;
  name: string;
  position: string;
  experience: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState({
    leads: 0,
    applications: 0,
    projects: 0,
    blogs: 0,
    careers: 0,
  });
  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([]);
  const [recentApps, setRecentApps] = useState<RecentApp[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        const [leadsRes, appsRes, projectsRes, blogsRes, careersRes] = await Promise.all([
          fetchWithAuth('/leads'),
          fetchWithAuth('/career-applications'),
          fetchWithAuth('/projects'),
          fetchWithAuth('/blogs'),
          fetchWithAuth('/careers'),
        ]);

        const [leads, apps, projects, blogs, careers] = await Promise.all([
          leadsRes.json(),
          appsRes.json(),
          projectsRes.json(),
          blogsRes.json(),
          careersRes.json(),
        ]);

        const leadsData = leads.data || [];
        const appsData = apps.data || [];

        setStats({
          leads: leadsData.length,
          applications: appsData.length,
          projects: projects.data?.length || 0,
          blogs: blogs.data?.length || 0,
          careers: careers.data?.length || 0,
        });

        setRecentLeads(leadsData.slice(0, 4));
        setRecentApps(appsData.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div>
        <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-accent font-medium">Administration</span>
        <h1 className="text-3xl sm:text-4xl font-light text-foreground mt-1.5" style={{ fontFamily: 'var(--font-display)' }}>
          Overview & Activity
        </h1>
        <p className="text-muted mt-2 text-sm tracking-wide font-light">
          Monitor your customer inquiries, project portfolio, journal entries, and career candidates.
        </p>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatCard 
          title="Client Leads" 
          value={stats.leads} 
          icon={<Mail className="w-5 h-5" />} 
          href="/admin/leads"
          badge="Inquiries"
        />
        <StatCard 
          title="Job Applicants" 
          value={stats.applications} 
          icon={<UserCheck className="w-5 h-5" />} 
          href="/admin/career-applications"
          badge="Candidates"
        />
        <StatCard 
          title="Projects" 
          value={stats.projects} 
          icon={<FolderKanban className="w-5 h-5" />} 
          href="/admin/projects"
          badge="Portfolio"
        />
        <StatCard 
          title="Journal Articles" 
          value={stats.blogs} 
          icon={<PenTool className="w-5 h-5" />} 
          href="/admin/blogs"
          badge="Published"
        />
        <StatCard 
          title="Open Roles" 
          value={stats.careers} 
          icon={<Briefcase className="w-5 h-5" />} 
          href="/admin/careers"
          badge="Recruiting"
        />
      </div>

      {/* Two-Column Activity Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inquiries */}
        <div className="bg-panel border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <h2 className="text-xl font-light text-foreground" style={{ fontFamily: 'var(--font-display)' }}>Latest Inquiries</h2>
              <p className="text-xs text-muted mt-0.5 font-light">Recent form submissions from clients</p>
            </div>
            <Link 
              href="/admin/leads" 
              className="text-xs font-medium text-accent hover:text-accent-soft flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="mt-4 divide-y divide-border">
            {recentLeads.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted font-light">
                No inquiries recorded yet.
              </div>
            ) : (
              recentLeads.map((lead) => (
                <div key={lead.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{lead.name}</p>
                    <p className="text-xs text-muted truncate">{lead.email}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-background text-foreground border border-border">
                      {lead.inquiryType}
                    </span>
                    <p className="text-[11px] text-muted mt-1">
                      {new Date(lead.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Career Submissions */}
        <div className="bg-panel border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <h2 className="text-xl font-light text-foreground" style={{ fontFamily: 'var(--font-display)' }}>Recent Job Applications</h2>
              <p className="text-xs text-muted mt-0.5 font-light">Candidates who submitted their CVs</p>
            </div>
            <Link 
              href="/admin/career-applications" 
              className="text-xs font-medium text-accent hover:text-accent-soft flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="mt-4 divide-y divide-border">
            {recentApps.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted font-light">
                No job applications received yet.
              </div>
            ) : (
              recentApps.map((app) => (
                <div key={app.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{app.name}</p>
                    <p className="text-xs text-muted truncate">{app.position}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-accent/10 text-accent border border-accent/20">
                      {app.experience}
                    </span>
                    <p className="text-[11px] text-muted mt-1">
                      {new Date(app.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="bg-background border border-border rounded-2xl p-6 sm:p-8">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground mb-4">Quick Management Shortcuts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link 
            href="/admin/leads"
            className="p-4 bg-panel border border-border rounded-xl hover:border-black/30 transition-all flex items-center justify-between group"
          >
            <span className="text-sm text-foreground font-medium">Review Client Leads</span>
            <ArrowUpRight size={16} className="text-muted group-hover:text-accent transition-colors" />
          </Link>
          <Link 
            href="/admin/projects"
            className="p-4 bg-panel border border-border rounded-xl hover:border-black/30 transition-all flex items-center justify-between group"
          >
            <span className="text-sm text-foreground font-medium">Add New Project</span>
            <Plus size={16} className="text-muted group-hover:text-accent transition-colors" />
          </Link>
          <Link 
            href="/admin/blogs"
            className="p-4 bg-panel border border-border rounded-xl hover:border-black/30 transition-all flex items-center justify-between group"
          >
            <span className="text-sm text-foreground font-medium">Publish Journal Post</span>
            <Plus size={16} className="text-muted group-hover:text-accent transition-colors" />
          </Link>
          <Link 
            href="/admin/careers"
            className="p-4 bg-panel border border-border rounded-xl hover:border-black/30 transition-all flex items-center justify-between group"
          >
            <span className="text-sm text-foreground font-medium">Post Career Role</span>
            <Plus size={16} className="text-muted group-hover:text-accent transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  icon, 
  href, 
  badge 
}: { 
  title: string; 
  value: number; 
  icon: React.ReactNode; 
  href: string; 
  badge: string; 
}) {
  return (
    <Link href={href} className="block group">
      <div className="bg-panel border border-border rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-black/20 relative overflow-hidden flex flex-col justify-between h-full">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-foreground group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
            {icon}
          </div>
          <span className="text-[10px] font-medium text-muted bg-background px-2.5 py-1 rounded-full border border-border">
            {badge}
          </span>
        </div>
        
        <div>
          <p className="text-xs font-medium text-muted uppercase tracking-wider mb-1.5">{title}</p>
          <h3 className="text-3xl font-light text-foreground tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            {value}
          </h3>
        </div>

        <div className="absolute bottom-5 right-5 opacity-0 translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-200">
          <ArrowUpRight className="w-4 h-4 text-accent" />
        </div>
      </div>
    </Link>
  );
}
