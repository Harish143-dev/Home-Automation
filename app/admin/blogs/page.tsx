"use client";

import { useEffect, useState, useRef } from 'react';
import { fetchWithAuth } from '../api';
import { 
  PenTool, 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  Search, 
  Upload, 
  Calendar, 
  Sparkles, 
  BookOpen, 
  User, 
  Image as ImageIcon 
} from 'lucide-react';
import { AdminTableSkeleton } from '@/components/ui/skeleton';

interface Blog {
  id: number;
  title: string;
  description?: string | null;
  content: string;
  imageUrl?: string | null;
  category?: string | null;
  author?: string | null;
  publishedAt?: string | null;
  keyTakeaways?: string | null;
  createdAt: string;
}

const BLOG_CATEGORIES = [
  'Smart Living',
  'Lighting Design',
  'Hospitality',
  'Home Automation',
  'Technology',
  'Architecture',
  'News & Trends'
];

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Smart Living',
    publishedAt: new Date().toISOString().split('T')[0],
    description: '',
    imageUrl: '',
    keyTakeaways: '',
    content: '',
    author: 'ATPL Team',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [modalError, setModalError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    setFormData({
      title: '',
      category: 'Smart Living',
      publishedAt: new Date().toISOString().split('T')[0],
      description: '',
      imageUrl: '',
      keyTakeaways: '',
      content: '',
      author: 'ATPL Team',
    });
    setSelectedFile(null);
    setImagePreview('');
    setModalError('');
    setIsModalOpen(true);
  };

  const openEditModal = (blog: Blog) => {
    setEditingBlog(blog);
    const dateFormatted = blog.publishedAt
      ? new Date(blog.publishedAt).toISOString().split('T')[0]
      : new Date(blog.createdAt).toISOString().split('T')[0];

    setFormData({
      title: blog.title,
      category: blog.category || 'Smart Living',
      publishedAt: dateFormatted,
      description: blog.description || '',
      imageUrl: blog.imageUrl || '',
      keyTakeaways: blog.keyTakeaways || '',
      content: blog.content,
      author: blog.author || 'ATPL Team',
    });
    setSelectedFile(null);
    setImagePreview(blog.imageUrl || '');
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
      setModalError('Article title is mandatory.');
      return;
    }
    if (!formData.content.trim()) {
      setModalError('Article content is mandatory.');
      return;
    }

    setIsSaving(true);
    setModalError('');

    try {
      let body: any;
      if (selectedFile) {
        const data = new FormData();
        data.append('title', formData.title.trim());
        data.append('category', formData.category);
        data.append('publishedAt', formData.publishedAt);
        data.append('description', formData.description.trim());
        data.append('keyTakeaways', formData.keyTakeaways.trim());
        data.append('content', formData.content.trim());
        data.append('author', formData.author.trim());
        data.append('image', selectedFile);
        body = data;
      } else {
        body = JSON.stringify({
          title: formData.title.trim(),
          category: formData.category,
          publishedAt: formData.publishedAt,
          description: formData.description.trim() || null,
          imageUrl: formData.imageUrl.trim() || null,
          keyTakeaways: formData.keyTakeaways.trim() || null,
          content: formData.content.trim(),
          author: formData.author.trim() || 'ATPL Team',
        });
      }

      if (editingBlog) {
        // Update
        const response = await fetchWithAuth(`/blogs/${editingBlog.id}`, {
          method: 'PUT',
          body,
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
          body,
        });
        const data = await response.json();
        if (data.success) {
          setBlogs([data.data, ...blogs]);
          setIsModalOpen(false);
        } else {
          setModalError(data.error || 'Failed to create article');
        }
      }
    } catch (error: any) {
      setModalError(error.message || 'Error occurred while saving article');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to permanently delete this article?')) return;
    try {
      const response = await fetchWithAuth(`/blogs/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setBlogs(blogs.filter(b => b.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete blog", error);
    }
  };

  // Filter articles
  const filteredBlogs = blogs.filter(b => {
    const matchesCategory = selectedCategoryFilter === 'All' || (b.category || 'Smart Living').toLowerCase() === selectedCategoryFilter.toLowerCase();
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.description && b.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (b.author && b.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
      b.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-accent font-medium">Editorial Publishing</span>
            <h1 className="text-3xl font-light text-foreground mt-1" style={{ fontFamily: 'var(--font-display)' }}>
              Journal & Articles
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
          <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-accent font-medium">Editorial Publishing</span>
          <h1 className="text-3xl sm:text-4xl font-light text-foreground mt-1" style={{ fontFamily: 'var(--font-display)' }}>
            Blogs & Journal
          </h1>
          <p className="text-muted text-sm font-light mt-1">
            Publish thought leadership, smart living trends, architectural lighting articles, and client guides.
          </p>
        </div>

        <button 
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-xl text-xs uppercase tracking-[0.15em] font-medium shadow-sm hover:bg-accent/90 transition-all duration-200"
        >
          <Plus size={16} />
          <span>Write Article</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {['All', ...BLOG_CATEGORIES].map((cat) => {
            const count = cat === 'All' 
              ? blogs.length 
              : blogs.filter(b => (b.category || 'Smart Living').toLowerCase() === cat.toLowerCase()).length;
            const isSelected = selectedCategoryFilter === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap border ${
                  isSelected
                    ? 'bg-secondary text-[#F1EBD9] border-secondary shadow-sm'
                    : 'bg-panel text-muted hover:text-foreground border-border hover:border-border/80'
                }`}
              >
                {cat} <span className="opacity-60 ml-1 text-[11px]">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative min-w-[260px]">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input 
            type="text" 
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-panel border border-border rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all placeholder:text-muted/60"
          />
        </div>
      </div>

      {/* Blogs Table */}
      <div className="bg-panel border border-border rounded-2xl shadow-sm overflow-hidden">
        {filteredBlogs.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4 border border-border">
              <PenTool className="w-8 h-8 text-muted" />
            </div>
            <h3 className="text-xl font-light text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              {blogs.length === 0 ? 'No articles published yet' : 'No matching articles found'}
            </h3>
            <p className="text-muted mt-1.5 text-sm font-light max-w-sm">
              {blogs.length === 0 
                ? 'Click "Write Article" to publish your first journal story.' 
                : 'Try adjusting your search query or selecting a different category pill.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-background/50">
                  <th className="py-4 px-6 text-[10px] font-semibold text-muted uppercase tracking-wider">Image</th>
                  <th className="py-4 px-6 text-[10px] font-semibold text-muted uppercase tracking-wider">Title & Summary</th>
                  <th className="py-4 px-6 text-[10px] font-semibold text-muted uppercase tracking-wider">Category</th>
                  <th className="py-4 px-6 text-[10px] font-semibold text-muted uppercase tracking-wider">Author</th>
                  <th className="py-4 px-6 text-[10px] font-semibold text-muted uppercase tracking-wider">Date</th>
                  <th className="py-4 px-6 text-[10px] font-semibold text-muted uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-background/40 transition-colors">
                    <td className="py-4 px-6">
                      <div className="w-14 h-11 rounded-lg overflow-hidden bg-background border border-border flex items-center justify-center shrink-0 shadow-xs">
                        {blog.imageUrl ? (
                          <img 
                            src={blog.imageUrl} 
                            alt={blog.title} 
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
                    <td className="py-4 px-6 max-w-sm">
                      <p className="text-sm font-medium text-foreground line-clamp-1">{blog.title}</p>
                      {blog.description ? (
                        <p className="text-xs text-muted font-light line-clamp-1 mt-0.5">{blog.description}</p>
                      ) : (
                        <p className="text-xs text-muted font-light line-clamp-1 mt-0.5">
                          {blog.content.replace(/<[^>]*>?/gm, '').trim()}
                        </p>
                      )}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20">
                        {blog.category || 'Smart Living'}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-xs text-muted font-light">
                      <div className="flex items-center gap-1.5">
                        <User size={13} className="text-muted/70" />
                        <span>{blog.author || 'ATPL Team'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-xs text-muted font-mono">
                      {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => openEditModal(blog)}
                          className="p-1.5 text-muted hover:text-foreground hover:bg-background rounded-lg transition-colors"
                          title="Edit Article"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button 
                          onClick={() => handleDelete(blog.id)}
                          className="p-1.5 text-muted hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Article"
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
          <div className="bg-panel border border-border w-full max-w-3xl rounded-2xl shadow-2xl p-6 sm:p-8 relative my-8 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-muted hover:text-foreground p-1 rounded-lg"
            >
              <X size={20} />
            </button>

            <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
              {editingBlog ? 'Editorial Revisions' : 'New Publication'}
            </span>
            <h2 className="text-2xl font-light text-foreground mt-1 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              {editingBlog ? 'Edit Journal Story' : 'Publish New Article'}
            </h2>

            <form onSubmit={handleSave} className="space-y-5">
              {/* Row 1: Title */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted uppercase tracking-wider flex items-center gap-1">
                  Article Title <span className="text-accent">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. The Evolution of Architectural Lighting in India"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                />
              </div>

              {/* Row 2: Category, Publish Date, Author */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-muted uppercase tracking-wider flex items-center gap-1">
                    Category <span className="text-accent">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                  >
                    {BLOG_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-muted uppercase tracking-wider flex items-center gap-1">
                    Publish Date
                  </label>
                  <input 
                    type="date"
                    value={formData.publishedAt}
                    onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-muted uppercase tracking-wider">
                    Author
                  </label>
                  <input 
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="ATPL Team"
                    className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                  />
                </div>
              </div>

              {/* Row 3: Description (Excerpt) */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted uppercase tracking-wider flex items-center gap-1">
                  Description / Excerpt Summary
                </label>
                <textarea 
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="A concise 2-sentence summary of the article for cards and meta descriptions..."
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all leading-relaxed"
                />
              </div>

              {/* Row 4: Image Upload / Path */}
              <div className="space-y-2">
                <label className="text-[11px] font-semibold text-muted uppercase tracking-wider">
                  Featured Article Image
                </label>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="text" 
                    value={formData.imageUrl}
                    onChange={(e) => handleImageUrlChange(e.target.value)}
                    placeholder="Enter image URL or path (/assets/residential/...)"
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
                  <div className="mt-2 relative w-full h-40 rounded-xl overflow-hidden border border-border bg-background">
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

              {/* Row 5: Key Takeaways */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles size={13} className="text-accent" />
                  Key Takeaways
                </label>
                <textarea 
                  rows={2}
                  value={formData.keyTakeaways}
                  onChange={(e) => setFormData({ ...formData, keyTakeaways: e.target.value })}
                  placeholder="Key highlight points (e.g. • Circadian lighting boosts focus • Smart HVAC saves 28% power)"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all leading-relaxed"
                />
              </div>

              {/* Row 6: Full Content */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted uppercase tracking-wider flex items-center gap-1">
                  Article Content <span className="text-accent">*</span>
                </label>
                <textarea 
                  required
                  rows={7}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write the complete article content here (HTML paragraphs <p>...</p> or plain text are supported)..."
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all leading-relaxed font-mono"
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
                  {isSaving ? 'Publishing...' : editingBlog ? 'Update Article' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
