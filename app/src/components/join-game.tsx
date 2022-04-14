import { Box, Button, Container, Stack, TextField } from "@mui/material";
import { useRef, useState } from "react";
import styled from "styled-components";
import joinGame from "../api/join-game";

const Wrapper = styled.div`
  margin: 1em 0;
`;

interface IProps {
  refreshGame: (playerId: number) => void;
  gameId: number;
}

const JoinGame = ({ refreshGame, gameId }: IProps) => {
  const [name, setName] = useState("");

  const nameRef = useRef<HTMLInputElement | null>(null);

  const joinGameAction = async () => {
    if (!name.length) {
      window.alert("fill in nickname");
      nameRef.current?.focus()
      return
    }
    const playerId = await joinGame(gameId, name);
    refreshGame(playerId);
  };
  return (
    <Wrapper>
      <Container>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={2}
        >
          <Button variant="contained" onClick={() => joinGameAction()}>
            Join Game
          </Button>
          <TextField
            label="Nickname"
            inputRef={nameRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
        </Stack>
      </Container>
    </Wrapper>
  );
};

export default JoinGame;
