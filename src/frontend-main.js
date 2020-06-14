import Vue from 'vue';

import Vuetify from 'vuetify/lib';
Vue.use(Vuetify);

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import { store } from './Store.js';

import App from './components/App.vue';
import FloorListPage from './pages/FloorListPage.vue';
import FloorPage from './pages/FloorPage.vue';
import StartPage from './pages/StartPage.vue';
import RoomPage from './pages/RoomPage.vue';
import RobotPage from './pages/RobotPage.vue';
import NewRoomPage from './pages/NewRoomPage.vue';
import NewRobotPage from './pages/NewRobotPage.vue';
import NewFloorPage from './pages/NewFloorPage.vue';
import TimeTable from "./pages/TimeTable.vue";

const vuetify = new Vuetify({
    icons: {
        iconfont: 'mdiSvg',
    }, 
});

const routes = [
    { path: '/',                    component: StartPage },
    
    { path: '/floors',              component: FloorListPage },
    { path: '/floors/new',          component: NewFloorPage },
    { path: '/floors/:floor_id',    component: FloorPage },
    
    { path: '/rooms/new',           component: NewRoomPage },
    { path: '/rooms/:room_id',      component: RoomPage },
    
    { path: '/robots/new',          component: NewRobotPage },
    { path: '/robots/:robot_id',    component: RobotPage },

    { path: '/timetable',           component: TimeTable },
];

const router = new VueRouter({
  routes
});

const app = new Vue({
    vuetify,
    router,
    store,
    render: (h) => h(App),
});

app.$mount('#app');
