async function c(e){return(await(await fetch(e)).text()).replaceAll("\r","").toLowerCase().split(`
`).toString()}function g(e,l){e=e.trim().toLowerCase(),e=e.replaceAll(",",`
`);let i="0123456789`-=[]\\;',./~!@#$%^&*()_+{}|:\"<>?";for(let t=0;t<i.length;t++)if(e.indexOf(i.charAt(t))!=-1)return alert(`Dictionary contained invalid character: ${i.charAt(t)} on Line ${t+1}`),!1;let r=e.split(`
`);for(let t=0;t<r.length;t++){if(r[t]=r[t].trim(),r[t].indexOf(" ")!=-1)return alert(`Cannot have spaces in dictionary entries.  Line ${t+1}`),!1;r[t].length!=0&&l&&l(r[t])}return!0}async function f(){let e=localStorage.getItem("wordlist");if(e==null)localStorage.setItem("wordlist",await c("10k.txt")),e=localStorage.getItem("wordlist");else return typeof e!="string"?"":e}async function u(e){e=e.toLowerCase();let l=await f();if(l!=null){l=l.toLowerCase();let i=l.split(","),r=e.split(" "),t=r.length,o=0;for(let s=0;s<i.length&&o<t;s++){let n=0;for(;n<r.length&&r.length>0;)if(r[n]==i[s]){o++;for(let a=n;a<r.length-1;a++)r[a]=r[a+1];r.pop()}else n++}return o/t}else return console.log("Dictionary was undefined."),0}export{u as c,c as g,g as i};
