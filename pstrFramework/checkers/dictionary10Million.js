import DictionaryBaseChecker from "./dictionaryBase";

export default class Dictionary10MillionTopChecker extends DictionaryBaseChecker{
    constructor(download){
        super(download, '10 million passwords TOP 10000', []);
        this.registerDownloadDictionaryAsPreload('10_million_password_list_top_10000.txt');
    }
}