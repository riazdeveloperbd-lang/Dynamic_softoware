import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export interface ExistingSectionStyleOverride {
  // Dimensions
  width?: string; // e.g. '100%', '90%', '75%', '50%', 'auto', or '240px'
  height?: string; // e.g. 'auto', '60px', '100px', '140px', '200px'
  minHeight?: number;
  // Margin (All or Individual Top / Right / Bottom / Left)
  margin?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  // Padding (All or Individual Top / Right / Bottom / Left)
  padding?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  // Background & Surface
  backgroundColor?: string;
  backgroundGradient?: string;
  // Border & Radius
  borderRadius?: number;
  borderWidth?: number;
  borderStyle?: 'none' | 'solid' | 'dashed' | 'dotted';
  borderColor?: string;
  // Shadow & Opacity
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner';
  opacity?: number; // 10 - 100
  // Typography & Alignment
  textColor?: string;
  fontSizePx?: number;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
  letterSpacing?: number;
  lineHeight?: number;
  // Data / Text Override for Native Screen Sections
  textContentOverride?: string;
}

export interface ReorderableScreenContentProps {
  screenKey: string;
  screenStyleOverride?: ExistingSectionStyleOverride;
  isScreenSelected?: boolean;
  onSelectScreenRoot?: () => void;
  droppedItems?: Array<{
    instanceId: string;
    node: React.ReactNode;
  }>;
  onDropNewLibraryItemAtPosition?: (libraryItemId: string, insertBeforeSecId: string | null) => void;
  lastInsertedTargetSecId?: string | null;
  sectionStyleOverrides?: Record<string, ExistingSectionStyleOverride>;
  selectedNativeSectionId?: string | null;
  onSelectNativeSection?: (secId: string, detectedText?: string) => void;
  children: React.ReactNode;
}

const SHADOW_CSS_MAP: Record<string, string> = {
  none: 'none',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 8px -1px rgba(0, 0, 0, 0.14), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 20px -3px rgba(0, 0, 0, 0.18), 0 4px 6px -4px rgba(0, 0, 0, 0.12)',
  xl: '0 20px 28px -5px rgba(0, 0, 0, 0.24), 0 8px 10px -6px rgba(0, 0, 0, 0.14)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.38)',
  inner: 'inset 0 2px 6px 0 rgba(0, 0, 0, 0.18)',
};

/**
 * Renders dropped components/elements inside the exact same flex container as the screen's
 * native sections via React Portals so you can:
 * 1. Drag a new Component/Element from the sidebar and drop it into ANY gap or between ANY existing sections.
 * 2. Drag any dropped component OR any existing screen section up/down to any position on the screen.
 * 3. Click any existing screen section to customize its padding, border radius, and shadow in real time.
 */
