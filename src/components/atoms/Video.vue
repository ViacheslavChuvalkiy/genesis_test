<template>
  <video :src="`${videoLink}`" @click="clickHendler"></video>
</template>

<script>
  export default {
    props:{
      videoLink : String
    },
    methods:{
      clickHendler(e){
        if(!e.target.paused){
          e.target.pause();
        }
        else {
          e.target.play();
        }
      }
    }

  }
</script>

<style>
</style>