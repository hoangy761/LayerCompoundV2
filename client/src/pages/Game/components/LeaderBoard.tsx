import React from 'react';
import { userPoints } from './testValue';
import UserPoint from './UserPoint';

function LeaderBoard() {
  const top10UserPoints = userPoints.slice(0, 10);
  return (
    <div className="bg-black opacity-80 p-4">
      <div className="grid grid-cols-3 gap-9">
        <p>Top</p>
        <p>Name</p>
        <p>Score</p>
      </div>
      {top10UserPoints.map((user, index) => (
        <div key={index} className=" text-slate-500">
          <UserPoint user={user} index={index} />
        </div>
      ))}
    </div>
  );
}

export default LeaderBoard;
