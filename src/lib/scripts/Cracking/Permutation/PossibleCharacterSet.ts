import { DEFAULT_ALPHABET } from '$lib/scripts/Util/Dictionary';

export class PossibleCharacterSet {
	private possibleChars: Map<string, Set<string>> = new Map<string, Set<string>>();

	/** Creates list of possible characters. */
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
		}
	}

	/** Returns the map storing our header characters and their possible character. */
	public getMap() {
		return this.possibleChars;
	}

	/** Returns the possible characters corresponding to a specified header character. */
	public getPossibilities(header: string) {
		return this.possibleChars.get(header) ?? new Set<string>();
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
	}

	/** Loosely accurate check for if a given word can exists in our possibilities. */
	public canContainWord(sourceWord: string, checkWord: string): boolean{
		let possible = true;
		for(let i = 0; i < sourceWord.length; i++){
			if(this.possibleChars.has(sourceWord.charAt(i))){
				possible = possible && this.possibleChars.get(sourceWord.charAt(i))!.has(checkWord.charAt(i));
			} else {
				possible = false;
			}
		}
		return possible;
	}

	/** Modifies the calling PossibleCharacterSet possibility sets, reducing them to only values that show up in both sets. */
	public reduceToOverlappingPossibilities(comparison: PossibleCharacterSet) {
		this.possibleChars.forEach((characterSet, header) => {
			if (comparison.getPossibilities(header).size != 0) {
				characterSet.forEach((c) => {
					if (!comparison.getPossibilities(header).has(c)) {
						this.possibleChars.get(header)!.delete(c);
					}
				});
			}
		});
	}

	/** Returns the number of alphabets we could generate based on the current possibilities. */
	public calculatePossibleAlphabets(): number {
		let total = 1;
		this.possibleChars.forEach((value) => {
			if (value.size != 0) {
				total *= value.size;
			}
		});
		return total;
	}

	/** Returns a string representation of the PossibleCharacterSet. */
	public toString(): string {
		let output = `Possible Character Set`;
		output += `\n ${this.calculatePossibleAlphabets()} Alphabets`;
		this.possibleChars.forEach((value, key) => {
			output += `\n${key}: ${[...value].toString()}`;
		});
		return output;
	}
}
