import { jsonfs } from "https://js.sabae.cc/jsonfs.js";

const histfn = "data/users_hist.json"
let history = jsonfs.read(histfn) || [];

export function criate_history(ID){
    //ユーザ登録時に履歴の保存先を追加する
    console.log("call function criate_history");
    const item={
        ID:ID,
        now_fitness:null,
        hist:[]
    }
    history.push(item);
    jsonfs.write(histfn,history);
}

export function get_latest(index){
    //最新の履歴を取得する
    console.log("call function get_latest");
    history = jsonfs.read(histfn) || [];
    return history[index].hist.slice(-1)[0];
}

export function now_fitness(index){
    //now_fitnessを取り出す
    console.log("call function now_fitness");
    history = jsonfs.read(histfn) || [];
    return history[index].now_fitness;
}

function change_now(index,fitness){
    //now_fitnessを変更する
    history = jsonfs.read(histfn) || [];
    history[index].now_fitness=fitness;
    jsonfs.write(histfn,history);
}

//tag:["start","finish"]
export function get_latest_tag(index){
    //最新の履歴のtagを取得する
    console.log("call function get_latest");
    history = jsonfs.read(histfn) || [];
    console.log(history[index].hist.slice(-1)[0].tag);
    return history[index].hist.slice(-1)[0].tag;
}

function add_hist(item){
    //履歴を追加する
    /*
    item={
        index:
        hist:{
            fitness:
            tag:
        }
    }
    */
    console.log("call function add_hist");
    //console.log(item);
    history = jsonfs.read(histfn) || [];
    const index=item.index;
    const hist=item.hist;

    console.log(hist)
    const hist_res={
        date:new Date(),
        fitness:hist.fitness,
        tag:hist.tag
    }

    history[index].hist.push(hist_res);
    jsonfs.write(histfn,history);
    return "ok";
}

export function fitness_start(index,fitness){
    //運動開始時に履歴を追加
    console.log("call function fitness_start");
    const data={
        index:index,
        hist:{
            fitness:fitness,
            tag:"start"
        }
    }
    add_hist(data);
    change_now(index,fitness)
}

export function fitness_finish(index,fitness){
    //運動終了時に履歴を追加
    console.log("call function fitness_finish");
    const data={
        index:index,
        hist:{
            fitness:fitness,
            tag:"finish"
        }
    }
    add_hist(data);
    change_now(index,null);
}

export function users_data_operation(index,item){
    
    /*
    item={
        "ID":4,"name":"追加野郎a",
        "pass":"ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb",
        "session":0.15001652548641875,"is_active":true,
        "friend_ID":[]
    }
    */
   console.log("call function users_data_operation");
   history = jsonfs.read(histfn) || [];
   //console.log(index);
   //console.log(history[index]);
   item.now_fitness=history[index].now_fitness
   //console.log("users_... item:",item)
   return item;
}

export function get_history(index,reqnum){
    console.log("call function get_history");
    history = jsonfs.read(histfn) || [];
    let data=[];
    const num=reqnum*2;
    const hist=history[index].hist;

    if(num>hist.length) return hist;

    for(let d =0;d<num;d++){
        data.push(hist.slice(-1*(d+1))[0]);
    }
    return data;
}