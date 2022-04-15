import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../api";
import { TGame } from "../types";
import NewGame from "./new-game";
import styled from "styled-components";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

const Wrapper = styled(Box)`
  border: 1px solid #aaaaaa;
  border-radius: 15px;
  margin-top: 1em;
  padding: 2em;
`;

export default function Games() {
  const navigate = useNavigate();
  const [games, setGames] = useState<TGame[]>([]);

  const redirectToGame = (id: number) => {
    navigate(`/games/${id}`);
  };

  const apiUpdate = useCallback(
    () => Api.getGames().then((games) => setGames(games)),
    []
  );

  useEffect(() => {
    apiUpdate();
  }, []);

  return (
    <Container maxWidth="md">
      <Wrapper>
        <NewGame refreshGames={apiUpdate} />
        <nav aria-label="main mailbox folders">
          <List>
            {games.map((game) => {
              return (
                <ListItem disablePadding key={game.ID}>
                  <ListItemButton onClick={() => redirectToGame(game.ID)}>
                    <ListItemText
                      primary={game.Name}
                      primaryTypographyProps={{
                        fontSize: "1.4em",
                        fontWeight: "bold",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </nav>
      </Wrapper>
    </Container>
  );
}
