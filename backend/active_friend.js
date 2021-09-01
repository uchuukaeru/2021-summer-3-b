import { jsonfs } from "https://js.sabae.cc/jsonfs.js";

const userfn = "data/users.json";
let user = jsonfs.read(userfn) || [];

function get_active() {
  console.log("call function get_active");
  let active_user = [];
  for (const d of user) {
    if (d.is_active) active_user.push(d.ID);
  }
  return active_user;
}

function get_ID_user(list) {
  console.log("call function get_ID_user");
  let data = [];
  for (const d of user) {
    if (list.includes(d.ID)) {
      const item = {
        ID: d.ID,
        name: d.name,
        is_active: d.is_active,
        fitness: d.fitness,
      };
      data.push(item);
    }
  }
  //console.log(data);
  return data;
}

function active_friend(loc) {
  console.log("call function active_friend");
  const friend = user[loc].friend_ID;
  const active = get_active();
  //console.log(user[u]);
  console.log(friend);
  console.log(active);
  const active_friend = friend.filter((i) => active.indexOf(i) != -1);
  console.log("active friend :", active_friend);
  return active_friend;
}

export { get_active, get_ID_user, active_friend };
