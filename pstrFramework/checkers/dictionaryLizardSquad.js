import DictionaryBaseChecker from "./dictionaryBase";

export default class DictionaryLizardSquadChecker extends DictionaryBaseChecker{
    constructor(download){
        super(download, 'Lizard Squad', []);
        this.registerDownloadDictionaryAsPreload('Lizard_Squad.txt');
    }
}