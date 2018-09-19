import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login.vue'
import Index from '../pages/Index.vue'
import Topics from '../pages/index/Topics.vue'

Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index,
            redirect: '/topics/online',
            children: [
                {
                    path: '/topics/:type',
                    name: 'Topics', component: Topics,
                    meta: {
                        requireAuth: true,
                    },
                },
            ],
            meta: {
                requireAuth: true,
            },
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        let token = localStorage.getItem("token");
        if (token) {
            next();
        }
        else {
            next({
                path: '/login',
            })
        }
    }
    else {
        next();
    }
});

export default router;
