import { jsonfs } from "https://js.sabae.cc/jsonfs.js";

const userfn = "data/users.json";
let user = jsonfs.read(userfn) || [];

function check_session(item) {
  console.log("call function check_session");
  let u = null;

  console.log("id :", item.ID);
  for (const d in user) {
    console.log("userlist:", user[d].ID);
    if (user[d].ID == item.ID) {
      console.log("d:", d);
      u = d;
      break;
    }
  }
  if (!u) return "not found";
  console.log("item:", item.session);
  console.log("u:", u);
  console.log("user[u]:", user[u]);
  if (user[u].session != item.session) return "session error";
  return u;
}

function login_check(item) {
  let u = null;
  console.log("id :", item.ID);
  for (const d in user) {
    console.log(user[d].ID);
    if (user[d].ID == item.ID) {
      console.log(d);
      u = d;
      break;
    }
  }
  if (!u) return "not found";
  if (user[u].pass != item.pass) return null;

  return u;
}

export { check_session, login_check };
