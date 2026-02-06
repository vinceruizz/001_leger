import { useState } from "react";
import MobileNav from "./MobileNav";
import MobileAbout from "./MobileAbout";
import MobileWork from "./MobileWork";
import MobileContact from "./MobileContact";

function MobileLayout() {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="mobile">
      <header className="mobile__header">
        <svg
          className="mobile__logo"
          viewBox="0 0 100 100"
          fill="currentColor"
          width="32"
          height="32"
        >
          {/* Shield */}
          <path d="M25 15 L25 55 Q25 80 50 95 Q75 80 75 55 L75 15 Z" fill="none" stroke="currentColor" strokeWidth="6" />
          <path d="M25 15 L75 15" stroke="currentColor" strokeWidth="6" />
          {/* Shield center line */}
          <path d="M50 20 L50 85" stroke="currentColor" strokeWidth="3" opacity="0.5" />
          <path d="M30 35 L70 35" stroke="currentColor" strokeWidth="3" opacity="0.5" />
          {/* Sword behind shield */}
          <path d="M50 0 L50 25" stroke="currentColor" strokeWidth="5" />
          <path d="M47 5 L53 5 L52 0 L48 0 Z" />
          <path d="M42 25 L58 25 L56 28 L44 28 Z" />
          <path d="M48 28 L52 28 L52 32 L48 32 Z" />
        </svg>
        <h1 className="mobile__title">Vince Ruiz</h1>
      </header>

      <main className="mobile__content">
        {activeTab === "about" && <MobileAbout />}
        {activeTab === "work" && <MobileWork />}
        {activeTab === "contact" && <MobileContact />}
      </main>

      <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default MobileLayout;
