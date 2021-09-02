import { jsonfs } from "https://js.sabae.cc/jsonfs.js";

const histfn = "backend/data/users_hist.json";
let history = jsonfs.read(histfn) || [];

function get_latest(d) {
  console.log("call function get_latest");
  return history[d].hist.slice(-1)[0];
}

function add_hist(item) {
  /*
    item={
        d:
        hist:
    }
    */
  console.log("call function add_hist");
}

function get_all_hist(d) {}

function get_hist(item) {
  /*
    item={
        d:
        firstloc:
        num:
    }
    */
}

function fitness_start(item) {
  console.log("call function fitness_start");
}

function fitness_finish(item) {
  console.log("call function fitness_finish");
}

function now_fitness(item) {
  console.log("call function now_fitness");
}
