import { useState, useCallback } from 'react'
import Boot from './components/boot/Boot'
import Desktop from './components/desktop/Desktop'
import Login from './components/login/Login'

function App() {
  const [screen, setScreen] = useState('boot'); // 'boot' | 'login' | 'desktop'

  const handleBootComplete = useCallback(() => {
    setScreen('login');
  }, []);

  const handleLogin = useCallback(() => {
    setScreen('desktop');
  }, []);

  if (screen === 'boot') {
    return <Boot onComplete={handleBootComplete} />;
  }

  if (screen === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  return <Desktop />;
}

export default App
