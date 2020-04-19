import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            component: () => import("@/views/Home"),
        }, {
            path: "/search",
            name: "search",
            component: () => import("@/views/Search")
        }, {
            path: "/programme/:id",
            component: () => import("@/views/Programme")
        }, {
            path: "/serie/:id",
            component: () => import("@/views/Serie")
        }, {
            path: "/watch/:id",
            name: "watch",
            component: () => import("@/views/Watch")
        }
    ]
});