import { DEFAULT_ALPHABET } from './caesar';

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

/** Function to generate a randomly ordered alphabet. */
export function generateRandomAlphabet(): string[] {
	let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let randomAlphabet: string[] = [];
	while (alphabet.length != 0) {
		let i = Math.floor(Math.random() * alphabet.length);
		randomAlphabet.push(alphabet.charAt(i));
		alphabet = alphabet.replace(alphabet.charAt(i), '');
	}
	return randomAlphabet;
}

/** Function to encrypt a specified string given an alphabet. */
export function permutationEncrypt(input: string, permAlphabet: string[]) {
	let output = "";
	if(!isValidAlphabet(permAlphabet)){
		return output;
	}
	for (let i = 0; i < input.length; i++) {
		if(DEFAULT_ALPHABET.includes(input.charAt(i))){
			output = output + permAlphabet[DEFAULT_ALPHABET.indexOf(input.charAt(i))]
		} else {
			output = output + input.charAt(i);
		}
	}
	return output;
}

/** Function to decrypt a specified string given an alphabet. */
export function permutationDecrypt(input: string, permAlphabet: string[]){
	let output = "";
	if(!isValidAlphabet(permAlphabet)){
		return output;
	}
	for (let i = 0; i < input.length; i++) {
		if(DEFAULT_ALPHABET.includes(input.charAt(i))){
			output = output + DEFAULT_ALPHABET[permAlphabet.indexOf(input.charAt(i))]
		} else {
			output = output + input.charAt(i);
		}
	}
	return output;
}