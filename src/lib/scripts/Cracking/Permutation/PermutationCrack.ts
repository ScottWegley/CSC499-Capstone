import { DEFAULT_ALPHABET, getLetterIndex } from '../../Ciphers/CaesarCipher';
import { CipherCracker } from '../CipherCrack';

/** Class to bruteforce crack a Caesar Cipher encrypted piece of text. */
export class PermutationCrack extends CipherCracker {
	/** Stores pairings of letters in the alphabet to letters they might be.*/
	private possibleCharacters: { header: string; possible: string[] }[] = [];

	public constructor(
		text: string,
		threshold?: number,
		percentage?: number,
		ascending?: boolean,
		storageFunction?: (w: string) => void,
		componentUpdateFunction?: () => void
	) {
		super(text, threshold, percentage, ascending);
		if (componentUpdateFunction) {
			this.updateComponents = componentUpdateFunction;
		} else this.updateComponents = () => {};
		this.resetCharacterPossibilities();
	}

	public updateComponents: () => void;

	/** Resets our mapping of letters to possible letters to default state, where every letter can be every letter. */
	private resetCharacterPossibilities() {
		this.possibleCharacters = [];
		for (let i = 0; i < DEFAULT_ALPHABET.length; i++) {
			this.possibleCharacters.push({
				header: DEFAULT_ALPHABET[i],
				possible: [...DEFAULT_ALPHABET]
			});
		}
		this.updateComponents();
	}

	/** Returns a mapping of letters to the letters they might be. */
	public getPossibleCharacterSet() {
		return this.possibleCharacters;
	}

	/** Returns a list of possible letters for a specified letter. */
	public getPossibleCharacters(letter: string) {
		return this.possibleCharacters[getLetterIndex(letter.charAt(0))].possible;
	}
}
