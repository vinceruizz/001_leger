import { useState, useCallback } from "react";
import Taskbar from "../taskbar/Taskbar";
import TopPanel from "../topPanel/TopPanel";
import Window from "../window/Window";
import DesktopIcons from "./DesktopIcons";
import APPLICATIONS from "../../config/applications";
import "../../App.css";

function Desktop() {
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
      <TopPanel />
      <div className="desktop__body">
        <Taskbar
          windows={windows}
          onFocusWindow={focusWindow}
        />
        <main className="desktop__main">
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
