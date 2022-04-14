import { Button } from "@mui/material"
import styled from 'styled-components'
import createNewGame from "../api/create-new-game";



const Wrapper = styled.div`
  margin: 1em 0;
`;

interface IProps {
  refreshGames: () => void;
};

const NewGame = ({ refreshGames }: IProps) => {

  const addNewGame = async () => {
    await createNewGame();
    refreshGames();
  }
  return (
    <Wrapper>
      <Button 
        variant="contained"
        onClick={() => addNewGame()}
      >Create New Game</Button>
    </Wrapper>
  )
}

export default NewGame;
