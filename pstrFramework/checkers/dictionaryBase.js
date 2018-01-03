import BasePstrChecker from "../baseChecker";
import {DIRECTORY_URL_PREFIX} from "../../app/config/config";


export default class DictionaryBaseChecker extends BasePstrChecker{
    constructor(download, dictionaryName, dictionaryAr){
        super(download);
        this.dictionaryName = dictionaryName;
        this.applyDictionaryFromAr(dictionaryAr);
    }
    /**
     * Should return boolean value or Promise resolvig to boolean value. True means password is good, false means it is invalid.
     * @param pwd string
     * @return bool|Promise<bool>
     */
    validate(pwd){
        if (!this.dictionaryName || !this.dictionarySet) throw new Error('Do not use dictionaryBase directly and remember to pass the data to super in constructor!');
        return !this.dictionarySet.has(pwd.toLowerCase());
    }

    /**
     * Should return message to show if password is invalid
     * @return {key : string, data : Object|undefined} Where msgId is key in translations and msgData i eventually data for message translation
     */
    getInvalidMessage(){
        return {
            key : 'pwdInDictionary',
            data : {
                dictionary : this.dictionaryName,
            },
        };
    }

    /**
     * Should return severity level if password is invalid. There are 3 possible severity values: "notice" (will not mark password as not-safe or weak), "warning" (will mark password as possibly weak; when there are 2 warning password is marked as not-safe) and "danger" (will mark password as not-safe).
     * @return "notice"|"warning"|"danger"
     */
    getSeverity(){
        return 'danger';
    }

    applyDictionaryFromAr(dictionaryAr) {
        this.dictionarySet = new Set(dictionaryAr.map(d => d.toLowerCase())); //set.has() is much faster than array.indexOf()
    }

    registerDownloadDictionaryAsPreload(fn){
        this.preload = () => {
            return new Promise(async (resolve, reject) => {
                try{
                    const dictStr = await this.download(DIRECTORY_URL_PREFIX + 'data/dictionaries/' + fn);
                    const dict = dictStr.split("\n").map(l => l.trim()).filter(l => l !== '');
                    this.applyDictionaryFromAr(dict);
                    resolve();
                }catch(e){
                    reject(e);
                }
            });
        };
    }
}