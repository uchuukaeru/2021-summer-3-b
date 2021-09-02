import { jsonfs } from "https://js.sabae.cc/jsonfs.js";

import { users_data_operation } from "./hist_action.js";

const userfn = "data/users.json"
let user = jsonfs.read(userfn) || [];

export function get_active(){
    //すべてのアクティブユーザのIDを返す
    console.log("call function get_active");
    user = jsonfs.read(userfn) || [];
    let active_user=[];
      for(const d of user){
        if(d.is_active) active_user.push(d.ID);
    }
    return active_user;
}

export function get_ID_user(list){
    //IDをもとにusers.jsonにあるユーザの情報を取得する
    console.log("call function get_ID_user");
    user = jsonfs.read(userfn) || [];
    let data=[];
    for(const d in user){
        if(list.includes(user[d].ID)){
          const item={
            ID:user[d].ID,
            name:user[d].name,
            is_active:user[d].is_active,
          }
          data.push(users_data_operation(d,item));
        }
    }
    //console.log(data);
    return data;
}

export function active_friend(index){
    //フレンドリストとアクティブユーザリストを比較してアクティブフレンドのリストを返す
    console.log("call function active_friend");
    user = jsonfs.read(userfn) || [];
    const friend=user[index].friend_ID;
    const active=get_active();
    //console.log(user[u]);
    console.log(friend);
    console.log(active);
    const active_friend=friend.filter(i=>active.indexOf(i)!=-1);
    console.log("active friend :",active_friend);
    return active_friend;
}