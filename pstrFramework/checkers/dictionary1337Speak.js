import DictionaryBaseChecker from "./dictionaryBase";

export default class Dictionary1337SpeakChecker extends DictionaryBaseChecker{
    constructor(download){
        super(download, '1337 speak', []);
        this.registerDownloadDictionaryAsPreload('1337speak.txt');
    }
}