<script lang="ts">
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

	let currentShift = 0;

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
</script>

<title>Home</title>

<div class="text-center">
	<Heading tag="h4" class="mb-4">Caesar Cipher</Heading>
	<P class="mb-2 text-md dark:text-gray-400 sm:px-16" align="center" size="sm">
		The Caesar Cipher is one of the oldest and most famous substitution ciphers. It works very
		simply, only requiring knowledge of the order of the alphabet. For example, the word "Barnacle"
		becomes "Cbsobdmf" after a 1-Right Shift. It becomes "Azqmzbkd" after a 1-Left Shift.
	</P>
	<div class="flex flex-col justify-center">
		<div class="mb-1.5">
			<P align="center" class="text-sm dark:text-gray-400 sm:px-16">Current Shift: {currentShift}</P>
			<Range bind:value={currentShift} class="max-w-[75%]" min="-26" max="26"></Range>
		</div>
	</div>
</div>

<style>
</style>
