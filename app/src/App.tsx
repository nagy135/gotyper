import { Route, Routes } from "react-router-dom";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Games from "./components/games";
import Game from "./components/game";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Games />} />
          <Route path="/games/:gameId" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
