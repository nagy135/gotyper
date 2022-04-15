import { Button, Box, Stack, TextField } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useRef, useState } from "react";
import styled from "styled-components";
import joinGame from "../api/join-game";
import { ERR_MANDATORY_FIELD } from "../errors/constants";

const Wrapper = styled.div`
  margin: 1em 0;
`;

interface IProps {
  refreshGame: (playerId: number) => void;
  gameId: number;
}

const JoinGame = ({ refreshGame, gameId }: IProps) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(" ");

  const nameRef = useRef<HTMLInputElement | null>(null);

  const joinGameAction = async () => {
    if (!name.length) {
      setNameError(ERR_MANDATORY_FIELD);
      nameRef.current?.focus();
      return;
    }
    try {
      const playerId = await joinGame(gameId, name);
      refreshGame(playerId);
    } catch (e) {
      if (e instanceof Error) setNameError(e.message);
      nameRef.current?.focus();
      return;
    }
  };
  return (
    <Wrapper>
      <Box>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={2}
        >
          <Button variant="contained" onClick={() => joinGameAction()}>
            Join Game
          <AddOutlinedIcon style={{ paddingLeft: '1em' }} />
          </Button>
          <TextField
            label="Nickname"
            inputRef={nameRef}
            error={nameError !== " " ? true : false}
            value={name}
            helperText={nameError}
            onChange={(e) => {
              setName(e.target.value);
              setNameError(" ");
            }}
            variant="outlined"
          />
        </Stack>
      </Box>
    </Wrapper>
  );
};

export default JoinGame;
