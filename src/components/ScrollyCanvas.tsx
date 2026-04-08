"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import Overlay from "./Overlay";

const FRAME_COUNT = 48;

const currentFrame = (index: number) => 
  `/sequence/frame_${index.toString().padStart(2, "0")}_delay-0.062s.webp`;

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      loadedImages.push(img);
      
      img.onload = () => {
        loadedCount += 1;
        // Render instantly when the first frame loads to avoid initial blank screen
        if (i === 0) {
          setImages([...loadedImages]);
        }
        // Update periodically so scrubbing works seamlessly while loading
        if (loadedCount === FRAME_COUNT) {
          setImages([...loadedImages]); 
        } else if (loadedCount % 5 === 0) {
          setImages([...loadedImages]);
        }
      };
    }
    
    // In case there is an issue with loading a specific image, still set images after a short delay
    const fallbackTimeout = setTimeout(() => {
      if (loadedCount < FRAME_COUNT) {
        setImages([...loadedImages]);
      }
    }, 3000);
    
    return () => clearTimeout(fallbackTimeout);
  }, []);

  // Handle Resize and Drawing
  useEffect(() => {
    if (images.length === 0) return;

    const render = (index: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      const image = images[index];
      if (image && image.complete && image.naturalWidth !== 0) {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        
        // Only set width/height if diff to avoid clear flashes
        if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
          canvas.width = rect.width * dpr;
          canvas.height = rect.height * dpr;
        }
        
        const hRatio = canvas.width / image.naturalWidth;
        const vRatio = canvas.height / image.naturalHeight;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - image.naturalWidth * ratio) / 2;
        const centerShift_y = (canvas.height - image.naturalHeight * ratio) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // For smooth appearance
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(
          image,
          0,
          0,
          image.naturalWidth,
          image.naturalHeight,
          centerShift_x,
          centerShift_y,
          image.naturalWidth * ratio,
          image.naturalHeight * ratio
        );
      }
    };

    // Draw initial frame
    render(Math.round(frameIndex.get()));

    // Redraw on scroll
    const unsubscribeScroll = frameIndex.on("change", (latest) => {
      render(Math.round(latest));
    });

    // Redraw on resize
    const handleResize = () => {
      render(Math.round(frameIndex.get()));
    };
    window.addEventListener("resize", handleResize);

    return () => {
      unsubscribeScroll();
      window.removeEventListener("resize", handleResize);
    };
  }, [images, frameIndex]);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas 
          ref={canvasRef} 
          className="block w-full h-full object-cover" 
          style={{ width: "100%", height: "100%" }}
        />
        <Overlay scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
