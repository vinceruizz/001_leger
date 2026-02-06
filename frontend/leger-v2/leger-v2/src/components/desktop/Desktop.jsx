import { useState, useCallback } from "react";
import Taskbar from "../taskbar/Taskbar";
import TopPanel from "../topPanel/TopPanel";
import Window from "../window/Window";
import DesktopIcons from "./DesktopIcons";
import APPLICATIONS from "../../config/applications";
import "../../App.css";

function Desktop({ onLogout, onRestart }) {
  const [windows, setWindows] = useState({});
  const [topZIndex, setTopZIndex] = useState(0);

  const openApp = useCallback((appId) => {
    const app = APPLICATIONS[appId];
    if (!app) return;

    if (app.singleton) {
      const existing = Object.values(windows).find((w) => w.appId === appId);
      if (existing) {
        if (existing.isMinimized) {
          setWindows((prev) => ({
            ...prev,
            [existing.id]: { ...prev[existing.id], isMinimized: false }
          }));
        }
        focusWindow(existing.id);
        return;
      }
    }

    const windowId = `${appId}-${Date.now()}`;
    const newZ = topZIndex + 1;
    const cascade = Object.keys(windows).length * 30;

    setTopZIndex(newZ);
    setWindows((prev) => ({
      ...prev,
      [windowId]: {
        id: windowId,
        appId,
        title: app.title,
        position: { x: 120 + cascade, y: 60 + cascade },
        size: app.defaultSize || { width: 800, height: 600 },
        zIndex: newZ,
        isMinimized: false,
        isFocused: true
      }
    }));
  }, [windows, topZIndex]);

  const focusWindow = useCallback((windowId) => {
    setTopZIndex((prev) => {
      const newZ = prev + 1;
      setWindows((prevWindows) => {
        const updated = {};
        for (const [id, win] of Object.entries(prevWindows)) {
          updated[id] = {
            ...win,
            isFocused: id === windowId,
            isMinimized: id === windowId ? false : win.isMinimized,
            zIndex: id === windowId ? newZ : win.zIndex
          };
        }
        return updated;
      });
      return newZ;
    });
  }, []);

  const minimizeWindow = useCallback((windowId) => {
    setWindows((prev) => ({
      ...prev,
      [windowId]: { ...prev[windowId], isMinimized: true, isFocused: false }
    }));
  }, []);

  const closeWindow = useCallback((windowId) => {
    setWindows((prev) => {
      const { [windowId]: removed, ...rest } = prev;
      return rest;
    });
  }, []);

  const moveWindow = useCallback((windowId, position) => {
    // Snap to below top panel if dragged too high
    const minY = 8; // Small padding below panel
    const clampedPosition = {
      x: position.x,
      y: Math.max(minY, position.y)
    };

    setWindows((prev) => ({
      ...prev,
      [windowId]: { ...prev[windowId], position: clampedPosition }
    }));
  }, []);

  return (
    <div className="desktop">
      <TopPanel onLogout={onLogout} onRestart={onRestart} />
      <div className="desktop__body">
        <Taskbar
          windows={windows}
          onFocusWindow={focusWindow}
        />
        <main className="desktop__main">
          <div className="desktop__watermark">
            <svg
              className="desktop__watermark-logo"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              {/* Shield */}
              <path d="M25 15 L25 55 Q25 80 50 95 Q75 80 75 55 L75 15 Z" fill="none" stroke="currentColor" strokeWidth="4" />
              <path d="M25 15 L75 15" stroke="currentColor" strokeWidth="4" />
              {/* Shield center line */}
              <path d="M50 20 L50 85" stroke="currentColor" strokeWidth="2" opacity="0.5" />
              <path d="M30 35 L70 35" stroke="currentColor" strokeWidth="2" opacity="0.5" />
              {/* Sword behind shield */}
              <path d="M50 0 L50 25" stroke="currentColor" strokeWidth="3" />
              <path d="M47 5 L53 5 L52 0 L48 0 Z" />
              <path d="M42 25 L58 25 L56 28 L44 28 Z" />
              <path d="M48 28 L52 28 L52 32 L48 32 Z" />
            </svg>
            <span className="desktop__watermark-text">Vince Ruiz</span>
            <span className="desktop__watermark-subtitle">Portfolio</span>
          </div>
          <DesktopIcons onOpenApp={openApp} />
          {Object.values(windows).map((win) => (
            <Window
              key={win.id}
              window={win}
              onFocus={focusWindow}
              onClose={closeWindow}
              onMinimize={minimizeWindow}
              onMove={moveWindow}
            />
          ))}
        </main>
      </div>
    </div>
  );
}

export default Desktop;
