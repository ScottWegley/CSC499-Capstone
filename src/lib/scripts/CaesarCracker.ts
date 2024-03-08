import { caesarDecryption, DEFAULT_ALPHABET, getCipherAlphabet } from './caesarCipher';
import { checkAccuracy } from './dictionary';

export class CaesarCracker {
	/** Stores the text to crack. */
	private input: string;

	/** Stores the cracked text. */
	private output: string = '';

	/** The minimum accuracy necessary for a result to be considered accurate. */
	private accuracyThreshold: number = 0.95;

	/** An array of all possible outputs corresponding to all 26 possible Caesar Alphabets. */
	private resultSet: string[] = [];

    private accuracySet: number[] = [];

	/** Create a new instance of Caesar Cracking with text to crack. */
	public constructor(text: string, threshold?: number) {
		this.input = text;
		this.accuracyThreshold = threshold || this.accuracyThreshold;
	}

	public async crack() {
        for (let i = 0; i < DEFAULT_ALPHABET.length; i++) {
            this.resultSet.push(caesarDecryption(this.input, i));
			// this.accuracySet.push(await checkAccuracy(this.resultSet[i]));
        }
    }

	public getInput(): string {
		return this.input;
	}

	public getOutput(): string {
		return this.output;
	}

    public getResultSet(): string[] {
        return this.resultSet;
    }
}
