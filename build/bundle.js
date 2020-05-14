var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function s(t){t.forEach(e)}function i(t){return"function"==typeof t}function o(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function r(t,e,n,s){if(t){const i=c(t,e,n,s);return t[0](i)}}function c(t,e,n,s){return t[1]&&s?function(t,e){for(const n in e)t[n]=e[n];return t}(n.ctx.slice(),t[1](s(e))):n.ctx}function a(t,e,n,s){if(t[2]&&s){const i=t[2](s(n));if(void 0===e.dirty)return i;if("object"==typeof i){const t=[],n=Math.max(e.dirty.length,i.length);for(let s=0;s<n;s+=1)t[s]=e.dirty[s]|i[s];return t}return e.dirty|i}return e.dirty}function l(t,e){t.appendChild(e)}function h(t,e,n){t.insertBefore(e,n||null)}function u(t){t.parentNode.removeChild(t)}function f(t){return document.createElement(t)}function d(t){return document.createTextNode(t)}function p(){return d(" ")}function g(t,e,n,s){return t.addEventListener(e,n,s),()=>t.removeEventListener(e,n,s)}function m(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function y(t,e){e=""+e,t.data!==e&&(t.data=e)}function x(t,e){(null!=e||t.value)&&(t.value=e)}function $(t,e,n){t.classList[n?"add":"remove"](e)}let v;function w(t){v=t}function k(){if(!v)throw new Error("Function called outside component initialization");return v}function M(){const t=k();return(e,n)=>{const s=t.$$.callbacks[e];if(s){const i=function(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}(e,n);s.slice().forEach(e=>{e.call(t,i)})}}}const b=[],C=[],_=[],S=[],I=Promise.resolve();let L=!1;function O(t){_.push(t)}let A=!1;const E=new Set;function K(){if(!A){A=!0;do{for(let t=0;t<b.length;t+=1){const e=b[t];w(e),j(e.$$)}for(b.length=0;C.length;)C.pop()();for(let t=0;t<_.length;t+=1){const e=_[t];E.has(e)||(E.add(e),e())}_.length=0}while(b.length);for(;S.length;)S.pop()();L=!1,A=!1,E.clear()}}function j(t){if(null!==t.fragment){t.update(),s(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(O)}}const P=new Set;function R(t,e){t&&t.i&&(P.delete(t),t.i(e))}function N(t,e,n,s){if(t&&t.o){if(P.has(t))return;P.add(t),(void 0).c.push(()=>{P.delete(t),s&&(n&&t.d(1),s())}),t.o(e)}}function T(t){t&&t.c()}function D(t,n,o){const{fragment:r,on_mount:c,on_destroy:a,after_update:l}=t.$$;r&&r.m(n,o),O(()=>{const n=c.map(e).filter(i);a?a.push(...n):s(n),t.$$.on_mount=[]}),l.forEach(O)}function F(t,e){const n=t.$$;null!==n.fragment&&(s(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function W(t,e){-1===t.$$.dirty[0]&&(b.push(t),L||(L=!0,I.then(K)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function q(e,i,o,r,c,a,l=[-1]){const h=v;w(e);const f=i.props||{},d=e.$$={fragment:null,ctx:null,props:a,update:t,not_equal:c,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(h?h.$$.context:[]),callbacks:n(),dirty:l};let p=!1;if(d.ctx=o?o(e,f,(t,n,...s)=>{const i=s.length?s[0]:n;return d.ctx&&c(d.ctx[t],d.ctx[t]=i)&&(d.bound[t]&&d.bound[t](i),p&&W(e,t)),n}):[],d.update(),p=!0,s(d.before_update),d.fragment=!!r&&r(d.ctx),i.target){if(i.hydrate){const t=function(t){return Array.from(t.childNodes)}(i.target);d.fragment&&d.fragment.l(t),t.forEach(u)}else d.fragment&&d.fragment.c();i.intro&&R(e.$$.fragment),D(e,i.target,i.anchor),K()}w(h)}class U{$destroy(){F(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}const z=t=>Array.isArray?Array.isArray(t):"[object Array]"===Object.prototype.toString.call(t),B=t=>"string"==typeof t,H=t=>"number"==typeof t,J=t=>null!=t,G=t=>!t.trim().length;var V={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(t,e)=>t.score===e.score?t.idx<e.idx?-1:1:t.score<e.score?-1:1,includeMatches:!1,findAllMatches:!1,minMatchCharLength:1,location:0,threshold:.6,distance:100,...{useExtendedSearch:!1,getFn:function(t,e){let n=[],s=!1;const i=(t,e)=>{if(e){const o=e.indexOf(".");let r=e,c=null;-1!==o&&(r=e.slice(0,o),c=e.slice(o+1));const a=t[r];if(J(a))if(c||!B(a)&&!H(a))if(z(a)){s=!0;for(let t=0,e=a.length;t<e;t+=1)i(a[t],c)}else c&&i(a,c);else n.push((t=>null==t?"":(t=>{if("string"==typeof t)return t;let e=t+"";return"0"==e&&1/t==-1/0?"-0":e})(t))(a))}else n.push(t)};return i(t,e),s?n:n[0]}}};function X(t,{errors:e=0,currentLocation:n=0,expectedLocation:s=0,distance:i=V.distance}={}){const o=e/t.length,r=Math.abs(s-n);return i?o+r/i:r?1:o}function Q(t,e,n,{location:s=V.location,distance:i=V.distance,threshold:o=V.threshold,findAllMatches:r=V.findAllMatches,minMatchCharLength:c=V.minMatchCharLength,includeMatches:a=V.includeMatches}={}){if(e.length>32)throw new Error("Pattern length exceeds max of 32.");const l=e.length,h=t.length,u=Math.max(0,Math.min(s,h));let f=o,d=u;const p=[];if(a)for(let t=0;t<h;t+=1)p[t]=0;let g;for(;(g=t.indexOf(e,d))>-1;){let t=X(e,{currentLocation:g,expectedLocation:u,distance:i});if(f=Math.min(t,f),d=g+l,a){let t=0;for(;t<l;)p[g+t]=1,t+=1}}d=-1;let m=[],y=1,x=l+h;const $=1<<(l<=31?l-1:30);for(let s=0;s<l;s+=1){let o=0,c=x;for(;o<c;){X(e,{errors:s,currentLocation:u+c,expectedLocation:u,distance:i})<=f?o=c:x=c,c=Math.floor((x-o)/2+o)}x=c;let g=Math.max(1,u-c+1),v=r?h:Math.min(u+c,h)+l,w=Array(v+2);w[v+1]=(1<<s)-1;for(let o=v;o>=g;o-=1){let r=o-1,c=n[t.charAt(r)];if(c&&a&&(p[r]=1),w[o]=(w[o+1]<<1|1)&c,0!==s&&(w[o]|=(m[o+1]|m[o])<<1|1|m[o+1]),w[o]&$&&(y=X(e,{errors:s,currentLocation:r,expectedLocation:u,distance:i}),y<=f)){if(f=y,d=r,d<=u)break;g=Math.max(1,2*u-d)}}if(X(e,{errors:s+1,currentLocation:u,expectedLocation:u,distance:i})>f)break;m=w}let v={isMatch:d>=0,score:y||.001};return a&&(v.matchedIndices=function(t=[],e=V.minMatchCharLength){let n=[],s=-1,i=-1,o=0;for(let r=t.length;o<r;o+=1){let r=t[o];r&&-1===s?s=o:r||-1===s||(i=o-1,i-s+1>=e&&n.push([s,i]),s=-1)}return t[o-1]&&o-s>=e&&n.push([s,o-1]),n}(p,c)),v}function Y(t){let e={},n=t.length;for(let s=0;s<n;s+=1)e[t.charAt(s)]=0;for(let s=0;s<n;s+=1)e[t.charAt(s)]|=1<<n-s-1;return e}class Z{constructor(t,{location:e=V.location,threshold:n=V.threshold,distance:s=V.distance,includeMatches:i=V.includeMatches,findAllMatches:o=V.findAllMatches,minMatchCharLength:r=V.minMatchCharLength,isCaseSensitive:c=V.isCaseSensitive}={}){this.options={location:e,threshold:n,distance:s,includeMatches:i,findAllMatches:o,minMatchCharLength:r,isCaseSensitive:c},this.pattern=c?t:t.toLowerCase(),this.chunks=[];let a=0;for(;a<this.pattern.length;){let t=this.pattern.substring(a,a+32);this.chunks.push({pattern:t,alphabet:Y(t)}),a+=32}}searchIn(t){let e=t.$;return this.searchInString(e)}searchInString(t){const{isCaseSensitive:e,includeMatches:n}=this.options;if(e||(t=t.toLowerCase()),this.pattern===t){let e={isMatch:!0,score:0};return n&&(e.matchedIndices=[[0,t.length-1]]),e}const{location:s,distance:i,threshold:o,findAllMatches:r,minMatchCharLength:c}=this.options;let a=[],l=0,h=!1;for(let e=0,u=this.chunks.length;e<u;e+=1){let{pattern:u,alphabet:f}=this.chunks[e],d=Q(t,u,f,{location:s+32*e,distance:i,threshold:o,findAllMatches:r,minMatchCharLength:c,includeMatches:n});const{isMatch:p,score:g,matchedIndices:m}=d;p&&(h=!0),l+=g,p&&m&&(a=[...a,...m])}let u={isMatch:h,score:h?l/this.chunks.length:1};return h&&n&&(u.matchedIndices=a),u}}class tt{constructor(t){this.pattern=t}static isMultiMatch(t){return et(t,this.multiRegex)}static isSingleMatch(t){return et(t,this.singleRegex)}search(){}}function et(t,e){const n=t.match(e);return n?n[1]:null}class nt extends tt{constructor(t){super(t)}static get type(){return"exact"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(t){let e,n=0;const s=[],i=this.pattern.length;for(;(e=t.indexOf(this.pattern,n))>-1;)n=e+i,s.push([e,n-1]);const o=!!s.length;return{isMatch:o,score:o?1:0,matchedIndices:s}}}class st extends tt{constructor(t,{location:e=V.location,threshold:n=V.threshold,distance:s=V.distance,includeMatches:i=V.includeMatches,findAllMatches:o=V.findAllMatches,minMatchCharLength:r=V.minMatchCharLength,isCaseSensitive:c=V.isCaseSensitive}={}){super(t),this._bitapSearch=new Z(t,{location:e,threshold:n,distance:s,includeMatches:i,findAllMatches:o,minMatchCharLength:r,isCaseSensitive:c})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(t){return this._bitapSearch.searchInString(t)}}const it=[nt,class extends tt{constructor(t){super(t)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(t){const e=t.startsWith(this.pattern);return{isMatch:e,score:e?0:1,matchedIndices:[0,this.pattern.length-1]}}},class extends tt{constructor(t){super(t)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(t){const e=!t.startsWith(this.pattern);return{isMatch:e,score:e?0:1,matchedIndices:[0,t.length-1]}}},class extends tt{constructor(t){super(t)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(t){const e=!t.endsWith(this.pattern);return{isMatch:e,score:e?0:1,matchedIndices:[0,t.length-1]}}},class extends tt{constructor(t){super(t)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(t){const e=t.endsWith(this.pattern);return{isMatch:e,score:e?0:1,matchedIndices:[t.length-this.pattern.length,t.length-1]}}},class extends tt{constructor(t){super(t)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(t){const e=-1===t.indexOf(this.pattern);return{isMatch:e,score:e?0:1,matchedIndices:[0,t.length-1]}}},st],ot=it.length,rt=/ +(?=([^\"]*\"[^\"]*\")*[^\"]*$)/;const ct=new Set([st.type,nt.type]);const at=/[^ ]+/g;function lt(t,e,{getFn:n=V.getFn}={}){let s=[];if(B(e[0]))for(let t=0,n=e.length;t<n;t+=1){const n=e[t];if(J(n)&&!G(n)){let e={$:n,idx:t,t:n.match(at).length};s.push(e)}}else{const i=t.length;for(let o=0,r=e.length;o<r;o+=1){let r=e[o],c={idx:o,$:{}};for(let e=0;e<i;e+=1){let s=t[e],i=n(r,s);if(J(i))if(z(i)){let t=[];const e=[{arrayIndex:-1,value:i}];for(;e.length;){const{arrayIndex:n,value:s}=e.pop();if(J(s))if(B(s)&&!G(s)){let e={$:s,idx:n,t:s.match(at).length};t.push(e)}else if(z(s))for(let t=0,n=s.length;t<n;t+=1)e.push({arrayIndex:t,value:s[t]})}c.$[s]=t}else if(!G(i)){let t={$:i,t:i.match(at).length};c.$[s]=t}}s.push(c)}}return s}class ht{constructor(t){if(this._keys={},this._keyNames=[],this._length=t.length,t.length&&B(t[0]))for(let e=0;e<this._length;e+=1){const n=t[e];this._keys[n]={weight:1},this._keyNames.push(n)}else{let e=0;for(let n=0;n<this._length;n+=1){const s=t[n];if(!Object.prototype.hasOwnProperty.call(s,"name"))throw new Error('Missing "name" property in key object');const i=s.name;if(this._keyNames.push(i),!Object.prototype.hasOwnProperty.call(s,"weight"))throw new Error('Missing "weight" property in key object');const o=s.weight;if(o<=0||o>=1)throw new Error('"weight" property in key must be in the range of (0, 1)');this._keys[i]={weight:o},e+=o}for(let t=0;t<this._length;t+=1){const n=this._keyNames[t],s=this._keys[n].weight;this._keys[n].weight=s/e}}}get(t,e){return this._keys[t]?this._keys[t][e]:-1}keys(){return this._keyNames}count(){return this._length}toJSON(){return JSON.stringify(this._keys)}}function ut(t,e){const n=t.matches;if(e.matches=[],J(n))for(let t=0,s=n.length;t<s;t+=1){let s=n[t];if(!J(s.indices)||0===s.indices.length)continue;let i={indices:s.indices,value:s.value};s.key&&(i.key=s.key),s.idx>-1&&(i.refIndex=s.idx),e.matches.push(i)}}function ft(t,e){e.score=t.score}const dt=[];class pt{constructor(t,e={},n=null){this.options={...V,...e},this._processKeys(this.options.keys),this.setCollection(t,n)}setCollection(t,e=null){this.list=t,this.listIsStringArray=B(t[0]),e?this.setIndex(e):this.setIndex(this._createIndex())}setIndex(t){this._indexedList=t}_processKeys(t){this._keyStore=new ht(t)}_createIndex(){return lt(this._keyStore.keys(),this.list,{getFn:this.options.getFn})}search(t,e={limit:!1}){if(!(t=t.trim()).length)return[];const{shouldSort:n}=this.options;let s=null;for(let e=0,n=dt.length;e<n;e+=1){let n=dt[e];if(n.condition(t,this.options)){s=new n(t,this.options);break}}s||(s=new Z(t,this.options));let i=this._searchUsing(s);return this._computeScore(i),n&&this._sort(i),e.limit&&H(e.limit)&&(i=i.slice(0,e.limit)),this._format(i)}_searchUsing(t){const e=this._indexedList,n=[],{includeMatches:s}=this.options;if(this.listIsStringArray)for(let i=0,o=e.length;i<o;i+=1){let o=e[i],{$:r,idx:c,t:a}=o;if(!J(r))continue;let l=t.searchIn(o);const{isMatch:h,score:u}=l;if(!h)continue;let f={score:u,value:r,t:a};s&&(f.indices=l.matchedIndices),n.push({item:r,idx:c,matches:[f]})}else{const i=this._keyStore.keys(),o=this._keyStore.count();for(let r=0,c=e.length;r<c;r+=1){let{$:c,idx:a}=e[r];if(!J(c))continue;let l=[];for(let e=0;e<o;e+=1){let n=i[e],o=c[n];if(J(o))if(z(o))for(let e=0,i=o.length;e<i;e+=1){let i=o[e];const{$:r,idx:c,t:a}=i;if(!J(r))continue;let h=t.searchIn(i);const{isMatch:u,score:f}=h;if(!u)continue;let d={score:f,key:n,value:r,idx:c,t:a};s&&(d.indices=h.matchedIndices),l.push(d)}else{const{$:e,t:i}=o;let r=t.searchIn(o);const{isMatch:c,score:a}=r;if(!c)continue;let h={score:a,key:n,value:e,t:i};s&&(h.indices=r.matchedIndices),l.push(h)}}l.length&&n.push({idx:a,item:c,matches:l})}}return n}_computeScore(t){const e=t.length;for(let n=0;n<e;n+=1){const e=t[n],s=e.matches,i=s.length;let o=1;for(let t=0;t<i;t+=1){const e=s[t],{key:n,t:i}=e,r=this._keyStore.get(n,"weight"),c=r>-1?r:1,a=0===e.score&&r>-1?Number.EPSILON:e.score,l=1/Math.sqrt(i);o*=Math.pow(a,c*l)}e.score=o}}_sort(t){t.sort(this.options.sortFn)}_format(t){const e=[],{includeMatches:n,includeScore:s}=this.options;let i=[];n&&i.push(ut),s&&i.push(ft);for(let n=0,s=t.length;n<s;n+=1){const s=t[n],{idx:o}=s,r={item:this.list[o],refIndex:o};if(i.length)for(let t=0,e=i.length;t<e;t+=1)i[t](s,r);e.push(r)}return e}}!function(...t){dt.push(...t)}(class{constructor(t,{isCaseSensitive:e=V.isCaseSensitive,includeMatches:n=V.includeMatches,minMatchCharLength:s=V.minMatchCharLength,findAllMatches:i=V.findAllMatches,location:o=V.location,threshold:r=V.threshold,distance:c=V.distance}={}){this.query=null,this.options={isCaseSensitive:e,includeMatches:n,minMatchCharLength:s,findAllMatches:i,location:o,threshold:r,distance:c},this.pattern=e?t:t.toLowerCase(),this.query=function(t,e={}){return t.split("|").map(t=>{let n=t.trim().split(rt).filter(t=>t&&!!t.trim()),s=[];for(let t=0,i=n.length;t<i;t+=1){const i=n[t];let o=!1,r=-1;for(;!o&&++r<ot;){const t=it[r];let n=t.isMultiMatch(i);n&&(s.push(new t(n,e)),o=!0)}if(!o)for(r=-1;++r<ot;){const t=it[r];let n=t.isSingleMatch(i);if(n){s.push(new t(n,e));break}}}return s})}(this.pattern,this.options)}static condition(t,e){return e.useExtendedSearch}searchIn(t){const e=this.query;if(!e)return{isMatch:!1,score:1};let n=t.$;const{includeMatches:s,isCaseSensitive:i}=this.options;n=i?n:n.toLowerCase();let o=0,r=[],c=0;for(let t=0,i=e.length;t<i;t+=1){const i=e[t];r.length=0,o=0;for(let t=0,e=i.length;t<e;t+=1){const e=i[t],{isMatch:a,matchedIndices:l,score:h}=e.search(n);if(!a){c=0,o=0,r.length=0;break}if(o+=1,c+=h,s){const t=e.constructor.type;ct.has(t)?r=[...r,...l]:r.push(l)}}if(o){let t={isMatch:!0,score:c/o};return s&&(t.matchedIndices=r),t}}return{isMatch:!1,score:1}}}),pt.version="5.2.3",pt.createIndex=lt,pt.config=V;const gt=t=>({}),mt=t=>({}),yt=t=>({}),xt=t=>({});function $t(t){let e,n,s,i,o,d,g;const y=t[2].search,x=r(y,t,t[1],xt),v=t[2].items,w=r(v,t,t[1],mt);return{c(){e=f("div"),n=f("div"),s=f("div"),i=f("div"),x&&x.c(),o=p(),d=f("div"),w&&w.c(),m(i,"class","search-box svelte-bvn01s"),m(s,"class","modal-container svelte-bvn01s"),m(n,"class","modal-wrapper svelte-bvn01s"),m(e,"class","modal-mask svelte-bvn01s"),$(e,"hidden",!t[0])},m(t,r){h(t,e,r),l(e,n),l(n,s),l(s,i),x&&x.m(i,null),l(s,o),l(s,d),w&&w.m(d,null),g=!0},p(t,[n]){x&&x.p&&2&n&&x.p(c(y,t,t[1],xt),a(y,t[1],n,yt)),w&&w.p&&2&n&&w.p(c(v,t,t[1],mt),a(v,t[1],n,gt)),1&n&&$(e,"hidden",!t[0])},i(t){g||(R(x,t),R(w,t),g=!0)},o(t){N(x,t),N(w,t),g=!1},d(t){t&&u(e),x&&x.d(t),w&&w.d(t)}}}function vt(t,e,n){let{show:s=!1}=e,{$$slots:i={},$$scope:o}=e;return t.$set=t=>{"show"in t&&n(0,s=t.show),"$$scope"in t&&n(1,o=t.$$scope)},[s,o,i]}class wt extends U{constructor(t){super(),q(this,t,vt,$t,o,{show:0})}}function kt(t,e,n){const s=t.slice();return s[9]=e[n],s[11]=n,s}function Mt(e){let n;return{c(){n=f("span")},m(t,e){h(t,n,e)},p:t,d(t){t&&u(n)}}}function bt(t){let e,n,s=t[9].shortcut+"";return{c(){e=f("kyb"),n=d(s),m(e,"class","svelte-1p0rgb9")},m(t,s){h(t,e,s),l(e,n)},p(t,e){1&e&&s!==(s=t[9].shortcut+"")&&y(n,s)},d(t){t&&u(e)}}}function Ct(t){let e,n,s,i,o,r,c=t[9].name+"";function a(t,e){return t[9].shortcut?bt:Mt}let x=a(t),v=x(t);function w(...e){return t[7](t[11],...e)}return{c(){e=f("p"),n=f("span"),s=d(c),i=p(),v.c(),o=p(),m(e,"class","item svelte-1p0rgb9"),$(e,"selected",t[11]==t[1])},m(t,c,a){h(t,e,c),l(e,n),l(n,s),l(e,i),v.m(e,null),l(e,o),a&&r(),r=g(e,"mousedown",w)},p(n,i){t=n,1&i&&c!==(c=t[9].name+"")&&y(s,c),x===(x=a(t))&&v?v.p(t,i):(v.d(1),v=x(t),v&&(v.c(),v.m(e,o))),2&i&&$(e,"selected",t[11]==t[1])},d(t){t&&u(e),v.d(),r()}}}function _t(e){let n,s=e[0],i=[];for(let t=0;t<s.length;t+=1)i[t]=Ct(kt(e,s,t));return{c(){n=f("div");for(let t=0;t<i.length;t+=1)i[t].c();m(n,"class","items-list svelte-1p0rgb9")},m(t,s){h(t,n,s);for(let t=0;t<i.length;t+=1)i[t].m(n,null);e[8](n)},p(t,[e]){if(11&e){let o;for(s=t[0],o=0;o<s.length;o+=1){const r=kt(t,s,o);i[o]?i[o].p(r,e):(i[o]=Ct(r),i[o].c(),i[o].m(n,null))}for(;o<i.length;o+=1)i[o].d(1);i.length=s.length}},i:t,o:t,d(t){t&&u(n),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(i,t),e[8](null)}}}function St(t,e,n){const s=M();let i,{items:o=[]}=e,{selectedIndex:r=0}=e,c=0;function a(t,e){1===t.which&&s("clickedIndex",e)}function l(){const t=i.querySelector(".items-list .selected"),e=0<r-c;n(4,c=r);const s=!e,o=i.scrollTop+36,a=i.scrollTop+i.clientHeight,l=t.offsetTop-8,h=l-i.clientHeight,u=l-36;l<=a&&l>=o||(e&&n(2,i.scrollTop=h,i),s&&n(2,i.scrollTop=u,i))}return t.$set=t=>{"items"in t&&n(0,o=t.items),"selectedIndex"in t&&n(1,r=t.selectedIndex)},t.$$.update=()=>{22&t.$$.dirty&&i&&c!=r&&setTimeout(()=>l())},[o,r,i,a,c,s,l,(t,e)=>a(e,t),function(t){C[t?"unshift":"push"](()=>{n(2,i=t)})}]}class It extends U{constructor(t){super(),q(this,t,St,_t,o,{items:0,selectedIndex:1})}}function Lt(e){let n,i;return{c(){n=f("input"),m(n,"class","search svelte-1ary9cc"),m(n,"name",e[2]),m(n,"autocomplete","no"),m(n,"type","text"),m(n,"placeholder","What are you looking for?")},m(t,o,r){h(t,n,o),e[9](n),x(n,e[0]),r&&s(i),i=[g(n,"input",e[10]),g(n,"blur",e[3]),g(n,"keydown",e[4]),g(n,"keyup",e[5])]},p(t,[e]){1&e&&n.value!==t[0]&&x(n,t[0])},i:t,o:t,d(t){t&&u(n),e[9](null),s(i)}}}function Ot(t,e,n){const s=M();let i,o,{show:r}=e;const c=()=>Math.random().toString(32).slice(2),a=c();function l(){s("closed"),n(0,i="")}return t.$set=t=>{"show"in t&&n(6,r=t.show)},t.$$.update=()=>{66&t.$$.dirty&&r&&o&&setTimeout(()=>{o.focus()})},[i,o,a,l,function(t){const e=t.code.toLowerCase();"enter"===e?s("enter",i):"arrowdown"===e?s("arrowdown"):"arrowup"===e?s("arrowup"):"escape"===e&&l()},function(t){const e=t.code.toLowerCase();(e.includes("space")||e.includes("backspace")||e.includes("delete")||e.startsWith("key")||e.startsWith("digit")||e.startsWith("numpad"))&&s("textChange",i)},r,s,c,function(t){C[t?"unshift":"push"](()=>{n(1,o=t)})},function(){i=this.value,n(0,i)}]}class At extends U{constructor(t){super(),q(this,t,Ot,Lt,o,{show:6})}}
/*!
     * hotkeys-js v3.7.6
     * A simple micro-library for defining and dispatching keyboard shortcuts. It has no dependencies.
     * 
     * Copyright (c) 2020 kenny wong <wowohoo@qq.com>
     * http://jaywcjlove.github.io/hotkeys
     * 
     * Licensed under the MIT license.
     */var Et="undefined"!=typeof navigator&&navigator.userAgent.toLowerCase().indexOf("firefox")>0;function Kt(t,e,n){t.addEventListener?t.addEventListener(e,n,!1):t.attachEvent&&t.attachEvent("on".concat(e),(function(){n(window.event)}))}function jt(t,e){for(var n=e.slice(0,e.length-1),s=0;s<n.length;s++)n[s]=t[n[s].toLowerCase()];return n}function Pt(t){"string"!=typeof t&&(t="");for(var e=(t=t.replace(/\s/g,"")).split(","),n=e.lastIndexOf("");n>=0;)e[n-1]+=",",e.splice(n,1),n=e.lastIndexOf("");return e}for(var Rt={backspace:8,tab:9,clear:12,enter:13,return:13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,del:46,delete:46,ins:45,insert:45,home:36,end:35,pageup:33,pagedown:34,capslock:20,"⇪":20,",":188,".":190,"/":191,"`":192,"-":Et?173:189,"=":Et?61:187,";":Et?59:186,"'":222,"[":219,"]":221,"\\":220},Nt={"⇧":16,shift:16,"⌥":18,alt:18,option:18,"⌃":17,ctrl:17,control:17,"⌘":91,cmd:91,command:91},Tt={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey",shiftKey:16,ctrlKey:17,altKey:18,metaKey:91},Dt={16:!1,18:!1,17:!1,91:!1},Ft={},Wt=1;Wt<20;Wt++)Rt["f".concat(Wt)]=111+Wt;var qt=[],Ut="all",zt=[],Bt=function(t){return Rt[t.toLowerCase()]||Nt[t.toLowerCase()]||t.toUpperCase().charCodeAt(0)};function Ht(t){Ut=t||"all"}function Jt(){return Ut||"all"}var Gt=function(t){var e=t.key,n=t.scope,s=t.method,i=t.splitKey,o=void 0===i?"+":i;Pt(e).forEach((function(t){var e=t.split(o),i=e.length,r=e[i-1],c="*"===r?"*":Bt(r);if(Ft[c]){n||(n=Jt());var a=i>1?jt(Nt,e):[];Ft[c]=Ft[c].map((function(t){return(!s||t.method===s)&&t.scope===n&&function(t,e){for(var n=t.length>=e.length?t:e,s=t.length>=e.length?e:t,i=!0,o=0;o<n.length;o++)-1===s.indexOf(n[o])&&(i=!1);return i}(t.mods,a)?{}:t}))}}))};function Vt(t,e,n){var s;if(e.scope===n||"all"===e.scope){for(var i in s=e.mods.length>0,Dt)Object.prototype.hasOwnProperty.call(Dt,i)&&(!Dt[i]&&e.mods.indexOf(+i)>-1||Dt[i]&&-1===e.mods.indexOf(+i))&&(s=!1);(0!==e.mods.length||Dt[16]||Dt[18]||Dt[17]||Dt[91])&&!s&&"*"!==e.shortcut||!1===e.method(t,e)&&(t.preventDefault?t.preventDefault():t.returnValue=!1,t.stopPropagation&&t.stopPropagation(),t.cancelBubble&&(t.cancelBubble=!0))}}function Xt(t){var e=Ft["*"],n=t.keyCode||t.which||t.charCode;if(Qt.filter.call(this,t)){if(93!==n&&224!==n||(n=91),-1===qt.indexOf(n)&&229!==n&&qt.push(n),["ctrlKey","altKey","shiftKey","metaKey"].forEach((function(e){var n=Tt[e];t[e]&&-1===qt.indexOf(n)?qt.push(n):!t[e]&&qt.indexOf(n)>-1&&qt.splice(qt.indexOf(n),1)})),n in Dt){for(var s in Dt[n]=!0,Nt)Nt[s]===n&&(Qt[s]=!0);if(!e)return}for(var i in Dt)Object.prototype.hasOwnProperty.call(Dt,i)&&(Dt[i]=t[Tt[i]]);t.getModifierState&&(!t.altKey||t.ctrlKey)&&t.getModifierState("AltGraph")&&(-1===qt.indexOf(17)&&qt.push(17),-1===qt.indexOf(18)&&qt.push(18),Dt[17]=!0,Dt[18]=!0);var o=Jt();if(e)for(var r=0;r<e.length;r++)e[r].scope===o&&("keydown"===t.type&&e[r].keydown||"keyup"===t.type&&e[r].keyup)&&Vt(t,e[r],o);if(n in Ft)for(var c=0;c<Ft[n].length;c++)if(("keydown"===t.type&&Ft[n][c].keydown||"keyup"===t.type&&Ft[n][c].keyup)&&Ft[n][c].key){for(var a=Ft[n][c],l=a.splitKey,h=a.key.split(l),u=[],f=0;f<h.length;f++)u.push(Bt(h[f]));u.sort().join("")===qt.sort().join("")&&Vt(t,a,o)}}}function Qt(t,e,n){qt=[];var s=Pt(t),i=[],o="all",r=document,c=0,a=!1,l=!0,h="+";for(void 0===n&&"function"==typeof e&&(n=e),"[object Object]"===Object.prototype.toString.call(e)&&(e.scope&&(o=e.scope),e.element&&(r=e.element),e.keyup&&(a=e.keyup),void 0!==e.keydown&&(l=e.keydown),"string"==typeof e.splitKey&&(h=e.splitKey)),"string"==typeof e&&(o=e);c<s.length;c++)i=[],(t=s[c].split(h)).length>1&&(i=jt(Nt,t)),(t="*"===(t=t[t.length-1])?"*":Bt(t))in Ft||(Ft[t]=[]),Ft[t].push({keyup:a,keydown:l,scope:o,mods:i,shortcut:s[c],method:n,key:s[c],splitKey:h});void 0!==r&&!function(t){return zt.indexOf(t)>-1}(r)&&window&&(zt.push(r),Kt(r,"keydown",(function(t){Xt(t)})),Kt(window,"focus",(function(){qt=[]})),Kt(r,"keyup",(function(t){Xt(t),function(t){var e=t.keyCode||t.which||t.charCode,n=qt.indexOf(e);if(n>=0&&qt.splice(n,1),t.key&&"meta"===t.key.toLowerCase()&&qt.splice(0,qt.length),93!==e&&224!==e||(e=91),e in Dt)for(var s in Dt[e]=!1,Nt)Nt[s]===e&&(Qt[s]=!1)}(t)})))}var Yt={setScope:Ht,getScope:Jt,deleteScope:function(t,e){var n,s;for(var i in t||(t=Jt()),Ft)if(Object.prototype.hasOwnProperty.call(Ft,i))for(n=Ft[i],s=0;s<n.length;)n[s].scope===t?n.splice(s,1):s++;Jt()===t&&Ht(e||"all")},getPressedKeyCodes:function(){return qt.slice(0)},isPressed:function(t){return"string"==typeof t&&(t=Bt(t)),-1!==qt.indexOf(t)},filter:function(t){var e=t.target||t.srcElement,n=e.tagName,s=!0;return!e.isContentEditable&&("INPUT"!==n&&"TEXTAREA"!==n||e.readOnly)||(s=!1),s},unbind:function(t){if(t){if(Array.isArray(t))t.forEach((function(t){t.key&&Gt(t)}));else if("object"==typeof t)t.key&&Gt(t);else if("string"==typeof t){for(var e=arguments.length,n=new Array(e>1?e-1:0),s=1;s<e;s++)n[s-1]=arguments[s];var i=n[0],o=n[1];"function"==typeof i&&(o=i,i=""),Gt({key:t,scope:i,method:o,splitKey:"+"})}}else Object.keys(Ft).forEach((function(t){return delete Ft[t]}))}};for(var Zt in Yt)Object.prototype.hasOwnProperty.call(Yt,Zt)&&(Qt[Zt]=Yt[Zt]);if("undefined"!=typeof window){var te=window.hotkeys;Qt.noConflict=function(t){return t&&window.hotkeys===Qt&&(window.hotkeys=te),Qt},window.hotkeys=Qt}const ee=t=>new Promise(e=>setTimeout(e,t));function ne(t){let e,n;const s=new At({props:{show:t[0]}});return s.$on("closed",t[8]),s.$on("enter",t[4]),s.$on("arrowup",t[5]),s.$on("arrowdown",t[6]),s.$on("textChange",t[7]),{c(){e=f("div"),T(s.$$.fragment),m(e,"slot","search")},m(t,i){h(t,e,i),D(s,e,null),n=!0},p(t,e){const n={};1&e&&(n.show=t[0]),s.$set(n)},i(t){n||(R(s.$$.fragment,t),n=!0)},o(t){N(s.$$.fragment,t),n=!1},d(t){t&&u(e),F(s)}}}function se(t){let e,n;const s=new It({props:{items:t[2],selectedIndex:t[1]}});return s.$on("clickedIndex",t[3]),{c(){e=f("div"),T(s.$$.fragment),m(e,"slot","items")},m(t,i){h(t,e,i),D(s,e,null),n=!0},p(t,e){const n={};4&e&&(n.items=t[2]),2&e&&(n.selectedIndex=t[1]),s.$set(n)},i(t){n||(R(s.$$.fragment,t),n=!0)},o(t){N(s.$$.fragment,t),n=!1},d(t){t&&u(e),F(s)}}}function ie(e){let n;return{c(){n=p()},m(t,e){h(t,n,e)},p:t,i:t,o:t,d(t){t&&u(n)}}}function oe(t){let e,n,s;function i(e){t[16].call(null,e)}let o={$$slots:{default:[ie],items:[se],search:[ne]},$$scope:{ctx:t}};void 0!==t[0]&&(o.show=t[0]);const r=new wt({props:o});return C.push(()=>function(t,e,n){const s=t.$$.props[e];void 0!==s&&(t.$$.bound[s]=n,n(t.$$.ctx[s]))}(r,"show",i)),{c(){e=f("div"),T(r.$$.fragment)},m(t,n){h(t,e,n),D(r,e,null),s=!0},p(t,[e]){const s={};var i;131079&e&&(s.$$scope={dirty:e,ctx:t}),!n&&1&e&&(n=!0,s.show=t[0],i=()=>n=!1,S.push(i)),r.$set(s)},i(t){s||(R(r.$$.fragment,t),s=!0)},o(t){N(r.$$.fragment,t),s=!1},d(t){t&&u(e),F(r)}}}function re(t,e,n){const s=M();let{hotkey:i}=e,{inputData:o=[]}=e;const r={isCaseSensitive:!1,shouldSort:!0,keys:["name","description"]};let c=!1,a="",l=o,h=o,u=new pt(l,r);var f;function d(t){t.children?(l=t.children,n(2,h=l),u=new pt(l,r)):(s("exec",t),n(0,c=!1)),n(1,a=0)}return f=()=>{var t,e;t=i,e=async()=>{n(0,c=!0),n(1,a=0),s("opened")},Qt.unbind(t),Qt(t,(function(t){t.preventDefault(),e()})),function(t,e){t.filter(t=>t.shortcut).map(t=>{Qt.unbind(t.shortcut),Qt(t.shortcut,(async function(n){n.preventDefault(),e(t)}))})}(o,async t=>{n(0,c=!0),s("opened"),await ee(200),n(1,a=o.findIndex(e=>e.name===t.name)),await ee(100),d(t)})},k().$$.on_mount.push(f),t.$set=t=>{"hotkey"in t&&n(9,i=t.hotkey),"inputData"in t&&n(10,o=t.inputData)},[c,a,h,function(t){n(1,a=t.detail),d(h[a])},function(t){d(h[a])},function(t){n(1,a--,a),a<0&&n(1,a=0)},function(t){n(1,a++,a);const e=h.length-1;a>e&&n(1,a=e)},function(t){const e=t.detail;if(s("textChanged",e),n(1,a=0),e){const t=u.search(e);n(2,h=t.map(t=>t.item))}else n(2,h=l)},function(t){s("closed"),l=o},i,o,l,u,s,r,d,function(t){c=t,n(0,c)}]}class ce extends U{constructor(t){super(),q(this,t,re,oe,o,{hotkey:9,inputData:10})}}var ae=function(){this.topics={}};ae.prototype.subscribe=function(t,e){this.topics.hasOwnProperty(t)||(this.topics[t]=[]),this.topics[t].push(e)},ae.prototype.unsubscribe=function(t){delete this.topics[t]},ae.prototype.publish=function(t,e){this.topics.hasOwnProperty(t)&&this.topics[t].forEach((function(t){t(null!=e?e:{})}))};var le=function(){return new ae};class he{constructor(t){console.log("CommandPal",{options:t}),this.options=t||{},this.ps=le()}start(){this.app=new ce({target:document.body,props:{hotkey:this.options.hotkey||"ctrl+space",inputData:this.options.commands||[]}});const t=this;function e(e){t.app.$on(e,n=>t.ps.publish(e,n.detail))}e("open"),e("closed"),e("textChanged"),e("exec"),this.ps.subscribe("exec",t=>{t.handler&&"function"==typeof t.handler&&t.handler()})}subscribe(t,e){this.ps.subscribe(t,t=>e(t))}}return window.CommandPal=he,he}();
//# sourceMappingURL=bundle.js.map