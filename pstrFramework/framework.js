import CharsChecker from "./checkers/chars";
import KeyboardSnakeChecker from "./checkers/keyboardSnake";
import LengthChecker from "./checkers/length";
import RepeatsChecker from "./checkers/repeats";
import DictionaryPolishNamesChecker from "./checkers/dictionaryPolishNames";
import DictionaryTopFromNetChecker from "./checkers/dictionaryTopFromNet";
import Dictionary10MillionTopChecker from "./checkers/dictionary10Million";
import Dictionary10kMostCommonChecker from "./checkers/dictionary10kMostCommon";
import Dictionary500WorstChecker from "./checkers/dictionary500Worst";
import Dictionary1337SpeakChecker from "./checkers/dictionary1337Speak";
import DictionaryBest1050Checker from "./checkers/dictionaryBest1050";
import DictionaryBibleChecker from "./checkers/dictionaryBible";
import DictionaryCommonWinChecker from "./checkers/dictionaryCommonWin";
import DictionaryElitehackerChecker from "./checkers/dictionaryElitehacker";
import DictionaryLizardSquadChecker from "./checkers/dictionaryLizardSquad";
import DictionaryTopWPSucuriChecker from "./checkers/dictionaryTopWPSucuri";
import DictionaryTopSSHChecker from "./checkers/dictionaryTopSSH";
import DictionaryAutocentrumPl from "./checkers/dictionaryAutocentrumPl";

export default class PstrFramework {
    constructor(updateFnc){
        this.updateFnc = updateFnc;

        const load = cls => new cls(this._downloader);

        this.filesLeft = 0;
        this.filesTotal = 0;

        this.checkers = [
            load(CharsChecker),
            load(KeyboardSnakeChecker),
            load(LengthChecker),
            load(RepeatsChecker),
            load(DictionaryPolishNamesChecker),
            load(DictionaryTopFromNetChecker),
            load(Dictionary10MillionTopChecker),
            load(Dictionary10kMostCommonChecker),
            load(Dictionary500WorstChecker),
            load(Dictionary1337SpeakChecker),
            load(DictionaryBest1050Checker),
            load(DictionaryBibleChecker),
            load(DictionaryCommonWinChecker),
            load(DictionaryElitehackerChecker),
            load(DictionaryLizardSquadChecker),
            load(DictionaryTopSSHChecker),
            load(DictionaryTopWPSucuriChecker),
            load(DictionaryAutocentrumPl),
        ];
    }

    async preload(){
        return Promise.all(
            this.checkers
                .filter(checker => {
                    return typeof checker.preload === 'function';
                })
                .map(checker => {
                    return checker.preload();
                })
        );
    }

    async validatePassword(pwd){
        let msgs = [];
        for(let checker of this.checkers){
            const valid = await checker.validate(pwd);
            if (!valid){
                msgs.push({
                    severity : await checker.getSeverity(),
                    msg : await checker.getInvalidMessage(),
                });
            }
        }

        const severities = ['ok', 'notice', 'warning', 'danger'];
        let severity = 'ok';
        let warnings = 0;

        for(let msg of msgs){
            let currentSeverityIndex = severities.indexOf(severity);
            let msgSeverityIndex = severities.indexOf(msg.severity);

            if (msgSeverityIndex > currentSeverityIndex){
                severity = msg.severity;
            }

            if (severity === 'warning' && msg.severity === 'warning'){
                warnings++;
                if (warnings >= 3) {
                    severity = 'danger';
                }
            }
        }

        return {
            severity,
            msgs,
        };
    }

    updateProgressbar() {
        this.updateFnc(this.filesLeft, this.filesTotal);
    }

    _downloader = url => {
        this.filesTotal++;
        this.filesLeft++;
        this.updateProgressbar();
        return fetch(url)
            .then( r => {
                this.filesLeft--;
                this.updateProgressbar();
                return r.text();
            } );
    };
}