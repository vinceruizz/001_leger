import { useState, useEffect } from "react";

function Login({ onLogin }) {
  return (
    <div className="login">
      <div className="login__content">
        <button
          className="login__avatar"
          onClick={onLogin}
          aria-label="Login"
        >
          VR
        </button>
        <h1 className="login__name">Vince Ruiz</h1>
        <p className="login__hint">Click to login</p>
      </div>

      <div className="login__time">
        <Time />
      </div>
    </div>
  );
}

function Time() {
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
      weekday: "long",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <>
      <div className="login__clock">{formatTime(time)}</div>
      <div className="login__date">{formatDate(time)}</div>
    </>
  );
}

export default Login;
