<template>
  <div :class="$style.card">
    <div :class="$style.videoBlock">
      <p>{{videoTitle}}</p>
      <p>{{getFeeds.stat}}</p>
      <Video :videoLink = "videoLink"/>
    </div>
    <div :class="$style.userInfo">
      <div :class="$style.infoBlock">
        <div :class="$style.imgBlock" :style="`background-image: url( ${getInfo.user.avatarMedium})`"></div>
        <h1>{{getInfo.user.nickname}}</h1>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import Video from "../atoms/Video";

  export default {
    components: {Video},
    props:{
      videoLink: String,
      videoTitle: String
    },
    computed: {
      ...mapGetters(["getInfo","getFeeds"]),
    },

  };
</script>

<style lang="scss" module>
  @import "src/assets/style.scss";

  .card {
    width: 70%;
    @include container;
    @include flexStyle;
    align-items: flex-start;
    .videoBlock{
      margin: 1.5rem auto 0 auto;
      video{
        height: 20rem;
        width: 100%;
        cursor: pointer;
      }
    }
    .userInfo {
      display: flex;
      flex: 1 1 auto;
      margin: 1.5rem auto 0 auto;
      .imgBlock {
        flex: 0 0 auto;
        width: 7rem;
        height: 7rem;
        background-position: left;
        background-size: contain;
        background-repeat: no-repeat;
      }
      .infoBlock{
        @include flexRowCenter;
        width: 100%;
        margin: 2rem 0 0 0;
        p {
          margin: 0 auto;
          padding: 0.5rem 0.5rem 0 1rem;
          font-size: 1.3rem;
          line-height: 1.5rem;
          font-weight: 400;
          color: $black;
        }
        h1{
          padding: 0 0.5rem;
          color: $active;
        }
      }
    }
  }

  @media (max-width: 1200px) {
    .card {
      .imgBlock {
        height: 13rem;
      }
      p{
        height: 3rem;
        line-height: 1.5rem;
        font-size: $fs-main;
      }

    }
  }

  @media (max-width: 1000px) {
    .card {
      .imgBlock {
        height: 10rem;
      }
      p{
        line-height: 1rem;
        margin: 1rem 0 1.5rem 0;
      }
    }
  }

  @media (max-width: 960px) {
    .card {
      .imgBlock {
        height: 10rem;
      }
    }
  }

  @media (max-width: 450px) {
    .card {
      .imgBlock {
        height: 18rem;
      }
      p{
        width: 80%;
        padding: 1rem 2rem;
        margin: 0 auto;
      }
    }
  }

</style>