<template>
  <div class="home">
    <section class="hero is-medium is-info md-6">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">みんスポ！</p>
        <p class="subtitle">
          みんなでスポーツしましょう！
        </p>
      </div>
    </section>
    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">アクティブなユーザー</h2>
      </div>
      <UserBox
        v-for="user in activeUsers"
        v-bind:key="user.ID"
        v-bind:user="user"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src
import { toast } from "bulma-toast";

import UserBox from "@/components/UserBox";
export default {
  name: "Home",
  data() {
    return {
      activeUsers: [],
      user: {
        ID: null,
        name: "",
        session: null,
        is_active: false,
        fitness: "",
        friend_ID: [],
      },
    };
  },
  components: {
    UserBox,
  },
  mounted() {
    this.user = this.$store.state.user;
    this.GetActiveUsers();
    document.title = "ActiveUsers | MinSpo!!";
    console.log(this.user);
  },
  methods: {
    async GetActiveUsers() {
      this.$store.commit("setIsLoading", true);

      await axios
        .get("api/get_active")
        .then((response) => {
          console.log(response.data);
          if (response.data.type == "success") {
            this.activeUsers = response.data.message;
            console.log("activeuser:", this.activeUsers);
          } else {
            toast({
              message: "Something went wrong. Please try again.",
              type: "is-danger",
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: "bottom-right",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          toast({
            message: "Something went wrong. Please try again.",
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: "bottom-right",
          });
        });
      this.$store.commit("setIsLoading", false);
    },
  },
};
</script>
