import axios, {AxiosResponse} from 'axios';

export default class FieldRuleService {

    public static search(requestParams: any): Promise<AxiosResponse<any>> {
        console.log(JSON.stringify(requestParams.documentTypes));
        if (requestParams.documentTypes) {
            requestParams.documentTypes = requestParams.documentTypes.map((item: any) => (item.key));
        }

        if (requestParams.enabled=='ALL'){
            delete requestParams.enabled;
        }
        return axios.get('/api/ui/filedRule/search', {params: requestParams})
            .then((response) => {
                return response.data;
            });
    }

}
