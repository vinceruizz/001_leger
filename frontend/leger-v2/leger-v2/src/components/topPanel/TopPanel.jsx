import { useState, useEffect } from "react";

function TopPanel() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
      <div className="top-panel__right">
        <button className="top-panel__button">System</button>
      </div>
    </header>
  );
}

export default TopPanel;
