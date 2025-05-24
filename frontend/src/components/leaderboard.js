import React from 'react';
import './leaderboard.css';

function Leaderboard() {
  const users = [
    { id: 1, name: 'Alex Johnson', collectedPieces: 16 },
    { id: 2, name: 'Sam Wilson', collectedPieces: 14 },
    { id: 3, name: 'Taylor Swift', collectedPieces: 12 },
    { id: 4, name: 'Jordan Lee', collectedPieces: 9 },
    { id: 5, name: 'Casey Smith', collectedPieces: 7 },
    { id: 6, name: 'Riley Davis', collectedPieces: 5 },
    { id: 7, name: 'Morgan Taylor', collectedPieces: 3 }
  ];

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
              <td className="table-data player-cell">{user.name}</td>
              <td className="table-data pieces-cell">
                <span className={`pieces-count ${getMedalClass(index + 1)}`}>
                  {user.collectedPieces}
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