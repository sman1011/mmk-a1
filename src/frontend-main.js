import Vue from 'vue';

import App from './components/App.vue';

export default function () {
    const app = new Vue({
        render: (h) => h(App),
    });

    app.$mount('#app');
};