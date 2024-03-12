import { browser } from '$app/environment';
import { DEFAULT_ALPHABET } from './Ciphers/CaesarCipher';

/** Load a specified word list from a file. */
export async function getSpecificWordlist(filename: string) {
	let response = await fetch(filename);
	return (await response.text()).replaceAll('\r', '').toLowerCase().split('\n').toString();
}

/** Function to assess if specified text is valid dictionary.  Stores results in storage array if so.*/
export function isValidDictionary(dictionary: string, storeData?: (d: string) => void): boolean {
	dictionary = dictionary.trim().toLowerCase();
	dictionary = dictionary.replaceAll(',', '\n');
	let invalidCharacters = '0123456789`-=[]\\;\',./~!@#$%^&*()_+{}|:"<>?';

	for (let i = 0; i < invalidCharacters.length; i++) {
		if (dictionary.indexOf(invalidCharacters.charAt(i)) != -1) {
			alert(
				`Dictionary contained invalid character: ${invalidCharacters.charAt(i)} on Line ${i + 1}`
			);
			return false;
		}
	}

	let dictionaryArray = dictionary.split('\n');
	for (let i = 0; i < dictionaryArray.length; i++) {
		dictionaryArray[i] = dictionaryArray[i].trim();
		if (dictionaryArray[i].indexOf(' ') != -1) {
			alert(`Cannot have spaces in dictionary entries.  Line ${i + 1}`);
			return false;
		}
		if (!(dictionaryArray[i].length == 0)) {
			if (storeData) {
				storeData(dictionaryArray[i]);
			}
		}
	}
	return true;
}

/** Gets the current dictionary from local storage, with the basic wordlist as a fallback.*/
export async function getDictionary() {
	let temp = browser && localStorage.getItem('wordlist');
	if (temp == null) {
		console.log("Falling back to default wordlist");
		localStorage.setItem('wordlist', await getSpecificWordlist('10k.txt'));
		temp = browser && localStorage.getItem('wordlist');
	} else {
		if (typeof temp != 'string') {
			return '';
		} else {
			return temp;
		}
	}
}

/** Function to reduce a string of text to alphabet and space. */
export function sanitizeInput(text: string) {
	text = text.toUpperCase().replaceAll(/[ \t]{2,}/g,' ');
	let output = '';
	for (let i = 0; i < text.length; i++) {
		if ((DEFAULT_ALPHABET + ' ').indexOf(text.charAt(i)) != -1) {
			output = output + text.charAt(i);
		}
	}
	return output;
}

/** Returns a percentage rating representing how many words in the string are in our dictionary. */
export async function checkAccuracy(text: string) {
	text = text.toLowerCase();
	let dictionary = await getDictionary();
	if (dictionary != undefined) {
		dictionary = dictionary.toLowerCase();

		/** Split the dictionary into an array. */
		let dictArray = dictionary.split(',');
		/** Split the input text into an array. */
		let textArray = text.split(' ');
		/** The total number of words in the input array. */
		let totalWords = textArray.length;
		/** The amount of words that are in our dictionary. */
		let realWordCount = 0;

		/** Loop through every word in the dictionary while we are not at 100% accuracy. */
		for (let i = 0; i < dictArray.length && realWordCount < totalWords; i++) {
			let k = 0;
			while (k < textArray.length && textArray.length > 0) {
				if (textArray[k] == dictArray[i]) {
					realWordCount++;
					for (let j = k; j < textArray.length - 1; j++) {
						textArray[j] = textArray[j + 1];
					}
					textArray.pop();
				} else {
					k++;
				}
			}
		}
		return realWordCount / totalWords;
	} else {
		console.log('Dictionary was undefined.');
		return 0;
	}
}
