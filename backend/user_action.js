import { jsonfs } from "https://js.sabae.cc/jsonfs.js";

const userfn = "backend/data/users.json";
let user = jsonfs.read(userfn) || [];

export function get_data(d, item) {
  console.log("call function get_data");
  user = jsonfs.read(userfn) || [];
  if (item != "all") return user[d][item];
  return user[d];
}

export function change_active(d) {
  console.log("call function change_active");
  user = jsonfs.read(userfn) || [];
  user[d].is_active = !user[d].is_active;
  jsonfs.write(userfn, user);
  return "ok";
}

export function add_friend(item) {
  console.log("call function add_friend");
  user = jsonfs.read(userfn) || [];
  console.log("leave1");
  console.log("item:", item);
  console.log("index", item.index);
  const index = item.index;
  const ID = user[index].ID;
  const friend_ID = Number(item.friend_ID);

  if (!check_user(friend_ID)) return "not found";
  if (!check_me(ID, friend_ID)) return "can not add yourself";
  if (!check_friend(index, friend_ID)) return "already added";

  user[index].friend_ID.push(friend_ID);
  jsonfs.write(userfn, user);
  return "ok";
}

function check_user(reqID) {
  console.log("call function check_user");
  let active_user = [];
  user = jsonfs.read(userfn) || [];
  for (const d of user) {
    if (d.is_active) active_user.push(d.ID);
  }
  return true;
}

function check_me(ID, reqID) {
  console.log("call function check_me");
  if (ID == reqID) return false;
  return true;
}

function check_friend(index, reqID) {
  console.log("call function check_friend");
  user = jsonfs.read(userfn) || [];
  if (user[index].friend_ID.includes(reqID)) return false;
  return true;
}
export function get_name(name) {
  console.log("call function get_name");
  console.log(hash(name));
  user = jsonfs.read(userfn) || [];
  let data = [];
  for (const d in user) {
    console.log(hash(user[d].name));
    if (hash(user[d].name) == hash(name)) {
      const item = {
        ID: user[d].ID,
        name: user[d].name,
        is_active: user[d].is_active,
        now_fitness: now_fitness(d),
      };
      data.push(item);
    }
  }
  console.log(data.length);
  if (data.length == 0) return null;
  //console.log(data);
  return data;
}