export const ReorderableScreenContent: React.FC<ReorderableScreenContentProps> = ({
  screenKey,
  screenStyleOverride,
  isScreenSelected,
  onSelectScreenRoot,
  droppedItems = [],
  onDropNewLibraryItemAtPosition,
  lastInsertedTargetSecId,
  sectionStyleOverrides = {},
  selectedNativeSectionId,
  onSelectNativeSection,
  children,
}) => {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [sectionParentEl, setSectionParentEl] = useState<HTMLElement | null>(null);
  const [savedOrders, setSavedOrders] = useState<Record<string, string[]>>({});

  // Keep latest callbacks in refs so event listeners never cause useEffect dependency churn
  const onDropNewLibraryItemAtPositionRef = useRef(onDropNewLibraryItemAtPosition);
  onDropNewLibraryItemAtPositionRef.current = onDropNewLibraryItemAtPosition;

  const onSelectNativeSectionRef = useRef(onSelectNativeSection);
  onSelectNativeSectionRef.current = onSelectNativeSection;

  const onSelectScreenRootRef = useRef(onSelectScreenRoot);
  onSelectScreenRootRef.current = onSelectScreenRoot;

  // Locate the main flex/grid container of the rendered screen so portals mount directly as siblings of existing sections
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const contentRoot = host.querySelector('[data-screen-root="true"]') as HTMLElement | null;
    if (!contentRoot) return;

    let targetParent: HTMLElement = contentRoot;
    if (
      contentRoot.children.length === 1 &&
      contentRoot.firstElementChild instanceof HTMLElement &&
      contentRoot.firstElementChild.children.length >= 1
    ) {
      targetParent = contentRoot.firstElementChild;
    }
    setSectionParentEl((prev) => (prev === targetParent ? prev : targetParent));
  }, [screenKey]);

  // Apply real-time Screen-Level Style Overrides (background, gradient, padding, margin, border, borderRadius, shadow, opacity, typography) directly to the screen's root container
  useEffect(() => {
    if (!sectionParentEl) return;
    const st = screenStyleOverride;
    if (st) {
      if (st.width !== undefined) {
        sectionParentEl.style.width = st.width || '';
      }
      if (st.height !== undefined) {
        sectionParentEl.style.height = st.height || '';
      }
      if (st.minHeight !== undefined) {
        sectionParentEl.style.minHeight = st.minHeight > 0 ? `${st.minHeight}px` : '';
      }

      if (st.margin !== undefined) {
        sectionParentEl.style.margin = `${st.margin}px`;
      }
      if (st.marginTop !== undefined) {
        sectionParentEl.style.marginTop = `${st.marginTop}px`;
      }
      if (st.marginRight !== undefined) {
        sectionParentEl.style.marginRight = `${st.marginRight}px`;
      }
      if (st.marginBottom !== undefined) {
        sectionParentEl.style.marginBottom = `${st.marginBottom}px`;
      }
      if (st.marginLeft !== undefined) {
        sectionParentEl.style.marginLeft = `${st.marginLeft}px`;
      }

      if (st.padding !== undefined) {
        sectionParentEl.style.padding = `${st.padding}px`;
      }
      if (st.paddingTop !== undefined) {
        sectionParentEl.style.paddingTop = `${st.paddingTop}px`;
      }
      if (st.paddingRight !== undefined) {
        sectionParentEl.style.paddingRight = `${st.paddingRight}px`;
      }
      if (st.paddingBottom !== undefined) {
        sectionParentEl.style.paddingBottom = `${st.paddingBottom}px`;
      }
      if (st.paddingLeft !== undefined) {
        sectionParentEl.style.paddingLeft = `${st.paddingLeft}px`;
      }

      if (st.backgroundGradient) {
        sectionParentEl.style.backgroundImage = st.backgroundGradient;
      } else if (st.backgroundColor !== undefined) {
        sectionParentEl.style.backgroundImage = '';
        sectionParentEl.style.backgroundColor = st.backgroundColor || '';
      }

      if (st.borderRadius !== undefined) {
        sectionParentEl.style.borderRadius = `${st.borderRadius}px`;
      }
      if (st.borderWidth !== undefined) {
        sectionParentEl.style.borderWidth = `${st.borderWidth}px`;
        sectionParentEl.style.borderStyle =
          st.borderStyle || (st.borderWidth > 0 ? 'solid' : 'none');
      }
      if (st.borderStyle !== undefined) {
        sectionParentEl.style.borderStyle = st.borderStyle;
      }
      if (st.borderColor !== undefined) {
        sectionParentEl.style.borderColor = st.borderColor || '';
      }

      if (st.shadow !== undefined) {
        sectionParentEl.style.boxShadow = SHADOW_CSS_MAP[st.shadow] || 'none';
      }
      if (st.opacity !== undefined) {
        sectionParentEl.style.opacity = String(st.opacity / 100);
      }

      if (st.textColor !== undefined) {
        sectionParentEl.style.color = st.textColor || '';
      }
      if (st.fontSizePx !== undefined) {
        sectionParentEl.style.fontSize = st.fontSizePx > 0 ? `${st.fontSizePx}px` : '';
      }
      if (st.fontWeight !== undefined) {
        sectionParentEl.style.fontWeight = st.fontWeight || '';
      }
      if (st.textAlign !== undefined) {
        sectionParentEl.style.textAlign = st.textAlign;
      }
      if (st.letterSpacing !== undefined) {
        sectionParentEl.style.letterSpacing = `${st.letterSpacing}px`;
      }
    } else {
      sectionParentEl.style.width = '';
      sectionParentEl.style.height = '';
      sectionParentEl.style.minHeight = '';
      sectionParentEl.style.margin = '';
      sectionParentEl.style.marginTop = '';
      sectionParentEl.style.marginRight = '';
      sectionParentEl.style.marginBottom = '';
      sectionParentEl.style.marginLeft = '';
      sectionParentEl.style.padding = '';
      sectionParentEl.style.paddingTop = '';
      sectionParentEl.style.paddingRight = '';
      sectionParentEl.style.paddingBottom = '';
      sectionParentEl.style.paddingLeft = '';
      sectionParentEl.style.backgroundImage = '';
      sectionParentEl.style.backgroundColor = '';
      sectionParentEl.style.borderRadius = '';
      sectionParentEl.style.borderWidth = '';
      sectionParentEl.style.borderStyle = '';
      sectionParentEl.style.borderColor = '';
      sectionParentEl.style.boxShadow = '';
      sectionParentEl.style.opacity = '';
      sectionParentEl.style.color = '';
      sectionParentEl.style.fontSize = '';
      sectionParentEl.style.fontWeight = '';
      sectionParentEl.style.textAlign = '';
      sectionParentEl.style.letterSpacing = '';
    }
  }, [sectionParentEl, screenStyleOverride, isScreenSelected]);

  // If a new item was dropped onto a specific gap / target section, splice it right before that section
  useEffect(() => {
    if (!lastInsertedTargetSecId || droppedItems.length === 0) return;
    const newest = droppedItems[droppedItems.length - 1];
    const newestDomId = `dropped_${newest.instanceId}`;
    const rootGroupKey = `${screenKey}_root`;

    setSavedOrders((prev) => {
      const existing = prev[rootGroupKey] || [];
      if (existing.includes(newestDomId)) return prev;
      const withoutNewest = existing.filter((id) => id !== newestDomId);
      const targetIdx = withoutNewest.indexOf(lastInsertedTargetSecId);
      if (targetIdx === -1) {
        return { ...prev, [rootGroupKey]: [...withoutNewest, newestDomId] };
      }
      const next = [...withoutNewest];
      next.splice(targetIdx, 0, newestDomId);
      return { ...prev, [rootGroupKey]: next };
    });
  }, [lastInsertedTargetSecId, droppedItems.length, screenKey]);

  // Apply real-time style overrides (width, height, margin top/right/bottom/left, padding top/right/bottom/left, background, border, borderRadius, shadow, typography, opacity) to any native screen sections
  useEffect(() => {
    if (!sectionParentEl) return;
    const allWithSecId = Array.from(
      sectionParentEl.querySelectorAll('[data-reorder-sec-id]')
    ) as HTMLElement[];
    if (sectionParentEl.dataset.reorderSecId) {
      allWithSecId.push(sectionParentEl);
    }

    allWithSecId.forEach((el) => {
      const secId = el.dataset.reorderSecId;
      if (!secId || secId.startsWith('dropped_')) return;

      const st = sectionStyleOverrides[secId];
      if (st) {
        // Dimensions
        if (st.width !== undefined) {
          el.style.width = st.width || '';
        }
        if (st.height !== undefined) {
          el.style.height = st.height || '';
        }
        if (st.minHeight !== undefined) {
          el.style.minHeight = st.minHeight > 0 ? `${st.minHeight}px` : '';
        }

        // Margin (All + Top, Right, Bottom, Left)
        if (st.margin !== undefined) {
          el.style.margin = `${st.margin}px`;
        }
        if (st.marginTop !== undefined) {
          el.style.marginTop = `${st.marginTop}px`;
        }
        if (st.marginRight !== undefined) {
          el.style.marginRight = `${st.marginRight}px`;
        }
        if (st.marginBottom !== undefined) {
          el.style.marginBottom = `${st.marginBottom}px`;
        }
        if (st.marginLeft !== undefined) {
          el.style.marginLeft = `${st.marginLeft}px`;
        }

        // Padding (All + Top, Right, Bottom, Left)
        if (st.padding !== undefined) {
          el.style.padding = `${st.padding}px`;
        }
        if (st.paddingTop !== undefined) {
          el.style.paddingTop = `${st.paddingTop}px`;
        }
        if (st.paddingRight !== undefined) {
          el.style.paddingRight = `${st.paddingRight}px`;
        }
        if (st.paddingBottom !== undefined) {
          el.style.paddingBottom = `${st.paddingBottom}px`;
        }
        if (st.paddingLeft !== undefined) {
          el.style.paddingLeft = `${st.paddingLeft}px`;
        }

        // Background & Gradient
        if (st.backgroundGradient) {
          el.style.backgroundImage = st.backgroundGradient;
        } else if (st.backgroundColor !== undefined) {
          el.style.backgroundImage = '';
          el.style.backgroundColor = st.backgroundColor || '';
        }

        // Border & Border Radius
        if (st.borderRadius !== undefined) {
          el.style.borderRadius = `${st.borderRadius}px`;
        }
        if (st.borderWidth !== undefined) {
          el.style.borderWidth = `${st.borderWidth}px`;
          el.style.borderStyle = st.borderStyle || (st.borderWidth > 0 ? 'solid' : 'none');
        }
        if (st.borderStyle !== undefined) {
          el.style.borderStyle = st.borderStyle;
        }
        if (st.borderColor !== undefined) {
          el.style.borderColor = st.borderColor || '';
        }

        // Shadow & Opacity
        if (st.shadow !== undefined) {
          el.style.boxShadow = SHADOW_CSS_MAP[st.shadow] || 'none';
        }
        if (st.opacity !== undefined) {
          el.style.opacity = String(st.opacity / 100);
        }

        // Typography & Alignment
        if (st.textColor !== undefined) {
          el.style.color = st.textColor || '';
        }
        if (st.fontSizePx !== undefined) {
          el.style.fontSize = st.fontSizePx > 0 ? `${st.fontSizePx}px` : '';
        }
        if (st.fontWeight !== undefined) {
          el.style.fontWeight = st.fontWeight || '';
        }
        if (st.textAlign !== undefined) {
          el.style.textAlign = st.textAlign;
        }
        if (st.letterSpacing !== undefined) {
          el.style.letterSpacing = `${st.letterSpacing}px`;
        }
        if (st.lineHeight !== undefined) {
          el.style.lineHeight = String(st.lineHeight);
        }

        // Live Primary Heading / Text Override inside native section
        if (st.textContentOverride !== undefined && st.textContentOverride.trim() !== '') {
          const firstHeadingOrText =
            (el.querySelector('h1, h2, h3, h4, p, span, div') as HTMLElement | null) || el;
          if (firstHeadingOrText && firstHeadingOrText.children.length === 0) {
            firstHeadingOrText.textContent = st.textContentOverride;
          }
        }
      }

      if (selectedNativeSectionId === secId) {
        el.style.outline = '2px solid #6366F1';
        el.style.outlineOffset = '2px';
      } else {
        el.style.outline = '';
        el.style.outlineOffset = '';
      }
    });
  }, [sectionStyleOverrides, sectionParentEl, selectedNativeSectionId, droppedItems.length]);

  // Attach unified drag-and-drop reordering + library drop-in-gap insertion
  useEffect(() => {
    if (!sectionParentEl) return;

    const attachReorderableGroup = (
      parentContainer: HTMLElement,
      groupKey: string,
      isRootContainer: boolean
    ) => {
      const childrenEls = Array.from(parentContainer.children).filter(
        (el): el is HTMLElement =>
          el instanceof HTMLElement &&
          window.getComputedStyle(el).position !== 'absolute' &&
          window.getComputedStyle(el).position !== 'fixed'
      );
      if (childrenEls.length === 0) return () => {};

      const parentComputed = window.getComputedStyle(parentContainer);
      if (parentComputed.display !== 'flex' && parentComputed.display !== 'grid') {
        parentContainer.style.display = 'flex';
        parentContainer.style.flexDirection = 'column';
      }

      let nativeCounter = 0;
      childrenEls.forEach((el) => {
        if (!el.dataset.reorderSecId) {
          el.dataset.reorderSecId = `${groupKey}_sec_${nativeCounter}`;
        }
        if (!el.dataset.reorderSecId.startsWith('dropped_')) {
          nativeCounter++;
        }
        el.draggable = true;
        el.style.cursor = 'grab';
      });

      // When custom components/elements are dropped onto a screen (or sections are reordered),
      // neutralize `my-auto` / `justify-between` vertical traps so dropped items can be placed
      // cleanly into any gap or between any sections (like between the header and the center card).
      if (isRootContainer && (droppedItems.length > 0 || (savedOrders[groupKey] && savedOrders[groupKey].length > 0))) {
        parentContainer.style.justifyContent = 'flex-start';
        parentContainer.style.gap = '10px';
        childrenEls.forEach((el) => {
          if (el.classList.contains('my-auto')) {
            el.style.marginTop = '8px';
            el.style.marginBottom = '8px';
          }
          if (el.classList.contains('flex-1') && !el.dataset.reorderSecId?.startsWith('dropped_')) {
            el.style.flex = '0 0 auto';
          }
        });
      }

      const currentOrderIds = (() => {
        const saved = savedOrders[groupKey];
        const presentIds = childrenEls.map((el) => el.dataset.reorderSecId!);
        if (!saved || saved.length === 0) return presentIds;
        const filtered = saved.filter((id) => presentIds.includes(id));
        const missing = presentIds.filter((id) => !filtered.includes(id));
        return [...filtered, ...missing];
      })();

      const applyVisualOrder = (orderList: string[]) => {
        childrenEls.forEach((el) => {
          const id = el.dataset.reorderSecId!;
          const pos = orderList.indexOf(id);
          el.style.order = String(pos === -1 ? 999 : pos);
        });
      };

      applyVisualOrder(currentOrderIds);

      let workingOrder = [...currentOrderIds];
      let activeDragged: HTMLElement | null = null;
      let dropGapIndicatorEl: HTMLElement | null = null;

      const clearGapHighlight = () => {
        if (dropGapIndicatorEl) {
          dropGapIndicatorEl.style.borderTop = '';
          dropGapIndicatorEl.style.borderBottom = '';
          dropGapIndicatorEl = null;
        }
      };

      // Find which child element is closest to the pointer Y (works even when hovering in an empty my-auto gap!)
      const findTargetChildAtY = (clientY: number) => {
        const orderedEls = [...childrenEls].sort(
          (a, b) => Number(a.style.order || 0) - Number(b.style.order || 0)
        );
        for (const child of orderedEls) {
          const rect = child.getBoundingClientRect();
          const midY = rect.top + rect.height / 2;
          if (clientY < midY) {
            return { element: child, position: 'before' as const, orderedEls };
          }
        }
        return {
          element: orderedEls[orderedEls.length - 1] || null,
          position: 'after' as const,
          orderedEls,
        };
      };

      const onClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;

        // If the user clicked directly on the screen's root canvas/background (and not a child section), select the Screen itself for styling!
        if (isRootContainer && target === parentContainer && onSelectScreenRootRef.current) {
          e.stopPropagation();
          onSelectScreenRootRef.current();
          return;
        }

        if (!onSelectNativeSectionRef.current) return;
        const directChild = childrenEls.find((c) => c === target || c.contains(target));
        if (!directChild || directChild.dataset.reorderSecId?.startsWith('dropped_')) return;

        // If an inner nested section was clicked, let the inner group handle selection
        if (
          target !== directChild &&
          target.closest('[data-reorder-sec-id]') &&
          target.closest('[data-reorder-sec-id]') !== directChild
        ) {
          return;
        }
        e.stopPropagation();
        onSelectNativeSectionRef.current(directChild.dataset.reorderSecId!);
      };

      const onDragStart = (e: DragEvent) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;
        const directChild = childrenEls.find((c) => c === target || c.contains(target));
        if (!directChild || directChild.parentElement !== parentContainer) return;

        if (
          target !== directChild &&
          target.closest('[draggable="true"]') &&
          target.closest('[draggable="true"]') !== directChild
        ) {
          return;
        }
        e.stopPropagation();
        activeDragged = directChild;
        directChild.style.opacity = '0.65';
        if (e.dataTransfer) {
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('text/plain', directChild.dataset.reorderSecId || '');
        }
      };

      const onDragOver = (e: DragEvent) => {
        const types = e.dataTransfer ? Array.from(e.dataTransfer.types) : [];
        const isLibraryDrag = types.includes('application/x-library-item');

        // Case A: User is dragging a new Component/Element from the sidebar into a specific gap or position on this screen!
        if (isLibraryDrag && isRootContainer && onDropNewLibraryItemAtPositionRef.current) {
          e.preventDefault();
          e.stopPropagation();
          clearGapHighlight();
          const hit = findTargetChildAtY(e.clientY);
          if (hit.element) {
            dropGapIndicatorEl = hit.element;
            if (hit.position === 'before') {
              hit.element.style.borderTop = '3px dashed #10B981';
            } else {
              hit.element.style.borderBottom = '3px dashed #10B981';
            }
          }
          return;
        }

        // Case B: User is dragging an existing section OR a dropped item up/down on this screen (including into gaps!)
        if (!activeDragged) return;
        e.preventDefault();
        e.stopPropagation();

        const hit = findTargetChildAtY(e.clientY);
        if (!hit.element || hit.element === activeDragged) return;

        const draggedId = activeDragged.dataset.reorderSecId!;
        const overId = hit.element.dataset.reorderSecId!;
        const withoutDragged = workingOrder.filter((id) => id !== draggedId);
        const overIdx = withoutDragged.indexOf(overId);
        if (overIdx === -1) return;

        const insertIdx = hit.position === 'after' ? overIdx + 1 : overIdx;
        const next = [...withoutDragged];
        next.splice(insertIdx, 0, draggedId);

        if (next.join(',') !== workingOrder.join(',')) {
          workingOrder = next;
          applyVisualOrder(workingOrder);
        }
      };

      const onDragLeave = () => {
        clearGapHighlight();
      };

      const persistOrder = () => {
        clearGapHighlight();
        if (!activeDragged) return;
        activeDragged.style.opacity = '1';
        const finalOrder = [...workingOrder];
        activeDragged = null;
        setSavedOrders((prev) => ({ ...prev, [groupKey]: finalOrder }));
      };

      const onDrop = (e: DragEvent) => {
        clearGapHighlight();
        const libItemId =
          e.dataTransfer?.getData('application/x-library-item') ||
          (e.dataTransfer?.getData('text/plain')?.startsWith('LIB:')
            ? e.dataTransfer.getData('text/plain').replace('LIB:', '')
            : '');

        if (libItemId && isRootContainer && onDropNewLibraryItemAtPositionRef.current) {
          e.preventDefault();
          e.stopPropagation();
          const hit = findTargetChildAtY(e.clientY);
          let insertBeforeSecId: string | null = null;
          if (hit.element) {
            if (hit.position === 'before') {
              insertBeforeSecId = hit.element.dataset.reorderSecId || null;
            } else {
              const idx = hit.orderedEls.indexOf(hit.element);
              const nextEl = hit.orderedEls[idx + 1];
              insertBeforeSecId = nextEl?.dataset.reorderSecId || null;
            }
          }
          // Save current working order first so the new item splices accurately
          setSavedOrders((prev) => ({ ...prev, [groupKey]: [...workingOrder] }));
          onDropNewLibraryItemAtPositionRef.current(libItemId, insertBeforeSecId);
          return;
        }

        if (!activeDragged) return;
        e.preventDefault();
        e.stopPropagation();
        persistOrder();
      };

      const onDragEnd = () => {
        persistOrder();
      };

      parentContainer.addEventListener('click', onClick);
      parentContainer.addEventListener('dragstart', onDragStart);
      parentContainer.addEventListener('dragover', onDragOver);
      parentContainer.addEventListener('dragleave', onDragLeave);
      parentContainer.addEventListener('drop', onDrop);
      parentContainer.addEventListener('dragend', onDragEnd);

      return () => {
        clearGapHighlight();
        parentContainer.removeEventListener('click', onClick);
        parentContainer.removeEventListener('dragstart', onDragStart);
        parentContainer.removeEventListener('dragover', onDragOver);
        parentContainer.removeEventListener('dragleave', onDragLeave);
        parentContainer.removeEventListener('drop', onDrop);
        parentContainer.removeEventListener('dragend', onDragEnd);
      };
    };

    const cleanups: Array<() => void> = [];
    cleanups.push(attachReorderableGroup(sectionParentEl, `${screenKey}_root`, true));

    const rawChildren = Array.from(sectionParentEl.children).filter(
      (el): el is HTMLElement =>
        el instanceof HTMLElement && !el.dataset.reorderSecId?.startsWith('dropped_')
    );
    rawChildren.forEach((childEl, cIdx) => {
      if (childEl.children.length > 1) {
        cleanups.push(attachReorderableGroup(childEl, `${screenKey}_sub_${cIdx}`, false));
      }
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [
    screenKey,
    sectionParentEl,
    droppedItems.length,
    savedOrders,
  ]);

  return (
    <div ref={hostRef} className="h-full w-full flex flex-col">
      <div data-screen-root="true" className="flex-1 w-full h-full">
        {children}
      </div>
      {/* Portal each dropped item directly into the screen's flex container so it can be placed in ANY gap or between ANY existing sections! */}
      {sectionParentEl &&
        droppedItems.map((item) =>
          createPortal(
            <div
              key={item.instanceId}
              data-reorder-sec-id={`dropped_${item.instanceId}`}
              className="my-1.5"
            >
              {item.node}
            </div>,
            sectionParentEl
          )
        )}
    </div>
  );
};




