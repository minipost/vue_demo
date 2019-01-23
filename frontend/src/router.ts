import Vue from "vue";
import Router, { RouterOptions } from "vue-router";
import Home from "./views/Home.vue";
import i18n from "@/plugins/i18n";
// import NavBar from "./components/NavBar.vue";
import MainView from "./views/MainView.vue"
import NotFound from "./components/NotFount.vue";

const router = new Router({
  mode: "history",
  base: (process.env.BASE_URL + "/") as string,
  routes: [
    {
      path: "/:lang([a-z]+)",
      name: "lang",
      component: MainView,
      beforeEnter: (to, from, next) => {
        const lang = to.params.lang;
        if (["da", "en"].includes(lang)) {
          if (i18n.locale !== lang) {
            i18n.locale = lang;
            next();
          } else {
            next();
          }
        } else {
          alert("Language " + to.params.lang + " not supported");
          next(false);
        }
      },
      children: [
        {
          name: "Home",
          path: "home",
          component: Home
        },
        {
          path: "About",
          component: () => import("./views/About.vue")
        }
      ]
    },
    { path: "", redirect: "/en/home" },
    { path: "/", redirect: "/en/home" },
    { path: "/404", component: NotFound },
    {
      path: "*",
      redirect: "/404"
    }
  ]
});
Vue.use(Router);

export default router;
