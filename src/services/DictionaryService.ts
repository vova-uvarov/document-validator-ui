import axios from 'axios';
import store from "@/store";

export default class DictionaryService {

    public static getDocumentName(dictionaryType: string){
        return store.getters.getDocumentName(dictionaryType);
    }
    public static loadDictionary(dictionaryName: string) {
        return axios.get('/api/ui/dictionary/' + dictionaryName)
            .then((response) => {
                return response.data;
            });
    }

    public static fieldNames(documentTypes: string[]) {
        return axios.get('/api/ui/dictionary/fieldNames', {params: {documentTypes: documentTypes}})
            .then((response) => {
                return response.data;
            });
    }

    public static groupNames(documentTypes: string[]) {
        return axios.get('/api/ui/dictionary/groupNames', {params: {documentTypes: documentTypes}})
            .then((response) => {
                return response.data;
            });
    }

    public static ruleNames(documentTypes: string[]) {
        return axios.get('/api/ui/dictionary/ruleNames', {params: {documentTypes: documentTypes}})
            .then((response) => {
                return response.data;
            });
    }

}
