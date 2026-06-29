import { useState } from "react";
import Preloading from './pages/Preloading';
import './App.css';
import About from './pages/About.jsx';

const App = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  const handleComplete = () => {
    setShowPreloader(false);
    window.scrollTo({ top: 0, left: 0 });
    setTimeout(() => {
      window.dispatchEvent(new Event("preloaderComplete"));
      window.dispatchEvent(new Event("resize"));
    }, 150);
  };

  return (
    <div>
      {showPreloader && (
        <Preloading onComplete={handleComplete} />
      )}
      <About />
    </div>
  );
};

export default App;