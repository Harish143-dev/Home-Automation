"use client";

import { useEffect, useState } from 'react';
import { fetchWithAuth } from '../api';
import { Loader2, UserCheck, Trash2, Mail, FileText, Search, Eye, X, Phone, Briefcase, Calendar } from 'lucide-react';

interface CareerApp {
  id: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  position: string;
  message?: string | null;
  resumeUrl?: string | null;
  createdAt: string;
}

export default function CareerApplicationsPage() {
  const [apps, setApps] = useState<CareerApp[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeApp, setActiveApp] = useState<CareerApp | null>(null);

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    try {
      const response = await fetchWithAuth('/career-applications');
      const data = await response.json();
      if (data.success) {
        setApps(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch applications", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this application?')) return;
    try {
      const response = await fetchWithAuth(`/career-applications/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setApps(apps.filter(app => app.id !== id));
        if (activeApp?.id === id) setActiveApp(null);
      }
    } catch (error) {
      console.error("Failed to delete application", error);
    }
  };

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (app.phone && app.phone.includes(searchQuery)) ||
    app.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (app.message && app.message.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-accent font-medium">Talent</span>
          <h1 className="text-3xl font-light text-foreground mt-1" style={{ fontFamily: 'var(--font-display)' }}>
            Job Applications
          </h1>
          <p className="text-muted mt-1.5 text-sm tracking-wide font-light">
            Review submissions, candidate qualifications, and contact details from the careers page.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <input 
          type="text" 
          placeholder="Search by candidate name, role, email, or experience..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-panel border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
        />
      </div>

      {/* Applications Table */}
      <div className="bg-panel border border-border rounded-2xl shadow-sm overflow-hidden">
        {filteredApps.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4 border border-border">
              <UserCheck className="w-8 h-8 text-muted" />
            </div>
            <h3 className="text-lg font-light text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              {apps.length === 0 ? 'No applications yet' : 'No matching applications found'}
            </h3>
            <p className="text-muted mt-1.5 text-sm font-light">
              {apps.length === 0 
                ? 'Candidate submissions from the website Careers form will appear here.' 
                : 'Try adjusting your search terms.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-background/50">
                  <th className="py-4 px-6 text-[11px] font-semibold text-muted uppercase tracking-wider">Candidate</th>
                  <th className="py-4 px-6 text-[11px] font-semibold text-muted uppercase tracking-wider">Role & Experience</th>
                  <th className="py-4 px-6 text-[11px] font-semibold text-muted uppercase tracking-wider">Cover Note</th>
                  <th className="py-4 px-6 text-[11px] font-semibold text-muted uppercase tracking-wider">Date</th>
                  <th className="py-4 px-6 text-[11px] font-semibold text-muted uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-background/40 transition-colors">
                    <td className="py-4 px-6">
                      <p className="text-sm font-medium text-foreground">{app.name}</p>
                      <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 text-xs text-muted mt-1">
                        <a href={`mailto:${app.email}`} className="hover:text-accent transition-colors underline-offset-2 hover:underline">
                          {app.email}
                        </a>
                        {app.phone && (
                          <>
                            <span className="hidden sm:inline text-border">•</span>
                            <a href={`tel:${app.phone}`} className="hover:text-accent transition-colors">
                              {app.phone}
                            </a>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm font-medium text-foreground">{app.position}</p>
                      <span className="inline-flex items-center px-2 py-0.5 mt-1 rounded text-[10px] font-medium bg-accent/10 text-accent border border-accent/20">
                        Exp: {app.experience}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-muted max-w-55 truncate cursor-pointer hover:text-foreground" onClick={() => setActiveApp(app)}>
                      {app.message || '-'}
                    </td>
                    <td className="py-4 px-6 text-xs text-muted whitespace-nowrap">
                      {new Date(app.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="py-4 px-6 text-right space-x-1 whitespace-nowrap">
                      <button 
                        onClick={() => setActiveApp(app)}
                        className="p-2 text-muted hover:text-foreground hover:bg-background rounded-lg transition-colors"
                        title="View Full Application"
                      >
                        <Eye size={16} />
                      </button>
                      <a 
                        href={`mailto:${app.email}`}
                        className="p-2 text-muted hover:text-foreground hover:bg-background rounded-lg transition-colors inline-block"
                        title="Email Candidate"
                      >
                        <Mail size={16} />
                      </a>
                      <button 
                        onClick={() => handleDelete(app.id)}
                        className="p-2 text-muted hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete Application"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Application Details Modal */}
      {activeApp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-panel border border-border rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setActiveApp(null)}
              className="absolute top-6 right-6 text-muted hover:text-foreground p-1 rounded-lg"
            >
              <X size={20} />
            </button>

            <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">Candidate Submission</span>
            <h2 className="text-2xl font-light text-foreground mt-1 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              {activeApp.name}
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-foreground bg-background p-3.5 rounded-xl border border-border">
                <Briefcase size={16} className="text-accent shrink-0" />
                <div>
                  <span className="text-xs text-muted block">Applied Role</span>
                  <strong>{activeApp.position}</strong> ({activeApp.experience} experience)
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-foreground bg-background p-3.5 rounded-xl border border-border">
                <Mail size={16} className="text-accent shrink-0" />
                <a href={`mailto:${activeApp.email}`} className="hover:underline">{activeApp.email}</a>
              </div>

              {activeApp.phone && (
                <div className="flex items-center gap-3 text-sm text-foreground bg-background p-3.5 rounded-xl border border-border">
                  <Phone size={16} className="text-accent shrink-0" />
                  <a href={`tel:${activeApp.phone}`} className="hover:underline">{activeApp.phone}</a>
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-muted px-1">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  Submitted: {new Date(activeApp.createdAt).toLocaleString()}
                </span>
                {activeApp.resumeUrl && (
                  <a 
                    href={activeApp.resumeUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-1 text-accent font-medium hover:underline"
                  >
                    <FileText size={14} />
                    View CV Link
                  </a>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <label className="text-[11px] font-semibold text-muted uppercase tracking-wider block mb-2">Cover Note / Message</label>
                <div className="p-4 bg-background border border-border rounded-xl text-sm text-foreground leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                  {activeApp.message || 'No additional note provided by the candidate.'}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <a 
                  href={`mailto:${activeApp.email}?subject=Regarding your application for ${encodeURIComponent(activeApp.position)} at AT Smart Living`} 
                  className="flex-1 text-center py-2.5 bg-accent hover:bg-accent-soft text-white rounded-xl text-sm font-medium transition-colors"
                >
                  Contact Candidate
                </a>
                <button
                  onClick={() => handleDelete(activeApp.id)}
                  className="px-4 py-2.5 border border-red-200 text-red-600 hover:bg-red-500/10 rounded-xl text-sm font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
