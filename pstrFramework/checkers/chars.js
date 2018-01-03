import BasePstrChecker from "../baseChecker";

export default class CharsChecker extends BasePstrChecker{
    constructor(download){
        super(download);
        this.regexps = [
            new RegExp(/[qwertyuiopasdfghjklzxcvbnm]/), //Alpha
            new RegExp(/[QWERTYUIOPASDFGHJKLZXCVBNM]/), //Alpha upper
            new RegExp(/[1234567890]/), //Numeric
            new RegExp(/[!@#$%^&*()_+\-={}|:"<>?[\]\\;',./~`]/), //Special
        ];
    }
    /**
     * Should return boolean value or Promise resolvig to boolean value. True means password is good, false means it is invalid.
     * @param pwd string
     * @return bool|Promise<bool>
     */
    validate(pwd){
        return this.regexps.reduce((prev, curr) => {
            if (prev === null) return prev;
            return pwd.match(curr);
        }, []) !== null;
    }

    /**
     * Should return message to show if password is invalid
     * @return {key : string, data : Object|undefined} Where msgId is key in translations and msgData i eventually data for message translation
     */
    getInvalidMessage(){
        return {
            key : 'useDifferentChars',
        };
    }

    /**
     * Should return severity level if password is invalid. There are 3 possible severity values: "notice" (will not mark password as not-safe or weak), "warning" (will mark password as possibly weak; when there are 2 warning password is marked as not-safe) and "danger" (will mark password as not-safe).
     * @return "notice"|"warning"|"danger"
     */
    getSeverity(){
        return 'danger';
    }
}