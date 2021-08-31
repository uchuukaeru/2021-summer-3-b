<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

import axios from "axios";

export default {
  sockets: {
    connect: function() {
      console.log("socket to notification channel connected");
    },
  },
  name: "Home",
  components: {
    HelloWorld,
  },
  mounted() {
    this.Login();
    document.title = "Home | SyskenBlog";
  },
  methods: {
    async Login() {
      await axios
        .get("/api/login")
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
