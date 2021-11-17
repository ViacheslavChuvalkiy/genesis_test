<template>
  <div id="app">
    <Content/>
  </div>
</template>

<script>

import Content from "./components/organisms/Content";
import { mapActions } from "vuex";
export default {
  components: {Content},
  methods: {
    ...mapActions(['getVideoList'])
  },
  mounted() {
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
