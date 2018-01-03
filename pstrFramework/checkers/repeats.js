import BasePstrChecker from "../baseChecker";

export default class RepeatsChecker extends BasePstrChecker{
    /**
     * Should return boolean value or Promise resolvig to boolean value. True means password is good, false means it is invalid.
     * @param pwd string
     * @return bool|Promise<bool>
     */
    validate(pwd){
        return pwd.replace(new RegExp(/([a-zA-Z0-9]).*(\1)(\1)/), "").length === pwd.length;
    }

    /**
     * Should return message to show if password is invalid
     * @return {key : string, data : Object|undefined} Where msgId is key in translations and msgData i eventually data for message translation
     */
    getInvalidMessage(){
        return {
            key : 'noRepeats',
        };
    }

    /**
     * Should return severity level if password is invalid. There are 3 possible severity values: "notice" (will not mark password as not-safe or weak), "warning" (will mark password as possibly weak; when there are 2 warning password is marked as not-safe) and "danger" (will mark password as not-safe).
     * @return "notice"|"warning"|"danger"
     */
    getSeverity(){
        return 'warning';
    }
}