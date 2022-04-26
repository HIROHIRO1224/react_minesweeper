import { Repeat } from "typescript-tuple";

export type MSCol = {
  filled: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | "Bom" | undefined;
  isClick: boolean;
};

export type MSRow = Repeat<MSCol, 9>;
export type MSTable = Repeat<MSRow, 9>;
