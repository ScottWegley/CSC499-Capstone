<script lang="ts">
	import {
		Heading,
		P,
		ButtonGroup,
		CheckboxButton,
		FloatingLabelInput,
		Range,
		Label,
		Button
	} from 'flowbite-svelte';
	let demoPasswordLength = 12;
	let demoPassMin = 1;
	let demoPassMax = 64;
	let demoUppercase = false;
	let demoLowercase = false;
	let demoNumbers = false;
	let demoSpecial = false;

	const letterCount = 26; // ABCDEFGHIJKLMNOPQRSTUVWXYZ
	const numCount = 10; //0123456789
	const specialCount = 27 // `~!@#$%^&*()-_=+{}[]|;:?,<>

	$: demoPassComplexity = Math.pow((demoUppercase ? letterCount : 0) + (demoLowercase ? letterCount : 0) + (demoNumbers ? numCount : 0) + (demoSpecial ? specialCount : 0), demoPasswordLength);

	let demoPassword = "";

	let bruteforceActive = false;

	function generateSamplePassword() {
		let possibleChars = "";
		let password = "";
		if(demoUppercase){
			possibleChars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
		}
		if(demoLowercase){
			possibleChars += "abcdefghijklmnopqrstuvwxyz"
		}
		if(demoNumbers){
			possibleChars += "0123456789"
		}
		if(demoSpecial){
			possibleChars += "`~!@#$%^&*()-_=+{}[]|;:?,<>"
		}

		for (let i = 0; i < demoPasswordLength; i++) {
			password += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
		}

		demoPassword = password;

		return password;
	}
</script>

<title>Password Tool</title>

<div class="text-center">
	<Heading tag="h2" class="mb-4">Password Tool</Heading>
	<P class="mb-6 text-lg dark:text-gray-400 sm:px-16" align="center" size="sm">
		Passwords are a part of every day life and are used to guard information that is important.
		Given the value of the information we hide behind passwords, it's important to make sure our
		passwords are up to a standard so that malicious actors can't determine them. This tool
		calculates how complex any given password is and gives you an idea of how long it would take to
		break.
	</P>
	<div class="inline-block items-center justify-center text-left">
		<FloatingLabelInput size="small" disabled
			>Total Possible Passwords: {demoPassComplexity}
		</FloatingLabelInput>
		<ButtonGroup class="mb-3 mt-3">
			<CheckboxButton bind:checked={demoUppercase}>[A-Z] Uppercase Letters</CheckboxButton>
			<CheckboxButton bind:checked={demoLowercase}>[a-z] Lowercase Letters</CheckboxButton>
			<CheckboxButton bind:checked={demoNumbers}>[0-9] Numbers</CheckboxButton>
			<CheckboxButton bind:checked={demoSpecial}>[!#?] Special Characters</CheckboxButton>
		</ButtonGroup>
		<Button outline color="blue" on:click={(e) => {alert(generateSamplePassword())}}>Generate Sample Password</Button>
		<Label>Length: {demoPasswordLength}</Label>
		<Range bind:value={demoPasswordLength} min={demoPassMin} max={demoPassMax} />
	</div>
	<div class="max-w-screen-lg mx-auto">
		<P class="mb-6 text-lg dark:text-gray-400 sm:px-16" align="center" size="sm">
			If your passwords are completely random, one of the only remaining vulnerabitilities is brute force attacks.
			To prevent this, use complex passwords.  Lets see how secure you are with your selected password rules.
		</P>
	</div>
	<div class="inline-block items-center justify-center text-center">
		<Label class="min">
			Your Password: {demoPassword}
		</Label>
		<ButtonGroup class="mb-3 mt-3">
			<Button outline color="blue" on:click={(e) => {}}>Run Benchmark</Button>
			<Button outline color="blue" on:click={(e) => {}}>{bruteforceActive ? "Stop" : "Start"} Bruteforce</Button>
		</ButtonGroup>
	</div>
</div>

<style>
</style>
