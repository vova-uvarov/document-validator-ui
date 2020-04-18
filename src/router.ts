import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'main',
            redirect: { name: 'documents' },
        },
        {
            path: '/documents',
            name: 'documents',
            component: () => import('./views/Documents.vue'),
        },

        {
            path: '/fieldRules',
            name: 'fieldRules',
            component: () => import('./views/FieldRule.vue'),
        },

    ],
});

export default router;
