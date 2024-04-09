import { DEFAULT_ALPHABET, Dictionary, getLetterIndex } from '$lib/scripts/Util/Dictionary';
import { basedQuickSort } from '$lib/scripts/Util/QuickSort';
import { CipherCracker } from '../Generic/CipherCrack';
import { PermutationResultData } from './PermutationResultData';
import { PossibleCharacterSet } from './PossibleCharacterSet';

/** Class to bruteforce crack a Caesar Cipher encrypted piece of text. */
export class PermutationCrack extends CipherCracker {
	/** Function to trigger rerendering for components that use data from this class. */
	public updateComponents: () => void;

	/** Creates a new permutation cracker for a specified text.  Accepts modifiers for the results data and functions to assist in web page reactivity. */
	public constructor(
		text: string,
		threshold?: number,
		percentage?: number,
		ascending?: boolean,
		storageFunction?: (w: string) => void,
		componentUpdateFunction?: () => void
	) {
		super(text, threshold, percentage, ascending, storageFunction);
		if (componentUpdateFunction) {
			this.updateComponents = componentUpdateFunction;
		} else this.updateComponents = () => {};
	}

	public static getMutatedResultsData(
		input: string,
		ascending: boolean = false,
		threshold: number = 0,
		percentage: number = 1,
		possibleChars: PossibleCharacterSet,
		storeRealWord: (word: string) => void
	) {
		let alphabets = possibleChars.requestPossibleAlphabets();
		let results: string[] = [];
		let accuracy: number[] = [];
		if (alphabets == undefined) {
			return;
		}
		alphabets.forEach((alpha) => {
			let resultText = '';
			for (let i = 0; i < input.length; i++) {
				if (DEFAULT_ALPHABET.includes(input.charAt(i))) {
					resultText += [...alpha][getLetterIndex(input.charAt(i))];
				} else {
					resultText += input.charAt(i);
				}
			}
			results.push(resultText);
			accuracy.push(Dictionary.checkAccuracy(resultText, storeRealWord));
		});
		let alphabetSet = [...alphabets!];
		basedQuickSort(accuracy, [results, alphabetSet]);
		let outResults: string[] = [];
		let outAccuracy: number[] = [];
		let outAlpabets: string[][] = [];
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
			outAlpabets.push(alphabetSet[i]);
		}
		return new PermutationResultData(
			!ascending ? outResults.reverse() : outResults,
			!ascending ? outAccuracy.reverse() : outAccuracy,
			!ascending ? outAlpabets.reverse() : outAlpabets,
			threshold,
			percentage,
			ascending
		);
	}

	/** Returns an insance of CaesarResultsData with only the relevant data and the applied mutations stored.  Generated based
	 * on what's stored in our class.
	 */
	public getMutatedResultsData(
		possibleChars: PossibleCharacterSet,
		ascending: boolean = true,
		threshold: boolean = true,
		percentage: boolean = true
	): PermutationResultData | undefined {
		return PermutationCrack.getMutatedResultsData(
			this.input,
			ascending ? this.ascendingOrder : undefined,
			threshold ? this.accuracyThreshold : undefined,
			percentage ? this.returnPercentage : undefined,
			possibleChars,
			this.storeRealWord
		);
	}
}
