<template>
  <label :class="$style.filterOption">
    <input
      type="radio"
      name="filter"
      :value="filterValue"
      :checked="filterChecked"
      @change="changeFilter"
    />
    <span>{{ filterText }}</span>
  </label>
</template>

<script>
  import {mapMutations} from "vuex";

  export default {
    props: {
      filterValue: String,
      filterText: String,
      filterChecked: Boolean,
    },
    methods: {
      ...mapMutations(["changeActiveFilter"]),
      changeFilter() {
        this.changeActiveFilter(this.filterValue);
      },
    },
  };
</script>

<style lang="scss" module>
  @import "./src/assets/vars";
  .filterOption {
    position: relative;
    padding: 0.5rem 2rem;
    & input {
      display: none;
    }
    & span {
      font-weight: 300;
      cursor: pointer;
      &:before {
        content: '';
        position: absolute;
        width: 0.7rem;
        height: 0.7rem;
        left: 0.4rem;
        color: transparent;
        border: 0.2rem solid $sideBar_option_bg;
      }
    }
    input:checked + span {
      color: $active;
      font-weight: 400;
      &:before {
        content: '';
        position: absolute;
        width: 0.9rem;
        height: 0.9rem;
        border: none;
        background-size: contain;
        background-repeat: no-repeat;
        background-image: url("../../assets/img/check.png");
      }
    }
  }

</style>