import { Server } from "https://js.sabae.cc/Server.js";
import { jsonfs } from "https://js.sabae.cc/jsonfs.js";
import {WsServer} from "./ws/wsServer.js";

import {get_active} from "./active_friend.js";
import {check_session,login_check} from "./check_session.js";

const userfn = "data/users.json"
let user = jsonfs.read(userfn) || [];

class MyServer extends Server {
  async api(path, req) {
    if(path=="/api/login"){
      //ログイン用API
      //call:("api/login",{ID,pass}),return:{name,session}
      console.log("call login");

      const u=login_check(req);
      if(!u) return u;
      if(u=="not found") return u;

      const res={name:user[u].name,session:user[u].session};
      //console.log(res);
      user[u].is_active=true;
      jsonfs.write(userfn,user);
      return res;
    } else if (path=="/api/register"){
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
      const res={
        ID:id,
        session:ses
      }
      return res;
    } else if (path=="/api/get_active"){
      //アクティブユーザの検索用API
      //call:("api/get_active"),return:[num, ...]
      console.log("call get_active");
      return get_active();
    } else if (path=="/api/logout"){
      //ログアウト用API
      //call:("api/logout",{ID,session}),return:ok
      console.log("call logout");

      const u=check_session(req);
      if(u=="not found"||u=="session error") return "error"

      //console.log(res);
      user[u].is_active=false;
      jsonfs.write(userfn,user);
      return "ok";
    } else if (path=="/api/get_friend"){
      //フレンドの情報取得用API
      //call:("api/get_friend",{ID,session}),return:[{ID,name,is_active,fitness}, ...]
      console.log("call get_friend");

      const u=check_session(req);
      if(u=="not found"||u=="session error") return "error"

      const friend=user[u].friend_ID;
      const active=get_active();
      //console.log(user[u]);
      console.log(friend);
      console.log(active);
      const active_friend=friend.filter(i=>active.indexOf(i)!=-1);
      console.log("active friend :",active_friend);
      return active_friend;
    }
  }
}

new MyServer(8001);
WsServer(8002);