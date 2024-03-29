import { ResultData } from '../Generic/ResultData';

export class CaesarResultData extends ResultData {
	protected shifts: number[];

	public constructor(
		resultSet: string[],
		accuracySet: number[],
		caesarShifts: number[],
		accuracyThreshold: number,
		returnPercentage: number,
		ascendingOrder: boolean
	) {
		super(resultSet, accuracySet, accuracyThreshold, returnPercentage, ascendingOrder);
		this.shifts = caesarShifts;
	}

	/** Loop through every result, prepend the accuracy, return one big string with all the info. */
	protected override toString(): string {
		let output = '';

		for (let i = 0; i < this.results.length; i++) {
			output =
				output +
				"Shift " + this.shifts[i] + " || " +
				parseFloat((this.accuracy[i] * 100).toFixed(2)) +
				"% Accurate: " +
				this.results[i] +
				'\n';
		}
		return output;
	}

    public getShifts(): number[] {
        return this.shifts;
    }
}
