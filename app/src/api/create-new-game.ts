import { API } from "../constants";
import { ERR_MANDATORY_FIELD, ERR_SERVER_ERROR } from "../errors/constants";

const createNewGame = async (name: string) => {
  const response = await fetch(`${API}/games`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({
      name,
    }), // body data type must match "Content-Type" header
  });

  // TODO: type error
  switch (response.status){
    case 400:
      throw new Error(ERR_MANDATORY_FIELD)
    case 500:
      throw new Error(ERR_SERVER_ERROR)
  }
  if (!response.ok) throw new Error("Unknown");
};

export default createNewGame;
