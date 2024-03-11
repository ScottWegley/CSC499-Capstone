/** Base class with necessary functions  */
export abstract class CipherCracker {
	/** Stores the text to crack. */
	protected input: string;

	/** The minimum accuracy necessary for a result to be considered accurate. */
	protected accuracyThreshold: number = 0.95;
	/** The percentage of results to be displayed to the user. */
	protected returnPercentage: number = 1;
	/** Whether the results should be displayed in ascending order or descending order. */
	protected ascendingOrder:boolean = false;

	/** An array of all possible outputs. */
	protected resultSet: string[] = [];

	/** An array of accuracy ratings corresponding to all the possible results. */
	protected accuracySet: number[] = [];

	/** Create a new instance of a Cipher Cracker with text to crack. */
	public constructor(text: string, threshold?: number, percentage?: number, ascending?:boolean) {
		this.input = text;
		this.accuracyThreshold = threshold == undefined ? this.accuracyThreshold : threshold;
		this.returnPercentage = percentage == undefined ? this.returnPercentage : percentage;
		this.ascendingOrder = ascending == undefined ? this.ascendingOrder : ascending;
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
	public getResultsReport(): string {
		return CipherCracker.getResultsReport([this.resultSet, this.accuracySet]);
	}
	/** Prepends the accuracy to each possible decrypted text and returns them all. If mutations are specified, they will be noted. */
	public static getResultsReport(set: [results: string[], accuracy: number[]], threshold?:number, percentage?:number, ascending?:boolean): string {
		let output = '';
		if(!(threshold == undefined && percentage == undefined && ascending == undefined)){
			output = `${ascending == undefined ? '' : `${ascending ? "Ascending" : "Descending"}`} Accuracy Report ${threshold == undefined ? '' : `w/ ${parseFloat((threshold * 100).toFixed(2))}% Threshold`}`;
			output = output + `\n${percentage == undefined ? '' : `Displaying ${percentage * 100}% of Results\n`}`;
		} else {
			output = "Unsorted Accuracy Breakdown\n";
		}
		for (let i = 0; i < set[0].length; i++) {
			output =
				output +
				i +
				' || ' +
				parseFloat((set[1][i] * 100).toFixed(2)) +
				'% Accurate: ' +
				set[0][i] +
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
	/** Returns a tuple of of results and accuracy, in ascending or descending order and thresholded if a threshold is provided. */
	public static getMutatedResultsAndAccuracy(
		results: string[],
		accuracy: number[],
		ascending: boolean = false,
		threshold: number = 0,
		percentage: number = -1
	): [results: string[], accuracy: number[]] {
		CipherCracker.pairedQuickSort(accuracy, results);
		let outResults: string[] = [];
		let outAccuracy: number[] = [];
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
				for (
					let i = thresholdMin + Math.floor((1 - percentage) * (results.length - thresholdMin));
					i < results.length;
					i++
				) {
					outAccuracy.push(accuracy[i]);
					outResults.push(results[i]);
				}
			} else {
				for (let i = 0; i < results.length; i++) {
					if (accuracy[i] < threshold) {
						continue;
					}
					outAccuracy.push(accuracy[i]);
					outResults.push(results[i]);
				}
			}
		} else {
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
				for (
					let i = results.length-1;
					i >= thresholdMin + Math.floor((1 - percentage) * (results.length - thresholdMin));
					i--
				) {
					outAccuracy.push(accuracy[i]);
					outResults.push(results[i]);
				}
			} else {
				for (let i = results.length - 1; i >= 0; i--) {
					if (accuracy[i] < threshold) {
						continue;
					}
					outAccuracy.push(accuracy[i]);
					outResults.push(results[i]);
				}
			}
		}
		return [outResults, outAccuracy];
	}
	/** Returns a list of of results, prepended with accuracy, in ascending or descending order and thresholded if a threshold is provided.  The results will be cut to a percentage if percent limiting is enabled. */
	public getMutatedResultsAndAccuracy(
		ascending: boolean,
		threshold: boolean = false,
		percentage: boolean = false
	): [results: string[], accuracy: number[]] {
		return CipherCracker.getMutatedResultsAndAccuracy(
			this.resultSet,
			this.accuracySet,
			ascending ? this.ascendingOrder : undefined,
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
