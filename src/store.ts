import Vue from 'vue';
import Vuex from 'vuex';
import DocumentService from '@/services/DocumentService';
import FieldRuleService from "@/services/FieldRuleService";
import DictionaryService from "@/services/DictionaryService";
import RuleCheckService from "@/services/RuleCheckService";
import {Dictionaries} from "@/utils/Constants";

Vue.use(Vuex);

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
            filter: {
                documentTypes: <any>[],
                schemaTypes: [],
                ruleSides: [],
                keywords: [],
                name: '',
                formats: [],
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

        resetFilterToDocumentType: (state, documentType: any) => {
            let documentTypeFilter: any = {
                'key': documentType,
            };
            state.fieldRuleView.filter.documentTypes = [documentTypeFilter];
            state.fieldRuleView.filter.schemaTypes = [];
            state.fieldRuleView.filter.ruleSides = [];
            state.fieldRuleView.filter.formats = [];
            state.fieldRuleView.filter.name = '';
            state.fieldRuleView.filter.fieldName = '';
            state.fieldRuleView.filter.groupName = '';
            state.fieldRuleView.filter.description = '';
            state.fieldRuleView.filter.validationMode = null;
            state.fieldRuleView.filter.enabled = null;
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
