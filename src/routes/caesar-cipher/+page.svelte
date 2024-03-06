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
	import { DEFAULT_ALPHABET, caesarDecryption, caesarEncryption, getCipherAlphabet } from '$lib/scripts/caesarCipher';

	/** Stores the current shift being applied to the alphabet. */
	let currentShift = 1;

	/** A boolean to represent whether we are currently in encryption mode.  If false, we are in decryption mode. */
	let encryptionMode = true;

	/** Stores the text the user gives us. */
	let inputText = '';

	/** Stores the text we give back to the user. */
	let outputText = '';

	/** This function will either encrypt or decrypt our input text based on the current encryption mode. */
	function performOperation() {
		inputText = inputText.toUpperCase();
		outputText = encryptionMode
			? caesarEncryption(inputText, currentShift)
			: caesarDecryption(inputText, currentShift);
	}
</script>

<title>Home</title>

<div class="text-center">
	<Heading tag="h4" class="mb-4">Caesar Cipher</Heading>
	<P class="text-md mb-2 dark:text-gray-400 sm:px-16" align="center" size="sm">
		The Caesar Cipher is one of the oldest and most famous substitution ciphers. It works very
		simply, only requiring knowledge of the order of the alphabet. You replace every letter in a
		word with a letter a set distance away from it. For example, the word "BARNACLE" becomes
		"{caesarEncryption("BARNACLE",currentShift)}" after a {(currentShift < 0 ? currentShift * -1 : currentShift) + `-${(currentShift>0 ? "Right" : "Left")}`} Shift or "{caesarEncryption("BARNACLE",currentShift * -1)}" after a {(currentShift < 0 ? currentShift * -1 : currentShift) + `-${(currentShift>0 ? "Left" : "Right")}`} Shift.
	</P>
	<div class="flex flex-col justify-center">
		<div class="mb-1.5">
			<P align="center" class="text-sm dark:text-gray-400 sm:px-16">Current Shift: {currentShift}</P
			>
			<Range bind:value={currentShift} class="max-w-[35%]" min="-26" max="26"></Range>
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
					class="resize-none"
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
				<Textarea placeholder="Output text" rows="4" class="mt-3 resize-none" disabled bind:value={outputText}
				></Textarea>
			</div>
		</div>
	</div>
</div>

<style>
</style>
