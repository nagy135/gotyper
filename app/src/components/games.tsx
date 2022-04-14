import { useEffect, useState } from "react";
import Container from '@mui/material/Container';
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import { useNavigate } from 'react-router-dom'


const API = "http://localhost:8080";

export default function Games() {
  const navigate = useNavigate();
  const [games, setGames] = useState<Record<string, string>[]>([]);

  const redirectToGame = (id: number) => {
    navigate(`/games/${id}`);
  };

  useEffect(() => {
    fetch(`${API}/games`)
      .then((res) => res.json())
      .then((res) => setGames(res));
  }, []);

  return (
    <Container>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <nav aria-label="main mailbox folders">
          <List>
            {games.map((e: any) => {
              return <ListItem disablePadding>
                <ListItemButton onClick={() => redirectToGame(e["ID"])}>
                  <ListItemText primary={e["Name"]} />
                </ListItemButton>
              </ListItem>
            })}
          </List>
        </nav>
      </Box>
    </Container>
  );
}
