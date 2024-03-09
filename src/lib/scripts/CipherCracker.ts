
/** Base class with necessary functions  */
export abstract class CipherCracker {
    /** Stores the text to crack. */
	protected input: string;

	/** The minimum accuracy necessary for a result to be considered accurate. */
	protected accuracyThreshold: number = 0.95;

	/** An array of all possible outputs. */
	protected resultSet: string[] = [];

	/** An array of accuracy ratings corresponding to all the possible results. */
	protected accuracySet: number[] = [];

	/** Create a new instance of a Cipher Cracker with text to crack. */
	public constructor(text: string, threshold?: number) {
		this.input = text;
		this.accuracyThreshold = threshold || this.accuracyThreshold;
	}

	/** Get the input text that we are attempting to decrypt. */
	public getInput(): string {
		return this.input;
	}

    public getAccuracyThreshold(): number {
        return this.accuracyThreshold;
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
		return CipherCracker.getMostAccurateIndex(this.resultSet, this.accuracySet);
	}

	/** Returns the index of the least accurate potential decryption. */
	public getLeastAccurateIndex(): number {
		return CipherCracker.getLeastAccurateIndex(this.resultSet, this.accuracySet);
	}

    /** Returns the index of the most accurate potential decryption in a specified result and accuracy array. */
	public static getMostAccurateIndex(results: string[], accuracy: number[]): number {
        let index = 0;
		let prevAccuracy = 0;
		for (let i = 1; i < results.length; i++) {
			if (accuracy[i] > prevAccuracy) {
				index = i;
				prevAccuracy = accuracy[i];
			}
		}
		return index;
	}
	
    
    /** Returns the index of the least accurate potential decryption in a specified result and accuracy array. */
    public static getLeastAccurateIndex(results: string[], accuracy: number[]) {
        let index = 0;
		let prevAccuracy = 1;
		for (let i = 1; i < results.length; i++) {
			if (accuracy[i] < prevAccuracy) {
				index = i;
				prevAccuracy = accuracy[i];
			}
		}
		return index;
	}
}
