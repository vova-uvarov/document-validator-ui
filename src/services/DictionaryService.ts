import axios, {AxiosResponse} from 'axios';
import store from "@/store";

export default class DictionaryService {

    private static DOCUMENT_TYPES: any = {
        'CONTRACT_INFO': 'Сведения по контракту (181-И)',
        'CREDIT_INFO': 'Сведения по кредитному договору (181-И)',
        'OPERATION_INFO': 'Сведения об операциях (181-И)',
        'CONFIRMING_DOCUMENT_INFO': 'Справка о подтверждающих документах',
        'MODIFY_INFO': 'Внесение изменений в раздел 1 ВБК',
        'CLOSE_DOCUMENT_INFO': 'Завление о снятии с учета контракта',
        'OUTGOING_EMAIL': 'Исходящие письма',
        'OVERNIGHT_DEPOSIT': 'Заявки на депозит',
        'VIRTUAL_OVERNIGHT_DEPOSIT': 'Заявки на виртуальный депозит',
        'VIRTUAL_OVERNIGHT_DEPOSIT_MODIFY': 'Отключение/подключение виртуального депозита',
        'CANCELLATION_REQUEST': 'Запрос на отзыв документа',
        'CURRENCY_TRANSFER_ORDER': 'Распоряжению на списание иностранной валюты с транзитного валютного счета',
        'CURRENCY_TRANSFER_ORDER_PATTERN': 'Шаблон для распоряжения на списание иностранной валюты с транзитного валютного счета',
        'CURRENCY_PAYMENT': 'Валютное платежное поручение',
        'CONVERSION_DOCUMENT': 'Покупка/продажа/конверсия валюты',
    };

    public static getDocumentTypes(): any {
        return this.DOCUMENT_TYPES;
    }

    public static getDocumentName(documentType: string): string {
        return this.DOCUMENT_TYPES[documentType];
    }

    public static loadKeywords(): Promise<AxiosResponse<any>> {
        return axios.get('/api/ui/dictionary/keywords')
            .then((response) => {
                return response.data;
            });
    }

}
