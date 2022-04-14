import { API } from "../constants";
import { TText } from "../types";

const getTexts = async () => {
    const response = await fetch(`${API}/texts`);
    return (await response.json() as TText[])
}

export default getTexts;
