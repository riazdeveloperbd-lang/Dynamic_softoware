import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import {
  Type,
  Link2,
  Image as ImageIcon,
  Upload,
  X,
  RotateCcw,
  ExternalLink,
  Palette,
  Sparkles,
  Eye,
  Edit3,
} from 'lucide-react';

export interface CanvaTextElementData {
  text: string;
  linkUrl?: string;
  linkTarget?: '_self' | '_blank';
  textColor?: string;
  bgColor?: string;
}

export interface CanvaImageElementData {
  src: string;
  alt?: string;
  linkUrl?: string;
  objectFit?: 'cover' | 'contain';
}

export interface DoctorCanvaStoreState {
  texts: Record<string, CanvaTextElementData>;
  images: Record<string, CanvaImageElementData>;
}

export interface SelectedCanvaElement {
  id: string;
  kind: 'text' | 'button' | 'image';
  defaultText?: string;
  defaultLinkUrl?: string;
  defaultImageSrc?: string;
  rect?: DOMRect;
}

interface DoctorCanvaContextValue {
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  selectedElement: SelectedCanvaElement | null;
  setSelectedElement: (el: SelectedCanvaElement | null) => void;
  getTextData: (id: string, defaultText: string, defaultLinkUrl?: string) => CanvaTextElementData;
  updateTextData: (id: string, patch: Partial<CanvaTextElementData>, fallbackText?: string) => void;
  getImageData: (id: string, defaultSrc: string, defaultAlt?: string) => CanvaImageElementData;
  updateImageData: (id: string, patch: Partial<CanvaImageElementData>, fallbackSrc?: string) => void;
  resetAllEdits: () => void;
  triggerFileUploadForSelectedImage: () => void;
  navigateOrFollowLink: (url?: string, target?: '_self' | '_blank', fallbackAction?: () => void) => void;
  onElementSelect?: (el: SelectedCanvaElement) => void;
}

const STORAGE_KEY = 'doctor_profile_canva_edits_v1';

const PRESET_MEDICAL_IMAGES = [
  {
    label: 'Dr. Portrait 1',
    url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1000&q=85',
  },
  {
    label: 'Dr. Portrait 2',
    url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=85',
  },
  {
    label: 'Male Specialist',
    url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&q=85',
  },
  {
    label: 'Medical Center',
    url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80',
  },
  {
    label: 'Consultation Room',
    url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80',
  },
  {
    label: 'Modern Clinic',
    url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1000&q=80',
  },
];

const QUICK_LINK_PRESETS = [
  { label: 'Home Top (#home)', url: '#home' },
  { label: 'About Section (#about)', url: '#about' },
  { label: 'Medical Services (#services)', url: '#services' },
  { label: 'Book Appointment (#contact)', url: '#contact' },
  { label: 'Call Clinic (tel:5551234567)', url: 'tel:5551234567' },
  { label: 'Emergency 911 (tel:911)', url: 'tel:911' },
  { label: 'Email Doctor (mailto:info@drsarahmitchell.com)', url: 'mailto:info@drsarahmitchell.com' },
];

const DoctorCanvaContext = createContext<DoctorCanvaContextValue | null>(null);

export const useDoctorCanva = (): DoctorCanvaContextValue => {
  const ctx = useContext(DoctorCanvaContext);
  if (!ctx) {
    return {
      isEditMode: true,
      setIsEditMode: () => {},
      selectedElement: null,
      setSelectedElement: () => {},
      getTextData: (_id, defaultText, defaultLinkUrl) => ({
        text: defaultText,
        linkUrl: defaultLinkUrl,
      }),
      updateTextData: () => {},
      getImageData: (_id, defaultSrc, defaultAlt) => ({
        src: defaultSrc,
        alt: defaultAlt,
      }),
      updateImageData: () => {},
      resetAllEdits: () => {},
      triggerFileUploadForSelectedImage: () => {},
      navigateOrFollowLink: (_u, _t, fb) => fb?.(),
    };
  }
  return ctx;
};

