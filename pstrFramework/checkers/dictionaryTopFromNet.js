import DictionaryBaseChecker from "./dictionaryBase";

export default class DictionaryTopFromNetChecker extends DictionaryBaseChecker{
    constructor(download){
        super(download, 'Top from net', []);
        this.registerDownloadDictionaryAsPreload('top-from-net.txt');
    }
}