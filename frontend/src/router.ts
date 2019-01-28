import Vue from "vue";
import Router, { RouterOptions } from "vue-router";
import Settings from "./components/pages/Settings.vue";
import i18n from "@/plugins/i18n";
import MainView from "./components/pages/MainView.vue";
import NotFound from "./components/pages/NotFount.vue";

const router = new Router({
  mode: "history",
  base: (process.env.BASE_URL + "/") as string,
  routes: [
    {
      path: "/:lang([a-z]+)",
      name: "Lang",
      component: MainView,
      beforeEnter: (to, from, next) => {
        // console.log('to: "', to.path, '" from: "', from.path, '"');
        const lang = to.params.lang;
        if (["da", "en"].includes(lang)) {
          if (i18n.locale !== lang) {
            i18n.locale = lang;
          }
          next();
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
              component: () => import("./components/pages/Settings.time.vue")
            },
            {
              name: "login",
              path: "login",
              component: () => import("./components/pages/Settings.login.vue")
            }
          ]
        },
        {
          name: "About",
          path: "about",
          component: () => import("./components/pages/About.vue")
        },
        {
          path: "template", // hidden menues for development
          component: () => import("./components/Template.vue")
        },
        {
          path: "http", // hidden menues for development
          component: () => import("./components/HttpRequestForm.vue")
        }

      ]
    },
    { path: "", redirect: "/en/" },
    { path: "/", redirect: "/en/" },
    { path: "/404", component: NotFound },
    {
      path: "*",
      redirect: "/404",
      beforeEnter: (to, from, next) => {
        console.error("to", to, "from", from);
        next();
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  // console.log(from.path, "=>", to.path);
  next();
});
Vue.use(Router);

export default router;
