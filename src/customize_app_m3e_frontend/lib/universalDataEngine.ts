import type { Doc, Frame, Group, Item, Kind } from "./tokens";

export type AppDomain =
  | "apparel"
  | "ecommerce"
  | "food"
  | "finance"
  | "fitness"
  | "social"
  | "travel"
  | "todo"
  | "general";

export interface MockItemRecord {
  id: string;
  title: string;
  description: string;
  price?: string;
  badge?: string;
  imageUrl?: string;
  category?: string;
  icon?: string;
  completed?: boolean;
  dueDate?: string;
  rating?: number;
  author?: string;
  rawItem?: Item;
}

/**
 * Automatically inspects the current canvas elements and frames to detect the application domain with weighted scoring.
 * Visible elements on the canvas are given 5x higher weight than any old document title.
 */
export function detectAppDomain(doc: Doc): AppDomain {
  const itemTexts = doc.groups
    .flatMap((g) => g.items.map((it) => `${it.label || ""} ${it.supporting || ""} ${it.kind}`))
    .join(" ")
    .toLowerCase();
  const frameTexts = doc.frames.map((f) => `${f.name || ""} ${f.note || ""} ${f.id}`).join(" ").toLowerCase();
  const docText = ((doc as any).name || "").toLowerCase();

  const countMatches = (text: string, keywords: string[]) => {
    let count = 0;
    for (const kw of keywords) {
      if (text.includes(kw)) count++;
    }
    return count;
  };

  const scores: Record<AppDomain, number> = {
    todo: 0,
    apparel: 0,
    ecommerce: 0,
    food: 0,
    finance: 0,
    fitness: 0,
    social: 0,
    travel: 0,
    general: 0,
  };

  // Todo / Tasks / Sprints / Project Management
  scores.todo += countMatches(itemTexts, ["sprint", "taskflow", "task", "milestone", "todo", "checklist", "subtask", "done", "urgent", "priority", "backlog", "kanban", "in progress"]) * 5;
  scores.todo += countMatches(frameTexts, ["task", "sprint", "todo", "create task", "inspect", "manage"]) * 4;

  // Apparel / Fashion
  scores.apparel += countMatches(itemTexts, ["apparel", "clothing", "linen", "blazer", "jeans", "outfit", "sneaker", "dress", "shirt", "pant", "jacket", "lookbook", "fashion collection"]) * 5;
  scores.apparel += countMatches(frameTexts, ["apparel", "clothing", "lookbook", "outfit"]) * 4;

  // E-commerce / Shopping
  scores.ecommerce += countMatches(itemTexts, ["cart", "checkout", "product", "store", "catalog", "order", "shipping", "add to cart", "buy now", "discount"]) * 5;

  // Food / Restaurant
  scores.food += countMatches(itemTexts, ["food", "restaurant", "burger", "pizza", "ramen", "dish", "meal", "menu", "cafe", "recipe", "chef", "delivery time"]) * 5;

  // Finance / Banking
  scores.finance += countMatches(itemTexts, ["wallet", "bank", "balance", "transfer", "send money", "crypto", "spending", "income", "transaction", "deposit"]) * 5;

  // Fitness
  scores.fitness += countMatches(itemTexts, ["fitness", "workout", "gym", "calorie", "exercise", "running", "steps", "heart rate", "reps", "sets"]) * 5;

  // Social
  scores.social += countMatches(itemTexts, ["chat", "message", "follower", "likes", "post", "feed", "comment", "story", "profile"]) * 5;

  // Travel
  scores.travel += countMatches(itemTexts, ["hotel", "flight", "booking", "resort", "vacation", "trip", "destination", "night"]) * 5;

  // Fallback to docText only if canvas items have zero domain signal
  if (Object.values(scores).every((v) => v === 0)) {
    scores.todo += countMatches(docText, ["todo", "task", "sprint", "milestone"]) * 2;
    scores.apparel += countMatches(docText, ["apparel", "fashion", "clothing"]) * 2;
    scores.ecommerce += countMatches(docText, ["shop", "store", "ecommerce"]) * 2;
    scores.finance += countMatches(docText, ["bank", "wallet", "money", "finance"]) * 2;
    scores.food += countMatches(docText, ["food", "restaurant", "recipe"]) * 2;
  }

  let bestDomain: AppDomain = "general";
  let maxScore = 0;
  for (const [dom, score] of Object.entries(scores) as [AppDomain, number][]) {
    if (score > maxScore) {
      maxScore = score;
      bestDomain = dom;
    }
  }

  return bestDomain;
}

