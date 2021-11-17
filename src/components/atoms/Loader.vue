<template>
  <img :src="require('../../assets/img/loading.gif')" :class="$style.loader"/>
</template>
<script>
</script>
<style lang="scss" module>
  .loader {
    width: 15rem;
    height: 15rem;
    margin: 0 auto;
    padding: 5rem 0;
    text-align: center;
  }
</style>