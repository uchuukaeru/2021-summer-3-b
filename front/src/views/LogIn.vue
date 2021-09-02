<template>
  <div class="page-log-in">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">Log in</h1>

        <form @submit.prevent="submitForm">
          <div class="field">
            <label>ユーザーID</label>
            <div class="control">
              <input type="text" class="input" v-model="user_id" />
            </div>
          </div>

          <div class="field">
            <label>Password</label>
            <div class="control">
              <input type="password" class="input" v-model="password" />
            </div>
          </div>

          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-dark">Log in</button>
            </div>
          </div>
          <hr />

          Or <router-link to="/sign-up">click here</router-link> to sign up!
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import sha256 from "sha256";
import { toast } from "bulma-toast";

export default {
  name: "LogIn",
  data() {
    return {
      user_id: "",
      password: "",
      errors: [],
    };
  },
  mounted() {
    document.title = "Log In | MinSpo";
  },
  methods: {
    async submitForm() {
      this.$store.commit("setIsLoading", true);
      const formData = {
        ID: this.user_id,
        pass: sha256(this.password),
      };
      localStorage.removeItem("settion");
      console.log("formData :", formData);
      // console.log(this.encryptPassword(formData.pass));

      await axios
        .post("/api/login", formData)
        .then((response) => {
          console.log("response :", response);
          if (response.data == "not found") {
            toast({
              message:
                "ユーザーが存在しません。ユーザー名(ID)を確認してください。",
              type: "is-danger",
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: "bottom-right",
            });
          } else if (response.data) {
            console.log(response.data);
            const session = response.data.session;
            this.$store.commit("setSession", session);
            localStorage.setItem("session", session);

            this.$store.commit("setUser", response.data);

            // user =
            // console.log("user:", this.user);

            this.$router.push("/my-account");
          } else {
            toast({
              message: "パスワードが間違っています。",
              type: "is-danger",
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: "bottom-right",
            });
          }
        })
        .catch((error) => {
          if (error.response) {
            for (const property in error.response.data) {
              this.errors.push(`${property}: ${error.response.data[property]}`);
            }
          } else {
            this.errors.push("Something went wrong. Please try again");

            console.log(JSON.stringify(error));
          }
        });
      this.$store.commit("setIsLoading", false);
    },
  },
};
</script>