/**
 * Returns realistic curated mock records for ANY detected application domain.
 */
export function getDomainMockRecords(domain: AppDomain): MockItemRecord[] {
  switch (domain) {
    case "apparel":
    case "ecommerce":
      return [
        {
          id: "item_apparel_1",
          title: "Minimalist Oversized Flax Linen Blazer",
          description: "Tailored drop-shoulder silhouette woven from 100% Normandy flax linen. Breathable and unlined.",
          price: "$185.00",
          badge: "Bestseller",
          imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80",
          category: "Outerwear",
          rating: 4.9,
          icon: "checkroom",
          completed: false,
          dueDate: "In Stock • Ships in 24h",
        },
        {
          id: "item_apparel_2",
          title: "Raw Selvedge Relaxed Denim Jeans",
          description: "14.5oz Japanese shuttle-loom denim with copper hardware and chain-stitched hems.",
          price: "$140.00",
          badge: "New Arrival",
          imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80",
          category: "Denim",
          rating: 4.8,
          icon: "styler",
          completed: false,
          dueDate: "In Stock • 12 Left",
        },
        {
          id: "item_apparel_3",
          title: "Heavyweight Boxy Supima Cotton Tee",
          description: "260 GSM combed long-staple cotton with ribbed collar and pre-shrunk vintage dye finish.",
          price: "$55.00",
          badge: "Trending",
          imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
          category: "Basics",
          rating: 4.95,
          icon: "dry_cleaning",
          completed: false,
          dueDate: "In Stock",
        },
        {
          id: "item_apparel_4",
          title: "Monochrome Low-Top Calfskin Sneakers",
          description: "Handcrafted Italian Nappa leather uppers with vulcanized natural rubber sole.",
          price: "$210.00",
          badge: "Limited Edition",
          imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80",
          category: "Footwear",
          rating: 4.92,
          icon: "ice_skating",
          completed: false,
          dueDate: "Low Stock",
        },
      ];

    case "food":
      return [
        {
          id: "item_food_1",
          title: "Artisan Black Truffle Tonkotsu Ramen",
          description: "24-hour slow simmered Berkshire pork broth, chashu pork belly, ajitsuke tamago & black truffle oil.",
          price: "$19.50",
          badge: "Chef Special",
          imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
          category: "Ramen",
          rating: 4.97,
          icon: "ramen_dining",
          dueDate: "20-25 mins",
        },
        {
          id: "item_food_2",
          title: "Wagyu Smash Cheeseburger Deluxe",
          description: "Double 4oz grass-fed Wagyu beef patties, house secret umami sauce, caramelized onion, brioche bun.",
          price: "$16.00",
          badge: "Most Popular",
          imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80",
          category: "Burgers",
          rating: 4.88,
          icon: "lunch_dining",
          dueDate: "15-20 mins",
        },
        {
          id: "item_food_3",
          title: "Bluefin Tuna & Salmon Poke Bowl",
          description: "Sushi-grade sashimi, seasoned sushi rice, organic avocado, edamame, furikake & ponzu glaze.",
          price: "$18.25",
          badge: "Fresh & Healthy",
          imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
          category: "Bowls",
          rating: 4.92,
          icon: "set_meal",
          dueDate: "10-15 mins",
        },
      ];

    case "finance":
      return [
        {
          id: "item_fin_1",
          title: "Apple Store Fifth Avenue",
          description: "Electronics & Tech Accessories • Hardware Purchase",
          price: "-$1,299.00",
          badge: "Completed",
          imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80",
          category: "Shopping",
          icon: "laptop_mac",
          dueDate: "Today, 11:20 AM",
        },
        {
          id: "item_fin_2",
          title: "Direct Client Wire Deposit",
          description: "Design Systems & UI Engineering Contract",
          price: "+$4,850.00",
          badge: "Received",
          imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80",
          category: "Income",
          icon: "arrow_downward",
          dueDate: "Yesterday, 04:15 PM",
        },
        {
          id: "item_fin_3",
          title: "Whole Foods Artisan Market",
          description: "Organic Groceries & Produce • Debit Card",
          price: "-$84.30",
          badge: "Completed",
          imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80",
          category: "Groceries",
          icon: "shopping_cart",
          dueDate: "Oct 12, 06:40 PM",
        },
      ];

    case "fitness":
      return [
        {
          id: "item_fit_1",
          title: "High-Intensity Interval Sprint & Core",
          description: "45 minutes high heart-rate intervals targeting cardiovascular endurance and core stamina.",
          price: "480 kcal",
          badge: "Completed",
          imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80",
          category: "Cardio",
          icon: "directions_run",
          dueDate: "Today, 07:00 AM",
        },
        {
          id: "item_fit_2",
          title: "Upper Body Strength & Hypertrophy",
          description: "Barbell bench press, incline dumbbell presses, weighted pull-ups and lateral raises.",
          price: "360 kcal",
          badge: "Scheduled",
          imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=80",
          category: "Strength",
          icon: "fitness_center",
          dueDate: "Tomorrow, 08:30 AM",
        },
      ];

    case "social":
      return [
        {
          id: "item_soc_1",
          title: "Sunset over the studio rooftop",
          description: "Golden hour highlights on our new architectural ceramics collection.",
          badge: "1.4k Likes",
          imageUrl: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&auto=format&fit=crop&q=80",
          category: "Design",
          author: "Elena Vance (@elena_v)",
          icon: "favorite",
          dueDate: "2h ago",
        },
        {
          id: "item_soc_2",
          title: "Tokyo Street Photography Walk",
          description: "Rain reflections and neon typography in Shibuya and Nakameguro.",
          badge: "920 Likes",
          imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80",
          category: "Photography",
          author: "Kenji Sato (@kenji)",
          icon: "photo_camera",
          dueDate: "5h ago",
        },
      ];

    case "travel":
      return [
        {
          id: "item_trv_1",
          title: "Santorini Cliffside Infinity Villa",
          description: "Panoramic caldera views, private heated plunge pool, and daily Mediterranean breakfast.",
          price: "$420/night",
          badge: "Superhost",
          imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&auto=format&fit=crop&q=80",
          category: "Villa",
          rating: 4.98,
          icon: "pool",
          dueDate: "Available Oct 18 - 25",
        },
        {
          id: "item_trv_2",
          title: "Kyoto Traditional Zen Machiya",
          description: "Restored historic wooden townhouse with private Japanese moss garden and cedar onsen bath.",
          price: "$290/night",
          badge: "Top Rated",
          imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80",
          category: "Historic Stay",
          rating: 4.96,
          icon: "spa",
          dueDate: "Available Nov 02 - 09",
        },
      ];

    case "todo":
      return [
        {
          id: "task_1",
          title: "Design Atelier Spring Lookbook & UI System",
          description: "Finalize mobile typography scales, dark mode tokens, and 2-column editorial card grids.",
          badge: "Urgent",
          imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
          category: "Design",
          completed: false,
          dueDate: "Oct 15, 2026",
          icon: "palette",
        },
        {
          id: "task_2",
          title: "Daily 5km Cardio Run & Mobility Routine",
          description: "Maintain morning cardio endurance milestone and core stability training.",
          badge: "Completed",
          imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80",
          category: "Health",
          completed: true,
          dueDate: "Today, 07:30 AM",
          icon: "directions_run",
        },
        {
          id: "task_3",
          title: "Mobile Navigation Spring Physics & Gestures",
          description: "Integrate predictive back gestures, shared element layout transitions, and touch ripples.",
          badge: "High",
          imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
          category: "Dev",
          completed: false,
          dueDate: "Oct 16, 2026",
          icon: "animation",
        },
        {
          id: "task_4",
          title: "Accessibility Contrast Audit (WCAG 2.1 AAA)",
          description: "Verify surface color tokens across all contrast ratios and dynamic type sizes.",
          badge: "Completed",
          imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80",
          category: "Dev",
          completed: true,
          dueDate: "Oct 14, 2026",
          icon: "verified",
        },
        {
          id: "task_5",
          title: "Weekly Product Strategy & Roadmap Sync",
          description: "Align engineering milestones and design deliverables with stakeholders.",
          badge: "Medium",
          imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
          category: "Personal",
          completed: false,
          dueDate: "Oct 17, 2026",
          icon: "groups",
        },
      ];

    case "general":
    default:
      return [
        {
          id: "item_gen_1",
          title: "Launch Interactive Mobile Experience",
          description: "Finalize typography scales, dark mode color tokens, and fluid card transitions.",
          badge: "Urgent",
          imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
          category: "Design",
          completed: false,
          dueDate: "Oct 15, 2026",
          icon: "palette",
        },
        {
          id: "item_gen_2",
          title: "Verify API Endpoints & State Sync",
          description: "Wire real HTTP endpoints, handle optimistic updates, and test offline fallbacks.",
          badge: "High",
          imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
          category: "Engineering",
          completed: false,
          dueDate: "Oct 16, 2026",
          icon: "terminal",
        },
        {
          id: "item_gen_3",
          title: "Review Design Token Specifications",
          description: "Ensure color contrast compliance (APCA / WCAG 2.1 AAA) across all surface tones.",
          badge: "Completed",
          imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80",
          category: "Design",
          completed: true,
          dueDate: "Oct 14, 2026",
          icon: "verified",
        },
      ];
  }
}

