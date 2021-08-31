import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

// import VueSocketIO from "vue-3-socket.io";
// import SocketIO from "socket.io-client";

const options = { path: "/ws/" }; //Options object to pass into SocketIO

// const VueSocketIO_client = new VueSocketIO({
//   debug: true,
//   connection: SocketIO("http://localhost:3000", options), //options object is Optional
//   vuex: {
//     store,
//     actionPrefix: "SOCKET_",
//     mutationPrefix: "SOCKET_",
//   },
// });

axios.defaults.baseURL = "http://localhost:8001";

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
