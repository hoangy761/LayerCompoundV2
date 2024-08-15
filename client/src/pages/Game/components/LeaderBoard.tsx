import React from 'react';
import UserPoint from './UserPoint';
import { IUserPoint } from '../interfaces';
interface ILeaderBoardPros {
  userPoints: IUserPoint[] | null;
}
function LeaderBoard({ userPoints }: ILeaderBoardPros) {
  const top10UserPoints = userPoints?.slice(0, 10);
  return (
    <div className="bg-black opacity-80 p-4 text-xs">
      <div className="grid grid-cols-3 gap-x-4">
        <p>Top</p>
        <p className="gap-2">Name</p>
        <p>Score</p>
      </div>
      {top10UserPoints &&
        top10UserPoints.map((user, index) => (
          <div key={index} className=" text-slate-500">
            <UserPoint user={user} index={index} />
          </div>
        ))}
    </div>
  );
}

export default LeaderBoard;
