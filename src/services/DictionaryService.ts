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

}
