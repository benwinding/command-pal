var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function s(t){t.forEach(e)}function i(t){return"function"==typeof t}function o(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function r(t,e,n,s){if(t){const i=c(t,e,n,s);return t[0](i)}}function c(t,e,n,s){return t[1]&&s?function(t,e){for(const n in e)t[n]=e[n];return t}(n.ctx.slice(),t[1](s(e))):n.ctx}function l(t,e,n,s){if(t[2]&&s){const i=t[2](s(n));if(void 0===e.dirty)return i;if("object"==typeof i){const t=[],n=Math.max(e.dirty.length,i.length);for(let s=0;s<n;s+=1)t[s]=e.dirty[s]|i[s];return t}return e.dirty|i}return e.dirty}function a(t,e){t.appendChild(e)}function h(t,e,n){t.insertBefore(e,n||null)}function u(t){t.parentNode.removeChild(t)}function d(t){return document.createElement(t)}function f(t){return document.createTextNode(t)}function p(){return f(" ")}function g(t,e,n,s){return t.addEventListener(e,n,s),()=>t.removeEventListener(e,n,s)}function m(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function y(t,e){e=""+e,t.data!==e&&(t.data=e)}function x(t,e){(null!=e||t.value)&&(t.value=e)}function v(t,e,n){t.classList[n?"add":"remove"](e)}let w;function $(t){w=t}function k(){if(!w)throw new Error("Function called outside component initialization");return w}function b(){const t=k();return(e,n)=>{const s=t.$$.callbacks[e];if(s){const i=function(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}(e,n);s.slice().forEach(e=>{e.call(t,i)})}}}const M=[],C=[],_=[],I=[],S=Promise.resolve();let L=!1;function E(t){_.push(t)}function O(t){I.push(t)}let A=!1;const K=new Set;function j(){if(!A){A=!0;do{for(let t=0;t<M.length;t+=1){const e=M[t];$(e),P(e.$$)}for(M.length=0;C.length;)C.pop()();for(let t=0;t<_.length;t+=1){const e=_[t];K.has(e)||(K.add(e),e())}_.length=0}while(M.length);for(;I.length;)I.pop()();L=!1,A=!1,K.clear()}}function P(t){if(null!==t.fragment){t.update(),s(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(E)}}const R=new Set;function N(t,e){t&&t.i&&(R.delete(t),t.i(e))}function T(t,e,n,s){if(t&&t.o){if(R.has(t))return;R.add(t),(void 0).c.push(()=>{R.delete(t),s&&(n&&t.d(1),s())}),t.o(e)}}function z(t,e,n){const s=t.$$.props[e];void 0!==s&&(t.$$.bound[s]=n,n(t.$$.ctx[s]))}function D(t){t&&t.c()}function F(t,n,o){const{fragment:r,on_mount:c,on_destroy:l,after_update:a}=t.$$;r&&r.m(n,o),E(()=>{const n=c.map(e).filter(i);l?l.push(...n):s(n),t.$$.on_mount=[]}),a.forEach(E)}function B(t,e){const n=t.$$;null!==n.fragment&&(s(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function q(t,e){-1===t.$$.dirty[0]&&(M.push(t),L||(L=!0,S.then(j)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function W(e,i,o,r,c,l,a=[-1]){const h=w;$(e);const d=i.props||{},f=e.$$={fragment:null,ctx:null,props:l,update:t,not_equal:c,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(h?h.$$.context:[]),callbacks:n(),dirty:a};let p=!1;if(f.ctx=o?o(e,d,(t,n,...s)=>{const i=s.length?s[0]:n;return f.ctx&&c(f.ctx[t],f.ctx[t]=i)&&(f.bound[t]&&f.bound[t](i),p&&q(e,t)),n}):[],f.update(),p=!0,s(f.before_update),f.fragment=!!r&&r(f.ctx),i.target){if(i.hydrate){const t=function(t){return Array.from(t.childNodes)}(i.target);f.fragment&&f.fragment.l(t),t.forEach(u)}else f.fragment&&f.fragment.c();i.intro&&N(e.$$.fragment),F(e,i.target,i.anchor),j()}$(h)}class H{$destroy(){B(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}const U=t=>Array.isArray?Array.isArray(t):"[object Array]"===Object.prototype.toString.call(t),J=t=>"string"==typeof t,G=t=>"number"==typeof t,V=t=>null!=t,X=t=>!t.trim().length;var Y={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(t,e)=>t.score===e.score?t.idx<e.idx?-1:1:t.score<e.score?-1:1,includeMatches:!1,findAllMatches:!1,minMatchCharLength:1,location:0,threshold:.6,distance:100,...{useExtendedSearch:!1,getFn:function(t,e){let n=[],s=!1;const i=(t,e)=>{if(e){const o=e.indexOf(".");let r=e,c=null;-1!==o&&(r=e.slice(0,o),c=e.slice(o+1));const l=t[r];if(V(l))if(c||!J(l)&&!G(l))if(U(l)){s=!0;for(let t=0,e=l.length;t<e;t+=1)i(l[t],c)}else c&&i(l,c);else n.push((t=>null==t?"":(t=>{if("string"==typeof t)return t;let e=t+"";return"0"==e&&1/t==-1/0?"-0":e})(t))(l))}else n.push(t)};return i(t,e),s?n:n[0]}}};function Q(t,{errors:e=0,currentLocation:n=0,expectedLocation:s=0,distance:i=Y.distance}={}){const o=e/t.length,r=Math.abs(s-n);return i?o+r/i:r?1:o}function Z(t,e,n,{location:s=Y.location,distance:i=Y.distance,threshold:o=Y.threshold,findAllMatches:r=Y.findAllMatches,minMatchCharLength:c=Y.minMatchCharLength,includeMatches:l=Y.includeMatches}={}){if(e.length>32)throw new Error("Pattern length exceeds max of 32.");const a=e.length,h=t.length,u=Math.max(0,Math.min(s,h));let d=o,f=u;const p=[];if(l)for(let t=0;t<h;t+=1)p[t]=0;let g;for(;(g=t.indexOf(e,f))>-1;){let t=Q(e,{currentLocation:g,expectedLocation:u,distance:i});if(d=Math.min(t,d),f=g+a,l){let t=0;for(;t<a;)p[g+t]=1,t+=1}}f=-1;let m=[],y=1,x=a+h;const v=1<<(a<=31?a-1:30);for(let s=0;s<a;s+=1){let o=0,c=x;for(;o<c;){Q(e,{errors:s,currentLocation:u+c,expectedLocation:u,distance:i})<=d?o=c:x=c,c=Math.floor((x-o)/2+o)}x=c;let g=Math.max(1,u-c+1),w=r?h:Math.min(u+c,h)+a,$=Array(w+2);$[w+1]=(1<<s)-1;for(let o=w;o>=g;o-=1){let r=o-1,c=n[t.charAt(r)];if(c&&l&&(p[r]=1),$[o]=($[o+1]<<1|1)&c,0!==s&&($[o]|=(m[o+1]|m[o])<<1|1|m[o+1]),$[o]&v&&(y=Q(e,{errors:s,currentLocation:r,expectedLocation:u,distance:i}),y<=d)){if(d=y,f=r,f<=u)break;g=Math.max(1,2*u-f)}}if(Q(e,{errors:s+1,currentLocation:u,expectedLocation:u,distance:i})>d)break;m=$}let w={isMatch:f>=0,score:y||.001};return l&&(w.matchedIndices=function(t=[],e=Y.minMatchCharLength){let n=[],s=-1,i=-1,o=0;for(let r=t.length;o<r;o+=1){let r=t[o];r&&-1===s?s=o:r||-1===s||(i=o-1,i-s+1>=e&&n.push([s,i]),s=-1)}return t[o-1]&&o-s>=e&&n.push([s,o-1]),n}(p,c)),w}function tt(t){let e={},n=t.length;for(let s=0;s<n;s+=1)e[t.charAt(s)]=0;for(let s=0;s<n;s+=1)e[t.charAt(s)]|=1<<n-s-1;return e}class et{constructor(t,{location:e=Y.location,threshold:n=Y.threshold,distance:s=Y.distance,includeMatches:i=Y.includeMatches,findAllMatches:o=Y.findAllMatches,minMatchCharLength:r=Y.minMatchCharLength,isCaseSensitive:c=Y.isCaseSensitive}={}){this.options={location:e,threshold:n,distance:s,includeMatches:i,findAllMatches:o,minMatchCharLength:r,isCaseSensitive:c},this.pattern=c?t:t.toLowerCase(),this.chunks=[];let l=0;for(;l<this.pattern.length;){let t=this.pattern.substring(l,l+32);this.chunks.push({pattern:t,alphabet:tt(t)}),l+=32}}searchIn(t){let e=t.$;return this.searchInString(e)}searchInString(t){const{isCaseSensitive:e,includeMatches:n}=this.options;if(e||(t=t.toLowerCase()),this.pattern===t){let e={isMatch:!0,score:0};return n&&(e.matchedIndices=[[0,t.length-1]]),e}const{location:s,distance:i,threshold:o,findAllMatches:r,minMatchCharLength:c}=this.options;let l=[],a=0,h=!1;for(let e=0,u=this.chunks.length;e<u;e+=1){let{pattern:u,alphabet:d}=this.chunks[e],f=Z(t,u,d,{location:s+32*e,distance:i,threshold:o,findAllMatches:r,minMatchCharLength:c,includeMatches:n});const{isMatch:p,score:g,matchedIndices:m}=f;p&&(h=!0),a+=g,p&&m&&(l=[...l,...m])}let u={isMatch:h,score:h?a/this.chunks.length:1};return h&&n&&(u.matchedIndices=l),u}}class nt{constructor(t){this.pattern=t}static isMultiMatch(t){return st(t,this.multiRegex)}static isSingleMatch(t){return st(t,this.singleRegex)}search(){}}function st(t,e){const n=t.match(e);return n?n[1]:null}class it extends nt{constructor(t){super(t)}static get type(){return"exact"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(t){let e,n=0;const s=[],i=this.pattern.length;for(;(e=t.indexOf(this.pattern,n))>-1;)n=e+i,s.push([e,n-1]);const o=!!s.length;return{isMatch:o,score:o?1:0,matchedIndices:s}}}class ot extends nt{constructor(t,{location:e=Y.location,threshold:n=Y.threshold,distance:s=Y.distance,includeMatches:i=Y.includeMatches,findAllMatches:o=Y.findAllMatches,minMatchCharLength:r=Y.minMatchCharLength,isCaseSensitive:c=Y.isCaseSensitive}={}){super(t),this._bitapSearch=new et(t,{location:e,threshold:n,distance:s,includeMatches:i,findAllMatches:o,minMatchCharLength:r,isCaseSensitive:c})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(t){return this._bitapSearch.searchInString(t)}}const rt=[it,class extends nt{constructor(t){super(t)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(t){const e=t.startsWith(this.pattern);return{isMatch:e,score:e?0:1,matchedIndices:[0,this.pattern.length-1]}}},class extends nt{constructor(t){super(t)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(t){const e=!t.startsWith(this.pattern);return{isMatch:e,score:e?0:1,matchedIndices:[0,t.length-1]}}},class extends nt{constructor(t){super(t)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(t){const e=!t.endsWith(this.pattern);return{isMatch:e,score:e?0:1,matchedIndices:[0,t.length-1]}}},class extends nt{constructor(t){super(t)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(t){const e=t.endsWith(this.pattern);return{isMatch:e,score:e?0:1,matchedIndices:[t.length-this.pattern.length,t.length-1]}}},class extends nt{constructor(t){super(t)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(t){const e=-1===t.indexOf(this.pattern);return{isMatch:e,score:e?0:1,matchedIndices:[0,t.length-1]}}},ot],ct=rt.length,lt=/ +(?=([^\"]*\"[^\"]*\")*[^\"]*$)/;const at=new Set([ot.type,it.type]);const ht=/[^ ]+/g;function ut(t,e,{getFn:n=Y.getFn}={}){let s=[];if(J(e[0]))for(let t=0,n=e.length;t<n;t+=1){const n=e[t];if(V(n)&&!X(n)){let e={$:n,idx:t,t:n.match(ht).length};s.push(e)}}else{const i=t.length;for(let o=0,r=e.length;o<r;o+=1){let r=e[o],c={idx:o,$:{}};for(let e=0;e<i;e+=1){let s=t[e],i=n(r,s);if(V(i))if(U(i)){let t=[];const e=[{arrayIndex:-1,value:i}];for(;e.length;){const{arrayIndex:n,value:s}=e.pop();if(V(s))if(J(s)&&!X(s)){let e={$:s,idx:n,t:s.match(ht).length};t.push(e)}else if(U(s))for(let t=0,n=s.length;t<n;t+=1)e.push({arrayIndex:t,value:s[t]})}c.$[s]=t}else if(!X(i)){let t={$:i,t:i.match(ht).length};c.$[s]=t}}s.push(c)}}return s}class dt{constructor(t){if(this._keys={},this._keyNames=[],this._length=t.length,t.length&&J(t[0]))for(let e=0;e<this._length;e+=1){const n=t[e];this._keys[n]={weight:1},this._keyNames.push(n)}else{let e=0;for(let n=0;n<this._length;n+=1){const s=t[n];if(!Object.prototype.hasOwnProperty.call(s,"name"))throw new Error('Missing "name" property in key object');const i=s.name;if(this._keyNames.push(i),!Object.prototype.hasOwnProperty.call(s,"weight"))throw new Error('Missing "weight" property in key object');const o=s.weight;if(o<=0||o>=1)throw new Error('"weight" property in key must be in the range of (0, 1)');this._keys[i]={weight:o},e+=o}for(let t=0;t<this._length;t+=1){const n=this._keyNames[t],s=this._keys[n].weight;this._keys[n].weight=s/e}}}get(t,e){return this._keys[t]?this._keys[t][e]:-1}keys(){return this._keyNames}count(){return this._length}toJSON(){return JSON.stringify(this._keys)}}function ft(t,e){const n=t.matches;if(e.matches=[],V(n))for(let t=0,s=n.length;t<s;t+=1){let s=n[t];if(!V(s.indices)||0===s.indices.length)continue;let i={indices:s.indices,value:s.value};s.key&&(i.key=s.key),s.idx>-1&&(i.refIndex=s.idx),e.matches.push(i)}}function pt(t,e){e.score=t.score}const gt=[];class mt{constructor(t,e={},n=null){this.options={...Y,...e},this._processKeys(this.options.keys),this.setCollection(t,n)}setCollection(t,e=null){this.list=t,this.listIsStringArray=J(t[0]),e?this.setIndex(e):this.setIndex(this._createIndex())}setIndex(t){this._indexedList=t}_processKeys(t){this._keyStore=new dt(t)}_createIndex(){return ut(this._keyStore.keys(),this.list,{getFn:this.options.getFn})}search(t,e={limit:!1}){if(!(t=t.trim()).length)return[];const{shouldSort:n}=this.options;let s=null;for(let e=0,n=gt.length;e<n;e+=1){let n=gt[e];if(n.condition(t,this.options)){s=new n(t,this.options);break}}s||(s=new et(t,this.options));let i=this._searchUsing(s);return this._computeScore(i),n&&this._sort(i),e.limit&&G(e.limit)&&(i=i.slice(0,e.limit)),this._format(i)}_searchUsing(t){const e=this._indexedList,n=[],{includeMatches:s}=this.options;if(this.listIsStringArray)for(let i=0,o=e.length;i<o;i+=1){let o=e[i],{$:r,idx:c,t:l}=o;if(!V(r))continue;let a=t.searchIn(o);const{isMatch:h,score:u}=a;if(!h)continue;let d={score:u,value:r,t:l};s&&(d.indices=a.matchedIndices),n.push({item:r,idx:c,matches:[d]})}else{const i=this._keyStore.keys(),o=this._keyStore.count();for(let r=0,c=e.length;r<c;r+=1){let{$:c,idx:l}=e[r];if(!V(c))continue;let a=[];for(let e=0;e<o;e+=1){let n=i[e],o=c[n];if(V(o))if(U(o))for(let e=0,i=o.length;e<i;e+=1){let i=o[e];const{$:r,idx:c,t:l}=i;if(!V(r))continue;let h=t.searchIn(i);const{isMatch:u,score:d}=h;if(!u)continue;let f={score:d,key:n,value:r,idx:c,t:l};s&&(f.indices=h.matchedIndices),a.push(f)}else{const{$:e,t:i}=o;let r=t.searchIn(o);const{isMatch:c,score:l}=r;if(!c)continue;let h={score:l,key:n,value:e,t:i};s&&(h.indices=r.matchedIndices),a.push(h)}}a.length&&n.push({idx:l,item:c,matches:a})}}return n}_computeScore(t){const e=t.length;for(let n=0;n<e;n+=1){const e=t[n],s=e.matches,i=s.length;let o=1;for(let t=0;t<i;t+=1){const e=s[t],{key:n,t:i}=e,r=this._keyStore.get(n,"weight"),c=r>-1?r:1,l=0===e.score&&r>-1?Number.EPSILON:e.score,a=1/Math.sqrt(i);o*=Math.pow(l,c*a)}e.score=o}}_sort(t){t.sort(this.options.sortFn)}_format(t){const e=[],{includeMatches:n,includeScore:s}=this.options;let i=[];n&&i.push(ft),s&&i.push(pt);for(let n=0,s=t.length;n<s;n+=1){const s=t[n],{idx:o}=s,r={item:this.list[o],refIndex:o};if(i.length)for(let t=0,e=i.length;t<e;t+=1)i[t](s,r);e.push(r)}return e}}!function(...t){gt.push(...t)}(class{constructor(t,{isCaseSensitive:e=Y.isCaseSensitive,includeMatches:n=Y.includeMatches,minMatchCharLength:s=Y.minMatchCharLength,findAllMatches:i=Y.findAllMatches,location:o=Y.location,threshold:r=Y.threshold,distance:c=Y.distance}={}){this.query=null,this.options={isCaseSensitive:e,includeMatches:n,minMatchCharLength:s,findAllMatches:i,location:o,threshold:r,distance:c},this.pattern=e?t:t.toLowerCase(),this.query=function(t,e={}){return t.split("|").map(t=>{let n=t.trim().split(lt).filter(t=>t&&!!t.trim()),s=[];for(let t=0,i=n.length;t<i;t+=1){const i=n[t];let o=!1,r=-1;for(;!o&&++r<ct;){const t=rt[r];let n=t.isMultiMatch(i);n&&(s.push(new t(n,e)),o=!0)}if(!o)for(r=-1;++r<ct;){const t=rt[r];let n=t.isSingleMatch(i);if(n){s.push(new t(n,e));break}}}return s})}(this.pattern,this.options)}static condition(t,e){return e.useExtendedSearch}searchIn(t){const e=this.query;if(!e)return{isMatch:!1,score:1};let n=t.$;const{includeMatches:s,isCaseSensitive:i}=this.options;n=i?n:n.toLowerCase();let o=0,r=[],c=0;for(let t=0,i=e.length;t<i;t+=1){const i=e[t];r.length=0,o=0;for(let t=0,e=i.length;t<e;t+=1){const e=i[t],{isMatch:l,matchedIndices:a,score:h}=e.search(n);if(!l){c=0,o=0,r.length=0;break}if(o+=1,c+=h,s){const t=e.constructor.type;at.has(t)?r=[...r,...a]:r.push(a)}}if(o){let t={isMatch:!0,score:c/o};return s&&(t.matchedIndices=r),t}}return{isMatch:!1,score:1}}}),mt.version="5.2.3",mt.createIndex=ut,mt.config=Y;const yt=t=>({}),xt=t=>({}),vt=t=>({}),wt=t=>({});function $t(t){let e,n,s,i,o,f,g;const y=t[2].search,x=r(y,t,t[1],wt),w=t[2].items,$=r(w,t,t[1],xt);return{c(){e=d("div"),n=d("div"),s=d("div"),i=d("div"),x&&x.c(),o=p(),f=d("div"),$&&$.c(),m(i,"class","search-box svelte-1x199rl"),m(s,"class","modal-container svelte-1x199rl"),m(n,"class","modal-wrapper svelte-1x199rl"),m(e,"class","modal-mask svelte-1x199rl"),v(e,"hidden",!t[0])},m(t,r){h(t,e,r),a(e,n),a(n,s),a(s,i),x&&x.m(i,null),a(s,o),a(s,f),$&&$.m(f,null),g=!0},p(t,[n]){x&&x.p&&2&n&&x.p(c(y,t,t[1],wt),l(y,t[1],n,vt)),$&&$.p&&2&n&&$.p(c(w,t,t[1],xt),l(w,t[1],n,yt)),1&n&&v(e,"hidden",!t[0])},i(t){g||(N(x,t),N($,t),g=!0)},o(t){T(x,t),T($,t),g=!1},d(t){t&&u(e),x&&x.d(t),$&&$.d(t)}}}function kt(t,e,n){let{show:s=!1}=e,{$$slots:i={},$$scope:o}=e;return t.$set=t=>{"show"in t&&n(0,s=t.show),"$$scope"in t&&n(1,o=t.$$scope)},[s,o,i]}class bt extends H{constructor(t){var e;super(),document.getElementById("svelte-1x199rl-style")||((e=d("style")).id="svelte-1x199rl-style",e.textContent=".modal-container.svelte-1x199rl{max-width:400px;margin-top:0px;margin-left:auto;margin-right:auto;padding:0px;transition:all 0.3s ease;font-family:Helvetica, Arial, sans-serif}@media(max-width: 400px){.modal-container.svelte-1x199rl{max-width:100%}}.modal-mask.svelte-1x199rl{position:fixed;z-index:9998;top:0;left:0;width:100%;height:100%;background-color:rgba(0, 0, 0, 0.5);display:table;transition:opacity 0.3s ease}.modal-wrapper.svelte-1x199rl{display:table-cell;width:100%}.hidden.svelte-1x199rl{display:none}.search-box.svelte-1x199rl{padding:7px}",a(document.head,e)),W(this,t,kt,$t,o,{show:0})}}function Mt(t,e,n){const s=t.slice();return s[9]=e[n],s[11]=n,s}function Ct(t){let e;return{c(){e=d("p"),e.textContent="No matching commands...",m(e,"class","no-matches svelte-tippst")},m(t,n){h(t,e,n)},d(t){t&&u(e)}}}function _t(e){let n;return{c(){n=d("span")},m(t,e){h(t,n,e)},p:t,d(t){t&&u(n)}}}function It(t){let e,n,s=t[9].shortcut+"";return{c(){e=d("kyb"),n=f(s),m(e,"class","svelte-tippst")},m(t,s){h(t,e,s),a(e,n)},p(t,e){1&e&&s!==(s=t[9].shortcut+"")&&y(n,s)},d(t){t&&u(e)}}}function St(t){let e,n,s,i,o,r,c=t[9].name+"";function l(t,e){return t[9].shortcut?It:_t}let x=l(t),w=x(t);function $(...e){return t[7](t[11],...e)}return{c(){e=d("p"),n=d("span"),s=f(c),i=p(),w.c(),o=p(),m(e,"class","item svelte-tippst"),v(e,"selected",t[11]==t[1])},m(t,c,l){h(t,e,c),a(e,n),a(n,s),a(e,i),w.m(e,null),a(e,o),l&&r(),r=g(e,"mousedown",$)},p(n,i){t=n,1&i&&c!==(c=t[9].name+"")&&y(s,c),x===(x=l(t))&&w?w.p(t,i):(w.d(1),w=x(t),w&&(w.c(),w.m(e,o))),2&i&&v(e,"selected",t[11]==t[1])},d(t){t&&u(e),w.d(),r()}}}function Lt(e){let n,s,i=!e[0].length&&Ct(),o=e[0],r=[];for(let t=0;t<o.length;t+=1)r[t]=St(Mt(e,o,t));return{c(){n=d("div"),i&&i.c(),s=p();for(let t=0;t<r.length;t+=1)r[t].c();m(n,"class","items-list svelte-tippst")},m(t,o){h(t,n,o),i&&i.m(n,null),a(n,s);for(let t=0;t<r.length;t+=1)r[t].m(n,null);e[8](n)},p(t,[e]){if(t[0].length?i&&(i.d(1),i=null):i||(i=Ct(),i.c(),i.m(n,s)),11&e){let s;for(o=t[0],s=0;s<o.length;s+=1){const i=Mt(t,o,s);r[s]?r[s].p(i,e):(r[s]=St(i),r[s].c(),r[s].m(n,null))}for(;s<r.length;s+=1)r[s].d(1);r.length=o.length}},i:t,o:t,d(t){t&&u(n),i&&i.d(),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(r,t),e[8](null)}}}function Et(t,e,n){const s=b();let i,{items:o=[]}=e,{selectedIndex:r=0}=e,c=0;function l(t,e){1===t.which&&s("clickedIndex",e)}function a(){if(!i)return;const t=i.querySelector(".items-list .selected");if(!t)return;const e=0<r-c;n(4,c=r);const s=!e,o=i.scrollTop+36,l=i.scrollTop+i.clientHeight,a=t.offsetTop-8,h=a-i.clientHeight,u=a-36;a<=l&&a>=o||(e&&n(2,i.scrollTop=h,i),s&&n(2,i.scrollTop=u,i))}return t.$set=t=>{"items"in t&&n(0,o=t.items),"selectedIndex"in t&&n(1,r=t.selectedIndex)},t.$$.update=()=>{18&t.$$.dirty&&c!=r&&setTimeout(()=>a())},[o,r,i,l,c,s,a,(t,e)=>l(e,t),function(t){C[t?"unshift":"push"](()=>{n(2,i=t)})}]}class Ot extends H{constructor(t){var e;super(),document.getElementById("svelte-tippst-style")||((e=d("style")).id="svelte-tippst-style",e.textContent=".item.svelte-tippst{display:flex;align-items:center;justify-content:space-between;margin:0px;padding:0px 7px;height:36px}.item.svelte-tippst:hover{cursor:pointer}kyb.svelte-tippst{padding:1px 4px;border-radius:6px;font-family:monospace}.items-list.svelte-tippst{overflow-y:auto;max-height:360px}.no-matches.svelte-tippst{margin:5px 0px;padding:0px 7px}",a(document.head,e)),W(this,t,Et,Lt,o,{items:0,selectedIndex:1})}}
/*!
     * hotkeys-js v3.7.6
     * A simple micro-library for defining and dispatching keyboard shortcuts. It has no dependencies.
     * 
     * Copyright (c) 2020 kenny wong <wowohoo@qq.com>
     * http://jaywcjlove.github.io/hotkeys
     * 
     * Licensed under the MIT license.
     */var At="undefined"!=typeof navigator&&navigator.userAgent.toLowerCase().indexOf("firefox")>0;function Kt(t,e,n){t.addEventListener?t.addEventListener(e,n,!1):t.attachEvent&&t.attachEvent("on".concat(e),(function(){n(window.event)}))}function jt(t,e){for(var n=e.slice(0,e.length-1),s=0;s<n.length;s++)n[s]=t[n[s].toLowerCase()];return n}function Pt(t){"string"!=typeof t&&(t="");for(var e=(t=t.replace(/\s/g,"")).split(","),n=e.lastIndexOf("");n>=0;)e[n-1]+=",",e.splice(n,1),n=e.lastIndexOf("");return e}for(var Rt={backspace:8,tab:9,clear:12,enter:13,return:13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,del:46,delete:46,ins:45,insert:45,home:36,end:35,pageup:33,pagedown:34,capslock:20,"⇪":20,",":188,".":190,"/":191,"`":192,"-":At?173:189,"=":At?61:187,";":At?59:186,"'":222,"[":219,"]":221,"\\":220},Nt={"⇧":16,shift:16,"⌥":18,alt:18,option:18,"⌃":17,ctrl:17,control:17,"⌘":91,cmd:91,command:91},Tt={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey",shiftKey:16,ctrlKey:17,altKey:18,metaKey:91},zt={16:!1,18:!1,17:!1,91:!1},Dt={},Ft=1;Ft<20;Ft++)Rt["f".concat(Ft)]=111+Ft;var Bt=[],qt="all",Wt=[],Ht=function(t){return Rt[t.toLowerCase()]||Nt[t.toLowerCase()]||t.toUpperCase().charCodeAt(0)};function Ut(t){qt=t||"all"}function Jt(){return qt||"all"}var Gt=function(t){var e=t.key,n=t.scope,s=t.method,i=t.splitKey,o=void 0===i?"+":i;Pt(e).forEach((function(t){var e=t.split(o),i=e.length,r=e[i-1],c="*"===r?"*":Ht(r);if(Dt[c]){n||(n=Jt());var l=i>1?jt(Nt,e):[];Dt[c]=Dt[c].map((function(t){return(!s||t.method===s)&&t.scope===n&&function(t,e){for(var n=t.length>=e.length?t:e,s=t.length>=e.length?e:t,i=!0,o=0;o<n.length;o++)-1===s.indexOf(n[o])&&(i=!1);return i}(t.mods,l)?{}:t}))}}))};function Vt(t,e,n){var s;if(e.scope===n||"all"===e.scope){for(var i in s=e.mods.length>0,zt)Object.prototype.hasOwnProperty.call(zt,i)&&(!zt[i]&&e.mods.indexOf(+i)>-1||zt[i]&&-1===e.mods.indexOf(+i))&&(s=!1);(0!==e.mods.length||zt[16]||zt[18]||zt[17]||zt[91])&&!s&&"*"!==e.shortcut||!1===e.method(t,e)&&(t.preventDefault?t.preventDefault():t.returnValue=!1,t.stopPropagation&&t.stopPropagation(),t.cancelBubble&&(t.cancelBubble=!0))}}function Xt(t){var e=Dt["*"],n=t.keyCode||t.which||t.charCode;if(Yt.filter.call(this,t)){if(93!==n&&224!==n||(n=91),-1===Bt.indexOf(n)&&229!==n&&Bt.push(n),["ctrlKey","altKey","shiftKey","metaKey"].forEach((function(e){var n=Tt[e];t[e]&&-1===Bt.indexOf(n)?Bt.push(n):!t[e]&&Bt.indexOf(n)>-1&&Bt.splice(Bt.indexOf(n),1)})),n in zt){for(var s in zt[n]=!0,Nt)Nt[s]===n&&(Yt[s]=!0);if(!e)return}for(var i in zt)Object.prototype.hasOwnProperty.call(zt,i)&&(zt[i]=t[Tt[i]]);t.getModifierState&&(!t.altKey||t.ctrlKey)&&t.getModifierState("AltGraph")&&(-1===Bt.indexOf(17)&&Bt.push(17),-1===Bt.indexOf(18)&&Bt.push(18),zt[17]=!0,zt[18]=!0);var o=Jt();if(e)for(var r=0;r<e.length;r++)e[r].scope===o&&("keydown"===t.type&&e[r].keydown||"keyup"===t.type&&e[r].keyup)&&Vt(t,e[r],o);if(n in Dt)for(var c=0;c<Dt[n].length;c++)if(("keydown"===t.type&&Dt[n][c].keydown||"keyup"===t.type&&Dt[n][c].keyup)&&Dt[n][c].key){for(var l=Dt[n][c],a=l.splitKey,h=l.key.split(a),u=[],d=0;d<h.length;d++)u.push(Ht(h[d]));u.sort().join("")===Bt.sort().join("")&&Vt(t,l,o)}}}function Yt(t,e,n){Bt=[];var s=Pt(t),i=[],o="all",r=document,c=0,l=!1,a=!0,h="+";for(void 0===n&&"function"==typeof e&&(n=e),"[object Object]"===Object.prototype.toString.call(e)&&(e.scope&&(o=e.scope),e.element&&(r=e.element),e.keyup&&(l=e.keyup),void 0!==e.keydown&&(a=e.keydown),"string"==typeof e.splitKey&&(h=e.splitKey)),"string"==typeof e&&(o=e);c<s.length;c++)i=[],(t=s[c].split(h)).length>1&&(i=jt(Nt,t)),(t="*"===(t=t[t.length-1])?"*":Ht(t))in Dt||(Dt[t]=[]),Dt[t].push({keyup:l,keydown:a,scope:o,mods:i,shortcut:s[c],method:n,key:s[c],splitKey:h});void 0!==r&&!function(t){return Wt.indexOf(t)>-1}(r)&&window&&(Wt.push(r),Kt(r,"keydown",(function(t){Xt(t)})),Kt(window,"focus",(function(){Bt=[]})),Kt(r,"keyup",(function(t){Xt(t),function(t){var e=t.keyCode||t.which||t.charCode,n=Bt.indexOf(e);if(n>=0&&Bt.splice(n,1),t.key&&"meta"===t.key.toLowerCase()&&Bt.splice(0,Bt.length),93!==e&&224!==e||(e=91),e in zt)for(var s in zt[e]=!1,Nt)Nt[s]===e&&(Yt[s]=!1)}(t)})))}var Qt={setScope:Ut,getScope:Jt,deleteScope:function(t,e){var n,s;for(var i in t||(t=Jt()),Dt)if(Object.prototype.hasOwnProperty.call(Dt,i))for(n=Dt[i],s=0;s<n.length;)n[s].scope===t?n.splice(s,1):s++;Jt()===t&&Ut(e||"all")},getPressedKeyCodes:function(){return Bt.slice(0)},isPressed:function(t){return"string"==typeof t&&(t=Ht(t)),-1!==Bt.indexOf(t)},filter:function(t){var e=t.target||t.srcElement,n=e.tagName,s=!0;return!e.isContentEditable&&("INPUT"!==n&&"TEXTAREA"!==n||e.readOnly)||(s=!1),s},unbind:function(t){if(t){if(Array.isArray(t))t.forEach((function(t){t.key&&Gt(t)}));else if("object"==typeof t)t.key&&Gt(t);else if("string"==typeof t){for(var e=arguments.length,n=new Array(e>1?e-1:0),s=1;s<e;s++)n[s-1]=arguments[s];var i=n[0],o=n[1];"function"==typeof i&&(o=i,i=""),Gt({key:t,scope:i,method:o,splitKey:"+"})}}else Object.keys(Dt).forEach((function(t){return delete Dt[t]}))}};for(var Zt in Qt)Object.prototype.hasOwnProperty.call(Qt,Zt)&&(Yt[Zt]=Qt[Zt]);if("undefined"!=typeof window){var te=window.hotkeys;Yt.noConflict=function(t){return t&&window.hotkeys===Yt&&(window.hotkeys=te),Yt},window.hotkeys=Yt}const ee=t=>new Promise(e=>setTimeout(e,t));function ne(e){let n,i;return{c(){n=d("input"),m(n,"class","search svelte-1dpfclk"),m(n,"name",e[2]),m(n,"autocomplete","no"),m(n,"type","text"),m(n,"placeholder","What are you looking for?")},m(t,o,r){h(t,n,o),e[9](n),x(n,e[1]),r&&s(i),i=[g(n,"input",e[10]),g(n,"blur",e[3]),g(n,"keydown",e[4]),g(n,"input",e[5])]},p(t,[e]){2&e&&n.value!==t[1]&&x(n,t[1])},i:t,o:t,d(t){t&&u(n),e[9](null),s(i)}}}function se(t,e,n){const s=b();let i,{show:o}=e,{inputEl:r}=e;const c=()=>Math.random().toString(32).slice(2),l=c();function a(){s("closed"),n(1,i="")}return t.$set=t=>{"show"in t&&n(6,o=t.show),"inputEl"in t&&n(0,r=t.inputEl)},t.$$.update=()=>{65&t.$$.dirty&&o&&r&&setTimeout(()=>{r.focus()})},[r,i,l,a,function(t){const e=t.code.toLowerCase();"enter"===e?s("enter",i):"arrowdown"===e?s("arrowdown"):"arrowup"===e?s("arrowup"):"escape"===e&&a()},async function(t){await ee(10),s("textChange",i)},o,s,c,function(t){C[t?"unshift":"push"](()=>{n(0,r=t)})},function(){i=this.value,n(1,i)}]}class ie extends H{constructor(t){var e;super(),document.getElementById("svelte-1dpfclk-style")||((e=d("style")).id="svelte-1dpfclk-style",e.textContent=".search.svelte-1dpfclk{width:100%;height:20px;outline:none;font-size:1.1em;margin:0;padding:14px;padding-left:6px;box-sizing:border-box;box-shadow:none;border-radius:0px}.search.svelte-1dpfclk::placeholder{opacity:1}",a(document.head,e)),W(this,t,se,ne,o,{show:6,inputEl:0})}}function oe(e){let n,s;return{c(){n=d("button"),n.innerHTML='<svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" height="24" width="24" version="1.1"><g transform="translate(0 -1028.4)"><path d="m3 1030.4c-1.1046 0-2 0.9-2 2v7 2 7c0 1.1 0.8954 2 2 2h9 9c1.105 0\n        2-0.9 2-2v-7-2-7c0-1.1-0.895-2-2-2h-9-9z" fill="#2c3e50"></path><path d="m3 2c-1.1046 0-2 0.8954-2 2v3 3 1 1 1 3 3c0 1.105 0.8954 2 2 2h9\n        9c1.105 0 2-0.895 2-2v-3-4-2-3-3c0-1.1046-0.895-2-2-2h-9-9z" transform="translate(0 1028.4)" fill="#34495e"></path><path d="m4 5.125v1.125l3 1.75-3 1.75v1.125l5-2.875-5-2.875zm5\n        4.875v1h5v-1h-5z" transform="translate(0 1028.4)" fill="#ecf0f1"></path></g></svg>',m(n,"class","mobile-button svelte-fohp3e")},m(t,i,o){h(t,n,i),o&&s(),s=g(n,"click",e[1])},p:t,i:t,o:t,d(t){t&&u(n),s()}}}function re(t){const e=b();return[e,t=>e("click")]}class ce extends H{constructor(t){var e;super(),document.getElementById("svelte-fohp3e-style")||((e=d("style")).id="svelte-fohp3e-style",e.textContent=".mobile-button.svelte-fohp3e{position:absolute;left:5px;bottom:5px;margin:0px;padding:0px;background:none;border-radius:2px}.mobile-button.svelte-fohp3e:focus{box-shadow:none;background:none}.mobile-button.svelte-fohp3e:hover{box-shadow:none;background:none}.mobile-button.svelte-fohp3e:active{box-shadow:none;background:none;transform:translateY(2px)}",a(document.head,e)),W(this,t,re,oe,o,{})}}function le(t){let e,n,s;function i(e){t[20].call(null,e)}let o={show:t[0]};void 0!==t[1]&&(o.inputEl=t[1]);const r=new ie({props:o});return C.push(()=>z(r,"inputEl",i)),r.$on("closed",t[10]),r.$on("enter",t[6]),r.$on("arrowup",t[7]),r.$on("arrowdown",t[8]),r.$on("textChange",t[9]),{c(){e=d("div"),D(r.$$.fragment),m(e,"slot","search")},m(t,n){h(t,e,n),F(r,e,null),s=!0},p(t,e){const s={};1&e&&(s.show=t[0]),!n&&2&e&&(n=!0,s.inputEl=t[1],O(()=>n=!1)),r.$set(s)},i(t){s||(N(r.$$.fragment,t),s=!0)},o(t){T(r.$$.fragment,t),s=!1},d(t){t&&u(e),B(r)}}}function ae(t){let e,n;const s=new Ot({props:{items:t[4],selectedIndex:t[3]}});return s.$on("clickedIndex",t[5]),{c(){e=d("div"),D(s.$$.fragment),m(e,"slot","items")},m(t,i){h(t,e,i),F(s,e,null),n=!0},p(t,e){const n={};16&e&&(n.items=t[4]),8&e&&(n.selectedIndex=t[3]),s.$set(n)},i(t){n||(N(s.$$.fragment,t),n=!0)},o(t){T(s.$$.fragment,t),n=!1},d(t){t&&u(e),B(s)}}}function he(e){let n;return{c(){n=p()},m(t,e){h(t,n,e)},p:t,i:t,o:t,d(t){t&&u(n)}}}function ue(t){let e,n,s,i,o,r,c,l;const g=new ce({});function m(e){t[21].call(null,e)}g.$on("click",t[11]);let x={$$slots:{default:[he],items:[ae],search:[le]},$$scope:{ctx:t}};void 0!==t[0]&&(x.show=t[0]);const v=new bt({props:x});return C.push(()=>z(v,"show",m)),{c(){e=d("div"),n=d("span"),s=f("loadingChildren="),i=f(t[2]),o=p(),D(g.$$.fragment),r=p(),D(v.$$.fragment)},m(t,c){h(t,e,c),a(e,n),a(n,s),a(n,i),a(e,o),F(g,e,null),a(e,r),F(v,e,null),l=!0},p(t,[e]){(!l||4&e)&&y(i,t[2]);const n={};4194331&e&&(n.$$scope={dirty:e,ctx:t}),!c&&1&e&&(c=!0,n.show=t[0],O(()=>c=!1)),v.$set(n)},i(t){l||(N(g.$$.fragment,t),N(v.$$.fragment,t),l=!0)},o(t){T(g.$$.fragment,t),T(v.$$.fragment,t),l=!1},d(t){t&&u(e),B(g),B(v)}}}function de(t,e,n){const s=b();let{hotkey:i}=e,{inputData:o=[]}=e;const r={isCaseSensitive:!1,shouldSort:!0,keys:["name","description"]};let c,l=!1,a=!1,h="",u=o,d=o,f=new mt(u,r);var p;function g(t){u=t,n(4,d=u),f=new mt(u,r)}async function m(t){if(!t)return;Array.isArray(t.children)&&t.children.length?(n(0,l=!0),n(2,a=!0),g(t.children),await ee(200),c.focus(),n(2,a=!1)):(s("exec",t),n(0,l=!1)),n(3,h=0)}return p=()=>{var t,e;t=i,e=async()=>{n(0,l=!0),n(3,h=0),s("opened")},Yt.unbind(t),Yt(t,(function(t){t.preventDefault(),e()})),function(t,e){t.filter(t=>t.shortcut).map(t=>{Yt.unbind(t.shortcut),Yt(t.shortcut,(async function(n){n.preventDefault(),e(t)}))})}(o,async t=>{n(0,l=!0),s("opened"),await ee(200),n(3,h=o.findIndex(e=>e.name===t.name)),await ee(100),m(t)})},k().$$.on_mount.push(p),t.$set=t=>{"hotkey"in t&&n(12,i=t.hotkey),"inputData"in t&&n(13,o=t.inputData)},[l,c,a,h,d,function(t){n(3,h=t.detail),m(d[h])},function(t){m(d[h])},function(t){n(3,h--,h);const e=d.length-1;h<0&&n(3,h=e)},function(t){n(3,h++,h);const e=d.length-1;h>e&&n(3,h=0)},function(t){const e=t.detail;if(s("textChanged",e),n(3,h=0),e){const t=f.search(e);n(4,d=t.map(t=>t.item))}else n(4,d=u)},async function(t){await ee(10),a||(s("closed"),n(3,h=0),g(o),n(0,l=!1))},function(t){s("opened"),n(0,l=!0),n(3,h=0)},i,o,u,f,s,r,g,m,function(t){c=t,n(1,c)},function(t){l=t,n(0,l)}]}class fe extends H{constructor(t){super(),W(this,t,de,ue,o,{hotkey:12,inputData:13})}}var pe=function(){this.topics={}};pe.prototype.subscribe=function(t,e){this.topics.hasOwnProperty(t)||(this.topics[t]=[]),this.topics[t].push(e)},pe.prototype.unsubscribe=function(t){delete this.topics[t]},pe.prototype.publish=function(t,e){this.topics.hasOwnProperty(t)&&this.topics[t].forEach((function(t){t(null!=e?e:{})}))};var ge=function(){return new pe};class me{constructor(t){console.log("CommandPal",{options:t}),this.options=t||{},this.ps=ge()}start(){this.app=new fe({target:document.body,props:{hotkey:this.options.hotkey||"ctrl+space",inputData:this.options.commands||[]}});const t=this;function e(e){t.app.$on(e,n=>t.ps.publish(e,n.detail))}e("open"),e("closed"),e("textChanged"),e("exec"),this.ps.subscribe("exec",t=>{t.handler&&"function"==typeof t.handler&&t.handler()})}subscribe(t,e){this.ps.subscribe(t,t=>e(t))}destroy(){this.app.$destroy()}}return window.CommandPal=me,me}();
