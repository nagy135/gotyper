import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Api from "../api";
import { TGame } from "../types";

export default function Games() {
  const navigate = useNavigate();
  const [games, setGames] = useState<TGame[]>([]);

  const redirectToGame = (id: number) => {
    navigate(`/games/${id}`);
  };

  useEffect(() => {
    Api.getGames().then((games) => setGames(games));
  }, []);

  return (
    <Container>
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <nav aria-label="main mailbox folders">
          <List>
            {games.map((game) => {
              return (
                <ListItem disablePadding key={game.ID}>
                  <ListItemButton onClick={() => redirectToGame(game.ID)}>
                    <ListItemText primary={game.Name} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </nav>
      </Box>
    </Container>
  );
}
