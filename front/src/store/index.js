import { createStore } from "vuex";

export default createStore({
  state: {
    isAuthenticated: false,
    settion: "",
    user: {
      ID: null,
      name: "",
      session: null,
      is_active: false,
      fitness: "",
      friend_ID: [],
    },
    isLoading: false,
  },
  mutations: {
    initializeStore(state) {
      if (!(localStorage.getItem("session") === '""')) {
        state.session = localStorage.getItem("session");
        state.isAuthenticated = true;
        if (localStorage.getItem("user")) {
          state.user = JSON.parse(localStorage.getItem("user"));
        } else {
          state.user = {
            ID: null,
            name: "",
            session: null,
            is_active: false,
            fitness: "",
            friend_ID: [],
          };
        }
      } else {
        state.session = "";
        state.isAuthenticated = false;
      }
      console.log(state);
    },
    setIsLoading(state, status) {
      state.isLoading = status;
    },

    setSession(state, session) {
      state.session = session;
      state.isAuthenticated = true;

      localStorage.setItem("session", JSON.stringify(state.session));
    },
    removeSession(state) {
      state.session = "";
      state.isAuthenticated = false;
      localStorage.setItem("session", JSON.stringify(state.session));
    },

    setUser(state, user) {
      state.user = user;

      localStorage.setItem("user", JSON.stringify(state.user));
    },
    removeUser(state) {
      state.user = {
        ID: null,
        name: "",
        session: null,
        is_active: false,
        fitness: "",
        friend_ID: [],
      };
      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
  actions: {},
  modules: {},
});
