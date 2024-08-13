/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { GAME_WIDTH, INIT_SNAKE_LENGTH, INIT_SNAKE_SIZE, SCREEN_HEIGHT, SCREEN_WIDTH, SNAKE_SPEED } from '../constants';
// import { CanvasNameEnum } from '../enums';
import { Eye } from './Eye';
import { Game } from './Game';
import { IPosition, ISnake } from '../interfaces';
import { drawDot, getPointOnCircumference, getRandomInteger } from '../ultis';
import { CanvasNameEnum } from '../enums';

export class Snake {
  game: Game;
  eye: Eye;
  position: IPosition;
  angle: number;
  isMouseDown: boolean;
  constructor(_game: Game) {
    this.game = _game;
    this.position = this.game.attributes.snake.position;
    this.eye = new Eye(this);
    this.angle = this.game.attributes.snake.angle;

    // this.createTail(INIT_SNAKE_LENGTH);
    this.isMouseDown = false;
    // this.listenMouseEvent();
  }
  // initSnake() {
  //   // this.game.attributes.snake.tailPositions = [];
  //   this.position = {
  //     x: getRandomInteger(SCREEN_WIDTH / 2, GAME_WIDTH - SCREEN_WIDTH / 2),
  //     y: getRandomInteger(SCREEN_HEIGHT / 2, GAME_WIDTH - SCREEN_HEIGHT / 2),
  //   };
  //   this.game.attributes.snake.positionCollision = { x: this.position.x + INIT_SNAKE_SIZE, y: this.position.y };
  //   // this.createTail(INIT_SNAKE_LENGTH);
  // }

  // listenMouseEvent() {
  //   if (this.game.canvas) {
  //     this.game.canvas.addEventListener('mousemove', (event: MouseEvent) => {
  //       const rect = this.game.canvas?.getBoundingClientRect();
  //       if (!rect) return { x: 0, y: 0 };
  //       this.processMouseMove({
  //         x: event.clientX - rect.left,
  //         y: event.clientY - rect.top,
  //       });
  //     });

  //     // onmouseDown x2 speed event: MouseEvent
  //     this.game.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
  //     this.game.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
  //   }
  //   document.addEventListener('keydown', this.handleKeyDown.bind(this));
  //   document.addEventListener('keyup', this.handleKeyUp.bind(this));
  // }
  // processMouseMove(mousePos: IPosition) {
  //   this.angle = Math.atan2(mousePos.y - SCREEN_HEIGHT / 2, mousePos.x - SCREEN_WIDTH / 2);
  // }
  // handleMouseDown() {
  //   this.isMouseDown = true;
  // }

  // handleMouseUp() {
  //   this.isMouseDown = false;
  // }
  // handleKeyDown(event: KeyboardEvent) {
  //   if (event.code === 'Space') {
  //     this.isMouseDown = true;
  //   }
  // }

  // handleKeyUp(event: KeyboardEvent) {
  //   if (event.code === 'Space') {
  //     this.isMouseDown = false;
  //   }
  // }

  // createTail(initLenght: number) {
  //   for (let index = 0; index < initLenght; index++) {
  //     this.game.attributes.snake.tailPositions.push({
  //       x: this.position.x - SNAKE_SPEED * index,
  //       y: this.position.y,
  //     });
  //   }
  // }
  // growth(numberCalo: number) {
  //   for (let i = 0; i < numberCalo; i++) {
  //     const newTailPosition = {
  //       x: this.position.x + Math.cos(this.angle) * this.game.attributes.snake.speed,
  //       y: this.position.y + Math.sin(this.angle) * this.game.attributes.snake.speed,
  //     };
  //     this.game.attributes.snake.tailPositions.push(newTailPosition);
  //     // this.position = newTailPosition;
  //   }
  // }
  // feces() {
  //   this.game.food.createOneFood(
  //     this.game.attributes.snake.tailPositions[this.game.attributes.snake.tailPositions.length - 1],
  //     COLORS[getRandomInteger(0, COLORS.length - 1)],
  //     1,
  //   );
  // }
  run() {
    if (this.game.attributes.snake.tailPositions.length > INIT_SNAKE_LENGTH) {
      if (this.isMouseDown) {
        this.game.attributes.snake.speed = SNAKE_SPEED * 2;
        this.game.attributes.snake.tailPositions = this.game.attributes.snake.tailPositions.slice(0, -3);

        // this.feces();
      } else {
        this.game.attributes.snake.speed = SNAKE_SPEED;
      }
    } else {
      this.game.attributes.snake.speed = SNAKE_SPEED;
    }

    const newTailPosition = {
      x: this.position.x + Math.cos(this.angle) * this.game.attributes.snake.speed,
      y: this.position.y + Math.sin(this.angle) * this.game.attributes.snake.speed,
    };
    this.game.attributes.snake.tailPositions.unshift(newTailPosition);
    this.game.attributes.snake.tailPositions.pop();
    this.position = newTailPosition;
  }
  update() {
    this.run();
    this.game.attributes.snake.positionCollision = getPointOnCircumference(this.position, INIT_SNAKE_SIZE, this.angle);
  }

  drawBody(_snake: ISnake) {
    //draw shadow
    for (let index = _snake.tailPositions.length - 1; index >= 1; index--) {
      if (this.game.ctx) {
        drawDot(
          this.game,
          this.game.ctx,
          {
            color: _snake.styleShadow.color,
            pos: {
              x: _snake.tailPositions[index].x,
              y: _snake.tailPositions[index].y,
            },
            size: _snake.styleShadow.size,
            borderColor: _snake.styleShadow.borderColor,
          },
          CanvasNameEnum.GAME,
        );
      }
    }
    //draw body
    for (let index = _snake.tailPositions.length - 1; index >= 0; index -= 3) {
      if (this.game.ctx) {
        drawDot(
          this.game,
          this.game.ctx,
          {
            color: _snake.style.color,
            pos: {
              x: _snake.tailPositions[index].x,
              y: _snake.tailPositions[index].y,
            },
            size: _snake.style.size,
            borderColor: _snake.style.borderColor,
          },
          CanvasNameEnum.GAME,
        );
      }
    }
  }
  drawSnake() {
    //draw mySnake
    if (this.game.attributes.snake.isAlive) {
      this.drawBody(this.game.attributes.snake);
      this.eye.draw();
    }

    this.game.attributesOtherSnake.forEach((player) => {
      this.drawBody(player.snake);
    });
    // draw eyes
    this.eye.drawOtherSnake();
  }

  draw() {
    this.drawSnake();
  }
}
