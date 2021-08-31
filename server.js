import { Server } from "https://js.sabae.cc/Server.js";
import { jsonfs } from "https://js.sabae.cc/jsonfs.js";
import { WsServer } from "./ws/wsServer.js"

const boardfn = "data/board.json";
const userfn = "data/user.json"

let board = jsonfs.read(boardfn) || [];
let user = jsonfs.read(userfn) || [];

class MyServer extends Server {
  async api(path, req) {
    if(path=="/api/login"){
        //ログイン用API
        //call:("api/login",{ID,pass}),return:{name,session}
        console.log("call login");
        let u=null;
        console.log("id :",req.ID)
        for(const d in user){
          console.log(user[d].ID);
          if(user[d].ID==req.ID){
            u=d;
            break;
          }
        }
        if(!u) return "not found";
        if(user[u].pass!=req.pass)return null;
        const res={name:user[u].name,session:user[u].session};
        //console.log(res);
        user[u].is_active=true;
        jsonfs.write(userfn,user);
        return res;
      }
  }
}

new MyServer(8001);
WsServer(8002)
