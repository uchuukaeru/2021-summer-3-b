import { Server } from "https://js.sabae.cc/Server.js";
import { jsonfs } from "https://js.sabae.cc/jsonfs.js";
import { WsServer } from "./ws/wsServer.js"

const userfn = "data/users.json";

let user = jsonfs.read(userfn) || [];

class MyServer extends Server {
  async api(path, req) {
    if(path=="/api/login"){
      //ログイン用API
      //call:("api/login",{ID,pass}),return:session
      console.log("call login");
      const u=user.find(d=>d.ID==req.ID);
      if(!u) return "not found";
      if(u.pass!=req.pass)return null;
      const res={name:u.name,session:u.session};
      return res;
    } else if (path=="/api/getfriend"){
      //
      //call("api/getfriend",[id, ...]),return:[{id,now_fitness,is_active}]
    }
  }
}

new MyServer(8001);
WsServer(8002)
