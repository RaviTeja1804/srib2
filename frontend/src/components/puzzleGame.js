import React from "react";
import "./puzzleGame.css";

function PuzzleGame({ pieces }) {
  const totalPieces = 16;
  const imgWidth = 400;
  const imgHeight = 277;
  const pieceWidth = imgWidth / 4;
  const pieceHeight = imgHeight / 4;

  return (
    <div className="puzzle-container">
      <div className="puzzle-grid">
        {Array.from({ length: totalPieces }).map((_, index) => {
          const row = Math.floor(index / 4);
          const col = index % 4;

          return (
            <div
              key={index}
              className={`puzzle-piece ${
                pieces.includes(index) ? "collected" : "empty"
              }`}
              style={{
                backgroundImage: pieces.includes(index)
                  ? "url(/jigsaw2.jpg)"
                  : "none",
                backgroundPosition: `-${col * pieceWidth}px -${
                  row * pieceHeight
                }px`,
                backgroundSize: `${imgWidth}px ${imgHeight}px`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PuzzleGame;
