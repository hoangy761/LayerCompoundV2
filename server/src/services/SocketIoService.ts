// SocketIoService.js
import { Server as SocketIOServer, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import config from "../config/config";
import { IDataRealTime, IDot } from "../interfaces";
import { COLORS } from "../constants";
import { createFoods } from "../utils/game/food";
import { createNewPlayers } from "../utils";
import { Snake } from "../objects/Snake";
import { getRandomInteger } from "../utils/commons";
let dataGame: IDataRealTime = {
  foods: createFoods(100),
  players: [],
};

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
          const newPlayer = createNewPlayers(userId, name);

          dataGame.players.push({
            id: newPlayer.id,
            name: newPlayer.name,
            snake: new Snake(newPlayer.snake),
          });
        }
      });

      socket.on("mouse_move", (data) => {
        const { angle, userId } = data;
        const player = dataGame.players.find((player) => player.id === userId);
        if (player) {
          player.snake.angle = angle;
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

      // socket.on("disconnect", (data) => {
      //   // const { userId } = data;
      //   console.log("res: ", data);
      //   dataGame.players = dataGame.players.map((player) => {
      //     if (player.id === socket.id) {
      //       return {
      //         ...player,
      //         snake: {
      //           ...player.snake,
      //           isAlive: false,
      //         },
      //       };
      //     }
      //     return player;
      //   });
      //   console.log("disconnect", socket.id); // false
      // });
    });
    setInterval(() => {
      dataGame.players = dataGame.players.filter((player) => {
        if (player.snake.isAlive) {
          player.snake.run();
          player.snake.eat(dataGame.foods);
          player.snake.checkDeath();
          return true; // Keep the player in the array
        }
        const newFoods = foodsFromSnakeDead(player.snake);
        dataGame.foods = dataGame.foods.concat(newFoods);
        return false; // Remove the player from the array
      });

      // this.io?.emit("data_game", dataGame);
      this.io?.to("100").emit("data_game", dataGame);
      // socket.to(roomId).emit("data_game", dataGame);
    }, 50);
  }

  handleStartGame() {
    if (this.io) {
      this.io.to("roomName").emit("start_game");
    }
  }
}

function foodsFromSnakeDead(_snake: Snake) {
  const newFoods: IDot[] = [];
  for (let i = 0; i < _snake.tailPositions.length; i += 5) {
    const posTail = _snake.tailPositions[i];
    const sizeSnake = _snake.style.size;
    const _pos = {
      x: getRandomInteger(posTail.x, posTail.x + sizeSnake),
      y: getRandomInteger(posTail.y, posTail.y + sizeSnake),
    };
    const _color = COLORS[getRandomInteger(0, COLORS.length - 1)];
    const _size = getRandomInteger(5, 10);
    newFoods.push({ color: _color, pos: _pos, size: _size });
  }
  return newFoods;
}

const socketIoService = new SocketIoService();
export default socketIoService;
