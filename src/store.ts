import Vue from 'vue';
import Vuex from 'vuex';
import DocumentService from '@/services/DocumentService';
import FieldRuleService from "@/services/FieldRuleService";
import DictionaryService from "@/services/DictionaryService";
import RuleCheckService from "@/services/RuleCheckService";
import {Dictionaries} from "@/utils/Constants";

Vue.use(Vuex);

function defaultFilter() {
    return {
        documentTypes: <any>[],
        schemaTypes: [],
        ruleSides: [],
        keywords: [],
        names: [],
        formats: [],
        fieldName: '',
        fieldNames: [],
        groupNames: [],
        description: '',
        filedRuleSearchMode: 'LIKE',
        validationMode: null,
        enabled: null,
        size: 10,
        page: 1,
    };
}

export default new Vuex.Store({

    strict: true,
    state: {
        dictionaries: <any>{},
        documents: [],
        fieldRules: [],
        fieldRuleView: {
            fieldRules: [],
            totalPages: 0,
            currentPage: 1,
            filter: defaultFilter()
        },
    },
    getters: {
        getDictionary: (state) => (dictionaryName: string) => {
            return state.dictionaries[dictionaryName];
        },
        getDocumentName: (state) => (documentType: string) => {
            let dictionary = state.dictionaries[Dictionaries.DOCUMENT_TYPE];
            if (dictionary) {
                let found = dictionary.find((d: any) => (d.code == documentType));
                if (found) {
                    return found.value;
                }
            }
            return "";
        },
        getDocumentType: (state) => (documentId: string) => {
            if (documentId) {
                let documentInfo: any = state.documents.find((d: any) => (d.documentRuleId == documentId));
                if (documentInfo) {
                    return documentInfo.documentType;
                }
            }
            return null;
        }
    },
    mutations: {
        initState: (state) => {
        },

        resetFilterFieldRuleFilter: (state) => {
            state.fieldRuleView.filter = defaultFilter()
        },


        updateDictionaries: (state, payload) => {
            state.dictionaries[payload.dictionaryName] = payload.data;
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
        loadDictionaries(context) {
            DictionaryService.loadDictionary(Dictionaries.KEYWORD)
                .then((data) => (context.commit('updateDictionaries', {dictionaryName: Dictionaries.KEYWORD, data})));

            DictionaryService.loadDictionary(Dictionaries.RULE_SIDE)
                .then((data) => (context.commit('updateDictionaries', {dictionaryName: Dictionaries.RULE_SIDE, data})));

            DictionaryService.loadDictionary(Dictionaries.SCHEMA_TYPE)
                .then((data) => (context.commit('updateDictionaries', {
                    dictionaryName: Dictionaries.SCHEMA_TYPE,
                    data
                })));

            DictionaryService.loadDictionary(Dictionaries.FORMAT)
                .then((data) => (context.commit('updateDictionaries', {dictionaryName: Dictionaries.FORMAT, data})));

            DictionaryService.loadDictionary(Dictionaries.VALIDATION_MODE)
                .then((data) => (context.commit('updateDictionaries', {
                    dictionaryName: Dictionaries.VALIDATION_MODE,
                    data
                })));

            DictionaryService.loadDictionary(Dictionaries.DOCUMENT_TYPE)
                .then((data) => (context.commit('updateDictionaries', {
                    dictionaryName: Dictionaries.DOCUMENT_TYPE,
                    data
                })));

        },
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
