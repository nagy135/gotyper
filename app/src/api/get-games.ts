import { API } from "../constants";
import { TGame } from "../types";

const getGames = async () => {
    const response = await fetch(`${API}/games`);
    return (await response.json() as TGame[])
}

export default getGames;
