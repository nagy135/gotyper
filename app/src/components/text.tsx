import { Box, Container, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { TText } from "../types";
import Api from "../api";

interface IProps {
  text: TText;
  playerId: number | null;
  refreshGame: (playerId?: number) => void;
}

const Text = ({ text, playerId, refreshGame }: IProps) => {
  const [written, setWritten] = useState("");
  const [shown, setShown] = useState(text.Text);
  const [progress, setProgress] = useState(0);

  const gameKeyPressed = useCallback(
    (key: string) => {
      if (!playerId) {
        window.alert("Not joined");
        return;
      }
      if (text.Text.startsWith(written + key)) {
        setWritten((prev) => prev + key);
        setShown((prev) => prev.substring(1));
        setProgress((prev) => {
          const next = Math.round((written.length / text.Text.length) * 100);
          if (next != prev) {
            Api.updateProgress(playerId, next);
            refreshGame();
            return next;
          }
          return prev;
        });
      }
    },
    [written, playerId, text, refreshGame]
  );

  return (
    <Container>
      <h2>{text.Name}</h2>
      <h2>Progress: {progress}</h2>
      <Box>
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          fullWidth
          multiline
          inputProps={{style: {fontSize: "1.4em",}}} // font size of input text
          InputLabelProps={{style: {fontSize: "1.4em"}}} // font size of input label

          style={{ caretColor: "transparent" }}
          value={shown}
          onKeyPress={(e) => gameKeyPressed(e.key)}
        />
      </Box>
    </Container>
  );
};

export default Text;
