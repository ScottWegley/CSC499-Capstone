function m(){}const M=t=>t;function w(t,n){for(const e in n)t[e]=n[e];return t}function E(t){return t()}function S(){return Object.create(null)}function j(t){t.forEach(E)}function q(t){return typeof t=="function"}function A(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}let l;function B(t,n){return t===n?!0:(l||(l=document.createElement("a")),l.href=n,t===l.href)}function D(t){return Object.keys(t).length===0}function v(t,...n){if(t==null){for(const r of n)r(void 0);return m}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function G(t,n,e){t.$$.on_destroy.push(v(n,e))}function H(t,n,e,r){if(t){const o=x(t,n,e,r);return t[0](o)}}function x(t,n,e,r){return t[1]&&r?w(e.ctx.slice(),t[1](r(n))):e.ctx}function P(t,n,e,r){if(t[2]&&r){const o=t[2](r(e));if(n.dirty===void 0)return o;if(typeof o=="object"){const i=[],d=Math.max(n.dirty.length,o.length);for(let u=0;u<d;u+=1)i[u]=n.dirty[u]|o[u];return i}return n.dirty|o}return n.dirty}function U(t,n,e,r,o,i){if(o){const d=x(n,e,r,i);t.p(d,o)}}function I(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let r=0;r<e;r++)n[r]=-1;return n}return-1}function J(t){const n={};for(const e in t)e[0]!=="$"&&(n[e]=t[e]);return n}function K(t,n){const e={};n=new Set(n);for(const r in t)!n.has(r)&&r[0]!=="$"&&(e[r]=t[r]);return e}function L(t){const n={};for(const e in t)n[e]=!0;return n}function N(t){return t&&q(t.destroy)?t.destroy:m}let f;function h(t){f=t}function _(){if(!f)throw new Error("Function called outside component initialization");return f}function Q(t){_().$$.on_mount.push(t)}function R(t){_().$$.after_update.push(t)}function T(t,n){return _().$$.context.set(t,n),n}function V(t){return _().$$.context.get(t)}function W(t,n){const e=t.$$.callbacks[n.type];e&&e.slice().forEach(r=>r.call(this,n))}const a=[],y=[];let s=[];const b=[],k=Promise.resolve();let g=!1;function C(){g||(g=!0,k.then(z))}function X(){return C(),k}function O(t){s.push(t)}function Y(t){b.push(t)}const p=new Set;let c=0;function z(){if(c!==0)return;const t=f;do{try{for(;c<a.length;){const n=a[c];c++,h(n),F(n.$$)}}catch(n){throw a.length=0,c=0,n}for(h(null),a.length=0,c=0;y.length;)y.pop()();for(let n=0;n<s.length;n+=1){const e=s[n];p.has(e)||(p.add(e),e())}s.length=0}while(a.length);for(;b.length;)b.pop()();g=!1,p.clear(),h(t)}function F(t){if(t.fragment!==null){t.update(),j(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(O)}}function Z(t){const n=[],e=[];s.forEach(r=>t.indexOf(r)===-1?n.push(r):e.push(r)),e.forEach(r=>r()),s=n}export{D as A,Z as B,f as C,h as D,E,a as F,C as G,B as H,w as a,W as b,K as c,H as d,J as e,I as f,V as g,P as h,G as i,R as j,y as k,N as l,L as m,m as n,Q as o,T as p,q,j as r,A as s,X as t,U as u,Y as v,O as w,M as x,S as y,z};
