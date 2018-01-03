import DictionaryBaseChecker from "./dictionaryBase";

export default class DictionaryBibleChecker extends DictionaryBaseChecker{
    constructor(download){
        super(download, 'Bible', []);
        this.registerDownloadDictionaryAsPreload('bible.txt');
    }
}