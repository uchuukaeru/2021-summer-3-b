import { jsonfs } from "https://js.sabae.cc/jsonfs.js";

import { check_session } from "./check_session.js";
import {criate_history,users_data_operation} from "./hist_action.js";

const userfn = "data/users.json"
let user = jsonfs.read(userfn) || [];

export function regist(item){
    /*
        item={
            name:
            pass:
        }
    */
    let ses_array=[];
    for(const d of user){
        ses_array.push(d.session);
    }
    console.log(ses_array);
    let ses=0;
    while(1){
        ses=Math.random();
        if(!ses_array.includes(ses)) break;
    }
    const id=user.length+1;
    const data={
        ID:id,
        name:item.name,
        pass:item.pass,
        session:ses,
        is_active:false,
        friend_ID:[]
    }

    criate_history(id);
    user.push(data);
    jsonfs.write(userfn,user);
    user = jsonfs.read(userfn) || [];
    index=check_session(data);
    const res=users_data_operation(data,index);
    return res;
}