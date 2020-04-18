import axios, {AxiosResponse} from 'axios';

export default class FieldRuleService {

    public static search(requestParams: any): Promise<AxiosResponse<any>> {
        console.log(JSON.stringify(requestParams.documentTypes));
        if (requestParams.documentTypes) {
            requestParams.documentTypes = requestParams.documentTypes.map((item: any) => (item.key));
        }
        if (requestParams.schemaTypes) {
            requestParams.schemaTypes = requestParams.schemaTypes.map((item: any) => (item.value));
        }
        if (requestParams.ruleSides) {
            requestParams.ruleSides = requestParams.ruleSides.map((item: any) => (item.value));
        }

        return axios.get('/api/ui/filedRule/search', {params: requestParams})
            .then((response) => {
                return response.data;
            });
    }

}
