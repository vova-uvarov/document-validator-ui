import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import moment, {max} from 'moment';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL;

axios.interceptors.request.use((config: any) => {
    const params = config.params;
    if (params && config.method === 'get') {
        Object.keys(params)
            .forEach((key) => {
                if (Array.isArray(params[key])) {
                    if (key=='fieldNames') {
                        params[key] = encodeURI(params[key].join(','));
                    }else {
                        params[key] = params[key].join(',');
                    }
                }
            });
    }
    return config;
}, (error: any) => (Promise.reject(error)));

Vue.config.productionTip = false;

Vue.filter('number', (value: any) => {
    if (!value) {
        return 0;
    }
    return value;
});

Vue.filter('dateFormatter', (value: any) => {
    if (!value) {
        return '';
    }
    return moment(value).format('YYYY-MM-DD');
});

Vue.filter('truncateString', (value: any, maxLenght: number) => {
    if (!value){
        return value;
    }

    if (!maxLenght){
        maxLenght = 30;
    }
    if (value.length > maxLenght) {
        return value.substring(0, maxLenght) + '...';
    } else {
        return value;
    }
});

Vue.filter('moneyFormat', (value: any) => {
    const val = (value / 1).toFixed(2).replace('.', ',');
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
});

new Vue({
    router,
    store,
    vuetify,
    render: (h: any) => h(App)
}).$mount('#app');
