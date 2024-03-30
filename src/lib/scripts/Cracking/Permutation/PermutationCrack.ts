import { DEFAULT_ALPHABET } from '$lib/scripts/Util/Dictionary';
import { CipherCracker } from '../Generic/CipherCrack';
import { PossibleCharacterSet } from './PossibleCharacterSet';

/** Class to bruteforce crack a Caesar Cipher encrypted piece of text. */
export class PermutationCrack extends CipherCracker {
	/** Stores pairings of letters in the alphabet to letters they might be.*/
	private possibleCharacters!: PossibleCharacterSet;

	/** Function to trigger rerendering for components that use data from this class. */
	public updateComponents: () => void;

	/** Creates a new permutation cracker for a specified text.  Accepts modifiers for the results data and functions to assist in web page reactivity. */
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
		if (text !== undefined) {
			this.resetCharacterPossibilities();
		}
	}


	/** Resets our mapping of letters to possible letters to default state, where every letter can be every letter. */
	private resetCharacterPossibilities(): void {
		this.possibleCharacters = new PossibleCharacterSet();
		DEFAULT_ALPHABET.forEach((c) => {
			if(this.input.indexOf(c) == -1){
				this.possibleCharacters.prunePossibleLetters(c,DEFAULT_ALPHABET);
			}
		});
		this.updateComponents();
	}

	/** Returns a mapping of letters to the letters they might be. */
	public getPossibleCharacterSet(): PossibleCharacterSet {
		return this.possibleCharacters;
	}

	/** Removes specifies letters from the list of possibilities for a specified header letter. */
	public removeLettersFromPossible(inHeader: string, ...letters: string[]): void {
		letters.forEach((l) => {
			this.possibleCharacters.prunePossibleLetters(inHeader, [l]);
		});
		this.updateComponents();
	}

	/** Returns report data for all possible alphabets applied to the input text.  Returns nothing if there number of possible alphabets is above the safe limit. */
	public fullReport(){
		if(this.possibleCharacters.calculatePossibleAlphabets() > this.possibleCharacters.getSafeGenerationLimit()){
			return;
		}
		// TODO: gen possible alphabets, apply them, apply mutators, populate results data.
	}

	public modifiedReport(){

	}
}
