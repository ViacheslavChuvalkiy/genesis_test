<template>
  <div :class="$style.wrapper">
      <VideoItem
        v-for="video in videoList"
        :key="video.id"
        :id="video.id"
        :videoTitle="video.text"
        :videoLink="video.videoUrl"
        :userAvatar="video.authorMeta.avatar"
        :videoUser="video.authorMeta.nickName"
        :userName="video.authorMeta.name"
        :videoHashtags="video.hashtags.length"
        :videoLikes="video.authorMeta.heart"
        :commentCount="video.commentCount"
      />
  </div>
</template>

<script>

  import VideoItem from "../molecules/VideoItem";

  import {mapGetters} from "vuex";

  export default {
    components: {
      VideoItem
    },
    computed: {
      ...mapGetters(["videoList"]),
    },
  }
</script>

<style lang="scss" module>
  @import "src/assets/style.scss";
  .wrapper {
    display: grid;
    padding:  0 0 1rem 0;
    min-height: auto;
    height: 100%;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(20rem, auto);
    grid-column-gap: 1rem;
    grid-row-gap: 0.5rem;
    text-align: left;
  }

  @media (max-width: 1000px) {
    .wrapper{
      padding: 2rem 0 1.5rem 0;
    }
  }

  @media (max-width: 960px) {
    .wrapper {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 450px) {
    .wrapper {
      min-width: 320px;
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>