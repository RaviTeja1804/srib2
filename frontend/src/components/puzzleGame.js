import React from "react";
import "./puzzleGame.css";
import { useState, useEffect } from "react";
import axios from "axios";

function PuzzleGame({ pieces }) {
  const totalPieces = 16;
  const imgWidth = 400;
  const imgHeight = 277;
  const pieceWidth = imgWidth / 4;
  const pieceHeight = imgHeight / 4;

  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchOrGenerateImage = async (month) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/generateAndGet",
        { month }
      );
      setImageUrl(response.data.image);
    } catch (error) {
      console.error("Failed to get or generate image:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const today = new Date();
    const month = today.toISOString().slice(0, 7);
    fetchOrGenerateImage(month);
  }, []);

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
                  ? `url(${imageUrl})`
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
