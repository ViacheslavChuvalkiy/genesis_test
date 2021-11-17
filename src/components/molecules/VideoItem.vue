<template>
  <div :class="$style.card">
    <router-link :to= "{name: 'userPage', params: {userInfo: {userName}, videoTitle: {videoTitle}, videoLink: {videoLink}} }">
    <div :class="$style.userInfo">
      <div :class="$style.imgBlock" :style="`background-image: url( ${userAvatar})`"></div>
      <div :class="$style.infoBlock">
        <h2>{{videoUser}}</h2>
        <p>{{videoTitle}}</p>
      </div>
    </div>
    </router-link>
    <div :class="$style.videoBlock">
      <Video :videoLink = "videoLink"/>
    </div>
    <div :class="$style.statistics">
      <div :class="$style.likes">
        <div></div>
        <span>{{videoLikes}}</span>
      </div>
      <div :class="$style.comment">
        <div></div>
        <span>{{commentCount}}</span>
      </div>
      <div :class="$style.hashtags">
        <div></div>
        <span>{{videoHashtags}}</span>
      </div>
    </div>
  </div>
</template>

<script>

  import Video from "../atoms/Video";
  export default {
    components: {Video},
    props: {
      id: String,
      videoTitle: String,
      videoLink: String,
      userAvatar: String,
      videoUser: String,
      userName: String,
      videoHashtags: Number,
      videoLikes: Number,
      commentCount: Number,
    },
  };
</script>

<style lang="scss" module>
  @import "src/assets/style.scss";
  .card {
    @include flexColmSpaceBetween;
    border-right: 1px solid $border;
    margin: 0 0 2rem 0 ;
    .videoBlock{
      margin: 1.5rem auto 0 auto;
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
      cursor: default;
      .imgBlock {
        flex: 0 0 auto;
        width: 7rem;
        height: 7rem;
        background-position: left;
        background-size: contain;
        background-repeat: no-repeat;
        cursor: pointer;
      }
      .infoBlock{
        @include flexColm;
        width: 100%;
        p {
          margin: 0 auto;
          padding: 0.5rem 0.5rem 0 1rem;
          font-size: 1.3rem;
          line-height: 1.5rem;
          font-weight: 400;
          color: $black;
        }
        h2{
          margin: 0 auto;
          padding: 0 0.5rem;
          color: $active;
          list-style: none;
          text-decoration: none;
          cursor: pointer;
          &:hover{
            @include hoverNameStyle;
          }
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