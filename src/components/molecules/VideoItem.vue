<template>
  <div :class="[pageView === 'grid'? $style.gridStyle : $style.listStyle]">
    <div :class="$style.imgBlock" :style="`background-image: url( ${videoImg})`">
    </div>
    <p v-html = "VideoTitle"></p>
    <button :class="$style.videoSaleBtn" v-if="videoSale">ПРИДБАТИ</button>
    <button :class="$style.videoShowBtn" v-else>ДИВИТИСЬ</button>
  </div>
</template>

<script>

  export default {
    props: {
      id: Number,
      VideoTitle: String,
      videoAccess: Boolean,
      videoImg: String,
      videoSale: Boolean,
      pageView: String,
    },
  };
</script>

<style lang="scss" module>
  @import "./src/assets/vars";
  .gridStyle, .listStyle {
    p {
      height: 5rem;
      overflow: hidden;
      margin: 1rem 0 3rem 0;
      padding: 0 2rem;
      font-size: 1.5rem;
      line-height: 1.7rem;
      font-weight: 400;
    }
    .videoShowBtn, .videoSaleBtn {
      display: block;
      position: relative;
      margin: 0 auto;
      padding: 0.5rem 2rem;
      box-sizing: border-box;
      border-radius: 1rem;
      letter-spacing: 2px;
      font-size: $fs-small;
      font-weight: 700;
      cursor: pointer;
    }
    .videoShowBtn:hover, .videoSaleBtn:hover {
      background-color: $hover-btn;
    }
    .videoShowBtn {
      border: 1px solid $border;
      &:after {
        content: url("../../assets/img/arrow.png");
        position: absolute;
        top: -0.2rem;
        right: -0.1rem;
      }
      &:hover {
        &:after {
          opacity: 0.5;
        }
      }
    }
    .videoSaleBtn {
      border: 2px solid $active;
      background-color: $active;
      color: $white;
      &:after {
        content: '\003E';
        position: absolute;
        color: $white;
        top: 0.1rem;
        font-size: $fs-large;
        right: 1rem;
      }
      &:hover {
        border: 2px solid $hover;
        background-color: $hover;
      }
    }
  }

  .gridStyle {
    .imgBlock {
      height: 17rem;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
    }
    .videoShowBtn, .videoSaleBtn {
      width: 80%;
    }
  }
  .listStyle {
    display: flex;
    position: relative;
    padding: 2rem 0;
    .imgBlock {
      display: inline-block;
      width: 10rem;
      height: 10rem;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
    p{
      display: inline-block;
      margin: 0 2rem;
      height: auto;
      width: 80%;
      overflow: hidden;
      text-overflow: ellipsis;
      max-height: 3.5rem;
    }
    .videoSaleBtn, .videoShowBtn{
      display: inline-block;
      position: absolute;
      width: 10rem;
      left: 20rem;
      bottom: 3rem;
    }
  }

  @media (max-width: 1200px) {
    .gridStyle {
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


  @media (max-width: 1100px) {
    .videoShowBtn:after, .videoSaleBtn:after {
      display: none;
    }
    .listStyle {
      .imgBlock{
        width: 15rem;
        height: 9rem;
        background-size: contain;
        background-position: left;
      }
      p{
        line-height: 1.5rem;
        padding: 0;
        max-height: 5rem;
      }
      .videoShowBtn, .videoSaleBtn{
        left: 15rem;
      }
    }
  }

  @media (max-width: 1000px) {
    .gridStyle {
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
    .gridStyle {
      .imgBlock {
        height: 10rem;
      }
    }
    .listStyle {
      padding: 1rem 0;
    }
  }

  @media (max-width: 680px) {
    .listStyle {
      .imgBlock{
        width: 55%;
      }
      p{
        font-size: $fs-main;
        line-height: 1.4rem;
        padding: 0;
        max-height: 4rem;
      }
      .videoShowBtn, .videoSaleBtn{
        left: 13rem;
      }
    }
  }

  @media (max-width: 550px) {
    .listStyle {
      .imgBlock{
        width: 80%;
      }
      p{
        font-size: $fs-main;
        line-height: 1.4rem;
        padding: 0;
        max-height: 4rem;
      }
      .videoShowBtn, .videoSaleBtn{
        left: 11rem;
      }
    }
  }

  @media (max-width: 500px) {
    .listStyle {
      .imgBlock{
        width: 19rem;
        height: 11rem;
      }
      p{
        font-size: $fs-main;
        line-height: 1.4rem;
        max-height: 5rem;
      }
      .videoShowBtn, .videoSaleBtn{
        left: 13rem;
      }
    }
  }

  @media (max-width: 450px) {
    .gridStyle {
      .imgBlock {
        height: 18rem;
      }
      p{
        width: 80%;
        padding: 1rem 2rem;
        margin: 0 auto;
      }
      .videoShowBtn, .videoSaleBtn {
        width: 65%;
      }
    }

    .listStyle {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 1rem 0 3rem 0;
      min-width: 320px;
      .imgBlock{
        height: 18rem;
      }
      p{
        width: 70%;
      }
      .videoShowBtn, .videoSaleBtn{
        left: 28%;
        bottom: 0;
      }
    }
  }

</style>