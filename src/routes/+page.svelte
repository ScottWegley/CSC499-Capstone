<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<title>Home</title>

<div class="homediv">
	<h1 id="hometitle">Cybersecurity and You</h1>
	<p>
		Welcome to my Cybersecurity website! While I'm by no means an expert on the subject, this site
		does serve as my personal collection of knowledge and tools related to my exploration of the
		subject. Don't expect anything fancy, but once your expectations have been lowered there are
		definitely some interesting tools here, most of which pertain to Cryptography! As a fun little
		opener, here is your IP Address: <span id="ipaddress">{data.item}</span>! One of the first
		things that was ever added to this site is the ability to determine your ip address. It only
		took one Google search to figure out! Someone who knows your IP Address can use that to create
		lots of issues in your life. One of the easiest to implement Cybersecurity tips I can offer is
		just use a VPN.
		<a href="https://protonvpn.com/">Here</a> is a link to a free VPN that I personally trust and advise
		people to use. They have a free tier with unlimited data, and paid tiers if you're looking for more
		premium features!
	</p>
</div>

<style>
	.homediv {
		text-align: center;
		display: block;
		margin: 20px auto;
	}
</style>
