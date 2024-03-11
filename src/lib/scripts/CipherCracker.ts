/** Base class with necessary functions  */
export abstract class CipherCracker {
	/** Stores the text to crack. */
	protected input: string;

	/** The minimum accuracy necessary for a result to be considered accurate. */
	protected accuracyThreshold: number = 0.95;
	/** The percentage of results to be displayed to the user. */
	protected returnPercentage: number = 1;

	/** An array of all possible outputs. */
	protected resultSet: string[] = [];

	/** An array of accuracy ratings corresponding to all the possible results. */
	protected accuracySet: number[] = [];

	/** Create a new instance of a Cipher Cracker with text to crack. */
	public constructor(text: string, threshold?: number, percentage?: number) {
		this.input = text;
		this.accuracyThreshold = (threshold == undefined ? this.accuracyThreshold : threshold)
		this.returnPercentage = (percentage == undefined ? this.returnPercentage : percentage);
		console.log(`Creating a Cipher Cracker with threshold of ${this.accuracyThreshold} and percentage ${this.returnPercentage}`);

	}

	/** Get the input text that we are attempting to decrypt. */
	public getInput(): string {
		return this.input;
	}

	/** Gets the minimum accuracy threshold for the cracker. */
	public getAccuracyThreshold(): number {
		return this.accuracyThreshold;
	}

	/** Gets the return percentage for the cracker. */
	public getReturnPercentage(): number {
		return this.returnPercentage;
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
		let output = 'Unsorted Accuracy Breakdown\n';
		for (let i = 0; i < this.resultSet.length; i++) {
			output =
				output + i+ " || " +
				parseFloat((this.accuracySet[i] * 100).toFixed(2)) +
				'% Accurate: ' +
				this.resultSet[i] +
				'\n';
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

	/** Returns a list of of results, prepended with accuracy, in ascending or descending order and thresholded if a threshold is provided. */
	public static getResultsSortedByAccuracy(
		results: string[],
		accuracy: number[],
		ascending: boolean,
		threshold: number = 0,
		percentage: number = -1
	) {
		CipherCracker.pairedQuickSort(accuracy, results);
		let output = `${ascending ? 'Ascending' : 'Descending'} Accuracy Breakdown w/ Threshold ${parseFloat((threshold * 100).toFixed(2))}%\n`;
		if (ascending) {
			/** If we are using a percentage */
			if (percentage != -1) {
				let thresholdMin = 0;
				let stillSearching = true;
				for (let i = 0; i < results.length && stillSearching; i++) {
					if (accuracy[i] < threshold) {
						thresholdMin++;
						continue;
					} else {
						stillSearching = false;
					}
					
				}
				output = output + `Displaying ${percentage*100}%\n`;
				for (let i = thresholdMin + Math.floor((1-percentage) * (results.length - thresholdMin)); i < results.length; i++) {
					output =
						output + i + " || " + 
						parseFloat((accuracy[i] * 100).toFixed(2)) +
						'% Accurate: ' +
						results[i] +
						'\n';
					
				}
			} else {
				for (let i = 0; i < results.length; i++) {
					if (accuracy[i] < threshold) {
						continue;
					}
					output =
						output +
						parseFloat((accuracy[i] * 100).toFixed(2)) +
						'% Accurate: ' +
						results[i] +
						'\n';
				}
			}
		} else {
			for (let i = results.length - 1; i >= 0; i--) {
				if (accuracy[i] < threshold) {
					continue;
				}
				output =
					output + parseFloat((accuracy[i] * 100).toFixed(2)) + '% Accurate: ' + results[i] + '\n';
			}
		}
		return output;
	}

	/** Returns a list of of results, prepended with accuracy, in ascending or descending order and thresholded if a threshold is provided.  The results will be cut to a percentage if percent limiting is enabled. */
	public getResultsSortedByAccuracy(
		ascending: boolean,
		threshold: boolean = false,
		percentage: boolean = false
	): string {
		return CipherCracker.getResultsSortedByAccuracy(
			this.resultSet,
			this.accuracySet,
			ascending,
			threshold ? this.accuracyThreshold : undefined,
			percentage ? this.returnPercentage : undefined
		);
	}

	// Helper function to swap two elements in an array
	public static swap(items: any[], leftIndex: number, rightIndex: number) {
		const temp = items[leftIndex];
		items[leftIndex] = items[rightIndex];
		items[rightIndex] = temp;
	}

	// Helper function to find the partition position
	public static partition(
		array: number[],
		array2: string[],
		left: number = 0,
		right: number = array.length - 1
	): number {
		const pivot = array[Math.floor((right + left) / 2)]; // middle element
		let i = left; // left pointer
		let j = right; // right pointer
		while (i <= j) {
			while (array[i] < pivot) {
				i++;
			}
			while (array[j] > pivot) {
				j--;
			}
			if (i <= j) {
				CipherCracker.swap(array, i, j); // swap two elements
				CipherCracker.swap(array2, i, j);
				i++;
				j--;
			}
		}
		return i;
	}

	/** Function to perform quicksort on two arrays based on the ordering of the first array. */
	public static pairedQuickSort(
		array: number[],
		array2: string[],
		left: number = 0,
		right: number = array.length - 1
	): number[] {
		if (array.length > 1) {
			const index = CipherCracker.partition(array, array2, left, right);
			if (left < index - 1) {
				CipherCracker.pairedQuickSort(array, array2, left, index - 1);
			}
			if (index < right) {
				CipherCracker.pairedQuickSort(array, array2, index, right);
			}
		}
		return array;
	}
}
