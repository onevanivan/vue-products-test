import Main from './pages/Main.vue';
import Home from './pages/Home.vue';
import Inbox from './pages/Inbox.vue';
import Favorite from './pages/Favorite.vue';

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
        },
        {
            path: '/inbox',
            component: Inbox,
            name: 'inbox'
        },
        {
            path: '/favorite',
            component: Favorite,
            name: 'favorite'
        }
    ]
};



