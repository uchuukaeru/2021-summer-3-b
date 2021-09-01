<template>
  <div class="home">
    <section class="hero is-medium is-dark md-6">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">
          SyskenBlogへようこそ！
        </p>
        <p class="subtitle">
          ここは、プログラミングの知識を後輩に伝えていく場所です。
        </p>
      </div>
    </section>
    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">最新の記事</h2>
      </div>
      <ArticleBox
        v-for="article in latestArticles"
        v-bind:key="article.id"
        v-bind:article="article"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src

import ArticleBox from "@/components/ArticleBox";
export default {
  name: "Home",
  data() {
    return {
      latestArticles: [],
      user: {
        username: "",
        id: null,
        emaild: "",
      },
    };
  },
  components: {
    ArticleBox,
  },
  mounted() {
    this.user = this.$store.state.user;
    this.getLatestArticles();
    document.title = "Home | SyskenBlog";
  },
  methods: {
    async getLatestArticles() {
      this.$store.commit("setIsLoading", true);

      await axios
        .get("api/v1/articles/latest")
        .then((response) => {
          this.latestArticles = response.data;
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
