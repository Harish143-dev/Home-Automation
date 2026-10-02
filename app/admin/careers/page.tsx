"use client";

import { useEffect, useState } from 'react';
import { fetchWithAuth } from '../api';
import { Loader2, Briefcase, Plus, Edit2, Trash2, X, Search, MapPin, Clock, CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';

interface Career {
  id: number;
  title: string;
  description: string;
  location?: string | null;
  type?: string | null;
  isActive: boolean;
  createdAt: string;
}

export default function CareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState<Career | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    type: 'Full-time',
    isActive: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [modalError, setModalError] = useState('');

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const response = await fetchWithAuth('/careers');
      const data = await response.json();
      if (data.success) {
        setCareers(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch careers", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingCareer(null);
    setFormData({
      title: '',
      description: '',
      location: 'New Delhi, India',
      type: 'Full-time',
      isActive: true,
    });
    setModalError('');
    setIsModalOpen(true);
  };

  const openEditModal = (career: Career) => {
    setEditingCareer(career);
    setFormData({
      title: career.title,
      description: career.description,
      location: career.location || '',
      type: career.type || 'Full-time',
      isActive: career.isActive,
    });
    setModalError('');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setModalError('Position title is required');
      return;
    }
    if (!formData.description.trim()) {
      setModalError('Job description is required');
      return;
    }

    setIsSaving(true);
    setModalError('');

    try {
      if (editingCareer) {
        // Update
        const response = await fetchWithAuth(`/careers/${editingCareer.id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.success) {
          setCareers(careers.map(c => c.id === editingCareer.id ? data.data : c));
          setIsModalOpen(false);
        } else {
          setModalError(data.error || 'Failed to update position');
        }
      } else {
        // Create
        const response = await fetchWithAuth('/careers', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.success) {
          setCareers([data.data, ...careers]);
          setIsModalOpen(false);
        } else {
          setModalError(data.error || 'Failed to create position');
        }
      }
    } catch (err) {
      setModalError('Server communication error. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const toggleStatus = async (career: Career) => {
    try {
      const updatedStatus = !career.isActive;
      const response = await fetchWithAuth(`/careers/${career.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...career,
          isActive: updatedStatus,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setCareers(careers.map(c => c.id === career.id ? { ...c, isActive: updatedStatus } : c));
      }
    } catch (error) {
      console.error("Failed to toggle career status", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this position?')) return;
    try {
      const response = await fetchWithAuth(`/careers/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setCareers(careers.filter(c => c.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete career", error);
    }
  };

  const filteredCareers = careers.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.location && c.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (c.type && c.type.toLowerCase().includes(searchQuery.toLowerCase())) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
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
          <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-accent font-medium">Recruitment</span>
          <h1 className="text-3xl font-light text-foreground mt-1" style={{ fontFamily: 'var(--font-display)' }}>
            Open Positions & Roles
          </h1>
          <p className="text-muted mt-1.5 text-sm tracking-wide font-light">
            Publish career opportunities and manage open listings on your website.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/career-applications"
            className="flex items-center gap-1.5 px-4 py-2.5 border border-border bg-panel hover:bg-background text-foreground rounded-xl text-sm font-medium transition-colors"
          >
            <span>View Applications</span>
          </Link>
          <button 
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-accent hover:bg-accent-soft text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm"
          >
            <Plus size={16} />
            <span>New Position</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <input 
          type="text" 
          placeholder="Search jobs by title, location, or type..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-panel border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
        />
      </div>

      {/* Careers Table */}
      <div className="bg-panel border border-border rounded-2xl shadow-sm overflow-hidden">
        {filteredCareers.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4 border border-border">
              <Briefcase className="w-8 h-8 text-muted" />
            </div>
            <h3 className="text-lg font-light text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              {careers.length === 0 ? 'No open positions listed' : 'No matching positions found'}
            </h3>
            <p className="text-muted mt-1.5 text-sm font-light">
              {careers.length === 0 
                ? 'Click "New Position" to list an open job opening.' 
                : 'Try adjusting your search terms.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-background/50">
                  <th className="py-4 px-6 text-[11px] font-semibold text-muted uppercase tracking-wider">Position & Role</th>
                  <th className="py-4 px-6 text-[11px] font-semibold text-muted uppercase tracking-wider">Type</th>
                  <th className="py-4 px-6 text-[11px] font-semibold text-muted uppercase tracking-wider">Location</th>
                  <th className="py-4 px-6 text-[11px] font-semibold text-muted uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-[11px] font-semibold text-muted uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredCareers.map((career) => (
                  <tr key={career.id} className="hover:bg-background/40 transition-colors">
                    <td className="py-4 px-6">
                      <p className="text-sm font-medium text-foreground">{career.title}</p>
                      <p className="text-xs text-muted mt-1 max-w-xs truncate" title={career.description}>
                        {career.description}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-background text-foreground border border-border">
                        <Clock size={12} className="text-muted" />
                        {career.type || 'Full-time'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-muted">
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={13} className="text-accent" />
                        {career.location || 'Remote'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => toggleStatus(career)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                          career.isActive 
                            ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 hover:bg-emerald-500/20' 
                            : 'bg-background text-muted border border-border hover:bg-black/5'
                        }`}
                        title="Click to toggle status"
                      >
                        {career.isActive ? (
                          <>
                            <CheckCircle2 size={12} />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <XCircle size={12} />
                            <span>Closed</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-4 px-6 text-right space-x-1 whitespace-nowrap">
                      <button 
                        onClick={() => openEditModal(career)}
                        className="p-2 text-muted hover:text-foreground hover:bg-background rounded-lg transition-colors"
                        title="Edit Position"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(career.id)}
                        className="p-2 text-muted hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete Position"
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

      {/* Create / Edit Career Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-panel border border-border rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-muted hover:text-foreground p-1 rounded-lg"
            >
              <X size={20} />
            </button>

            <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
              {editingCareer ? 'Update Opening' : 'New Listing'}
            </span>
            <h2 className="text-2xl font-light text-foreground mt-1 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              {editingCareer ? 'Edit Position' : 'Post New Position'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted uppercase tracking-wider">Role Title *</label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Senior Home Automation Engineer"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-muted uppercase tracking-wider">Location</label>
                  <input 
                    type="text" 
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. New Delhi, India"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-muted uppercase tracking-wider">Employment Type</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted uppercase tracking-wider">Description & Responsibilities *</label>
                <textarea 
                  required
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Outline the responsibilities, skills, and experience required..."
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input 
                  type="checkbox"
                  id="isActiveToggle"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 accent-accent rounded"
                />
                <label htmlFor="isActiveToggle" className="text-sm text-foreground cursor-pointer select-none">
                  Open for applications immediately (Active)
                </label>
              </div>

              {modalError && (
                <div className="p-3 bg-red-50/50 border border-red-100 rounded-lg text-red-600 text-xs font-medium">
                  {modalError}
                </div>
              )}

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 border border-border hover:bg-background text-foreground rounded-xl text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 py-2.5 bg-accent hover:bg-accent-soft text-white rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isSaving ? <Loader2 size={16} className="animate-spin" /> : <span>{editingCareer ? 'Save Changes' : 'Publish Position'}</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
