import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import ru from 'vuetify/src/locale/ru';

Vue.use(Vuetify);

export default
new Vuetify({
    theme: {
        options: {
            customProperties: true,
        },
        themes: {
            light: {
                primary: '#03a9f4',
                secondary: '#ff9800',
                accent: '#673ab7',
                error: '#f44336',
                warning: '#ff5722',
                info: '#9c27b0',
                success: '#4caf50',
            },
        },
    },
    lang: {
        locales: {ru},
        current: 'ru',
    },
    icons: {
        iconfont: 'mdi',
    },
});
