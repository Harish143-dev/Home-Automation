"use client";

import { useEffect, useState, useRef } from 'react';
import { fetchWithAuth } from '../api';
import {
  FolderKanban,
  Plus,
  Edit2,
  Trash2,
  X,
  Image as ImageIcon,
  Search,
  Upload,
  Check,
  Building,
  Home,
  Hotel,
  UtensilsCrossed
} from 'lucide-react';
import { AdminTableSkeleton } from '@/components/ui/skeleton';

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl?: string | null;
  type?: string | null;
  createdAt: string;
}

const PROJECT_TYPES = [
  { label: 'Residential', value: 'Residential', icon: Home, color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  { label: 'Hospitality', value: 'Hospitality', icon: Hotel, color: 'bg-amber-50 text-amber-800 border-amber-200' },
  { label: 'Commercial', value: 'Commercial', icon: Building, color: 'bg-sky-50 text-sky-800 border-sky-200' },
  { label: 'Restaurant', value: 'Restaurant', icon: UtensilsCrossed, color: 'bg-rose-50 text-rose-800 border-rose-200' },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    type: 'Residential',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [modalError, setModalError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetchWithAuth('/projects');
      const data = await response.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      type: 'Residential',
    });
    setSelectedFile(null);
    setImagePreview('');
    setModalError('');
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl || '',
      type: project.type || 'Residential',
    });
    setSelectedFile(null);
    setImagePreview(project.imageUrl || '');
    setModalError('');
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleImageUrlChange = (url: string) => {
    setFormData(prev => ({ ...prev, imageUrl: url }));
    setSelectedFile(null);
    setImagePreview(url);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setModalError('Project Name is mandatory.');
      return;
    }
    if (!formData.description.trim()) {
      setModalError('Project Description is mandatory.');
      return;
    }

    setIsSaving(true);
    setModalError('');

    try {
      let body: any;
      if (selectedFile) {
        const data = new FormData();
        data.append('title', formData.title.trim());
        data.append('description', formData.description.trim());
        data.append('type', formData.type);
        data.append('image', selectedFile);
        body = data;
      } else {
        body = JSON.stringify({
          title: formData.title.trim(),
          description: formData.description.trim(),
          type: formData.type,
          imageUrl: formData.imageUrl.trim() || null,
        });
      }

      if (editingProject) {
        // Update
        const response = await fetchWithAuth(`/projects/${editingProject.id}`, {
          method: 'PUT',
          body,
        });
        const data = await response.json();
        if (data.success) {
          setProjects(projects.map(p => p.id === editingProject.id ? data.data : p));
          setIsModalOpen(false);
        } else {
          setModalError(data.error || 'Failed to update project');
        }
      } else {
        // Create
        const response = await fetchWithAuth('/projects', {
          method: 'POST',
          body,
        });
        const data = await response.json();
        if (data.success) {
          setProjects([data.data, ...projects]);
          setIsModalOpen(false);
        } else {
          setModalError(data.error || 'Failed to create project');
        }
      }
    } catch (error: any) {
      setModalError(error.message || 'Error occurred while saving project');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to permanently delete this project?')) return;
    try {
      const response = await fetchWithAuth(`/projects/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setProjects(projects.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete project", error);
    }
  };

  // Filter projects by type & search
  const filteredProjects = projects.filter(p => {
    const matchesType = selectedTypeFilter === 'All' || (p.type || 'Residential').toLowerCase() === selectedTypeFilter.toLowerCase();
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.type && p.type.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const getTypeBadge = (type?: string | null) => {
    const item = PROJECT_TYPES.find(t => t.value.toLowerCase() === (type || 'residential').toLowerCase()) || PROJECT_TYPES[0];
    const Icon = item.icon;
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${item.color}`}>
        <Icon size={12} />
        {item.label}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-accent font-medium">Portfolio Showcase</span>
            <h1 className="text-3xl font-light text-foreground mt-1" style={{ fontFamily: 'var(--font-display)' }}>
              Works Portfolio
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
          <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-accent font-medium">Portfolio Showcase</span>
          <h1 className="text-3xl sm:text-4xl font-light text-foreground mt-1" style={{ fontFamily: 'var(--font-display)' }}>
            Works & Projects
          </h1>
          <p className="text-muted text-sm font-light mt-1">
            Manage your verified smart home, hospitality, commercial, and restaurant installations.
          </p>
        </div>

        <button 
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-xl text-xs uppercase tracking-[0.15em] font-medium shadow-sm hover:bg-accent/90 transition-all duration-200"
        >
          <Plus size={16} />
          <span>New Project</span>
        </button>
      </div>

      {/* Filter Tabs & Search Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Type Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {['All', 'Residential', 'Hospitality', 'Commercial', 'Restaurant'].map((type) => {
            const count = type === 'All' 
              ? projects.length 
              : projects.filter(p => (p.type || 'Residential').toLowerCase() === type.toLowerCase()).length;
            const isSelected = selectedTypeFilter === type;

            return (
              <button
                key={type}
                onClick={() => setSelectedTypeFilter(type)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap border ${
                  isSelected
                    ? 'bg-secondary text-[#F1EBD9] border-secondary shadow-sm'
                    : 'bg-panel text-muted hover:text-foreground border-border hover:border-border/80'
                }`}
              >
                {type} <span className="opacity-60 ml-1 text-[11px]">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input 
            type="text" 
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-panel border border-border rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all placeholder:text-muted/60"
          />
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-panel border border-border rounded-2xl shadow-sm overflow-hidden">
        {filteredProjects.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4 border border-border">
              <FolderKanban className="w-8 h-8 text-muted" />
            </div>
            <h3 className="text-xl font-light text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              {projects.length === 0 ? 'No projects in database' : 'No matching projects found'}
            </h3>
            <p className="text-muted mt-1.5 text-sm font-light max-w-sm">
              {projects.length === 0 
                ? 'Click "New Project" to add your first luxury automation showcase.' 
                : 'Try adjusting your search query or selecting a different category pill.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-background/50">
                  <th className="py-4 px-6 text-[10px] font-semibold text-muted uppercase tracking-wider">Preview</th>
                  <th className="py-4 px-6 text-[10px] font-semibold text-muted uppercase tracking-wider">Project Name</th>
                  <th className="py-4 px-6 text-[10px] font-semibold text-muted uppercase tracking-wider">Type</th>
                  <th className="py-4 px-6 text-[10px] font-semibold text-muted uppercase tracking-wider">Description</th>
                  <th className="py-4 px-6 text-[10px] font-semibold text-muted uppercase tracking-wider">Added Date</th>
                  <th className="py-4 px-6 text-[10px] font-semibold text-muted uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-background/40 transition-colors">
                    <td className="py-4 px-6">
                      <div className="w-14 h-11 rounded-lg overflow-hidden bg-background border border-border flex items-center justify-center shrink-0 shadow-xs">
                        {project.imageUrl ? (
                          <img 
                            src={project.imageUrl} 
                            alt={project.title} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <ImageIcon size={18} className="text-muted/60" />
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm font-medium text-foreground">{project.title}</p>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      {getTypeBadge(project.type)}
                    </td>
                    <td className="py-4 px-6 max-w-md">
                      <p className="text-xs text-muted font-light line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-xs text-muted font-mono">
                      {new Date(project.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => openEditModal(project)}
                          className="p-1.5 text-muted hover:text-foreground hover:bg-background rounded-lg transition-colors"
                          title="Edit Project"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button 
                          onClick={() => handleDelete(project.id)}
                          className="p-1.5 text-muted hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Project"
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
          <div className="bg-panel border border-border w-full max-w-xl rounded-2xl shadow-2xl p-6 sm:p-8 relative my-8 animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-muted hover:text-foreground p-1 rounded-lg"
            >
              <X size={20} />
            </button>

            <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
              {editingProject ? 'Modify Entry' : 'New Installation'}
            </span>
            <h2 className="text-2xl font-light text-foreground mt-1 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h2>

            <form onSubmit={handleSave} className="space-y-5">
              {/* Project Name (Mandatory) */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted uppercase tracking-wider flex items-center gap-1">
                  Project Name <span className="text-accent">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Modern Villa, South Delhi"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                />
              </div>

              {/* Project Type (Mandatory) */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted uppercase tracking-wider flex items-center gap-1">
                  Project Type <span className="text-accent">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PROJECT_TYPES.map((typeOption) => {
                    const isSelected = formData.type === typeOption.value;
                    const Icon = typeOption.icon;
                    return (
                      <button
                        type="button"
                        key={typeOption.value}
                        onClick={() => setFormData({ ...formData, type: typeOption.value })}
                        className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-secondary text-[#F1EBD9] border-secondary shadow-xs font-semibold'
                            : 'bg-background border-border text-muted hover:text-foreground hover:border-black/20'
                        }`}
                      >
                        <Icon size={14} />
                        {typeOption.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Image Input & Upload */}
              <div className="space-y-2">
                <label className="text-[11px] font-semibold text-muted uppercase tracking-wider">
                  Project Image
                </label>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="text" 
                    value={formData.imageUrl}
                    onChange={(e) => handleImageUrlChange(e.target.value)}
                    placeholder="Enter image URL or path (/images/projects/...)"
                    className="flex-1 px-4 py-2 bg-background border border-border rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                  />
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/*" 
                    className="hidden" 
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-background border border-border rounded-xl text-xs font-medium text-foreground hover:bg-black/5 transition-colors shrink-0"
                  >
                    <Upload size={14} />
                    <span>Upload Image</span>
                  </button>
                </div>

                {/* Live Image Preview */}
                {imagePreview && (
                  <div className="mt-2 relative w-full h-36 rounded-xl overflow-hidden border border-border bg-background">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover" 
                      onError={() => setImagePreview('')}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview('');
                        setSelectedFile(null);
                        setFormData(prev => ({ ...prev, imageUrl: '' }));
                      }}
                      className="absolute top-2 right-2 p-1 bg-black/60 text-white rounded-md hover:bg-black"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>

              {/* Description (Mandatory) */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted uppercase tracking-wider flex items-center gap-1">
                  Description <span className="text-accent">*</span>
                </label>
                <textarea 
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detail the scope of automation, lighting scenes, audio-video integration, and security..."
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all leading-relaxed"
                />
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
                  {isSaving ? 'Saving...' : editingProject ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
