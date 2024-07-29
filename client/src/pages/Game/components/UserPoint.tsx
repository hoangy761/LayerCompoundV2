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
      className={`grid grid-cols-3 gap-9 
    ${index == 0 ? 'text-yellow-400 ' : ''}
    ${index == 1 ? 'text-slate-200 ' : ''}
    ${index == 2 ? 'text-orange-800 ' : ''}
    `}
    >
      <p>{index + 1}</p>
      <p>{user.name}</p>
      <p>{user.userScore}</p>
    </div>
  );
}

export default UserPoint;
