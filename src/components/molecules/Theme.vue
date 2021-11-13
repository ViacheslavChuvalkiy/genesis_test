<template>
  <li :class="[isActive ? $style.themeOptionActive : $style.themeOption]"
      :value="themeValue"
      @click="clickLink">
    {{themeInfo}}
  </li>

</template>

<script>
  import {mapMutations, mapGetters} from "vuex";

  export default {
    props: {
      themeValue: String,
      themeText: String,
      isActive : Boolean
    },
    computed: {
      ...mapGetters(["getThemeCount", "getPageCount"]),
      themeInfo() {
        if (this.themeValue === 'name' || this.themeValue === 'email' || this.themeValue === 'password' || this.themeValue === 'deleteUser') {
          return this.themeText;
        }
        let c = this.getThemeCount(this.themeValue);
        return this.themeText + "(" + c + ")";
      }
    },
    methods: {
      ...mapMutations(["changeActiveTheme","chooseCurrentPage"]),
      clickLink() {
        this.changeActiveTheme(this.themeValue);
        if(this.getPageCount <= 1){
          this.chooseCurrentPage(1);
        }
      },
    },
  };
</script>

<style lang="scss" module>

  .themeOption, .themeOptionActive {
    padding: 0.5rem;
    font-weight: 300;
    line-height: 1.2rem;
    cursor: pointer;
  }
  .themeOption {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

</style>