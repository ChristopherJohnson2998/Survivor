import './App.css'
import Game from './game/Game';
import Lobby from './lobby/Lobby';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>

  );
}

export default App
