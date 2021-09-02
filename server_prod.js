import { jsonfs } from "https://js.sabae.cc/jsonfs.js";
import { VueUgokuServer } from "./VueUgokuServer.js";

import {
  active_friend,
  get_active,
  get_ID_user,
} from "./backend/active_friend.js";
import { check_session, login_check } from "./backend/check_session.js";
import { get_data, change_active, add_friend } from "./backend/user_action.js";

const userfn = "./backend/data/users.json";
let user = jsonfs.read(userfn) || [];

class MyServer extends VueUgokuServer {
  async api(path, req) {
    if (path == "/api/login") {
      //ログイン用API
      //call:("api/login",{ID,pass}),return:{name,session}
      console.log("call login");

      const u = login_check(req);
      if (!u) return u;
      if (u == "not found") return u;

      const res = {
        ID: get_data(u, "ID"),
        name: get_data(u, "name"),
        session: get_data(u, "session"),
      };
      if (change_active(u) == "ok") return res;
    } else if (path == "/api/register") {
      //ユーザ登録用API
      //call:("api/register",{name,pass}),return:"ok"
      console.log("call register");
      let ses_array = [];
      for (const d of user) {
        ses_array.push(d.session);
      }
      console.log(ses_array);
      let ses = 0;
      while (1) {
        ses = Math.random();
        if (!ses_array.includes(ses)) break;
      }
      const id = user.length + 1;
      const item = {
        ID: id,
        name: req.name,
        pass: req.pass,
        session: ses,
        is_active: false,
        fitness: "",
        friend_ID: [],
      };
      user.push(item);
      jsonfs.write(userfn, user);
      const res = {
        ID: id,
        session: ses,
      };
      return res;
    } else if (path == "/api/get_active_ID") {
      //アクティブユーザのID検索用API
      //call:("api/get_active_ID"),return:[num, ...]
      //user.jsonなし
      console.log("call get_active_ID");
      return get_active();
    } else if (path == "/api/get_active") {
      //アクティブユーザのデータ検索用API
      //call;("api/get_active"),return:[{ID,name,fitness}]
      //user.jsonなし
      console.log("call get_active");
      const d = get_active();
      return get_ID_user(d);
    } else if (path == "/api/logout") {
      //ログアウト用API
      //call:("api/logout",{ID,session}),return:ok
      console.log("call logout");

      const u = check_session(req);
      if (u == "not found" || u == "session error") return "error";

      //console.log(res);
      return change_active(u);
    } else if (path == "/api/active_friend_ID") {
      //アクティブフレンドのID取得用API
      //call:("api/get_friend",{ID,session}),return:[num, ...]
      //user.jsonなし
      console.log("call get_friend_ID");

      const u = check_session(req);
      if (u == "not found" || u == "session error") return "error";

      return active_friend(u);
    } else if (path == "/api/active_friend") {
      //アクティブフレンドのデータ取得用API
      //call:("api/get_friend",{ID,session}),return:[{ID,name,fitness}, ...]
      //user.jsonなし
      console.log("call get_friend");

      const u = check_session(req);
      if (u == "not found" || u == "session error") return "error";

      const d = active_friend(u);
      //return active_friend;
      return get_ID_user(d);
    } else if (path == "/api/friend_data") {
      //
      //call:("api/friend_data",{ID,sesion})
      //
      console.log("call friend_data");
      console.log("req :", req);
      const u = check_session(req);
      console.log("u:".u);
      if (u == "not found" || u == "session error") return "error";

      const ids = get_data(u, "friend_ID");

      return get_ID_user(ids);
    } else if (path == "/api/add_friend") {
      //
      //call:("api/add_friend",{ID,session,friend_ID}),return:"ok"
      //
      console.log("call add_friend");
      const u = check_session(req);
      if (u == "not found" || u == "session error") return "error";
      const item = {
        d: u,
        friend_ID: req.friend_ID,
      };
      console.log(item);
      if (add_friend(item) == "ok") {
        return "ok";
      } else {
        return null;
      }
    }
  }
}

new MyServer(8001, "./backend/static");
