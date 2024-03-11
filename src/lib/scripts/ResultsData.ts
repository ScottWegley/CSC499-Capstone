export class ResultsData {
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
	public getResultsReport() {
		let output = '';

		output = `${`${this.ascending ? 'Ascending' : 'Descending'}`} Accuracy Report ${`w/ ${parseFloat((this.threshold * 100).toFixed(2))}% Threshold`}`;
		output = output + `\n${`Displaying ${this.percentage * 100}% of Results\n`}`;

		for (let i = 0; i < this.results.length; i++) {
			output =
				output +
				i +
				' || ' +
				parseFloat((this.accuracy[i] * 100).toFixed(2)) +
				"% Accurate: " +
				this.results[i] +
				'\n';
		}
		return output;
	}
}
