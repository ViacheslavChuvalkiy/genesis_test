<template>
  <div :class="$style.wrapper">
    <span :class="$style.filterVideo" @click="toogleView">ВІДЕО</span>
    <div :class="$style.filter">
      <FilterBtn
        v-for="filter in filterList"
        :key="filter.id"
        :filterValue="filter.value"
        :filterText="filter.text"
        :filterChecked="filter.isChecked"
      />
    </div>
    <span :class="$style.filterTheme" @click="toogleView">ТЕМИ</span>
    <div :class="$style.themes">
      <ul>
        <ThemeBtn
          v-for="theme in themesList"
          :key="theme.id"
          :themeValue="theme.value"
          :themeText="theme.text"
          :isActive = "theme.isActive"
        />
      </ul>
    </div>
    <span :class="$style.filterTheme" @click="toogleView" v-if="isAuth">МОЇ ДАНІ</span>
    <div :class="$style.userData" v-if="isAuth">
      <ul>
        <ThemeBtn
          v-for="userData in getUserData"
          :key="userData.id"
          :themeValue="userData.value"
          :themeText="userData.text"
        />
      </ul>
    </div>
  </div>
</template>

<script>

  import FilterBtn from "../molecules/Filter";
  import ThemeBtn from "../molecules/Theme";
  import {mapGetters} from "vuex";

  export default {
    computed: {
      ...mapGetters(["filterList", "themesList", "isAuth", "getUserData"]),
    },
    components: {
      FilterBtn,
      ThemeBtn,
    },
    methods: {
      toogleView() {
        let el = event.target.nextSibling;
        if (el.style.display === 'none') {
          el.style.display = 'flex';
        } else {
          el.style.display = 'none';
        }
      }
    }
  }

</script>

<style lang="scss" module>
  @import "./src/assets/vars";
  @import "./src/assets/mixins";
  .wrapper {
    width: 30%;
    height: auto;
    padding: 2rem 1rem;
    box-sizing: border-box;
    background-color: $white;
    .filter, .themes, .userData {
      @include flexColmCenter();
      padding: 1rem 0.5rem;
      transition: all 0.3s ease-in;
    }
    .filterVideo, .filterTheme {
      display: block;
      position: relative;
      min-width: 8rem;
      padding: 1rem 1rem 1rem 3rem;
      border-radius: 0.8rem 0.8rem 0 0;
      letter-spacing: 0.1rem;
      background-color: $sideBar_option_bg;
      cursor: pointer;
      @include headText();
    }
    .filterTheme {
      margin: 1rem 0 0 0;
    }
    .filterVideo:after, .filterTheme:after {
      content: url("../../assets/img/shevron.png");
      position: absolute;
      font-size: $fs-main;
      color: $black;
      right: 2rem;
      top: 0.75rem;
    }
    .filterVideo:before {
      content: url("../../assets/icons/video.svg");
      position: absolute;
      width: 1rem;
      height: 1rem;
      left: 1rem;
    }
    .filterTheme:before {
      content: url("../../assets/icons/theme.svg");
      position: absolute;
      width: 1rem;
      height: 1rem;
      left: 1rem;
    }
  }

  @media (max-width: 800px) {
    .wrapper {
      padding: 2rem 0;
      .filterVideo, .filterTheme {
        min-width: 3rem;
        margin: 0 0.5rem;
        padding: 1rem 0.2rem 1rem 1.5rem;
      }
      .filterVideo:after, .filterTheme:after {
        right: 1rem;
        top: 0.75rem;
      }
      .filterVideo:before, .filterTheme:before {
        left: 0.3rem;
      }

    }
  }

  @media (max-width: 500px) {
    .wrapper {
      display: none;
    }
  }

</style>