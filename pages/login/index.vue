<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/register"
              >Need an account?</nuxt-link
            >
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(msg, field) in errors">
              <li v-for="(m, index) in msg" :key="index">
                {{ field }} {{ m }}
              </li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="user.username"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                v-model="user.email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
                required
                minlength="8"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/user";
//只在客户端加载cookie
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name: "LoginIndex",
  middleware: ['notAuthenticated'],
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      errors: {}, //错误日志
    };
  },
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
  },
  methods: {
    async onSubmit() {
      const p = this.isLogin
        ? login({
            user: this.user,
          })
        : register({
            user: this.user,
          });

      p.then(({ data }) => {
        //保存用户登陆状态
        this.$store.commit("setUser", data.user);

        //刷新页面数据丢失--数据持久化
        Cookie.set('user', data.user)
        this.$router.push("/");
      }).catch((err) => {
        this.errors = err.response.data.errors;
      });

      // try {
      //   // 提交表单 请求登录
      //   const { data } = await login({
      //     user: this.user,
      //   });
      //   // console.log(data)
      //   this.$router.push("/");
      // } catch (err) {
      //   this.errors = err.response.data.errors;
      // }
    },
  },
};
</script>

<style>
</style>