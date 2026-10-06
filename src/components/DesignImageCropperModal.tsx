import React, { useState, useRef, useEffect } from 'react';
import {
  Crop,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Check,
  X,
  Smartphone,
  Square,
  Maximize2,
  Move,
} from 'lucide-react';

export interface DesignImageCropperModalProps {
  imageName: string;
  imageDataUrl: string;
  primaryColor?: string;
  queueCount?: number;
  onApplyCrop: (croppedDataUrl: string) => void;
  onSkipCrop: (originalDataUrl: string) => void;
  onCancel: () => void;
}

type AspectPreset = '9:16' | '3:4' | '1:1' | 'free';

export const DesignImageCropperModal: React.FC<DesignImageCropperModalProps> = ({
  imageName,
  imageDataUrl,
  primaryColor = '#4338CA',
  queueCount = 0,
  onApplyCrop,
  onSkipCrop,
  onCancel,
}) => {
  const [aspectPreset, setAspectPreset] = useState<AspectPreset>('9:16');
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Custom crop box percentages (used when aspectPreset === 'free' or for visual framing)
  const [cropBox, setCropBox] = useState({ x: 15, y: 6, width: 70, height: 88 });

  const imgRef = useRef<HTMLImageElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [imageDataUrl]);

  useEffect(() => {
    if (aspectPreset === '9:16') {
      setCropBox({ x: 22, y: 5, width: 56, height: 90 });
    } else if (aspectPreset === '3:4') {
      setCropBox({ x: 18, y: 10, width: 64, height: 80 });
    } else if (aspectPreset === '1:1') {
      setCropBox({ x: 18, y: 18, width: 64, height: 64 });
    } else {
      setCropBox({ x: 10, y: 10, width: 80, height: 80 });
    }
  }, [aspectPreset]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleConfirmCrop = () => {
    const imgEl = imgRef.current;
    const stageEl = stageRef.current;
    if (!imgEl || !stageEl) {
      onApplyCrop(imageDataUrl);
      return;
    }

    try {
      const stageRect = stageEl.getBoundingClientRect();
      const imgRect = imgEl.getBoundingClientRect();

      // Calculate crop region in screen coordinates
      const cropLeftPx = stageRect.left + (cropBox.x / 100) * stageRect.width;
      const cropTopPx = stageRect.top + (cropBox.y / 100) * stageRect.height;
      const cropWidthPx = (cropBox.width / 100) * stageRect.width;
      const cropHeightPx = (cropBox.height / 100) * stageRect.height;

      // Map screen coordinates onto natural image pixel coordinates
      const scaleX = imgEl.naturalWidth / Math.max(1, imgRect.width);
      const scaleY = imgEl.naturalHeight / Math.max(1, imgRect.height);

      const sx = Math.max(0, (cropLeftPx - imgRect.left) * scaleX);
      const sy = Math.max(0, (cropTopPx - imgRect.top) * scaleY);
      const sw = Math.min(imgEl.naturalWidth - sx, cropWidthPx * scaleX);
      const sh = Math.min(imgEl.naturalHeight - sy, cropHeightPx * scaleY);

      if (sw <= 10 || sh <= 10) {
        onApplyCrop(imageDataUrl);
        return;
      }

      const canvas = document.createElement('canvas');
      const targetWidth = Math.min(1080, Math.round(sw));
      const targetHeight = Math.round((sh / sw) * targetWidth);
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        onApplyCrop(imageDataUrl);
        return;
      }

      ctx.drawImage(imgEl, sx, sy, sw, sh, 0, 0, targetWidth, targetHeight);
      const croppedUrl = canvas.toDataURL('image/jpeg', 0.92);
      onApplyCrop(croppedUrl);
    } catch {
      onApplyCrop(imageDataUrl);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-xl rounded-3xl bg-white dark:bg-[#141720] border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="px-5 py-3.5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white flex-shrink-0"
              style={{ backgroundColor: primaryColor }}
            >
              <Crop size={16} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-extrabold text-neutral-900 dark:text-white truncate">
                  Crop &amp; Frame UI Mockup
                </h4>
                {queueCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-indigo-500/15 text-[10px] font-bold" style={{ color: primaryColor }}>
                    +{queueCount} more in queue
                  </span>
                )}
              </div>
              <p className="text-[10px] text-neutral-500 truncate">{imageName}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X size={15} />
          </button>
        </div>

        {/* Aspect Ratio Presets */}
        <div className="px-5 py-2.5 bg-neutral-50 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            {[
              { id: '9:16' as const, label: 'Mobile (9:16)', icon: Smartphone },
              { id: '3:4' as const, label: 'Tablet (3:4)', icon: Square },
              { id: '1:1' as const, label: 'Square (1:1)', icon: Square },
              { id: 'free' as const, label: 'Custom Box', icon: Maximize2 },
            ].map((preset) => {
              const IconComp = preset.icon;
              const active = aspectPreset === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setAspectPreset(preset.id)}
                  className={`px-2.5 py-1.5 rounded-xl text-[11px] font-extrabold flex items-center gap-1.5 transition ${
                    active
                      ? 'text-white shadow-xs'
                      : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700'
                  }`}
                  style={active ? { backgroundColor: primaryColor } : undefined}
                >
                  <IconComp size={12} />
                  <span>{preset.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => {
              setZoom(1);
              setPan({ x: 0, y: 0 });
            }}
            className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-neutral-500 hover:text-neutral-800 dark:hover:text-white flex items-center gap-1"
          >
            <RotateCcw size={11} />
            <span>Reset View</span>
          </button>
        </div>

        {/* Interactive Crop Viewport */}
        <div
          ref={stageRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="relative h-[360px] w-full bg-[#090D16] overflow-hidden flex items-center justify-center cursor-move select-none"
        >
          {/* Pannable & Zoomable Source Image */}
          <img
            ref={imgRef}
            src={imageDataUrl}
            alt={imageName}
            draggable={false}
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transition: isDragging ? 'none' : 'transform 120ms ease-out',
            }}
            className="max-h-full max-w-full object-contain pointer-events-none"
          />

          {/* Semi-Transparent Dark Mask Outside Crop Box */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              style={{
                left: `${cropBox.x}%`,
                top: `${cropBox.y}%`,
                width: `${cropBox.width}%`,
                height: `${cropBox.height}%`,
                boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.62)',
                borderColor: primaryColor,
              }}
              className="absolute border-2 rounded-xl"
            >
              {/* Rule-of-Thirds Grid Lines */}
              <div className="w-full h-full grid grid-cols-3 grid-rows-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="border border-white/20" />
                ))}
              </div>

              {/* Corner Handles */}
              <div
                className="w-3 h-3 rounded-xs absolute -top-1.5 -left-1.5"
                style={{ backgroundColor: primaryColor }}
              />
              <div
                className="w-3 h-3 rounded-xs absolute -top-1.5 -right-1.5"
                style={{ backgroundColor: primaryColor }}
              />
              <div
                className="w-3 h-3 rounded-xs absolute -bottom-1.5 -left-1.5"
                style={{ backgroundColor: primaryColor }}
              />
              <div
                className="w-3 h-3 rounded-xs absolute -bottom-1.5 -right-1.5"
                style={{ backgroundColor: primaryColor }}
              />
            </div>
          </div>

          <div className="absolute bottom-2.5 left-3 px-2.5 py-1 rounded-lg bg-black/70 text-white text-[10px] font-bold flex items-center gap-1.5 pointer-events-none">
            <Move size={11} />
            <span>Drag image to position • Use slider below to zoom</span>
          </div>
        </div>

        {/* Zoom & Custom Crop Width/Height Sliders */}
        <div className="px-5 py-3 bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-200 dark:border-neutral-800 space-y-2.5">
          <div className="flex items-center gap-3">
            <ZoomOut size={14} className="text-neutral-400" />
            <input
              type="range"
              min={0.6}
              max={3.2}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="flex-1 accent-indigo-600 cursor-pointer"
            />
            <ZoomIn size={14} className="text-neutral-400" />
            <span className="text-[11px] font-mono font-bold text-neutral-600 dark:text-neutral-300 w-12 text-right">
              {Math.round(zoom * 100)}%
            </span>
          </div>

          {aspectPreset === 'free' && (
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-500">
                <span>Width:</span>
                <input
                  type="range"
                  min={25}
                  max={95}
                  value={cropBox.width}
                  onChange={(e) => {
                    const w = Number(e.target.value);
                    setCropBox((prev) => ({ ...prev, width: w, x: (100 - w) / 2 }));
                  }}
                  className="flex-1 accent-indigo-600"
                />
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-500">
                <span>Height:</span>
                <input
                  type="range"
                  min={25}
                  max={95}
                  value={cropBox.height}
                  onChange={(e) => {
                    const h = Number(e.target.value);
                    setCropBox((prev) => ({ ...prev, height: h, y: (100 - h) / 2 }));
                  }}
                  className="flex-1 accent-indigo-600"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-2 bg-white dark:bg-[#141720]">
          <button
            type="button"
            onClick={() => onSkipCrop(imageDataUrl)}
            className="px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            Use Full Uncropped Image
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-neutral-500 hover:text-neutral-700"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmCrop}
              style={{ backgroundColor: primaryColor }}
              className="px-4 py-2 rounded-xl text-xs font-extrabold text-white shadow-md hover:opacity-95 transition flex items-center gap-1.5"
            >
              <Check size={14} />
              <span>Apply Crop &amp; Save Screen</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignImageCropperModal;
