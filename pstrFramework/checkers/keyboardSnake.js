import BasePstrChecker from "../baseChecker";

export default class KeyboardSnakeChecker extends BasePstrChecker{
    constructor(download){
        super(download);
        this.minPercentage = 0.6;
        this.possibleTransformations = [
            /*[up/down, left/right]*/
            [-1,0],
            [-1,1], //special case - keys are not aligned perfectly
            [1,0],
            [1,-1], //special case - keys are not aligned perfectly
            [0,-1],
            [0,1],
        ];
        this.keyboards = [(
`1234567890-=
qwertyuiop[]
asdfghjkl;'
zxcvbnm,./`
        ), (
`/*-
789
456
123
0,`
        )].map(keyboard => keyboard.split("\n").map(row => row.trim().split('')) );
    }

    _transformPossible(keyboard, keyCurr, keyNext){
        let x;
        let y;
        keyboard.forEach((row, rowIndex) => {
            row.forEach((key, keyIndex) => {
                if (key === keyCurr) {
                    y = rowIndex;
                    x = keyIndex;
                }
            });
        });
        if (typeof x !== 'number' || typeof y !== 'number') return false;

        for(let transformation of this.possibleTransformations){
            const newX = x + transformation[0];
            const newY = y + transformation[1];
            const newRow = keyboard[newY];
            if (!newRow) continue;
            const newKey = newRow[newX];
            if (typeof newKey !== 'string' || newKey === ' ') continue;
            if (newKey === keyNext) {
                //Add to the stats of the transformations done
                const transName = transformation.join();
                if (this._transformationsDone.indexOf(transName)===-1 || (this._transformationsDone.length > 0 && this._transformationsDone[this._transformationsDone.length - 1] !== transName)){
                    //Add to the stats of transformations if new or different than previous
                    this._transformationsDone.push(transName);
                }
                return true;
            }
        }

        return false;
    }

    _snakeLength(pwd, keyboard){
        pwd = pwd.toLowerCase();

        let length=0;

        for(let i = 0; i < pwd.length - 1; i++){
            const keyCurr = pwd[i];
            const keyNext = pwd[i+1];
            const possible = this._transformPossible(keyboard, keyCurr, keyNext);
            if (possible){
                //Add another possible move
                length++;
                if (i === pwd.length - 2){
                    length++; //last one is also possible.
                }
            } else if (length > 0){
                //Move is impossible and there were some moves, so return them (c-c-combo breaker)
                break;
            }
        }

        return length;
    }

    /**
     * Should return boolean value or Promise resolvig to boolean value. True means password is good, false means it is invalid.
     * @param pwd string
     * @return bool|Promise<bool>
     */
    validate(pwd){
        this._maxLength = 0;
        this._leastTransformations = 10;
        for(let keyboard of this.keyboards){
            try{
                this._transformationsDone = [];
                const length = this._snakeLength(pwd, keyboard);
                if (length > this._maxLength){
                    this._maxLength = length;

                    if (this._transformationsDone.length < this._leastTransformations){
                        this._leastTransformations = this._transformationsDone.length;
                    }
                }
            } finally {
                this._transformationsDone = [];
            }
        }

        this._percentage = this._maxLength / pwd.length;

        return !(this._percentage >= this.minPercentage && this._leastTransformations <= 5);
    }

    /**
     * Should return message to show if password is invalid
     * @return {key : string, data : Object|undefined} Where msgId is key in translations and msgData i eventually data for message translation
     */
    getInvalidMessage(){
        if(this._percentage >= 0.95 && this._leastTransformations <= 4){
            return {
                key : 'easyToGuessPattern',
            };
        } else {
            return {
                key : 'easyToGuessPatternMaybe',
            };
        }
    }

    /**
     * Should return severity level if password is invalid. There are 3 possible severity values: "notice" (will not mark password as not-safe or weak), "warning" (will mark password as possibly weak; when there are 2 warning password is marked as not-safe) and "danger" (will mark password as not-safe).
     * @return "notice"|"warning"|"danger"
     */
    getSeverity(){
        if(this._percentage >= 0.95 && this._leastTransformations <= 4){
            return 'danger';
        } else {
            return 'warning';
        }
    }
}