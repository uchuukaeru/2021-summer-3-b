import { Server } from "https://js.sabae.cc/Server.js";
import { jsonfs } from "https://js.sabae.cc/jsonfs.js";
import { WsServer } from "./ws/wsServer.js"
const boardfn = "data/board.json";

let board = jsonfs.read(boardfn) || [];

class MyServer extends Server {
  async api(path, req) {
    if (path == "/api/add") {
      console.log("call badd");
      board.push(req);
      jsonfs.write(boardfn, board);
      return "ok";
    } else if (path == "/api/list") {
      console.log("call list");
      return board;
    }
  }
}

new MyServer(8001);
WsServer(8002)
