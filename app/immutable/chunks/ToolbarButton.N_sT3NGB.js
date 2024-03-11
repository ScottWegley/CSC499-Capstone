import{R as Q,s as V,q,i as p,f as b,r as A,M as X,u as v,v as N,E as Y,w as B,e as S,a as U,c as w,d as C,b as W,A as k,j as F,C as Z,x as j,y as R,z as D,t as G,k as H,h as I,o as J}from"./scheduler.wZc1qmOK.js";import{S as x,i as $,g as ee,b as y,f as te,t as z}from"./index.KX_rc5VN.js";import{t as re,g as K}from"./bundle-mjs.3yZ4ST2R.js";function ae(t){const e=t-1;return e*e*e+1}function ge(t){return--t*t*t*t*t+1}function _e(t,{delay:e=0,duration:r=400,easing:l=Q}={}){const a=+getComputedStyle(t).opacity;return{delay:e,duration:r,easing:l,css:i=>`opacity: ${i*a}`}}function he(t,{delay:e=0,duration:r=400,easing:l=ae,axis:a="y"}={}){const i=getComputedStyle(t),c=+i.opacity,s=a==="y"?"height":"width",u=parseFloat(i[s]),n=a==="y"?["top","bottom"]:["left","right"],o=n.map(h=>`${h[0].toUpperCase()}${h.slice(1)}`),d=parseFloat(i[`padding${o[0]}`]),f=parseFloat(i[`padding${o[1]}`]),g=parseFloat(i[`margin${o[0]}`]),E=parseFloat(i[`margin${o[1]}`]),m=parseFloat(i[`border${o[0]}Width`]),L=parseFloat(i[`border${o[1]}Width`]);return{delay:e,duration:r,easing:l,css:h=>`overflow: hidden;opacity: ${Math.min(h*20,1)*c};${s}: ${h*u}px;padding-${n[0]}: ${h*d}px;padding-${n[1]}: ${h*f}px;margin-${n[0]}: ${h*g}px;margin-${n[1]}: ${h*E}px;border-${n[0]}-width: ${h*m}px;border-${n[1]}-width: ${h*L}px;`}}const oe=t=>({svgSize:t&4}),T=t=>({svgSize:t[5][t[2]]}),le=t=>({svgSize:t&4}),M=t=>({svgSize:t[5][t[2]]});function se(t){let e,r,l,a,i,c,s=t[0]&&O(t);const u=t[9].default,n=B(u,t,t[8],T);let o=[{type:"button"},t[6],{class:t[4]},{"aria-label":l=t[1]??t[0]}],d={};for(let f=0;f<o.length;f+=1)d=v(d,o[f]);return{c(){e=S("button"),s&&s.c(),r=U(),n&&n.c(),this.h()},l(f){e=w(f,"BUTTON",{type:!0,class:!0,"aria-label":!0});var g=C(e);s&&s.l(g),r=W(g),n&&n.l(g),g.forEach(b),this.h()},h(){k(e,d)},m(f,g){p(f,e,g),s&&s.m(e,null),F(e,r),n&&n.m(e,null),e.autofocus&&e.focus(),a=!0,i||(c=Z(e,"click",t[10]),i=!0)},p(f,g){f[0]?s?s.p(f,g):(s=O(f),s.c(),s.m(e,r)):s&&(s.d(1),s=null),n&&n.p&&(!a||g&260)&&j(n,u,f,f[8],a?D(u,f[8],g,oe):R(f[8]),T),k(e,d=K(o,[{type:"button"},g&64&&f[6],(!a||g&16)&&{class:f[4]},(!a||g&3&&l!==(l=f[1]??f[0]))&&{"aria-label":l}]))},i(f){a||(z(n,f),a=!0)},o(f){y(n,f),a=!1},d(f){f&&b(e),s&&s.d(),n&&n.d(f),i=!1,c()}}}function ie(t){let e,r,l,a,i=t[0]&&P(t);const c=t[9].default,s=B(c,t,t[8],M);let u=[{href:t[3]},t[6],{class:t[4]},{"aria-label":l=t[1]??t[0]}],n={};for(let o=0;o<u.length;o+=1)n=v(n,u[o]);return{c(){e=S("a"),i&&i.c(),r=U(),s&&s.c(),this.h()},l(o){e=w(o,"A",{href:!0,class:!0,"aria-label":!0});var d=C(e);i&&i.l(d),r=W(d),s&&s.l(d),d.forEach(b),this.h()},h(){k(e,n)},m(o,d){p(o,e,d),i&&i.m(e,null),F(e,r),s&&s.m(e,null),a=!0},p(o,d){o[0]?i?i.p(o,d):(i=P(o),i.c(),i.m(e,r)):i&&(i.d(1),i=null),s&&s.p&&(!a||d&260)&&j(s,c,o,o[8],a?D(c,o[8],d,le):R(o[8]),M),k(e,n=K(u,[(!a||d&8)&&{href:o[3]},d&64&&o[6],(!a||d&16)&&{class:o[4]},(!a||d&3&&l!==(l=o[1]??o[0]))&&{"aria-label":l}]))},i(o){a||(z(s,o),a=!0)},o(o){y(s,o),a=!1},d(o){o&&b(e),i&&i.d(),s&&s.d(o)}}}function O(t){let e,r;return{c(){e=S("span"),r=G(t[0]),this.h()},l(l){e=w(l,"SPAN",{class:!0});var a=C(e);r=H(a,t[0]),a.forEach(b),this.h()},h(){I(e,"class","sr-only")},m(l,a){p(l,e,a),F(e,r)},p(l,a){a&1&&J(r,l[0])},d(l){l&&b(e)}}}function P(t){let e,r;return{c(){e=S("span"),r=G(t[0]),this.h()},l(l){e=w(l,"SPAN",{class:!0});var a=C(e);r=H(a,t[0]),a.forEach(b),this.h()},h(){I(e,"class","sr-only")},m(l,a){p(l,e,a),F(e,r)},p(l,a){a&1&&J(r,l[0])},d(l){l&&b(e)}}}function ne(t){let e,r,l,a;const i=[ie,se],c=[];function s(u,n){return u[3]?0:1}return e=s(t),r=c[e]=i[e](t),{c(){r.c(),l=q()},l(u){r.l(u),l=q()},m(u,n){c[e].m(u,n),p(u,l,n),a=!0},p(u,[n]){let o=e;e=s(u),e===o?c[e].p(u,n):(ee(),y(c[o],1,1,()=>{c[o]=null}),te(),r=c[e],r?r.p(u,n):(r=c[e]=i[e](u),r.c()),z(r,1),r.m(l.parentNode,l))},i(u){a||(z(r),a=!0)},o(u){y(r),a=!1},d(u){u&&b(l),c[e].d(u)}}}function ue(t,e,r){const l=["color","name","ariaLabel","size","href"];let a=A(e,l),{$$slots:i={},$$scope:c}=e;const s=X("background");let{color:u="default"}=e,{name:n=void 0}=e,{ariaLabel:o=void 0}=e,{size:d="md"}=e,{href:f=void 0}=e;const g={dark:"text-gray-500 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600",gray:"text-gray-500 focus:ring-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300",red:"text-red-500 focus:ring-red-400 hover:bg-red-200 dark:hover:bg-red-800 dark:hover:text-red-300",yellow:"text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-800 dark:hover:text-yellow-300",green:"text-green-500 focus:ring-green-400 hover:bg-green-200 dark:hover:bg-green-800 dark:hover:text-green-300",indigo:"text-indigo-500 focus:ring-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800 dark:hover:text-indigo-300",purple:"text-purple-500 focus:ring-purple-400 hover:bg-purple-200 dark:hover:bg-purple-800 dark:hover:text-purple-300",pink:"text-pink-500 focus:ring-pink-400 hover:bg-pink-200 dark:hover:bg-pink-800 dark:hover:text-pink-300",blue:"text-blue-500 focus:ring-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 dark:hover:text-blue-300",primary:"text-primary-500 focus:ring-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800 dark:hover:text-primary-300",default:"focus:ring-gray-400"},E={xs:"m-0.5 rounded-sm focus:ring-1 p-0.5",sm:"m-0.5 rounded focus:ring-1 p-0.5",md:"m-0.5 rounded-lg focus:ring-2 p-1.5",lg:"m-0.5 rounded-lg focus:ring-2 p-2.5"};let m;const L={xs:"w-3 h-3",sm:"w-3.5 h-3.5",md:"w-5 h-5",lg:"w-5 h-5"};function h(_){Y.call(this,t,_)}return t.$$set=_=>{r(14,e=v(v({},e),N(_))),r(6,a=A(e,l)),"color"in _&&r(7,u=_.color),"name"in _&&r(0,n=_.name),"ariaLabel"in _&&r(1,o=_.ariaLabel),"size"in _&&r(2,d=_.size),"href"in _&&r(3,f=_.href),"$$scope"in _&&r(8,c=_.$$scope)},t.$$.update=()=>{r(4,m=re("focus:outline-none whitespace-normal",E[d],g[u],u==="default"&&(s?"hover:bg-gray-100 dark:hover:bg-gray-600":"hover:bg-gray-100 dark:hover:bg-gray-700"),e.class))},e=N(e),[n,o,d,f,m,L,a,u,c,i,h]}class be extends x{constructor(e){super(),$(this,e,ue,ne,V,{color:7,name:0,ariaLabel:1,size:2,href:3})}}export{be as T,_e as f,ge as q,he as s};
