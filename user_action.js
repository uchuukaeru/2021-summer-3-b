import { jsonfs } from "https://js.sabae.cc/jsonfs.js";

const userfn = "data/users.json"
let user = jsonfs.read(userfn) || [];

export function get_data(d,key){
    console.log("call function get_data");
    user = jsonfs.read(userfn) || [];
    if(key!="all") return user[d][key];
    return user[d];
}

export function change_active(d){
    console.log("call function change_active");
    user = jsonfs.read(userfn) || [];
    user[d].is_active=!user[d].is_active;
    jsonfs.write(userfn,user);
    return "ok";
}

export function add_friend(index,friend_ID){
    console.log("call function add_friend");
    user = jsonfs.read(userfn) || [];
    const ID=user[index].ID;

    if(!check_user(friend_ID)) return "not found";
    if(!check_me(ID,friend_ID)) return "can not add yourself";
    if(!check_friend(index,friend_ID)) return "already added";

    user[index].friend_ID.push(Number(friend_ID));
    jsonfs.write(userfn,user);
    return "ok";
}

function check_user(reqID){
    console.log("call function check_user");
    let users_ID=[];
    user = jsonfs.read(userfn) || [];
    for(const d of user){
        users_ID.push(d.ID);
    }
    if(!users_ID.includes(reqID)) return false;
    return true;
}

function check_me(ID,reqID){
    console.log("call function check_me");
    if(ID==reqID) return false;
    return true;
}

function check_friend(index,reqID){
    console.log("call function check_friend");
    user = jsonfs.read(userfn) || [];
    if(user[index].friend_ID.includes(reqID)) return false;
    return true;
}