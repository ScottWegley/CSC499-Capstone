import { DEFAULT_ALPHABET, getLetterIndex } from '$lib/scripts/Util/Dictionary';
import { basedQuickSort } from '$lib/scripts/Util/QuickSort';

export class PossibleCharacterSet {
	/** Maps characters to the list of possible equivalent characters. */
	private possibleChars: Map<string, Set<string>> = new Map<string, Set<string>>();
	/** The limit on how many alphabets you should safely iterate over before risking browser crashes. */
	private static safeGenerationLimit: number = 100_000_000;
	/** A boolean representing whether we should bother checking generation limits. */
	private static safeMode: boolean = true;

	private static updateComponents: () => void = () => {
		console.log("Component Update Function not assigned.")
	}

	/** Creates list of possible characters. If you specify a word and matches,
	 * it will populate the set with the letters present in the word and the
	 * corresponding letters form the matches.  If you specify only a word,
	 * it will set every letter not in the word to an empty set.
	 * */
	public constructor(word?: string, matches?: string[]) {
		if (word !== undefined && matches !== undefined) {
			for (let charIndex = 0; charIndex < word.length; charIndex++) {
				if (this.possibleChars.get(word.charAt(charIndex)) == undefined) {
					this.possibleChars.set(word.charAt(charIndex), new Set<string>());
				}
				matches.forEach((match) => {
					this.possibleChars.get(word.charAt(charIndex))!.add(match.charAt(charIndex));
				});
			}
		} else {
			for (let i = 0; i < DEFAULT_ALPHABET.length; i++) {
				this.possibleChars.set(DEFAULT_ALPHABET[i], new Set<string>(DEFAULT_ALPHABET));
			}
			if (word !== undefined) {
				DEFAULT_ALPHABET.forEach((c) => {
					if (word.indexOf(c) == -1) {
						this.prunePossibleLetters(c, DEFAULT_ALPHABET);
					}
				});
			}
		}
		PossibleCharacterSet.updateComponents();

	}

	/** Returns the map storing our header characters and their possible character. */
	public getMap() {
		return this.possibleChars;
	}

	/** Disables safety features of this class. */
	public static disableSafety() {
		this.safeMode = false;
	}

	/** Enables safety features of this class. */
	public static enableSafety() {
		this.safeMode = true;
	}

	/** Sets the function used to update components that listen to this class. */
	public static setUpdateFunction(updateFunction: () => void){
		this.updateComponents = updateFunction;
	}

	/** Returns the limit on how many alphabets you can safely iterate over before the browser crashes. */
	public static getSafeGenerationLimit(): number {
		return this.safeGenerationLimit;
	}

	/** Returns a list of all possible alphabets.  Function will exit prematurely if there are too many possibilities.*/
	public requestPossibleAlphabets() {
		let starttime = Date.now();
		if (
			this.calculateCombinationsOvercorrection() > PossibleCharacterSet.safeGenerationLimit &&
			PossibleCharacterSet.safeMode
		) {
			console.log('Too many possible alphabets, aborting.');
			return;
		}
		let allAlphabets: Set<string[]> = new Set<string[]>();
		this.generateAlphabet([], '', this.getRelevantHeaders(), (alphabet: string[]) => {
			allAlphabets.add(alphabet);
		});
		console.log(`Generated ${allAlphabets.size} Alphabets in ${(Date.now()-starttime)/1000} Seconds`)
		return allAlphabets;
	}

	/** Return a collection of headers that have possibilities. */
	public getRelevantHeaders(): Set<string> {
		let headers: Set<string> = new Set<string>();
		this.possibleChars.forEach((characters, header) => {
			if (characters.size != 0) {
				headers.add(header);
			}
		});
		return headers;
	}

	private generateAlphabet(
		prevIteration: string[],
		prevHeader: string,
		validHeaders: Set<string>,
		storeAlphabet: (alphabet: string[]) => void
	) {
		let currentIteration = [...prevIteration];
		if (prevHeader == 'Z') {
			storeAlphabet(currentIteration);
		} else {
			let curHeader: string =
				prevHeader == '' ? 'A' : DEFAULT_ALPHABET[getLetterIndex(prevHeader) + 1];
			if (!validHeaders.has(curHeader)) {
				this.generateAlphabet([...currentIteration, '?'], curHeader, validHeaders, storeAlphabet);
			} else {
				let toTraverse: string[] = [];
				this.getPossibilitiesForLetter(curHeader).forEach((letter) => {
					if (currentIteration.indexOf(letter) == -1) {
						toTraverse.push(letter);
					}
				});
				toTraverse.forEach((letter) => {
					this.generateAlphabet(
						[...currentIteration, letter],
						curHeader,
						validHeaders,
						storeAlphabet
					);
				});
			}
		}
	}

