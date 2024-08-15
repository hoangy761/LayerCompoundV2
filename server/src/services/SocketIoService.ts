// SocketIoService.js
import { Server as SocketIOServer, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import config from "../config/config";
import { COLORS } from "../constants";
import { Snake } from "../objects/Snake";
import { getRandomInteger } from "../utils/commons";
import { Game } from "../objects/Game";
import { Food } from "../objects/Food";
let dataGame = new Game();
dataGame.createFoods(100);

class SocketIoService {
  private io: SocketIOServer | null = null;
  constructor() {
    this.io = null;
  }

  init(server: HttpServer): void {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: [
          config.CLIENT_URL || "http://localhost:5173",
          "https://layer-compound-v2.vercel.app",
        ],
        methods: ["GET", "POST"],
      },
    });

    this.io.on("connection", (socket: Socket) => {
      console.log("User connect ", socket.id);
      socket.on("join_game", (data) => {
        const { name, userId, roomId } = data;
        socket.join(roomId);
        console.log(`${userId} join room: ${roomId} Successfully!`);
        const isExit = dataGame.players.some((player) => player.id === userId);

        if (!isExit) {
          dataGame.createPlayer(userId, name);
        }
      });

      socket.on("mouse_move", (data) => {
        const { angle, userId } = data;
        const player = dataGame.players.find((player) => player.id === userId);
        if (player) {
          player.snake.angle = angle;
        }
      });

      socket.on("speed_up", (data) => {
        const { isMouseDown, userId } = data;
        const player = dataGame.players.find((player) => player.id === userId);
        if (player) {
          player.snake.isPeedUP = isMouseDown;
        }
      });
      socket.on("out_game", (data) => {
        const { roomId, userId } = data;
        try {
          socket.leave(roomId);
          console.log(`${userId} out room: ${roomId} Successfully!`);
        } catch (error) {
          console.log(`${userId} out room: ${roomId} Fail!`);
        }
      });
    });
    setInterval(() => {
      dataGame.players = dataGame.players.filter((player) => {
        if (player.snake.isAlive) {
          player.snake.run();
          player.snake.eat(dataGame.foods);
          player.snake.checkDeath();
          return true; // Keep the player in the array
        }
        //else Snake dead
        player.snake.dead();
        return false; // Remove the player from the array
      });

      // this.io?.emit("data_game", dataGame);
      const gameDTO = createGameDTO(dataGame);
      this.io?.to("100").emit("data_game", gameDTO);
      // socket.to(roomId).emit("data_game", dataGame);
    }, 80);
  }

  handleStartGame() {
    if (this.io) {
      this.io.to("roomName").emit("start_game");
    }
  }
}

// function foodsFromSnakeDead(_snake: Snake) {
//   const newFoods: Food[] = [];
//   for (let i = 0; i < _snake.tailPositions.length; i += 5) {
//     const posTail = _snake.tailPositions[i];
//     const sizeSnake = _snake.style.size;
//     const _pos = {
//       x: getRandomInteger(posTail.x, posTail.x + sizeSnake),
//       y: getRandomInteger(posTail.y, posTail.y + sizeSnake),
//     };
//     const _color = COLORS[getRandomInteger(0, COLORS.length - 1)];
//     const _size = getRandomInteger(5, 10);
//     newFoods.push(new Food(_pos, _color, _size));
//   }
//   return newFoods;
// }

const socketIoService = new SocketIoService();
export default socketIoService;

function createGameDTO(_game: Game) {
  let foods = _game.foods.map((food) => ({
    pos: food.pos,
    color: food.color,
    size: food.size,
    borderColor: food.borderColor,
  }));
  let players = _game.players.map((player) => ({
    id: player.id,
    name: player.name,
    snake: {
      tailPositions: player.snake.tailPositions,
      position: player.snake.position,
      style: player.snake.style,
      isAlive: player.snake.isAlive,
      angle: player.snake.angle,
      isPeedUP: player.snake.isPeedUP,
      speed: player.snake.speed,
      styleShadow: player.snake.styleShadow,
    },
  }));

  return {
    foods,
    players,
  };
}
