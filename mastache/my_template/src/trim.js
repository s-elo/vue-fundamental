/**
 * remove the the blanks and remain the blanks in HTML tag<>
 * @param {*} str 
 */
export default function trim (str) {
    let ret = '';
    // to see if it is in the HTML tag
    let isInTag = false;

    for (let i = 0; i < str.length; i++) {
        // when it is not a space
        if (str[i] !== ' ') {
            ret += str[i];
        }

        // it is a space but in HTML tag
        else if (str[i] === ' ' && isInTag) {
            ret += str[i];
        }

        // switch status
        if (str[i] === '<') {
            isInTag = true;
        }
        if (str[i] === '>') {
            isInTag = false;
        }
    }

    return ret;
}
