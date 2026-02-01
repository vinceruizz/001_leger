import APPLICATIONS from "../../config/applications";

const ICONS = {
  folder: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  )
};

function Taskbar({ windows, onFocusWindow }) {
  const windowList = Object.values(windows);

  const getIcon = (appId) => {
    const app = APPLICATIONS[appId];
    return app ? ICONS[app.icon] : null;
  };

  return (
    <nav className="taskbar">
      <div className="taskbar__running">
        {windowList.map((win) => (
          <button
            key={win.id}
            className={`taskbar__item ${win.isFocused && !win.isMinimized ? "taskbar__item--focused" : ""}`}
            title={win.title}
            onClick={() => onFocusWindow(win.id)}
          >
            {getIcon(win.appId) || win.title.charAt(0)}
          </button>
        ))}
      </div>

      <button className="taskbar__apps-button" title="Applications">
        <span /><span /><span />
        <span /><span /><span />
        <span /><span /><span />
      </button>
    </nav>
  );
}

export default Taskbar;
