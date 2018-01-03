import DictionaryBaseChecker from "./dictionaryBase";

export default class DictionaryTopSSHChecker extends DictionaryBaseChecker{
    constructor(download){
        super(download, 'Top SSH passwords', []);
        this.registerDownloadDictionaryAsPreload('top-20-common-SSH-passwords.txt');
    }
}