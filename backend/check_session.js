import { jsonfs } from "https://js.sabae.cc/jsonfs.js";

const userfn = "backend/data/users.json";
let user = jsonfs.read(userfn) || [];

export function check_session(item) {
  //セッションをチェックして、そのセッションを持つユーザの番地を返す
  console.log("call function check_session");
  user = jsonfs.read(userfn) || [];
  console.log("id in check_session:", item.ID);
  for (const d in user) {
    console.log(user[d].ID);
    if (user[d].ID == item.ID) {
      console.log("d", d);
      if (user[d].session != item.session) {
        console.log("error");
        return "session error";
      }
      console.log("return d");
      return d;
    }
  }
  return "not found";
}

export function login_check(item) {
  //ユーザIDでusers.jsonを検索し、パスワードが同じで有れば、番地を返す
  console.log("call function login_check");
  user = jsonfs.read(userfn) || [];
  console.log("id :", item.ID);
  for (const d in user) {
    console.log(user[d].ID);
    if (user[d].ID == item.ID) {
      console.log(d);
      if (user[d].pass != item.pass) return null;
      return d;
    }
  }
  return "not found";
}
