import { useState } from "react";
import Preloading from './pages/Preloading';
import './App.css';
import About from './pages/About.jsx';

const App = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <div>
      {showPreloader && (
        <Preloading onComplete={() => setShowPreloader(false)} />
      )}
      <About />
    </div>
  );
};

export default App;