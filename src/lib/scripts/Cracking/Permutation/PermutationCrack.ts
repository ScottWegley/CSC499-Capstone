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

}
