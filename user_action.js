import { jsonfs } from "https://js.sabae.cc/jsonfs.js";

const userfn = "data/users.json"
let user = jsonfs.read(userfn) || [];

function get_data(d,item){
    console.log("call function get_data");
    if(item!="all") return user[d][item];
    return user[d];
}

function change_active(d){
    console.log("call function change_active");
    user[d].is_active=!user[d].is_active;
    jsonfs.write(userfn,user);
    return "ok";
}

function add_friend(item){
    console.log("call function add_friend");
    user[item.d].friend_ID.push(friend_ID);
    jsonfs.write(userfn,user);
    return "ok";
}

function check_user(){

}

function check_friend(){

}

function check_friend(){

}

export {get_data,change_active,add_friend};