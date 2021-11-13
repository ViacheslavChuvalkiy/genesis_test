<template>
  <div :class="$style.wrapper">
    <span :class="$style.videoGridView" @click="changePageView('grid')"></span>
    <span :class="$style.videoListView" @click="changePageView('list')"></span>
  </div>
</template>

<script>

  import {mapMutations,mapGetters} from "vuex";

  export default {
    computed:{
      ...mapGetters(["getPageView"])
    },
    methods: {
      ...mapMutations(["changesPageView","saveDataLocalStorage"]),
      changePageView(value) {
        if(this.getPageView !== value){
          this.changesPageView(value);
          this.saveDataLocalStorage();
        }

      },
    }
  }
</script>

<style lang="scss" module>
  @import "./src/assets/mixins";
  .wrapper {
    @include flexRowCenter();
    padding: 0 0.5rem;
    .videoListView {
      display: block;
      width: 1.5rem;
      height: 1.5rem;
      margin: 0.3rem 0.4rem;
      background-image: url("../../assets/img/list.png");
      background-repeat: no-repeat;
      background-size: cover;
      cursor: pointer;
    }
    .videoGridView {
      display: block;
      width: 1.5rem;
      height: 1.5rem;
      margin: 0.3rem 0.4rem;
      background-image: url("../../assets/img/grid.png");
      background-repeat: no-repeat;
      background-size: cover;
      cursor: pointer;
    }
  }

</style>