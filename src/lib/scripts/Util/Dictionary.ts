import { browser } from '$app/environment';
import { PossibleCharacterSet } from '../Cracking/Permutation/PossibleCharacterSet';
import { WordRuleSet } from './WordRuleSet';

/** Load a specified word list from a file. */
export async function getSpecificWordlist(filename: string) {
	let response = await fetch(filename);
	return (await response.text()).replaceAll('\r', '').toUpperCase().split('\n').toString();
}

/** The default standard alphabet. */
export const DEFAULT_ALPHABET = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z'
];

/** Function to convert a letter in our uppercase alphabet to it's index in the alphabet. */
export function getLetterIndex(letter: string): number {
	return letter.charCodeAt(0) - 65;
}

/** Class based dictionary tools. */
export class Dictionary {
	static ready: boolean = false;
	static dictionary: string;

	static usedWords: Set<string> = new Set<string>();
	static fakeWords: Set<string> = new Set<string>();

	/** Function to store the dictionary from local storage in our class as a static member. */
	public static async syncDictionary() {
		Dictionary.ready = false;
		this.dictionary = (await getDictionary())!;
		Dictionary.ready = true;
	}

	public static getMatchingWords(
		rules: WordRuleSet,
		sourceWord?: string,
		charSets?: PossibleCharacterSet
	): string[] {
		if (!Dictionary.ready) {
			console.log('Dictionary class is not ready.  Call Sync Dictionary.');
			return [];
		}
		let output: string[] = [];
		this.dictionary.split(',').forEach((checkWord) => {
			if (rules.isSimilar(checkWord)) {
				if (charSets !== undefined && sourceWord !== undefined) {
					if (charSets.canContainWord(sourceWord, checkWord)) {
						output.push(checkWord);
						this.usedWords.add(checkWord);
					}
				} else {
					output.push(checkWord);
					this.usedWords.add(checkWord);
				}
			}
		});
		return output;
	}

	/** Returns a percentage accuracy rating for how many words in a given text are in a given dictionary. */
	public static checkAccuracy(text: string) {
		if (!Dictionary.ready) {
			console.log('Dictionary class is not ready.  Call Sync Dictionary.');
			return 0;
		}
		text = text.toUpperCase();
		Dictionary.dictionary = Dictionary.dictionary.toUpperCase();

		/** Split the dictionary into an array. */
		let dictArray = Dictionary.dictionary.split(',');
		/** Split the input text into an array. */
		let textArray = text.split(' ');
		/** The total number of words in the input array. */
		let totalWords = textArray.length;
		/** The amount of words that are in our dictionary. */
		let realWordCount = 0;

		/** Check the words we've already used before hitting the whole dictionary. */
		let toRemove: string[] = [];
		textArray.forEach((word) => {
			if (this.usedWords.has(word)) {
				realWordCount++;
				toRemove.push(word);
			}
			/** Remove any words we know aren't real preemptively. */
			if(this.fakeWords.has(word)){
				toRemove.push(word);
			}
		});

		/** Any words that we've already used and found right now should be removed from the list we need to check the dicitonary for. */
		toRemove.forEach((word) => {
			let found = false;
			for (let i = 0; i < textArray.length && !found; i++) {
				if (textArray[i] == word) {
					found = true;
					for(let k = i; k < textArray.length - 1; k++){
						textArray[k] = textArray[k+1];
					}
					textArray.pop();
				}
			}
		});

		/** Loop through every word in the dictionary while we are not at 100% accuracy. */
		for (
			let i = 0;
			i < dictArray.length && realWordCount < totalWords && textArray.length > 0;
			i++
		) {
			let k = 0;
			while (k < textArray.length && textArray.length > 0) {
				if (textArray[k] == dictArray[i]) {
					realWordCount++;
					Dictionary.usedWords.add(textArray[k]);
					for (let j = k; j < textArray.length - 1; j++) {
						textArray[j] = textArray[j + 1];
					}
					textArray.pop();
				} else {
					k++;
				}
			}
		}

		while(textArray.length > 0){
			this.fakeWords.add(textArray.pop()!)
		}
		return realWordCount / totalWords;
	}
}

/** Function to assess if specified text is valid dictionary.  Stores results in storage array if so.*/
export function isValidDictionary(dictionary: string, storeData?: (d: string) => void): boolean {
	dictionary = dictionary.trim().toUpperCase();
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
		console.log('Falling back to default wordlist');
		localStorage.setItem('wordlist', await getSpecificWordlist('extrasmall.txt'));
		temp = browser && localStorage.getItem('wordlist');
	} else {
		if (typeof temp != 'string') {
			return '';
		} else {
			return temp;
		}
	}
}

/** Function to reduce a string of text to alphabetical characters and spaces. */
export function sanitizeInput(text: string): string {
	text = text.toUpperCase().replaceAll(/[ \t]{2,}/g, ' ');
	let output = '';
	for (let i = 0; i < text.length; i++) {
		if ((DEFAULT_ALPHABET + ' ').indexOf(text.charAt(i)) != -1) {
			output = output + text.charAt(i);
		}
	}
	return output;
}
