"use client";

import React, { useState } from "react";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleImageError } from "@/lib/utils/imageUtils";

interface ImageZoomModalProps {
  isOpen: boolean;
  imageUrl: string;
  productName: string;
  images?: string[];
  currentIndex?: number;
  onClose: () => void;
  onPrevImage?: () => void;
  onNextImage?: () => void;
}

export function ImageZoomModal({
  isOpen,
  imageUrl,
  productName,
  images = [],
  currentIndex = 0,
  onClose,
  onPrevImage,
  onNextImage,
}: ImageZoomModalProps) {
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [pan, setPan] = useState({ x: 0, y: 0 });

  if (!isOpen) return null;

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 1));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClose = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    onClose();
  };

  const hasMultipleImages = images.length > 1;

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
      onClick={handleClose}
    >
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-white hover:bg-white/20"
        onClick={handleClose}
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Main Image Container */}
      <div
        className="relative w-full h-full flex items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing">
          <img
            src={imageUrl}
            alt={productName}
            className="max-w-full max-h-full select-none"
            style={{
              transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
              transition: isDragging ? "none" : "transform 0.2s ease-out",
            }}
            onError={handleImageError}
            draggable={false}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/60 rounded-full px-4 py-3 backdrop-blur-sm">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
          onClick={handleZoomOut}
          disabled={zoom <= 1}
        >
          <ZoomOut className="h-5 w-5" />
        </Button>

        <div className="text-white text-sm font-medium min-w-[50px] text-center">
          {Math.round(zoom * 100)}%
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
          onClick={handleZoomIn}
        >
          <ZoomIn className="h-5 w-5" />
        </Button>

        {hasMultipleImages && (
          <>
            <div className="w-px h-6 bg-white/20" />

            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={onPrevImage}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="text-white text-sm font-medium min-w-[50px] text-center">
              {currentIndex + 1} / {images.length}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={onNextImage}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}
      </div>

      {/* Product Name */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 text-white text-center max-w-md">
        <h2 className="text-xl font-semibold truncate">{productName}</h2>
      </div>
    </div>
  );
}
