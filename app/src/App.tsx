import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:8080";

function App() {
  const [games, setGames] = useState<any>(null);

  useEffect(() => {
    fetch(`${API}/games`)
      .then((res) => setGames(res.json()))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      lol
      {games}
    </div>
  );
}

export default App;
