export default class ObjectUtils {

    public static copy(inputData: object): object {
        return JSON.parse(JSON.stringify(inputData))
    }


}
