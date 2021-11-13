<template>
  <div :class="$style.container" @click="clickContent">
    <Header/>
    <div :class="$style.wrapper">
      <SideBar/>
      <VideoPage/>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import Header from "./Header.vue";
  import SideBar from "./SideBar.vue";
  import VideoPage from "./VideoPage";
  import Footer from "./Footer.vue";
  import {mapGetters, mapMutations} from "vuex";

  export default {
    components: {
      Header,
      SideBar,
      VideoPage,
      Footer,
    },
    computed: {
      ...mapGetters(["showListMenu"]),
    }
    ,
    methods:{
      ...mapMutations(["toggleListMenu"]),
       clickContent(){
        if(this.showListMenu){
          this.toggleListMenu();
        }
       }
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
    .wrapper {
      display: flex;
      justify-content: space-between;
      height: 100%;
      min-height: 25rem;
      padding: 2rem 1.5rem 0 1.5rem;
      z-index: 1;
    }
  }
  @media (max-width: 800px) {
    .container {
      min-width: 310px;
      .wrapper {
        padding: 2rem 0 0 0;
      }
      }
    }
</style>
