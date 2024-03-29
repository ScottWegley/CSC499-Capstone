import { CipherCracker } from '../Generic/CipherCrack';
import { PossibleCharacterSet } from './PossibleCharacterSet';

/** Class to bruteforce crack a Caesar Cipher encrypted piece of text. */
export class PermutationCrack extends CipherCracker {
	/** Stores pairings of letters in the alphabet to letters they might be.*/
	private possibleCharacters!: PossibleCharacterSet;

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
	private resetCharacterPossibilities(): void {
		this.possibleCharacters = new PossibleCharacterSet();
		this.updateComponents();
	}

	/** Returns a mapping of letters to the letters they might be. */
	public getPossibleCharacterSet(): PossibleCharacterSet {
		return this.possibleCharacters;
	}

	/** Removes specifies letters from the list of possibilities for a specified header letter. */
	public removeLettersFromPossible(inHeader: string, ...letters: string[]): void {
		letters.forEach((l) => {
			this.possibleCharacters.prunePossibleLetters(inHeader,l);
		});
		this.updateComponents();
	}
}
