import { Button, Stack, TextField } from "@mui/material";
import { useRef, useState } from "react";
import styled from "styled-components";
import createNewGame from "../api/create-new-game";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const Wrapper = styled.div`
  margin: 1em 0;
`;

interface IProps {
  refreshGames: () => void;
}

const NewGame = ({ refreshGames }: IProps) => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(" ");

  const addNewGame = async () => {
    try {
      await createNewGame(name);
      setNameError(" ");
    } catch (e) {
      if (e instanceof Error) setNameError(e.message);
      nameRef.current?.focus();
      return;
    }
    refreshGames();
  };
  return (
    <Wrapper>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={2}
      >
        <Button variant="contained" onClick={() => addNewGame()}>
          Create New Game
          <AddOutlinedIcon style={{ paddingLeft: '1em' }} />
        </Button>
        <TextField
          label="Nickname"
          inputRef={nameRef}
          helperText={nameError}
          error={nameError !== " " ? true : false}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameError(" ");
          }}
          variant="outlined"
        />
      </Stack>
    </Wrapper>
  );
};

export default NewGame;
