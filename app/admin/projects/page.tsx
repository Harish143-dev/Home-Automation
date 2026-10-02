"use client";

import { useEffect, useState } from 'react';
import { fetchWithAuth } from '../api';
import { Loader2, FolderKanban, Plus, Edit2, Trash2, X, Image as ImageIcon, Search } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl?: string | null;
  createdAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [modalError, setModalError] = useState('');

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
    setFormData({ title: '', description: '', imageUrl: '' });
    setModalError('');
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl || '',
    });
    setModalError('');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setModalError('Project title is required');
      return;
    }

    setIsSaving(true);
    setModalError('');

    try {
      if (editingProject) {
        // Update
        const response = await fetchWithAuth(`/projects/${editingProject.id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
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
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.success) {
          setProjects([data.data, ...projects]);
          setIsModalOpen(false);
        } else {
          setModalError(data.error || 'Failed to create project');
        }
      }
    } catch (err) {
      setModalError('Server communication error. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const response = await fetchWithAuth(`/projects/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setProjects(projects.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete project", error);
    }
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
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
          <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-accent font-medium">Showcase</span>
          <h1 className="text-3xl font-light text-foreground mt-1" style={{ fontFamily: 'var(--font-display)' }}>
            Projects Portfolio
          </h1>
          <p className="text-muted mt-1.5 text-sm tracking-wide font-light">
            Manage your smart automation case studies and showcased installations.
          </p>
        </div>
        <button 
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-accent hover:bg-accent-soft text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm"
        >
          <Plus size={16} />
          <span>New Project</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <input 
          type="text" 
          placeholder="Search projects by title or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-panel border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
        />
      </div>

      {/* Projects Table */}
      <div className="bg-panel border border-border rounded-2xl shadow-sm overflow-hidden">
        {filteredProjects.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4 border border-border">
              <FolderKanban className="w-8 h-8 text-muted" />
            </div>
            <h3 className="text-lg font-light text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              {projects.length === 0 ? 'No projects yet' : 'No matching projects found'}
            </h3>
            <p className="text-muted mt-1.5 text-sm font-light">
              {projects.length === 0 
                ? 'Click "New Project" to add your first case study.' 
                : 'Try adjusting your search query.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-background/50">
                  <th className="py-4 px-6 text-[11px] font-semibold text-muted uppercase tracking-wider">Preview</th>
                  <th className="py-4 px-6 text-[11px] font-semibold text-muted uppercase tracking-wider">Project Title</th>
                  <th className="py-4 px-6 text-[11px] font-semibold text-muted uppercase tracking-wider">Description</th>
                  <th className="py-4 px-6 text-[11px] font-semibold text-muted uppercase tracking-wider">Added Date</th>
                  <th className="py-4 px-6 text-[11px] font-semibold text-muted uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-background/40 transition-colors">
                    <td className="py-4 px-6">
                      <div className="w-14 h-10 rounded-lg overflow-hidden bg-background border border-border flex items-center justify-center shrink-0">
                        {project.imageUrl ? (
                          <img 
                            src={project.imageUrl} 
                            alt={project.title} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback on broken image
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <ImageIcon size={18} className="text-muted" />
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm font-medium text-foreground">{project.title}</p>
                    </td>
                    <td className="py-4 px-6 text-sm text-muted max-w-sm truncate" title={project.description}>
                      {project.description}
                    </td>
                    <td className="py-4 px-6 text-xs text-muted whitespace-nowrap">
                      {new Date(project.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="py-4 px-6 text-right space-x-1 whitespace-nowrap">
                      <button 
                        onClick={() => openEditModal(project)}
                        className="p-2 text-muted hover:text-foreground hover:bg-background rounded-lg transition-colors"
                        title="Edit Project"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(project.id)}
                        className="p-2 text-muted hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete Project"
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

      {/* Create / Edit Project Modal */}
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
              {editingProject ? 'Modify Entry' : 'New Installation'}
            </span>
            <h2 className="text-2xl font-light text-foreground mt-1 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted uppercase tracking-wider">Project Title *</label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Modern Villa Gurgaon"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted uppercase tracking-wider">Image Path / URL</label>
                <input 
                  type="text" 
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="e.g. /assets/residential/project/delhi-residence/delhi-residence-1.jpg"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted uppercase tracking-wider">Description *</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the automation setup, lighting, audio systems, and client requirements..."
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all leading-relaxed"
                />
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
                  {isSaving ? <Loader2 size={16} className="animate-spin" /> : <span>{editingProject ? 'Save Changes' : 'Create Project'}</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
