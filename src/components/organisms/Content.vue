<template>
  <div :class="$style.container">
      <Header/>
      <div :class="$style.wrapper">
        <router-view></router-view>
      </div>
      <Footer/>
  </div>
</template>

<script>
  import Header from "./Header.vue";
  import Footer from "./Footer.vue";
  import {mapGetters, mapMutations} from "vuex";

  export default {
    components: {
      Header,
      Footer,
    },
    computed: {
      ...mapGetters(["showListMenu"]),
    }
    ,
    methods:{
      ...mapMutations(["toggleListMenu"]),
    }
  };
</script>

<style lang="scss" module>
  @import "src/assets/style.scss";
  .container {
    display: flex;
    flex-direction: column;
    width: calc(100vw - (100vw - 100%));
    min-height: 100vh;
    background-color: $bg-color;
  }
  @media (max-width: 800px) {
    .container {
      min-width: 310px;
      }
    }
</style>
