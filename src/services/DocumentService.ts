import axios, {AxiosResponse} from 'axios';

export default class DocumentService {

    public static all(): Promise<AxiosResponse<any>> {
        return axios.get('/api/ui/documents')
            .then((response) => {
                return response.data;
            });
    }
}
