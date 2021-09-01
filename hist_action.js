import { jsonfs } from "https://js.sabae.cc/jsonfs.js";

const histfn = "data/users_hist.json"
let history = jsonfs.read(histfn) || [];

function get_latest(d){
    console.log("call function get_latest");
    return history[d].hist.slice(-1)[0];
}

function add_hist(item){
    /*
    item={
        d:

    }
    */
    console.log("call function add_hist");
}

function get_all_hist(d){

}

function get_hist(item){
    /*
    item={
        d:
        
    }
    */
}