import { COLORS, GAME_WIDTH } from "../../constants";
import { getRandomInteger } from "../commons";

export const createFoods = (_length: number) => {
  const foods = [];
  for (let i = 0; i < _length; i++) {
    const pos = {
      x: getRandomInteger(0, GAME_WIDTH),
      y: getRandomInteger(0, GAME_WIDTH),
    };
    const color = COLORS[getRandomInteger(0, COLORS.length - 1)];
    const size = getRandomInteger(5, 10);
    foods.push({ pos, color, size });
  }
  return foods;
};

//  const newFoods = () => {
//     setInterval(() => {
//       if (this.foods.length < INIT_FOODS_NUMBER) {
//         this.createFoods(INIT_FOODS_NUMBER - this.foods.length);
//       }
//     }, 10000);
//   }
