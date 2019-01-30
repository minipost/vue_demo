import Vue from "vue";
import Router, { RouterOptions } from "vue-router";
import Demo from "@/components/pages/demo/index.vue";
import i18n from "@/plugins/i18n";
import pages from "@/components/pages/index.vue";
import NotFound from "@/components/pages/not-found/index.vue";

const router = new Router({
  mode: "history",
  base: (process.env.BASE_URL + "/") as string,
  routes: [
    {
      path: "/:lang([a-z]+)",
      name: "Lang",
      component: pages,
      beforeEnter: (to, from, next) => {
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
          name: "Demo",
          path: "demo",
          component: Demo,
          children: [
            {
              name: "time",
              path: "time",
              component: () => import("./components/pages/demo/time.vue")
            },
            {
              name: "graph-demo",
              path: "graph-demo",
              component: () => import("./components/pages/demo/graphDemo.vue")
            },
            {
              name: "http",
              path: "http",
              component: () => import("./components/pages/demo/http.vue")
            }
          ]
        },
        {
          name: "Settings",
          path: "settings",
          component: () => import("./components/pages/settings/index.vue")
        },
        {
          path: "template", // hidden menues for development
          component: () => import("./components/Template.vue")
        },
        {
          path: "graph",
          component: () => import("./components/graph.vue")
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
