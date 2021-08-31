import { jsonfs } from "https://js.sabae.cc/jsonfs.js";

const userfn = "data/users.json"
let user = jsonfs.read(userfn) || [];

function get_active(){
    console.log("call function get_active")
    let active_user=[];
      for(const d of user){
        if(d.is_active) active_user.push(d.ID);
    }
    return active_user;
}

export {get_active};