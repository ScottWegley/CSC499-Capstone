import { ResultsData } from './ResultData';

/** Base class with necessary functions  */
export abstract class CipherCracker {
	/** Stores the text to crack. */
	protected input: string;

	/** The minimum accuracy necessary for a result to be considered accurate. */
	protected accuracyThreshold: number = 0.95;
	/** The percentage of results to be displayed to the user. */
	protected returnPercentage: number = 1;
	/** Whether the results should be displayed in ascending order or descending order. */
	protected ascendingOrder: boolean = false;
	/** An array of all possible outputs. */
	protected resultSet: string[] = [];
	/** An array of accuracy ratings corresponding to all the possible results. */
	protected accuracySet: number[] = [];
	/** Create a new instance of a Cipher Cracker with text to crack. */
	public constructor(text: string, threshold?: number, percentage?: number, ascending?: boolean) {
		this.input = text;
		this.accuracyThreshold = threshold == undefined ? this.accuracyThreshold : threshold;
		this.returnPercentage = percentage == undefined ? this.returnPercentage : percentage;
		this.ascendingOrder = ascending == undefined ? this.ascendingOrder : ascending;
	}

	//#region Basic Getters
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
	//#endregion
	//#region Index Getters
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
	//#endregion
	/** Returns an instance of ResultsData with only the relevant data and the applied mutations stored.*/
	public static getMutatedResultsData(
		results: string[],
		accuracy: number[],
		ascending: boolean = false,
		threshold: number = 0,
		percentage: number = 1
	): ResultsData {
		CipherCracker.basedQuickSort(accuracy, [results]);
		let outResults: string[] = [];
		let outAccuracy: number[] = [];
		if (ascending) {
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
				let i = results.length - 1;
				i >= thresholdMin + Math.floor((1 - percentage) * (results.length - thresholdMin));
				i--
			) {
				outAccuracy.push(accuracy[i]);
				outResults.push(results[i]);
			}
		}
		return new ResultsData(outResults, outAccuracy, threshold, percentage, ascending);
	}
	/** Returns an insance of ResultsData with only the relevant data and the applied mutations stored.  Generated based
	 * on what's stored in our class.
	 */
	public getMutatedResultsData(
		ascending: boolean = true,
		threshold: boolean = true,
		percentage: boolean = true
	): ResultsData {
		return CipherCracker.getMutatedResultsData(
			this.resultSet,
			this.accuracySet,
			ascending ? this.ascendingOrder : undefined,
			threshold ? this.accuracyThreshold : undefined,
			percentage ? this.returnPercentage : undefined
		);
	}
	//#region QuickSort functions
	// Helper function to swap two elements in an array
	public static swap(items: any[], leftIndex: number, rightIndex: number) {
		const temp = items[leftIndex];
		items[leftIndex] = items[rightIndex];
		items[rightIndex] = temp;
	}
	// Helper function to find the partition position
	public static partition(
		array: number[],
		altArray: Array<Array<any>>,
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
				for (let k = 0; k < altArray.length; k++) {
					CipherCracker.swap(altArray[k], i, j);
				}
				i++;
				j--;
			}
		}
		return i;
	}
	/** Function to perform quicksort on multiple arrays based on the ordering of the first array. */
	public static basedQuickSort(
		array: number[],
		altArrays: Array<Array<any>>,
		left: number = 0,
		right: number = array.length - 1
	): number[] {
		if (array.length > 1) {
			const index = CipherCracker.partition(array, altArrays, left, right);
			if (left < index - 1) {
				CipherCracker.basedQuickSort(array, altArrays, left, index - 1);
			}
			if (index < right) {
				CipherCracker.basedQuickSort(array, altArrays, index, right);
			}
		}
		return array;
	}
	//#endregion
}
