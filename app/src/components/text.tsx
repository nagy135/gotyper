import { Box, Container, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { TText } from "../types";

interface IProps {
  text: TText;
}

const Text = ({ text }: IProps) => {
  const [written, setWritten] = useState("");
  const [shown, setShown] = useState(text.Text);

  const gameKeyPressed = useCallback(
    (key: string) => {

      if (text.Text.startsWith(written + key)) {
        setWritten((prev) => prev + key);
        setShown((prev) => prev.substring(1));
      }
    },
    [written]
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
