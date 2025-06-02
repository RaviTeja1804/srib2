import React, { useState, useEffect } from "react";
import "./LoginSignup.css";
import PuzzleGame from "../components/puzzleGame.js";
import { useNavigate } from "react-router-dom";
import Leaderboard from "../components/leaderboard.js";
import FakePayment from "../components/fakePayment.js";

function Homepage() {
  const navigate = useNavigate();
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setPieces(user.pieces || []);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="puzzle-container">
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
      <h2>Your Puzzle Progress</h2>
      <PuzzleGame pieces={pieces} />
      <Leaderboard />
      <FakePayment pieces={pieces} setPieces={setPieces} />
    </div>
  );
}

export default Homepage;
