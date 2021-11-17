<template>
  <div :class="$style.wrapper">
    <div :class="$style.error" v-if="getErrorStatus">
      <isError/>
    </div>
    <template v-else>
      <SideBar/>
      <Loader v-if="getLoaderStatus"/>
      <template v-else>
        <div :class="$style.wrapperVideoBlock">
          <VideoList/>
          <Pagination/>
        </div>
      </template>
    </template>
  </div>
</template>

<script>

  import VideoList from "../organisms/VideoList";
  import Pagination from "../molecules/Pagination";
  import SideBar from "./SideBar";
  import isError from "../atoms/Error";
  import Loader from "../atoms/Loader";
  import {mapGetters} from "vuex";

  export default {

    components: {
      SideBar,
      VideoList,
      Pagination,
      isError,
      Loader
    },
    computed: {
      ...mapGetters(["getErrorStatus","getLoaderStatus"]),
    }

  }
</script>

<style lang="scss" module>
  @import "src/assets/style.scss";
  .wrapper {
    display: flex;
    justify-content: space-between;
    height: 100%;
    min-height: 25rem;
    padding: 2rem 1.5rem 0 1.5rem;
    z-index: 1;
    .error{
      width: 100%;
    }
  }
  .wrapperVideoBlock {
    @include flexColmSpaceBetween;
    width: 100%;
    height: auto;
    padding: 2rem 0 0 1rem;
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
      .wrapperVideoBlock {
        padding: 1rem 0.3rem 0 0.3rem;
        header {
          flex-direction: column-reverse;
          text-align: center;
          .menu {
            flex-direction: column;
          }
        }
      }
    }
  }
  @media (max-width: 700px) {
    .wrapper {
      .wrapperVideoBlock {
        min-width: 320px;
        header {
          h1 {
            padding: 0.3rem 0;
          }
        }
      }
    }
  }

</style>