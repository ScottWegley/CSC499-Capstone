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
	private resetCharacterPossibilities(): void {
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
	public getPossibleCharacterSet(): {
		header: string;
		possible: string[];
	}[] {
		return this.possibleCharacters;
	}

	/** Returns a list of possible letters for a specified letter. */
	public getPossibleCharacters(letter: string): string[] {
		return this.possibleCharacters[getLetterIndex(letter.charAt(0))].possible;
	}

	/** Removes specifies letter from the list of possibilities for a specified header letter. */
	public removeLettersFromPossible(inHeader: string, ...letters: string[]): void {
		letters.forEach((l) => {
			if (this.possibleCharacters[getLetterIndex(inHeader)].possible.indexOf(l) != -1) {
				this.possibleCharacters[getLetterIndex(inHeader)].possible.splice(
					this.possibleCharacters[getLetterIndex(inHeader)].possible.indexOf(l),
					1
				);
			}
		});
		this.updateComponents();
	}

	/** Return the predicted number of possible alphabets, defaulting to the toal octual possible number if our prediction is too large. */
	public getCurrentPossibleAlphabets(): number {
		let total =
			this.possibleCharacters[0].possible.length == 0
				? 1
				: this.possibleCharacters[0].possible.length;
		for (let index = this.possibleCharacters.length - 1; index > 0; index--) {
			total *=
				this.possibleCharacters[index].possible.length == 0
					? 1
					: this.possibleCharacters[index].possible.length;
		}
		return total;
	}
}
