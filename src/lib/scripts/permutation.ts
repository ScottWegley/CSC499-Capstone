import { DEFAULT_ALPHABET } from "./caesar";

 /** Function to check if a specified alphabet array is valid. */
 export function isValidAlphabet(toCheck: string[]): boolean {
    if (toCheck.length != 26) {
        return false;
    }
    let charStorage: string[] = [];
    let isValid = true;
    toCheck.forEach((letter) => {
        if (!DEFAULT_ALPHABET.includes(letter)) {
            isValid = false;
        } else if (!charStorage.includes(letter)) {
            charStorage.push(letter);
        } else {
            isValid = false;
        }
    });
    return isValid;
}
