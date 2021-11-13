<template>
  <div :class="$style.wrapper">
    <header>
      <h1>{{getActiveTheme}}</h1>
      <div :class="$style.menu">
        <VideoSearch/>
        <VideoPageView/>
      </div>
    </header>
    <VideoList/>
    <Pagination/>
  </div>
</template>

<script>

  import VideoSearch from "../atoms/VideoSearch";
  import VideoPageView from "../atoms/VideoPageView";
  import VideoList from "../organisms/VideoList";
  import Pagination from "../molecules/Pagination";
  import {mapGetters} from "vuex";

  export default {
    components: {
      VideoSearch,
      VideoPageView,
      VideoList,
      Pagination
    },
    computed: {
      ...mapGetters(["getActiveTheme"]),
    }
  }
</script>

<style lang="scss" module>

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: auto;
    padding: 2rem 0 0 3rem;
    box-sizing: border-box;
    header {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: auto;
      background: inherit;
      h1 {
        display: inline;
        margin: 0;
        padding: 0;
      }
      .menu {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
  }

  @media (max-width: 900px) {
    .wrapper {
      padding: 1rem 0.3rem 0 0.3rem;
      header {
        flex-direction: column-reverse;
        text-align: center;
        .menu{
          flex-direction: column;
        }
      }
    }
  }

  @media (max-width: 700px) {
    .wrapper {
      min-width: 320px;
      header {
        h1 {
          padding: 0.3rem 0;
        }
      }
    }
  }

</style>