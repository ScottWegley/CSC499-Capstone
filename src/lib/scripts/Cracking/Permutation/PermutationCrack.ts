import { DEFAULT_ALPHABET } from '$lib/scripts/Util/Dictionary';
import { CipherCracker } from '../Generic/CipherCrack';
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
		super(text, threshold, percentage, ascending);
		if (componentUpdateFunction) {
			this.updateComponents = componentUpdateFunction;
		} else this.updateComponents = () => {};
	}


	/** Returns report data for all possible alphabets applied to the input text.*/
	public fullReport(){
		
		// TODO: gen possible alphabets, apply them, apply mutators, populate results data.
	}
	
	/** Returns reports with modified data. */
	public modifiedReport(){

	}
}
