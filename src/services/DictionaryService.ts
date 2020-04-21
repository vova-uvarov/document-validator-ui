import axios from 'axios';

export default class DictionaryService {

    public static loadDictionary(dictionaryName: string) {
        return axios.get('/api/ui/dictionary/' + dictionaryName)
            .then((response) => {
                return response.data;
            });
    }

}
