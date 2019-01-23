import Vue from "vue";
import Router, { RouterOptions } from "vue-router";
import Settings from "./views/Settings.vue";
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
          name: "Settings",
          path: "settings",
          component: Settings,
          children: [
            {
              name: "time",
              path: "time",
              component: () => import("./components/Settings.time.vue")
            },
            {
              name: "login",
              path: "login",
              component: () => import("./components/Settings.login.vue")
            },
          ]
        },
        {
          path: "About",
          component: () => import("./views/About.vue")
        },
        {
          path: "dev",// hidden menues for development
          component: () => import("./components/ApiTest.vue")
        },
        // {
        //   path: "subnav",// for test
        //   component: () => import("./components/SubNavBarHome.vue")
        // }
      ]
    },
    { path: "", redirect: "/en/" },
    { path: "/", redirect: "/en/" },
    { path: "/404", component: NotFound },
    {
      path: "*",
      // redirect: "/404",
      beforeEnter: (to, from, next) => {
      console.error('to',to,'from',from);
      next()
    }}
  ]
});
Vue.use(Router);

export default router;
