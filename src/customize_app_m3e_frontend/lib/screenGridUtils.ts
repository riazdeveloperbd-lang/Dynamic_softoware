import { Frame, Group, PHONE_H, PHONE_W } from "./tokens";

export const GRID_PHONE_W = PHONE_W; // 412
export const GRID_PHONE_H = PHONE_H; // 892
export const GRID_GAP_X = 90;
export const GRID_GAP_Y = 120;
export const GRID_STRIDE_X = GRID_PHONE_W + GRID_GAP_X; // 502
export const GRID_STRIDE_Y = GRID_PHONE_H + GRID_GAP_Y; // 1012

export interface GridSlot {
  x: number;
  y: number;
  col: number;
  row: number;
  label: string;
  isDefault?: boolean;
}

/**
 * Detects all unoccupied grid cells within the bounding box (and natural grid boundaries)
 * of the currently placed screen frames.
 */
export function findEmptyGridSlots(frames: Frame[], standardCols = 5): GridSlot[] {
  if (frames.length === 0) {
    return [
      {
        x: 0,
        y: 0,
        col: 0,
        row: 0,
        label: "Row 1, Column 1 (Top-Left)",
        isDefault: true,
      },
    ];
  }

  // Calculate row and column indices for each existing frame
  const occupiedSlots = new Set<string>();
  let minCol = 0;
  let maxCol = standardCols - 1;
  let minRow = 0;
  let maxRow = 0;

  for (const f of frames) {
    const col = Math.round(f.x / GRID_STRIDE_X);
    const row = Math.round(f.y / GRID_STRIDE_Y);
    occupiedSlots.add(`${col},${row}`);
    if (col < minCol) minCol = col;
    if (col > maxCol) maxCol = col;
    if (row < minRow) minRow = row;
    if (row > maxRow) maxRow = row;
  }

  const emptySlots: GridSlot[] = [];

  // Scan grid area for any empty holes inside the layout
  for (let r = minRow; r <= maxRow; r++) {
    for (let c = minCol; c <= maxCol; c++) {
      const key = `${c},${r}`;
      if (!occupiedSlots.has(key)) {
        // Double-check no frame is physically occupying this zone
        const targetX = c * GRID_STRIDE_X;
        const targetY = r * GRID_STRIDE_Y;
        const physicallyOccupied = frames.some(
          (f) =>
            Math.abs(f.x - targetX) < GRID_PHONE_W * 0.7 &&
            Math.abs(f.y - targetY) < GRID_PHONE_H * 0.7
        );
        if (!physicallyOccupied) {
          emptySlots.push({
            x: targetX,
            y: targetY,
            col: c,
            row: r,
            label: `Row ${r + 1}, Col ${c + 1} (${targetX === 0 && targetY === 0 ? "Top-Left" : `x:${targetX}, y:${targetY}`})`,
            isDefault: emptySlots.length === 0,
          });
        }
      }
    }
  }

  // If top-left (0, 0) is empty, ensure it's marked as default
  const topLeftSlot = emptySlots.find((s) => s.col === 0 && s.row === 0);
  if (topLeftSlot) {
    for (const s of emptySlots) s.isDefault = false;
    topLeftSlot.isDefault = true;
  }

  return emptySlots;
}

/**
 * Returns the first empty grid slot, prioritizing Row 0 Col 0 if vacant.
 */
export function findFirstEmptyGridSlot(frames: Frame[], standardCols = 5): GridSlot | null {
  const slots = findEmptyGridSlots(frames, standardCols);
  return slots.length > 0 ? slots[0] : null;
}

/**
 * Realigns all frames and their belonging groups into a clean, uniform grid
 * (e.g. 5 columns by N rows, starting at x: 0, y: 0).
 */
export function realignAllFramesToGrid(
  frames: Frame[],
  groups: Group[],
  widths: Record<string, number>,
  colsCount = 5
): { frames: Frame[]; groups: Group[] } {
  if (frames.length === 0) return { frames, groups };

  // Sort frames by vertical coordinate, then horizontal coordinate (reading order)
  const sorted = [...frames].sort((a, b) => {
    const rowDiff = Math.round(a.y / GRID_STRIDE_Y) - Math.round(b.y / GRID_STRIDE_Y);
    if (Math.abs(rowDiff) > 0) return rowDiff;
    return a.x - b.x;
  });

  const frameDeltas = new Map<string, { dx: number; dy: number }>();

  const updatedFrames = sorted.map((f, index) => {
    const col = index % colsCount;
    const row = Math.floor(index / colsCount);
    const targetX = col * GRID_STRIDE_X;
    const targetY = row * GRID_STRIDE_Y;

    frameDeltas.set(f.id, {
      dx: targetX - f.x,
      dy: targetY - f.y,
    });

    return {
      ...f,
      x: targetX,
      y: targetY,
    };
  });

  // Shift groups that belong to each frame by its exact delta
  const updatedGroups = groups.map((g) => {
    // Find matching frame
    const matched = frames.find((f) => {
      return (
        g.x >= f.x - 50 &&
        g.x <= f.x + GRID_PHONE_W + 50 &&
        g.y >= f.y - 100 &&
        g.y <= f.y + (f.h ?? GRID_PHONE_H) + 100
      );
    });

    if (matched && frameDeltas.has(matched.id)) {
      const delta = frameDeltas.get(matched.id)!;
      return {
        ...g,
        x: Math.round(g.x + delta.dx),
        y: Math.round(g.y + delta.dy),
      };
    }
    return g;
  });

  return { frames: updatedFrames, groups: updatedGroups };
}

/**
 * Shifts all frames located on a specific row horizontally by a number of columns.
 * For example: shift Row 0 left by 1 column (-1) to close an empty gap at Column 0.
 */
export function shiftRowHorizontal(
  frames: Frame[],
  groups: Group[],
  rowY: number,
  deltaCols: number
): { frames: Frame[]; groups: Group[]; affectedCount: number } {
  const deltaX = deltaCols * GRID_STRIDE_X;
  const targetFrameIds = new Set<string>();

  const updatedFrames = frames.map((f) => {
    if (Math.abs(f.y - rowY) < 120) {
      targetFrameIds.add(f.id);
      return { ...f, x: Math.round(f.x + deltaX) };
    }
    return f;
  });

  if (targetFrameIds.size === 0) {
    return { frames, groups, affectedCount: 0 };
  }

  const updatedGroups = groups.map((g) => {
    // Check if group is on one of the target frames
    const belongsToRow = frames.some(
      (f) =>
        targetFrameIds.has(f.id) &&
        g.x >= f.x - 30 &&
        g.x <= f.x + GRID_PHONE_W + 30 &&
        g.y >= f.y - 80 &&
        g.y <= f.y + (f.h ?? GRID_PHONE_H) + 80
    );

    if (belongsToRow) {
      return { ...g, x: Math.round(g.x + deltaX) };
    }
    return g;
  });

  return {
    frames: updatedFrames,
    groups: updatedGroups,
    affectedCount: targetFrameIds.size,
  };
}
