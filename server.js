import { Server } from "https://js.sabae.cc/Server.js";
//import {WsServer} from "./ws/wsServer.js";
import { VueUgokuServer } from "./backend/VueUgokuServer.js";

import {
  active_friend,
  get_active,
  get_ID_user,
} from "./backend/active_friend.js";
import { check_session, login_check } from "./backend/check_session.js";
import { get_data, change_active, add_friend } from "./backend/user_action.js";
import { successRespoce, errorResponce } from "./backend/criateResponce.js";
import { regist } from "./backend/register.js";

class MyServer extends VueUgokuServer {
  async api(path, req) {
    if (path == "/api/login") {
      //ログイン用API
      //call:("api/login",{ID,pass}),return:{name,session}
      //user.jsonなし
      console.log("call login");

      const index = login_check(req);
      if (!index || index == "not found") return errorResponce(index);

      //console.log(res);
      if (change_active(index) == "ok")
        return successRespoce(get_data(index, "all"));
    } else if (path == "/api/register") {
      //ユーザ登録用API
      //call:("api/register",{name,pass}),return:"ok"
      //user.jsonなし
      console.log("call register");
      return successRespoce(regist(req));
    } else if (path == "/api/get_active_ID") {
      //アクティブユーザのID検索用API
      //call:("api/get_active_ID"),return:[num, ...]
      //user.jsonなし
      console.log("call get_active_ID");
      return succesResponce(get_active());
    } else if (path == "/api/get_active") {
      //アクティブユーザのデータ検索用API
      //call:("api/get_active"),return:[{ID,name,fitness}]
      //user.jsonなし
      console.log("call get_active");
      const d = get_active();
      return successRespoce(get_ID_user(d));
    } else if (path == "/api/logout") {
      //ログアウト用API
      //call:("api/logout",{ID,session}),return:ok
      //user.jsonなし
      console.log("call logout");

      const index = check_session(req);
      if (index == "not found" || index == "session error")
        return errorResponce(index);

      return successRespoce(change_active(index));
    } else if (path == "/api/active_friend_ID") {
      //アクティブフレンドのID取得用API
      //call:("api/get_friend",{ID,session}),return:[num, ...]
      //user.jsonなし
      console.log("call get_friend_ID");

      const index = check_session(req);
      if (index == "not found" || index == "session error")
        return errorResponce(index);

      return successRespoce(active_friend(index));
    } else if (path == "/api/active_friend") {
      //アクティブフレンドのデータ取得用API
      //call:("api/get_friend",{ID,session}),return:[{ID,name,fitness}, ...]
      //user.jsonなし
      console.log("call get_friend");

      const index = check_session(req);
      if (index == "not found" || index == "session error")
        return errorResponce(index);

      const d = active_friend(index);
      return successRespoce(get_ID_user(d));
    } else if (path == "/api/friend_data") {
      //
      //call:("api/friend_data",{ID,sesion})
      //user.jsonなし
      console.log("call friend_data");
      const index = check_session(req);
      if (index == "not found" || index == "session error")
        return errorResponce(index);

      const ids = get_data(index, "friend_ID");

      return successRespoce(get_ID_user(ids));
    } else if (path == "/api/add_friend") {
      //
      //call:("api/add_friend",{ID,session,friend_ID})
      //user.jsonなし
      console.log("call add_friend");

      const index = check_session(req);
      if (index == "not found" || index == "session error")
        return errorResponce(index);
      console.log("index", index);

      const item = {
        index: index,
        friend_ID: req.friend_ID,
      };
      console.log("item:", item);
      const d = add_friend(item);
      if (d != "ok") return errorResponce(d);
      return successRespoce(null);
    }
  }
}

new MyServer(8891, "./backend/static");
// new MyServer(8891);
//WsServer(8002);
