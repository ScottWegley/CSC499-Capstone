import { caesarDecryption, DEFAULT_ALPHABET } from './CaesarCipher';
import { CipherCracker } from './CipherCracker';
import { checkAccuracy } from './Dictionary';

/** Class to bruteforce crack a Caesar Cipher encrypted piece of text. */
export class CaesarCracker extends CipherCracker {

	/** Create a new instance of Caesar Cracking with text to crack. */
	public constructor(text: string, threshold?: number, percentage?:number, ascending?:boolean) {
		super(text, threshold, percentage, ascending);
	}

	/** Decrypt the input using all possible Caesar alphabets.  Store the resulting text and it's measured accuracy.*/
	public async crack() {
		for (let i = 1; i < DEFAULT_ALPHABET.length; i++) {
			this.resultSet.push(caesarDecryption(this.input, i));
			this.accuracySet.push(await checkAccuracy(this.resultSet[i-1]));
		}
	}
}
