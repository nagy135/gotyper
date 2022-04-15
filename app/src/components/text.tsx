import { Box, Container, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { TText } from "../types";
import Api from "../api";
import { calculateWpm, currentTimestampSec } from "../utils/wpm";

interface IProps {
  text: TText;
  playerId: number | null;
  refreshGame: (playerId?: number) => void;
}

const Text = ({ text, playerId, refreshGame }: IProps) => {
  const [written, setWritten] = useState("");
  const [shown, setShown] = useState(text.Text);
  const [progress, setProgress] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [startStamp, setStartStamp] = useState<number | null>(null);

  const gameKeyPressed = useCallback(
    (key: string) => {
      if (!playerId) {
        window.alert("Not joined");
        return;
      }
      if (text.Text.startsWith(written + key)) {
        if (!startStamp) setStartStamp(currentTimestampSec);
        setWritten((prev) => prev + key);
        setShown((prev) => prev.substring(1));
        setProgress((prev) => {
          const next = Math.round((written.length / text.Text.length) * 100);
          if (next != prev) {
            const wpm = calculateWpm(
              written.length,
              currentTimestampSec() - (startStamp ?? 0)
            );
            setWpm(wpm);
            Api.updateProgress(playerId, next, wpm);
            refreshGame();
            return next;
          }
          return prev;
        });
      }
    },
    [written, playerId, text, refreshGame, startStamp]
  );

  return (
    <Box>
      <h1>{text.Name}</h1>
      <h2>Progress: {progress}</h2>
      <h2>Wpm: {wpm}</h2>
      <Box>
        <TextField
          id="outlined-multiline-static"
          label="Click and Type!"
          fullWidth
          multiline
          inputProps={{ style: { fontSize: "1.4em" } }} // font size of input text
          style={{ caretColor: "transparent" }}
          value={shown}
          onKeyPress={(e) => gameKeyPressed(e.key)}
        />
      </Box>
    </Box>
  );
};

export default Text;
