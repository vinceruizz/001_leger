import { useEffect, useState } from "react";

const SWORD_SHIELD = String.raw`
              __
             |  |
             |  |
             |  |
          ___|  |___
         [___\  /___]
             |  |
         .---'  '---.
        /            \
       /              \
      |                |
      |       /\       |
      |      /  \      |
      |     /    \     |
      |    /      \    |
      |   /        \   |
      |  /          \  |
       \/            \/
        \            /
         \          /
          \        /
           \      /
            \    /
             \  /
              \/
`;

function Boot({ onComplete }) {
  const [phase, setPhase] = useState(0);
  // 0: black screen
  // 1: show helmet
  // 2: show text
  // 3: loading dots
  // 4: fade out

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 2200),
      setTimeout(() => setPhase(3), 3400),
      setTimeout(() => setPhase(4), 5500),
      setTimeout(() => onComplete(), 6500)
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className={`boot ${phase >= 4 ? "boot--fade-out" : ""}`}>
      <div className="boot__content">
        <pre className={`boot__helmet ${phase >= 1 ? "boot__helmet--visible" : ""}`}>
          {SWORD_SHIELD}
        </pre>
        <h1 className={`boot__title ${phase >= 2 ? "boot__title--visible" : ""}`}>
          AlfreccOS
        </h1>
        <div className={`boot__loader ${phase >= 3 ? "boot__loader--visible" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default Boot;
