var R=Object.defineProperty;var G=(t,e,n)=>e in t?R(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var f=(t,e,n)=>(G(t,typeof e!="symbol"?e+"":e,n),n);function M(){}const _t=t=>t;function I(t,e){for(const n in e)t[n]=e[n];return t}function z(t){return t()}function ht(){return Object.create(null)}function F(t){t.forEach(z)}function U(t){return typeof t=="function"}function dt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let p;function mt(t,e){return t===e?!0:(p||(p=document.createElement("a")),p.href=e,t===p.href)}function pt(t){return Object.keys(t).length===0}function W(t,...e){if(t==null){for(const i of e)i(void 0);return M}const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function yt(t,e,n){t.$$.on_destroy.push(W(e,n))}function bt(t,e,n,i){if(t){const s=H(t,e,n,i);return t[0](s)}}function H(t,e,n,i){return t[1]&&i?I(n.ctx.slice(),t[1](i(e))):n.ctx}function gt(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const l=[],c=Math.max(e.dirty.length,s.length);for(let o=0;o<c;o+=1)l[o]=e.dirty[o]|s[o];return l}return e.dirty|s}return e.dirty}function xt(t,e,n,i,s,l){if(s){const c=H(e,n,i,l);t.p(c,s)}}function wt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function Et(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function Nt(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}function Tt(t){const e={};for(const n in t)e[n]=!0;return e}function vt(t){return t&&U(t.destroy)?t.destroy:M}let b=!1;function kt(){b=!0}function At(){b=!1}function J(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function K(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const r=[];for(let a=0;a<e.length;a++){const u=e[a];u.claim_order!==void 0&&r.push(u)}e=r}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let r=0;r<e.length;r++){const a=e[r].claim_order,u=(s>0&&e[n[s]].claim_order<=a?s+1:J(1,s,B=>e[n[B]].claim_order,a))-1;i[r]=n[u]+1;const C=u+1;n[C]=r,s=Math.max(C,s)}const l=[],c=[];let o=e.length-1;for(let r=n[s]+1;r!=0;r=i[r-1]){for(l.push(e[r-1]);o>=r;o--)c.push(e[o]);o--}for(;o>=0;o--)c.push(e[o]);l.reverse(),c.sort((r,a)=>r.claim_order-a.claim_order);for(let r=0,a=0;r<c.length;r++){for(;a<l.length&&c[r].claim_order>=l[a].claim_order;)a++;const u=a<l.length?l[a]:null;t.insertBefore(c[r],u)}}function Q(t,e){t.appendChild(e)}function V(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function Ct(t){const e=v("style");return e.textContent="/* empty */",X(V(t),e),e.sheet}function X(t,e){return Q(t.head||t,e),e.sheet}function Y(t,e){if(b){for(K(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Z(t,e,n){t.insertBefore(e,n||null)}function $(t,e,n){b&&!n?Y(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function E(t){t.parentNode&&t.parentNode.removeChild(t)}function v(t){return document.createElement(t)}function P(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function k(t){return document.createTextNode(t)}function jt(){return k(" ")}function Lt(){return k("")}function Mt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function A(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}const tt=["width","height"];function et(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set&&tt.indexOf(i)===-1?t[i]=e[i]:A(t,i,e[i])}function Ht(t,e){for(const n in e)A(t,n,e[n])}function nt(t,e){Object.keys(e).forEach(n=>{it(t,n,e[n])})}function it(t,e,n){const i=e.toLowerCase();i in t?t[i]=typeof t[i]=="boolean"&&n===""?!0:n:e in t?t[e]=typeof t[e]=="boolean"&&n===""?!0:n:A(t,e,n)}function Pt(t){return/-/.test(t)?nt:et}function St(t){return t.dataset.svelteH}function Ot(t){return t===""?null:+t}function Dt(t){return Array.from(t.childNodes)}function S(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function O(t,e,n,i,s=!1){S(t);const l=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const o=t[c];if(e(o)){const r=n(o);return r===void 0?t.splice(c,1):t[c]=r,s||(t.claim_info.last_index=c),o}}for(let c=t.claim_info.last_index-1;c>=0;c--){const o=t[c];if(e(o)){const r=n(o);return r===void 0?t.splice(c,1):t[c]=r,s?r===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,o}}return i()})();return l.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,l}function D(t,e,n,i){return O(t,s=>s.nodeName===e,s=>{const l=[];for(let c=0;c<s.attributes.length;c++){const o=s.attributes[c];n[o.name]||l.push(o.name)}l.forEach(c=>s.removeAttribute(c))},()=>i(e))}function qt(t,e,n){return D(t,e,n,v)}function Bt(t,e,n){return D(t,e,n,P)}function st(t,e){return O(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>k(e),!0)}function Rt(t){return st(t," ")}function j(t,e,n){for(let i=n;i<t.length;i+=1){const s=t[i];if(s.nodeType===8&&s.textContent.trim()===e)return i}return-1}function Gt(t,e){const n=j(t,"HTML_TAG_START",0),i=j(t,"HTML_TAG_END",n+1);if(n===-1||i===-1)return new g(e);S(t);const s=t.splice(n,i-n+1);E(s[0]),E(s[s.length-1]);const l=s.slice(1,s.length-1);if(l.length===0)return new g(e);for(const c of l)c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new g(e,l)}function It(t,e){e=""+e,t.data!==e&&(t.data=e)}function zt(t,e){t.value=e??""}function Ft(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function ct(t,e,{bubbles:n=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:e,bubbles:n,cancelable:i})}class rt{constructor(e=!1){f(this,"is_svg",!1);f(this,"e");f(this,"n");f(this,"t");f(this,"a");this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=P(n.nodeName):this.e=v(n.nodeType===11?"TEMPLATE":n.nodeName),this.t=n.tagName!=="TEMPLATE"?n:n.content,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.nodeName==="TEMPLATE"?this.e.content.childNodes:this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)Z(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(E)}}class g extends rt{constructor(n=!1,i){super(n);f(this,"l");this.e=this.n=null,this.l=i}c(n){this.l?this.n=this.l:super.c(n)}i(n){for(let i=0;i<this.n.length;i+=1)$(this.t,this.n[i],n)}}function Ut(t,e){return new t(e)}let y;function x(t){y=t}function m(){if(!y)throw new Error("Function called outside component initialization");return y}function Wt(t){m().$$.on_mount.push(t)}function Jt(t){m().$$.after_update.push(t)}function Kt(){const t=m();return(e,n,{cancelable:i=!1}={})=>{const s=t.$$.callbacks[e];if(s){const l=ct(e,n,{cancelable:i});return s.slice().forEach(c=>{c.call(t,l)}),!l.defaultPrevented}return!0}}function Qt(t,e){return m().$$.context.set(t,e),e}function Vt(t){return m().$$.context.get(t)}function Xt(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const d=[],L=[];let h=[];const N=[],q=Promise.resolve();let T=!1;function lt(){T||(T=!0,q.then(at))}function Yt(){return lt(),q}function ot(t){h.push(t)}function Zt(t){N.push(t)}const w=new Set;let _=0;function at(){if(_!==0)return;const t=y;do{try{for(;_<d.length;){const e=d[_];_++,x(e),ut(e.$$)}}catch(e){throw d.length=0,_=0,e}for(x(null),d.length=0,_=0;L.length;)L.pop()();for(let e=0;e<h.length;e+=1){const n=h[e];w.has(n)||(w.add(n),n())}h.length=0}while(d.length);for(;N.length;)N.pop()();T=!1,w.clear(),x(t)}function ut(t){if(t.fragment!==null){t.update(),F(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(ot)}}function $t(t){const e=[],n=[];h.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),h=e}export{d as $,Pt as A,It as B,M as C,yt as D,Jt as E,Wt as F,Ft as G,L as H,Ut as I,Yt as J,Qt as K,vt as L,U as M,_t as N,Tt as O,zt as P,V as Q,Ct as R,ot as S,ct as T,ht as U,at as V,pt as W,$t as X,y as Y,x as Z,z as _,jt as a,lt as a0,kt as a1,At as a2,Kt as a3,P as a4,Bt as a5,Ot as a6,Ht as a7,Zt as a8,g as a9,Gt as aa,mt as ab,Rt as b,qt as c,Dt as d,v as e,E as f,St as g,A as h,$ as i,Y as j,st as k,Lt as l,Nt as m,Vt as n,I as o,Et as p,Xt as q,bt as r,dt as s,k as t,et as u,Mt as v,xt as w,wt as x,gt as y,F as z};
