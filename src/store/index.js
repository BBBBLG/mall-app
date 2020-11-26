import Vue from 'vue';
import Vuex from 'vuex';
import { setCookie, getUserCookie, removeUserCookie } from '@/utils/userCookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 用于改变菜单的闭合状态  false代表不闭合 true代表闭合
    collapsed: false,
    // 存储用户信息
    user: getUserCookie(),
    // 存储菜单的路由
    menuRoutes: [],
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    setUserInfo(state, userInfo) {
      state.user = userInfo;
    },
    logOut(state) {
      state.user = {
        username: '',
        appkey: '',
        email: '',
        role: '',
      };
    },
    changeMenuRoutes(state, routes) {
      state.menuRoutes = routes;
    },
  },
  actions: {
    // 首页侧边栏更改状态
    changeCollapsed({ commit }) {
      commit('changeCollapsed');
    },
    // user相关处理
    setUserInfo({ commit }, userInfo) {
      commit('setUserInfo', userInfo);
      setCookie(userInfo);
    },
    logOut({ commit }) {
      commit('logOut');
      removeUserCookie();
    },
    changeMenuRoutes({ commit }, routes) {
      commit('changeMenuRoutes', routes);
    },
  },
  modules: {
  },
});
