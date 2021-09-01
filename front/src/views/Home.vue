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
        <h2 class="is-size-2 has-text-centered">アクティブなフレンド</h2>
      </div>
      <UserBox
        v-for="user in Myfriends"
        v-bind:key="user.ID"
        v-bind:user="user"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src

import UserBox from "@/components/UserBox";
export default {
  name: "Home",
  data() {
    return {
      Myfriends: [],
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
    this.GetMyfriends();
    document.title = "Myfriends | MinSpo!!";
    console.log("user: ", this.user);
  },
  methods: {
    async GetMyfriends() {
      this.$store.commit("setIsLoading", true);
      const formData = {
        ID: this.user.ID,
        session: this.user.session,
      };
      console.log("formData:", formData);

      await axios
        .post("/api/friend_data", formData)
        .then((response) => {
          console.log(response.data);
          if (response.data != "error") {
            this.Myfriends = response.data;
          }
          console.log("activeuser:", this.Myfriends);
        })
        .catch((error) => {
          console.log(error);
          // toast({
          //   message: "Something went wrong. Please try again.",
          //   type: "is-danger",
          //   dismissible: true,
          //   pauseOnHover: true,
          //   duration: 2000,
          //   position: "bottom-right",
          // });
        });
      this.$store.commit("setIsLoading", false);
    },
  },
};
</script>
