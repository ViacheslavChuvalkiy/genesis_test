import Vue from "vue";
import Vuex from "vuex";
import {v4 as uuidv4} from "uuid";
import axios from 'axios'

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    videoList: [],
    filters: [
      {
        text: "Мої відео",
        value: "access",
        isChecked: false,
        access: false,
        id: uuidv4(),
      },
      {
        text: "Усі відео",
        value: "all",
        isChecked: false,
        access: false,
        id: uuidv4(),
      },
      {
        text: "Дивіться скоро",
        value: "soon",
        isChecked: false,
        access: false,
        id: uuidv4(),
      },
      {
        text: "Новинки",
        value: "new",
        isChecked: false,
        access: false,
        id: uuidv4(),
      },
      {
        text: "Останні переглянуті",
        value: "lastView",
        isChecked: false,
        access: false,
        id: uuidv4(),
      },
      {
        text: "Безкоштовно",
        value: "free",
        isChecked: false,
        access: false,
        id: uuidv4(),
      },
      {
        text: "Усі відео",
        value: "all",
        isChecked: false,
        access: true,
        id: uuidv4(),
      },
      {
        text: "Акція",
        value: "sale",
        isChecked: false,
        access: true,
        id: uuidv4(),
      },
      {
        text: "Популярні",
        value: "popular",
        isChecked: true,
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
    themes: [
      {
        text: "Всі теми",
        value: "all",
        isActive: true,
        id: uuidv4(),
      },
      {
        text: "Акцизний податок",
        value: "excise_tax",
        isActive: false,
        id: uuidv4(),
      },
      {
        text: "Валюта",
        value: "currency",
        isActive: false,
        id: uuidv4(),
      },
      {
        text: "Виробництво і собівартість",
        value: "production",
        isActive: false,
        id: uuidv4(),
      },
      {
        text: "Відпуски",
        value: "vacation",
        isActive: false,
        id: uuidv4(),
      },
      {
        text: "Відрядження",
        value: "business_trips",
        isActive: false,
        id: uuidv4(),
      },
    ],
    userMenu: [
      {
        text: "Увійти",
        value: "myVideo",
        access: true,
        id: uuidv4(),
      },
      {
        text: "Зареєструватись",
        value: "myVideo",
        access: true,
        id: uuidv4(),
      },
      {
        text: "Мої відео",
        value: "myVideo",
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
    activeTheme: "all",
    searchFilter: "",
    pageView: 'grid',
    auth: false,
    showUserData: false,
    showListMenu: false,
    currentPage: 1,
    videoPerPageGrid: 6,
    videoPerPageList: 10,
  },
  getters: {
    videoList({videoList, activeFilter, activeTheme, searchFilter, currentPage, pageView, videoPerPageGrid, videoPerPageList}) {
      if (!videoList.length){
        return videoList;
      }
      let list = videoList.map(item => ({ ...item }));

      if (activeFilter === "popular") {
        list = list.filter((item) => item.options.popular);
      } else if (activeFilter === "sale") {
        list = list.filter((item) => item.options.sale);
      } else if (activeFilter === "new") {
        list = list.filter((item) => new Date(item.date).getMonth() === 6);
      } else if (activeFilter === "access") {
        list = list.filter((item) => !item.access);
      } else if (activeFilter === "soon") {
        list = list.filter((item) => new Date(item.date) > new Date());
      } else if (activeFilter === "lastView") {
        list = list.filter((item) => new Date(item.date).getMonth() === 6);
      } else if (activeFilter === "free") {
        list = list.filter((item) => !item.sale);
      }

      if (activeTheme !== 'all') {
        list = list.filter((item) => item.theme === activeTheme);
      }
      if (searchFilter !== '') {
        list = list.filter((item) => item.title.toLowerCase().search(searchFilter.toLowerCase()) >= 0);
      }

      if (pageView === 'grid') {
        return list.slice(currentPage === 1 ? 0 : currentPage * videoPerPageGrid - videoPerPageGrid, currentPage * videoPerPageGrid);
      } else {
        return list.slice(currentPage === 1 ? 0 : currentPage * videoPerPageList - videoPerPageList, currentPage * videoPerPageList);
      }

    },
    countTask({tasksList}) {
      return tasksList.length;
    },
    countCompletedTask({tasksList}) {
      return tasksList.filter((task) => task.isChecked).length;
    },
    filterList({filters, auth}) {
      if (auth) {
        return filters.filter(item => !item.access);
      } else {
        return filters.filter(item => item.access);
      }
    },
    themesList({themes}) {
      return themes;
    },
    getActiveFilter({activeFilter}) {
      return activeFilter;
    },
    getThemeCount: (state) => (themeName = 'all') => {
      if (themeName === 'all') {
        return state.videoList.length;
      }
      return state.videoList.filter(video => video.theme === themeName).length
    },
    getActiveTheme({themes, activeTheme}) {
      let activeThemeArr = themes.filter(theme => theme.value === activeTheme);
      return activeThemeArr.length ? activeThemeArr[0].text : "Всі теми";
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
    getPageView({pageView}) {
      return pageView;
    },
    getCurrentPage({currentPage}) {
      return currentPage
    },
    isAuth({auth}) {
      return auth
    },
    showListMenu({showListMenu}) {
      return showListMenu
    },
    getPageCount({ pageView, videoPerPageGrid, videoPerPageList},getters) {
      let listCount = getters.getFilteredList.length;
      return Math.trunc(pageView === 'grid' ? listCount / videoPerPageGrid : listCount / videoPerPageList);
    },

    getFilteredList({videoList,activeFilter, searchFilter, activeTheme}){

      let list = videoList.map(item => ({ ...item }));

      if (activeFilter === "popular") {
        list = list.filter((item) => item.options.popular);
      } else if (activeFilter === "sale") {
        list = list.filter((item) => item.options.sale);
      } else if (activeFilter === "new") {
        list = list.filter((item) => new Date(item.date).getMonth() === 6);
      } else if (activeFilter === "access") {
        list = list.filter((item) => !item.access);
      } else if (activeFilter === "soon") {
        list = list.filter((item) => new Date(item.date) > new Date());
      } else if (activeFilter === "lastView") {
        list = list.filter((item) => new Date(item.date).getMonth() === 6);
      } else if (activeFilter === "free") {
        list = list.filter((item) => !item.sale);
      }

      if (activeTheme !== 'all') {
        list = list.filter((item) => item.theme === activeTheme);
      }
      if (searchFilter !== '') {
        list = list.filter((item) => item.title.toLowerCase().search(searchFilter.toLowerCase()) >= 0);
      }
      return list;
    },
    paginationList({pageView, videoPerPageGrid, videoPerPageList, currentPage}, getters) {

      let listCount = getters.getFilteredList.length;
      let pages = Math.trunc(pageView === 'grid' ? listCount/ videoPerPageGrid : listCount / videoPerPageList);
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
    changeActiveFilter(state, value) {
      state.activeFilter = value;
      state.filters = state.filters.map((filter) =>
        filter.value === value
          ? {...filter, isChecked: true}
          : {...filter, isChecked: false}
      );
    },
    changeActiveTheme(state, value) {
      state.activeTheme = value;
      state.themes = state.themes.map((theme) =>
        theme.value === value
          ? {...theme, isActive: true}
          : {...theme, isActive: false}
      );

    },
    changesPageView(state, value) {
      state.pageView = value;
    },
    saveDataLocalStorage({pageView}) {
      localStorage.setItem("pageView", JSON.stringify(pageView));
    },
    getPageViewFromLocalStorage(state) {
      if (localStorage.pageView) {
        try {
          state.pageView = JSON.parse(localStorage.getItem("pageView"));
        } catch (e) {
          localStorage.removeItem("pageView");
        }
      }
    },
    setVideoList(state, videoList) {
      state.videoList = videoList;
    },
    changeSearchInput(state, value){
      state.searchFilter = value;
    },
    toggleListMenu(state){
      state.showListMenu = !state.showListMenu;
    },
  },
  actions: {
    async getVideoList({commit}) {
      try {
        let response = await axios.get("https://storage.7eminar.ua/content/test_task_front/data.json");
        commit("setVideoList", response.data);
      } catch (e) {
        console.log(e.message);
      }
    }
  }
});