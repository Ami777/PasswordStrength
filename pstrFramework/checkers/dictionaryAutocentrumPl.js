import DictionaryBaseChecker from "./dictionaryBase";

export default class DictionaryAutocentrumPl extends DictionaryBaseChecker{
    constructor(download){
        super(download, 'Autocentrum.pl Top 99', []);
        this.registerDownloadDictionaryAsPreload('autocentrum.pl.txt');
    }
}