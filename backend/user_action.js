import { jsonfs } from "https://js.sabae.cc/jsonfs.js";

import { now_fitness } from "./hist_action.js";
import { hash } from "https://js.sabae.cc/hash.js";

const userfn = "backend/data/users.json";
let user = jsonfs.read(userfn) || [];

export function get_data(d, key) {
  console.log("call function get_data");
  user = jsonfs.read(userfn) || [];
  if (key != "all") return user[d][key];
  return user[d];
}

export function change_active(d) {
  console.log("call function change_active");
  user = jsonfs.read(userfn) || [];
  user[d].is_active = !user[d].is_active;
  jsonfs.write(userfn, user);
  return "ok";
}

export function add_friend(index, friend_ID) {
  console.log("call function add_friend");
  user = jsonfs.read(userfn) || [];
  const ID = user[index].ID;
  console.log("check:", check_user(friend_ID));
  if (!check_user(friend_ID)) return "user not found";
  if (!check_me(ID, friend_ID)) return "can not add yourself";
  if (!check_friend(index, friend_ID)) return "already added";

  user[index].friend_ID.push(Number(friend_ID));
  jsonfs.write(userfn, user);
  return "ok";
}

function check_user(reqID) {
  console.log("call function check_user");
  console.log("reqID:", reqID);
  let users_ID = [];
  user = jsonfs.read(userfn) || [];
  for (const d of user) {
    users_ID.push(d.ID);
  }
  console.log(users_ID);
  if (!users_ID.includes(reqID)) {
    console.log("users_ID:", users_ID, " reqID:", reqID);
    console.log("check includes", users_ID.includes(reqID));
    return false;
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
