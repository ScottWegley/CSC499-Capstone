export class ResultData {
	protected results: string[];
	protected accuracy: number[];

	protected threshold: number;
	protected percentage: number;
	protected ascending: boolean;

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
		return this.generateMutationHeader() + '\n' + this.prependAccuracyToResults();
	}

	/** Loop through every result, prepend the accuracy, return one big string with all the info. */
	protected prependAccuracyToResults(): string {
		let output = '';

		for (let i = 0; i < this.results.length; i++) {
			output =
				output +
				i +
				" || " +
				parseFloat((this.accuracy[i] * 100).toFixed(2)) +
				"% Accurate: " +
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

	public getResults(){
		return this.results;
	}

	public getAccuracy(){
		return this.accuracy;
	}

	public getThreshold(){
		return this.threshold;
	}

	public getPercentage(){
		return this.percentage;
	}	

	public getAscending() {
		return this.ascending;
	}

	public getResultCount() {
		return this.results.length;
	}
}
