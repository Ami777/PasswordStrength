import DictionaryBaseChecker from "./dictionaryBase";

export default class Dictionary10kMostCommonChecker extends DictionaryBaseChecker{
    constructor(download){
        super(download, '10k most common', []);
        this.registerDownloadDictionaryAsPreload('10k_most_common.txt');
    }
}