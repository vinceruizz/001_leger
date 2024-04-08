import './App.css';
import Home from './Components/Home/Home'
import About from './Components/About/About';
import MyWork from './Components/MyWork/MyWork';
import NotFound from './NotFound';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/my-work" element={<MyWork />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
  );
}

export default App;
