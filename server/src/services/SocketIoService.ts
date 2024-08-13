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
import { Snake } from "../objects/Snake";
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
      socket.on("start_game", (data) => {
        const { name, userId, roomId } = data;
        socket.join(roomId);
        const isExit = dataGame.players.some((player) => player.id === userId);
        if (!isExit) {
          const newPlayer = createNewPlayers(userId, name);

          dataGame.players.push({
            id: newPlayer.id,
            name: newPlayer.name,
            snake: new Snake(newPlayer.snake),
          });
        }
        setInterval(() => {
          dataGame.players.forEach((player) => {
            player.snake.run();
            player.snake.eat(dataGame.foods);
          });
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

const socketIoService = new SocketIoService();
export default socketIoService;
