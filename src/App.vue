<template>
  <div id="app">
    <Content/>
  </div>
</template>

<script>
  import Content from "./components/organisms/Content.vue";
  import { mapMutations, mapActions } from "vuex";

export default {
  components: {
    Content,
  },
  methods: {
    ...mapMutations(["getPageViewFromLocalStorage"]),
    ...mapActions(['getVideoList'])
  },
  mounted() {
    if (localStorage.tasksList) {
      this.getPageViewFromLocalStorage();
    }
    this.getVideoList();
  },
}
</script>

<style>

  #app{
    margin: 0;
    padding: 0;
  }
</style>
