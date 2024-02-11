import type { PageLoad } from './$types';

const ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/;

/* Inspired by the work done here https://ipdata.co/blog/how-to-get-the-ip-address-in-javascript/ */
export const load: PageLoad = async ({ fetch, params }) => {
	let item = '';
	await fetch('https://www.cloudflare.com/cdn-cgi/trace')
		.then((res) => res.text())
		.then((data) => (item = data));
	item = item.match(ipRegex)![0];
	return { item };
};
