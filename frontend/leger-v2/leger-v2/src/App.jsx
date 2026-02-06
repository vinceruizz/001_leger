import { useState, useCallback, useEffect } from 'react'
import Boot from './components/boot/Boot'
import Desktop from './components/desktop/Desktop'
import Login from './components/login/Login'
import MobileLayout from './components/mobile/MobileLayout'

const MOBILE_BREAKPOINT = 768;

function App() {
  const [screen, setScreen] = useState('boot'); // 'boot' | 'login' | 'desktop'
  const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_BREAKPOINT);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBootComplete = useCallback(() => {
    setScreen('login');
  }, []);

  const handleLogin = useCallback(() => {
    setScreen('desktop');
  }, []);

  const handleLogout = useCallback(() => {
    setScreen('login');
  }, []);

  const handleRestart = useCallback(() => {
    setScreen('boot');
  }, []);

  // Mobile layout - skip boot/login flow
  if (isMobile) {
    return <MobileLayout />;
  }

  // Desktop flow: boot -> login -> desktop
  if (screen === 'boot') {
    return <Boot onComplete={handleBootComplete} />;
  }

  if (screen === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  return <Desktop onLogout={handleLogout} onRestart={handleRestart} />;
}

export default App
