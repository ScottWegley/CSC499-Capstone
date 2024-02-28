import{s as Ne,l as pe,e as G,a as I,c as O,g as ze,b as S,d as X,f,h as Y,i as $,j as b,m as me,n as Ce,t as p,k as m,o as J,p as He}from"../chunks/scheduler.7DAUOW__.js";import{S as je,i as qe,e as _e,c as V,a as N,m as z,t as E,f as Fe,b as R,d as H,g as Me}from"../chunks/index.a-4In7Gr.js";import{e as ge,g as Ee,G as Ae,c as ne,V as Le,D as Pe,a as Ue}from"../chunks/caesar.5MeYNrUZ.js";import{R as xe}from"../chunks/Range.yoZVvSV-.js";import{T as De}from"../chunks/Textarea.T9gLmyKj.js";import{T as Ge}from"../chunks/Tooltip.Xiz4XMNA.js";import{H as Oe,P as Re}from"../chunks/P.12h8QrdV.js";function Te(l,t,n){const e=l.slice();return e[10]=t[n],e}function Ye(l,t,n){const e=l.slice();return e[10]=t[n],e}function Je(l){let t;return{c(){t=p("Caesar Cipher")},l(n){t=m(n,"Caesar Cipher")},m(n,e){$(n,t,e)},d(n){n&&f(t)}}}function Ke(l){let t,n=ne("BARNACLE",l[0])+"",e,s,r=(l[0]<0?l[0]*-1:l[0])+`-${l[0]>0?"Right":"Left"}`,u,w,B=ne("BARNACLE",l[0]*-1)+"",d,k,v=(l[0]<0?l[0]*-1:l[0])+`-${l[0]>0?"Left":"Right"}`,L,_;return{c(){t=p(`The Caesar Cipher is one of the oldest and most famous substitution ciphers. It works very\r
		simply, only requiring knowledge of the order of the alphabet. You replace every letter in a\r
		word with a letter a set distance away from it. For example, the word "BARNACLE" becomes\r
		"`),e=p(n),s=p('" after a '),u=p(r),w=p(' Shift or "'),d=p(B),k=p('" after a '),L=p(v),_=p(" Shift.")},l(i){t=m(i,`The Caesar Cipher is one of the oldest and most famous substitution ciphers. It works very\r
		simply, only requiring knowledge of the order of the alphabet. You replace every letter in a\r
		word with a letter a set distance away from it. For example, the word "BARNACLE" becomes\r
		"`),e=m(i,n),s=m(i,'" after a '),u=m(i,r),w=m(i,' Shift or "'),d=m(i,B),k=m(i,'" after a '),L=m(i,v),_=m(i," Shift.")},m(i,g){$(i,t,g),$(i,e,g),$(i,s,g),$(i,u,g),$(i,w,g),$(i,d,g),$(i,k,g),$(i,L,g),$(i,_,g)},p(i,g){g&1&&n!==(n=ne("BARNACLE",i[0])+"")&&J(e,n),g&1&&r!==(r=(i[0]<0?i[0]*-1:i[0])+`-${i[0]>0?"Right":"Left"}`)&&J(u,r),g&1&&B!==(B=ne("BARNACLE",i[0]*-1)+"")&&J(d,B),g&1&&v!==(v=(i[0]<0?i[0]*-1:i[0])+`-${i[0]>0?"Left":"Right"}`)&&J(L,v)},d(i){i&&(f(t),f(e),f(s),f(u),f(w),f(d),f(k),f(L),f(_))}}}function Qe(l){let t,n;return{c(){t=p("Current Shift: "),n=p(l[0])},l(e){t=m(e,"Current Shift: "),n=m(e,l[0])},m(e,s){$(e,t,s),$(e,n,s)},p(e,s){s&1&&J(n,e[0])},d(e){e&&(f(t),f(n))}}}function We(l){let t;return{c(){t=p(l[10])},l(n){t=m(n,l[10])},m(n,e){$(n,t,e)},p:He,d(n){n&&f(t)}}}function Xe(l){let t,n;return t=new Le({props:{size:"xs",outline:!0,color:"green",$$slots:{default:[We]},$$scope:{ctx:l}}}),{c(){V(t.$$.fragment)},l(e){N(t.$$.fragment,e)},m(e,s){z(t,e,s),n=!0},p(e,s){const r={};s&32768&&(r.$$scope={dirty:s,ctx:e}),t.$set(r)},i(e){n||(E(t.$$.fragment,e),n=!0)},o(e){R(t.$$.fragment,e),n=!1},d(e){H(t,e)}}}function Ze(l){let t=l[10]+"",n;return{c(){n=p(t)},l(e){n=m(e,t)},m(e,s){$(e,n,s)},p(e,s){s&1&&t!==(t=e[10]+"")&&J(n,t)},d(e){e&&f(n)}}}function Be(l){let t,n;return t=new Le({props:{size:"xs",outline:!0,color:"blue",$$slots:{default:[Ze]},$$scope:{ctx:l}}}),{c(){V(t.$$.fragment)},l(e){N(t.$$.fragment,e)},m(e,s){z(t,e,s),n=!0},p(e,s){const r={};s&32769&&(r.$$scope={dirty:s,ctx:e}),t.$set(r)},i(e){n||(E(t.$$.fragment,e),n=!0)},o(e){R(t.$$.fragment,e),n=!1},d(e){H(t,e)}}}function et(l){let t,n=l[1]?"Encryption":"Decryption",e,s;return{c(){t=p("Manual "),e=p(n),s=p(" using the shift you specified.")},l(r){t=m(r,"Manual "),e=m(r,n),s=m(r," using the shift you specified.")},m(r,u){$(r,t,u),$(r,e,u),$(r,s,u)},p(r,u){u&2&&n!==(n=r[1]?"Encryption":"Decryption")&&J(e,n)},d(r){r&&(f(t),f(e),f(s))}}}function tt(l){let t,n=l[1]?"Decryption":"Encryption",e,s;return{c(){t=p("Click to change to "),e=p(n),s=p(".")},l(r){t=m(r,"Click to change to "),e=m(r,n),s=m(r,".")},m(r,u){$(r,t,u),$(r,e,u),$(r,s,u)},p(r,u){u&2&&n!==(n=r[1]?"Decryption":"Encryption")&&J(e,n)},d(r){r&&(f(t),f(e),f(s))}}}function nt(l){let t;return{c(){t=p("Run")},l(n){t=m(n,"Run")},m(n,e){$(n,t,e)},d(n){n&&f(t)}}}function at(l){let t,n="Home",e,s,r,u,w,B,d,k,v,L,_,i,g,y,Z,le,K,re,A,j,se,oe,F,ie,x,fe,M,ue,P,ce,ae;r=new Oe({props:{tag:"h4",class:"mb-4",$$slots:{default:[Je]},$$scope:{ctx:l}}}),w=new Re({props:{class:"text-md mb-2 dark:text-gray-400 sm:px-16",align:"center",size:"sm",$$slots:{default:[Ke]},$$scope:{ctx:l}}}),v=new Re({props:{align:"center",class:"text-sm dark:text-gray-400 sm:px-16",$$slots:{default:[Qe]},$$scope:{ctx:l}}});function ye(a){l[5](a)}let he={class:"max-w-[35%]",min:"-26",max:"26"};l[0]!==void 0&&(he.value=l[0]),_=new xe({props:he}),pe.push(()=>_e(_,"value",ye));let $e=ge(Pe),D=[];for(let a=0;a<$e.length;a+=1)D[a]=Xe(Ye(l,$e,a));let Q=ge(Ee(l[0])),c=[];for(let a=0;a<Q.length;a+=1)c[a]=Be(Te(l,Q,a));const Ie=a=>R(c[a],1,1,()=>{c[a]=null});function Se(a){l[6](a)}let de={placeholder:"Input text",rows:"4",class:"resize-none"};l[2]!==void 0&&(de.value=l[2]),j=new De({props:de}),pe.push(()=>_e(j,"value",Se)),j.$on("change",l[7]),F=new Ae({props:{outline:!0,color:"greenToBlue",class:"mt-3",$$slots:{default:[et]},$$scope:{ctx:l}}}),F.$on("click",l[8]),x=new Ge({props:{$$slots:{default:[tt]},$$scope:{ctx:l}}}),M=new Ae({props:{color:"greenToBlue",class:"mt-1.5",$$slots:{default:[nt]},$$scope:{ctx:l}}}),M.$on("click",l[4]);function Ve(a){l[9](a)}let ve={placeholder:"Output text",rows:"4",class:"mt-3 resize-none",disabled:!0};return l[3]!==void 0&&(ve.value=l[3]),P=new De({props:ve}),pe.push(()=>_e(P,"value",Ve)),{c(){t=G("title"),t.textContent=n,e=I(),s=G("div"),V(r.$$.fragment),u=I(),V(w.$$.fragment),B=I(),d=G("div"),k=G("div"),V(v.$$.fragment),L=I(),V(_.$$.fragment),g=I(),y=G("div"),Z=G("div");for(let a=0;a<D.length;a+=1)D[a].c();le=I(),K=G("div");for(let a=0;a<c.length;a+=1)c[a].c();re=I(),A=G("div"),V(j.$$.fragment),oe=I(),V(F.$$.fragment),ie=I(),V(x.$$.fragment),fe=I(),V(M.$$.fragment),ue=I(),V(P.$$.fragment),this.h()},l(a){t=O(a,"TITLE",{"data-svelte-h":!0}),ze(t)!=="svelte-a58u8d"&&(t.textContent=n),e=S(a),s=O(a,"DIV",{class:!0});var o=X(s);N(r.$$.fragment,o),u=S(o),N(w.$$.fragment,o),B=S(o),d=O(o,"DIV",{class:!0});var h=X(d);k=O(h,"DIV",{class:!0});var W=X(k);N(v.$$.fragment,W),L=S(W),N(_.$$.fragment,W),W.forEach(f),g=S(h),y=O(h,"DIV",{class:!0,id:!0});var U=X(y);Z=O(U,"DIV",{class:!0});var ee=X(Z);for(let q=0;q<D.length;q+=1)D[q].l(ee);ee.forEach(f),le=S(U),K=O(U,"DIV",{class:!0});var te=X(K);for(let q=0;q<c.length;q+=1)c[q].l(te);te.forEach(f),re=S(U),A=O(U,"DIV",{class:!0});var T=X(A);N(j.$$.fragment,T),oe=S(T),N(F.$$.fragment,T),ie=S(T),N(x.$$.fragment,T),fe=S(T),N(M.$$.fragment,T),ue=S(T),N(P.$$.fragment,T),T.forEach(f),U.forEach(f),h.forEach(f),o.forEach(f),this.h()},h(){Y(k,"class","mb-1.5"),Y(Z,"class","mb-1.5 mr-1 flex h-min min-w-fit flex-col rounded-lg shadow-sm"),Y(K,"class","mb-1.5 ml-1 mr-1.5 flex h-min min-w-fit flex-col rounded-lg shadow-sm"),Y(A,"class","ml-3 flex min-w-[25%] flex-col"),Y(y,"class","flex flex-row justify-center"),Y(y,"id","alphabetDisplayDiv"),Y(d,"class","flex flex-col justify-center"),Y(s,"class","text-center")},m(a,o){$(a,t,o),$(a,e,o),$(a,s,o),z(r,s,null),b(s,u),z(w,s,null),b(s,B),b(s,d),b(d,k),z(v,k,null),b(k,L),z(_,k,null),b(d,g),b(d,y),b(y,Z);for(let h=0;h<D.length;h+=1)D[h]&&D[h].m(Z,null);b(y,le),b(y,K);for(let h=0;h<c.length;h+=1)c[h]&&c[h].m(K,null);b(y,re),b(y,A),z(j,A,null),b(A,oe),z(F,A,null),b(A,ie),z(x,A,null),b(A,fe),z(M,A,null),b(A,ue),z(P,A,null),ae=!0},p(a,[o]){const h={};o&32768&&(h.$$scope={dirty:o,ctx:a}),r.$set(h);const W={};o&32769&&(W.$$scope={dirty:o,ctx:a}),w.$set(W);const U={};o&32769&&(U.$$scope={dirty:o,ctx:a}),v.$set(U);const ee={};if(!i&&o&1&&(i=!0,ee.value=a[0],me(()=>i=!1)),_.$set(ee),o&1){Q=ge(Ee(a[0]));let C;for(C=0;C<Q.length;C+=1){const ke=Te(a,Q,C);c[C]?(c[C].p(ke,o),E(c[C],1)):(c[C]=Be(ke),c[C].c(),E(c[C],1),c[C].m(K,null))}for(Me(),C=Q.length;C<c.length;C+=1)Ie(C);Fe()}const te={};!se&&o&4&&(se=!0,te.value=a[2],me(()=>se=!1)),j.$set(te);const T={};o&32770&&(T.$$scope={dirty:o,ctx:a}),F.$set(T);const q={};o&32770&&(q.$$scope={dirty:o,ctx:a}),x.$set(q);const be={};o&32768&&(be.$$scope={dirty:o,ctx:a}),M.$set(be);const we={};!ce&&o&8&&(ce=!0,we.value=a[3],me(()=>ce=!1)),P.$set(we)},i(a){if(!ae){E(r.$$.fragment,a),E(w.$$.fragment,a),E(v.$$.fragment,a),E(_.$$.fragment,a);for(let o=0;o<$e.length;o+=1)E(D[o]);for(let o=0;o<Q.length;o+=1)E(c[o]);E(j.$$.fragment,a),E(F.$$.fragment,a),E(x.$$.fragment,a),E(M.$$.fragment,a),E(P.$$.fragment,a),ae=!0}},o(a){R(r.$$.fragment,a),R(w.$$.fragment,a),R(v.$$.fragment,a),R(_.$$.fragment,a),D=D.filter(Boolean);for(let o=0;o<D.length;o+=1)R(D[o]);c=c.filter(Boolean);for(let o=0;o<c.length;o+=1)R(c[o]);R(j.$$.fragment,a),R(F.$$.fragment,a),R(x.$$.fragment,a),R(M.$$.fragment,a),R(P.$$.fragment,a),ae=!1},d(a){a&&(f(t),f(e),f(s)),H(r),H(w),H(v),H(_),Ce(D,a),Ce(c,a),H(j),H(F),H(x),H(M),H(P)}}}function lt(l,t,n){let e=1,s=!0,r="",u="";function w(){n(2,r=r.toUpperCase()),n(3,u=s?ne(r,e):Ue(r,e))}function B(_){e=_,n(0,e)}function d(_){r=_,n(2,r)}const k=()=>{n(2,r=r.toUpperCase())},v=()=>{n(1,s=!s)};function L(_){u=_,n(3,u)}return[e,s,r,u,w,B,d,k,v,L]}class $t extends je{constructor(t){super(),qe(this,t,lt,at,Ne,{})}}export{$t as component};
