import { count } from "console";
import React, { useState } from "react";
import { MSCol, MSTable } from "../Types";
import { MSView } from "./MSView";

/**
 * ランダム整数生成関数
 * @param min 生成する乱数の範囲の最小値
 * @param max 生成する乱数の範囲の最大値
 * @return 指定した範囲の中でランダムに生成した整数
 */
const getRandomIntInclusive = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * テーブルを複製する関数
 * @param table 複製したいテーブル
 * @returns 複製したテーブル
 */
const cloneTable = (table: MSTable) => {
  return table.map((row) => [...row]) as MSTable;
};

export const MSGame = () => {
  const [table, setTable] = useState<MSTable>([
    [
      //1
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
    ],
    [
      //2
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
    ],
    [
      //3
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
    ],
    [
      //4
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
    ],
    [
      //5
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
    ],
    [
      //6
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
    ],
    [
      //7
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
    ],
    [
      //8
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
    ],
    [
      //9
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
      { filled: undefined, isClick: false },
    ],
  ]);

  const handleCellClick = (y: number, x: number) => {
    const newTable = cloneTable(table);

    if (newTable[y][x].filled === undefined) {
      // ランダムな数字を５つ作る
      let randNum = [0, 0, 0, 0, 0];
      do {
        // 0~80までの整数で乱数を生成する
        for (let i = 0; i < randNum.length; i++) {
          randNum[i] = getRandomIntInclusive(0, 80);
        }
      } while (
        //５つ全ての乱数が重複している、またはクリックした場所から全方向一マスのところの場合は繰り返す
        !firstJugdeCondition(y, x, randNum)
      );

      //順番に配列を見て行ってその座標がクリックした座標から全方向に一マスの範囲ではない、且つランダムに生成された座標ではない場合
      //上の条件に当てはまる場合は爆弾を埋める
      for (let i = 0; i < newTable.length; i++) {
        for (let j = 0; j < newTable[i].length; j++) {
          if (
            !clickArea(y, x, cellToIndex(i, j)) &&
            randNum.every((v) => v !== cellToIndex(i, j))
          ) {
            newTable[i][j].filled = "Bom";
          }
        }
      }

      for (let i = 0; i < newTable.length; i++) {
        for (let j = 0; j < newTable[i].length; j++) {
          if (newTable[i][j].filled !== "Bom") {
            switch (countBom(i, j, newTable)) {
              case 0:
                newTable[i][j].filled = 0;
                break;
              case 1:
                newTable[i][j].filled = 1;
                break;
              case 2:
                newTable[i][j].filled = 2;
                break;
              case 3:
                newTable[i][j].filled = 3;
                break;
              case 4:
                newTable[i][j].filled = 4;
                break;
              case 5:
                newTable[i][j].filled = 5;
                break;
              case 6:
                newTable[i][j].filled = 6;
                break;
              case 7:
                newTable[i][j].filled = 7;
                break;
              case 8:
                newTable[i][j].filled = 8;
                break;
            }
          }
        }
        firstDig(y, x, newTable);
      }

      setTable(newTable);
    } else {
      dig(y, x, newTable);
      setTable(newTable);
    }
  };

  return <MSView table={table} onCellClick={handleCellClick} />;
};

/**
 * 乱数に重複がなく、かつクリックしたマスから全方向に一マスの場所ではない時にtrueを返す
 * それ以外の時はfalseを返す
 * @param y クリックしたマスのy座標
 * @param x クリックしたマスのx座標
 * @param randNum ランダムに生成した数の配列
 * @returns 条件に合ってるかそうでないか
 */
const firstJugdeCondition = (y: number, x: number, randNum: number[]) => {
  return (
    randNum.every((v, i, self) => self.indexOf(v) === i) &&
    randNum.every((v) => v !== (y - 1) * 9 + x - 1) &&
    randNum.every((v) => v !== (y - 1) * 9 + x) &&
    randNum.every((v) => v !== (y - 1) * 9 + x + 1) &&
    randNum.every((v) => v !== y * 9 + x - 1) &&
    randNum.every((v) => v !== y * 9 + x) &&
    randNum.every((v) => v !== y * 9 + x + 1) &&
    randNum.every((v) => v !== (y + 1) * 9 + x - 1) &&
    randNum.every((v) => v !== (y + 1) * 9 + x) &&
    randNum.every((v) => v !== (y + 1) * 9 + x + 1)
  );
};

/**
 *
 * @param y クリックした座標のy座標
 * @param x クリックした座標のx座標
 * @param num 数
 * @returns クリックした座標から全方向一マスの範囲にある場合はtrue、そうでない場合はfalse
 */
