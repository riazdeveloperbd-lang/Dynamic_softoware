export interface Subtask {
  id: string;
  text: string;
  done: boolean;
}

export interface TodoItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: "Work" | "Personal" | "Design" | "Health" | "Study" | "Shopping";
  priority: "low" | "medium" | "high" | "urgent";
  completed: boolean;
  dueDate: string;
  createdAt: string;
  subtasks?: Subtask[];
}

export const PRESET_IMAGES = [
  {
    id: "img_design",
    name: "Design Studio",
    url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    category: "Design",
  },
  {
    id: "img_workspace",
    name: "Minimalist Desk",
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80",
    category: "Work",
  },
  {
    id: "img_coding",
    name: "Dev Coding Setup",
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    category: "Study",
  },
  {
    id: "img_fitness",
    name: "Trail Run & Workout",
    url: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&auto=format&fit=crop&q=80",
    category: "Health",
  },
  {
    id: "img_coffee",
    name: "Artisan Coffee Focus",
    url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80",
    category: "Personal",
  },
  {
    id: "img_fashion",
    name: "Atelier Streetwear",
    url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80",
    category: "Shopping",
  },
  {
    id: "img_architecture",
    name: "Modern Architecture",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
    category: "Work",
  },
  {
    id: "img_nature",
    name: "Sunrise Mountain Mindset",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80",
    category: "Health",
  },
];

export const INITIAL_TODOS: TodoItem[] = [
  {
    id: "todo_1",
    title: "Design Atelier Spring Lookbook & UI System",
    description: "Finalize mobile typography scales, dark mode tokens, and 2-column editorial card grids for the new seasonal apparel launch.",
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    category: "Design",
    priority: "urgent",
    completed: false,
    dueDate: "2026-10-15",
    createdAt: "2026-10-13T10:00:00.000Z",
    subtasks: [
      { id: "st_1", text: "Export SVG icons and vector badge components", done: true },
      { id: "st_2", text: "Create high-contrast pill filter buttons", done: true },
      { id: "st_3", text: "Sync design tokens with Expo Mobile APK build", done: false },
    ],
  },
  {
    id: "todo_2",
    title: "Morning 5K Trail Run & Hydration Metric",
    description: "Complete sunrise zone-2 cardio workout and synchronize biometric recovery metrics with health vault.",
    imageUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&auto=format&fit=crop&q=80",
    category: "Health",
    priority: "medium",
    completed: true,
    dueDate: "2026-10-13",
    createdAt: "2026-10-13T06:30:00.000Z",
    subtasks: [
      { id: "st_4", text: "Warm up dynamic stretches", done: true },
      { id: "st_5", text: "5.2 km cadence pace log", done: true },
      { id: "st_6", text: "Post-workout electrolyte recovery", done: true },
    ],
  },
  {
    id: "todo_3",
    title: "Architect Serverless CRUD Engine & API Endpoints",
    description: "Implement zero-latency read, write, edit, and soft-delete endpoints with local storage fallback and real-time syncing.",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    category: "Study",
    priority: "high",
    completed: false,
    dueDate: "2026-10-16",
    createdAt: "2026-10-13T14:15:00.000Z",
    subtasks: [
      { id: "st_7", text: "Setup optimistic UI mutation rollbacks", done: true },
      { id: "st_8", text: "Add base64 image compression handler", done: false },
      { id: "st_9", text: "Write end-to-end integration tests", done: false },
    ],
  },
  {
    id: "todo_4",
    title: "Urban Minimalist Living Space Restyle",
    description: "Select warm natural timber textures and ambient 2700K lighting for the creative home workspace remodel.",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80",
    category: "Personal",
    priority: "low",
    completed: false,
    dueDate: "2026-10-20",
    createdAt: "2026-10-12T16:00:00.000Z",
    subtasks: [
      { id: "st_10", text: "Measure ergonomic height-adjustable desk clearance", done: true },
      { id: "st_11", text: "Order matte black monitor arm mount", done: false },
    ],
  },
  {
    id: "todo_5",
    title: "Organic Superfood & Espresso Restock",
    description: "Pick up single-origin Ethiopian beans, matcha ceremonial grade powder, and farm-fresh organic produce.",
    imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80",
    category: "Shopping",
    priority: "medium",
    completed: true,
    dueDate: "2026-10-12",
    createdAt: "2026-10-12T09:40:00.000Z",
    subtasks: [
      { id: "st_12", text: "Check roasted bean date stamps", done: true },
      { id: "st_13", text: "Collect reusable canvas tote bags", done: true },
    ],
  },
];

