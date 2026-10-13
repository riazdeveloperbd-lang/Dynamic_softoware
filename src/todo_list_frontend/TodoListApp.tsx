import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  CheckCircle2,
  Circle,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit3,
  Calendar,
  Tag,
  AlertCircle,
  Image as ImageIcon,
  Upload,
  X,
  Eye,
  RotateCcw,
  Sparkles,
  Smartphone,
  LayoutGrid,
  List,
  Check,
  ChevronDown,
  Layers,
  ArrowRight,
  ExternalLink,
  Flame,
  Clock,
  Share2,
} from 'lucide-react';
import {
  TodoItem,
  Subtask,
  PRESET_IMAGES,
  getTodos,
  saveTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodoComplete,
  toggleSubtask,
  resetDefaultTodos,
} from './todoStore';

export interface TodoListAppProps {
  onSwitchProject?: (projectId: string) => void;
}

export default function TodoListApp({ onSwitchProject }: TodoListAppProps) {
  // Central todos state
  const [todos, setTodos] = useState<TodoItem[]>(() => getTodos());

  // Listen to external updates (e.g. from canvas or other tabs)
  useEffect(() => {
    const handleUpdate = () => setTodos(getTodos());
    window.addEventListener('todos-updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('todos-updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // UI States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'split'>('split');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Project Switcher Dropdown
  const [projectMenuOpen, setProjectMenuOpen] = useState(false);
  const projectMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (projectMenuRef.current && !projectMenuRef.current.contains(e.target as Node)) {
        setProjectMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Modal States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<TodoItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State for Create / Edit
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formCategory, setFormCategory] = useState<TodoItem['category']>('Work');
  const [formPriority, setFormPriority] = useState<TodoItem['priority']>('medium');
  const [formDueDate, setFormDueDate] = useState('');
  const [formSubtasks, setFormSubtasks] = useState<Subtask[]>([]);
  const [newSubtaskText, setNewSubtaskText] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Categories list
  const categories = ['All', 'Work', 'Personal', 'Design', 'Health', 'Study', 'Shopping'];

  // Filtered & Searched todos
  const filteredTodos = useMemo(() => {
    return todos.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchStatus =
        selectedStatus === 'all' ||
        (selectedStatus === 'active' && !item.completed) ||
        (selectedStatus === 'completed' && item.completed);
      const matchPriority =
        selectedPriority === 'all' || item.priority === selectedPriority;
      return matchSearch && matchCategory && matchStatus && matchPriority;
    });
  }, [todos, searchQuery, selectedCategory, selectedStatus, selectedPriority]);

  // Statistics
  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = totalCount - completedCount;
  const urgentCount = todos.filter((t) => t.priority === 'urgent' && !t.completed).length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Open Create Modal
  const handleOpenCreate = () => {
    setFormTitle('');
    setFormDesc('');
    setFormImage(PRESET_IMAGES[0].url);
    setFormCategory('Work');
    setFormPriority('medium');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setFormDueDate(tomorrow.toISOString().split('T')[0]);
    setFormSubtasks([]);
    setNewSubtaskText('');
    setIsCreateOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (item: TodoItem) => {
    setActiveItem(item);
    setFormTitle(item.title);
    setFormDesc(item.description);
    setFormImage(item.imageUrl);
    setFormCategory(item.category);
    setFormPriority(item.priority);
    setFormDueDate(item.dueDate || '');
    setFormSubtasks(item.subtasks ? [...item.subtasks] : []);
    setNewSubtaskText('');
    setIsEditOpen(true);
  };

  // Open Detail Modal
  const handleOpenDetail = (item: TodoItem) => {
    setActiveItem(item);
    setIsDetailOpen(true);
  };

  // Image Upload handler
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setFormImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Add Subtask to Form
  const handleAddSubtaskToForm = () => {
    if (!newSubtaskText.trim()) return;
    setFormSubtasks((prev) => [
      ...prev,
      {
        id: `st_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        text: newSubtaskText.trim(),
        done: false,
      },
    ]);
    setNewSubtaskText('');
  };

  // Remove Subtask from Form
  const handleRemoveSubtaskFromForm = (id: string) => {
    setFormSubtasks((prev) => prev.filter((s) => s.id !== id));
  };

  // Submit Create (Write)
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    addTodo({
      title: formTitle.trim(),
      description: formDesc.trim(),
      imageUrl: formImage || PRESET_IMAGES[0].url,
      category: formCategory,
      priority: formPriority,
      completed: false,
      dueDate: formDueDate,
      subtasks: formSubtasks,
    });

    setIsCreateOpen(false);
    showToast('✨ Task created successfully!');
  };

  // Submit Edit (Update)
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeItem || !formTitle.trim()) return;

    updateTodo(activeItem.id, {
      title: formTitle.trim(),
      description: formDesc.trim(),
      imageUrl: formImage || activeItem.imageUrl,
      category: formCategory,
      priority: formPriority,
      dueDate: formDueDate,
      subtasks: formSubtasks,
    });

    setIsEditOpen(false);
    showToast('💾 Task updated successfully!');
  };

  // Delete Action
  const handleDeleteAction = (id: string) => {
    deleteTodo(id);
    setDeleteConfirmId(null);
    if (activeItem?.id === id) {
      setIsDetailOpen(false);
      setIsEditOpen(false);
    }
    showToast('🗑️ Task deleted');
  };

  // Toggle Complete
  const handleToggle = (id: string) => {
    toggleTodoComplete(id);
  };

  // Priority color helper
  const getPriorityBadge = (priority: TodoItem['priority']) => {
    switch (priority) {
      case 'urgent':
        return {
          bg: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
          dot: 'bg-rose-500',
          label: 'Urgent',
        };
      case 'high':
        return {
          bg: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
          dot: 'bg-amber-500',
          label: 'High',
        };
      case 'medium':
        return {
          bg: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
          dot: 'bg-sky-500',
          label: 'Medium',
        };
      case 'low':
      default:
        return {
          bg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
          dot: 'bg-emerald-500',
          label: 'Low',
        };
    }
  };

  // Category badge helper
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Work':
        return 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';
      case 'Design':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      case 'Health':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'Study':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
      case 'Shopping':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      default:
        return 'bg-zinc-500/15 text-zinc-300 border-zinc-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0f17] text-zinc-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {/* ================= TOP NAVIGATION BAR ================= */}
      <header className="h-16 border-b border-zinc-800/80 bg-[#121622]/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          {/* Studio Apps Dropdown Switcher */}
          <div ref={projectMenuRef} className="relative">
            <button
              onClick={() => setProjectMenuOpen(!projectMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700/60 text-xs font-semibold tracking-wide transition-all text-zinc-200 cursor-pointer shadow-sm"
              title="Switch Studio Application"
            >
              <Layers size={14} className="text-indigo-400" />
              <span>Studio Apps</span>
              <ChevronDown size={14} className="text-zinc-400" />
            </button>

            {projectMenuOpen && (
              <div className="absolute left-0 mt-2 w-64 rounded-2xl bg-[#181d2c] border border-zinc-700/80 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Switch Active Workspace
                </div>
                <button
                  onClick={() => {
                    setProjectMenuOpen(false);
                    onSwitchProject?.('customize_app');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer text-left"
                >
                  <span className="text-base">🎨</span>
                  <div>
                    <div className="font-semibold">Customize App (M3E Canvas)</div>
                    <div className="text-[10px] text-zinc-400">Universal multi-screen visual editor</div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setProjectMenuOpen(false);
                    onSwitchProject?.('cloth_shop');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer text-left"
                >
                  <span className="text-base">🛍️</span>
                  <div>
                    <div className="font-semibold">Define Atelier (Cloth Shop)</div>
                    <div className="text-[10px] text-zinc-400">27-screen luxury fashion app</div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setProjectMenuOpen(false);
                    onSwitchProject?.('custom_ecommerce');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer text-left"
                >
                  <span className="text-base">🛒</span>
                  <div>
                    <div className="font-semibold">Custom E-Commerce Studio</div>
                    <div className="text-[10px] text-zinc-400">Multi-variant commerce engine</div>
                  </div>
                </button>
                <div className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 text-left">
                  <span className="text-base">✅</span>
                  <div>
                    <div className="font-bold">Todo List with Image (CRUD)</div>
                    <div className="text-[10px] text-indigo-200/70">Current Active Application</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="h-5 w-[1px] bg-zinc-800" />

          {/* App Brand Header */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <CheckCircle2 size={18} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold tracking-tight text-white">
                  TaskFlow Studio
                </h1>
                <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  CRUD & Images
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Write, Read, Edit & Delete Tasks with High-Res Images
              </p>
            </div>
          </div>
        </div>

        {/* Top Right Action Controls */}
        <div className="flex items-center gap-3">
          {/* Quick switch back to M3E Canvas */}
          <button
            onClick={() => onSwitchProject?.('customize_app')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700/50 text-xs font-medium text-zinc-300 transition-all cursor-pointer"
            title="Open M3E Canvas Studio"
          >
            <span>Canvas View</span>
            <ArrowRight size={13} className="text-zinc-400" />
          </button>

          {/* Reset Todos to Defaults */}
          <button
            onClick={() => {
              if (window.confirm('Reset all tasks to original showcase presets?')) {
                resetDefaultTodos();
                showToast('Reset to default tasks');
              }
            }}
            className="p-2 rounded-xl bg-zinc-800/60 hover:bg-zinc-700/60 text-zinc-400 hover:text-zinc-200 border border-zinc-700/40 transition-colors cursor-pointer"
            title="Reset to showcase defaults"
          >
            <RotateCcw size={15} />
          </button>

          {/* Primary Create Button (Write) */}
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold tracking-wide shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Plus size={16} />
            <span>Create Task</span>
          </button>
        </div>
      </header>

      {/* ================= HERO STATS & METRICS ================= */}
      <section className="bg-gradient-to-b from-[#121622] to-[#0c0f17] border-b border-zinc-800/60 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold mb-1">
              <Sparkles size={14} />
              <span>Full CRUD Visual Productivity Suite</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Tasks & Media Workboard
            </h2>
            <p className="text-xs text-zinc-400 mt-1 max-w-xl">
              Organize, write, edit, and track milestones with persistent local storage, subtask checklists, and responsive card flows.
            </p>
          </div>

          {/* Metric Badges */}
          <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-1">
            {/* Total */}
            <div className="bg-[#181d2c]/90 border border-zinc-800 rounded-2xl px-4 py-3 min-w-[110px] flex flex-col items-center justify-center shadow-md">
              <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Total</span>
              <span className="text-2xl font-black text-white">{totalCount}</span>
            </div>

            {/* In Progress */}
            <div className="bg-[#181d2c]/90 border border-zinc-800 rounded-2xl px-4 py-3 min-w-[110px] flex flex-col items-center justify-center shadow-md">
              <span className="text-[10px] uppercase font-bold text-sky-400 tracking-wider">Active</span>
              <span className="text-2xl font-black text-sky-300">{activeCount}</span>
            </div>

            {/* Completed */}
            <div className="bg-[#181d2c]/90 border border-zinc-800 rounded-2xl px-4 py-3 min-w-[110px] flex flex-col items-center justify-center shadow-md">
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Done</span>
              <span className="text-2xl font-black text-emerald-300">{completedCount}</span>
            </div>

            {/* Completion Meter */}
            <div className="bg-[#181d2c]/90 border border-zinc-800 rounded-2xl px-4 py-3 min-w-[130px] flex flex-col items-center justify-center shadow-md">
              <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">Progress</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-indigo-300">{progressPercent}%</span>
              </div>
              <div className="w-16 h-1.5 bg-zinc-800 rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FILTER & SEARCH TOOLBAR ================= */}
      <section className="px-6 py-4 border-b border-zinc-800/60 bg-[#0e121c]/80 sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Search Input & Status Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-72">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks, descriptions..."
                className="w-full bg-[#181d2c] border border-zinc-700/60 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Status Tabs */}
            <div className="flex items-center bg-[#181d2c] p-1 rounded-xl border border-zinc-800">
              <button
                onClick={() => setSelectedStatus('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedStatus === 'all'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                All ({totalCount})
              </button>
              <button
                onClick={() => setSelectedStatus('active')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedStatus === 'active'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Active ({activeCount})
              </button>
              <button
                onClick={() => setSelectedStatus('completed')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedStatus === 'completed'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Completed ({completedCount})
              </button>
            </div>
          </div>

          {/* Categories Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-zinc-100 text-zinc-900 border-zinc-100 font-semibold shadow-sm'
                    : 'bg-[#181d2c] text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}

            {/* Layout View Mode Buttons */}
            <div className="h-5 w-[1px] bg-zinc-800 mx-1 hidden sm:block" />
            <div className="flex items-center bg-[#181d2c] p-1 rounded-xl border border-zinc-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-white'
                }`}
                title="Grid Cards"
              >
                <LayoutGrid size={14} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'list' ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-white'
                }`}
                title="List View"
              >
                <List size={14} />
              </button>
              <button
                onClick={() => setViewMode('split')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'split' ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-white'
                }`}
                title="Cards + Mobile Phone Simulator"
              >
                <Smartphone size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT AREA ================= */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col lg:flex-row gap-6">
        {/* Left Side: Tasks Grid / List */}
        <div className={`flex-1 ${viewMode === 'split' ? 'lg:max-w-[calc(100%-420px)]' : 'w-full'}`}>
          {filteredTodos.length === 0 ? (
            /* Empty State */
            <div className="bg-[#121622]/60 border border-zinc-800 rounded-3xl p-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
                <CheckCircle2 size={32} className="text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold text-white">No tasks match your filters</h3>
              <p className="text-xs text-zinc-400 max-w-sm mt-1">
                Try searching for something else, clearing your category filter, or write a brand new task.
              </p>
              <button
                onClick={handleOpenCreate}
                className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/30 cursor-pointer"
              >
                <Plus size={16} />
                <span>Write New Task</span>
              </button>
            </div>
          ) : viewMode === 'list' ? (
            /* Compact List View */
            <div className="flex flex-col gap-3">
              {filteredTodos.map((item) => {
                const priorityBadge = getPriorityBadge(item.priority);
                const categoryStyle = getCategoryColor(item.category);
                return (
                  <div
                    key={item.id}
                    className={`bg-[#181d2c]/80 hover:bg-[#1a2030] border rounded-2xl p-3.5 flex items-center gap-4 transition-all duration-200 shadow-sm ${
                      item.completed ? 'border-zinc-800/80 opacity-70' : 'border-zinc-700/60'
                    }`}
                  >
                    {/* Toggle Checkbox */}
                    <button
                      onClick={() => handleToggle(item.id)}
                      className="cursor-pointer text-zinc-400 hover:text-indigo-400 transition-colors flex-shrink-0"
                    >
                      {item.completed ? (
                        <CheckCircle2 size={20} className="text-emerald-400" />
                      ) : (
                        <Circle size={20} className="text-zinc-500" />
                      )}
                    </button>

                    {/* Small Image Thumbnail */}
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-12 h-12 rounded-xl object-cover border border-zinc-700/50 flex-shrink-0"
                    />

                    {/* Content Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${categoryStyle}`}
                        >
                          {item.category}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${priorityBadge.bg}`}
                        >
                          {priorityBadge.label}
                        </span>
                        {item.dueDate && (
                          <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                            <Calendar size={11} />
                            {item.dueDate}
                          </span>
                        )}
                      </div>
                      <h4
                        className={`text-xs font-bold truncate cursor-pointer hover:text-indigo-300 ${
                          item.completed ? 'line-through text-zinc-400' : 'text-white'
                        }`}
                        onClick={() => handleOpenDetail(item)}
                      >
                        {item.title}
                      </h4>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => handleOpenDetail(item)}
                        className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                        title="View Read Details"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                        title="Edit Task"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(item.id)}
                        className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
                        title="Delete Task"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Rich Cards Grid View */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {filteredTodos.map((item) => {
                const priorityBadge = getPriorityBadge(item.priority);
                const categoryStyle = getCategoryColor(item.category);
                const subtasksDone = item.subtasks?.filter((s) => s.done).length || 0;
                const totalSubtasks = item.subtasks?.length || 0;

                return (
                  <div
                    key={item.id}
                    className={`group bg-[#161b29] hover:bg-[#1a2133] border rounded-3xl overflow-hidden flex flex-col transition-all duration-300 shadow-lg hover:shadow-2xl hover:border-indigo-500/40 relative ${
                      item.completed
                        ? 'border-zinc-800/80 opacity-75'
                        : 'border-zinc-800'
                    }`}
                  >
                    {/* Card Image Banner */}
                    <div className="relative h-44 w-full overflow-hidden bg-zinc-900 cursor-pointer" onClick={() => handleOpenDetail(item)}>
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#161b29] via-transparent to-black/40" />

                      {/* Top Badges over image */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-lg backdrop-blur-md border ${categoryStyle}`}
                        >
                          {item.category}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-lg backdrop-blur-md border ${priorityBadge.bg}`}
                        >
                          {priorityBadge.label}
                        </span>
                      </div>

                      {/* Completion check overlay */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggle(item.id);
                        }}
                        className={`absolute bottom-3 left-3 p-1.5 rounded-xl backdrop-blur-md border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
                          item.completed
                            ? 'bg-emerald-500/80 text-white border-emerald-400'
                            : 'bg-black/60 text-zinc-300 border-white/20 hover:bg-black/80'
                        }`}
                      >
                        {item.completed ? (
                          <>
                            <CheckCircle2 size={16} className="text-white" />
                            <span>Done</span>
                          </>
                        ) : (
                          <>
                            <Circle size={16} className="text-zinc-400" />
                            <span>Mark Done</span>
                          </>
                        )}
                      </button>

                      {/* Due date pill */}
                      {item.dueDate && (
                        <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-medium text-zinc-300 flex items-center gap-1">
                          <Calendar size={11} />
                          <span>{item.dueDate}</span>
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3
                          onClick={() => handleOpenDetail(item)}
                          className={`text-sm font-bold tracking-tight mb-1.5 cursor-pointer hover:text-indigo-300 transition-colors ${
                            item.completed ? 'line-through text-zinc-400' : 'text-white'
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-3">
                          {item.description || 'No description provided.'}
                        </p>
                      </div>

                      {/* Subtasks Progress */}
                      {totalSubtasks > 0 && (
                        <div className="mb-3.5 bg-zinc-900/60 p-2 rounded-xl border border-zinc-800/80">
                          <div className="flex items-center justify-between text-[10px] text-zinc-400 font-medium mb-1">
                            <span>Checklist Progress</span>
                            <span>
                              {subtasksDone}/{totalSubtasks}
                            </span>
                          </div>
                          <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-indigo-500 rounded-full transition-all"
                              style={{
                                width: `${(subtasksDone / totalSubtasks) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Footer Actions (CRUD Bar) */}
                      <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                        <button
                          onClick={() => handleOpenDetail(item)}
                          className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-indigo-400 transition-colors cursor-pointer"
                        >
                          <Eye size={14} />
                          <span>Inspect</span>
                        </button>

                        <div className="flex items-center gap-1.5">
                          {/* Edit Button */}
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="p-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer shadow-sm"
                            title="Edit task (Update)"
                          >
                            <Edit3 size={14} />
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => setDeleteConfirmId(item.id)}
                            className="p-1.5 rounded-xl bg-zinc-800 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer shadow-sm"
                            title="Delete task (Delete)"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Side: Interactive Mobile Phone Simulator (When in Split Mode) */}
        {viewMode === 'split' && (
          <aside className="w-full lg:w-[390px] flex-shrink-0 flex flex-col items-center">
            <div className="sticky top-36">
              <div className="flex items-center justify-between w-full mb-3 px-2">
                <div className="flex items-center gap-2">
                  <Smartphone size={15} className="text-indigo-400" />
                  <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    Mobile Device Preview
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Live Synced
                </span>
              </div>

              {/* Smartphone Frame Mockup */}
              <div className="w-[360px] h-[720px] rounded-[48px] bg-black border-4 border-zinc-700/80 p-3 shadow-2xl relative flex flex-col overflow-hidden">
                {/* Dynamic Island / Speaker Pill */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-zinc-900 border border-zinc-800 mr-2" />
                  <div className="w-2 h-2 rounded-full bg-zinc-800" />
                </div>

                {/* Simulated Phone Screen Content */}
                <div className="w-full h-full rounded-[38px] bg-[#0c0f17] flex flex-col overflow-hidden relative border border-zinc-800/80">
                  {/* Status Bar */}
                  <div className="h-10 pt-2 px-6 flex items-center justify-between text-[11px] font-semibold text-zinc-400 flex-shrink-0">
                    <span>9:41</span>
                    <div className="flex items-center gap-1.5">
                      <span>5G</span>
                      <div className="w-4 h-2 border border-zinc-400 rounded-sm p-[1px]">
                        <div className="w-2 h-full bg-zinc-400" />
                      </div>
                    </div>
                  </div>

                  {/* Mobile App Header */}
                  <div className="px-5 py-2 flex items-center justify-between border-b border-zinc-800/80 flex-shrink-0">
                    <div>
                      <h4 className="text-sm font-black text-white">TaskFlow Mobile</h4>
                      <p className="text-[10px] text-zinc-400">
                        {activeCount} tasks remaining
                      </p>
                    </div>
                    <button
                      onClick={handleOpenCreate}
                      className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-md cursor-pointer hover:bg-indigo-500"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Scrollable Tasks on Phone */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
                    {todos.map((t) => (
                      <div
                        key={t.id}
                        className={`bg-[#181d2c] rounded-2xl p-3 border transition-all ${
                          t.completed ? 'border-zinc-800 opacity-60' : 'border-zinc-700/60'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <button
                            onClick={() => handleToggle(t.id)}
                            className="mt-0.5 text-zinc-400 hover:text-indigo-400 cursor-pointer flex-shrink-0"
                          >
                            {t.completed ? (
                              <CheckCircle2 size={18} className="text-emerald-400" />
                            ) : (
                              <Circle size={18} />
                            )}
                          </button>
                          <div className="flex-1 min-w-0">
                            <span
                              className={`text-xs font-bold block truncate ${
                                t.completed ? 'line-through text-zinc-500' : 'text-white'
                              }`}
                            >
                              {t.title}
                            </span>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                                {t.category}
                              </span>
                              {t.dueDate && (
                                <span className="text-[9px] text-zinc-500">
                                  {t.dueDate}
                                </span>
                              )}
                            </div>
                          </div>
                          <img
                            src={t.imageUrl}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover border border-zinc-700/60 flex-shrink-0"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Simulated Mobile Bottom Navigation */}
                  <div className="h-14 border-t border-zinc-800/80 bg-[#121622] px-6 flex items-center justify-between text-zinc-400 flex-shrink-0">
                    <div className="flex flex-col items-center text-indigo-400">
                      <CheckCircle2 size={16} />
                      <span className="text-[9px] font-bold mt-0.5">Tasks</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Calendar size={16} />
                      <span className="text-[9px] mt-0.5">Schedule</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <ImageIcon size={16} />
                      <span className="text-[9px] mt-0.5">Media</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        )}
      </main>

      {/* ================= MODAL: CREATE TASK (WRITE) ================= */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#161b29] border border-zinc-700/80 rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                  <Plus size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Create New Task</h3>
                  <p className="text-[11px] text-zinc-400">Write title, attach photo, and set priority</p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
              {/* Image Picker Section */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                  Task Cover Image
                </label>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-zinc-900 border-2 border-zinc-700/60 flex-shrink-0 relative">
                    <img
                      src={formImage || PRESET_IMAGES[0].url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 border border-zinc-700 transition-all cursor-pointer"
                    >
                      <Upload size={14} />
                      <span>Upload from Device</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                    <input
                      type="url"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      placeholder="Or paste image URL..."
                      className="w-full bg-[#1c2233] border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Preset Thumbnails */}
                <div>
                  <span className="text-[10px] text-zinc-400 font-semibold block mb-1.5">
                    Or select from curated photo presets:
                  </span>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {PRESET_IMAGES.map((img) => (
                      <button
                        type="button"
                        key={img.id}
                        onClick={() => setFormImage(img.url)}
                        className={`h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer relative ${
                          formImage === img.url
                            ? 'border-indigo-500 scale-105 shadow-md shadow-indigo-500/30'
                            : 'border-zinc-800 hover:border-zinc-600'
                        }`}
                        title={img.name}
                      >
                        <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                        {formImage === img.url && (
                          <div className="absolute inset-0 bg-indigo-600/30 flex items-center justify-center">
                            <Check size={14} className="text-white font-bold" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Launch Autumn Streetwear Collection UI"
                  className="w-full bg-[#1c2233] border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Description & Notes
                </label>
                <textarea
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Provide context, acceptance criteria, or execution notes..."
                  className="w-full bg-[#1c2233] border border-zinc-700 rounded-xl px-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"
                />
              </div>

              {/* Category & Priority Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full bg-[#1c2233] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Design">Design</option>
                    <option value="Health">Health</option>
                    <option value="Study">Study</option>
                    <option value="Shopping">Shopping</option>
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Priority
                  </label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value as any)}
                    className="w-full bg-[#1c2233] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Due Date
                </label>
                <input
                  type="date"
                  value={formDueDate}
                  onChange={(e) => setFormDueDate(e.target.value)}
                  className="w-full bg-[#1c2233] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Subtasks Builder */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Subtask Checklist
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newSubtaskText}
                    onChange={(e) => setNewSubtaskText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSubtaskToForm();
                      }
                    }}
                    placeholder="Add step or milestone..."
                    className="flex-1 bg-[#1c2233] border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddSubtaskToForm}
                    className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-200 border border-zinc-700"
                  >
                    Add
                  </button>
                </div>

                {formSubtasks.length > 0 && (
                  <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                    {formSubtasks.map((st) => (
                      <div
                        key={st.id}
                        className="flex items-center justify-between bg-[#1c2233] px-3 py-1.5 rounded-lg border border-zinc-800 text-xs text-zinc-300"
                      >
                        <span>{st.text}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSubtaskFromForm(st.id)}
                          className="text-zinc-500 hover:text-rose-400"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 cursor-pointer"
                >
                  Save & Publish Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT TASK (UPDATE) ================= */}
      {isEditOpen && activeItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#161b29] border border-zinc-700/80 rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Edit3 size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Edit & Update Task</h3>
                  <p className="text-[11px] text-zinc-400">Modify title, replace photo, or update progress</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleEditSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
              {/* Image Editor */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                  Update Cover Image
                </label>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-zinc-900 border-2 border-zinc-700/60 flex-shrink-0 relative">
                    <img
                      src={formImage || activeItem.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 border border-zinc-700 transition-all cursor-pointer"
                    >
                      <Upload size={14} />
                      <span>Upload New Image</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                    <input
                      type="url"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      placeholder="Or update image URL..."
                      className="w-full bg-[#1c2233] border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Presets */}
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {PRESET_IMAGES.map((img) => (
                    <button
                      type="button"
                      key={img.id}
                      onClick={() => setFormImage(img.url)}
                      className={`h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer relative ${
                        formImage === img.url
                          ? 'border-indigo-500 scale-105 shadow-md shadow-indigo-500/30'
                          : 'border-zinc-800 hover:border-zinc-600'
                      }`}
                      title={img.name}
                    >
                      <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-[#1c2233] border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Description & Notes
                </label>
                <textarea
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full bg-[#1c2233] border border-zinc-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"
                />
              </div>

              {/* Category & Priority Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full bg-[#1c2233] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Design">Design</option>
                    <option value="Health">Health</option>
                    <option value="Study">Study</option>
                    <option value="Shopping">Shopping</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Priority
                  </label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value as any)}
                    className="w-full bg-[#1c2233] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Due Date
                </label>
                <input
                  type="date"
                  value={formDueDate}
                  onChange={(e) => setFormDueDate(e.target.value)}
                  className="w-full bg-[#1c2233] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Subtasks Builder */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Subtask Checklist
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newSubtaskText}
                    onChange={(e) => setNewSubtaskText(e.target.value)}
                    placeholder="Add step or milestone..."
                    className="flex-1 bg-[#1c2233] border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddSubtaskToForm}
                    className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-200 border border-zinc-700"
                  >
                    Add
                  </button>
                </div>

                {formSubtasks.length > 0 && (
                  <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                    {formSubtasks.map((st) => (
                      <div
                        key={st.id}
                        className="flex items-center justify-between bg-[#1c2233] px-3 py-1.5 rounded-lg border border-zinc-800 text-xs text-zinc-300"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={st.done}
                            onChange={() => {
                              setFormSubtasks((prev) =>
                                prev.map((s) => (s.id === st.id ? { ...s, done: !s.done } : s))
                              );
                            }}
                            className="rounded cursor-pointer"
                          />
                          <span className={st.done ? 'line-through text-zinc-500' : ''}>
                            {st.text}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveSubtaskFromForm(st.id)}
                          className="text-zinc-500 hover:text-rose-400"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditOpen(false);
                    setDeleteConfirmId(activeItem.id);
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-bold border border-rose-500/30 cursor-pointer"
                >
                  Delete Task
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditOpen(false)}
                    className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-lg shadow-amber-600/30 cursor-pointer"
                  >
                    Update & Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: TASK DETAIL (READ) ================= */}
      {isDetailOpen && activeItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#161b29] border border-zinc-700/80 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Hero Image */}
            <div className="relative h-60 w-full overflow-hidden">
              <img
                src={activeItem.imageUrl}
                alt={activeItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161b29] via-transparent to-black/50" />

              <button
                onClick={() => setIsDetailOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 backdrop-blur-md transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-md border ${getCategoryColor(
                      activeItem.category
                    )}`}
                  >
                    {activeItem.category}
                  </span>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-md border ${
                      getPriorityBadge(activeItem.priority).bg
                    }`}
                  >
                    {getPriorityBadge(activeItem.priority).label}
                  </span>
                </div>

                <button
                  onClick={() => handleToggle(activeItem.id)}
                  className={`px-3 py-1.5 rounded-xl backdrop-blur-md border text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                    activeItem.completed
                      ? 'bg-emerald-500 text-white border-emerald-400'
                      : 'bg-black/60 text-white border-white/20 hover:bg-black/80'
                  }`}
                >
                  {activeItem.completed ? <Check size={14} /> : <Circle size={14} />}
                  <span>{activeItem.completed ? 'Completed' : 'Mark Complete'}</span>
                </button>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 space-y-4">
              <div>
                <h2 className="text-xl font-black text-white tracking-tight mb-2">
                  {activeItem.title}
                </h2>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {activeItem.description || 'No detailed description provided.'}
                </p>
              </div>

              {/* Meta Info */}
              <div className="grid grid-cols-2 gap-3 py-3 border-y border-zinc-800 text-xs">
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase font-bold">Due Date</span>
                  <span className="text-zinc-200 font-semibold">{activeItem.dueDate || 'No due date'}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase font-bold">Created At</span>
                  <span className="text-zinc-200 font-semibold">
                    {new Date(activeItem.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Subtasks */}
              {activeItem.subtasks && activeItem.subtasks.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Checklist Milestones
                  </h4>
                  <div className="space-y-2">
                    {activeItem.subtasks.map((st) => (
                      <div
                        key={st.id}
                        onClick={() => toggleSubtask(activeItem.id, st.id)}
                        className="flex items-center gap-3 bg-[#1c2233] p-2.5 rounded-xl border border-zinc-800 text-xs text-zinc-200 cursor-pointer hover:border-zinc-700"
                      >
                        {st.done ? (
                          <CheckCircle2 size={16} className="text-emerald-400" />
                        ) : (
                          <Circle size={16} className="text-zinc-500" />
                        )}
                        <span className={st.done ? 'line-through text-zinc-500' : ''}>
                          {st.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => {
                    setIsDetailOpen(false);
                    setDeleteConfirmId(activeItem.id);
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-bold border border-rose-500/30 cursor-pointer"
                >
                  Delete Task
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsDetailOpen(false);
                      handleOpenEdit(activeItem);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer shadow-lg shadow-indigo-600/30"
                  >
                    <Edit3 size={14} />
                    <span>Edit Task</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= DELETE CONFIRM MODAL ================= */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#181d2c] border border-rose-500/40 rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertCircle size={28} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Delete This Task?</h3>
              <p className="text-xs text-zinc-400 mt-1">
                This action will permanently delete the task and its image from local storage.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteAction(deleteConfirmId)}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer shadow-lg shadow-rose-600/30"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= FLOATING TOAST ================= */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1e2438] border border-indigo-500/40 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-5 duration-200">
          <Sparkles size={16} className="text-indigo-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
