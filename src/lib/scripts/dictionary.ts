/** This function loads the basic word list we provide from our text file. */
export async function getBasicWordList() {
	let response = await fetch('dictionary.txt');
	return (await response.text()).split('\n').toString();
}

/** Function to assess if specified text is valid dictionary.  Stores results in storage array if so.*/
export function isValidDictionary(dictionary: string, storeData?: (d: string) => void): boolean {
	dictionary = dictionary.trim().toLowerCase();
	dictionary = dictionary.replaceAll(',', '\n');
	let invalidCharacters = '0123456789`-=[]\\;\',./~!@#$%^&*()_+{}|:"<>?';

	for (let i = 0; i < invalidCharacters.length; i++) {
		if (dictionary.indexOf(invalidCharacters.charAt(i)) != -1) {
			alert(
				`Dictionary contained invalid character: ${invalidCharacters.charAt(i)} on Line ${i + 1}`
			);
			return false;
		}
	}

	let dictionaryArray = dictionary.split('\n');
	for (let i = 0; i < dictionaryArray.length; i++) {
		dictionaryArray[i] = dictionaryArray[i].trim();
		if (dictionaryArray[i].indexOf(' ') != -1) {
			alert(`Cannot have spaces in dictionary entries.  Line ${i + 1}`);
			return false;
		}
		if (!(dictionaryArray[i].length == 0)) {
			if (storeData) {
				storeData(dictionaryArray[i]);
			}
		}
	}
	return true;
}