<template>
  <header>
    <div :class="$style.logo">
      <img src="../../assets/img/logo.png" alt="logo img">
    </div>
    <div :class="$style.info">
      <a href="mailto:info@kadroland.com">info@kadroland.com</a>
      <a href="tel:+380442245525">(044) 224-55-25</a>
    </div>
    <div :class="$style.menu">
      <ul @click="toogleShow">
        МІЙ КАБІНЕТ
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
  @import "./src/assets/vars";
  header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: $black;
    z-index: 999;
    .logo {
      padding: 1rem 0 0.3rem 1.5rem;
      flex: 1 1 auto;
    }
    .info {
      padding: 1rem 0 0.5rem 1.5rem;
      margin: 0 1rem 0 0 ;
      flex: 1 1 auto;
      text-align: right;
      a {
        line-height: 2;
        vertical-align: sub;
        padding: 0 1rem;
        text-decoration: none;
        color: $links-btn;
      }
    }
    .menu, .menuModile{
      padding: 1rem 0 0.5rem 1.5rem;
      flex: 1 0 0.5rem;
      box-sizing: border-box;
      ul {
        width: 75%;
        text-align: center;
        margin: 0 1rem 0 0;
        padding: 0 2rem;
        float: right;
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

  @media (max-width: 790px) {
    header {
      .logo{
        flex: none;
        padding: 1rem 0 0.5rem 1.5rem;
      }
      .info {
        display: none;
      }
      .menu{
        ul {
          width: 40%;
          &:after {
            right: 1rem;
          }
        }
      }
    }
  }

  @media (max-width: 650px) {
    header {
      .menu{
        padding: 1rem 0 0.5rem 0;
        ul {
          width: 50%;
          &:after {
            display: none;
          }
        }
      }
    }
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
        .logo{
          text-align: center;
        }
      .menuModile{
        ul{
          max-width: 40%;
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