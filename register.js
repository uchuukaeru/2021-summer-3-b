import { jsonfs } from "https://js.sabae.cc/jsonfs.js";

const userfn = "data/users.json"
let user = jsonfs.read(userfn) || [];

export function regist(item){
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
    const res={
        ID:id,
        name:item.name,
        pass:item.pass,
        session:ses,
        is_active:false,
        friend_ID:[]
    }
    user.push(res);
    jsonfs.write(userfn,user);
    user = jsonfs.read(userfn) || [];
    return res;
}

/*
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
const item={
    ID:id,
    name:req.name,
    pass:req.pass,
    session:ses,
    is_active:false,
    friend_ID:[]
}
user.push(item);
jsonfs.write(userfn,user);
const res={
    ID:id,
    session:ses
}
return res;
*/