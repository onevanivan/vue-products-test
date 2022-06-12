import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store'

Vue.use(VueRouter);

const router = new VueRouter(routes);

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.auth)) {
        if (store.getters.isAuthenticated) {
            next('/home');
        }
        next();
    }

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!store.getters.isAuthenticated) {
            next('/');
        }
        next();
    }

    next();
});

export default router;