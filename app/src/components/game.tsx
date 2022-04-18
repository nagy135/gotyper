import { useCallback, useEffect, useRef, useState } from "react";
import Container from "@mui/material/Container";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { TGame } from "../types";
import Api from "../api";
import Text from "./text";
import JoinGame from "./join-game";
import styled from "styled-components";
import { ArrowBack } from "@mui/icons-material";

const Wrapper = styled.div`
  margin: 1em 0;

  .title,
  .text-title {
    font-size: 3.5em;
  }
   .text-stats {
    margin-bottom: 1em;
  }
  .players {
    margin-top: 1em;
  }
`;

export default function Games() {
  const navigate = useNavigate();
  const [game, setGame] = useState<TGame | null>(null);
  const [playerId, setPlayerId] = useState<number | null>(null);
  let { gameId } = useParams();

  const apiUpdate = useCallback(
    (playerId?: number, scroll: boolean = false) => {
      if (gameId)
        Api.getGame(Number(gameId))
          .then((game) => setGame(game))
          .catch(() => navigate(`/`));
      if (playerId) setPlayerId(playerId);
      if (scroll)
        window.scrollTo({
          left: 0,
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
    },
    []
  );

  useEffect(() => {
    apiUpdate();
  }, [gameId]);

  const redirectToGames = () => {
    navigate(`/`);
  };

  return (
    <Wrapper>
      <Container>
        <Button color="error" onClick={redirectToGames} variant="contained">
          <ArrowBack />
        </Button>
        {game ? (
          <>
            <h1 className="title">{game.Name}</h1>
            <Divider />
            <JoinGame refreshGame={apiUpdate} gameId={Number(gameId)} />
            <Divider />
            <Text
              refreshGame={apiUpdate}
              text={game.Text}
              playerId={playerId}
            />
            {game.Players && game.Players.length ? (
              <div className="players">
                <Divider />
                <h2>Players ({game.Players.length})</h2>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Progress</TableCell>
                        <TableCell align="right">Wpm</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {game.Players.map((player: any) => (
                        <TableRow
                          key={player.ID}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {player.ID}
                          </TableCell>
                          <TableCell align="right">{player.Name}</TableCell>
                          <TableCell align="right">{player.Progress}</TableCell>
                          <TableCell align="right">{player.Wpm}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            ) : null}
          </>
        ) : null}
      </Container>
    </Wrapper>
  );
}