const STORAGE_KEY = "studio_todo_list_items_v1";

function dispatchUpdateEvent(todos: TodoItem[]) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("todos-updated", { detail: { todos } })
    );
  }
}

export function getTodos(): TodoItem[] {
  if (typeof window === "undefined") return INITIAL_TODOS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveTodos(INITIAL_TODOS);
      return INITIAL_TODOS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    saveTodos(INITIAL_TODOS);
    return INITIAL_TODOS;
  } catch (err) {
    console.error("Failed to read todos from localStorage", err);
    return INITIAL_TODOS;
  }
}

export function saveTodos(todos: TodoItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    dispatchUpdateEvent(todos);
  } catch (err) {
    console.error("Failed to save todos", err);
  }
}

// Async sync with backend REST API
export async function syncTodosWithServer(): Promise<TodoItem[]> {
  try {
    const res = await fetch("/api/todos");
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.todos) && data.todos.length > 0) {
        saveTodos(data.todos);
        return data.todos;
      }
    }
  } catch {
    // Silently fall back to local store
  }
  return getTodos();
}

// ================= CRUD: WRITE (CREATE) =================
export function addTodo(item: Omit<TodoItem, "id" | "createdAt">): TodoItem {
  const current = getTodos();
  const newTodo: TodoItem = {
    ...item,
    id: `todo_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    subtasks: item.subtasks || [],
  };
  const updated = [newTodo, ...current];
  saveTodos(updated);

  // Real HTTP POST request visible in DevTools Network tab
  fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  }).catch((err) => console.warn("[API Sync] POST /api/todos failed:", err));

  return newTodo;
}

// ================= CRUD: READ (QUERY / FIND) =================
export function getTodoById(id: string): TodoItem | undefined {
  return getTodos().find((t) => t.id === id);
}

// ================= CRUD: EDIT (UPDATE) =================
export function updateTodo(id: string, updates: Partial<TodoItem>): TodoItem | null {
  const current = getTodos();
  const idx = current.findIndex((t) => t.id === id);
  if (idx === -1) return null;

  const updatedItem: TodoItem = {
    ...current[idx],
    ...updates,
  };
  current[idx] = updatedItem;
  saveTodos([...current]);

  // Real HTTP PUT request visible in DevTools Network tab
  fetch(`/api/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  }).catch((err) => console.warn("[API Sync] PUT /api/todos failed:", err));

  return updatedItem;
}

// ================= CRUD: DELETE =================
export function deleteTodo(id: string): boolean {
  const current = getTodos();
  const next = current.filter((t) => t.id !== id);
  if (next.length === current.length) return false;
  saveTodos(next);

  // Real HTTP DELETE request visible in DevTools Network tab
  fetch(`/api/todos/${id}`, {
    method: "DELETE",
  }).catch((err) => console.warn("[API Sync] DELETE /api/todos failed:", err));

  return true;
}

export function toggleTodoComplete(id: string): boolean {
  const current = getTodos();
  const item = current.find((t) => t.id === id);
  if (!item) return false;
  item.completed = !item.completed;
  saveTodos([...current]);

  // Real HTTP PATCH request visible in DevTools Network tab
  fetch(`/api/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: item.completed }),
  }).catch((err) => console.warn("[API Sync] PATCH /api/todos failed:", err));

  return true;
}

export function toggleSubtask(todoId: string, subtaskId: string): boolean {
  const current = getTodos();
  const item = current.find((t) => t.id === todoId);
  if (!item || !item.subtasks) return false;
  const st = item.subtasks.find((s) => s.id === subtaskId);
  if (!st) return false;
  st.done = !st.done;
  saveTodos([...current]);
  return true;
}

export function resetDefaultTodos(): TodoItem[] {
  saveTodos(INITIAL_TODOS);
  return INITIAL_TODOS;
}
