<template>
  <div :class="$style.videoSearch">
    <input
      type="text"
      v-model="value"
      @change="changeSearch"
      maxlength="30"
    />
    <span></span>
  </div>
</template>

<script>
  import {mapMutations} from "vuex";

  export default {
    data: () => ({
      value: "",
    }),
    methods: {
      ...mapMutations(["changeSearchInput"]),
      changeSearch() {
        this.changeSearchInput(this.value)
      }
    }
  }
</script>

<style lang="scss" module>
  @import "src/assets/style.scss";
  .videoSearch {
    position: relative;
    input {
      width: 15rem;
      margin: 0.4rem 0.2rem;
      border: none;
      outline: none;
      height: 1.3rem;
      border-radius: 5px;
    }
    span:before {
      content: url("../../assets/img/loop.png");
      position: absolute;
      top: 0.4rem;
      right: 1rem;
      padding: 0.2rem 0;
      cursor: pointer;
    }
  }

  @media (max-width: 900px) {
    .videoSearch {
      input {
        width: 12rem;
      }
      span:before {
        right: 1.5rem;
      }
    }
  }


</style>