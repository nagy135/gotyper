import { Box, Container, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { TText } from "../types";
import Api from "../api";

interface IProps {
  text: TText;
  playerId: number | null;
}

const Text = ({ text, playerId }: IProps) => {
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
          const next = Math.round((written.length / shown.length) * 100);
          if (next != prev) {
            Api.updateProgress(playerId, next);
            return next;
          }
          return prev;
        });
      }
    },
    [written, playerId]
  );

  return (
    <Container>
      <h2>{text.Name}</h2>
      <Box>
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          fullWidth
          multiline
          rows={10}
          style={{ caretColor: "transparent" }}
          value={shown}
          onKeyPress={(e) => gameKeyPressed(e.key)}
        />
      </Box>
    </Container>
  );
};

export default Text;
