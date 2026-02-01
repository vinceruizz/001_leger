import { memo, useRef, useCallback, useEffect } from "react";
import APPLICATIONS from "../../config/applications";

const Window = memo(function Window({
  window,
  onFocus,
  onClose,
  onMinimize,
  onMove
}) {
  const app = APPLICATIONS[window.appId];
  const AppComponent = app?.component;

  const windowRef = useRef(null);
  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0
  });
  const rafRef = useRef(null);
  const positionRef = useRef({ x: window.position.x, y: window.position.y });

  // Sync position ref with prop changes
  useEffect(() => {
    if (!dragRef.current.isDragging) {
      positionRef.current = { x: window.position.x, y: window.position.y };
    }
  }, [window.position.x, window.position.y]);

  const updatePosition = useCallback(() => {
    if (windowRef.current) {
      windowRef.current.style.transform =
        `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`;
    }
    rafRef.current = null;
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!dragRef.current.isDragging) return;

    const minY = 8; // Keep window below top panel
    const rawY = e.clientY - dragRef.current.offsetY;

    positionRef.current = {
      x: e.clientX - dragRef.current.offsetX,
      y: Math.max(minY, rawY)
    };

    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(updatePosition);
    }
  }, [updatePosition]);

  const handleMouseUp = useCallback(() => {
    if (!dragRef.current.isDragging) return;

    dragRef.current.isDragging = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    // Commit final position to state
    onMove(window.id, positionRef.current);
  }, [window.id, onMove, handleMouseMove]);

  const handleHeaderMouseDown = useCallback((e) => {
    // Ignore if clicking on buttons
    if (e.target.closest(".window__controls")) return;

    e.preventDefault();
    onFocus(window.id);

    dragRef.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      offsetX: e.clientX - positionRef.current.x,
      offsetY: e.clientY - positionRef.current.y
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, [window.id, onFocus, handleMouseMove, handleMouseUp]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleMouseMove, handleMouseUp]);

  if (window.isMinimized) return null;

  const style = {
    position: "absolute",
    left: 0,
    top: 0,
    transform: `translate(${window.position.x}px, ${window.position.y}px)`,
    width: window.size.width,
    height: window.size.height,
    zIndex: window.zIndex,
    willChange: "transform"
  };

  return (
    <div
      ref={windowRef}
      className={`window ${window.isFocused ? "window--focused" : ""}`}
      style={style}
      onMouseDown={() => onFocus(window.id)}
    >
      <header
        className="window__header"
        onMouseDown={handleHeaderMouseDown}
      >
        <span className="window__title">{window.title}</span>
        <div className="window__controls">
          <button
            className="window__button window__button--minimize"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize(window.id);
            }}
            aria-label="Minimize"
          />
          <button
            className="window__button window__button--close"
            onClick={(e) => {
              e.stopPropagation();
              onClose(window.id);
            }}
            aria-label="Close"
          />
        </div>
      </header>
      <div className="window__content">
        {AppComponent && <AppComponent />}
      </div>
    </div>
  );
});

export default Window;
