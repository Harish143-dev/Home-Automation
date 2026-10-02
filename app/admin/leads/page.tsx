"use client";

import { useEffect, useState } from 'react';
import { fetchWithAuth } from '../api';
import { Loader2, Mail, Trash2, Search, Eye, X, Phone, Calendar, Tag } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  inquiryType: string;
  message: string;
  createdAt: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetchWithAuth('/leads');
      const data = await response.json();
      if (data.success) {
        setLeads(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch leads", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this lead?')) return;
    try {
      const response = await fetchWithAuth(`/leads/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setLeads(leads.filter(lead => lead.id !== id));
        if (activeLead?.id === id) setActiveLead(null);
      }
    } catch (error) {
      console.error("Failed to delete lead", error);
    }
  };

  const uniqueTypes = ['All', ...Array.from(new Set(leads.map(l => l.inquiryType || 'General')))];

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.phone && lead.phone.includes(searchQuery)) ||
      (lead.message && lead.message.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedType === 'All' || (lead.inquiryType || 'General') === selectedType;

    return matchesSearch && matchesType;
  });

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
          <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-accent font-medium">Inquiries</span>
          <h1 className="text-3xl font-light text-foreground mt-1" style={{ fontFamily: 'var(--font-display)' }}>
            Client Leads & Messages
          </h1>
          <p className="text-muted mt-1.5 text-sm tracking-wide font-light">
            Review inquiries collected through website contact forms, consultations, and brochure downloads.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input 
            type="text" 
            placeholder="Search by name, email, phone or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-panel border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {uniqueTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedType === type
                  ? 'bg-secondary text-white shadow-xs'
                  : 'bg-panel border border-border text-muted hover:text-foreground hover:bg-background'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-panel border border-border rounded-2xl shadow-sm overflow-hidden">
        {filteredLeads.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4 border border-border">
              <Mail className="w-8 h-8 text-muted" />
            </div>
            <h3 className="text-lg font-light text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              {leads.length === 0 ? 'No leads received yet' : 'No matching inquiries found'}
            </h3>
            <p className="text-muted mt-1.5 text-sm font-light">
              {leads.length === 0 
                ? 'Client form submissions will appear here automatically.' 
                : 'Try adjusting your search query or filter tags.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-background/50">
                  <th className="py-4 px-6 text-[11px] font-semibold text-muted uppercase tracking-wider">Date</th>
                  <th className="py-4 px-6 text-[11px] font-semibold text-muted uppercase tracking-wider">Client Info</th>
                  <th className="py-4 px-6 text-[11px] font-semibold text-muted uppercase tracking-wider">Type</th>
                  <th className="py-4 px-6 text-[11px] font-semibold text-muted uppercase tracking-wider">Inquiry Message</th>
                  <th className="py-4 px-6 text-[11px] font-semibold text-muted uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-background/40 transition-colors group">
                    <td className="py-4 px-6 text-xs text-muted whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm font-medium text-foreground">{lead.name}</p>
                      <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 text-xs text-muted mt-1">
                        <a href={`mailto:${lead.email}`} className="hover:text-accent transition-colors underline-offset-2 hover:underline">
                          {lead.email}
                        </a>
                        {lead.phone && (
                          <>
                            <span className="hidden sm:inline text-border">•</span>
                            <a href={`tel:${lead.phone}`} className="hover:text-accent transition-colors">
                              {lead.phone}
                            </a>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-background text-foreground border border-border">
                        {lead.inquiryType || 'General'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-muted max-w-xs truncate cursor-pointer hover:text-foreground" onClick={() => setActiveLead(lead)}>
                      {lead.message || '-'}
                    </td>
                    <td className="py-4 px-6 text-right space-x-1 whitespace-nowrap">
                      <button 
                        onClick={() => setActiveLead(lead)} 
                        className="p-2 text-muted hover:text-foreground hover:bg-background rounded-lg transition-colors"
                        title="View details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(lead.id)} 
                        className="p-2 text-muted hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-colors" 
                        title="Delete lead"
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

      {/* Lead Details Modal */}
      {activeLead && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-panel border border-border rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setActiveLead(null)}
              className="absolute top-6 right-6 text-muted hover:text-foreground p-1 rounded-lg"
            >
              <X size={20} />
            </button>

            <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">Lead Details</span>
            <h2 className="text-2xl font-light text-foreground mt-1 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              {activeLead.name}
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-foreground bg-background p-3.5 rounded-xl border border-border">
                <Mail size={16} className="text-accent shrink-0" />
                <a href={`mailto:${activeLead.email}`} className="hover:underline">{activeLead.email}</a>
              </div>

              {activeLead.phone && (
                <div className="flex items-center gap-3 text-sm text-foreground bg-background p-3.5 rounded-xl border border-border">
                  <Phone size={16} className="text-accent shrink-0" />
                  <a href={`tel:${activeLead.phone}`} className="hover:underline">{activeLead.phone}</a>
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-muted px-1">
                <span className="flex items-center gap-1.5">
                  <Tag size={14} className="text-accent" />
                  Type: <strong className="text-foreground font-medium">{activeLead.inquiryType}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {new Date(activeLead.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <label className="text-[11px] font-semibold text-muted uppercase tracking-wider block mb-2">Message</label>
                <div className="p-4 bg-background border border-border rounded-xl text-sm text-foreground leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                  {activeLead.message || 'No message provided.'}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <a 
                  href={`mailto:${activeLead.email}`} 
                  className="flex-1 text-center py-2.5 bg-accent hover:bg-accent-soft text-white rounded-xl text-sm font-medium transition-colors"
                >
                  Reply via Email
                </a>
                <button
                  onClick={() => handleDelete(activeLead.id)}
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
