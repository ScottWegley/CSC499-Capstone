import { ResultData } from '../Generic/ResultData';

export class PermutationResultData extends ResultData {
	/** Stores all the alphabets corresponding to our results. */
    protected alphabets: string[][];

    public constructor(
		resultSet: string[],
		accuracySet: number[],
		alphabetArray: string[][],
		accuracyThreshold: number,
		returnPercentage: number,
		ascendingOrder: boolean
	) {
		super(resultSet, accuracySet, accuracyThreshold, returnPercentage, ascendingOrder);
		this.alphabets = alphabetArray;
	}
}