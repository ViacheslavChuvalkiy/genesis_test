<template>
  <li
    :class="$style.menuLink"
    :value="value"
    @click="listClick()"
  >
    {{listText}}
  </li>
</template>

<script>
  import {mapMutations} from "vuex";

  export default {
    props: {
      value: String,
      listText: String,
    },
    methods: {
      ...mapMutations(["changeActiveFilter"]),
      listClick() {
        this.changeActiveFilter(this.value);
      },
    }
  }
</script>

<style lang="scss" module>
  @import "./src/assets/vars";
  .menuLink {
    padding: 0.5rem 0;
    font-weight: 400;
    z-index: 99999999;
    &:hover {
      background-color: $links-btn;
    }
  }
</style>