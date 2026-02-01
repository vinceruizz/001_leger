import { useState, useRef, useCallback, useEffect } from "react";
import APPLICATIONS from "../../config/applications";

const ICONS = {
  folder: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
      <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  )
};

const GRID_SIZE = 100; // Snap grid size

function DesktopIcon({ app, position, onOpenApp, onMove }) {
  const iconRef = useRef(null);
  const dragRef = useRef({
    isDragging: false,
    hasMoved: false,
    offsetX: 0,
    offsetY: 0
  });
  const positionRef = useRef(position);
  const rafRef = useRef(null);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  const updatePosition = useCallback(() => {
    if (iconRef.current) {
      iconRef.current.style.transform =
        `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`;
    }
    rafRef.current = null;
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!dragRef.current.isDragging) return;

    dragRef.current.hasMoved = true;
    positionRef.current = {
      x: e.clientX - dragRef.current.offsetX,
      y: Math.max(0, e.clientY - dragRef.current.offsetY)
    };

    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(updatePosition);
    }
  }, [updatePosition]);

  const handleMouseUp = useCallback(() => {
    if (!dragRef.current.isDragging) return;

    const wasDragged = dragRef.current.hasMoved;
    dragRef.current.isDragging = false;
    dragRef.current.hasMoved = false;

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (wasDragged) {
      // Snap to grid
      const snappedPosition = {
        x: Math.round(positionRef.current.x / GRID_SIZE) * GRID_SIZE,
        y: Math.max(0, Math.round(positionRef.current.y / GRID_SIZE) * GRID_SIZE)
      };
      positionRef.current = snappedPosition;
      updatePosition();
      onMove(app.id, snappedPosition);
    }
  }, [app.id, onMove, handleMouseMove, updatePosition]);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();

    const rect = iconRef.current.getBoundingClientRect();
    const containerRect = iconRef.current.parentElement.getBoundingClientRect();

    dragRef.current = {
      isDragging: true,
      hasMoved: false,
      offsetX: e.clientX - (rect.left - containerRect.left),
      offsetY: e.clientY - (rect.top - containerRect.top)
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove, handleMouseUp]);

  const handleDoubleClick = useCallback(() => {
    onOpenApp(app.id);
  }, [app.id, onOpenApp]);

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleMouseMove, handleMouseUp]);

  const style = {
    transform: `translate(${position.x}px, ${position.y}px)`
  };

  return (
    <button
      ref={iconRef}
      className="desktop-icon"
      style={style}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      <div className="desktop-icon__graphic">
        {ICONS[app.icon] || app.title.charAt(0)}
      </div>
      <span className="desktop-icon__label">{app.title}</span>
    </button>
  );
}

function DesktopIcons({ onOpenApp }) {
  const [iconPositions, setIconPositions] = useState(() => {
    const apps = Object.values(APPLICATIONS);
    const positions = {};
    apps.forEach((app, index) => {
      positions[app.id] = {
        x: 20,
        y: 20 + index * GRID_SIZE
      };
    });
    return positions;
  });

  const handleMove = useCallback((appId, position) => {
    setIconPositions((prev) => ({
      ...prev,
      [appId]: position
    }));
  }, []);

  const apps = Object.values(APPLICATIONS);

  return (
    <div className="desktop-icons">
      {apps.map((app) => (
        <DesktopIcon
          key={app.id}
          app={app}
          position={iconPositions[app.id]}
          onOpenApp={onOpenApp}
          onMove={handleMove}
        />
      ))}
    </div>
  );
}

export default DesktopIcons;
