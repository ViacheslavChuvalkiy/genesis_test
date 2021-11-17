<template>
  <header>
    <router-link :to="{name: 'videoPage'}">
      <div :class="$style.logo">
        <img src="../../assets/img/logo.png" alt="logo img">
      </div>
    </router-link>
    <div :class="$style.menu">
      <ul @click="toogleShow">
        МОЙ АККАУНТ
      <transition name="list">
          <div :class="$style.listMenu" v-if="showListMenu">
            <MenuItem
              v-for="list in getUserMenu"
              :key="list.id"
              :listText="list.text"
              :value="list.value"
            />
          </div>
       </transition>
      </ul>
    </div>
    <div :class="$style.menuModile">
      <ul @click="toogleShow">
        МЕНЮ
        <transition name="list">
          <div :class="$style.listMenu" v-if="showListMenu">
            <MenuItem
              v-for="list in getUserMenu"
              :key="list.id"
              :listText="list.text"
              :value="list.value"
            />
          </div>
        </transition>
      </ul>
    </div>
  </header>
</template>
<script>

  import MenuItem from "../atoms/MenuItem";
  import {mapGetters,mapMutations} from "vuex";

  export default {
    components: {
      MenuItem,
    },
    computed: {
      ...mapGetters(["getUserMenu", "showListMenu"]),
    },
    methods: {
      ...mapMutations(["toggleListMenu"]),
      toogleShow(e){
        e.stopPropagation();
        this.toggleListMenu();
      }
    }

  }

</script>
<style lang="scss" module>
  @import "src/assets/style.scss";
  header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: $black;
    .logo {
      padding: 0.5rem 0 0.5rem 1.5rem;
      img{
        width: 5rem;
        height: 2rem;
      }
    }
    .menu, .menuModile{
      padding: 0.5rem 0 0.5rem 1.5rem;
      box-sizing: border-box;
      ul {
        width: 10rem;
        text-align: center;
        margin: 0 1rem 0 0;
        padding: 0 2rem;
        line-height: 2.2rem;
        letter-spacing: 1.5px;
        font-size: $fs-main;
        font-weight: 700;
        color: $white;
        border: 1px solid $white;
        border-radius: 15px;
        position: relative;
        cursor: pointer;
        &:hover{
          color: $links-btn;
          background-color: $white;
        }
        &:after{
          content: '\003E';
          position: absolute;
          right: 0.5rem;
          top: 0;
        }
      }

      .listMenu {
        width: 100%;
        position: absolute;
        top: 2.5rem;
        right: 0;
        color: $white;
        background-color: $black;
        z-index: 34;
      }
    }
    .menuModile{
      display: none;
      ul:after{
        display: none;
      }
    }
  }

  /* list transition*/
  .list-enter-from{
    opacity: 0;
  }
  .list-enter-to{
    opacity: 1;
  }
  .list-enter-active{
      transition: all 0.5s;
  }
  .list-leave-from{
    opacity: 1;
    transform: scale(1);
  }
  .list-leave-to{
    opacity: 0;
  }
  .list-leave-active{
    transition: all 0.5s;
  }


  @media (max-width: 450px) {
    header {
      .menu{
        display: none;
      }
      .menuModile{
        display: inherit;
        ul {
          padding: 0 1rem 0 2rem;
          &:before {
            content: '\2630';
            position: absolute;
            left: 0.5rem;
            top: 0;
          }
        }
      }
    }
  }

  @media (max-width: 370px) {
    header {
      display: block;
      min-width: 300px;
      .menuModile{
        ul{
          width: 5rem;
          margin: 0 auto;
          float: none;
          &:before {
            left: 2rem;
          }
        }
      }
    }
  }

</style>