import{D as c}from"./Dictionary.kcOnHfuo.js";function o(e){for(;e<0;)e+=26;let h=c.map(r=>r);for(let r=0;r<26;r++)h[r]=c[(r+e)%26];return h}function f(e,h){e=e.toUpperCase();let r=o(h),a="";for(let t=0;t<e.length;t++){let l="";c.includes(e.charAt(t))&&(l=r[c.indexOf(e.charAt(t))]),a=a+(l==""?e.charAt(t):l)}return a}function s(e,h){e=e.toUpperCase();let r=o(h),a="";for(let t=0;t<e.length;t++){let l="";c.includes(e.charAt(t))&&(l=c[r.indexOf(e.charAt(t))]),a=a+(l==""?e.charAt(t):l)}return a}export{s as a,f as c,o as g};
