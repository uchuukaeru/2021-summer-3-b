<template>
  <div class="page-sign-up">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">Sign up</h1>

        <form @submit.prevent="submitForm">
          <div class="field">
            <label>Username</label>
            <div class="control">
              <input type="text" class="input" v-model="username" />
            </div>
          </div>

          <div class="field">
            <label>Password</label>
            <div class="control">
              <input type="password" class="input" v-model="password" />
            </div>
          </div>

          <div class="field">
            <label>Repeat password</label>
            <div class="control">
              <input type="password" class="input" v-model="password2" />
            </div>
          </div>

          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-dark">Sign up</button>
            </div>
          </div>

          <hr />

          Or <router-link to="/log-in">click here</router-link> to log in!
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";
import sha256 from "sha256";

export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      password: "",
      password2: "",
      errors: [],
      user_id: null,
    };
  },
  methods: {
    async submitForm() {
      this.$store.commit("setIsLoading", true);
      this.errors = [];

      if (this.username === "") {
        this.errors.push("The username is missing");
      }

      if (this.password === "") {
        this.errors.push("The password is too short");
      }

      if (this.password !== this.password2) {
        this.errors.push("The passwords doesn't match");
      }

      if (!this.errors.length) {
        const formData = {
          name: this.username,
          pass: sha256(this.password),
        };

        await axios
          .post("/api/register", formData)
          .then((response) => {
            if (response.data.type == "success") {
              console.log(response.data);
              this.user_id = response.data.message.ID;

              toast({
                message: "アカウントが登録されました。ログインします。",
                type: "is-success",
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: "bottom-right",
              });

              const loginFormData = {
                ID: response.data.message.ID,
                pass: response.data.message.pass,
              };
              this.login(loginFormData);
            } else {
              toast({
                message: "問題が発生しました。",
                type: "is-success",
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: "bottom-right",
              });
              return;
            }
          })
          .catch((error) => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(
                  `${property}: ${error.response.data[property]}`
                );
              }

              console.log(JSON.stringify(error.response.data));
            } else if (error.message) {
              this.errors.push("Something went wrong. Please try again");

              console.log(JSON.stringify(error));
            }
          });
      }

      this.$store.commit("setIsLoading", false);
    },
    async login(formData) {
      this.$store.commit("setIsLoading", true);
      localStorage.removeItem("settion");
      console.log("formData :", formData);
      // console.log(this.encryptPassword(formData.pass));

      await axios
        .post("/api/login", formData)
        .then((response) => {
          console.log("response :", response);
          if (response.data.type == "success") {
            this.$store.commit("setSession", response.data.message.session);
            localStorage.setItem("session", response.data.message.session);

            this.$store.commit("setUser", response.data.message);
            this.$router.push("/my-account");
          } else {
            if (!response.data.message) {
              toast({
                message: "パスワードが間違っています。",
                type: "is-danger",
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: "bottom-right",
              });
            } else {
              toast({
                message:
                  "ユーザーが存在しません。ユーザー名(ID)を確認してください。",
                type: "is-danger",
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: "bottom-right",
              });
            }
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
