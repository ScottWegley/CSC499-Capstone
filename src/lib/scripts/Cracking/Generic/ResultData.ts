export class ResultData {
	/** An array of potential results. */
	protected results: string[];
	/** An array of accuracy ratings in the order of the results they represent. */
	protected accuracy: number[];

	/** The minimum accuracy that a result must have been to be stored. */
	protected threshold: number;
	/** The percentage of the total results that were stored in this class. */
	protected percentage: number;
	/** Whether the results were stored in ascending order. */
	protected ascending: boolean;

	/** Creates an instance of results data with the results, corresponding accuracy, and the thresholds, percentages, and other mutators applied to the result before storage. */
	public constructor(
		resultSet: string[],
		accuracySet: number[],
		accuracyThreshold: number,
		returnPercentage: number,
		ascendingOrder: boolean
	) {
		this.results = resultSet;
		this.accuracy = accuracySet;
		this.threshold = accuracyThreshold;
		this.percentage = returnPercentage;
		this.ascending = ascendingOrder;
	}

	/** Generated report connecting accuracy to results and displaying applied mutations. */
	public getResultsReport(): string {
		return this.generateMutationHeader() + '\n' + this.toString();
	}

	/** Loop through every result, prepend the accuracy, return one big string with all the info. */
	protected toString(): string {
		let output = '';

		for (let i = 0; i < this.results.length; i++) {
			output =
				output +
				i +
				' || ' +
				parseFloat((this.accuracy[i] * 100).toFixed(2)) +
				'% Accurate: ' +
				this.results[i] +
				'\n';
		}
		return output;
	}

	/** Generates a Report Header based on specified mutations. */
	protected generateMutationHeader(): string {
		let output = `${`${this.ascending ? 'Ascending' : 'Descending'}`} Accuracy Report ${`w/ ${parseFloat((this.threshold * 100).toFixed(2))}% Threshold`}`;
		output = output + `\n${`Displaying ${this.percentage * 100}% of Results`}`;
		return output;
	}

	// #region Accessors
	/** Returns an array of strings containing all the results stored in this class. */
	public getResults(): string[] {
		return this.results;
	}
	/** Returns an array of results corresponding to the results stored in this class. */
	public getAccuracy(): number[] {
		return this.accuracy;
	}
	/** Returns the accuracy threshold that was applied to these results. */
	public getThreshold(): number {
		return this.threshold;
	}
	/** Returns the percentage of the total results this class contains. */
	public getPercentage(): number {
		return this.percentage;
	}
	/** Returns a boolean representing whether or not the results are stored in ascending or descending order. */
	public getAscending(): boolean {
		return this.ascending;
	}
	/** Returns the number of results stored in this class. */
	public getResultCount(): number {
		return this.results.length;
	}
	// #endregion
}
