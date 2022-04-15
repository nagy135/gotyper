import { API } from "../constants";
import { TGame } from "../types";

const getGame = async (gameId: number): Promise<TGame> => {
  const response = await fetch(`${API}/games/${gameId}/players`);

  // TODO: type error
  if (!response.ok) throw new Error("Unknown");

  return (await response.json()) as TGame;
};

export default getGame;
