import { useCallback, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
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

export default function Games() {
  const navigate = useNavigate();
  const [game, setGame] = useState<TGame | null>(null);
  let { gameId } = useParams();

  const apiUpdate = useCallback(() => {
    if (gameId) Api.getGame(Number(gameId)).then((game) => setGame(game));
  }, []);

  useEffect(() => {
    apiUpdate();
  }, [gameId]);

  const redirectToGames = () => {
    navigate(`/`);
  };

  return (
    <Container>
      <Button color="error" onClick={redirectToGames} variant="contained">
        Back
      </Button>
      {game ? (
        <>
          <h1>{game.Name}</h1>
          <h2>{game.Done ? "Ended" : "In progress"}</h2>
          <JoinGame refreshGame={apiUpdate} gameId={Number(gameId)} />
          {game.Players && game.Players.length ? (
            <>
              <h2>Players ({game.Players.length})</h2>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell align="right">Name</TableCell>
                      <TableCell align="right">Progress</TableCell>
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : null}
          <Text text={game.Text} />
        </>
      ) : null}
    </Container>
  );
}
