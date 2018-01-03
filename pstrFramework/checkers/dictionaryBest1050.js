import DictionaryBaseChecker from "./dictionaryBase";

export default class DictionaryBest1050Checker extends DictionaryBaseChecker{
    constructor(download){
        super(download, 'Best 1050', []);
        this.registerDownloadDictionaryAsPreload('best1050.txt');
    }
}