<template>
  <footer>
    <ul :class="$style.menu">
      <li>2021</li>
      <li>©Chuvalskyi Viacheslav</li>
    </ul>
  </footer>
</template>

<script>
</script>

<style lang="scss" module>
  @import "src/assets/style.scss";
  footer {
    width: 100%;
    @include container;
    .menu {
      list-style: none;
      padding: 1.5rem 0;
      @include flexStyle();
    }
  }
</style>