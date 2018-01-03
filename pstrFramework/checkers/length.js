import BasePstrChecker from "../baseChecker";

export default class LengthChecker extends BasePstrChecker{
    /**
     * Should return boolean value or Promise resolvig to boolean value. True means password is good, false means it is invalid.
     * @param pwd string
     * @return bool|Promise<bool>
     */
    validate(pwd){
        this.len = pwd.length;
        return this.len >= 15;
    }

    /**
     * Should return message to show if password is invalid
     * @return {key : string, data : Object|undefined} Where msgId is key in translations and msgData i eventually data for message translation
     */
    getInvalidMessage(){
        if( this.len < 8 ){
            return {
                key : 'tooShort',
            };
        } else if ( this.len < 10){
            return {
                key : 'couldBeLonger',
            };
        } else {
            return {
                key : 'couldBeLongerEasy',
            };
        }
    }

    /**
     * Should return severity level if password is invalid. There are 3 possible severity values: "notice" (will not mark password as not-safe or weak), "warning" (will mark password as possibly weak; when there are 2 warning password is marked as not-safe) and "danger" (will mark password as not-safe).
     * @return "notice"|"warning"|"danger"
     */
    getSeverity(){
        if( this.len < 8 ){
            return 'danger';
        } else if ( this.len < 10){
            return 'warning';
        } else {
            return 'notice';
        }
    }
}