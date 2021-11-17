<template>
  <div :class="$style.wrapper">
    <div :class="$style.error" v-if="getErrorStatus">
      <isError/>
    </div>
    <template v-else>
      <Loader v-if="getLoaderStatus"/>
      <template v-else>
        <router-link :to= "{name: 'videoPage'}">
          <p :class="$style.linkBack">Вернуться в каталог</p>
        </router-link>
          <UserItem :videoLink = "videoLink.videoLink" :videoTitle = "videoTitle.videoTitle"/>
      </template>
    </template>
  </div>
</template>

<script>

  import {mapGetters, mapActions} from "vuex";
  import Loader from "../atoms/Loader";
  import isError from "../atoms/Error";
  import UserItem from "../molecules/UserItem";

  export default {
    props: {
      userInfo: Object,
      videoLink: Object,
      videoTitle: Object
    },
    components: {
      UserItem,
      Loader,
      isError
    },
    methods: {
      ...mapActions(['getUserInfo',"getUserFeeds"])
    },
    computed: {
      ...mapGetters(["getErrorStatus","getLoaderStatus"]),
    },
    mounted() {
      if(this.userInfo){
        this.getUserInfo(this.userInfo.userName);
        this.getUserFeeds(this.userInfo.userName);
      }
    }
  };
</script>

<style lang="scss" module>
  @import "src/assets/style.scss";
  .wrapper {
    @include flexColmSpaceBetween;
    margin: 0 0 2rem 0;
    .linkBack{
      text-decoration: none;
      padding: 0 1rem;
      color: $black;
      &:hover{
        text-decoration: underline;
      }
    }
    .videoBlock{
      margin: 1rem auto 0 auto;
      video{
        height: 20rem;
        width: 100%;
        cursor: pointer;
        @include hoverCardStyle;
      }
    }
    .userInfo {
      display: flex;
      flex: 1 1 auto;
      .imgBlock {
        width: 7rem;
        height: 7rem;
        background-position: left;
        background-size: contain;
        background-repeat: no-repeat;
        cursor: pointer;
      }
      .infoBlock{
        @include flexColmSpaceBetween;
        p {
          margin: 0 auto;
          padding: 0 0.5rem 1rem 1rem;
          font-size: 1.3rem;
          line-height: 1.5rem;
          font-weight: 400;
          cursor: pointer;
        }
      }
    }
    .statistics {
      @include flexStyle();
      .hashtags, .likes, .comment {
        display: flex;
        align-items: center;
        padding: 0.5rem 1rem;
      }
      .hashtags div, .likes div, .comment div {
        width: 2rem;
        height: 2rem;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
      }
      .hashtags span, .likes span, .comment span {
        padding: 0 0 0 0.4rem;
      }
      .hashtags div {
        background-image: url("../../assets/img/hashtag.png");
      }
      .likes div {
        background-image: url("../../assets/img/like.png");
        cursor: pointer;
      }
      .comment div {
        background-image: url("../../assets/img/comment.png");
      }
    }
   }

  @media (max-width: 1200px) {
    .wrapper {
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
    .wrapper {
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
    .wrapper {
      .imgBlock {
        height: 10rem;
      }
    }
  }

  @media (max-width: 450px) {
    .wrapper {
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