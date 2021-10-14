import { Router } from 'vue-router'
import { haveToken } from "../utils/cookie"
import NProgress from "nprogress";
import store from "../store";
const whiteList = ["/advertising", '/register', '/ownerRules', '/agreement'];

export function createRouterGuards(router: Router) {
  router.beforeEach((to, _from, next) => {
    document.title = "XShoppy--" + to?.meta?.title as string || document.title

    if (haveToken()) {
      if (to.path == "/advertising" || to.path == "/" || to.path == '/register') {
        next({
          path: "/index"
        });

        NProgress.done();
      } else {
        if (Object.keys(store.getters.userInfo).length <= 0) {
          store
            .dispatch("user/GetUserInfo")
            .then(res => {
              if (res) {
                next({
                  ...to
                });
              }
            })
            .catch(error => {
              store.dispatch("user/logoutAct").then(res => { });
            });
        } else {

          if (to.path === "/404") {
            next({ path: "/" });
            return;
          }
          next();
        }
      }
    } else {

      if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else {
        next({
          path: "/advertising"
        });
        NProgress.done(); // if current page is login will not trigger afterEach hook, so manually handle it
      }
    }
  })
}
