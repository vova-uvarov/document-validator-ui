import Vue from 'vue';
import Vuex from 'vuex';
import DocumentService from '@/services/DocumentService';
import FieldRuleService from "@/services/FieldRuleService";
import DictionaryService from "@/services/DictionaryService";

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
                documentTypes: <any> [],
                schemaTypes: [],
                ruleSides: [],
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

        resetFilterToDocumentType: (state, documentType:any) => {
            let documentTypeFilter:any = {
                'key': documentType,
                'value': DictionaryService.getDocumentName(documentType)
            };
            state.fieldRuleView.filter.documentTypes = [documentTypeFilter];
            state.fieldRuleView.filter.schemaTypes= [];
            state.fieldRuleView.filter.ruleSides= [];
            state.fieldRuleView.filter.formats= [];
            state.fieldRuleView.filter.name= '';
            state.fieldRuleView.filter.fieldName= '';
            state.fieldRuleView.filter.groupName= '';
            state.fieldRuleView.filter.description= '';
            state.fieldRuleView.filter.validationMode= null;
            state.fieldRuleView.filter.enabled= null;
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
