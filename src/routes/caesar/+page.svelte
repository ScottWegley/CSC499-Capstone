<script lang="ts">
	import {
		Button,
		ButtonGroup,
		GradientButton,
		Heading,
		Listgroup,
		ListgroupItem,
		P,
		Range,
		Textarea,
		Tooltip
	} from 'flowbite-svelte';
	import VerticalStackButton from '$lib/components/VerticalStackButton.svelte';

	/** The default standard alphabet. */
	const DEFAULT_ALPHABET = [
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
		'G',
		'H',
		'I',
		'J',
		'K',
		'L',
		'M',
		'N',
		'O',
		'P',
		'Q',
		'R',
		'S',
		'T',
		'U',
		'V',
		'W',
		'X',
		'Y',
		'Z'
	];

	/** Stores the current shift being applied to the alphabet. */
	let currentShift = 0;

	/** A boolean to represent whether we are currently in encryption mode.  If false, we are in decryption mode. */
	let encryptionMode = true;

	/** Stores the text the user gives us. */
	let inputText = '';

	/** Stores the text we give back to the user. */
	let outputText = '';

	/** Function to return an alphabet shifted by a specified amount. */
	function getCipherAlphabet(shift: number) {
		while (shift < 0) {
			shift += 26;
		}
		let shiftedAlphabet = DEFAULT_ALPHABET.map((l) => l);
		for (let i = 0; i < 26; i++) {
			shiftedAlphabet[i] = DEFAULT_ALPHABET[(i + shift) % 26];
		}
		return shiftedAlphabet;
	}

	/** This function will either encrypt or decrypt our input text based on the current encryption mode. */
	function performOperation() {
		inputText = inputText.toUpperCase();
		outputText = encryptionMode
			? caesarEncryption(inputText, currentShift)
			: caesarDecryption(inputText, currentShift);
	}

	/** This function encrypts a given input with a Caesar Cipher of a specified shift. */
	function caesarEncryption(input: string, shift: number) {
		let shiftedAlphabet = getCipherAlphabet(shift);
		let output = "";
		for (let i = 0; i < input.length; i++) {
			let newChar = '';
			if(DEFAULT_ALPHABET.includes(input.charAt(i))){
				newChar = shiftedAlphabet[DEFAULT_ALPHABET.indexOf(input.charAt(i))];
			}
			output = output + (newChar == '' ? input.charAt(i) : newChar);
		}
		return output;
	}

	/** This function encrypts a given output with a Caesar Cipher of a specified shift. */
	function caesarDecryption(input: string, shift: number) {
		let shiftedAlphabet = getCipherAlphabet(shift);
		let output = "";
		for (let i = 0; i < input.length; i++) {
			let newChar = '';
			if(DEFAULT_ALPHABET.includes(input.charAt(i))){
				newChar = DEFAULT_ALPHABET[shiftedAlphabet.indexOf(input.charAt(i))];
			}
			output = output + (newChar == '' ? input.charAt(i) : newChar);
		}
		return output;
	}
</script>

<title>Home</title>

<div class="text-center">
	<Heading tag="h4" class="mb-4">Caesar Cipher</Heading>
	<P class="text-md mb-2 dark:text-gray-400 sm:px-16" align="center" size="sm">
		The Caesar Cipher is one of the oldest and most famous substitution ciphers. It works very
		simply, only requiring knowledge of the order of the alphabet. You replace every letter in a
		word with a letter a set distance away from it. For example, the word "Barnacle" becomes
		"Cbsobdmf" after a 1-Right Shift or "Azqmzbkd" after a 1-Left Shift.
	</P>
	<div class="flex flex-col justify-center">
		<div class="mb-1.5">
			<P align="center" class="text-sm dark:text-gray-400 sm:px-16">Current Shift: {currentShift}</P
			>
			<Range bind:value={currentShift} class="max-w-[75%]" min="-26" max="26"></Range>
		</div>
		<div class="flex flex-row justify-center" id="alphabetDisplayDiv">
			<div class="mb-1.5 mr-1 flex h-min min-w-fit flex-col rounded-lg shadow-sm">
				{#each DEFAULT_ALPHABET as letter}
					<VerticalStackButton size="xs" outline color="green">{letter}</VerticalStackButton>
				{/each}
			</div>
			<div class="mb-1.5 ml-1 mr-1.5 flex h-min min-w-fit flex-col rounded-lg shadow-sm">
				{#each getCipherAlphabet(currentShift) as letter}
					<VerticalStackButton size="xs" outline color="blue">{letter}</VerticalStackButton>
				{/each}
			</div>
			<div class="ml-3 flex min-w-[25%] flex-col">
				<Textarea
					placeholder="Input text"
					rows="4"
					bind:value={inputText}
					on:change={() => {
						inputText = inputText.toUpperCase();
					}}
				></Textarea>
				<GradientButton
					outline
					color="greenToBlue"
					class="mt-3"
					on:click={() => {
						encryptionMode = !encryptionMode;
					}}
					>Manual {encryptionMode ? 'Encryption' : 'Decryption'} using the shift you specified.
				</GradientButton>
				<Tooltip>Click to change to {!encryptionMode ? 'Encryption' : 'Decryption'}.</Tooltip>
				<GradientButton color="greenToBlue" class="mt-1.5" on:click={performOperation}
					>Run</GradientButton
				>
				<Textarea placeholder="Output text" rows="4" class="mt-3" disabled bind:value={outputText}
				></Textarea>
			</div>
		</div>
	</div>
</div>

<style>
</style>
