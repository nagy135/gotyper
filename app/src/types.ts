export type TGame = {
  ID: number;
  Done: boolean;
  Name: string;
  Text: TText;
  CreatedAt: string;
  UpdatedAt: string;
  Players?: TPlayer[];
}

export type TPlayer = {
  ID: number;
  Progress: number;
  Name: string;
  CreatedAt: string;
  UpdatedAt: string;
}

export type TText = {
  ID: number;
  Text: string;
  Name: string;
}
