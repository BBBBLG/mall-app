<template>
  <div class="login">
    <a-form-model
      ref="loginForm"
      :model="loginForm"
      :rules="rules"
      v-bind="layout"
    >
      <!-- 邮箱 -->
      <a-form-model-item has-feedback label="邮箱：" prop="email">
        <a-input v-model="loginForm.email" placeholder="邮箱" />
      </a-form-model-item>
      <!-- 密码 -->
      <a-form-model-item has-feedback label="密码：" prop="password">
        <a-input
          v-model="loginForm.password"
          type="password"
          autocomplete="off"
          placeholder="密码"
        />
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <!-- 登录按钮 -->
        <a-button type="primary" @click="submitForm('loginForm')">
          登录
        </a-button>
        <!-- 注册按钮 -->
        <router-link tag="a-button" to="registered">注册</router-link>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import api from '@/api/user';

export default {
  data() {
    const emailReg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入邮箱'));
      }
      if (emailReg.test(value)) {
        return callback();
      }
      return callback(new Error('邮箱格式不正确'));
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        password: '',
        email: '',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'change' }],
        email: [{ validator: checkEmail, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api
            .login(this.loginForm)
            .then((res) => {
              this.$store.dispatch('setUserInfo', res);
              this.$message.success('登陆成功，即将跳转首页！');
              // 三秒后自动跳转
              setTimeout(() => {
                this.$router.push({
                  name: 'Home',
                });
              }, 1500);
            })
            .catch((error) => {
              this.$message.error(error);
            });
          return true;
        }
        return false;
      });
    },
  },
};
</script>

<style lang="less">
@import url("~@/assets/css/login.less");
</style>
