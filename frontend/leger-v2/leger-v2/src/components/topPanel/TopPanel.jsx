import { useState, useEffect, useRef } from "react";

function TopPanel({ onLogout, onRestart }) {
  const [time, setTime] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], {
      weekday: "short",
      month: "short",
      day: "numeric"
    });
  };

  const handleLogout = () => {
    setMenuOpen(false);
    onLogout();
  };

  const handleRestart = () => {
    setMenuOpen(false);
    onRestart();
  };

  return (
    <header className="top-panel">
      <div className="top-panel__left">
        <button className="top-panel__button">Activities</button>
      </div>
      <div className="top-panel__center">
        <button className="top-panel__button top-panel__clock">
          {formatDate(time)} {formatTime(time)}
        </button>
      </div>
      <div className="top-panel__right" ref={menuRef}>
        <button
          className={`top-panel__button ${menuOpen ? "top-panel__button--active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          System
        </button>
        {menuOpen && (
          <div className="top-panel__menu">
            <button className="top-panel__menu-item" onClick={handleLogout}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
              </svg>
              Log Out
            </button>
            <button className="top-panel__menu-item" onClick={handleRestart}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
              </svg>
              Restart
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default TopPanel;
