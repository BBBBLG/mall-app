<template>
  <div class="registered">
    <a-form-model
      ref="singUpForm"
      :model="singUpForm"
      :rules="rules"
      v-bind="layout"
    >
      <!-- 用户名 -->
      <a-form-model-item has-feedback label="用户名" prop="username">
        <a-input v-model="singUpForm.username" />
      </a-form-model-item>
      <!-- 邮箱 -->
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="singUpForm.email" />
      </a-form-model-item>
      <a-form-model-item>
        <!-- 验证码按钮 -->
        <a-button
          v-show="show"
          :class="{ disabled: disabled }"
          @click="getCode('singUpForm')"
          >点击获取验证码
        </a-button>
        <a-button v-show="!show" disabled>{{ count }}秒后重发</a-button>
      </a-form-model-item>

      <!-- 密码 -->
      <a-form-model-item has-feedback label="密码：" prop="password">
        <a-input
          v-model="singUpForm.password"
          type="password"
          autocomplete="off"
        />
      </a-form-model-item>
      <!-- 重复密码 -->
      <a-form-model-item has-feedback label="重复密码：" prop="checkpass">
        <a-input
          v-model="singUpForm.checkpass"
          type="password"
          autocomplete="off"
        />
      </a-form-model-item>
      <!-- 验证码 -->
      <a-form-model-item has-feedback label="验证码" prop="code">
        <a-input v-model="singUpForm.code" />
      </a-form-model-item>
      <!-- 注册按钮 -->
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button
          type="primary"
          class="submitBtn"
          @click="submitForm('singUpForm')"
        >
          提交注册
        </a-button>
      </a-form-model-item>
      <!-- 前往登录页按钮 -->
      <a-form-model-item>
        <router-link tag="a-button" to="login">前往登录</router-link>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import api from '@/api/user';

export default {
  data() {
    // 用户名验证
    const usernameReg = /^[a-zA-Z0-9_-]{4,16}$/;
    const checkusername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入用户名'));
      }
      if (usernameReg.test(value)) {
        return callback();
      }
      return callback(new Error('用户名格式为6-14位'));
    };

    // 邮箱验证
    const emailReg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        this.disabled = true;
        return callback(new Error('请输入邮箱'));
      }
      if (emailReg.test(value)) {
        this.disabled = false;
        return callback();
      }
      this.disabled = true;
      return callback(new Error('邮箱格式不正确'));
    };

    // 密码验证
    const pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入密码'));
      }
      // if (this.singUpForm.checkpass !== "") {
      //   this.$refs.singUpForm.validateField("checkpass");
      // }
      if (pwdReg.test(value)) {
        return callback();
      }
      return callback(new Error('密码至少包含数字和英文，长度6-20位'));
    };

    // 重复密码验证
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请重复输入密码'));
      } else if (value !== this.singUpForm.password) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    };

    // 检查是否输入验证码
    const checkCode = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('验证码不能为空'));
      }
      return callback();
    };

    return {
      count: '',
      show: true,
      timer: null,
      disabled: true,
      singUpForm: {
        password: '',
        checkpass: '',
        email: '',
        code: '',
        username: '',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'change' }],
        checkpass: [{ validator: validatePass2, trigger: 'change' }],
        email: [{ validator: checkEmail, trigger: 'change' }],
        code: [{ validator: checkCode, trigger: 'change' }],
        username: [{ validator: checkusername, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    // 提交按钮验证
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api
            .registered(this.singUpForm)
            .then(() => {
              this.$message.success('注册成功，请登录！');
            })
            .catch((error) => {
              this.$message.error(error);
            });
          return true;
        }
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 获取验证码倒计时
    getCode() {
      api.getCode(this.singUpForm).then(() => {
        this.$message.success('获取成功，请注意查看邮箱！');
      });
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count -= 1;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
  },
};
</script>

<style lang="less">
@import url("~@/assets/css/registered.less");
</style>
