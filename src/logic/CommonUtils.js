'use strict'

export default class CommonUtils {

    static shuffleArray (array) {
        var length = array.length;
        for(var i = length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = array[i];
            array[i] = array[j];
            array[j] = tmp;
        }
    }
}