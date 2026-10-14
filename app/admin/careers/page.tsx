"use client";

import { useEffect, useState } from 'react';
import { fetchWithAuth } from '../api';
import { 
  Briefcase, 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  Search, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Building2,
  GraduationCap
} from 'lucide-react';
import Link from 'next/link';
import { AdminTableSkeleton } from '@/components/ui/skeleton';

interface Career {
  id: number;
  title: string;
  description: string;
  location?: string | null;
  type?: string | null;
  experience?: string | null;
  department?: string | null;
  isActive: boolean;
  createdAt: string;
}

const COMMON_LOCATIONS = [
  'New Delhi, India',
  'Mumbai, India',
  'Bengaluru, India',
  'Hyderabad, India',
  'Remote / Hybrid'
];

const EMPLOYMENT_TYPES = [
  'Full Time',
  'Part Time',
  'Contract',
  'Internship'
];

const DEPARTMENTS = [
  'Engineering & Operations',
  'Lighting & Automation Design',
  'Sales & Business Development',
  'Audio-Video Integration',
  'Project Management',
  'Customer Support & AMC'
];

export default function CareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState<Career | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: 'New Delhi, India',
    type: 'Full Time',
    experience: 'Open Opportunity',
    department: 'Engineering & Operations',
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
      type: 'Full Time',
      experience: 'Open Opportunity',
      department: 'Engineering & Operations',
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
      location: career.location || 'New Delhi, India',
      type: career.type || 'Full Time',
      experience: career.experience || 'Open Opportunity',
      department: career.department || 'Engineering & Operations',
      isActive: career.isActive !== false,
    });
    setModalError('');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    // Only particular fields are mandatory
    if (!formData.title.trim()) {
      setModalError('Position Title is mandatory.');
      return;
    }
    if (!formData.location.trim()) {
      setModalError('Location is mandatory.');
      return;
    }
    if (!formData.description.trim()) {
      setModalError('Job Description is mandatory.');
      return;
    }

    setIsSaving(true);
    setModalError('');

    try {
      const payload = {
        title: formData.title.trim(),
        location: formData.location.trim(),
        description: formData.description.trim(),
        type: formData.type,
        experience: formData.experience.trim() || 'Open Opportunity',
        department: formData.department.trim() || 'Engineering & Operations',
        isActive: formData.isActive,
      };

      if (editingCareer) {
        // Update
        const response = await fetchWithAuth(`/careers/${editingCareer.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (data.success) {
          setCareers(careers.map(c => c.id === editingCareer.id ? data.data : c));
          setIsModalOpen(false);
        } else {
          setModalError(data.error || 'Failed to update career position');
        }
      } else {
        // Create
        const response = await fetchWithAuth('/careers', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (data.success) {
          setCareers([data.data, ...careers]);
          setIsModalOpen(false);
        } else {
          setModalError(data.error || 'Failed to create career position');
        }
      }
    } catch (error: any) {
      setModalError(error.message || 'Error occurred while saving');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleActive = async (career: Career) => {
    try {
      const updatedStatus = !career.isActive;
      const response = await fetchWithAuth(`/careers/${career.id}`, {
        method: 'PUT',
        body: JSON.stringify({ isActive: updatedStatus }),
      });
      const data = await response.json();
      if (data.success) {
        setCareers(careers.map(c => c.id === career.id ? { ...c, isActive: updatedStatus } : c));
      }
    } catch (error) {
      console.error("Failed to toggle status", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to permanently delete this opening?')) return;
    try {
      const response = await fetchWithAuth(`/careers/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setCareers(careers.filter(c => c.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete career", error);
    }
  };

  // Filter careers
  const filteredCareers = careers.filter(c => {
    const matchesStatus = 
      statusFilter === 'All' ||
      (statusFilter === 'Active' && c.isActive) ||
      (statusFilter === 'Inactive' && !c.isActive);

    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.location && c.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.department && c.department.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.type && c.type.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-accent font-medium">Recruitment & Talent</span>
            <h1 className="text-3xl font-light text-foreground mt-1" style={{ fontFamily: 'var(--font-display)' }}>
              Open Positions
            </h1>
          </div>
        </div>
        <AdminTableSkeleton rows={5} cols={5} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-6">
        <div>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-accent font-medium">Recruitment & Talent</span>
          <h1 className="text-3xl sm:text-4xl font-light text-foreground mt-1" style={{ fontFamily: 'var(--font-display)' }}>
            Careers & Openings
          </h1>
          <p className="text-muted text-sm font-light mt-1">
            Post opportunities to recruit engineers, project managers, and automation specialists.
          </p>
        </div>

        <button 
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-xl text-xs uppercase tracking-[0.15em] font-medium shadow-sm hover:bg-accent/90 transition-all duration-200"
        >
          <Plus size={16} />
          <span>New Position</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Status Filters */}
        <div className="flex items-center gap-1.5">
          {(['All', 'Active', 'Inactive'] as const).map((status) => {
            const count = status === 'All' 
              ? careers.length 
              : status === 'Active' 
                ? careers.filter(c => c.isActive).length 
                : careers.filter(c => !c.isActive).length;
            const isSelected = statusFilter === status;

            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                  isSelected
                    ? 'bg-secondary text-[#F1EBD9] border-secondary shadow-sm'
                    : 'bg-panel text-muted hover:text-foreground border-border hover:border-border/80'
                }`}
              >
                {status} <span className="opacity-60 ml-1 text-[11px]">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative min-w-[260px]">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input 
            type="text" 
            placeholder="Search roles, locations, departments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-panel border border-border rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all placeholder:text-muted/60"
          />
        </div>
      </div>

      {/* Careers Table */}
      <div className="bg-panel border border-border rounded-2xl shadow-sm overflow-hidden">
        {filteredCareers.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4 border border-border">
              <Briefcase className="w-8 h-8 text-muted" />
            </div>
            <h3 className="text-xl font-light text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              {careers.length === 0 ? 'No job openings posted' : 'No matching openings found'}
            </h3>
            <p className="text-muted mt-1.5 text-sm font-light max-w-sm">
              {careers.length === 0 
                ? 'Click "New Position" to create your first career listing.' 
                : 'Try adjusting your search query or status filter.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-background/50">
                  <th className="py-4 px-6 text-[10px] font-semibold text-muted uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-[10px] font-semibold text-muted uppercase tracking-wider">Role Title & Dept</th>
                  <th className="py-4 px-6 text-[10px] font-semibold text-muted uppercase tracking-wider">Location</th>
                  <th className="py-4 px-6 text-[10px] font-semibold text-muted uppercase tracking-wider">Type & Exp</th>
                  <th className="py-4 px-6 text-[10px] font-semibold text-muted uppercase tracking-wider">Description</th>
                  <th className="py-4 px-6 text-[10px] font-semibold text-muted uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredCareers.map((career) => (
                  <tr key={career.id} className="hover:bg-background/40 transition-colors">
                    <td className="py-4 px-6 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleActive(career)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                          career.isActive
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-zinc-100 text-zinc-600 border-zinc-200 hover:bg-zinc-200'
                        }`}
                        title="Click to toggle status"
                      >
                        {career.isActive ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                        {career.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>

                    <td className="py-4 px-6">
                      <p className="text-sm font-medium text-foreground">{career.title}</p>
                      {career.department && (
                        <p className="text-xs text-muted font-light flex items-center gap-1 mt-0.5">
                          <Building2 size={11} className="text-muted/70" />
                          <span>{career.department}</span>
                        </p>
                      )}
                    </td>

                    <td className="py-4 px-6 whitespace-nowrap text-xs text-muted font-light">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-accent/80 shrink-0" />
                        <span>{career.location || 'New Delhi, India'}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex flex-col gap-0.5 text-xs text-muted">
                        <span className="font-medium text-foreground/80">{career.type || 'Full Time'}</span>
                        <span className="text-[11px] text-muted/80">{career.experience || 'Open Opportunity'}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 max-w-xs">
                      <p className="text-xs text-muted font-light line-clamp-2 leading-relaxed">
                        {career.description}
                      </p>
                    </td>

                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => openEditModal(career)}
                          className="p-1.5 text-muted hover:text-foreground hover:bg-background rounded-lg transition-colors"
                          title="Edit Position"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button 
                          onClick={() => handleDelete(career.id)}
                          className="p-1.5 text-muted hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Position"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Form Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-panel border border-border w-full max-w-2xl rounded-2xl shadow-2xl p-6 sm:p-8 relative my-8 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-muted hover:text-foreground p-1 rounded-lg"
            >
              <X size={20} />
            </button>

            <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
              {editingCareer ? 'Update Opening' : 'Talent Acquisition'}
            </span>
            <h2 className="text-2xl font-light text-foreground mt-1 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              {editingCareer ? 'Edit Job Opening' : 'Post New Position'}
            </h2>

            <form onSubmit={handleSave} className="space-y-5">
              {/* Row 1: Position Title (Mandatory) */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted uppercase tracking-wider flex items-center gap-1">
                  Position Title <span className="text-accent">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Senior Smart Home Systems Engineer"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                />
              </div>

              {/* Row 2: Location (Mandatory) with quick suggestion chips */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted uppercase tracking-wider flex items-center gap-1">
                  Location <span className="text-accent">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. New Delhi, India"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                />
                {/* Quick location chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {COMMON_LOCATIONS.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setFormData({ ...formData, location: loc })}
                      className="px-2.5 py-0.5 rounded-md text-[11px] bg-background border border-border text-muted hover:text-foreground transition-colors"
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 3: Department & Employment Type & Experience (Optional) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-muted uppercase tracking-wider">
                    Department
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                  >
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-muted uppercase tracking-wider">
                    Employment Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                  >
                    {EMPLOYMENT_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-muted uppercase tracking-wider">
                    Experience Required
                  </label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="e.g. 2-5 Years / Open"
                    className="w-full px-3 py-2 bg-background border border-border rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                  />
                </div>
              </div>

              {/* Row 4: Job Description (Mandatory) */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted uppercase tracking-wider flex items-center gap-1">
                  Job Description & Requirements <span className="text-accent">*</span>
                </label>
                <textarea 
                  required
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Outline key responsibilities, automation platforms used (Lutron, Crestron, Savant, KNX), and preferred candidate skills..."
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all leading-relaxed"
                />
              </div>

              {/* Row 5: Active Status Switch */}
              <div className="flex items-center justify-between p-4 bg-background rounded-xl border border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">Listing Active Status</p>
                  <p className="text-xs text-muted font-light">
                    When active, this position will immediately appear on the public Careers page.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                    formData.isActive ? 'bg-accent' : 'bg-zinc-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                      formData.isActive ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {modalError && (
                <div className="p-3 bg-red-50/70 border border-red-200 rounded-xl text-red-600 text-xs font-medium">
                  {modalError}
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-xs uppercase tracking-wider text-muted hover:text-foreground transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent text-white rounded-xl text-xs uppercase tracking-wider font-semibold shadow-sm hover:bg-accent/90 disabled:opacity-50 transition-all"
                >
                  {isSaving ? 'Saving...' : editingCareer ? 'Update Opening' : 'Publish Position'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
