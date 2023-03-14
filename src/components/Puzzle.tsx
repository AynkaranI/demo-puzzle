/* eslint-disable react-hooks/exhaustive-deps */
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
  mainImage,
} from "../assets/images/puzzle";
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
  const storedData =
    localStorage.getItem("puzzle") &&
    JSON.parse(localStorage.getItem("puzzle") || "");

  const [puzzleGrid, setPuzzleGrid] = useState<PuzzleGridType[]>([]);
  const [solutionGrid, setSolutionGrid] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [moves, setMoves] = useState(0);

  const startGame = () => {
    setGameStarted(true);
    !storedData && resetGrid();
  };

  const endGame = () => {
    setGameStarted(false);
    setTimeout(() => {
      alert("Congrats You have solved the puzzle");
      setMoves(0);
    }, 2000);
  };

  const checkSolution = () => {
    if (gameStarted && moves && solutionGrid === JSON.stringify(puzzleGrid)) {
      endGame();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keypressHandler);
    return () => window.removeEventListener("keydown", keypressHandler);
  }, [puzzleGrid]);

  useEffect(() => {
    if (storedData) {
      setGameStarted(true);
      setPuzzleGrid(storedData.puzzleGrid);
      setMoves(storedData.moves);
    } else {
      setGridWithMatrix(matrix, true);
    }
  }, []);

  useEffect(() => {
    checkSolution();
    moves &&
      localStorage.setItem("puzzle", JSON.stringify({ puzzleGrid, moves }));
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

  const keypressHandler = (event: KeyboardEvent) => {
    const emptyTile = getEmptyTile();
    if (emptyTile) {
      if (event.code === "ArrowUp" || event.code === "KeyW") {
        const otherTile = puzzleGrid.find(
          (tile) => tile.x === emptyTile.x + 1 && tile.y === emptyTile.y
        );
        if (otherTile) {
          swapTiles(emptyTile, otherTile);
          setMoves(moves + 1);
        }
      } else if (event.code === "ArrowDown" || event.code === "KeyS") {
        const otherTile = puzzleGrid.find(
          (tile) => tile.x === emptyTile.x - 1 && tile.y === emptyTile.y
        );
        if (otherTile) {
          swapTiles(emptyTile, otherTile);
          setMoves(moves + 1);
        }
      } else if (event.code === "ArrowLeft" || event.code === "KeyA") {
        const otherTile = puzzleGrid.find(
          (tile) => tile.x === emptyTile.x && tile.y === emptyTile.y + 1
        );
        if (otherTile) {
          swapTiles(emptyTile, otherTile);
          setMoves(moves + 1);
        }
      } else if (event.code === "ArrowRight" || event.code === "KeyD") {
        const otherTile = puzzleGrid.find(
          (tile) => tile.x === emptyTile.x && tile.y === emptyTile.y - 1
        );
        if (otherTile) {
          swapTiles(emptyTile, otherTile);
          setMoves(moves + 1);
        }
      }
    }
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
      <h1 className="text-white text-center mb-4">Solve the Puzzle</h1>
      <div className="position-relative">
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
                <img
                  alt="img"
                  src={tiles[index]}
                  height={150}
                  width={150}
                ></img>
              </li>
            );
          })}
        </ul>
        <img
          src={mainImage}
          alt="mainImage"
          className={`main-image ${gameStarted ? "active" : ""}`}
        />
      </div>
      <div className="d-flex justify-content-between align-items-center mt-5">
        {!gameStarted && (
          <button className="btn btn-light" onClick={startGame}>
            Start Game
          </button>
        )}
        {/* Mobile Image  */}
        {gameStarted && (
          <button className="btn btn-info" onClick={resetGrid}>
            Shuffle
          </button>
        )}
        <img
          src={mainImage}
          alt="mainImage"
          className={`mobile-img ${gameStarted ? "active" : ""}`}
          width={120}
          height={120}
        />
        <div
          className={`moves transition ${moves ? "opacity-100" : "opacity-0"}`}
        >
          Moves: {moves}
        </div>
      </div>
    </>
  );
};

export default Puzzle;