const clickArea = (y: number, x: number, num: number) => {
  return (
    num === (y - 1) * 9 + x - 1 ||
    num === (y - 1) * 9 + x ||
    num === (y - 1) * 9 + x + 1 ||
    num === y * 9 + x - 1 ||
    num === y * 9 + x ||
    num === y * 9 + x + 1 ||
    num === (y + 1) * 9 + x - 1 ||
    num === (y + 1) * 9 + x ||
    num === (y + 1) * 9 + x + 1
  );
};

/**
 * 座標から何番目か（添字）を求める関数
 * @param y y座標（0始まり）
 * @param x x座標（0始まり）
 * @returns 添字（0始まり）
 */
const cellToIndex = (y: number, x: number) => {
  return y * 9 + x;
};

/**
 * 添字からxとyの座標に変換する関数
 * @param num 配列の添字（0始まり）
 * @returns y座標、x座標（0始まり）
 */
const indexToCell = (num: number) => {
  return [Math.floor(num / 9), num % 9];
};

/**
 * マスの周りの爆弾の数を調べる関数
 * @param y 調べる座標のy座標
 * @param x 調べる座標のx座標
 * @param table 調べる対象のテーブル
 * @returns 調べた座標の周りにある爆弾の数
 */
const countBom = (y: number, x: number, table: MSTable) => {
  let num: number = 0;

  if (y - 1 >= 0 && x - 1 >= 0) {
    if (table[y - 1][x - 1].filled === "Bom") {
      num++;
    }
  }
  if (y - 1 >= 0) {
    if (table[y - 1][x].filled === "Bom") {
      num++;
    }
  }
  if (y - 1 >= 0 && x + 1 <= 8) {
    if (table[y - 1][x + 1].filled === "Bom") {
      num++;
    }
  }
  if (x - 1 >= 0) {
    if (table[y][x - 1].filled === "Bom") {
      num++;
    }
  }
  if (x + 1 <= 8) {
    if (table[y][x + 1].filled === "Bom") {
      num++;
    }
  }
  if (y + 1 <= 8 && x - 1 >= 0) {
    if (table[y + 1][x - 1].filled === "Bom") {
      num++;
    }
  }
  if (y + 1 <= 8) {
    if (table[y + 1][x].filled === "Bom") {
      num++;
    }
  }
  if (y + 1 <= 8 && x + 1 <= 8) {
    if (table[y + 1][x + 1].filled === "Bom") {
      num++;
    }
  }

  return num;
};

const firstDig = (y: number, x: number, table: MSTable) => {
  if (y - 1 >= 0 && x - 1 >= 0) {
    if (table[y - 1][x - 1].filled !== "Bom") {
      table[y - 1][x - 1].isClick = true;
    } else {
      for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[i].length; j++) {
          table[i][j].isClick = true;
        }
      }
    }
  }
  if (y - 1 >= 0) {
    if (table[y - 1][x].filled !== "Bom") {
      table[y - 1][x].isClick = true;
    } else {
      for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[i].length; j++) {
          table[i][j].isClick = true;
        }
      }
    }
  }
  if (y - 1 >= 0 && x + 1 <= 8) {
    if (table[y - 1][x + 1].filled !== "Bom") {
      table[y - 1][x + 1].isClick = true;
    } else {
      for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[i].length; j++) {
          table[i][j].isClick = true;
        }
      }
    }
  }
  if (x - 1 >= 0) {
    if (table[y][x - 1].filled !== "Bom") {
      table[y][x - 1].isClick = true;
    } else {
      for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[i].length; j++) {
          table[i][j].isClick = true;
        }
      }
    }
  }
  if (x + 1 <= 8) {
    if (table[y][x + 1].filled !== "Bom") {
      table[y][x + 1].isClick = true;
    } else {
      for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[i].length; j++) {
          table[i][j].isClick = true;
        }
      }
    }
  }
  if (y + 1 <= 8 && x - 1 >= 0) {
    if (table[y + 1][x - 1].filled !== "Bom") {
      table[y + 1][x - 1].isClick = true;
    } else {
      for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[i].length; j++) {
          table[i][j].isClick = true;
        }
      }
    }
  }
  if (y + 1 <= 8) {
    if (table[y + 1][x].filled !== "Bom") {
      table[y + 1][x].isClick = true;
    } else {
      for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[i].length; j++) {
          table[i][j].isClick = true;
        }
      }
    }
  }
  if (y + 1 <= 8 && x + 1 <= 8) {
    if (table[y + 1][x + 1].filled !== "Bom") {
      table[y + 1][x + 1].isClick = true;
    } else {
      for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[i].length; j++) {
          table[i][j].isClick = true;
        }
      }
    }
  }
};

const dig = (y: number, x: number, table: MSTable) => {
  if (table[y][x].filled !== "Bom") {
    table[y][x].isClick = true;
  } else {
    for (let i = 0; i < table.length; i++) {
      for (let j = 0; j < table[i].length; j++) {
        table[i][j].isClick = true;
      }
    }
  }
};
