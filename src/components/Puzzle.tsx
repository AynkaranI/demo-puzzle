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
import { generateMatrix } from "../helpers/generateMatrix";

export interface PuzzleGridType {
  x: number;
  y: number;
  position: number;
}

const Puzzle = () => {
  const tiles = [tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8, tile9];
  const cells = 3;
  const puzzleSize = 450;
  const tileSize = puzzleSize / cells;
  const matrix = generateMatrix(cells);

  const [puzzleGrid, setPuzzleGrid] = useState<PuzzleGridType[]>([]);
  const [solutionGrid, setSolutionGrid] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [moves, setMoves] = useState(0);

  const keypressHandler = (event: KeyboardEvent) => {
    const emptyTile = getEmptyTile();
    if (emptyTile) {
      if (event.code === "ArrowUp") {
        const otherTile = puzzleGrid.find(
          (tile) => tile.x === emptyTile.x + 1 && tile.y === emptyTile.y
        );
        otherTile && swapTiles(emptyTile, otherTile);
      } else if (event.code === "ArrowDown") {
        const otherTile = puzzleGrid.find(
          (tile) => tile.x === emptyTile.x - 1 && tile.y === emptyTile.y
        );
        otherTile && swapTiles(emptyTile, otherTile);
      } else if (event.code === "ArrowLeft") {
        const otherTile = puzzleGrid.find(
          (tile) => tile.x === emptyTile.x && tile.y === emptyTile.y + 1
        );
        otherTile && swapTiles(emptyTile, otherTile);
      } else if (event.code === "ArrowRight") {
        const otherTile = puzzleGrid.find(
          (tile) => tile.x === emptyTile.x && tile.y === emptyTile.y - 1
        );
        otherTile && swapTiles(emptyTile, otherTile);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keypressHandler);
    return () => window.removeEventListener("keydown", keypressHandler);
  }, [puzzleGrid]);

  useEffect(() => {
    setGridWithMatrix(matrix, true);
  }, []);

  useEffect(() => {
    checkSolution();
  }, [puzzleGrid]);

  const setGridWithMatrix = (
    gridMatrix: [number, number][],
    isSolutionMatrix: boolean = false
  ) => {
    const puzzleGrid: PuzzleGridType[] = gridMatrix.map((cell, position) => {
      return {
        x: cell[0],
        y: cell[1],
        position,
      };
    });
    setPuzzleGrid(puzzleGrid);
    if (isSolutionMatrix) setSolutionGrid(JSON.stringify(puzzleGrid));
  };

  const resetGrid = () => {
    const randomMatrix = [...matrix];
    randomMatrix.sort(() => Math.random() - 0.5);
    setGridWithMatrix(randomMatrix);
  };

  const getEmptyTile = () => puzzleGrid.find((tile) => tile.position === 8);

  const moveTile = (selectedTile: PuzzleGridType) => {
    const emptyTile = getEmptyTile();
    if (emptyTile) {
      if (
        (selectedTile.x === emptyTile.x || selectedTile.y === emptyTile.y) &&
        (Math.abs(selectedTile.x - emptyTile.x) === 1 ||
          Math.abs(selectedTile.y - emptyTile.y) === 1)
      ) {
        setMoves(moves + 1);
        swapTiles(selectedTile, emptyTile);
      }
    }
  };

  const checkSolution = () => {
    if (gameStarted && moves && solutionGrid === JSON.stringify(puzzleGrid)) {
      endGame();
    }
  };

  const endGame = () => {
    setMoves(0);
    setGameStarted(false);
  };

  const startGame = () => {
    setGameStarted(true);
    resetGrid();
  };

  const swapTiles = (
    selectedTile: PuzzleGridType,
    emptyTile: PuzzleGridType
  ) => {
    const newPuzzleGrid = [...puzzleGrid];
    newPuzzleGrid[selectedTile.position] = {
      ...emptyTile,
      position: selectedTile.position,
    };
    newPuzzleGrid[emptyTile.position] = {
      ...selectedTile,
      position: emptyTile.position,
    };
    setPuzzleGrid(newPuzzleGrid);
  };

  return (
    <>
      <div>Moves: {moves}</div>
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
                onClick={() => gameStarted && moveTile(tile)}
              >
                <img src={tiles[index]} height={150} width={150}></img>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        {!gameStarted && (
          <button className="btn btn-primary" onClick={startGame}>
            Start Game
          </button>
        )}
        {gameStarted && (
          <button className="btn btn-primary" onClick={resetGrid}>
            Reset
          </button>
        )}
      </div>
    </>
  );
};

export default Puzzle;
