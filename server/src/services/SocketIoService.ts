// SocketIoService.js
import { Server as SocketIOServer, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import config from "../config/config";
import { IDataRealTime } from "../interfaces";
import { INIT_SNAKE_SIZE, SNAKE_SPEED } from "../constants";
import { createFoods } from "../utils/game/food";
import { createNewPlayers } from "../utils";
import { log } from "console";
import { getPointOnCircumference } from "../utils/game/position";
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
        origin: config.CLIENT_URL,
        methods: ["GET", "POST"],
      },
    });

    this.io.on("connection", (socket: Socket) => {
      console.log("User connect ", socket.id);
      socket.on("start_game", (data) => {
        const { name, userId, roomId } = data;
        socket.join(roomId);
        const isExit = dataGame.players.some((player) => player.id === userId);
        if (!isExit) {
          dataGame.players.push(createNewPlayers(userId, name));
        }
        setInterval(() => {
          dataGame = updateDataGame(dataGame) || dataGame;
          socket.emit("data_game", dataGame);
          // socket.to(roomId).emit("data_game", dataGame);
        }, 50);
      });

      socket.on("mouse_move", (data) => {
        const { angle, userId } = data;
        const player = dataGame.players.find((player) => player.id === userId);
        if (player) {
          player.snake.angle = angle;
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
  }

  handleStartGame() {
    if (this.io) {
      this.io.to("roomName").emit("start_game");
    }
  }
}
// function snakeAlive (_dataGame: IDataRealTime): IDataRealTime {
//   return _dataGame.players.filter(player=> {

//   })
// }
function updateDataGame(_dataGame: IDataRealTime): IDataRealTime {
  const updatedPlayers = _dataGame.players.map((player) => {
    const newTailPosition = {
      x:
        player.snake.position.x +
        Math.cos(player.snake.angle) * player.snake.speed,
      y:
        player.snake.position.y +
        Math.sin(player.snake.angle) * player.snake.speed,
    };

    // Update the snake's tail positions
    const updatedTailPositions = [
      newTailPosition,
      ...player.snake.tailPositions.slice(0, -1),
    ];

    // Update the snake's position
    const updatedPosition = newTailPosition;

    // Calculate the new position for collision
    const updatedPositionCollision = getPointOnCircumference(
      updatedPosition,
      player.snake.style.size,
      player.snake.angle
    );

    // Return the updated player object
    return {
      ...player,
      snake: {
        ...player.snake,
        position: updatedPosition,
        tailPositions: updatedTailPositions,
        positionCollision: updatedPositionCollision,
      },
    };
  });

  return {
    ..._dataGame,
    players: updatedPlayers,
  };
}

const socketIoService = new SocketIoService();
export default socketIoService;
