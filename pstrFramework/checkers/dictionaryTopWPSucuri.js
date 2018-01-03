import DictionaryBaseChecker from "./dictionaryBase";

export default class DictionaryTopWPSucuriChecker extends DictionaryBaseChecker{
    constructor(download){
        super(download, 'Top WordPress passwords from Sucuri', []);
        this.registerDownloadDictionaryAsPreload('Sucuri_Top_Wordpress_Passwords.txt');
    }
}