import Vue from 'vue';
import Vuex from 'vuex';
import DocumentService from '@/services/DocumentService';
import FieldRuleService from "@/services/FieldRuleService";

Vue.use(Vuex);

export default new Vuex.Store({

    strict: true,
    state: {
        documents: [],
        fieldRules: [],
        fieldRuleView: {
            fieldRules: [],
            totalPages: 0,
            currentPage: 1,
            filter: {
                documentTypes: [],
                schemaTypes: [],
                ruleSides: [],
                name: '',
                format: '',
                fieldName: '',
                groupName: '',
                description: '',
                filedRuleSearchMode: 'LIKE',
                validationMode: null,
                enabled: null,
                size: 10,
                page: 1,
            }
        },
    },
    getters: {},
    mutations: {
        initState: (state) => {
        },

        updateDocuments: (state, newValue) => {
            state.documents = newValue;
        },

        updateFieldRules: (state, newValue) => {
            state.fieldRuleView.fieldRules = newValue.content;
            state.fieldRuleView.totalPages = newValue.totalPages;
        },

        setFieldRuleViewCurrentPage: (state, newValue) => {
            state.fieldRuleView.currentPage = newValue;
        },

        updateFieldRuleFilter: (state, newValue) => {
            state.fieldRuleView.filter = newValue;
        },

    },
    actions: {
        loadDocuments(context) {
            DocumentService.all()
                .then((data) => (context.commit('updateDocuments', data)));

        },
        reloadFieldRules(context) {
            const filter = JSON.parse(JSON.stringify(this.state.fieldRuleView.filter));
            filter.page = this.state.fieldRuleView.currentPage - 1;
            FieldRuleService.search(filter)
                .then((data) => (context.commit('updateFieldRules', data)));

        },
    }
});
