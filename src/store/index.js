import Vue from "vue";
import Vuex from "vuex";
import {v4 as uuidv4} from "uuid";
import axios from 'axios'
import {optionsFeed,userInfo, userFeeds} from "../services/connection/options";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    videoList: [],
    userInfo: [],
    userFeeds: [],
    filters: [
      {
        text: "Мои видео",
        value: "myVideo",
        isChecked: false,
        access: false,
        id: uuidv4(),
      },
      {
        text: "Все видео",
        value: "all",
        isChecked: true,
        access: true,
        id: uuidv4(),
      },
      {
        text: "Популярные",
        value: "popular",
        isChecked: false,
        access: true,
        id: uuidv4(),
      },
      {
        text: "Новинки",
        value: "new",
        isChecked: false,
        access: true,
        id: uuidv4(),
      },
    ],
    userMenu: [
      {
        text: "Войти",
        value: "singIn",
        access: true,
        id: uuidv4(),
      },
      {
        text: "Зарегистрироваться",
        value: "registration",
        access: true,
        id: uuidv4(),
      },
      {
        text: "Мої відео",
        value: "myVideoLink",
        access: false,
        id: uuidv4(),
      },
      {
        text: "Персональні дані",
        value: "myData",
        access: false,
        id: uuidv4(),
      },
      {
        text: "Вихід",
        value: "exit",
        access: false,
        id: uuidv4(),
      },
    ],
    userData: [
      {
        text: "Имя",
        value: "name",
        id: uuidv4(),
      },
      {
        text: "Почта",
        value: "email",
        id: uuidv4(),
      },
      {
        text: "Пароль",
        value: "password",
        id: uuidv4(),
      },
      {
        text: "Удалить пользователя",
        value: "deleteUser",
        id: uuidv4(),
      },
    ],
    activeFilter: "all",
    auth: false,
    userId : '',
    showUserData: false,
    showListMenu: false,
    currentPage: 1,
    videoPerPage: 6,
    isLoader: false,
    isError: false,
  },
  getters: {
    videoList({videoList, currentPage, videoPerPage}, getters) {
      if (!videoList.length){
        return videoList;
      }
      let list = getters.getFilteredList;

      return list.slice(currentPage === 1 ? 0 : currentPage * videoPerPage - videoPerPage, currentPage * videoPerPage);

    },
    filterList({filters, auth}) {
      if (auth) {
        return filters;
      } else {
        return filters.filter(item => item.access);
      }
    },
    getActiveFilter({activeFilter}) {
      return activeFilter;
    },
    getUserMenu({userMenu, auth}) {
      if (auth) {
        return userMenu.filter(item => !item.access);
      } else {
        return userMenu.filter(item => item.access);
      }
    },
    getUserData({userData}) {
      return userData;
    },
    getFeeds({userFeeds}) {
      return userFeeds;
    },
    getInfo({userInfo}) {
      return userInfo;
    },
    getLoaderStatus({isLoader}) {
      return isLoader;
    },
    getErrorStatus({isError}) {
      return isError;
    },
    getCurrentPage({currentPage}) {
      return currentPage
    },
    isAuth({auth}) {
      return auth
    },
    getPageCount({ videoPerPage},getters) {
      let listCount = getters.getFilteredList.length;
      return Math.trunc(listCount / videoPerPage);
    },
    showListMenu({showListMenu}) {
      return showListMenu
    },
    getFilteredList({videoList,activeFilter,userId}){

      let list = videoList.map(item => ({ ...item }));

      if (activeFilter === "popular") {
        list = list.filter((item) => item.commentCount >= 10000);
      } else if (activeFilter === "new") {
        list = list.filter((item) => new Date(item.date).getMonth() === new Date().getMonth());
      } else if (activeFilter === "myVideo") {
        list = list.filter((item) => item.secretID === userId);
      }

      return list;
    },
    paginationList({videoPerPage, currentPage}, getters) {

      let listCount = getters.getFilteredList.length;
      let pages = Math.trunc(listCount/ videoPerPage);
      let count = 1;
      let maxLinkPages = 5;
      let paginationList = [];
      while (count <= pages) {
        paginationList.push(
          {
            text: String(count),
            id: count,
            isCurrent: currentPage === count,
            access: true,
          }
        );
        count++
      }
      if (pages > maxLinkPages) {
        let newPaginationList = paginationList.slice(0, maxLinkPages);
        newPaginationList.push({
          text: '...',
          id: 9999999999999999999999999999999999999999,
          isCurrent: false,
          access: false,
        });
        newPaginationList.push(paginationList[paginationList.length - 1]);
        return newPaginationList;
      }
      return paginationList;
    },
  },
  mutations: {
    changeCurrentPage(state, pageNumber) {
      state.currentPage = state.currentPage + (pageNumber);
    },
    chooseCurrentPage(state, number) {
      state.currentPage = number;
    },
    changeAuth(state, status) {
      state.auth = status;
    },
    changeLoader(state, status) {
      state.isLoader = status;
    },
    changeError(state, status) {
      state.isError = status;
    },
    changeActiveFilter(state, value) {
      state.activeFilter = value;
      state.filters = state.filters.map((filter) =>
        filter.value === value
          ? {...filter, isChecked: true}
          : {...filter, isChecked: false}
      );
    },
    setVideoList(state, videoList) {
      state.videoList = videoList;
    },
    setUserInfo(state, userInfo) {
      state.userInfo= userInfo;
    },
    setUserFeeds(state, userFeeds) {
      state.userFeeds = userFeeds;
    },
    toggleListMenu(state){
      state.showListMenu = !state.showListMenu;
    },
  },
  actions: {
    async getVideoList({commit}) {
      commit('changeLoader',true);
        axios.request(optionsFeed).then(function (response) {
          commit("setVideoList", response.data);
          commit('changeLoader',false);
        }).catch(function (error) {
          console.error(error.message);
          commit("changeError", true);
          commit('changeLoader',false);
        })
    },
    async getUserInfo({commit},name) {
      commit('changeLoader',true);
      userInfo.url = userInfo.url + name;
      axios.request(userInfo).then(function (response) {
        commit("setUserInfo", response.data);
        commit('changeLoader',false);
      }).catch(function (error) {
        console.error(error.message);
        commit("changeError", true);
        commit('changeLoader',false);
      })
    },
    async getUserFeeds({commit},name) {
      commit('changeLoader',true);
      userFeeds.url = userFeeds.url + name;
      axios.request(userFeeds).then(function (response) {
        commit("setUserFeeds", response.data);
        commit('changeLoader',false);
      }).catch(function (error) {
        console.error(error.message);
        commit("changeError", true);
        commit('changeLoader',false);
      })
    }
  }
});