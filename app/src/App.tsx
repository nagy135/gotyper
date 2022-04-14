import { Route, Routes } from "react-router-dom";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

import Games from "./components/games";
import Game from "./components/game";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Games />} />
        <Route path="/games/:gameId" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
