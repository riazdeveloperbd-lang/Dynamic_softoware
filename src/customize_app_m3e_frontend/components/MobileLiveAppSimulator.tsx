import React, { useState, useEffect, useMemo } from 'react';
import {
  CheckCircle2,
  Circle,
  Plus,
  Search,
  Trash2,
  Edit3,
  Calendar,
  AlertCircle,
  ArrowLeft,
  Check,
  Flame,
  Clock,
  Sparkles,
  Share2,
  Wifi,
  ChevronRight,
} from 'lucide-react';
import {
  TodoItem,
  Subtask,
  PRESET_IMAGES,
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodoComplete,
  toggleSubtask,
  syncTodosWithServer,
} from '../../todo_list_frontend/todoStore';
import { Palette } from '../lib/tokens';

interface MobileLiveAppSimulatorProps {
  palette: Palette;
  onClose?: () => void;
}

type ScreenName = 'dashboard' | 'create' | 'detail' | 'edit';

export const MobileLiveAppSimulator: React.FC<MobileLiveAppSimulatorProps> = ({
  palette: p,
  onClose,
}) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('dashboard');
  const [todos, setTodos] = useState<TodoItem[]>(() => getTodos());
  const [activeTodo, setActiveTodo] = useState<TodoItem | null>(null);
  const [networkLog, setNetworkLog] = useState<{
    method: string;
    url: string;
    status: number;
    time: string;
  } | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', 'Work', 'Personal', 'Design', 'Health', 'Study', 'Shopping'];

  // Form states (Create / Edit)
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formImage, setFormImage] = useState(PRESET_IMAGES[0].url);
  const [formCategory, setFormCategory] = useState<TodoItem['category']>('Design');
  const [formPriority, setFormPriority] = useState<TodoItem['priority']>('urgent');
  const [formDueDate, setFormDueDate] = useState('');
  const [formSubtasks, setFormSubtasks] = useState<Subtask[]>([]);
  const [newSubtaskInput, setNewSubtaskInput] = useState('');

  // Initial server sync
  useEffect(() => {
    syncTodosWithServer().then((serverData) => {
      if (Array.isArray(serverData)) {
        setTodos(serverData);
      }
    });

    const handleUpdate = () => setTodos(getTodos());
    window.addEventListener('todos-updated', handleUpdate);
    return () => window.removeEventListener('todos-updated', handleUpdate);
  }, []);

  const triggerNetworkLog = (method: string, url: string, status: number) => {
    setNetworkLog({
      method,
      url,
      status,
      time: new Date().toLocaleTimeString(),
    });
    setTimeout(() => setNetworkLog(null), 3800);
  };

  // Filtered todos
  const filteredTodos = useMemo(() => {
    return todos.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [todos, searchQuery, selectedCategory]);

  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Open Create Screen
  const handleGoCreate = () => {
    setFormTitle('');
    setFormDesc('');
    setFormImage(PRESET_IMAGES[0].url);
    setFormCategory('Design');
    setFormPriority('urgent');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setFormDueDate(tomorrow.toISOString().split('T')[0]);
    setFormSubtasks([
      { id: 'st_1', text: 'Create high-contrast layout card', done: true },
      { id: 'st_2', text: 'Verify live Expo simulator sync', done: false },
    ]);
    setNewSubtaskInput('');
    setCurrentScreen('create');
  };

  // Open Detail Screen
  const handleGoDetail = (item: TodoItem) => {
    setActiveTodo(item);
    setCurrentScreen('detail');
  };

  // Open Edit Screen
  const handleGoEdit = (item: TodoItem) => {
    setActiveTodo(item);
    setFormTitle(item.title);
    setFormDesc(item.description);
    setFormImage(item.imageUrl);
    setFormCategory(item.category);
    setFormPriority(item.priority);
    setFormDueDate(item.dueDate || '');
    setFormSubtasks(item.subtasks ? [...item.subtasks] : []);
    setCurrentScreen('edit');
  };

  // Handle Create Submit
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const newTodo = addTodo({
      title: formTitle.trim(),
      description: formDesc.trim(),
      imageUrl: formImage,
      category: formCategory,
      priority: formPriority,
      completed: false,
      dueDate: formDueDate,
      subtasks: formSubtasks,
    });

    triggerNetworkLog('POST', '/api/todos', 201);
    setTodos(getTodos());
    setCurrentScreen('dashboard');
  };

  // Handle Edit Submit
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTodo || !formTitle.trim()) return;

    updateTodo(activeTodo.id, {
      title: formTitle.trim(),
      description: formDesc.trim(),
      imageUrl: formImage,
      category: formCategory,
      priority: formPriority,
      dueDate: formDueDate,
      subtasks: formSubtasks,
    });

    triggerNetworkLog('PUT', `/api/todos/${activeTodo.id}`, 200);
    setTodos(getTodos());
    setCurrentScreen('dashboard');
  };

  // Handle Delete
  const handleDelete = (id: string) => {
    deleteTodo(id);
    triggerNetworkLog('DELETE', `/api/todos/${id}`, 200);
    setTodos(getTodos());
    setCurrentScreen('dashboard');
  };

  // Handle Toggle Checkbox
  const handleToggle = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    toggleTodoComplete(id);
    triggerNetworkLog('PATCH', `/api/todos/${id}`, 200);
    setTodos(getTodos());
    if (activeTodo && activeTodo.id === id) {
      setActiveTodo((prev) => (prev ? { ...prev, completed: !prev.completed } : null));
    }
  };

  // Subtask toggle
  const handleToggleSubtask = (todoId: string, subtaskId: string) => {
    toggleSubtask(todoId, subtaskId);
    setTodos(getTodos());
    if (activeTodo && activeTodo.id === todoId) {
      setActiveTodo((prev) => {
        if (!prev || !prev.subtasks) return prev;
        return {
          ...prev,
          subtasks: prev.subtasks.map((s) =>
            s.id === subtaskId ? { ...s, done: !s.done } : s
          ),
        };
      });
    }
  };

  const getPriorityBadge = (priority: TodoItem['priority']) => {
    switch (priority) {
      case 'urgent':
        return { bg: 'rgba(239, 68, 68, 0.18)', color: '#F87171', border: '#EF444450', text: 'Urgent' };
      case 'high':
        return { bg: 'rgba(245, 158, 11, 0.18)', color: '#FBBF24', border: '#F59E0B50', text: 'High' };
      case 'medium':
        return { bg: 'rgba(56, 189, 248, 0.18)', color: '#38BDF8', border: '#0284C750', text: 'Medium' };
      default:
        return { bg: 'rgba(52, 211, 153, 0.18)', color: '#34D399', border: '#10B98150', text: 'Low' };
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#0A0D14',
        color: '#F3F4F6',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Live HTTP Network Activity Pill */}
      {networkLog && (
        <div
          style={{
            position: 'absolute',
            top: 48,
            left: 16,
            right: 16,
            zIndex: 60,
            padding: '8px 12px',
            borderRadius: 14,
            background: 'rgba(16, 185, 129, 0.95)',
            color: '#FFFFFF',
            fontSize: 11,
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)',
            backdropFilter: 'blur(8px)',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Wifi size={14} />
            <span>
              HTTP {networkLog.method} {networkLog.url} ({networkLog.status})
            </span>
          </div>
          <span style={{ fontSize: 10, opacity: 0.85 }}>{networkLog.time}</span>
        </div>
      )}

      {/* ================= SCREEN 1: DASHBOARD (HOME PAGE) ================= */}
      {currentScreen === 'dashboard' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          {/* Top Bar */}
          <div
            style={{
              padding: '16px 18px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)',
                  display: 'grid',
                  placeItems: 'center',
                  fontWeight: 900,
                  fontSize: 14,
                }}
              >
                ✨
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800 }}>TaskFlow Studio</div>
                <div style={{ fontSize: 11, color: '#9CA3AF' }}>Live CRUD & State Engine</div>
              </div>
            </div>
            <button
              onClick={handleGoCreate}
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                border: 'none',
                background: '#4F46E5',
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'grid',
                placeItems: 'center',
              }}
              title="Add New Task"
            >
              <Plus size={18} />
            </button>
          </div>

          <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Progress Metrics Banner */}
            <div
              style={{
                padding: '14px 16px',
                borderRadius: 18,
                background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.16) 0%, rgba(147, 51, 234, 0.12) 100%)',
                border: '1px solid rgba(99, 102, 241, 0.25)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#C7D2FE' }}>Sprint Velocity</span>
                <span style={{ fontSize: 13, fontWeight: 900, color: '#FFFFFF' }}>{progressPercent}% Done</span>
              </div>
              {/* Progress Bar */}
              <div style={{ width: '100%', height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${progressPercent}%`,
                    height: '100%',
                    borderRadius: 3,
                    background: 'linear-gradient(90deg, #6366F1, #A855F7)',
                    transition: 'width 300ms ease',
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 11, color: '#9CA3AF' }}>
                <span>{completedCount} Completed</span>
                <span>{totalCount - completedCount} In Progress</span>
                <span>{totalCount} Total Tasks</span>
              </div>
            </div>

            {/* Category Pills */}
            <div
              style={{
                display: 'flex',
                gap: 6,
                overflowX: 'auto',
                paddingBottom: 2,
              }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: 16,
                    border: 'none',
                    fontSize: 11.5,
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    background: selectedCategory === cat ? '#4F46E5' : 'rgba(255,255,255,0.06)',
                    color: selectedCategory === cat ? '#FFFFFF' : '#9CA3AF',
                    transition: 'all 140ms ease',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Task Cards List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Tasks on Home Page ({filteredTodos.length})
              </div>

              {filteredTodos.length === 0 ? (
                <div
                  style={{
                    padding: '36px 16px',
                    textAlign: 'center',
                    borderRadius: 18,
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px dashed rgba(255,255,255,0.1)',
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 8 }}>📋</div>
                  <div style={{ fontSize: 13, fontWeight: 800 }}>No tasks found in this view</div>
                  <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>
                    Click the + button below to add your first task
                  </div>
                </div>
              ) : (
                filteredTodos.map((task) => {
                  const badge = getPriorityBadge(task.priority);
                  return (
                    <div
                      key={task.id}
                      onClick={() => handleGoDetail(task)}
                      style={{
                        padding: 12,
                        borderRadius: 16,
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        display: 'flex',
                        gap: 12,
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'all 160ms ease',
                      }}
                    >
                      {/* Thumbnail Image */}
                      <img
                        src={task.imageUrl}
                        alt=""
                        style={{
                          width: 54,
                          height: 54,
                          borderRadius: 12,
                          objectFit: 'cover',
                          flexShrink: 0,
                          opacity: task.completed ? 0.6 : 1,
                        }}
                      />

                      {/* Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                          <span
                            style={{
                              fontSize: 9.5,
                              fontWeight: 800,
                              padding: '2px 6px',
                              borderRadius: 6,
                              background: badge.bg,
                              color: badge.color,
                              border: `1px solid ${badge.border}`,
                            }}
                          >
                            {badge.text}
                          </span>
                          <span style={{ fontSize: 10, color: '#9CA3AF' }}>{task.category}</span>
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: task.completed ? '#9CA3AF' : '#FFFFFF',
                            textDecoration: task.completed ? 'line-through' : 'none',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {task.title}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: '#6B7280',
                            marginTop: 2,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {task.description || 'No extra notes'}
                        </div>
                      </div>

                      {/* Interactive Checkbox */}
                      <button
                        onClick={(e) => handleToggle(task.id, e)}
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 10,
                          border: task.completed ? 'none' : '2px solid rgba(255,255,255,0.2)',
                          background: task.completed ? '#10B981' : 'transparent',
                          color: '#FFFFFF',
                          cursor: 'pointer',
                          display: 'grid',
                          placeItems: 'center',
                          flexShrink: 0,
                        }}
                        title={task.completed ? 'Mark Active' : 'Mark Complete'}
                      >
                        {task.completed && <Check size={16} />}
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Floating Action Button (FAB) */}
          <div
            style={{
              position: 'sticky',
              bottom: 16,
              display: 'flex',
              justifyContent: 'flex-end',
              paddingRight: 16,
              pointerEvents: 'none',
            }}
          >
            <button
              onClick={handleGoCreate}
              style={{
                pointerEvents: 'auto',
                width: 52,
                height: 52,
                borderRadius: 26,
                border: 'none',
                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                color: '#FFFFFF',
                boxShadow: '0 8px 24px rgba(99, 102, 241, 0.45)',
                cursor: 'pointer',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <Plus size={24} />
            </button>
          </div>
        </div>
      )}

      {/* ================= SCREEN 2: CREATE TASK (WRITE) ================= */}
      {currentScreen === 'create' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          {/* Header */}
          <div
            style={{
              padding: '16px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <button
              onClick={() => setCurrentScreen('dashboard')}
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                border: 'none',
                background: 'rgba(255,255,255,0.08)',
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <ArrowLeft size={16} />
            </button>
            <div style={{ fontSize: 15, fontWeight: 800 }}>Create Task (Write)</div>
            <div style={{ width: 32 }} />
          </div>

          <form onSubmit={handleCreateSubmit} style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Title */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase' }}>
                Task Title *
              </label>
              <input
                type="text"
                required
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="e.g. Design Atelier Spring Lookbook"
                style={{
                  width: '100%',
                  marginTop: 6,
                  padding: '10px 14px',
                  borderRadius: 12,
                  border: '1.5px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.04)',
                  color: '#FFFFFF',
                  fontSize: 13,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Description */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase' }}>
                Description Notes
              </label>
              <textarea
                rows={2}
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                placeholder="Add task specifications and checklist items..."
                style={{
                  width: '100%',
                  marginTop: 6,
                  padding: '10px 14px',
                  borderRadius: 12,
                  border: '1.5px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.04)',
                  color: '#FFFFFF',
                  fontSize: 13,
                  outline: 'none',
                  resize: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Cover Image Presets */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase' }}>
                Cover Image Presets (Select one)
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 6 }}>
                {PRESET_IMAGES.slice(0, 4).map((img) => (
                  <div
                    key={img.id}
                    onClick={() => setFormImage(img.url)}
                    style={{
                      height: 54,
                      borderRadius: 10,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: formImage === img.url ? '2px solid #6366F1' : '1px solid rgba(255,255,255,0.1)',
                      position: 'relative',
                    }}
                  >
                    <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {formImage === img.url && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'rgba(99, 102, 241, 0.45)',
                          display: 'grid',
                          placeItems: 'center',
                        }}
                      >
                        <Check size={16} color="#FFFFFF" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Priority Selector */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase' }}>
                Priority Level
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginTop: 6 }}>
                {(['low', 'medium', 'high', 'urgent'] as TodoItem['priority'][]).map((pri) => (
                  <button
                    key={pri}
                    type="button"
                    onClick={() => setFormPriority(pri)}
                    style={{
                      padding: '8px 4px',
                      borderRadius: 10,
                      border: formPriority === pri ? '1.5px solid #6366F1' : '1px solid rgba(255,255,255,0.08)',
                      background: formPriority === pri ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.03)',
                      color: formPriority === pri ? '#A5B4FC' : '#9CA3AF',
                      fontSize: 11,
                      fontWeight: 800,
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                    }}
                  >
                    {pri}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                marginTop: 10,
                height: 44,
                borderRadius: 14,
                border: 'none',
                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                color: '#FFFFFF',
                fontSize: 13.5,
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                boxShadow: '0 6px 18px rgba(99, 102, 241, 0.35)',
              }}
            >
              <Plus size={16} />
              <span>Save & Add to Home Page List</span>
            </button>
          </form>
        </div>
      )}

      {/* ================= SCREEN 3: DETAILS (READ) ================= */}
      {currentScreen === 'detail' && activeTodo && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          {/* Hero Banner */}
          <div style={{ position: 'relative', width: '100%', height: 180 }}>
            <img src={activeTodo.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <button
              onClick={() => setCurrentScreen('dashboard')}
              style={{
                position: 'absolute',
                top: 14,
                left: 14,
                width: 32,
                height: 32,
                borderRadius: 10,
                border: 'none',
                background: 'rgba(0,0,0,0.6)',
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => handleGoEdit(activeTodo)}
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                padding: '6px 12px',
                borderRadius: 10,
                border: 'none',
                background: '#4F46E5',
                color: '#FFFFFF',
                cursor: 'pointer',
                fontSize: 11,
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Edit3 size={13} />
              <span>Edit</span>
            </button>
          </div>

          <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Status & Priority */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  padding: '3px 8px',
                  borderRadius: 8,
                  ...getPriorityBadge(activeTodo.priority),
                }}
              >
                {activeTodo.priority.toUpperCase()} PRIORITY
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: 8,
                  background: activeTodo.completed ? '#10B98125' : '#6366F125',
                  color: activeTodo.completed ? '#34D399' : '#A5B4FC',
                }}
              >
                {activeTodo.completed ? 'COMPLETED' : 'IN PROGRESS'}
              </span>
            </div>

            <div style={{ fontSize: 18, fontWeight: 900, lineHeight: 1.3 }}>{activeTodo.title}</div>
            <div style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.5 }}>
              {activeTodo.description || 'No detailed specifications added.'}
            </div>

            {/* Subtask checklist */}
            {activeTodo.subtasks && activeTodo.subtasks.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', marginBottom: 8 }}>
                  Milestone Subtasks
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {activeTodo.subtasks.map((st) => (
                    <div
                      key={st.id}
                      onClick={() => handleToggleSubtask(activeTodo.id, st.id)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: 12,
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        cursor: 'pointer',
                      }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 6,
                          border: st.done ? 'none' : '1.5px solid rgba(255,255,255,0.25)',
                          background: st.done ? '#10B981' : 'transparent',
                          display: 'grid',
                          placeItems: 'center',
                        }}
                      >
                        {st.done && <Check size={12} color="#FFFFFF" />}
                      </div>
                      <span
                        style={{
                          fontSize: 12,
                          color: st.done ? '#6B7280' : '#FFFFFF',
                          textDecoration: st.done ? 'line-through' : 'none',
                        }}
                      >
                        {st.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Toggle Status Button */}
            <button
              onClick={() => handleToggle(activeTodo.id)}
              style={{
                marginTop: 10,
                height: 42,
                borderRadius: 12,
                border: 'none',
                background: activeTodo.completed ? 'rgba(255,255,255,0.08)' : '#10B981',
                color: '#FFFFFF',
                fontSize: 13,
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <Check size={16} />
              <span>{activeTodo.completed ? 'Mark as In Progress' : 'Mark as Complete'}</span>
            </button>
          </div>
        </div>
      )}

      {/* ================= SCREEN 4: EDIT TASK (UPDATE / DELETE) ================= */}
      {currentScreen === 'edit' && activeTodo && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          {/* Header */}
          <div
            style={{
              padding: '16px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <button
              onClick={() => setCurrentScreen('dashboard')}
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                border: 'none',
                background: 'rgba(255,255,255,0.08)',
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <ArrowLeft size={16} />
            </button>
            <div style={{ fontSize: 15, fontWeight: 800 }}>Edit & Update Task (CRUD)</div>
            <button
              onClick={() => handleDelete(activeTodo.id)}
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                border: 'none',
                background: 'rgba(239, 68, 68, 0.2)',
                color: '#EF4444',
                cursor: 'pointer',
                display: 'grid',
                placeItems: 'center',
              }}
              title="Delete Task"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <form onSubmit={handleEditSubmit} style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase' }}>
                Update Title
              </label>
              <input
                type="text"
                required
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                style={{
                  width: '100%',
                  marginTop: 6,
                  padding: '10px 14px',
                  borderRadius: 12,
                  border: '1.5px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.04)',
                  color: '#FFFFFF',
                  fontSize: 13,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase' }}>
                Update Notes
              </label>
              <textarea
                rows={2}
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                style={{
                  width: '100%',
                  marginTop: 6,
                  padding: '10px 14px',
                  borderRadius: 12,
                  border: '1.5px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.04)',
                  color: '#FFFFFF',
                  fontSize: 13,
                  outline: 'none',
                  resize: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: 10,
                height: 44,
                borderRadius: 14,
                border: 'none',
                background: '#4F46E5',
                color: '#FFFFFF',
                fontSize: 13.5,
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <Check size={16} />
              <span>Save Changes & Sync Home List</span>
            </button>

            <button
              type="button"
              onClick={() => handleDelete(activeTodo.id)}
              style={{
                height: 40,
                borderRadius: 14,
                border: '1px solid rgba(239, 68, 68, 0.4)',
                background: 'rgba(239, 68, 68, 0.12)',
                color: '#EF4444',
                fontSize: 13,
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <Trash2 size={16} />
              <span>Delete This Task</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