	/** Returns the possible characters corresponding to a specified header character. */
	public getPossibilitiesForLetter(header: string) {
		return this.possibleChars.get(header) ?? new Set<string>();
	}

	public setPossibilitiesForLetter(header: string, possibilities: Set<string>) {
		this.possibleChars.set(header, possibilities);
		this.removeSolvedLetters();
	}

	/** Removes specified letters from the list of possible characters corresponding to a specified header character. */
	public prunePossibleLetters(header: string, letters: string[]) {
		letters.forEach((character) => {
			if (
				this.possibleChars.get(header)?.has(character) &&
				this.possibleChars.get(header) != undefined
			) {
				this.possibleChars.get(header)!.delete(character);
			}
		});
		this.removeSolvedLetters();
	}

	/** Loosely accurate check for if a given word can exists in our possibilities. */
	public canContainWord(sourceWord: string, checkWord: string): boolean {
		let possible = true;
		for (let i = 0; i < sourceWord.length; i++) {
			if (this.possibleChars.has(sourceWord.charAt(i))) {
				possible =
					possible && this.possibleChars.get(sourceWord.charAt(i))!.has(checkWord.charAt(i));
			} else {
				possible = false;
			}
		}
		return possible;
	}

	/** Modifies the calling PossibleCharacterSet possibility sets, reducing them to only values that show up in both sets. */
	public reduceToOverlappingPossibilities(comparison: PossibleCharacterSet) {
		this.possibleChars.forEach((characterSet, header) => {
			if (comparison.getPossibilitiesForLetter(header).size != 0) {
				characterSet.forEach((c) => {
					if (!comparison.getPossibilitiesForLetter(header).has(c)) {
						this.prunePossibleLetters(header, [c]);
					}
				});
			}
		});
	}

	/** Overwrites the calling PossibleCharacterSet with the data from another set. */
	public overwrite(source: PossibleCharacterSet) {
		this.possibleChars.forEach((characterSet, header) => {
			this.possibleChars.set(header,source.getPossibilitiesForLetter(header));
		})
	}

	/** Function to check every set of possible characters.  If a character only has one possibility, remove that possibility from all other characters. */
	public removeSolvedLetters() {
		this.possibleChars.forEach((checkSet, checkKey) => {
			if (checkSet.size == 1) {
				this.possibleChars.forEach((modSet, modKey) => {
					if (modKey != checkKey) {
						modSet.delete([...checkSet][0]);
					}
				});
			}
		});
		PossibleCharacterSet.updateComponents();
	}

	/** Returns the number of combinations we could generate based on the current possibilities. */
	public calculateCombinations(): number {
		let total = 1;
		this.possibleChars.forEach((value) => {
			if (value.size != 0) {
				total *= value.size;
			}
		});
		return total;
	}

	/** Calculates a slightly more accurate number of alphabet combinations */
	public calculateCombinationsOvercorrection(): number {
		let sizes: number[] = [];
		this.possibleChars.forEach((value) => {
			sizes.push(value.size);
		});
		basedQuickSort(sizes);
		let total = sizes[sizes.length - 1];
		let currentMax = total - 1;
		let logString = `${total} * `;
		for (let i = sizes.length - 2; i >= 0; i--) {
			let toMult = 1;
			if (sizes[i] > currentMax) {
				toMult = currentMax;
			} else {
				toMult = sizes[i];
				currentMax = sizes[i];
			}

			if (toMult < 1) {
				toMult = 1;
			}
			total *= toMult;
			logString += `${toMult} * `;
			currentMax--;
		}
		return total;
	}

	/** Returns a string representation of the PossibleCharacterSet. */
	public toString(): string {
		let output = `Possible Character Set`;
		output += `\n ${this.calculateCombinationsOvercorrection()} Alphabets`;
		this.possibleChars.forEach((value, key) => {
			output += `\n${key}: ${[...value].toString()}`;
		});
		return output;
	}
}
