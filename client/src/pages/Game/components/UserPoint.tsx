import React from 'react';
import { IUserPoint } from '../interfaces';
interface UserPointProps {
  user: IUserPoint;
  index: number;
}

function UserPoint({ user, index }: UserPointProps) {
  console.log(index);
  return (
    <div
      className={`grid grid-cols-3 gap-x-4
    ${index == 0 ? 'text-yellow-400 ' : ''}
    ${index == 1 ? 'text-slate-200 ' : ''}
    ${index == 2 ? 'text-orange-800 ' : ''}
    `}
    >
      <p className="gap-1">{index + 1}</p>
      <p className="gap-4">{user.name}</p>
      <p className="gap-1">{user.userScore}</p>
    </div>
  );
}

export default UserPoint;
