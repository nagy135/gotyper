import { API } from "../constants";
import { TGame } from "../types";

const getGame = async (gameId: number) => {
    const response = await fetch(`${API}/games/${gameId}/players`);
    return (await response.json() as TGame)
}

export default getGame;
