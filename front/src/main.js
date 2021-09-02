import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

import "@/assets/css/font.css";

axios.defaults.baseURL = "http://localhost:8891";

// axios.defaults.baseURL = "https://3b.intern.jigd.info";

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
