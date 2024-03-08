import { browser } from "$app/environment";
import { getSpecificWordlist } from "$lib/scripts/dictionary";

export const prerender = true;


/** @type {import('./$types').LayoutLoad} */
export async function load() {
    if(browser && localStorage.getItem("wordlist") == null){
        localStorage.setItem("wordlist", await getSpecificWordlist("10k.txt"));
    }
    return {
        temp: '',
    }
}