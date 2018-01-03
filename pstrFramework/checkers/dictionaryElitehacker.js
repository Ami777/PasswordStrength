import DictionaryBaseChecker from "./dictionaryBase";

export default class DictionaryElitehackerChecker extends DictionaryBaseChecker{
    constructor(download){
        super(download, 'Elitehacker', []);
        this.registerDownloadDictionaryAsPreload('elitehacker.txt');
    }
}