export const DoctorCanvaEditorProvider: React.FC<{
  children: React.ReactNode;
  initialEditMode?: boolean;
  viewportMode?: 'desktop' | 'tablet' | 'mobile';
  hideFloatingToolbar?: boolean;
  onElementSelect?: (el: SelectedCanvaElement) => void;
}> = ({
  children,
  initialEditMode = true,
  viewportMode = 'desktop',
  hideFloatingToolbar = false,
  onElementSelect,
}) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(initialEditMode);
  const [selectedElement, setSelectedElement] = useState<SelectedCanvaElement | null>(null);
  const [store, setStore] = useState<DoctorCanvaStoreState>(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          return JSON.parse(raw);
        }
      } catch {
        // ignore storage error
      }
    }
    return { texts: {}, images: {} };
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
      } catch {
        // ignore quota errors
      }
    }
  }, [store]);

  const getTextData = useCallback(
    (id: string, defaultText: string, defaultLinkUrl?: string): CanvaTextElementData => {
      const existing = store.texts[id];
      return {
        text: existing?.text !== undefined ? existing.text : defaultText,
        linkUrl: existing?.linkUrl !== undefined ? existing.linkUrl : defaultLinkUrl,
        linkTarget: existing?.linkTarget || '_self',
        textColor: existing?.textColor,
        bgColor: existing?.bgColor,
      };
    },
    [store.texts]
  );

  const updateTextData = useCallback(
    (id: string, patch: Partial<CanvaTextElementData>, fallbackText = '') => {
      setStore((prev) => {
        const current = prev.texts[id] || { text: fallbackText };
        return {
          ...prev,
          texts: {
            ...prev.texts,
            [id]: {
              ...current,
              ...patch,
            },
          },
        };
      });
    },
    []
  );

  const getImageData = useCallback(
    (id: string, defaultSrc: string, defaultAlt?: string): CanvaImageElementData => {
      const existing = store.images[id];
      return {
        src: existing?.src || defaultSrc,
        alt: existing?.alt !== undefined ? existing.alt : defaultAlt,
        linkUrl: existing?.linkUrl,
        objectFit: existing?.objectFit || 'cover',
      };
    },
    [store.images]
  );

  const updateImageData = useCallback(
    (id: string, patch: Partial<CanvaImageElementData>, fallbackSrc = '') => {
      setStore((prev) => {
        const current = prev.images[id] || { src: fallbackSrc };
        return {
          ...prev,
          images: {
            ...prev.images,
            [id]: {
              ...current,
              ...patch,
            },
          },
        };
      });
    },
    []
  );

  const resetAllEdits = useCallback(() => {
    setStore({ texts: {}, images: {} });
    setSelectedElement(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const triggerFileUploadForSelectedImage = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedElement || selectedElement.kind !== 'image') return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateImageData(
          selectedElement.id,
          { src: reader.result },
          selectedElement.defaultImageSrc || ''
        );
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const navigateOrFollowLink = useCallback(
    (url?: string, target: '_self' | '_blank' = '_self', fallbackAction?: () => void) => {
      if (!url) {
        fallbackAction?.();
        return;
      }
      if (url.startsWith('#')) {
        const sectionId = url.slice(1);
        if (sectionId === 'home' || sectionId === '') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      if (url.startsWith('tel:') || url.startsWith('mailto:')) {
        window.location.href = url;
        return;
      }
      if (target === '_blank') {
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.click();
      } else {
        window.location.href = url;
      }
    },
    []
  );

  return (
    <DoctorCanvaContext.Provider
      value={{
        isEditMode,
        setIsEditMode,
        selectedElement,
        setSelectedElement,
        getTextData,
        updateTextData,
        getImageData,
        updateImageData,
        resetAllEdits,
        triggerFileUploadForSelectedImage,
        navigateOrFollowLink,
        onElementSelect,
      }}
    >
      {/* Hidden File Input for Local Image Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {!hideFloatingToolbar && (
        <div className="sticky top-2 z-40 px-2 sm:px-4 pointer-events-none flex flex-col items-center gap-2">
          <div className="pointer-events-auto max-w-full flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-2xl sm:rounded-full bg-[#1D2B6B] text-white shadow-xl border border-white/15 text-[11px] sm:text-xs">
            <Sparkles size={13} className="text-[#48B89F] flex-shrink-0" />
            <span className="font-extrabold tracking-tight">Canva Live Editor:</span>
            <button
              type="button"
              onClick={() => {
                setIsEditMode(true);
              }}
              className={`px-2.5 py-1 rounded-full font-bold flex items-center gap-1 transition cursor-pointer ${
                isEditMode
                  ? 'bg-[#48B89F] text-white shadow-xs'
                  : 'text-white/75 hover:text-white'
              }`}
            >
              <Edit3 size={11} />
              <span>{viewportMode === 'mobile' ? 'Edit' : 'Edit Any Text / Link / Image'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditMode(false);
                setSelectedElement(null);
              }}
              className={`px-2.5 py-1 rounded-full font-bold flex items-center gap-1 transition cursor-pointer ${
                !isEditMode
                  ? 'bg-[#48B89F] text-white shadow-xs'
                  : 'text-white/75 hover:text-white'
              }`}
            >
              <Eye size={11} />
              <span>{viewportMode === 'mobile' ? 'Preview' : 'Preview & Test Links'}</span>
            </button>
            <button
              type="button"
              onClick={resetAllEdits}
              title="Reset all Canva edits to original"
              className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition cursor-pointer"
            >
              <RotateCcw size={12} />
            </button>
          </div>
        </div>
      )}

      {children}
    </DoctorCanvaContext.Provider>
  );
};

/* ============================================================================
 * <DoctorCanvaDrawerInspector /> — Canva Live Editor Select Option & Modal
 * Content rendered inside the Right-Side Drawer Modal
 * ============================================================================ */
export const DoctorCanvaDrawerInspector: React.FC<{
  primaryColor?: string;
}> = ({ primaryColor = '#1D2B6B' }) => {
  const {
    isEditMode,
    setIsEditMode,
    selectedElement,
    setSelectedElement,
    getTextData,
    updateTextData,
    getImageData,
    updateImageData,
    resetAllEdits,
    triggerFileUploadForSelectedImage,
    navigateOrFollowLink,
  } = useDoctorCanva();

  const activeTextData =
    selectedElement && (selectedElement.kind === 'text' || selectedElement.kind === 'button')
      ? getTextData(
          selectedElement.id,
          selectedElement.defaultText || '',
          selectedElement.defaultLinkUrl
        )
      : null;

  const activeImageData =
    selectedElement && selectedElement.kind === 'image'
      ? getImageData(selectedElement.id, selectedElement.defaultImageSrc || '')
      : null;

  return (
    <div className="rounded-2xl border-2 border-[#48B89F]/80 bg-neutral-50/90 dark:bg-[#161B29] p-3.5 space-y-3 shadow-sm">
      {/* Canva Live Editor Select Mode Bar inside Right Drawer */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Sparkles size={14} className="text-[#48B89F] flex-shrink-0" />
          <span className="text-xs font-extrabold text-neutral-900 dark:text-white">
            Canva Live Editor
          </span>
        </div>
        <button
          type="button"
          onClick={resetAllEdits}
          title="Reset all Canva edits to original"
          className="px-2 py-1 rounded-lg border border-neutral-200 dark:border-neutral-700 text-[10px] font-bold text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw size={11} />
          <span>Reset</span>
        </button>
      </div>

      {/* Mode Switcher: Edit Any Text / Link / Image vs Preview & Test Links */}
      <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-neutral-200/75 dark:bg-neutral-800">
        <button
          type="button"
          onClick={() => setIsEditMode(true)}
          className={`py-2 px-2 rounded-lg text-[11px] font-extrabold flex items-center justify-center gap-1.5 transition cursor-pointer ${
            isEditMode
              ? 'bg-[#48B89F] text-white shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
          }`}
        >
          <Edit3 size={12} />
          <span>Edit Text / Link / Img</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setIsEditMode(false);
            setSelectedElement(null);
          }}
          className={`py-2 px-2 rounded-lg text-[11px] font-extrabold flex items-center justify-center gap-1.5 transition cursor-pointer ${
            !isEditMode
              ? 'text-white shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
          }`}
          style={!isEditMode ? { backgroundColor: primaryColor } : undefined}
        >
          <Eye size={12} />
          <span>Preview &amp; Test Links</span>
        </button>
      </div>

      {/* Selected Element Modal Content inside Right Drawer */}
      {isEditMode && selectedElement ? (
        <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#48B89F]/15 text-[#48B89F]">
              {selectedElement.kind === 'image'
                ? 'Selected Image Element'
                : selectedElement.kind === 'button'
                ? 'Selected Button & Link'
                : 'Selected Text & Link'}
            </span>
            <button
              type="button"
              onClick={() => setSelectedElement(null)}
              className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white cursor-pointer"
              title="Deselect element"
            >
              <X size={14} />
            </button>
          </div>

          {/* TEXT OR BUTTON CONTROLS */}
          {(selectedElement.kind === 'text' || selectedElement.kind === 'button') &&
            activeTextData && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1 flex items-center gap-1">
                    <Type size={11} />
                    <span>Text Content</span>
                  </label>
                  <input
                    type="text"
                    value={activeTextData.text}
                    onChange={(e) =>
                      updateTextData(
                        selectedElement.id,
                        { text: e.target.value },
                        selectedElement.defaultText
                      )
                    }
                    placeholder="Enter text..."
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#0F1523] text-xs font-semibold focus:outline-none focus:border-[#48B89F]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1 flex items-center gap-1">
                    <Link2 size={11} />
                    <span>Link URL (https://, #section, tel:, mailto:)</span>
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={activeTextData.linkUrl || ''}
                      onChange={(e) =>
                        updateTextData(
                          selectedElement.id,
                          { linkUrl: e.target.value },
                          selectedElement.defaultText
                        )
                      }
                      placeholder="e.g. #contact or https://example.com"
                      className="flex-1 px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#0F1523] text-xs font-mono focus:outline-none focus:border-[#48B89F]"
                    />
                    {activeTextData.linkUrl && (
                      <button
                        type="button"
                        onClick={() =>
                          navigateOrFollowLink(
                            activeTextData.linkUrl,
                            activeTextData.linkTarget || '_self'
                          )
                        }
                        title="Test / Go to Link Now"
                        className="px-2.5 py-2 rounded-xl bg-[#1D2B6B] text-white text-xs font-bold flex items-center gap-1 hover:opacity-95 cursor-pointer flex-shrink-0"
                      >
                        <ExternalLink size={12} />
                        <span>Go</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1 flex items-center gap-1">
                      <Palette size={11} />
                      <span>Text Color</span>
                    </label>
                    <input
                      type="color"
                      value={activeTextData.textColor || '#1D2B6B'}
                      onChange={(e) =>
                        updateTextData(
                          selectedElement.id,
                          { textColor: e.target.value },
                          selectedElement.defaultText
                        )
                      }
                      className="w-full h-8 rounded-lg cursor-pointer border border-neutral-200"
                    />
                  </div>
                  {selectedElement.kind === 'button' && (
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
                        Button Fill
                      </label>
                      <input
                        type="color"
                        value={activeTextData.bgColor || '#1D2B6B'}
                        onChange={(e) =>
                          updateTextData(
                            selectedElement.id,
                            { bgColor: e.target.value },
                            selectedElement.defaultText
                          )
                        }
                        className="w-full h-8 rounded-lg cursor-pointer border border-neutral-200"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <span className="block text-[10px] font-extrabold uppercase text-neutral-400">
                    Quick Links:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_LINK_PRESETS.map((preset) => (
                      <button
                        key={preset.url}
                        type="button"
                        onClick={() =>
                          updateTextData(
                            selectedElement.id,
                            { linkUrl: preset.url },
                            selectedElement.defaultText
                          )
                        }
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition cursor-pointer ${
                          activeTextData.linkUrl === preset.url
                            ? 'bg-[#48B89F] text-white border-[#48B89F]'
                            : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:border-[#48B89F]'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                  <label className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-neutral-600 dark:text-neutral-300 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={activeTextData.linkTarget === '_blank'}
                      onChange={(e) =>
                        updateTextData(
                          selectedElement.id,
                          { linkTarget: e.target.checked ? '_blank' : '_self' },
                          selectedElement.defaultText
                        )
                      }
                    />
                    <span>Open link in new tab</span>
                  </label>
                </div>
              </div>
            )}

          {/* IMAGE CONTROLS */}
          {selectedElement.kind === 'image' && activeImageData && (
            <div className="space-y-3">
              <button
                type="button"
                onClick={triggerFileUploadForSelectedImage}
                className="w-full py-2.5 px-4 rounded-xl bg-[#48B89F] text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-sm hover:opacity-95 transition cursor-pointer"
              >
                <Upload size={14} />
                <span>Upload Image From Device</span>
              </button>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1 flex items-center gap-1">
                  <ImageIcon size={11} />
                  <span>Or Paste Image URL</span>
                </label>
                <input
                  type="text"
                  value={activeImageData.src}
                  onChange={(e) =>
                    updateImageData(
                      selectedElement.id,
                      { src: e.target.value },
                      selectedElement.defaultImageSrc
                    )
                  }
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#0F1523] text-xs font-mono focus:outline-none focus:border-[#48B89F]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1 flex items-center gap-1">
                  <Link2 size={11} />
                  <span>Image Click Link</span>
                </label>
                <input
                  type="text"
                  value={activeImageData.linkUrl || ''}
                  onChange={(e) =>
                    updateImageData(
                      selectedElement.id,
                      { linkUrl: e.target.value },
                      selectedElement.defaultImageSrc
                    )
                  }
                  placeholder="#contact or https://..."
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#0F1523] text-xs font-mono focus:outline-none focus:border-[#48B89F]"
                />
              </div>

              <div className="space-y-1.5">
                <span className="block text-[10px] font-extrabold uppercase text-neutral-400">
                  Medical Photo Presets:
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {PRESET_MEDICAL_IMAGES.map((img) => (
                    <button
                      key={img.url}
                      type="button"
                      onClick={() =>
                        updateImageData(
                          selectedElement.id,
                          { src: img.url },
                          selectedElement.defaultImageSrc
                        )
                      }
                      className={`flex items-center gap-1.5 p-1 pr-2 rounded-xl border text-[10px] font-bold transition cursor-pointer ${
                        activeImageData.src === img.url
                          ? 'border-[#48B89F] bg-[#48B89F]/15 text-[#48B89F]'
                          : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-[#48B89F]'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.label}
                        className="w-6 h-6 rounded-lg object-cover flex-shrink-0"
                      />
                      <span className="truncate">{img.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-[11px] text-neutral-500 dark:text-neutral-400 pt-1">
          {isEditMode
            ? 'Click any text, button, or photo on the website canvas to edit its text, attach a link URL, or upload a new image here.'
            : 'Preview Mode active — click any button or link on the website to test navigation.'}
        </div>
      )}
    </div>
  );
};

/* ============================================================================
 * 1. <EditableText /> — Click anywhere to edit text inline + attach a Link URL
 * ============================================================================ */
export interface EditableTextProps {
  id: string;
  defaultText: string;
  defaultLinkUrl?: string;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'div';
  className?: string;
  style?: React.CSSProperties;
}

export const EditableText: React.FC<EditableTextProps> = ({
  id,
  defaultText,
  defaultLinkUrl,
  as: Tag = 'span',
  className = '',
  style,
}) => {
  const {
    isEditMode,
    selectedElement,
    setSelectedElement,
    getTextData,
    updateTextData,
    navigateOrFollowLink,
    onElementSelect,
  } = useDoctorCanva();

  const data = getTextData(id, defaultText, defaultLinkUrl);
  const isSelected = selectedElement?.id === id;

  const combinedStyle: React.CSSProperties = {
    ...style,
    ...(data.textColor ? { color: data.textColor } : {}),
  };

  if (!isEditMode) {
    if (data.linkUrl) {
      return (
        <a
          href={data.linkUrl}
          onClick={(e) => {
            e.preventDefault();
            navigateOrFollowLink(data.linkUrl, data.linkTarget || '_self');
          }}
          style={combinedStyle}
          className={`${className} underline decoration-[#48B89F]/60 underline-offset-4 hover:opacity-85 transition cursor-pointer`}
        >
          {data.text}
        </a>
      );
    }
    return (
      <Tag style={combinedStyle} className={className}>
        {data.text}
      </Tag>
    );
  }

  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        const el: SelectedCanvaElement = {
          id,
          kind: 'text',
          defaultText,
          defaultLinkUrl,
        };
        setSelectedElement(el);
        onElementSelect?.(el);
      }}
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        const nextText = e.currentTarget.innerText;
        if (nextText !== data.text) {
          updateTextData(id, { text: nextText }, defaultText);
        }
      }}
      style={combinedStyle}
      title={
        data.linkUrl
          ? `Click to edit text · Link: ${data.linkUrl}`
          : 'Click to edit text or add a link'
      }
      className={`${className} outline-none transition rounded-md ${
        isSelected
          ? 'ring-2 ring-[#48B89F] ring-offset-2 bg-[#48B89F]/5 px-1 -mx-1'
          : 'hover:ring-1 hover:ring-dashed hover:ring-[#48B89F]/70'
      }`}
    >
      {data.text}
      {data.linkUrl && (
        <span
          contentEditable={false}
          onClick={(e) => {
            e.stopPropagation();
            navigateOrFollowLink(data.linkUrl, data.linkTarget || '_self');
          }}
          title={`Go to link: ${data.linkUrl}`}
          className="inline-flex items-center gap-0.5 ml-1.5 px-1.5 py-0.5 rounded bg-[#48B89F]/20 text-[#48B89F] text-[10px] font-bold align-middle cursor-pointer hover:bg-[#48B89F] hover:text-white transition"
        >
          <Link2 size={9} />
        </span>
      )}
    </Tag>
  );
};

/* ============================================================================
 * 2. <EditableButton /> — Click to edit button label + attach/follow Link URL
 * ============================================================================ */
export interface EditableButtonProps {
  id: string;
  defaultText: string;
  defaultLinkUrl?: string;
  className?: string;
  style?: React.CSSProperties;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClickFallback?: () => void;
}

export const EditableButton: React.FC<EditableButtonProps> = ({
  id,
  defaultText,
  defaultLinkUrl,
  className = '',
  style,
  iconLeft,
  iconRight,
  onClickFallback,
}) => {
  const {
    isEditMode,
    selectedElement,
    setSelectedElement,
    getTextData,
    updateTextData,
    navigateOrFollowLink,
    onElementSelect,
  } = useDoctorCanva();

  const data = getTextData(id, defaultText, defaultLinkUrl);
  const isSelected = selectedElement?.id === id;

  const combinedStyle: React.CSSProperties = {
    ...style,
    ...(data.textColor ? { color: data.textColor } : {}),
    ...(data.bgColor ? { backgroundColor: data.bgColor } : {}),
  };

  if (!isEditMode) {
    return (
      <button
        type="button"
        onClick={() =>
          navigateOrFollowLink(data.linkUrl, data.linkTarget || '_self', onClickFallback)
        }
        style={combinedStyle}
        className={className}
      >
        {iconLeft}
        <span>{data.text}</span>
        {iconRight}
      </button>
    );
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        const el: SelectedCanvaElement = {
          id,
          kind: 'button',
          defaultText,
          defaultLinkUrl,
        };
        setSelectedElement(el);
        onElementSelect?.(el);
      }}
      style={combinedStyle}
      className={`${className} relative group/btn ${
        isSelected
          ? 'ring-2 ring-[#48B89F] ring-offset-2'
          : 'hover:ring-2 hover:ring-dashed hover:ring-[#48B89F]'
      }`}
    >
      {iconLeft}
      <span
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          const nextText = e.currentTarget.innerText;
          if (nextText !== data.text) {
            updateTextData(id, { text: nextText }, defaultText);
          }
        }}
        className="outline-none"
      >
        {data.text}
      </span>
      {iconRight}

      {data.linkUrl && (
        <span
          role="button"
          tabIndex={0}
          contentEditable={false}
          onClick={(e) => {
            e.stopPropagation();
            navigateOrFollowLink(data.linkUrl, data.linkTarget || '_self', onClickFallback);
          }}
          title={`Follow link: ${data.linkUrl}`}
          className="ml-1.5 p-1 rounded-full bg-black/25 hover:bg-black/45 text-white transition cursor-pointer inline-flex items-center justify-center"
        >
          <ExternalLink size={11} />
        </span>
      )}
    </div>
  );
};

/* ============================================================================
 * 3. <EditableImage /> — Click to select image, upload from device, or paste URL
 * ============================================================================ */
export interface EditableImageProps {
  id: string;
  defaultSrc: string;
  alt?: string;
  className?: string;
  wrapperClassName?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  id,
  defaultSrc,
  alt = '',
  className = 'w-full h-full object-cover',
  wrapperClassName = 'relative w-full h-full',
}) => {
  const {
    isEditMode,
    selectedElement,
    setSelectedElement,
    getImageData,
    updateImageData,
    navigateOrFollowLink,
    onElementSelect,
  } = useDoctorCanva();

  const localInputRef = useRef<HTMLInputElement | null>(null);
  const data = getImageData(id, defaultSrc, alt);
  const isSelected = selectedElement?.id === id;

  const handleLocalUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateImageData(id, { src: reader.result }, defaultSrc);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  if (!isEditMode) {
    return (
      <div
        onClick={() => {
          if (data.linkUrl) {
            navigateOrFollowLink(data.linkUrl, '_self');
          }
        }}
        className={`${wrapperClassName} ${data.linkUrl ? 'cursor-pointer' : ''}`}
      >
        <img src={data.src} alt={data.alt || alt} className={className} />
      </div>
    );
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        const el: SelectedCanvaElement = {
          id,
          kind: 'image',
          defaultImageSrc: defaultSrc,
        };
        setSelectedElement(el);
        onElementSelect?.(el);
      }}
      className={`${wrapperClassName} group/img cursor-pointer transition ${
        isSelected
          ? 'ring-4 ring-[#48B89F] ring-offset-2'
          : 'hover:ring-2 hover:ring-dashed hover:ring-[#48B89F]'
      }`}
    >
      <input
        ref={localInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleLocalUpload}
      />

      <img src={data.src} alt={data.alt || alt} className={className} />

      {/* Canva-Style Hover/Selected Overlay for Instant Image Upload or Replacement */}
      <div
        className={`absolute top-3 left-3 z-20 flex items-center gap-1.5 transition-opacity ${
          isSelected ? 'opacity-100' : 'opacity-0 group-hover/img:opacity-100'
        }`}
      >
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            const el: SelectedCanvaElement = {
              id,
              kind: 'image',
              defaultImageSrc: defaultSrc,
            };
            setSelectedElement(el);
            localInputRef.current?.click();
          }}
          className="px-3 py-1.5 rounded-xl bg-[#1D2B6B]/90 backdrop-blur-md text-white text-[11px] font-extrabold flex items-center gap-1.5 shadow-lg hover:bg-[#48B89F] transition cursor-pointer"
        >
          <Upload size={12} />
          <span>Upload Photo</span>
        </span>

        <span
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            const el: SelectedCanvaElement = {
              id,
              kind: 'image',
              defaultImageSrc: defaultSrc,
            };
            setSelectedElement(el);
            onElementSelect?.(el);
          }}
          className="px-2.5 py-1.5 rounded-xl bg-white/95 text-[#1D2B6B] text-[11px] font-extrabold flex items-center gap-1 shadow-lg hover:bg-white transition cursor-pointer"
        >
          <ImageIcon size={12} />
          <span>Change Image</span>
        </span>
      </div>
    </div>
  );
};
