<template>
  <div :class="$style.wrapper" v-if="paginationList.length">
    <button
      :disabled = "getCurrentPage === 1"
      @click="prevPage">
      &lt;
    </button>
    <ul>
      <PaginationBtn
        v-for="list in paginationList"
        :key="list.id"
        :id="list.id"
        :listText="list.text"
        :isCurrent="list.isCurrent"
        :access=list.access
      />
    </ul>
    <button
      :disabled = "getCurrentPage === getPageCount"
      @click="nextPage">
      &gt;
    </button>
  </div>
</template>

<script>
  import PaginationBtn from "../atoms/PaginationBtn"
  import {mapGetters, mapMutations} from "vuex";

  export default {
    components: {
      PaginationBtn
    },
    computed: {
      ...mapGetters(["getCurrentPage", "getPageCount", "paginationList"]),
    },
    methods: {
      ...mapMutations(["changeCurrentPage"]),
      nextPage() {
        this.changeCurrentPage(+1);
      },
      prevPage() {
        this.changeCurrentPage(-1);
      }
    }
  }

</script>

<style lang="scss" module>
  @import "./src/assets/mixins";
  .wrapper {
    @include flexRowCenter();
    padding: 0.5rem 2.5rem 0 2.5rem;
    ul {
      @include flexRowCenter();
    }
    button {
      padding: 0 0.7rem;
      text-align: center;
      border: 1px solid $border;
      background-color: $white;
      font-size: $fs-main;
      font-weight: 400;
      cursor: pointer;
    }
    button:hover {
      background-color: $hover-btn;
    }
  }

</style>