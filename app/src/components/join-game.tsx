import { Button } from "@mui/material";
import styled from "styled-components";
import joinGame from "../api/join-game";

const Wrapper = styled.div`
  margin: 1em 0;
`;

interface IProps {
  refreshGame: () => void;
  gameId: number;
}

const JoinGame = ({ refreshGame, gameId }: IProps) => {
  const joinGameAction = async () => {
    await joinGame(gameId);
    refreshGame();
  };
  return (
    <Wrapper>
      <Button variant="contained" onClick={() => joinGameAction()}>
        Join Game
      </Button>
    </Wrapper>
  );
};

export default JoinGame;
