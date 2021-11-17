import Vue from 'vue'
import VueRouter from 'vue-router'

import VideoPage from "../../components/organisms/VideoPage";
import UserPage from "../../components/organisms/UserPage";

Vue.use(VueRouter);
let router = new VueRouter(
  {
    routes: [
      {
        path: '/',
        name: "videoPage",
        component: VideoPage
      },
      {
        path: '/user',
        name: 'userPage',
        component: UserPage,
        props: true
      }
    ]
  });

export default router;