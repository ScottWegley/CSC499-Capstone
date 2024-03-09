import { caesarDecryption, DEFAULT_ALPHABET, getCipherAlphabet } from './CaesarCipher';
import { checkAccuracy } from './Dictionary';

export class CaesarCracker {
	/** Stores the text to crack. */
	private input: string;

	/** The minimum accuracy necessary for a result to be considered accurate. */
	private accuracyThreshold: number = 0.95;

	/** An array of all possible outputs corresponding to all 26 possible Caesar Alphabets. */
	private resultSet: string[] = [];

	/** An array of accuracy ratings corresponding to all the possible results. */
	private accuracySet: number[] = [];

	/** Create a new instance of Caesar Cracking with text to crack. */
	public constructor(text: string, threshold?: number) {
		this.input = text;
		this.accuracyThreshold = threshold || this.accuracyThreshold;
	}

	/** Decrypt the input using all possible Caesar alphabets.  Store the resulting text and it's measured accuracy.*/
	public async crack() {
		for (let i = 0; i < DEFAULT_ALPHABET.length; i++) {
			this.resultSet.push(caesarDecryption(this.input, i));
			this.accuracySet.push(await checkAccuracy(this.resultSet[i]));
		}
	}

	/** Get the input text that we are attempting to decrypt. */
	public getInput(): string {
		return this.input;
	}

	/** Gets all possible decyrpted text. */
	public getResultSet(): string[] {
		return this.resultSet;
	}

	/** Gets the accuracy corresponding with all possible decrypted texts. */
	public getAccuracySet(): number[] {
		return this.accuracySet;
	}

	/** Prepends the accuracy to each possible decrypted text and returns them all. */
	public getResultsWithAccuracy(): string {
		let output = '';
		for (let i = 0; i < this.resultSet.length; i++) {
			output = output + parseFloat((this.accuracySet[i]*100).toFixed(2)) + "% Accurate: " + this.resultSet[i] + '\n';
		}
		return output;
	}

	/** Returns the index of the most accurate potential decryption. */
	public getMostAccurateIndex(): number {
		let index = 0;
		let prevAccuracy = 0;
		for (let i = 1; i < this.resultSet.length; i++) {
			if (this.accuracySet[i] > prevAccuracy) {
				index = i;
				prevAccuracy = this.accuracySet[i];
			}
		}
		return index;
	}

	/** Returns the index of the least accurate potential decryption. */
	public getLeastAccurateIndex(): number {
		let index = 0;
		let prevAccuracy = 1;
		for (let i = 1; i < this.resultSet.length; i++) {
			if (this.accuracySet[i] < prevAccuracy) {
				index = i;
				prevAccuracy = this.accuracySet[i];
			}
		}
		return index;
	}

	public static getMostAccurateIndex(results: string[], accuracy: number[]) {

	}

	public static getLeastAccurateIndex(results: string[], accuracy: number[]) {

	}
}
