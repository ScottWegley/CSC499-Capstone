import { caesarDecryption } from '../../Ciphers/CaesarCipher';
import { CipherCracker } from '../Generic/CipherCrack';
import { CaesarResultData } from './CaesarResultData';
import { DEFAULT_ALPHABET, Dictionary } from '../../Util/Dictionary';
import { basedQuickSort } from '$lib/scripts/Util/QuickSort';

/** Class to bruteforce crack a Caesar Cipher encrypted piece of text. */
export class CaesarCrack extends CipherCracker {
	/** Stores the Caesar Alphabet shifts corresponding to each potential decrypted text. */
	protected shiftSet: number[] = [];



	/** Create a new instance of Caesar Cracking with text to crack.  Subsequently cracks the text. */
	public constructor(text: string, threshold?: number, percentage?: number, ascending?: boolean, storageFunction?: (w: string) => void) {
		super(text, threshold, percentage, ascending);
		for (let i = 0; i < DEFAULT_ALPHABET.length; i++) {
			this.resultSet.push(caesarDecryption(this.input, i));
			this.accuracySet.push(Dictionary.checkAccuracy(this.resultSet[i]));
			this.shiftSet.push(i);
		}
	}

	/** Returns an array of offsets in order of the potential decryptions they correspond to. */
	public getShiftSet(): number[] {
		return this.shiftSet;
	}

	/** Returns an instance of CaesarResultsData with only the relevant data and the applied mutations stored.*/
	public static getMutatedResultsData(
		results: string[],
		accuracy: number[],
		shifts: number[],
		ascending: boolean = false,
		threshold: number = 0,
		percentage: number = 1
	): CaesarResultData {
		basedQuickSort(accuracy, [results, shifts]);
		let outResults: string[] = [];
		let outAccuracy: number[] = [];
		let outShift: number[] = [];
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
			outShift.push(shifts[i]);
		}
		return new CaesarResultData(
			!ascending ? outResults.reverse() : outResults,
			!ascending ? outAccuracy.reverse() : outAccuracy,
			!ascending ? outShift.reverse() : outShift,
			threshold,
			percentage,
			ascending
		);
	}
	/** Returns an insance of CaesarResultsData with only the relevant data and the applied mutations stored.  Generated based
	 * on what's stored in our class.
	 */
	public getMutatedResultsData(
		ascending: boolean = true,
		threshold: boolean = true,
		percentage: boolean = true
	): CaesarResultData {
		return CaesarCrack.getMutatedResultsData(
			this.resultSet,
			this.accuracySet,
			this.shiftSet,
			ascending ? this.ascendingOrder : undefined,
			threshold ? this.accuracyThreshold : undefined,
			percentage ? this.returnPercentage : undefined
		);
	}
}
