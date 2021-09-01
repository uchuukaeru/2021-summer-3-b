<template>
  <div class="wrapper">
    <nav class="navbar is-link">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <span class="icon"> <i class="icon v-md-custom-icon-home3"></i> </span
          ><strong>みんスポ！</strong></router-link
        >

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
            <form method="get" action="#">
              <div class="field has-addons">
                <div class="control">
                  <input
                    type="text"
                    class="input"
                    placeholder="ユーザー名"
                    name="query"
                  />
                </div>

                <div class="control">
                  <button class="button is-warning">
                    <span class="icon">
                      <i class="icon v-md-custom-icon-search"></i>
                    </span>
                  </button>
                </div>
              </div>
            </form>
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
export default {
  data() {
    return {
      showMobileMenu: false,
      is_loading: false,
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
    // this.is_loading = this.$store.state.is_loading;
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
