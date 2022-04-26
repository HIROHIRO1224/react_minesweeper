import React, { useState } from "react";
import { MSCol, MSTable } from "../Types";
import "../Minesweeper.css";

export type MSViewProps = {
  table: MSTable;
  onCellClick: (y: number, x: number) => void;
};

export const MSView = (props: MSViewProps) => {
  const { table, onCellClick } = props;

  const col2String = (col: MSCol) => {
    if (!col.isClick) {
      return "";
    }
    switch (col.filled) {
      case 0 || undefined:
        return "";

      case 1:
        return "1";

      case 2:
        return "2";

      case 3:
        return "3";

      case 4:
        return "4";

      case 5:
        return "5";

      case 6:
        return "6";

      case 7:
        return "7";

      case 8:
        return "8";

      case "Bom":
        return "B";
    }
  };

  return (
    <table className="">
      {table.map((row, y) => (
        <tr>
          {row.map((col, x) => (
            <td className="MSCol" onClick={() => onCellClick(y, x)}>
              {col2String(col)}
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
};
