<template>
  <div class="wrapper">
    <nav class="navbar is-link">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <span class="icon">
            <i class="icon v-md-custom-icon-home3"></i>
          </span>
          <strong>みんスポ！</strong>
        </router-link>
        <router-link to="#" class="navbar-item">
          <p class=" is-3 is-spaced" v-if="user.fitness">
            現在の運動：{{ user.fitness }}
          </p>
        </router-link>

        <a
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-menu"
          @click="showMobileMenu = !showMobileMenu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        class="navbar-menu"
        id="navbar-menu"
        v-bind:class="{ 'is-active': showMobileMenu }"
      >
        <div class="navbar-start">
          <div class="navbar-item">
            <div class="field has-addons">
              <div class="control">
                <input
                  type="text"
                  class="input"
                  placeholder="運動を設定"
                  name="query"
                  v-model="set_fitness"
                />
              </div>

              <button class="button is-warning" v-on:click="changeFitness">
                <span class="icon">
                  <i class="icon v-md-custom-icon-fire"></i>
                </span>
              </button>
              <div class="control">
                <button class="button is-success" v-on:click="finishFitness">
                  <span class="icon">
                    <i class="icon v-md-custom-icon-leaf"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <template v-if="$store.state.isAuthenticated">
                <router-link to="/my-account" class="button is-light"
                  >アカウント</router-link
                >
              </template>

              <template v-else>
                <router-link to="/log-in" class="button is-light"
                  >Log in</router-link
                >
              </template>

              <router-link to="/active-users" class="button is-warning">
                <span class="icon v-md-custom-icon-earth"></span>
                <span>世界のアクティブ</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div
      class="is-loading-bar has-text-centered"
      v-bind:class="{ 'is-loading': $store.state.isLoading }"
    >
      <div class="lds-dual-ring"></div>
    </div>

    <section class="section">
      <router-view />
    </section>
    <footer class="fotter">
      <p class="has-text-centered">Copyright (c) 2021</p>
    </footer>
  </div>
  <!-- <router-view/> -->
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";
export default {
  data() {
    return {
      user: {
        ID: null,
        name: "",
        session: null,
        is_active: false,
        fitness: "",
        friend_ID: [],
      },
      showMobileMenu: false,
      is_loading: false,
      set_fitness: null,
    };
  },
  beforeCreate() {
    this.$store.commit("initializeStore");
    // const session = this.$store.state.session;
    // if (session) {
    //   axios.defaults.headers.common["Authorization"] = "session " + session;
    // } else {
    //   axios.defaults.headers.common["Authorization"] = "";
    // }
  },
  mounted() {
    this.is_loading = this.$store.state.is_loading;
    this.user = this.$store.state.user;
  },
  methods: {
    async changeFitness() {
      if (this.set_fitness) {
        console.log(this.user);
        const formData = {
          ID: this.user.ID,
          session: this.user.session,
          fitness: null,
        };
        if (this.user.fitness) {
          await axios.post("/api/fitness", formData);
        }
        formData.fitness = this.set_fitness;
        await axios.post("/api/fitness", formData).then((response) => {
          console.log("response:", response);
          if (response.data.type == "success") {
            this.user.fitness = this.set_fitness;
            this.$store.commit("setUser", this.user);
            toast({
              message: "運動を設定しました",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: "bottom-right",
            });
          }
        });
        this.set_fitness = "";
      } else {
        toast({
          message: "運動を記入してください",
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
          duration: 2000,
          position: "bottom-right",
        });
      }
    },
    async finishFitness() {
      if (this.user.fitness) {
        console.log(this.user);
        const formData = {
          ID: this.user.ID,
          session: this.user.session,
          fitness: null,
        };
        if (this.user.fitness) {
          await axios.post("/api/fitness", formData).then((response) => {
            toast({
              message: "休憩します",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: "bottom-right",
            });
          });
        }
        this.user.fitness = "";
      } else {
        toast({
          message: "すでに休憩中です",
          type: "is-warning",
          dismissible: true,
          pauseOnHover: true,
          duration: 2000,
          position: "bottom-right",
        });
      }
    },
  },
  computed: {},
};
</script>

<style lang="scss">
@import "../node_modules/bulma";

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid rgb(5, 5, 5);
  border-color: rgb(0, 0, 0) transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.is-loading-bar {
  height: 0px;
  overflow: hidden;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  &.is-loading {
    height: 80px;
  }
}
</style>
