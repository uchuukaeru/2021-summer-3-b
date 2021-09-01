import { jsonfs } from "https://js.sabae.cc/jsonfs.js";

const userfn = "data/users.json"
let user = jsonfs.read(userfn) || [];

function check_session(item){
    console.log("call function check_session")

    const checked = user.find((a) => {
        return String(a.ID) == String(item.ID) && String(a.session) == String(item.session)
    })
    
    if (!checked) return "session error";

    return user.indexOf(checked);
}

function login_check(item){
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
