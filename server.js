import { Server } from "https://js.sabae.cc/Server.js";
import { jsonfs } from "https://js.sabae.cc/jsonfs.js";
import {WsServer} from "./ws/wsServer.js";


const userfn = "data/users.json"
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
    }else if(path=="/api/register"){
      //ユーザ登録用API
      //call:("api/register",{name,pass}),return:"ok"
      console.log("call register");
      let ses_array=[];
      for(const d of user){
        ses_array.push(d.session);
      }
      console.log(ses_array);
      let ses=0;
      while(1){
        ses=Math.random();
        if(!ses_array.includes(ses)) break;
      }
      const id=user.length+1;
      const item={
        ID:id,
        name:req.name,
        pass:req.pass,
        session:ses,
        is_active:true,
        fitness:[],
        friend_ID:[]
      }
      user.push(item);
      jsonfs.write(userfn,user);
      return "ok";
    } else if(path=="api/get_active"){

    }
  }
}

new MyServer(8001);
WsServer(8002);