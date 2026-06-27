import { useRef, useEffect, useState, useMemo, useCallback } from 'react';

const lerp = (p1, p2, t) => p1 + (p2 - p1) * t;

const injectStyles = () => {
  const id = "circular-gallery-styles";
  if (document.getElementById(id)) return;
  const style = document.createElement("style");
  style.id = id;
  style.textContent = `
    .circular-gallery {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      cursor: grab;
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      touch-action: none;
      outline: none;
    }

    .circular-gallery:active {
      cursor: grabbing;
    }

    .circular-gallery-card {
      position: absolute;
      will-change: transform, opacity, filter;
    }
  `;
  document.head.appendChild(style);
};

export default function CircularGallary({
  children,
  bend = 3,
  scrollSpeed = 1.5,
  scrollEase = 0.08
}) {
  const containerRef = useRef(null);
  const scrollRef = useRef({ current: 0, target: 0 });
  const dragRef = useRef({ isDown: false, startX: 0, scrollStart: 0, hasMoved: false });
  const wasDraggingRef = useRef(false);
  const wheelTimeoutRef = useRef(null);
  const requestRef = useRef(null);

  const [viewportWidth, setViewportWidth] = useState(1000);

  useEffect(() => {
    injectStyles();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setViewportWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getCardWidths = useCallback(() => {
    let cardWidth;
    let gap;
    if (viewportWidth < 600) {
      cardWidth = Math.min(320, viewportWidth - 40);
      gap = 24;
    } else if (viewportWidth < 950) {
      cardWidth = 350;
      gap = 32;
    } else {
      cardWidth = 390;
      gap = 48;
    }
    return cardWidth + gap;
  }, [viewportWidth]);

  const snapToNearest = useCallback(() => {
    const width = getCardWidths();
    const currentTarget = scrollRef.current.target;
    const nearestIndex = Math.round(currentTarget / width);
    scrollRef.current.target = nearestIndex * width;
  }, [getCardWidths]);

  const handlePointerDown = (e) => {
    dragRef.current.isDown = true;
    dragRef.current.startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    dragRef.current.scrollStart = scrollRef.current.target;
    dragRef.current.hasMoved = false;
    wasDraggingRef.current = false;
  };

  const handlePointerMove = (e) => {
    if (!dragRef.current.isDown) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const dx = dragRef.current.startX - clientX;
    if (Math.abs(dx) > 5) {
      dragRef.current.hasMoved = true;
      wasDraggingRef.current = true;
    }
    scrollRef.current.target = dragRef.current.scrollStart + dx * scrollSpeed;
  };

  const handlePointerUp = () => {
    dragRef.current.isDown = false;
    snapToNearest();
  };

  const handleKeyDown = (e) => {
    const width = getCardWidths();
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollRef.current.target += width;
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollRef.current.target -= width;
    }
  };

  const handleCaptureClick = (e) => {
    if (wasDraggingRef.current) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      // Normalize deltas based on deltaMode
      let dx = e.deltaX;
      
      if (e.deltaMode === 1) { // LINE mode
        dx *= 40;
      } else if (e.deltaMode === 2) { // PAGE mode
        dx *= 800;
      }

      const absX = Math.abs(dx);
      const absY = Math.abs(e.deltaY);

      if (absX > absY && absX > 0) {
        // Horizontal scroll is dominant (e.g. trackpad swipe left/right, Shift+mouse wheel)
        e.preventDefault();
        scrollRef.current.target += dx * scrollSpeed * 0.4;

        if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
        wheelTimeoutRef.current = setTimeout(() => {
          snapToNearest();
        }, 200);
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    };
  }, [scrollSpeed, snapToNearest]);

  useEffect(() => {
    const update = () => {
      scrollRef.current.current = lerp(
        scrollRef.current.current,
        scrollRef.current.target,
        scrollEase
      );

      const cards = containerRef.current?.querySelectorAll('.circular-gallery-card');
      if (cards && cards.length > 0) {
        const N = cards.length;
        
        let cardWidth;
        let gap;
        if (viewportWidth < 600) {
          cardWidth = Math.min(320, viewportWidth - 40);
          gap = 24;
        } else if (viewportWidth < 950) {
          cardWidth = 350;
          gap = 32;
        } else {
          cardWidth = 390;
          gap = 48;
        }

        const width = cardWidth + gap;
        const totalWidth = N * width;
        const H = viewportWidth / 2;
        const B_abs = Math.abs(bend) * 80;
        const R = B_abs > 0 ? (H * H + B_abs * B_abs) / (2 * B_abs) : 999999;

        cards.forEach((card, idx) => {
          card.style.width = `${cardWidth}px`;

          const rawX = idx * width - scrollRef.current.current;
          let itemX = rawX % totalWidth;
          if (itemX < -totalWidth / 2) itemX += totalWidth;
          if (itemX > totalWidth / 2) itemX -= totalWidth;

          const effectiveX = Math.max(-H, Math.min(H, itemX));
          let y = 0;
          let angle = 0;

          if (B_abs > 0) {
            const radValue = R * R - effectiveX * effectiveX;
            const arc = R - Math.sqrt(Math.max(0, radValue));
            if (bend > 0) {
              y = -arc;
              angle = -Math.sign(effectiveX) * Math.asin(effectiveX / R);
            } else {
              y = arc;
              angle = Math.sign(effectiveX) * Math.asin(effectiveX / R);
            }
          }

          const scale = 1 - (Math.abs(itemX) / H) * 0.15;
          const deg = (angle * 180) / Math.PI;

          card.style.transform = `translate3d(${itemX}px, ${y}px, 0) rotate(${deg}deg) scale(${scale})`;
          
          let opacityFactor;
          let minOpacity;
          
          if (viewportWidth < 600) {
            opacityFactor = 2.0;
            minOpacity = 0.1;
          } else if (viewportWidth < 950) {
            opacityFactor = 1.4;
            minOpacity = 0.3;
          } else {
            opacityFactor = 0.9;
            minOpacity = 0.45;
          }

          const targetOpacity = Math.max(minOpacity, 1 - (Math.abs(itemX) / H) * opacityFactor);
          card.style.opacity = String(targetOpacity);

          const maxBlur = 8; 
          const blurVal = (Math.abs(itemX) / H) * maxBlur;
          card.style.filter = `blur(${blurVal}px)`;

          card.style.zIndex = String(Math.round(100 - (Math.abs(itemX) / H) * 50));
        });
      }

      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [viewportWidth, bend, scrollEase]);

  const cardsArray = useMemo(() => {
    if (!children) return [];
    return Array.isArray(children) ? children : [children];
  }, [children]);

  return (
    <div
      className="circular-gallery"
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Circular project gallery. Drag or use mouse wheel to rotate."
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
      onKeyDown={handleKeyDown}
      onClickCapture={handleCaptureClick}
    >
      {cardsArray.map((child, idx) => (
        <div key={idx} className="circular-gallery-card">
          {child}
        </div>
      ))}
    </div>
  );
}
