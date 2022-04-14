import { Box, Container } from "@mui/material";
import { TText } from "../types";

interface IText {
  text: TText;
}
const Text = ({ text }: IText) => {
  return <Container>
    <h2>{text.Name}</h2>
    <Box>{text.Text}</Box>
  </Container>
};

export default Text;
