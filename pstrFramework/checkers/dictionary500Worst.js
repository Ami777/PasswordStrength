import DictionaryBaseChecker from "./dictionaryBase";

export default class Dictionary500WorstChecker extends DictionaryBaseChecker{
    constructor(download){
        super(download, '500 worst passwords', []);
        this.registerDownloadDictionaryAsPreload('500-worst-passwords.txt');
    }
}