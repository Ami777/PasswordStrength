import DictionaryBaseChecker from "./dictionaryBase";

export default class DictionaryCommonWinChecker extends DictionaryBaseChecker{
    constructor(download){
        super(download, 'Common Win passwords', []);
        this.registerDownloadDictionaryAsPreload('common-passwords-win.txt');
    }
}