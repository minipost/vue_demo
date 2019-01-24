import "@babel/polyfill";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import i18n from "@/plugins/i18n.ts";

Vue.config.productionTip = false;

const vue = new Vue({
  i18n,
  router,
  render: (h) => h(App)
}).$mount("#app");

