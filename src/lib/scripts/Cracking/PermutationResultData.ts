import { ResultData } from './ResultData';

export class PermutationResultData extends ResultData {
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