/**
 * Traverses groups and dynamically hydrates detail and edit screens with the selected record data.
 */
export function bindSelectedRecordToDetailScreens(groups: Group[], record: MockItemRecord): Group[] {
  return groups.map((g) => {
    let modified = false;
    const nextItems = g.items.map((it) => {
      // 1. Detail cards
      if (it.kind === "todoDetailCard" || it.kind === "card" || (it.kind as string) === "detailCard") {
        modified = true;
        return {
          ...it,
          label: record.title,
          supporting: record.description,
          icon2: record.imageUrl || it.icon2,
          badge: record.price ? `${record.price} • ${record.badge || "Available"}` : record.badge || it.badge,
        };
      }

      // 2. Edit cards
      if (it.kind === "todoEditCard") {
        modified = true;
        return {
          ...it,
          icon2: record.imageUrl || it.icon2,
          badge: record.badge || it.badge,
        };
      }

      // 3. Text Fields for Title / Name / Description / Price
      if (it.kind === "textField") {
        const lbl = (it.label || it.placeholder || "").toLowerCase();
        if (lbl.includes("title") || lbl.includes("name") || lbl.includes("product") || lbl.includes("item")) {
          modified = true;
          return { ...it, value: record.title };
        }
        if (lbl.includes("desc") || lbl.includes("detail") || lbl.includes("note") || lbl.includes("summary")) {
          modified = true;
          return { ...it, value: record.description };
        }
        if (lbl.includes("price") || lbl.includes("amount") || lbl.includes("cost")) {
          modified = true;
          return { ...it, value: record.price || "" };
        }
      }

      // 4. Hero cover or images
      if (it.kind === "avatar" && record.imageUrl) {
        modified = true;
        return { ...it, icon2: record.imageUrl };
      }

      return it;
    });

    return modified ? { ...g, items: nextItems as Item[] } : g;
  });
}

