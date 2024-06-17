"use client";

import React, { useEffect, useState } from "react";
import "./square-grid.scss";
import { Square } from "../square/Square";

interface SquaresGridProps {
  cleared: () => void;
}

export const SquaresGrid: React.FC<SquaresGridProps> = ({ cleared }) => {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [squareSize, setSquareSize] = useState(0);
  const [squares, setSquares] = useState<any[]>([]);
  const [clear, setClear] = useState<boolean>(false);

  const numCols = Math.ceil(screenSize.width / squareSize);
  const numRows = Math.ceil(screenSize.height / squareSize);

  // Calculate the starting point for the 9x5 grid in the center
  const startCol = Math.floor((numCols - 9) / 2);
  const startRow = Math.floor((numRows - 5) / 2);

  // Set and update square sizes on page load
  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setScreenSize({ width, height });

      // Calculate the size of each square
      const fixedSquareSize = 90;
      setSquareSize(fixedSquareSize);
    };

    window.addEventListener("resize", updateSize);
    updateSize(); // Initial call

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Load squares on the grid
  useEffect(() => {
    let tempSquares: any[] = [];
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        const isCenterGrid =
          i >= startRow &&
          i < startRow + 5 &&
          j >= startCol &&
          j < startCol + 9;

        tempSquares.push(
          <Square
            key={`${i}-${j}`}
            squareSize={squareSize}
            isCenterGrid={isCenterGrid}
            clicked={() => {
              setClear(true);
              cleared();
            }}
            clear={clear}
            // image={imageUrl}
            x={i}
            y={j}
          />
        );
      }
    }
    setSquares([...tempSquares]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenSize, squareSize, clear]);

  return (
    <div
      className="square-grid"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${numCols}, ${squareSize}px)`,
        gridTemplateRows: `repeat(${numRows}, ${squareSize}px)`,
      }}
    >
      {squares}
    </div>
  );
};
