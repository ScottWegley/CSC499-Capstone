import { DEFAULT_ALPHABET } from '../Util/Dictionary';

/** Function to convert a letter in our uppercase alphabet to it's index in the alphabet. */
export function getLetterIndex(letter: string): number {
	return letter.charCodeAt(0) - 65;
}

/** Function to return an alphabet shifted by a specified amount. */
export function getCipherAlphabet(shift: number): string[] {
	while (shift < 0) {
		shift += 26;
	}
	let shiftedAlphabet = DEFAULT_ALPHABET.map((l) => l);
	for (let i = 0; i < 26; i++) {
		shiftedAlphabet[i] = DEFAULT_ALPHABET[(i + shift) % 26];
	}
	return shiftedAlphabet;
}

/** This function encrypts a given input with a Caesar Cipher of a specified shift. */
export function caesarEncryption(input: string, shift: number): string {
	input = input.toUpperCase();
	let shiftedAlphabet = getCipherAlphabet(shift);
	let output = '';
	for (let i = 0; i < input.length; i++) {
		let newChar = '';
		if (DEFAULT_ALPHABET.includes(input.charAt(i))) {
			newChar = shiftedAlphabet[DEFAULT_ALPHABET.indexOf(input.charAt(i))];
		}
		output = output + (newChar == '' ? input.charAt(i) : newChar);
	}
	return output;
}

/** This function encrypts a given output with a Caesar Cipher of a specified shift. */
export function caesarDecryption(input: string, shift: number): string {
	input = input.toUpperCase();
	let shiftedAlphabet = getCipherAlphabet(shift);
	let output = '';
	for (let i = 0; i < input.length; i++) {
		let newChar = '';
		if (DEFAULT_ALPHABET.includes(input.charAt(i))) {
			newChar = DEFAULT_ALPHABET[shiftedAlphabet.indexOf(input.charAt(i))];
		}
		output = output + (newChar == '' ? input.charAt(i) : newChar);
	}
	return output;
}