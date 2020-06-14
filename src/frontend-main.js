import Vue from 'vue';
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

import App from './components/App.vue';

const vuetify = new Vuetify({});

const app = new Vue({
    vuetify,
    render: (h) => h(App),
});

app.$mount('#app');
