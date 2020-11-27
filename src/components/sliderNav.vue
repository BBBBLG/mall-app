<template>
  <div class="main-header">
    <a-button
      type="primary"
      style="margin-bottom: 16px"
      @click="toggleCollapsed"
    >
      <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <div class="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>{{
          currentRoute[0] ? currentRoute[0].meta.title : ""
        }}</a-breadcrumb-item>
        <a-breadcrumb-item>
          <router-link :to="{ name: currentRoute[1].name }">{{
            currentRoute[1] ? currentRoute[1].meta.title : ""
          }}</router-link>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <ul class="user-info">
      <li class="user-name">
        欢迎，
        {{ $store.state.user.username }}
        <a-icon type="down" />
      </li>
      <li class="login-out" @click="logOut">退出登录</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentRoute: [{
        name: 'Home',
        meta: {
          title: '首页',
        },
      }, {
        name: 'Statistics',
        meta: {
          title: '统计',
        },
      }],
    };
  },
  watch: {
    $route() {
      this.currentRoute = this.$router.currentRoute.matched;
    },
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('changeCollapsed');
    },
    logOut() {
      this.$store.dispatch('logOut');
      this.$router.push('/login');
    },
  },
};
</script>
