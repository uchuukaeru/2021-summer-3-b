import { jsonfs } from "https://js.sabae.cc/jsonfs.js";

const userfn = "data/users.json"
let user = jsonfs.read(userfn) || [];

function check_session(item){
    //セッションをチェックして、そのセッションを持つユーザの番地を返す
    console.log("call function check_session")
    let u=null;

    console.log("id :",item.ID);
    for(const d in user){
        console.log(user[d].ID);
        if(user[d].ID==item.ID){
            console.log(d);
            u=d;
            break;
        }
    }
    if(!u) return "not found";
    if(user[u].session!=item.session)return "session error";
    return u;
}

function login_check(item){
    //ユーザIDでusers.jsonを検索し、パスワードが同じで有れば、番地を返す
    let u=null;
    console.log("id :",item.ID);
    for(const d in user){
        console.log(user[d].ID);
        if(user[d].ID==item.ID){
            console.log(d);
            u=d;
            break;
        }
    }
    if(!u) return "not found";
    if(user[u].pass!=item.pass)return null;

    return u;
}

export {check_session,login_check};