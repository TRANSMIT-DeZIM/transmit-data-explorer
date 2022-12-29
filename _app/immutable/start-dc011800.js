import{S as ut,i as dt,s as pt,d as x,v as ht,a as Ze,o as de,b as mt,c as _t,e as V,f as gt,g as W,h as pe,t as F,j as he,k as G,l as J,m as H,n as wt,p as yt,q as bt,r as ke,u as B,w as vt,x as kt,y as Et,z as Rt,A as Y,B as De,C as X,D as Z,E as le}from"./chunks/index-cfeff11a.js";import{S as st,I as q,g as Qe,f as $e,a as Ee,b as fe,s as M,i as et,c as ue,P as tt,d as St}from"./chunks/singletons-970aa6f0.js";const Pt=!0;function Ot(n,e){return n==="/"||e==="ignore"?n:e==="never"?n.endsWith("/")?n.slice(0,-1):n:e==="always"&&!n.endsWith("/")?n+"/":n}function Lt(n){return n.split("%25").map(decodeURI).join("%25")}function jt(n){for(const e in n)n[e]=decodeURIComponent(n[e]);return n}const It=["href","pathname","search","searchParams","toString","toJSON"];function At(n,e){const t=new URL(n);for(const c of It){let a=t[c];Object.defineProperty(t,c,{get(){return e(),a},enumerable:!0,configurable:!0})}return Nt(t),t}function Nt(n){Object.defineProperty(n,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}const Ut="/__data.json";function Tt(n){return n.replace(/\/$/,"")+Ut}let nt="";function Dt(n){nt=n.base,n.assets}function Ct(n){let e=5381;if(typeof n=="string"){let t=n.length;for(;t;)e=e*33^n.charCodeAt(--t)}else if(ArrayBuffer.isView(n)){const t=new Uint8Array(n.buffer,n.byteOffset,n.byteLength);let c=t.length;for(;c;)e=e*33^t[--c]}else throw new TypeError("value must be a string or TypedArray");return(e>>>0).toString(36)}let Ce=0;const me=window.fetch;function Bt(){Ce+=1}function qt(){Ce-=1}{let n=!1;(async()=>{n=new Error().stack.includes("check_stack_trace")})(),window.fetch=(t,c)=>{const a=t instanceof Request?t.url:t.toString(),l=new Error().stack;return(n?l.includes("src/runtime/client/client.js"):Ce)&&console.warn(`Loading ${a} using \`window.fetch\`. For best results, use the \`fetch\` that is passed to your \`load\` function: https://kit.svelte.dev/docs/load#making-fetch-requests`),(t instanceof Request?t.method:(c==null?void 0:c.method)||"GET")!=="GET"&&te.delete(Be(t)),me(t,c)}}const te=new Map;function Vt(n,e){const t=Be(n,e),c=document.querySelector(t);if(c!=null&&c.textContent){const{body:a,...l}=JSON.parse(c.textContent),r=c.getAttribute("data-ttl");return r&&te.set(t,{body:a,init:l,ttl:1e3*Number(r)}),Promise.resolve(new Response(a,l))}return me(n,e)}function Ft(n,e,t){if(te.size>0){const c=Be(n,t),a=te.get(c);if(a){if(performance.now()<a.ttl&&["default","force-cache","only-if-cached",void 0].includes(t==null?void 0:t.cache))return new Response(a.body,a.init);te.delete(c)}}return me(e,t)}function Be(n,e){let c=`script[data-sveltekit-fetched][data-url=${JSON.stringify(n instanceof Request?n.url:n)}]`;return e!=null&&e.body&&(typeof e.body=="string"||ArrayBuffer.isView(e.body))&&(c+=`[data-hash="${Ct(e.body)}"]`),c}const Gt=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function Jt(n){const e=[];return{pattern:n==="/"?/^\/$/:new RegExp(`^${Mt(n).map(c=>{const a=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(c);if(a)return e.push({name:a[1],matcher:a[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const l=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(c);if(l)return e.push({name:l[1],matcher:l[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!c)return;const r=c.split(/\[(.+?)\](?!\])/);return"/"+r.map((i,p)=>{if(p%2){if(i.startsWith("x+"))return Re(String.fromCharCode(parseInt(i.slice(2),16)));if(i.startsWith("u+"))return Re(String.fromCharCode(...i.slice(2).split("-").map(g=>parseInt(g,16))));const b=Gt.exec(i);if(!b)throw new Error(`Invalid param: ${i}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,w,k,O,N]=b;return e.push({name:O,matcher:N,optional:!!w,rest:!!k,chained:k?p===1&&r[0]==="":!1}),k?"(.*?)":w?"([^/]*)?":"([^/]+?)"}return Re(i)}).join("")}).join("")}/?$`),params:e}}function Kt(n){return!/^\([^)]+\)$/.test(n)}function Mt(n){return n.slice(1).split("/").filter(Kt)}function Wt(n,e,t){const c={},a=n.slice(1);let l="";for(let r=0;r<e.length;r+=1){const u=e[r];let i=a[r];if(u.chained&&u.rest&&l&&(i=i?l+"/"+i:l),l="",i===void 0)u.rest&&(c[u.name]="");else{if(u.matcher&&!t[u.matcher](i)){if(u.optional&&u.chained){let p=a.indexOf(void 0,r);if(p===-1){const b=e[r+1];if(b!=null&&b.rest&&b.chained)l=i;else return}for(;p>=r;)a[p]=a[p-1],p-=1;continue}return}c[u.name]=i}}if(!l)return c}function Re(n){return n.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function xt(n,e,t,c){const a=new Set(e);return Object.entries(t).map(([u,[i,p,b]])=>{const{pattern:w,params:k}=Jt(u),O={id:u,exec:N=>{const g=w.exec(N);if(g)return Wt(g,k,c)},errors:[1,...b||[]].map(N=>n[N]),layouts:[0,...p||[]].map(r),leaf:l(i)};return O.errors.length=O.layouts.length=Math.max(O.errors.length,O.layouts.length),O});function l(u){const i=u<0;return i&&(u=~u),[i,n[u]]}function r(u){return u===void 0?u:[a.has(u),n[u]]}}const zt=Pt,Ht=".svelte-kit/generated/root.svelte";function it(n){let e,t,c;var a=n[0][0];function l(u){return{props:{data:u[2],form:u[1]},$$inline:!0}}a&&(e=H(a,l(n)));const r={c:function(){e&&Y(e.$$.fragment),t=V()},l:function(i){e&&De(e.$$.fragment,i),t=V()},m:function(i,p){e&&X(e,i,p),W(i,t,p),c=!0},p:function(i,p){const b={};if(p&4&&(b.data=i[2]),p&2&&(b.form=i[1]),a!==(a=i[0][0])){if(e){pe();const w=e;F(w.$$.fragment,1,0,()=>{Z(w,1)}),he()}a?(e=H(a,l(i)),Y(e.$$.fragment),G(e.$$.fragment,1),X(e,t.parentNode,t)):e=null}else a&&e.$set(b)},i:function(i){c||(e&&G(e.$$.fragment,i),c=!0)},o:function(i){e&&F(e.$$.fragment,i),c=!1},d:function(i){i&&J(t),e&&Z(e,i)}};return x("SvelteRegisterBlock",{block:r,id:it.name,type:"else",source:"(43:0) {:else}",ctx:n}),r}function ct(n){let e,t,c;var a=n[0][0];function l(u){return{props:{data:u[2],$$slots:{default:[lt]},$$scope:{ctx:u}},$$inline:!0}}a&&(e=H(a,l(n)));const r={c:function(){e&&Y(e.$$.fragment),t=V()},l:function(i){e&&De(e.$$.fragment,i),t=V()},m:function(i,p){e&&X(e,i,p),W(i,t,p),c=!0},p:function(i,p){const b={};if(p&4&&(b.data=i[2]),p&523&&(b.$$scope={dirty:p,ctx:i}),a!==(a=i[0][0])){if(e){pe();const w=e;F(w.$$.fragment,1,0,()=>{Z(w,1)}),he()}a?(e=H(a,l(i)),Y(e.$$.fragment),G(e.$$.fragment,1),X(e,t.parentNode,t)):e=null}else a&&e.$set(b)},i:function(i){c||(e&&G(e.$$.fragment,i),c=!0)},o:function(i){e&&F(e.$$.fragment,i),c=!1},d:function(i){i&&J(t),e&&Z(e,i)}};return x("SvelteRegisterBlock",{block:r,id:ct.name,type:"if",source:"(39:0) {#if components[1]}",ctx:n}),r}function lt(n){let e,t,c;var a=n[0][1];function l(u){return{props:{data:u[3],form:u[1]},$$inline:!0}}a&&(e=H(a,l(n)));const r={c:function(){e&&Y(e.$$.fragment),t=V()},l:function(i){e&&De(e.$$.fragment,i),t=V()},m:function(i,p){e&&X(e,i,p),W(i,t,p),c=!0},p:function(i,p){const b={};if(p&8&&(b.data=i[3]),p&2&&(b.form=i[1]),a!==(a=i[0][1])){if(e){pe();const w=e;F(w.$$.fragment,1,0,()=>{Z(w,1)}),he()}a?(e=H(a,l(i)),Y(e.$$.fragment),G(e.$$.fragment,1),X(e,t.parentNode,t)):e=null}else a&&e.$set(b)},i:function(i){c||(e&&G(e.$$.fragment,i),c=!0)},o:function(i){e&&F(e.$$.fragment,i),c=!1},d:function(i){i&&J(t),e&&Z(e,i)}};return x("SvelteRegisterBlock",{block:r,id:lt.name,type:"slot",source:"(40:1) <svelte:component this={components[0]} data={data_0}>",ctx:n}),r}function je(n){let e,t=n[5]&&Ie(n);const c={c:function(){e=wt("div"),t&&t.c(),this.h()},l:function(l){e=yt(l,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var r=bt(e);t&&t.l(r),r.forEach(J),this.h()},h:function(){ke(e,"id","svelte-announcer"),ke(e,"aria-live","assertive"),ke(e,"aria-atomic","true"),B(e,"position","absolute"),B(e,"left","0"),B(e,"top","0"),B(e,"clip","rect(0 0 0 0)"),B(e,"clip-path","inset(50%)"),B(e,"overflow","hidden"),B(e,"white-space","nowrap"),B(e,"width","1px"),B(e,"height","1px"),vt(e,Ht,47,1,993)},m:function(l,r){W(l,e,r),t&&t.m(e,null)},p:function(l,r){l[5]?t?t.p(l,r):(t=Ie(l),t.c(),t.m(e,null)):t&&(t.d(1),t=null)},d:function(l){l&&J(e),t&&t.d()}};return x("SvelteRegisterBlock",{block:c,id:je.name,type:"if",source:"(47:0) {#if mounted}",ctx:n}),c}function Ie(n){let e;const t={c:function(){e=kt(n[6])},l:function(a){e=Et(a,n[6])},m:function(a,l){W(a,e,l)},p:function(a,l){l&64&&Rt(e,a[6])},d:function(a){a&&J(e)}};return x("SvelteRegisterBlock",{block:t,id:Ie.name,type:"if",source:"(49:2) {#if navigated}",ctx:n}),t}function Ae(n){let e,t,c,a,l;const r=[ct,it],u=[];function i(w,k){return w[0][1]?0:1}e=i(n),t=u[e]=r[e](n);let p=n[4]&&je(n);const b={c:function(){t.c(),c=_t(),p&&p.c(),a=V()},l:function(k){t.l(k),c=gt(k),p&&p.l(k),a=V()},m:function(k,O){u[e].m(k,O),W(k,c,O),p&&p.m(k,O),W(k,a,O),l=!0},p:function(k,[O]){let N=e;e=i(k),e===N?u[e].p(k,O):(pe(),F(u[N],1,1,()=>{u[N]=null}),he(),t=u[e],t?t.p(k,O):(t=u[e]=r[e](k),t.c()),G(t,1),t.m(c.parentNode,c)),k[4]?p?p.p(k,O):(p=je(k),p.c(),p.m(a.parentNode,a)):p&&(p.d(1),p=null)},i:function(k){l||(G(t),l=!0)},o:function(k){F(t),l=!1},d:function(k){u[e].d(k),k&&J(c),p&&p.d(k),k&&J(a)}};return x("SvelteRegisterBlock",{block:b,id:Ae.name,type:"component",source:"",ctx:n}),b}function Yt(n,e,t){let{$$slots:c={},$$scope:a}=e;ht("Root",c,[]);let{stores:l}=e,{page:r}=e,{components:u}=e,{form:i}=e,{data_0:p=null}=e,{data_1:b=null}=e;Ze(l.page.notify);let w=!1,k=!1,O=null;de(()=>{const g=l.page.subscribe(()=>{w&&(t(5,k=!0),t(6,O=document.title||"untitled page"))});return t(4,w=!0),g}),n.$$.on_mount.push(function(){l===void 0&&!("stores"in e||n.$$.bound[n.$$.props.stores])&&console.warn("<Root> was created without expected prop 'stores'"),r===void 0&&!("page"in e||n.$$.bound[n.$$.props.page])&&console.warn("<Root> was created without expected prop 'page'"),u===void 0&&!("components"in e||n.$$.bound[n.$$.props.components])&&console.warn("<Root> was created without expected prop 'components'"),i===void 0&&!("form"in e||n.$$.bound[n.$$.props.form])&&console.warn("<Root> was created without expected prop 'form'")});const N=["stores","page","components","form","data_0","data_1"];return Object.keys(e).forEach(g=>{!~N.indexOf(g)&&g.slice(0,2)!=="$$"&&g!=="slot"&&console.warn(`<Root> was created with unknown prop '${g}'`)}),n.$$set=g=>{"stores"in g&&t(7,l=g.stores),"page"in g&&t(8,r=g.page),"components"in g&&t(0,u=g.components),"form"in g&&t(1,i=g.form),"data_0"in g&&t(2,p=g.data_0),"data_1"in g&&t(3,b=g.data_1)},n.$capture_state=()=>({setContext:mt,afterUpdate:Ze,onMount:de,browser:zt,stores:l,page:r,components:u,form:i,data_0:p,data_1:b,mounted:w,navigated:k,title:O}),n.$inject_state=g=>{"stores"in g&&t(7,l=g.stores),"page"in g&&t(8,r=g.page),"components"in g&&t(0,u=g.components),"form"in g&&t(1,i=g.form),"data_0"in g&&t(2,p=g.data_0),"data_1"in g&&t(3,b=g.data_1),"mounted"in g&&t(4,w=g.mounted),"navigated"in g&&t(5,k=g.navigated),"title"in g&&t(6,O=g.title)},e&&"$$inject"in e&&n.$inject_state(e.$$inject),n.$$.update=()=>{n.$$.dirty&384&&l.page.set(r)},[u,i,p,b,w,k,O,l,r]}class Xt extends ut{constructor(e){super(e),dt(this,e,Yt,Ae,pt,{stores:7,page:8,components:0,form:1,data_0:2,data_1:3}),x("SvelteRegisterComponent",{component:this,tagName:"Root",options:e,id:Ae.name})}get stores(){throw new Error("<Root>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}set stores(e){throw new Error("<Root>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}get page(){throw new Error("<Root>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}set page(e){throw new Error("<Root>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}get components(){throw new Error("<Root>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}set components(e){throw new Error("<Root>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}get form(){throw new Error("<Root>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}set form(e){throw new Error("<Root>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}get data_0(){throw new Error("<Root>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}set data_0(e){throw new Error("<Root>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}get data_1(){throw new Error("<Root>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}set data_1(e){throw new Error("<Root>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}}const Zt="modulepreload",Qt=function(n,e){return new URL(n,e).href},rt={},Se=function(e,t,c){if(!t||t.length===0)return e();const a=document.getElementsByTagName("link");return Promise.all(t.map(l=>{if(l=Qt(l,c),l in rt)return;rt[l]=!0;const r=l.endsWith(".css"),u=r?'[rel="stylesheet"]':"";if(!!c)for(let b=a.length-1;b>=0;b--){const w=a[b];if(w.href===l&&(!r||w.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${l}"]${u}`))return;const p=document.createElement("link");if(p.rel=r?"stylesheet":Zt,r||(p.as="script",p.crossOrigin=""),p.href=l,document.head.appendChild(p),r)return new Promise((b,w)=>{p.addEventListener("load",b),p.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${l}`)))})})).then(()=>e())},$t={},_e=[()=>Se(()=>import("./chunks/0-585d18f5.js"),["./chunks/0-585d18f5.js","./chunks/_layout-da46b06b.js","./components/pages/_layout.svelte-f47652a0.js","./chunks/index-cfeff11a.js","./assets/_layout-960a6441.css"],import.meta.url),()=>Se(()=>import("./chunks/1-fbb347ec.js"),["./chunks/1-fbb347ec.js","./components/error.svelte-8462986e.js","./chunks/index-cfeff11a.js","./chunks/singletons-970aa6f0.js"],import.meta.url),()=>Se(()=>import("./chunks/2-19050454.js"),["./chunks/2-19050454.js","./components/pages/_page.svelte-0b4587d4.js","./chunks/index-cfeff11a.js","./assets/_page-5f006fac.css"],import.meta.url)],en=[],tn={"/":[2]},nn={handleError:({error:n})=>{console.error(n)}};class Ne{constructor(e,t){this.status=e,typeof t=="string"?this.body={message:t}:t?this.body=t:this.body={message:`Error: ${e}`}}toString(){return JSON.stringify(this.body)}}class ot{constructor(e,t){this.status=e,this.location=t}}async function rn(n){var e;for(const t in n)if(typeof((e=n[t])==null?void 0:e.then)=="function")return Object.fromEntries(await Promise.all(Object.entries(n).map(async([c,a])=>[c,await a])));return n}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");Object.getOwnPropertyNames(Object.prototype).sort().join("\0");const on=-1,an=-2,sn=-3,cn=-4,ln=-5,fn=-6;function un(n){if(typeof n=="number")return c(n,!0);if(!Array.isArray(n)||n.length===0)throw new Error("Invalid input");const e=n,t=Array(e.length);function c(a,l=!1){if(a===on)return;if(a===sn)return NaN;if(a===cn)return 1/0;if(a===ln)return-1/0;if(a===fn)return-0;if(l)throw new Error("Invalid input");if(a in t)return t[a];const r=e[a];if(!r||typeof r!="object")t[a]=r;else if(Array.isArray(r))if(typeof r[0]=="string")switch(r[0]){case"Date":t[a]=new Date(r[1]);break;case"Set":const i=new Set;t[a]=i;for(let w=1;w<r.length;w+=1)i.add(c(r[w]));break;case"Map":const p=new Map;t[a]=p;for(let w=1;w<r.length;w+=2)p.set(c(r[w]),c(r[w+1]));break;case"RegExp":t[a]=new RegExp(r[1],r[2]);break;case"Object":t[a]=Object(r[1]);break;case"BigInt":t[a]=BigInt(r[1]);break;case"null":const b=Object.create(null);t[a]=b;for(let w=1;w<r.length;w+=2)b[r[w]]=c(r[w+1]);break}else{const u=new Array(r.length);t[a]=u;for(let i=0;i<r.length;i+=1){const p=r[i];p!==an&&(u[i]=c(p))}}else{const u={};t[a]=u;for(const i in r){const p=r[i];u[i]=c(p)}}return t[a]}return c(0)}function dn(n){const e=new Set(n);function t(c,a){if(c){for(const l in c)if(l[0]!=="_"&&!e.has(l)){const r=n.join(", ");throw new Error(`Invalid export '${l}'${a?` in ${a}`:""} (valid exports are ${r}, or anything with a '_' prefix)`)}}}return t}const pn=dn(["load","prerender","csr","ssr","trailingSlash"]),Pe=xt(_e,en,tn,$t),Ue=_e[0],Te=_e[1];Ue();Te();let ne={};try{ne=JSON.parse(sessionStorage[st])}catch{}function Oe(n){ne[n]=ue()}function hn({target:n,base:e}){var He;const t=document.documentElement,c=[];let a=null;const l={before_navigate:[],after_navigate:[]};let r={branch:[],error:null,url:null},u=!1,i=!1,p=!0,b=!1,w=!1,k=!1,O=!1,N,g=(He=history.state)==null?void 0:He[q];g||(g=Date.now(),history.replaceState({...history.state,[q]:g},"",location.href));const ge=ne[g];ge&&(history.scrollRestoration="manual",scrollTo(ge.x,ge.y));let K,qe,re;async function Ve(){re=re||Promise.resolve(),await re,re=null;const o=new URL(location.href),s=se(o,!0);a=null,await Ge(s,o,[])}async function we(o,{noScroll:s=!1,replaceState:d=!1,keepFocus:f=!1,state:m={},invalidateAll:_=!1},h,E){return typeof o=="string"&&(o=new URL(o,Qe(document))),ie({url:o,scroll:s?ue():null,keepfocus:f,redirect_chain:h,details:{state:m,replaceState:d},nav_token:E,accepted:()=>{_&&(O=!0)},blocked:()=>{},type:"goto"})}async function Fe(o){const s=se(o,!1);if(!s)throw new Error(`Attempted to preload a URL that does not belong to this app: ${o}`);return a={id:s.id,promise:Me(s).then(d=>(d.type==="loaded"&&d.state.error&&(a=null),d))},a.promise}async function oe(...o){const d=Pe.filter(f=>o.some(m=>f.exec(m))).map(f=>Promise.all([...f.layouts,f.leaf].map(m=>m==null?void 0:m[1]())));await Promise.all(d)}async function Ge(o,s,d,f,m={},_){var E,v;qe=m;let h=o&&await Me(o);if(h||(h=await ze(s,{id:null},await ee(new Error(`Not found: ${s.pathname}`),{url:s,params:{},route:{id:null}}),404)),s=(o==null?void 0:o.url)||s,qe!==m)return!1;if(h.type==="redirect")if(d.length>10||d.includes(s.pathname))h=await ae({status:500,error:await ee(new Error("Redirect loop"),{url:s,params:{},route:{id:null}}),url:s,route:{id:null}});else return we(new URL(h.location,s).href,{},[...d,s.pathname],m),!1;else((v=(E=h.props)==null?void 0:E.page)==null?void 0:v.status)>=400&&await M.updated.check()&&await ce(s);if(c.length=0,O=!1,b=!0,f&&f.details){const{details:y}=f,P=y.replaceState?0:1;y.state[q]=g+=P,history[y.replaceState?"replaceState":"pushState"](y.state,"",s)}if(a=null,i?(r=h.state,h.props.page&&(h.props.page.url=s),N.$set(h.props)):Je(h),f){const{scroll:y,keepfocus:P}=f;if(P||Le(),await le(),p){const L=s.hash&&document.getElementById(s.hash.slice(1));y?scrollTo(y.x,y.y):L?L.scrollIntoView():scrollTo(0,0)}}else await le();p=!0,h.props.page&&(K=h.props.page),_&&_(),b=!1}function Je(o){var f;if(document.querySelector("vite-error-overlay"))return;r=o.state;const s=document.querySelector("style[data-sveltekit]");s&&s.remove(),K=o.props.page,N=new Xt({target:n,props:{...o.props,stores:M},hydrate:!0});const d={from:null,to:{params:r.params,route:{id:((f=r.route)==null?void 0:f.id)??null},url:new URL(location.href)},willUnload:!1,type:"enter"};l.after_navigate.forEach(m=>m(d)),i=!0}async function Q({url:o,params:s,branch:d,status:f,error:m,route:_,form:h}){const E=d.filter(Boolean);let v="never";for(const j of d)(j==null?void 0:j.slash)!==void 0&&(v=j.slash);o.pathname=Ot(o.pathname,v),o.search=o.search;const y={type:"loaded",state:{url:o,params:s,branch:d,error:m,route:_},props:{components:E.map(j=>j.node.component)}};h!==void 0&&(y.props.form=h);let P={},L=!K;for(let j=0;j<E.length;j+=1){const R=E[j];P={...P,...R.data},(L||!r.branch.some(T=>T===R))&&(y.props[`data_${j}`]=P,L=L||Object.keys(R.data??{}).length>0)}return L||(L=Object.keys(K.data).length!==Object.keys(P).length),(!r.url||o.href!==r.url.href||r.error!==m||h!==void 0||L)&&(y.props.page={error:m,params:s,route:_,status:f,url:new URL(o),form:h??null,data:L?P:K.data}),y}async function ye({loader:o,parent:s,url:d,params:f,route:m,server_data_node:_}){var y,P,L;let h=null;const E={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1},v=await o();if(pn(v.universal),(y=v.universal)!=null&&y.load){let C=function(...R){for(const T of R){const{href:D}=new URL(T,d);E.dependencies.add(D)}};const j={route:{get id(){return E.route=!0,m.id}},params:new Proxy(f,{get:(R,T)=>(E.params.add(T),R[T])}),data:(_==null?void 0:_.data)??null,url:At(d,()=>{E.url=!0}),async fetch(R,T){let D;R instanceof Request?(D=R.url,T={body:R.method==="GET"||R.method==="HEAD"?void 0:await R.blob(),cache:R.cache,credentials:R.credentials,headers:R.headers,integrity:R.integrity,keepalive:R.keepalive,method:R.method,mode:R.mode,redirect:R.redirect,referrer:R.referrer,referrerPolicy:R.referrerPolicy,signal:R.signal,...T}):D=R;const S=new URL(D,d).href;return C(S),i?Ft(D,S,T):Vt(D,T)},setHeaders:()=>{},depends:C,parent(){return E.parent=!0,s()}};try{if(Bt(),h=await v.universal.load.call(null,j)??null,h!=null&&Object.getPrototypeOf(h)!==Object.prototype)throw new Error(`a load function related to route '${m.id}' returned ${typeof h!="object"?`a ${typeof h}`:h instanceof Response?"a Response object":Array.isArray(h)?"an array":"a non-plain object"}, but must return a plain object at the top level (i.e. \`return {...}\`)`)}finally{qt()}h=h?await rn(h):null}return{node:v,loader:o,server:_,universal:(P=v.universal)!=null&&P.load?{type:"data",data:h,uses:E}:null,data:h??(_==null?void 0:_.data)??null,slash:((L=v.universal)==null?void 0:L.trailingSlash)??(_==null?void 0:_.slash)}}function Ke(o,s,d,f,m){if(O)return!0;if(!f)return!1;if(f.parent&&o||f.route&&s||f.url&&d)return!0;for(const _ of f.params)if(m[_]!==r.params[_])return!0;for(const _ of f.dependencies)if(c.some(h=>h(new URL(_))))return!0;return!1}function be(o,s){return(o==null?void 0:o.type)==="data"?{type:"data",data:o.data,uses:{dependencies:new Set(o.uses.dependencies??[]),params:new Set(o.uses.params??[]),parent:!!o.uses.parent,route:!!o.uses.route,url:!!o.uses.url},slash:o.slash}:(o==null?void 0:o.type)==="skip"?s??null:null}async function Me({id:o,invalidating:s,url:d,params:f,route:m}){if((a==null?void 0:a.id)===o)return a.promise;const{errors:_,layouts:h,leaf:E}=m,v=[...h,E];_.forEach(S=>S==null?void 0:S().catch(()=>{})),v.forEach(S=>S==null?void 0:S[1]().catch(()=>{}));let y=null;const P=r.url?o!==r.url.pathname+r.url.search:!1,L=r.route?o!==r.route.id:!1,C=v.reduce((S,A,U)=>{var $;const I=r.branch[U],z=!!(A!=null&&A[0])&&((I==null?void 0:I.loader)!==A[1]||Ke(S.some(Boolean),L,P,($=I.server)==null?void 0:$.uses,f));return S.push(z),S},[]);if(C.some(Boolean)){try{y=await at(d,C)}catch(S){return ae({status:500,error:await ee(S,{url:d,params:f,route:{id:m.id}}),url:d,route:m})}if(y.type==="redirect")return y}const j=y==null?void 0:y.nodes;let R=!1;const T=v.map(async(S,A)=>{var $;if(!S)return;const U=r.branch[A],I=j==null?void 0:j[A];if((!I||I.type==="skip")&&S[1]===(U==null?void 0:U.loader)&&!Ke(R,L,P,($=U.universal)==null?void 0:$.uses,f))return U;if(R=!0,(I==null?void 0:I.type)==="error")throw I;return ye({loader:S[1],url:d,params:f,route:m,parent:async()=>{var Xe;const Ye={};for(let ve=0;ve<A;ve+=1)Object.assign(Ye,(Xe=await T[ve])==null?void 0:Xe.data);return Ye},server_data_node:be(I===void 0&&S[0]?{type:"skip"}:I??null,U==null?void 0:U.server)})});for(const S of T)S.catch(()=>{});const D=[];for(let S=0;S<v.length;S+=1)if(v[S])try{D.push(await T[S])}catch(A){if(A instanceof ot)return{type:"redirect",location:A.location};let U=500,I;j!=null&&j.includes(A)?(U=A.status??U,I=A.error):A instanceof Ne?(U=A.status,I=A.body):I=await ee(A,{params:f,url:d,route:{id:m.id}});const z=await We(S,D,_);return z?await Q({url:d,params:f,branch:D.slice(0,z.idx).concat(z.node),status:U,error:I,route:m}):await ze(d,{id:m.id},I,U)}else D.push(void 0);return await Q({url:d,params:f,branch:D,status:200,error:null,route:m,form:s?void 0:null})}async function We(o,s,d){for(;o--;)if(d[o]){let f=o;for(;!s[f];)f-=1;try{return{idx:f+1,node:{node:await d[o](),loader:d[o],data:{},server:null,universal:null}}}catch{continue}}}async function ae({status:o,error:s,url:d,route:f}){const m={},_=await Ue();let h=null;if(_.server)try{const y=await at(d,[!0]);if(y.type!=="data"||y.nodes[0]&&y.nodes[0].type!=="data")throw 0;h=y.nodes[0]??null}catch{(d.origin!==location.origin||d.pathname!==location.pathname||u)&&await ce(d)}const E=await ye({loader:Ue,url:d,params:m,route:f,parent:()=>Promise.resolve({}),server_data_node:be(h)}),v={node:await Te(),loader:Te,universal:null,server:null,data:null};return await Q({url:d,params:m,branch:[E,v],status:o,error:s,route:null})}function se(o,s){if(et(o,e))return;const d=Lt(o.pathname.slice(e.length)||"/");for(const f of Pe){const m=f.exec(d);if(m)return{id:o.pathname+o.search,invalidating:s,route:f,params:jt(m),url:o}}}function xe({url:o,type:s,intent:d,delta:f}){var E,v;let m=!1;const _={from:{params:r.params,route:{id:((E=r.route)==null?void 0:E.id)??null},url:r.url},to:{params:(d==null?void 0:d.params)??null,route:{id:((v=d==null?void 0:d.route)==null?void 0:v.id)??null},url:o},willUnload:!d,type:s};f!==void 0&&(_.delta=f);const h={..._,cancel:()=>{m=!0}};return w||l.before_navigate.forEach(y=>y(h)),m?null:_}async function ie({url:o,scroll:s,keepfocus:d,redirect_chain:f,details:m,type:_,delta:h,nav_token:E,accepted:v,blocked:y}){const P=se(o,!1),L=xe({url:o,type:_,delta:h,intent:P});if(!L){y();return}Oe(g),v(),w=!0,i&&M.navigating.set(L),await Ge(P,o,f,{scroll:s,keepfocus:d,details:m},E,()=>{w=!1,l.after_navigate.forEach(C=>C(L)),M.navigating.set(null)})}async function ze(o,s,d,f){return o.origin===location.origin&&o.pathname===location.pathname&&!u?await ae({status:f,error:d,url:o,route:s}):await ce(o)}function ce(o){return location.href=o.href,new Promise(()=>{})}function ft(){let o;t.addEventListener("mousemove",_=>{const h=_.target;clearTimeout(o),o=setTimeout(()=>{f(h,2)},20)});function s(_){f(_.composedPath()[0],1)}t.addEventListener("mousedown",s),t.addEventListener("touchstart",s,{passive:!0});const d=new IntersectionObserver(_=>{for(const h of _)h.isIntersecting&&(oe(new URL(h.target.href).pathname),d.unobserve(h.target))},{threshold:0});function f(_,h){const E=$e(_,t);if(!E)return;const{url:v,external:y}=Ee(E,e);if(y)return;const P=fe(E);P.reload||(h<=P.preload_data?Fe(v):h<=P.preload_code&&oe(v.pathname))}function m(){d.disconnect();for(const _ of t.querySelectorAll("a")){const{url:h,external:E}=Ee(_,e);if(E)continue;const v=fe(_);v.reload||(v.preload_code===tt.viewport&&d.observe(_),v.preload_code===tt.eager&&oe(h.pathname))}}l.after_navigate.push(m),m()}return{after_navigate:o=>{de(()=>(l.after_navigate.push(o),()=>{const s=l.after_navigate.indexOf(o);l.after_navigate.splice(s,1)}))},before_navigate:o=>{de(()=>(l.before_navigate.push(o),()=>{const s=l.before_navigate.indexOf(o);l.before_navigate.splice(s,1)}))},disable_scroll_handling:()=>{if(i&&!b)throw new Error("Can only disable scroll handling during navigation");(b||!i)&&(p=!1)},goto:(o,s={})=>we(o,s,[]),invalidate:o=>{if(typeof o=="function")c.push(o);else{const{href:s}=new URL(o,location.href);c.push(d=>d.href===s)}return Ve()},invalidateAll:()=>(O=!0,Ve()),preload_data:async o=>{const s=new URL(o,Qe(document));await Fe(s)},preload_code:oe,apply_action:async o=>{if(o.type==="error"){const s=new URL(location.href),{branch:d,route:f}=r;if(!f)return;const m=await We(r.branch.length,d,f.errors);if(m){const _=await Q({url:s,params:r.params,branch:d.slice(0,m.idx).concat(m.node),status:o.status??500,error:o.error,route:f});r=_.state,N.$set(_.props),le().then(Le)}}else if(o.type==="redirect")we(o.location,{invalidateAll:!0},[]);else{const s={form:o.data,page:{...K,form:o.data,status:o.status}};N.$set(s),o.type==="success"&&le().then(Le)}},_start_router:()=>{var o;history.scrollRestoration="manual",addEventListener("beforeunload",s=>{var f;let d=!1;if(!w){const m={from:{params:r.params,route:{id:((f=r.route)==null?void 0:f.id)??null},url:r.url},to:null,willUnload:!0,type:"leave",cancel:()=>d=!0};l.before_navigate.forEach(_=>_(m))}d?(s.preventDefault(),s.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"){Oe(g);try{sessionStorage[st]=JSON.stringify(ne)}catch{}}}),(o=navigator.connection)!=null&&o.saveData||ft(),t.addEventListener("click",s=>{if(s.button||s.which!==1||s.metaKey||s.ctrlKey||s.shiftKey||s.altKey||s.defaultPrevented)return;const d=$e(s.composedPath()[0],t);if(!d)return;const{url:f,external:m,has:_}=Ee(d,e),h=fe(d);if(!f||!(d instanceof SVGAElement)&&f.protocol!==location.protocol&&!(f.protocol==="https:"||f.protocol==="http:")||_.download)return;if(m||h.reload){xe({url:f,type:"link"})||s.preventDefault(),w=!0;return}const[v,y]=f.href.split("#");if(y!==void 0&&v===location.href.split("#")[0]){k=!0,Oe(g),r.url=f,M.page.set({...K,url:f}),M.page.notify();return}ie({url:f,scroll:h.noscroll?ue():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:f.href===location.href},accepted:()=>s.preventDefault(),blocked:()=>s.preventDefault(),type:"link"})}),t.addEventListener("submit",s=>{var v;if(s.defaultPrevented)return;const d=HTMLFormElement.prototype.cloneNode.call(s.target),f=s.submitter;if(((f==null?void 0:f.formMethod)||d.method)!=="get")return;const _=new URL(((v=s.submitter)==null?void 0:v.hasAttribute("formaction"))&&(f==null?void 0:f.formAction)||d.action);if(et(_,e))return;const{noscroll:h,reload:E}=fe(s.target);E||(s.preventDefault(),s.stopPropagation(),_.search=new URLSearchParams(new FormData(s.target)).toString(),ie({url:_,scroll:h?ue():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:!1},nav_token:{},accepted:()=>{},blocked:()=>{},type:"form"}))}),addEventListener("popstate",s=>{var d;if((d=s.state)!=null&&d[q]){if(s.state[q]===g)return;const f=s.state[q]-g;ie({url:new URL(location.href),scroll:ne[s.state[q]],keepfocus:!1,redirect_chain:[],details:null,accepted:()=>{g=s.state[q]},blocked:()=>{history.go(-f)},type:"popstate",delta:f})}}),addEventListener("hashchange",()=>{k&&(k=!1,history.replaceState({...history.state,[q]:++g},"",location.href))});for(const s of document.querySelectorAll("link"))s.rel==="icon"&&(s.href=s.href);addEventListener("pageshow",s=>{s.persisted&&M.navigating.set(null)})},_hydrate:async({status:o=200,error:s,node_ids:d,params:f,route:m,data:_,form:h})=>{u=!0;const E=new URL(location.href);({params:f={},route:m={id:null}}=se(E,!1)||{});let v;try{const y=d.map(async(P,L)=>{const C=_[L];return ye({loader:_e[P],url:E,params:f,route:m,parent:async()=>{const j={};for(let R=0;R<L;R+=1)Object.assign(j,(await y[R]).data);return j},server_data_node:be(C)})});v=await Q({url:E,params:f,branch:await Promise.all(y),status:o,error:s,form:h,route:Pe.find(({id:P})=>P===m.id)??null})}catch(y){if(y instanceof ot){await ce(new URL(y.location,location.href));return}v=await ae({status:y instanceof Ne?y.status:500,error:await ee(y,{url:E,params:f,route:m}),url:E,route:m})}Je(v)}}}async function at(n,e){var l;const t=new URL(n);if(t.pathname=Tt(n.pathname),n.searchParams.has("x-sveltekit-invalidated"))throw new Error('Cannot used reserved query parameter "x-sveltekit-invalidated"');t.searchParams.append("x-sveltekit-invalidated",e.map(r=>r?"1":"").join("_"));const c=await me(t.href),a=await c.json();if(!c.ok)throw new Error(a);return(l=a.nodes)==null||l.forEach(r=>{(r==null?void 0:r.type)==="data"&&(r.data=un(r.data),r.uses={dependencies:new Set(r.uses.dependencies??[]),params:new Set(r.uses.params??[]),parent:!!r.uses.parent,route:!!r.uses.route,url:!!r.uses.url})}),a}function ee(n,e){return n instanceof Ne?n.body:nn.handleError({error:n,event:e})??{message:e.route.id!=null?"Internal Error":"Not Found"}}function Le(){const n=document.querySelector("[autofocus]");if(n)n.focus();else{const e=document.body,t=e.getAttribute("tabindex");e.tabIndex=-1,e.focus({preventScroll:!0}),setTimeout(()=>{var c;(c=getSelection())==null||c.removeAllRanges()}),t!==null?e.setAttribute("tabindex",t):e.removeAttribute("tabindex")}}{const n=console.warn;console.warn=function(...t){t.length===1&&/<(Layout|Page)(_[\w$]+)?> was created (with unknown|without expected) prop '(data|form)'/.test(t[0])||n(...t)}}async function gn({env:n,hydrate:e,paths:t,target:c,version:a}){Dt(t),c===document.body&&console.warn(`Placing %sveltekit.body% directly inside <body> is not recommended, as your app may break for users who have certain browser extensions installed.

Consider wrapping it in an element:

<div style="display: contents">
  %sveltekit.body%
</div>`);const l=hn({target:c,base:t.base});St({client:l}),e?await l._hydrate(e):l.goto(location.href,{replaceState:!0}),l._start_router()}export{gn as start};
