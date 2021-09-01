<template>
  <div class="page-my-account">
    <div class="tabs is-left">
      <h1 class="title">{{ user.name }}のアカウントページ</h1>
    </div>
    <div class="tabs is-right">
      <ul>
        <!-- <li><a>Music</a></li>
        <li><a>Videos</a></li> -->
        <li class="" v-bind:class="{ 'is-active': showMyFriend }">
          <a @click="getMyfriends" class="has-text-info">
            フレンド
          </a>
        </li>
        <li class="" v-bind:class="{ 'is-active': showMyHistory }">
          <a @click="getMyHistory" class="has-text-info">
            これまでのスポーツ
          </a>
        </li>
        <li>
          <a
            class="show-modal has-text-danger"
            data-target="my-modal"
            @click="showModalEdit"
            >ログアウト</a
          >
        </li>
      </ul>
    </div>
    <div class="columns is-multiline" v-if="showMyFriend">
      <div class="column is-12">
        <div class="field has-addons">
          <div class="control">
            <input
              type="text"
              class="input"
              placeholder="ユーザーID"
              name="query"
              v-model="add_friend_ID"
            />
          </div>

          <div class="control">
            <button class="button is-warning" v-on:click="addFriend">
              <span class="icon">
                <i class="icon v-md-custom-icon-quill"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
      <UserBox
        v-for="user in Myfriends"
        v-bind:key="user.ID"
        v-bind:user="user"
      />
    </div>
    <div class="columns is-multiline" v-if="showMyHistory">
      HISTORY
    </div>

    <div class="modal" v-bind:class="{ 'is-active': showModal }">
      <div @click="showModalEdit" class="modal-background"></div>
      <div class="modal-content">
        <div class="card">
          <div class="card-content">
            <div class="content">
              本当にログアウトしますか？
              <p class="has-text-grey">
                ログインページから再度ログインできます
              </p>
              <br />
              <p>{{ currentDateTime() }}</p>
            </div>
            <div class="button is-danger" @click="logout">ログアウト</div>
          </div>
        </div>
      </div>
      <button
        @click="showModalEdit"
        class="modal-close is-large"
        aria-label="close"
      ></button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import UserBox from "@/components/UserBox.vue";

export default {
  name: "MyAccount",
  components: {
    UserBox,
  },
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
      Myfriends: [],
      showModal: false,

      showMyFriend: true,
      showMyHistory: false,

      add_friend_ID: null,
    };
  },
  mounted() {
    document.title = "My account | MinSpo!!";
    this.user = this.$store.state.user;
    this.getMyfriends();
  },
  methods: {
    logout() {
      this.$store.commit("removeSession");
      this.$store.commit("removeUser");

      this.$router.push("/");
    },
    showModalEdit() {
      this.showModal = !this.showModal;
    },
    async getMyfriends() {
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
            this.showMyHistory = false;
            this.showMyFriend = true;
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
    async getMyHistory() {
      this.showMyFriend = false;
      this.showMyHistory = true;
    },
    async addFriend() {
      this.$store.commit("setIsLoading", true);
      const formData = {
        ID: this.user.ID,
        session: this.user.session,
        friend_ID: this.add_friend_ID,
      };
      console.log("formData :", formData);
      // console.log(this.encryptPassword(formData.pass));

      await axios
        .post("/api/add_friend", formData)
        .then((response) => {
          console.log(response.data);
          this.getMyfriends();
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
    currentDateTime() {
      const current = new Date();
      const date =
        current.getFullYear() +
        "-" +
        (current.getMonth() + 1) +
        "-" +
        current.getDate();
      const time =
        current.getHours() +
        ":" +
        current.getMinutes() +
        ":" +
        current.getSeconds();
      const dateTime = date + " " + time;

      return dateTime;
    },
  },
};
</script>
