function g(){}function G(t,e){for(const n in e)t[n]=e[n];return t}function ht(t,e,n,i,r){t.__svelte_meta={loc:{file:e,line:n,column:i,char:r}}}function T(t){return t()}function C(){return Object.create(null)}function v(t){t.forEach(T)}function M(t){return typeof t=="function"}function mt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let x;function pt(t,e){return x||(x=document.createElement("a")),x.href=e,t===x.href}function J(t){return Object.keys(t).length===0}function yt(t,e){if(t!=null&&typeof t.subscribe!="function")throw new Error(`'${e}' is not a store with a 'subscribe' method`)}function K(t,...e){if(t==null)return g;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function gt(t,e,n){t.$$.on_destroy.push(K(e,n))}function bt(t,e,n,i){if(t){const r=q(t,e,n,i);return t[0](r)}}function q(t,e,n,i){return t[1]&&i?G(n.ctx.slice(),t[1](i(e))):n.ctx}function vt(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const u=[],s=Math.max(e.dirty.length,r.length);for(let c=0;c<s;c+=1)u[c]=e.dirty[c]|r[c];return u}return e.dirty|r}return e.dirty}function $t(t,e,n,i,r,u){if(r){const s=q(e,n,i,u);t.p(s,r)}}function xt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function wt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function Et(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}function St(t){return t&&M(t.destroy)?t.destroy:g}let E=!1;function Q(){E=!0}function U(){E=!1}function V(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function X(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const o=[];for(let a=0;a<e.length;a++){const f=e[a];f.claim_order!==void 0&&o.push(f)}e=o}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let o=0;o<e.length;o++){const a=e[o].claim_order,f=(r>0&&e[n[r]].claim_order<=a?r+1:V(1,r,$=>e[n[$]].claim_order,a))-1;i[o]=n[f]+1;const l=f+1;n[l]=o,r=Math.max(l,r)}const u=[],s=[];let c=e.length-1;for(let o=n[r]+1;o!=0;o=i[o-1]){for(u.push(e[o-1]);c>=o;c--)s.push(e[c]);c--}for(;c>=0;c--)s.push(e[c]);u.reverse(),s.sort((o,a)=>o.claim_order-a.claim_order);for(let o=0,a=0;o<s.length;o++){for(;a<u.length&&s[o].claim_order>=u[a].claim_order;)a++;const f=a<u.length?u[a]:null;t.insertBefore(s[o],f)}}function I(t,e){if(E){for(X(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Z(t,e,n){E&&!n?I(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function B(t){t.parentNode&&t.parentNode.removeChild(t)}function Ot(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function tt(t){return document.createElement(t)}function et(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function j(t){return document.createTextNode(t)}function kt(){return j(" ")}function Mt(){return j("")}function nt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function jt(t){return function(e){return e.stopPropagation(),t.call(this,e)}}function R(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function At(t,e){for(const n in e)R(t,n,e[n])}function Dt(t,e,n){const i=new Set;for(let r=0;r<t.length;r+=1)t[r].checked&&i.add(t[r].__value);return n||i.delete(e),Array.from(i)}function Nt(t){let e;return{p(...n){e=n,e.forEach(i=>t.push(i))},r(){e.forEach(n=>t.splice(t.indexOf(n),1))}}}function it(t){return Array.from(t.childNodes)}function rt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function z(t,e,n,i,r=!1){rt(t);const u=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const c=t[s];if(e(c)){const o=n(c);return o===void 0?t.splice(s,1):t[s]=o,r||(t.claim_info.last_index=s),c}}for(let s=t.claim_info.last_index-1;s>=0;s--){const c=t[s];if(e(c)){const o=n(c);return o===void 0?t.splice(s,1):t[s]=o,r?o===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,c}}return i()})();return u.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,u}function F(t,e,n,i){return z(t,r=>r.nodeName===e,r=>{const u=[];for(let s=0;s<r.attributes.length;s++){const c=r.attributes[s];n[c.name]||u.push(c.name)}u.forEach(s=>r.removeAttribute(s))},()=>i(e))}function Ct(t,e,n){return F(t,e,n,tt)}function Pt(t,e,n){return F(t,e,n,et)}function ot(t,e){return z(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>j(e),!0)}function Lt(t){return ot(t," ")}function Tt(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function qt(t,e,n){for(let i=0;i<t.options.length;i+=1){const r=t.options[i];if(r.__value===e){r.selected=!0;return}}(!n||e!==void 0)&&(t.selectedIndex=-1)}function It(t){const e=t.querySelector(":checked");return e&&e.__value}function Bt(t,e,n){t.classList[n?"add":"remove"](e)}function st(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,i,e),r}let b;function y(t){b=t}function A(){if(!b)throw new Error("Function called outside component initialization");return b}function Rt(t){A().$$.on_mount.push(t)}function zt(t){A().$$.after_update.push(t)}function Ft(t,e){return A().$$.context.set(t,e),e}function Ht(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const m=[],P=[];let p=[];const L=[],H=Promise.resolve();let O=!1;function W(){O||(O=!0,H.then(Y))}function Wt(){return W(),H}function k(t){p.push(t)}const S=new Set;let h=0;function Y(){if(h!==0)return;const t=b;do{try{for(;h<m.length;){const e=m[h];h++,y(e),ct(e.$$)}}catch(e){throw m.length=0,h=0,e}for(y(null),m.length=0,h=0;P.length;)P.pop()();for(let e=0;e<p.length;e+=1){const n=p[e];S.has(n)||(S.add(n),n())}p.length=0}while(m.length);for(;L.length;)L.pop()();O=!1,S.clear(),y(t)}function ct(t){if(t.fragment!==null){t.update(),v(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(k)}}function at(t){const e=[],n=[];p.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),p=e}const w=new Set;let _;function Yt(){_={r:0,c:[],p:_}}function Gt(){_.r||v(_.c),_=_.p}function ut(t,e){t&&t.i&&(w.delete(t),t.i(e))}function Jt(t,e,n,i){if(t&&t.o){if(w.has(t))return;w.add(t),_.c.push(()=>{w.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const Kt=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function Qt(t,e){const n={},i={},r={$$scope:1};let u=t.length;for(;u--;){const s=t[u],c=e[u];if(c){for(const o in s)o in c||(i[o]=1);for(const o in c)r[o]||(n[o]=c[o],r[o]=1);t[u]=c}else for(const o in s)r[o]=1}for(const s in i)s in n||(n[s]=void 0);return n}function Ut(t){t&&t.c()}function Vt(t,e){t&&t.l(e)}function lt(t,e,n,i){const{fragment:r,after_update:u}=t.$$;r&&r.m(e,n),i||k(()=>{const s=t.$$.on_mount.map(T).filter(M);t.$$.on_destroy?t.$$.on_destroy.push(...s):v(s),t.$$.on_mount=[]}),u.forEach(k)}function ft(t,e){const n=t.$$;n.fragment!==null&&(at(n.after_update),v(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function dt(t,e){t.$$.dirty[0]===-1&&(m.push(t),W(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Xt(t,e,n,i,r,u,s,c=[-1]){const o=b;y(t);const a=t.$$={fragment:null,ctx:[],props:u,update:g,not_equal:r,bound:C(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(o?o.$$.context:[])),callbacks:C(),dirty:c,skip_bound:!1,root:e.target||o.$$.root};s&&s(a.root);let f=!1;if(a.ctx=n?n(t,e.props||{},(l,$,...D)=>{const N=D.length?D[0]:$;return a.ctx&&r(a.ctx[l],a.ctx[l]=N)&&(!a.skip_bound&&a.bound[l]&&a.bound[l](N),f&&dt(t,l)),$}):[],a.update(),f=!0,v(a.before_update),a.fragment=i?i(a.ctx):!1,e.target){if(e.hydrate){Q();const l=it(e.target);a.fragment&&a.fragment.l(l),l.forEach(B)}else a.fragment&&a.fragment.c();e.intro&&ut(t.$$.fragment),lt(t,e.target,e.anchor,e.customElement),U(),Y()}y(o)}class _t{$destroy(){ft(this,1),this.$destroy=g}$on(e,n){if(!M(n))return g;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!J(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function d(t,e){document.dispatchEvent(st(t,Object.assign({version:"3.57.0"},e),{bubbles:!0}))}function Zt(t,e){d("SvelteDOMInsert",{target:t,node:e}),I(t,e)}function te(t,e,n){d("SvelteDOMInsert",{target:t,node:e,anchor:n}),Z(t,e,n)}function ee(t){d("SvelteDOMRemove",{node:t}),B(t)}function ne(t,e,n,i,r,u,s){const c=i===!0?["capture"]:i?Array.from(Object.keys(i)):[];r&&c.push("preventDefault"),u&&c.push("stopPropagation"),s&&c.push("stopImmediatePropagation"),d("SvelteDOMAddEventListener",{node:t,event:e,handler:n,modifiers:c});const o=nt(t,e,n,i);return()=>{d("SvelteDOMRemoveEventListener",{node:t,event:e,handler:n,modifiers:c}),o()}}function ie(t,e,n){R(t,e,n),n==null?d("SvelteDOMRemoveAttribute",{node:t,attribute:e}):d("SvelteDOMSetAttribute",{node:t,attribute:e,value:n})}function re(t,e,n){t[e]=n,d("SvelteDOMSetProperty",{node:t,property:e,value:n})}function oe(t,e){e=""+e,t.wholeText!==e&&(d("SvelteDOMSetData",{node:t,data:e}),t.data=e)}function se(t){if(typeof t!="string"&&!(t&&typeof t=="object"&&"length"in t)){let e="{#each} only iterates over array-like objects.";throw typeof Symbol=="function"&&t&&Symbol.iterator in t&&(e+=" You can use a spread to convert this iterable into an array."),new Error(e)}}function ce(t,e,n){for(const i of Object.keys(e))~n.indexOf(i)||console.warn(`<${t}> received an unexpected slot "${i}".`)}function ae(t,e){const n="this={...} of <svelte:component> should specify a Svelte component.";try{const i=new t(e);if(!i.$$||!i.$set||!i.$on||!i.$destroy)throw new Error(n);return i}catch(i){const{message:r}=i;throw typeof r=="string"&&r.indexOf("is not a constructor")!==-1?new Error(n):i}}class ue extends _t{constructor(e){if(!e||!e.target&&!e.$$inline)throw new Error("'target' is a required option");super()}$destroy(){super.$destroy(),this.$destroy=()=>{console.warn("Component was already destroyed")}}$capture_state(){}$inject_state(){}}export{v as $,oe as A,Yt as B,Ut as C,Vt as D,lt as E,ft as F,bt as G,$t as H,xt as I,vt as J,yt as K,gt as L,Zt as M,g as N,G as O,Et as P,wt as Q,et as R,ue as S,Pt as T,At as U,Qt as V,St as W,M as X,Kt as Y,Bt as Z,ne as _,zt as a,se as a0,Nt as a1,k as a2,pt as a3,qt as a4,Ot as a5,Ht as a6,It as a7,Dt as a8,re as a9,jt as aa,Ft as b,kt as c,d,Mt as e,Lt as f,te as g,Jt as h,Xt as i,Gt as j,ut as k,ee as l,P as m,ae as n,Rt as o,tt as p,Ct as q,it as r,mt as s,Wt as t,ie as u,ce as v,Tt as w,ht as x,j as y,ot as z};