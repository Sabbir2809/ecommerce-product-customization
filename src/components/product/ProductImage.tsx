"use client";

import type { Product } from "@/types";
import {
  ArrowLeft,
  Maximize2,
  Minimize2,
  RotateCw,
  Share2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface Props {
  product: Product;
}

export default function ProductImage({ product }: Props) {
  const router = useRouter();
  const [shareHint, setShareHint] = useState(false);
  const [mainIndex, setMainIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mainImage = product.images?.[mainIndex];
  const MIN_ZOOM = 1;
  const MAX_ZOOM = 3;
  const ZOOM_STEP = 0.25;

  function handleShare() {
    const url = `${window.location.href}`;
    navigator.clipboard.writeText(url).then(() => {
      setShareHint(true);
      setTimeout(() => setShareHint(false), 2000);
    });
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - ZOOM_STEP, MIN_ZOOM));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleReset = () => {
    setZoom(1);
    setRotation(0);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      setZoom((prev) => {
        const newZoom = prev + (e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP);
        return Math.min(Math.max(newZoom, MIN_ZOOM), MAX_ZOOM);
      });
    }
  };

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div className="space-y-3" ref={containerRef}>
      {/* Main Image Container */}
      <div
        className="relative bg-slate-50 rounded-2xl overflow-hidden aspect-square border border-slate-200"
        ref={imageRef}
        onWheel={handleWheel}
      >
        {mainImage ? (
          <div
            className="relative w-full h-full transition-transform duration-200 ease-out"
            style={{
              transform: `scale(${zoom}) rotate(${rotation}deg)`,
              transformOrigin: "center center",
            }}
          >
            <Image
              src={mainImage}
              alt={product.name}
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-contain p-6"
              priority
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400 text-sm">
            No image available
          </div>
        )}

        {/* Controls Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top Row Buttons */}
          <div className="absolute top-3 left-3 right-3 flex justify-between pointer-events-auto">
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="lg:hidden bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow text-slate-600 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow text-slate-600 hover:text-primary-600 transition-colors"
            >
              <Share2 size={18} />
            </button>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow pointer-events-auto">
            <button
              onClick={handleZoomOut}
              disabled={zoom <= MIN_ZOOM}
              className="p-1.5 rounded-full hover:bg-slate-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="Zoom Out"
            >
              <ZoomOut size={18} />
            </button>

            <button
              onClick={handleReset}
              className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-xs font-medium min-w-[40px]"
              title="Reset"
            >
              {Math.round(zoom * 100)}%
            </button>

            <button
              onClick={handleZoomIn}
              disabled={zoom >= MAX_ZOOM}
              className="p-1.5 rounded-full hover:bg-slate-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="Zoom In"
            >
              <ZoomIn size={18} />
            </button>

            <div className="w-px bg-slate-200 mx-1" />

            <button
              onClick={handleRotate}
              className="p-1.5 rounded-full hover:bg-slate-100 transition-colors"
              title="Rotate"
            >
              <RotateCw size={18} />
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-full hover:bg-slate-100 transition-colors"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
          </div>

          {/* Zoom Hint */}
          {zoom > MIN_ZOOM && (
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-slate-800/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
              Ctrl + Scroll to zoom • Drag to pan
            </div>
          )}
        </div>

        {/* Share Hint */}
        {shareHint && (
          <div className="absolute top-12 right-3 bg-slate-800 text-white text-[11px] font-body px-3 py-1.5 rounded-lg shadow">
            Link copied!
          </div>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto">
        {product.images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => {
              setMainIndex(idx);
              handleReset(); // Reset zoom/rotation when changing image
            }}
            className={`flex-shrink-0 w-16 h-16 border rounded-xl overflow-hidden transition-all ${
              idx === mainIndex
                ? "border-primary-500 ring-2 ring-primary-500/20"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <Image
              src={img}
              alt={`${product.name} ${idx}`}
              width={64}
              height={64}
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
