import React, { useEffect, useState } from 'react';
import './leaderboard.css';
import axios from 'axios'; 

function Leaderboard() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get('http://localhost:4000/leaderboard');
        const sortedUsers = res.data.sort((a, b) => b.pieces.length - a.pieces.length);
        setUsers(sortedUsers);
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
      }
    };

    fetchLeaderboard();
  }, []);

  const getMedalClass = (rank) => {
    if (rank === 1) return 'gold';
    if (rank === 2) return 'silver';
    if (rank === 3) return 'bronze';
    return '';
  };

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-header">Puzzle Champions</h1>
      
      <table className="leaderboard-table">
        <thead className="table-header">
          <tr>
            <th className="rank-cell">Rank</th>
            <th className="player-cell">Player</th>
            <th className="pieces-cell">Pieces (out of 16)</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="table-row">
              <td className={`table-data rank-cell ${getMedalClass(index + 1)}`}>
                {index + 1}
              </td>
              <td className="table-data player-cell">{user.username}</td>
              <td className="table-data pieces-cell">
                <span className={`pieces-count ${getMedalClass(index + 1)}`}>
                  {user.pieces.length}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;