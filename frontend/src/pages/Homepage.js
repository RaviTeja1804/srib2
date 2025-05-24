import React from 'react'
import './LoginSignup.css'
import PuzzleGame from '../components/puzzleGame.js';
import { useNavigate } from 'react-router-dom';
import Leaderboard from '../components/leaderboard.js';
import FakePayment from '../components/fakePayment.js';

function Homepage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="puzzle-container">
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
            <h2>Your Puzzle Progress</h2>
            <PuzzleGame />
            <Leaderboard />
            <FakePayment />
        </div>
    );
}

export default Homepage