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
    /*
    item={
        d:
        friend_ID:
    }
    */
    
    const friend_ID = item.friend_ID
    let message = ""

    // ID, session, friendid
    const isMyId = (data) => String(data["ID"]) === String(item.d["ID"])

    const newUser = user.map((data) => {
        if (isMyId(data)) {
            if (data["friend_ID"].some((e) => String(friend_ID) == String(e))) {
                message = "error"
            } else {
                data["friend_ID"].push(friend_ID)
            }
        }
        return data
    })
    if (message !== "error")  message = "ok";

    jsonfs.write(userfn, newUser);
    return message
}

export {get_data,change_active,add_friend};
