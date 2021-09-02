import { Server } from "https://js.sabae.cc/Server.js";
//import {WsServer} from "./ws/wsServer.js";
import { hash } from "https://js.sabae.cc/hash.js";

import {active_friend, get_active, get_ID_user} from "./active_friend.js";
import {check_session,login_check} from "./check_session.js";
import {get_data,change_active, add_friend,get_name} from "./user_action.js";
import {successResponce,errorResponce} from "./createResponce.js";
import { regist } from "./register.js";
import {fitness_finish, fitness_start, get_history, users_data_operation,now_fitness} from "./hist_action.js"


class MyServer extends Server {
  api(path, req) {
    if(path=="/api/login"){
      //ログイン用API
      //call:("api/login",{ID,pass}),return:{name,session}
      //user.jsonなし
      console.log("call login");

      const index=login_check(req);
      if(!index || index=="not found") return errorResponce(index);

      const res=get_data(index,"all");

      if(change_active(index,true)=="ok") return successResponce(users_data_operation(index,res));
    } else if (path=="/api/register"){
      //ユーザ登録用API
      //call:("api/register",{name,pass}),return:"ok"
      //user.jsonなし
      console.log("call register")
      return successResponce(regist(req));
    } else if (path=="/api/get_active_ID"){
      //アクティブユーザのID検索用API
      //call:("api/get_active_ID"),return:[num, ...]
      //user.jsonなし
      console.log("call get_active_ID");
      return succesResponce(get_active());
    } else if (path=="/api/get_active"){
      //アクティブユーザのデータ検索用API
      //call:("api/get_active"),return:[{ID,name,fitness}]
      //user.jsonなし
      console.log("call get_active");
      const d=get_active();
      return successResponce(get_ID_user(d));
    } else if (path=="/api/logout"){
      //ログアウト用API
      //call:("api/logout",{ID,session}),return:ok
      //user.jsonなし
      console.log("call logout");

      const index=check_session(req);
      if(index=="not found"||index=="session error") return errorResponce(index);

      const fitness=now_fitness(index);

      if(fitness!=null) fitness_finish(index,fitness);

      return successResponce(change_active(index,false));
    } else if (path=="/api/active_friend_ID"){
      //アクティブフレンドのID取得用API
      //call:("api/get_friend",{ID,session}),return:[num, ...]
      //user.jsonなし
      console.log("call get_friend_ID");

      const index=check_session(req);
      if(index=="not found"||index=="session error") return errorResponce(index);

      return successResponce(active_friend(index));
    } else if (path=="/api/active_friend"){
      //アクティブフレンドのデータ取得用API
      //call:("api/get_friend",{ID,session}),return:[{ID,name,fitness}, ...]
      //user.jsonなし
      console.log("call get_friend");

      const index=check_session(req);
      if(index=="not found"||index=="session error") return errorResponce(index);

      const d=active_friend(index);
      return successResponce(get_ID_user(d));
    } else if (path=="/api/friend_data"){
      //
      //call:("api/friend_data",{ID,sesion})
      //user.jsonなし
      console.log("call friend_data");
      const index=check_session(req);
      if(index=="not found"||index=="session error") return errorResponce(index);

      const ids=get_data(index,"friend_ID");

      return successResponce(get_ID_user(ids));
    } else if (path=="/api/add_friend"){
      //フレンド追加用API
      //call:("api/add_friend",{ID,session,friend_ID})
      //user.jsonなし
      console.log("call add_friend");

      const index=check_session(req);
      if(index=="not found"||index=="session error") return errorResponce(index);

      const friend_ID=Number(req.friend_ID);
      const d=add_friend(index,friend_ID);
      if(d!="ok") return errorResponce(d);
      return successResponce(null);
    } else if (path=="/api/get_data"){
      //データ再取得用API
      //call:("api/get_data",{ID,session})
      //user.jsonなし
      console.log("call get_data");

      const index=check_session(req);
      if(index=="not found"||index=="session error") return errorResponce(index);

      const res=get_data(index,"all");

      if(change_active(index)=="ok") return successResponce(users_data_operation(index,res));
    } else if (path=="/api/get_user"){
      //ユーザ検索用API
      //call:("api/get_data",{search})
      //user.jsonなし
      console.log("call get_user");
      const res=get_name(req.search);
      if(res==null) return errorResponce("request user is not found")
      return successResponce(res);
    } else if (path=="/api/get_history"){
      //データ再取得用API
      //call:("api/get_data",{ID,session})
      //user.jsonなし
      console.log("call get_history");

      const index=check_session(req);
      if(index=="not found"||index=="session error") return errorResponce(index);

      const data=get_history(index,4);

      return successResponce(data);
    } else if (path=="/api/fitness"){
      //now_fitness変更用API
      //call:("api/fitness",{ID,session,fitness}),return:ok
      //
      console.log("call fitness");

      const index=check_session(req);
      if(index=="not found"||index=="session error") return errorResponce(index);

      const n_fitness=now_fitness(index);
      const fitness=req.fitness;

      console.log("now_fitness :",n_fitness);
      console.log("fitness :",fitness);

      if(n_fitness==null && fitness==null){
        console.log("n-n");
        return successResponce(null);
      } else if(hash(n_fitness)==hash(fitness)){
        console.log("n=N");
      } else if(n_fitness==null && fitness!=null){
        console.log("n-!n");
        fitness_start(index,fitness);
      } else if(n_fitness!=null && fitness==null){
        console.log("!n-n");
        fitness_finish(index,fitness);
      } else if(n_fitness!=null && fitness!=null){
        console.log("!n-!n");
        fitness_finish(index,n_fitness);
        fitness_start(index,fitness);
      }
      return successResponce(null);
    }
  }
}

new MyServer(8891);
//WsServer(8002);