/**
 * Universally appends or prepends a new record to the primary collection in the target screen.
 * Works seamlessly for cards, listItems, todoCards, or numbered text lists!
 */
export function appendRecordToCollection(
  groups: Group[],
  targetFrameId: string | undefined,
  record: Partial<MockItemRecord>,
  lastInputVal?: string
): Group[] {
  const title = (record.title || lastInputVal || "New Item").trim();
  const description = (record.description || "Added just now").trim();
  const badge = record.badge || "Active";
  const imageUrl = record.imageUrl || "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80";

  let inserted = false;

  const updated = groups.map((g) => {
    // Skip modal groups from being the target list
    if (g.isModal || (g as any).role === "modal") return g;

    // 1. Numbered text list (e.g. "1. Task", "2. Task")
    const hasNumberedText = g.items.some((it) => it.kind === "text" && /^\d+\.\s*/.test(it.label || ""));
    const isTextList = g.items.length >= 2 && g.items.every((it) => it.kind === "text");

    if (!inserted && (hasNumberedText || isTextList)) {
      inserted = true;
      let maxNum = 0;
      g.items.forEach((it) => {
        const match = (it.label || "").match(/^(\d+)\./);
        if (match) {
          const num = parseInt(match[1], 10);
          if (num > maxNum) maxNum = num;
        }
      });
      const nextNum = maxNum > 0 ? maxNum + 1 : g.items.length + 1;
      const template = g.items[g.items.length - 1];
      const newItem: Item = {
        ...template,
        id: `text_item_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        label: `${nextNum}. ${title}`,
      };
      return { ...g, items: [...g.items, newItem] };
    }

    // 2. Standard listItem collection
    if (!inserted && g.items.some((it) => it.kind === "listItem")) {
      inserted = true;
      const template = g.items[0];
      const newItem: Item = {
        ...template,
        id: `list_item_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        label: title,
        supporting: description,
      };
      return { ...g, items: [newItem, ...g.items] };
    }

    // 3. Card collection (todoCard, card, kanbanCard, productCard)
    if (!inserted && g.items.some((it) => it.kind === "todoCard" || it.kind === "card" || it.kind === "kanbanCard")) {
      inserted = true;
      const template = g.items[0];
      const newItem: Item = {
        ...template,
        id: `card_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        label: title,
        supporting: description,
        icon2: imageUrl,
        badge,
        variant: "filled",
        size: template.size || 380,
      };
      return { ...g, items: [newItem, ...g.items] };
    }

    // Clear input fields inside any group (like modal inputs)
    if (g.items.some((it) => it.kind === "textField")) {
      return {
        ...g,
        items: g.items.map((it) => (it.kind === "textField" ? { ...it, value: "" } : it)) as Item[],
      };
    }

    return g;
  });

  return synchronizeAllScreensState(updated);
}

/**
 * Updates a record across groups by id or label and synchronizes all screens.
 */
export function updateRecordInCollection(
  groups: Group[],
  recordId: string,
  updates: Partial<MockItemRecord>
): Group[] {
  const updated = groups.map((g) => {
    let mod = false;
    const nextItems = g.items.map((it) => {
      if (it.id === recordId || it.label === updates.title) {
        mod = true;
        return {
          ...it,
          label: updates.title ?? it.label,
          supporting: updates.description ?? it.supporting,
          icon2: updates.imageUrl ?? it.icon2,
          badge: updates.badge ?? it.badge,
        };
      }
      return it;
    });
    return mod ? { ...g, items: nextItems as Item[] } : g;
  });

  return synchronizeAllScreensState(updated);
}

/**
 * Removes a record by id across all groups and synchronizes all screens.
 */
export function deleteRecordFromCollection(groups: Group[], recordId: string): Group[] {
  const updated = groups.map((g) => {
    const nextItems = g.items.filter((it) => it.id !== recordId);
    return nextItems.length !== g.items.length ? { ...g, items: nextItems as Item[] } : g;
  });

  return synchronizeAllScreensState(updated);
}

/**
 * Toggles a record status (e.g. Completed vs Active/Urgent) and immediately synchronizes
 * all screens (progress indicators, milestone counters, chips, profile badges).
 */
export function toggleRecordInCollection(
  groups: Group[],
  recordId: string,
  isCompleted?: boolean,
  label?: string
): { updatedGroups: Group[]; completedRatio: number } {
  // 1. Toggle matching items in place
  const toggled = groups.map((g) => {
    let mod = false;
    const nextItems = g.items.map((it) => {
      const isMatch = it.id === recordId || (label && it.label === label);
      if (isMatch) {
        mod = true;
        const currentDone = (it.badge || "").trim().toLowerCase() === "completed" || Boolean(it.checked);
        const nextDone = isCompleted !== undefined ? isCompleted : !currentDone;
        return {
          ...it,
          badge: nextDone ? "Completed" : "Urgent",
          checked: nextDone,
          variant: nextDone ? "tonal" : "filled",
        };
      }
      return it;
    });
    return mod ? { ...g, items: nextItems as Item[] } : g;
  });

  // 2. Synchronize across all mobile screens!
  const updatedGroups = synchronizeAllScreensState(toggled);

  // 3. Compute ratio
  const allTasks = updatedGroups.flatMap((g) =>
    g.items.filter((it) => it.kind === "todoCard" || (it.kind === "card" && !it.kind.includes("Stats") && !it.kind.includes("Create") && !it.kind.includes("Detail") && !it.kind.includes("Edit")))
  );
  const completedRatio =
    allTasks.length > 0
      ? allTasks.filter((t) => (t.badge || "").toLowerCase() === "completed" || Boolean(t.checked)).length / allTasks.length
      : 0;

  return { updatedGroups, completedRatio };
}

/**
 * Synchronizes reactive data (counters, progress stats, subheaders, badges, filter chips)
 * across ALL mobile screens so any state change immediately propagates to every screen.
 */
export function synchronizeAllScreensState(groups: Group[]): Group[] {
  // 1. Compute aggregate metrics from the primary collection
  const allTasks: Item[] = [];
  groups.forEach((g) => {
    if (g.isModal || (g as any).role === "modal") return;
    g.items.forEach((it) => {
      if (
        it.kind === "todoCard" ||
        (it.kind === "card" &&
          !it.kind.includes("Stats") &&
          !it.kind.includes("Create") &&
          !it.kind.includes("Detail") &&
          !it.kind.includes("Edit") &&
          !it.kind.includes("Attachment") &&
          !it.kind.includes("notes") &&
          !it.kind.includes("Notes"))
      ) {
        allTasks.push(it);
      }
    });
  });

  const totalCount = allTasks.length;
  const completedCount = allTasks.filter((t) => {
    const b = (t.badge || "").trim().toLowerCase();
    return b === "completed" || b === "done" || Boolean(t.checked);
  }).length;
  const pendingCount = Math.max(0, totalCount - completedCount);
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // 2. Multi-screen reactive update pass
  return groups.map((g) => {
    let mod = false;
    const nextItems = g.items.map((it) => {
      // A. Progress Card (e.g. Daily Sprint Progress on Screen 1)
      if (
        it.kind === "todoStatsCard" ||
        (it.kind === "card" && /Progress|Sprint/i.test(it.label || ""))
      ) {
        mod = true;
        return {
          ...it,
          value: percent,
          supporting: `${percent}% Completed • ${pendingCount} Active Milestones`,
        };
      }

      // B. Section Header Chips / Labels (e.g. Active Sprint Tasks • 3 Pending Milestones)
      if (
        it.kind === "chip" &&
        (it.icon === "format_list_bulleted" ||
          /Active Sprint Tasks|Pending Milestones|Pending Tasks|Active Tasks/i.test(it.label || ""))
      ) {
        mod = true;
        return {
          ...it,
          label: `Active Sprint Tasks • ${pendingCount} Pending Milestones`,
        };
      }

      // C. Filter Chips (e.g. All Tasks (5), Completed (2), Pending (3))
      if (it.kind === "chip") {
        const lbl = it.label || "";
        if (/^All Tasks(\s*\(\d+\))?$/i.test(lbl) || lbl.startsWith("All Tasks")) {
          mod = true;
          return { ...it, label: `All Tasks (${totalCount})` };
        }
        if (/^Completed(\s*\(\d+\))?$/i.test(lbl) || lbl.startsWith("Completed")) {
          mod = true;
          return { ...it, label: `Completed (${completedCount})` };
        }
        if (/^Pending(\s*\(\d+\))?$/i.test(lbl) || lbl.startsWith("Pending")) {
          mod = true;
          return { ...it, label: `Pending (${pendingCount})` };
        }
      }

      // D. User Profile Header (e.g. Alex Morgan on Screen 1)
      if (it.kind === "userProfileHeader" || (it.label?.includes("Alex") && it.supporting?.includes("Active Goals"))) {
        mod = true;
        return {
          ...it,
          supporting: `Productivity Lead · ${pendingCount} Active Goals · ${completedCount} Completed`,
        };
      }

      // E. Screen 3 Subtask Progress Chip
      if (it.kind === "chip" && /Milestone Subtasks|Subtasks/i.test(it.label || "")) {
        mod = true;
        return {
          ...it,
          label: `Milestone Subtasks (${completedCount} of ${totalCount} Done • ${percent}%)`,
        };
      }

      // F. Screen 3 Mark Completed Button
      if (it.kind === "button" && /Mark Completed|Mark Incomplete|Complete Task/i.test(it.label || "")) {
        mod = true;
        const isDone = percent === 100;
        return {
          ...it,
          label: isDone ? "All Tasks Completed" : "Mark Completed",
        };
      }

      return it;
    });

    return mod ? { ...g, items: nextItems as Item[] } : g;
  });
}

/**
 * Populates or replaces the primary screen collection with rich dynamic dummy data for ANY detected domain.
 */
export function populateDomainMockData(groups: Group[], domain: AppDomain): Group[] {
  const presets = getDomainMockRecords(domain);
  if (!presets || presets.length === 0) return groups;

  let primaryUpdated = false;

  const nextGroups = groups.map((g) => {
    if (primaryUpdated || g.isModal || (g as any).role === "modal") return g;

    // Check if this group is the primary collection (contains todoCard, card, or listItem)
    const cardIndex = g.items.findIndex(
      (it) => it.kind === "todoCard" || it.kind === "card" || it.kind === "listItem"
    );

    if (cardIndex !== -1) {
      primaryUpdated = true;
      const template = g.items[cardIndex];
      const newItems: Item[] = presets.map((preset, idx) => ({
        ...template,
        id: preset.id || `preset_${domain}_${idx + 1}`,
        label: preset.title,
        supporting: preset.description,
        icon2: preset.imageUrl || template.icon2,
        badge: preset.price ? `${preset.price} • ${preset.badge || "In Stock"}` : preset.badge || "Active",
        checked: Boolean(preset.completed),
        variant: preset.completed ? "tonal" : "filled",
      }));

      // Keep non-card items in the group if any
      const nonCardsBefore = g.items.slice(0, cardIndex).filter((it) => it.kind !== template.kind);
      return { ...g, items: [...nonCardsBefore, ...newItems] };
    }

    return g;
  });

  return synchronizeAllScreensState(nextGroups);
}

