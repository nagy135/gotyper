import { useEffect, useState } from "react";
import Container from '@mui/material/Container';
import { useParams } from "react-router-dom";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const API = "http://localhost:8080";

export default function Games() {
  const [game, setGame] = useState<Record<string, any> | null>(null);
  let { gameId } = useParams();

  useEffect(() => {
    fetch(`${API}/games/${gameId}/players`)
      .then((res) => res.json())
      .then((res) => setGame(res));
  }, []);

  console.log(game);

  return (
    <Container>
      {game ?
        <>
          <h1>{game["Name"]}</h1>
          {game["Players"].length ? <>
            <h2>Players</h2>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell align="right">Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {game["Players"].map((player: any) => (
                    <TableRow
                      key={player["ID"]}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {player["ID"]}
                      </TableCell>
                      <TableCell align="right">{player["Name"]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </> : null}
        </> : null
      }
    </Container>
  );
};
