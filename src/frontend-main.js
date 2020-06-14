import Vue from 'vue';

import Vuetify from 'vuetify/lib';
Vue.use(Vuetify)

import VueRouter from 'vue-router';
Vue.use(VueRouter)

import { store } from './Store.js';

import App from './components/App.vue';
import FloorListPage from './pages/FloorListPage.vue';
import FloorPage from './pages/FloorPage.vue';
import StartPage from './pages/StartPage.vue';

const vuetify = new Vuetify({});

const routes = [
    { path: '/',                    component: StartPage },
    { path: '/floors',              component: FloorListPage },
    { path: '/floors/:floor_id',    component: FloorPage },
]

const router = new VueRouter({
  routes
})

const app = new Vue({
    vuetify,
    router,
    store,
    render: (h) => h(App),
});

app.$mount('#app');
