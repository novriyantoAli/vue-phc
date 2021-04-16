import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Profile from "../components/Profile.vue";
import Todos from "@/components/Todos";
import store from "../store.js";
 
Vue.use(Router);
 
let router =  new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/home",
            name: "Home",
            component: Home,
            meta: {
                auth: true
            }
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/About.vue'),
            meta: {
                auth: true
            }
        },
        {
            path: "/",
            name: "Login",
            component: Login,
            meta: {
                guest: true
            }
        },
        {
            path: "/register",
            name: "Register",
            component: Register,
            meta: {
                guest: true
            }
        },
        {
            path: "/profile",
            name: "Profile",
            component: Profile,
            meta: {
                auth: true
            }
        },
        {
            path: '/todo',
            name: 'Todos',
            component: Todos,
            meta: {
                auth: true
            }
        }
    ]
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.auth)) {    
        if (store.state.isLogin) {
            next();
        } else {
            next({
                path: "/",
            });
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (store.state.isLogin) {
            next({
                path: "/profile",
            });
        } else {
            next();
        }
    } else {
        next();
    }
});
export default router;