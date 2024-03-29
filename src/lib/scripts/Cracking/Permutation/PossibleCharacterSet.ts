import { DEFAULT_ALPHABET } from '$lib/scripts/Ciphers/CaesarCipher';

export class PossibleCharacterSet {
	private possibleChars: Map<string, Set<string>> = new Map<string, Set<string>>();

	/** Creates list of possible characters. */
	public constructor(word?: string, matches?: string[]) {
		if (word !== undefined && matches !== undefined) {
			for (let charIndex = 0; charIndex < word.length; charIndex++) {
                if(this.possibleChars.get(word.charAt(charIndex)) == undefined){
                    this.possibleChars.set(word.charAt(charIndex),new Set<string>);
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
		return this.possibleChars.get(header) ?? new Set<string>;
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

    public toString(): string {
        let output = `Possible Character Set`;
        this.possibleChars.forEach((value,key)=>{
            output += `\n${key}: ${[...value].toString()}`
        });
        return output;
    }
}
