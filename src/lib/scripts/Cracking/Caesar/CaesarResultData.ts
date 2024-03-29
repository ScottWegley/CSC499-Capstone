import { ResultData } from '../Generic/ResultData';

export class CaesarResultData extends ResultData {
	/** An array representing the offsets of the alphabets applied to generate the potential results. */
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
				'Shift ' +
				this.shifts[i] +
				' || ' +
				parseFloat((this.accuracy[i] * 100).toFixed(2)) +
				'% Accurate: ' +
				this.results[i] +
				'\n';
		}
		return output;
	}

	/** Returns an array of the offsets used to generate potential alphabets from the decryption process in the same order as the potential results they were applied to.'s */
	public getShifts(): number[] {
		return this.shifts;
	}
}
