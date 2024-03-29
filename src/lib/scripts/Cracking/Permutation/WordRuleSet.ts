import { sanitizeInput } from '$lib/scripts/Ciphers/Dictionary';

export class WordRuleSet {
	/** Stores the word used to generate the rule set. */
	private word: string = '';
	/** Stores a pairing of letter index to letter index of matching character in the original word. */
	private matchingChars: Map<number, number> = new Map<number, number>();

	/** Creates a new WordRuleSet used to find words similar to the specified word. */
	public constructor(inWord: string) {
		this.word = sanitizeInput(inWord);
		for (let i = 0; i < this.getWordLength() - 1; i++) {
			let matchFound = false;
			for (let k = i + 1; k < this.getWordLength() && !matchFound; k++) {
				if (this.word.charAt(i) == this.word.charAt(k)) {
					matchFound = true;
					this.matchingChars.set(i, k);
				}
			}
		}
	}

	/** The length of the word used to generate the rule set. */
	public getWordLength(): number {
		return this.word.length;
	}

	/** The word used to generate the rule set. */
	public getWord(): string {
		return this.word;
	}

	/** Analyze an inputted word and generate rules that similar words must follow. */
	public static generateWordRuleSet(inWord: string): WordRuleSet {
		return new WordRuleSet(inWord);
	}

	/** Returns a boolean representing whether the specified word is similar based on the rules in calling instance of WordRuleSet. */
	public isSimilar(inWord: string): boolean {
		inWord = sanitizeInput(inWord);
		let wordIsMatch: boolean = true;
		wordIsMatch = wordIsMatch && inWord.length == this.getWordLength();
		for(let i = 0; i < inWord.length - 1 && wordIsMatch; i++){
			for(let k = i+1; k < inWord.length && wordIsMatch; k++){
				if(this.matchingChars.get(i) == k){
					wordIsMatch = wordIsMatch && inWord.charAt(i) == inWord.charAt(k);
				} else {
					wordIsMatch = wordIsMatch && inWord.charAt(i) != inWord.charAt(k);
				}
			}
		}
		return wordIsMatch;
	}

	/** Returns a string representation of a WordRuleSet. */
	public toString(): string {
		let output = `Original Word: ${this.word}\n`;
		output += `Word Length: ${this.word.length}\n`;
		output += `Must Match Letters in Positions`;
		this.matchingChars.forEach((v, k) => {
			output += `\n${k}\t${v}`;
		});
		return output;
	}
}
