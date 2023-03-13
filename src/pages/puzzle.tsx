import { HeadFC } from "gatsby";
import React, { useEffect, useState } from "react";
import {
  tile1,
  tile2,
  tile3,
  tile4,
  tile5,
  tile6,
  tile7,
  tile8,
  tile9,
} from "../../assets/images/puzzle";

export interface PuzzleGridType {
  x: number;
  y: number;
  value: number;
}

const StartPage = () => {
  const tiles = [tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8, tile9];
  const cells = 3;
  const puzzleSize = 450;
  const tileSize = puzzleSize / cells;

  const [puzzleGrid, setPuzzleGrid] = useState<PuzzleGridType[]>([]);
  const [solutionGrid, setSolutionGrid] = useState<PuzzleGridType[]>([]);

  useEffect(() => {
    generateMatrix();
  }, []);

  useEffect(() => {
    checkSolution();
  }, [puzzleGrid]);

  const generateMatrix = () => {
    const matrix: PuzzleGridType[] = [];
    const randomPositions: [number, number][] = [];
    let tileIndex = 0;
    for (let x = 0; x < cells; x++) {
      for (let y = 0; y < cells; y++) {
        matrix.push({
          x,
          y,
          value: tileIndex,
        });
        tileIndex++;
        randomPositions.push([x, y]);
      }
    }
    setSolutionGrid(matrix);
    setPuzzleGrid(matrix);
    randomPositions.sort(() => Math.random() - 0.5);
    const puzzleGrid: PuzzleGridType[] = matrix.map((tile, index) => {
      return {
        x: randomPositions[index][0],
        y: randomPositions[index][1],
        value: tile.value,
      };
    });
    setTimeout(() => setPuzzleGrid(puzzleGrid), 2000);
  };

  const getEmptyTile = () => puzzleGrid.find((tile) => tile.value === 8);

  const handleClick = (selectedTile: PuzzleGridType) => {
    const emptyTile = getEmptyTile();
    if (emptyTile) {
      if (
        (selectedTile.x === emptyTile.x || selectedTile.y === emptyTile.y) &&
        (Math.abs(selectedTile.x - emptyTile.x) === 1 ||
          Math.abs(selectedTile.y - emptyTile.y) === 1)
      ) {
        swapTiles(selectedTile, emptyTile);
      }
    }
  };

  const checkSolution = () => {
    if (JSON.stringify(solutionGrid) === JSON.stringify(puzzleGrid)) {
      console.log("Game Over");
    }
  };

  const swapTiles = (
    selectedTile: PuzzleGridType,
    emptyTile: PuzzleGridType
  ) => {
    const newPuzzleGrid = [...puzzleGrid];
    newPuzzleGrid[selectedTile.value] = {
      ...emptyTile,
      value: selectedTile.value,
    };
    newPuzzleGrid[emptyTile.value] = {
      ...selectedTile,
      value: emptyTile.value,
    };
    setPuzzleGrid(newPuzzleGrid);
  };

  return (
    <>
      <div>
        <ul id="puzzle-box" style={{ height: puzzleSize, width: puzzleSize }}>
          {puzzleGrid.map((tile, index) => {
            return (
              <li
                className={puzzleGrid.length === index + 1 ? "disable" : ""}
                key={index}
                style={{
                  top: tile.x * tileSize,
                  left: tile.y * tileSize,
                }}
                onClick={() => handleClick(tile)}
              >
                <img src={tiles[index]} height={150} width={150}></img>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default StartPage;

export const Head: HeadFC = () => <title>Puzzle</title>;
