import Main from './pages/Main.vue';
import Home from './pages/Home.vue';

export default {
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Main,
            name: 'main'
        },
        {
            path: '/home',
            component: Home,
            name: 'home'
        }
    ]
};



