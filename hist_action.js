import { jsonfs } from "https://js.sabae.cc/jsonfs.js";

const histfn = "data/users_hist.json"
let history = jsonfs.read(histfn) || [];

export function criate_history(ID){
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
    console.log("call function get_latest");
    history = jsonfs.read(histfn) || [];
    return history[index].hist.slice(-1)[0];
}

export function now_fitness(index){
    console.log("call function now_fitness");
    history = jsonfs.read(histfn) || [];
    return history[index].now_fitness;
}

function change_now(index,fitness){
    history = jsonfs.read(histfn) || [];
    history[index].now_fitness=fitness;
    jsonfs.write(histfn,history);
}

//tag:["start","finish"]
export function get_latest_tag(index){
    console.log("call function get_latest");
    history = jsonfs.read(histfn) || [];
    console.log(history[index].hist.slice(-1)[0].tag);
    return history[index].hist.slice(-1)[0].tag;
}

function add_hist(item){
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
    history = jsonfs.read(histfn) || [];
    index=item.index;
    hist=item.hist;

    const hist_res={
        date:new Date(),
        fitness:hist.fitness,
        tag:fitnes.tag
    }

    history[index].hist.push(hist_res);
    jsonfs.write(histfn,history);
    return "ok";
}

export function fitness_start(index,fitness){
    /*
        item={
            index:
            fitness:
        }
    */
    console.log("call function fitness_start");
    const data={
        index:index,
        hist:{
            fitness:fitness,
            tag:"start"
        }
    }
    add_hist(data);
    change_now(index,hist.fitness)
}

export function fitness_finish(index,fitness){
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

export function users_data_operation(index,users){
    /*
    {
        "ID":4,"name":"追加野郎a",
        "pass":"ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb",
        "session":0.15001652548641875,"is_active":true,
        "friend_ID":[]
    }
    */
   const item={
       ID:users.ID,
       name:users.name,
       pass:users.pass,
       session:users.session,
       is_active:users.is_active,
       friend_ID:users.friend_ID,
       fitness:history[index].now_fit
   }
   return item;
}