import React, { useState } from 'react';
import './puzzleGame.css';

function PuzzleGame() {
  const [collectedPieces, setCollectedPieces] = useState([0, 2, 3, 5, 7, 10, 11, 13]);
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
              className={`puzzle-piece ${collectedPieces.includes(index) ? 'collected' : 'empty'}`}
              style={{
                backgroundImage: collectedPieces.includes(index) ? 'url(/jigsaw2.jpg)' : 'none',
                backgroundPosition: `-${col * pieceWidth}px -${row * pieceHeight}px`,
                backgroundSize: `${imgWidth}px ${imgHeight}px`
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PuzzleGame;