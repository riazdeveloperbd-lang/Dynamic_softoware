import {
  Doc,
  Frame,
  Group,
  PHONE_H,
  PHONE_MARGIN,
  PHONE_W,
  uid,
} from "./tokens";
import { INITIAL_TODOS } from "../../todo_list_frontend/todoStore";

/**
 * Builds the complete 4-screen Todo List with Image Application (CRUD)
 * for the M3E Canvas Studio.
 *
 * Screen 1: Tasks Dashboard & Feed (Read list, stats, filter chips, interactive cards)
 * Screen 2: Create New Task (Write / Add with photo picker presets & form inputs)
 * Screen 3: Task Details & Read (Hero banner view, subtask checklist, inspection)
 * Screen 4: Edit & Update Task (Full CRUD update form, cover switcher, delete action)
 */
export function buildTodoListAppDoc(): Doc {
  const FRAME_W = PHONE_W; // 412
  const FRAME_H = PHONE_H; // 892
  const GAP_X = 80;

  // Screen 1: Tasks Dashboard (Read list, filter, stats)
  const f1: Frame = {
    id: "todo_board",
    name: "Tasks Dashboard & Feed",
    x: 0,
    y: 0,
    w: FRAME_W,
    h: FRAME_H,
    note: "All tasks feed with thumbnail images, category filter pills, real-time checkboxes, and sprint progress summary",
  };

  // Screen 2: Create Task (Write)
  const f2: Frame = {
    id: "todo_create",
    name: "Create Task (Write / Add)",
    x: FRAME_W + GAP_X,
    y: 0,
    w: FRAME_W,
    h: FRAME_H,
    note: "Task creator form with cover photo selector, title, notes, priority pills, and due date scheduler",
  };

  // Screen 3: Task Details (Read)
  const f3: Frame = {
    id: "todo_detail",
    name: "Task Details & Read",
    x: (FRAME_W + GAP_X) * 2,
    y: 0,
    w: FRAME_W,
    h: FRAME_H,
    note: "Deep inspection read view with full-bleed hero image, milestone checklist, priority, and edit action",
  };

  // Screen 4: Edit Task (Update / Delete)
  const f4: Frame = {
    id: "todo_edit",
    name: "Edit & Update Task (CRUD)",
    x: (FRAME_W + GAP_X) * 3,
    y: 0,
    w: FRAME_W,
    h: FRAME_H,
    note: "Full CRUD update and delete view with image replacement, status modification, and streak card",
  };

  const frames = [f1, f2, f3, f4];
  const groups: Group[] = [];

  // ==================== SCREEN 1: TASKS DASHBOARD ====================
  // Top App Bar
  groups.push({
    id: uid(),
    x: f1.x,
    y: f1.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "TaskFlow Studio",
        icon: "checklist",
        icon2: "search",
        icon3: "add",
        variant: "filled",
        size: FRAME_W,
        actions: {
          icon3: { to: "todo_create", transition: "slide" },
        },
      },
    ],
  });

  // User Profile Header Welcome
  groups.push({
    id: uid(),
    x: f1.x + PHONE_MARGIN,
    y: f1.y + 68,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "userProfileHeader",
        label: "Alex Morgan",
        supporting: "Productivity Lead · 5 Active Goals · 1 Urgent Priority",
        size: 380,
      },
    ],
  });

  // Live Stats Overview Card
  groups.push({
    id: uid(),
    x: f1.x + PHONE_MARGIN,
    y: f1.y + 148,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "todoStatsCard",
        label: "Daily Sprint Progress",
        supporting: "60% Completed • 3 Active Milestones",
        variant: "filled",
        size: 380,
      },
    ],
  });

  // Category Filter Chips (Single horizontal row)
  groups.push({
    id: uid(),
    x: f1.x + PHONE_MARGIN,
    y: f1.y + 244,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "chip",
        label: "All Tasks (5)",
        icon: "filter_list",
        variant: "filled",
      },
      {
        id: uid(),
        kind: "chip",
        label: "Design",
        icon: "palette",
        variant: "tonal",
      },
      {
        id: uid(),
        kind: "chip",
        label: "Health",
        icon: "fitness_center",
        variant: "tonal",
      },
      {
        id: uid(),
        kind: "chip",
        label: "Dev",
        icon: "code",
        variant: "tonal",
      },
    ],
  });

  // Section Header Chip
  groups.push({
    id: uid(),
    x: f1.x + PHONE_MARGIN,
    y: f1.y + 288,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "chip",
        label: "Active Sprint Tasks • 3 Pending Milestones",
        icon: "format_list_bulleted",
        variant: "tonal",
      },
    ],
  });

  // Tasks List (Single vertical group: elements automatically stack without overlapping)
  groups.push({
    id: uid(),
    x: f1.x + PHONE_MARGIN,
    y: f1.y + 332,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "todoCard",
        label: INITIAL_TODOS[0].title,
        supporting: INITIAL_TODOS[0].description,
        icon: "palette",
        icon2: INITIAL_TODOS[0].imageUrl,
        badge: "Urgent",
        variant: "filled",
        size: 380,
        action: { to: "todo_detail", transition: "slide" },
      },
      {
        id: uid(),
        kind: "todoCard",
        label: INITIAL_TODOS[1].title,
        supporting: INITIAL_TODOS[1].description,
        icon: "directions_run",
        icon2: INITIAL_TODOS[1].imageUrl,
        badge: "Completed",
        variant: "tonal",
        size: 380,
        action: { to: "todo_detail", transition: "slide" },
      },
      {
        id: uid(),
        kind: "todoCard",
        label: INITIAL_TODOS[2].title,
        supporting: INITIAL_TODOS[2].description,
        icon: "terminal",
        icon2: INITIAL_TODOS[2].imageUrl,
        badge: "High",
        variant: "outlined",
        size: 380,
        action: { to: "todo_detail", transition: "slide" },
      },
    ],
  });

  // Floating Action Button (+ Create Task)
  groups.push({
    id: uid(),
    x: f1.x + FRAME_W - 76,
    y: f1.y + FRAME_H - 146,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "fab",
        icon: "add",
        variant: "filled",
        size: 56,
        action: { to: "todo_create", transition: "slide" },
      },
    ],
  });

  // Screen 1 Bottom Navigation Bar
  groups.push({
    id: uid(),
    x: f1.x,
    y: f1.y + FRAME_H - 80,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "bottomNav",
        label: "",
        icon: null,
        variant: "filled",
        size: FRAME_W,
        tabs: [
          { icon: "checklist", label: "Tasks" },
          { icon: "add_circle", label: "Create" },
          { icon: "visibility", label: "Inspect" },
          { icon: "edit_note", label: "Manage" },
          { icon: "person", label: "Profile" },
        ],
        selected: 0,
        actions: {
          "tab:1": { to: "todo_create", transition: "fade" },
          "tab:2": { to: "todo_detail", transition: "fade" },
          "tab:3": { to: "todo_edit", transition: "fade" },
        },
      },
    ],
  });

  // ==================== SCREEN 2: CREATE TASK (WRITE) ====================
  // Top App Bar
  groups.push({
    id: uid(),
    x: f2.x,
    y: f2.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Create New Task",
        icon: "arrow_back",
        icon2: "check",
        variant: "filled",
        size: FRAME_W,
        actions: {
          icon: { to: "todo_board", transition: "slideLeft", command: "cancel_task" },
          icon2: { to: "todo_board", transition: "slideLeft", command: "save_task" },
        },
      },
    ],
  });

  // Cover Image & Presets Selector Card
  groups.push({
    id: uid(),
    x: f2.x + PHONE_MARGIN,
    y: f2.y + 68,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "todoCreateCard",
        label: "Cover Image & Presets",
        supporting: "Attach cover photo from library or presets",
        variant: "filled",
        size: 380,
      },
    ],
  });

  // Form Fields Group (Vertical group: elements automatically stack without overlapping)
  groups.push({
    id: uid(),
    x: f2.x + PHONE_MARGIN,
    y: f2.y + 226,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "textField",
        label: "Task Title",
        value: "Launch Spring Fashion Collection UI",
        placeholder: "e.g. Launch Spring Fashion Collection UI",
        icon: "title",
        variant: "outlined",
        size: 380,
      },
      {
        id: uid(),
        kind: "textField",
        label: "Description & Acceptance Notes",
        value: "Finalize mobile typography scales, dark mode tokens, and 2-column editorial grids.",
        placeholder: "Key milestones, resources, deliverables...",
        icon: "notes",
        variant: "outlined",
        size: 380,
      },
      {
        id: uid(),
        kind: "textField",
        label: "Due Date & Reminder",
        value: "Oct 15, 2026 • 09:00 AM",
        placeholder: "Choose due date...",
        icon: "calendar_today",
        variant: "outlined",
        size: 380,
      },
    ],
  });

  // Priority Chips
  groups.push({
    id: uid(),
    x: f2.x + PHONE_MARGIN,
    y: f2.y + 422,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "chip",
        label: "Urgent Priority",
        icon: "priority_high",
        variant: "tonal",
      },
      {
        id: uid(),
        kind: "chip",
        label: "High",
        variant: "outlined",
      },
      {
        id: uid(),
        kind: "chip",
        label: "Medium",
        variant: "outlined",
      },
      {
        id: uid(),
        kind: "chip",
        label: "Low",
        variant: "outlined",
      },
    ],
  });

  // Category Selector Chips
  groups.push({
    id: uid(),
    x: f2.x + PHONE_MARGIN,
    y: f2.y + 464,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "chip",
        label: "Design",
        icon: "palette",
        variant: "filled",
      },
      {
        id: uid(),
        kind: "chip",
        label: "Dev",
        icon: "code",
        variant: "tonal",
      },
      {
        id: uid(),
        kind: "chip",
        label: "Health",
        icon: "fitness_center",
        variant: "tonal",
      },
      {
        id: uid(),
        kind: "chip",
        label: "Personal",
        icon: "person",
        variant: "tonal",
      },
    ],
  });

  // Design Specification Attachment Card
  groups.push({
    id: uid(),
    x: f2.x + PHONE_MARGIN,
    y: f2.y + 508,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "fileAttachmentCard",
        label: "Spring_Lookbook_Asset_Kit.pdf",
        supporting: "4.8 MB • Attached Design Specifications",
        icon: "picture_as_pdf",
        variant: "tonal",
        size: 380,
      },
    ],
  });

  // Sprint Velocity Tip Card
  groups.push({
    id: uid(),
    x: f2.x + PHONE_MARGIN,
    y: f2.y + 582,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "notesSnippetCard",
        label: "Sprint Velocity Tip",
        supporting: "Tasks with cover images and clear milestones have a 92% sprint completion rate.",
        size: 380,
      },
    ],
  });

  // Save & Cancel CTA Buttons
  groups.push({
    id: uid(),
    x: f2.x + PHONE_MARGIN,
    y: f2.y + 704,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Save & Publish Task",
        icon: "check_circle",
        variant: "filled",
        size: 236,
        action: { to: "todo_board", transition: "slide", command: "save_task" },
      },
      {
        id: uid(),
        kind: "button",
        label: "Cancel",
        icon: "close",
        variant: "outlined",
        size: 136,
        action: { to: "todo_board", transition: "slide", command: "cancel_task" },
      },
    ],
  });

  // Screen 2 Bottom Navigation
  groups.push({
    id: uid(),
    x: f2.x,
    y: f2.y + FRAME_H - 80,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "bottomNav",
        label: "",
        icon: null,
        variant: "filled",
        size: FRAME_W,
        tabs: [
          { icon: "checklist", label: "Tasks" },
          { icon: "add_circle", label: "Create" },
          { icon: "visibility", label: "Inspect" },
          { icon: "edit_note", label: "Manage" },
          { icon: "person", label: "Profile" },
        ],
        selected: 1,
        actions: {
          "tab:0": { to: "todo_board", transition: "fade" },
          "tab:2": { to: "todo_detail", transition: "fade" },
          "tab:3": { to: "todo_edit", transition: "fade" },
        },
      },
    ],
  });

  // ==================== SCREEN 3: TASK DETAILS (READ) ====================
  // Top App Bar
  groups.push({
    id: uid(),
    x: f3.x,
    y: f3.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Task Details (Read)",
        icon: "arrow_back",
        icon2: "edit",
        icon3: "delete",
        variant: "filled",
        size: FRAME_W,
        actions: {
          icon: { to: "todo_board", transition: "slideLeft" },
          icon2: { to: "todo_edit", transition: "slide" },
          icon3: { to: "todo_board", transition: "slideLeft", command: "delete_task" },
        },
      },
    ],
  });

  // Detailed Read View Hero Card
  groups.push({
    id: uid(),
    x: f3.x + PHONE_MARGIN,
    y: f3.y + 68,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "todoDetailCard",
        label: INITIAL_TODOS[0].title,
        supporting: INITIAL_TODOS[0].description,
        icon: "palette",
        icon2: INITIAL_TODOS[0].imageUrl,
        badge: "Urgent Priority • Oct 15",
        variant: "filled",
        size: 380,
      },
    ],
  });

  // Subtask Checklist Section Header
  groups.push({
    id: uid(),
    x: f3.x + PHONE_MARGIN,
    y: f3.y + 288,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "chip",
        label: "Milestone Subtasks (2 of 4 Done • 50%)",
        icon: "checklist",
        variant: "tonal",
      },
    ],
  });

  // Subtask Checklist items (Vertical group)
  groups.push({
    id: uid(),
    x: f3.x + PHONE_MARGIN,
    y: f3.y + 330,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "checkbox",
        label: "Finalize high-fidelity typography scale and tokens",
        variant: "filled",
        size: 380,
      },
      {
        id: uid(),
        kind: "checkbox",
        label: "Export responsive SVG icons & vector badge assets",
        variant: "filled",
        size: 380,
      },
      {
        id: uid(),
        kind: "checkbox",
        label: "Audit accessibility contrast ratios (WCAG AAA)",
        variant: "outlined",
        size: 380,
      },
      {
        id: uid(),
        kind: "checkbox",
        label: "Sync design tokens with Expo Mobile APK build",
        variant: "outlined",
        size: 380,
      },
    ],
  });

  // Cloud Design Attachment Card
  groups.push({
    id: uid(),
    x: f3.x + PHONE_MARGIN,
    y: f3.y + 504,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "fileAttachmentCard",
        label: "Design_System_Atelier_v2.fig",
        supporting: "18.4 MB • Cloud Figma Component Kit",
        icon: "description",
        variant: "outlined",
        size: 380,
      },
    ],
  });

  // Task Metadata Card
  groups.push({
    id: uid(),
    x: f3.x + PHONE_MARGIN,
    y: f3.y + 580,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "notesSnippetCard",
        label: "Task Metadata & Audit Log",
        supporting: "Owner: Alex Morgan • Sprint 4 • Last modified 10m ago • Priority: Urgent • Stage: In Review",
        size: 380,
      },
    ],
  });

  // Action Buttons (Edit / Complete)
  groups.push({
    id: uid(),
    x: f3.x + PHONE_MARGIN,
    y: f3.y + 704,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Edit Task",
        icon: "edit",
        variant: "filled",
        size: 180,
        action: { to: "todo_edit", transition: "slide" },
      },
      {
        id: uid(),
        kind: "button",
        label: "Mark Completed",
        icon: "check_circle",
        variant: "tonal",
        size: 192,
        action: { to: "todo_board", transition: "slide", command: "complete_task" },
      },
    ],
  });

  // Screen 3 Bottom Navigation
  groups.push({
    id: uid(),
    x: f3.x,
    y: f3.y + FRAME_H - 80,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "bottomNav",
        label: "",
        icon: null,
        variant: "filled",
        size: FRAME_W,
        tabs: [
          { icon: "checklist", label: "Tasks" },
          { icon: "add_circle", label: "Create" },
          { icon: "visibility", label: "Inspect" },
          { icon: "edit_note", label: "Manage" },
          { icon: "person", label: "Profile" },
        ],
        selected: 2,
        actions: {
          "tab:0": { to: "todo_board", transition: "fade" },
          "tab:1": { to: "todo_create", transition: "fade" },
          "tab:3": { to: "todo_edit", transition: "fade" },
        },
      },
    ],
  });

  // ==================== SCREEN 4: EDIT TASK (CRUD UPDATE) ====================
  // Top App Bar
  groups.push({
    id: uid(),
    x: f4.x,
    y: f4.y,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "topAppBar",
        label: "Edit & Update Task",
        icon: "arrow_back",
        icon2: "save",
        variant: "filled",
        size: FRAME_W,
        actions: {
          icon: { to: "todo_detail", transition: "slideLeft" },
          icon2: { to: "todo_board", transition: "slideLeft", command: "update_task" },
        },
      },
    ],
  });

  // Edit Cover Image Switcher Card
  groups.push({
    id: uid(),
    x: f4.x + PHONE_MARGIN,
    y: f4.y + 68,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "todoEditCard",
        label: "Edit Cover Image",
        supporting: "Replace active task cover photo",
        icon: "edit",
        icon2: INITIAL_TODOS[0].imageUrl,
        badge: "Urgent Priority",
        variant: "filled",
        size: 380,
      },
    ],
  });

  // Editable Form Fields Group (Vertical group)
  groups.push({
    id: uid(),
    x: f4.x + PHONE_MARGIN,
    y: f4.y + 226,
    axis: "y",
    items: [
      {
        id: uid(),
        kind: "textField",
        label: "Edit Title",
        value: INITIAL_TODOS[0].title,
        icon: "edit_note",
        variant: "outlined",
        size: 380,
      },
      {
        id: uid(),
        kind: "textField",
        label: "Edit Description & Milestones",
        value: INITIAL_TODOS[0].description,
        icon: "notes",
        variant: "outlined",
        size: 380,
      },
      {
        id: uid(),
        kind: "textField",
        label: "Due Date & Reminder",
        value: "Oct 15, 2026 • 09:00 AM",
        icon: "calendar_today",
        variant: "outlined",
        size: 380,
      },
    ],
  });

  // Priority Selector Chips
  groups.push({
    id: uid(),
    x: f4.x + PHONE_MARGIN,
    y: f4.y + 422,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "chip",
        label: "Urgent Priority",
        icon: "priority_high",
        variant: "tonal",
      },
      {
        id: uid(),
        kind: "chip",
        label: "High",
        variant: "outlined",
      },
      {
        id: uid(),
        kind: "chip",
        label: "Medium",
        variant: "outlined",
      },
      {
        id: uid(),
        kind: "chip",
        label: "Low",
        variant: "outlined",
      },
    ],
  });

  // Category Selector Chips
  groups.push({
    id: uid(),
    x: f4.x + PHONE_MARGIN,
    y: f4.y + 464,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "chip",
        label: "Design",
        icon: "palette",
        variant: "filled",
      },
      {
        id: uid(),
        kind: "chip",
        label: "Dev",
        icon: "code",
        variant: "tonal",
      },
      {
        id: uid(),
        kind: "chip",
        label: "Health",
        icon: "fitness_center",
        variant: "tonal",
      },
      {
        id: uid(),
        kind: "chip",
        label: "Personal",
        icon: "person",
        variant: "tonal",
      },
    ],
  });

  // Cloud Sync Status Banner
  groups.push({
    id: uid(),
    x: f4.x + PHONE_MARGIN,
    y: f4.y + 508,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "notificationBannerSticky",
        label: "Task #TSK-01 • Version 4.2",
        supporting: "Cloud synchronized • 2 subtasks pending review",
        variant: "tonal",
        size: 380,
      },
    ],
  });

  // Productivity Streak Card
  groups.push({
    id: uid(),
    x: f4.x + PHONE_MARGIN,
    y: f4.y + 576,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "rewardStreakCard",
        label: "42 Days Productivity Streak!",
        supporting: "Zero overdue tasks recorded this sprint • +150 XP",
        size: 380,
      },
    ],
  });

  // Save Changes & Delete Task CTA Buttons
  groups.push({
    id: uid(),
    x: f4.x + PHONE_MARGIN,
    y: f4.y + 686,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "button",
        label: "Save Changes",
        icon: "save",
        variant: "filled",
        size: 236,
        action: { to: "todo_board", transition: "slide", command: "update_task" },
      },
      {
        id: uid(),
        kind: "button",
        label: "Delete Task",
        icon: "delete",
        variant: "outlined",
        size: 136,
        action: { to: "todo_board", transition: "slide", command: "delete_task" },
      },
    ],
  });

  // Screen 4 Bottom Navigation
  groups.push({
    id: uid(),
    x: f4.x,
    y: f4.y + FRAME_H - 80,
    axis: "x",
    items: [
      {
        id: uid(),
        kind: "bottomNav",
        label: "",
        icon: null,
        variant: "filled",
        size: FRAME_W,
        tabs: [
          { icon: "checklist", label: "Tasks" },
          { icon: "add_circle", label: "Create" },
          { icon: "visibility", label: "Inspect" },
          { icon: "edit_note", label: "Manage" },
          { icon: "person", label: "Profile" },
        ],
        selected: 3,
        actions: {
          "tab:0": { to: "todo_board", transition: "fade" },
          "tab:1": { to: "todo_create", transition: "fade" },
          "tab:2": { to: "todo_detail", transition: "fade" },
        },
      },
    ],
  });

  return {
    title: "TaskFlow Studio · Todo App (CRUD)",
    brief: "Comprehensive personal task management and productivity app featuring interactive task lists with images, daily sprint completion analytics, create task form with cover photo selector, full inspection read view, and complete CRUD operations.",
    frame: "phone",
    platform: "android",
    paletteKey: "indigo",
    frames,
    groups,
  };
}
