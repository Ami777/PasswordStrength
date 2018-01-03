import DictionaryBaseChecker from "./dictionaryBase";

export default class Dictionary10MillionTopChecker extends DictionaryBaseChecker{
    constructor(download){
        super(download, 'Polish names', []);
        this.registerDownloadDictionaryAsPreload('polish-names.txt');
    }
}