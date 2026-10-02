"use client";

import { useEffect, useState } from 'react';
import { fetchWithAuth } from '../api';
import { Loader2, PenTool, Plus, Edit2, Trash2, X, Search, User } from 'lucide-react';

interface Blog {
  id: number;
  title: string;
  content: string;
  author?: string | null;
  createdAt: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [modalError, setModalError] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetchWithAuth('/blogs');
      const data = await response.json();
      if (data.success) {
        setBlogs(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch blogs", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingBlog(null);
    setFormData({ title: '', author: 'Admin', content: '' });
    setModalError('');
    setIsModalOpen(true);
  };

  const openEditModal = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      author: blog.author || '',
      content: blog.content,
    });
    setModalError('');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setModalError('Article title is required');
      return;
    }
    if (!formData.content.trim()) {
      setModalError('Article content is required');
      return;
    }

    setIsSaving(true);
    setModalError('');

    try {
      if (editingBlog) {
        // Update
        const response = await fetchWithAuth(`/blogs/${editingBlog.id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.success) {
          setBlogs(blogs.map(b => b.id === editingBlog.id ? data.data : b));
          setIsModalOpen(false);
        } else {
          setModalError(data.error || 'Failed to update article');
        }
      } else {
        // Create
        const response = await fetchWithAuth('/blogs', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.success) {
          setBlogs([data.data, ...blogs]);
          setIsModalOpen(false);
        } else {
          setModalError(data.error || 'Failed to create article');
        }
      }
    } catch (err) {
      setModalError('Server communication error. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    try {
      const response = await fetchWithAuth(`/blogs/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setBlogs(blogs.filter(b => b.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete blog", error);
    }
  };

  // Helper to strip HTML tags for clean text preview
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();
  };

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.author && b.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
    b.content.toLowerCase().includes(searchQuery.toLowerCase())
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
          <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-accent font-medium">Editorial</span>
          <h1 className="text-3xl font-light text-foreground mt-1" style={{ fontFamily: 'var(--font-display)' }}>
            Journal & Articles
          </h1>
          <p className="text-muted mt-1.5 text-sm tracking-wide font-light">
            Manage your brand stories, design insights, and thought leadership articles.
          </p>
        </div>
        <button 
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-accent hover:bg-accent-soft text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm"
        >
          <Plus size={16} />
          <span>New Article</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <input 
          type="text" 
          placeholder="Search journal entries by title, author, or content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-panel border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
        />
      </div>

      {/* Blogs Table */}
      <div className="bg-panel border border-border rounded-2xl shadow-sm overflow-hidden">
        {filteredBlogs.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4 border border-border">
              <PenTool className="w-8 h-8 text-muted" />
            </div>
            <h3 className="text-lg font-light text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              {blogs.length === 0 ? 'No articles yet' : 'No matching articles found'}
            </h3>
            <p className="text-muted mt-1.5 text-sm font-light">
              {blogs.length === 0 
                ? 'Click "New Article" to write your first journal entry.' 
                : 'Try adjusting your search query.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-background/50">
                  <th className="py-4 px-6 text-[11px] font-semibold text-muted uppercase tracking-wider">Article Title</th>
                  <th className="py-4 px-6 text-[11px] font-semibold text-muted uppercase tracking-wider">Author</th>
                  <th className="py-4 px-6 text-[11px] font-semibold text-muted uppercase tracking-wider">Excerpt</th>
                  <th className="py-4 px-6 text-[11px] font-semibold text-muted uppercase tracking-wider">Date</th>
                  <th className="py-4 px-6 text-[11px] font-semibold text-muted uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-background/40 transition-colors">
                    <td className="py-4 px-6">
                      <p className="text-sm font-medium text-foreground">{blog.title}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-background text-foreground border border-border">
                        <User size={12} className="text-accent" />
                        {blog.author || 'Editorial Team'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-muted max-w-sm truncate" title={stripHtml(blog.content)}>
                      {stripHtml(blog.content)}
                    </td>
                    <td className="py-4 px-6 text-xs text-muted whitespace-nowrap">
                      {new Date(blog.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="py-4 px-6 text-right space-x-1 whitespace-nowrap">
                      <button 
                        onClick={() => openEditModal(blog)}
                        className="p-2 text-muted hover:text-foreground hover:bg-background rounded-lg transition-colors"
                        title="Edit Article"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(blog.id)}
                        className="p-2 text-muted hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete Article"
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

      {/* Create / Edit Blog Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-panel border border-border rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-muted hover:text-foreground p-1 rounded-lg"
            >
              <X size={20} />
            </button>

            <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
              {editingBlog ? 'Edit Story' : 'New Publication'}
            </span>
            <h2 className="text-2xl font-light text-foreground mt-1 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              {editingBlog ? 'Edit Article' : 'Write Journal Article'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-[11px] font-semibold text-muted uppercase tracking-wider">Article Title *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Crafting Quiet Luxury in Connected Spaces"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-muted uppercase tracking-wider">Author Name</label>
                  <input 
                    type="text" 
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="e.g. Shveta / Admin"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted uppercase tracking-wider">Content *</label>
                <textarea 
                  required
                  rows={8}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write article content here. Paragraphs and HTML formatting are supported..."
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
                  {isSaving ? <Loader2 size={16} className="animate-spin" /> : <span>{editingBlog ? 'Save Changes' : 'Publish Article'}</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
