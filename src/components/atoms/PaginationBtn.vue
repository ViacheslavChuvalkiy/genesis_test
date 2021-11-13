<template>
  <li
    :class="[isCurrent ? $style.currentLink : $style.pageLink]"
    :id="id"
    @click="[access ? listClick(id) : null]"
  >
    {{listText}}
  </li>
</template>

<script>
  import {mapMutations} from "vuex";

  export default {
    props: {
      id: Number,
      listText: String,
      isCurrent: Boolean,
      access: Boolean,
    },
    methods: {
      ...mapMutations(["chooseCurrentPage"]),
      listClick(id) {
        if(id){
          this.chooseCurrentPage(id);
        }
      },
    }
  }
</script>

<style lang="scss" module>

  @import "./src/assets/vars";
  .pageLink, .currentLink {
    width: 1rem;
    height: 1rem;
    padding: 0.5rem;
    text-align: center;
    border: 1px solid $border;
    background-color: $white;
    font-weight: 400;
    cursor: pointer;
  }
  .pageLink:hover, .currentLink:hover {
    background-color: $hover-btn;
  }
  .currentLink {
    color: $active;
  }

</style>