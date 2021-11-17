<template>
  <p :class="$style.error">Ошибка получения данных с сервера.</p>
</template>

<script>
</script>

<style lang="scss" module>
  .error{
    text-align: center;
    position: relative;
    &:after{
      content: '\1F635';
      position: absolute;
      top: -0.2rem;
    }
  }
</style>