<template>
  <div class="column is-2 is-narrow">
    <div class="box">
      <p class="is-size-6 lineClamp title has-text-primary">
        {{ user.name }}
      </p>
      <p v-if="user.now_fitness" class="is-size-6 lineClamp subtitle">
        <span class="icon v-md-custom-icon-fire"></span>
        {{ user.now_fitness }}
      </p>
      <p v-else class="is-size-6 lineClamp subtitle">
        <span class="icon v-md-custom-icon-leaf"></span>
        休息
      </p>
      <!-- v-bind:to="`/user/${user.id}/`" -->
    </div>
  </div>
</template>

<script>
export default {
  name: "UserBox",
  props: {
    user: Object,
  },
};
</script>

<style scoped>
.image {
  margin-top: -1.25rem;
  margin-left: -1.25rem;
  margin-right: -1.25rem;
}
.lineClamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  /*IE対策*/
  line-height: 1.5em;
  max-height: 4.5em;
}
</style>
