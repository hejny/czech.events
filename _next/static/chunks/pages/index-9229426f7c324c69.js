(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(9623)}])},6723:function(e,t){"use strict";t.Z={src:"/_next/static/media/czech.events.transparent-logo.fit.a8937533.png",height:832,width:1778,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAMAAACEE47CAAAAFVBMVEXz8/Py8vLs7Ozx8fHz8/Px8fHz8/PXq79AAAAAB3RSTlN9cwFbjAhOxZOBtAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAACFJREFUeJwFwYEBAAAIgjDQ6v+T2+iASahidkkZoeQE6gMEYAA7OWM7iQAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:4}},227:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getDomainLocale=function(e,t,n,r){return!1},("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1551:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(2648).Z,a=n(7273).Z,o=r(n(7294)),i=n(1003),l=n(7795),s=n(4465),u=n(2692),c=n(8245),d=n(9246),A=n(227),f=n(3468);let h=new Set;function p(e,t,n,r){if(i.isLocalURL(t)){if(!r.bypassPrefetchedCheck){let a=void 0!==r.locale?r.locale:"locale"in e?e.locale:void 0,o=t+"%"+n+"%"+a;if(h.has(o))return;h.add(o)}Promise.resolve(e.prefetch(t,n,r)).catch(e=>{})}}function m(e){return"string"==typeof e?e:l.formatUrl(e)}let x=o.default.forwardRef(function(e,t){let n,r;let{href:l,as:h,children:x,prefetch:g,passHref:v,replace:b,shallow:j,scroll:w,locale:E,onClick:_,onMouseEnter:y,onTouchStart:M,legacyBehavior:S=!1}=e,k=a(e,["href","as","children","prefetch","passHref","replace","shallow","scroll","locale","onClick","onMouseEnter","onTouchStart","legacyBehavior"]);n=x,S&&("string"==typeof n||"number"==typeof n)&&(n=o.default.createElement("a",null,n));let C=!1!==g,N=o.default.useContext(u.RouterContext),O=o.default.useContext(c.AppRouterContext),U=null!=N?N:O,R=!N,{href:T,as:z}=o.default.useMemo(()=>{if(!N){let e=m(l);return{href:e,as:h?m(h):e}}let[e,t]=i.resolveHref(N,l,!0);return{href:e,as:h?i.resolveHref(N,h):t||e}},[N,l,h]),B=o.default.useRef(T),F=o.default.useRef(z);S&&(r=o.default.Children.only(n));let I=S?r&&"object"==typeof r&&r.ref:t,[V,P,L]=d.useIntersection({rootMargin:"200px"}),D=o.default.useCallback(e=>{(F.current!==z||B.current!==T)&&(L(),F.current=z,B.current=T),V(e),I&&("function"==typeof I?I(e):"object"==typeof I&&(I.current=e))},[z,I,T,L,V]);o.default.useEffect(()=>{U&&P&&C&&p(U,T,z,{locale:E})},[z,T,P,E,C,null==N?void 0:N.locale,U]);let X={ref:D,onClick(e){S||"function"!=typeof _||_(e),S&&r.props&&"function"==typeof r.props.onClick&&r.props.onClick(e),U&&!e.defaultPrevented&&function(e,t,n,r,a,l,s,u,c,d){let{nodeName:A}=e.currentTarget,f="A"===A.toUpperCase();if(f&&(function(e){let{target:t}=e.currentTarget;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||!i.isLocalURL(n)))return;e.preventDefault();let h=()=>{"beforePopState"in t?t[a?"replace":"push"](n,r,{shallow:l,locale:u,scroll:s}):t[a?"replace":"push"](r||n,{forceOptimisticNavigation:!d})};c?o.default.startTransition(h):h()}(e,U,T,z,b,j,w,E,R,C)},onMouseEnter(e){S||"function"!=typeof y||y(e),S&&r.props&&"function"==typeof r.props.onMouseEnter&&r.props.onMouseEnter(e),U&&(C||!R)&&p(U,T,z,{locale:E,priority:!0,bypassPrefetchedCheck:!0})},onTouchStart(e){S||"function"!=typeof M||M(e),S&&r.props&&"function"==typeof r.props.onTouchStart&&r.props.onTouchStart(e),U&&(C||!R)&&p(U,T,z,{locale:E,priority:!0,bypassPrefetchedCheck:!0})}};if(!S||v||"a"===r.type&&!("href"in r.props)){let e=void 0!==E?E:null==N?void 0:N.locale,t=(null==N?void 0:N.isLocaleDomain)&&A.getDomainLocale(z,e,null==N?void 0:N.locales,null==N?void 0:N.domainLocales);X.href=t||f.addBasePath(s.addLocale(z,e,null==N?void 0:N.defaultLocale))}return S?o.default.cloneElement(r,X):o.default.createElement("a",Object.assign({},k,X),n)});t.default=x,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9246:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){let{rootRef:t,rootMargin:n,disabled:s}=e,u=s||!o,[c,d]=r.useState(!1),A=r.useRef(null),f=r.useCallback(e=>{A.current=e},[]);r.useEffect(()=>{if(o){if(u||c)return;let e=A.current;if(e&&e.tagName){let r=function(e,t,n){let{id:r,observer:a,elements:o}=function(e){let t;let n={root:e.root||null,margin:e.rootMargin||""},r=l.find(e=>e.root===n.root&&e.margin===n.margin);if(r&&(t=i.get(r)))return t;let a=new Map,o=new IntersectionObserver(e=>{e.forEach(e=>{let t=a.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)})},e);return t={id:n,observer:o,elements:a},l.push(n),i.set(n,t),t}(n);return o.set(e,t),a.observe(e),function(){if(o.delete(e),a.unobserve(e),0===o.size){a.disconnect(),i.delete(r);let e=l.findIndex(e=>e.root===r.root&&e.margin===r.margin);e>-1&&l.splice(e,1)}}}(e,e=>e&&d(e),{root:null==t?void 0:t.current,rootMargin:n});return r}}else if(!c){let e=a.requestIdleCallback(()=>d(!0));return()=>a.cancelIdleCallback(e)}},[u,n,t,c,A.current]);let h=r.useCallback(()=>{d(!1)},[]);return[f,c,h]};var r=n(7294),a=n(4686);let o="function"==typeof IntersectionObserver,i=new Map,l=[];("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},737:function(e,t,n){"use strict";n.d(t,{m:function(){return o}});var r=n(7294),a=n(960);function o(){return(0,r.useMemo)(()=>new a.S(new URL("localhost"===window.location.hostname?"http://localhost:17755/":"https://api.pavolhejny.com/czech-events/")),[])}},4435:function(e,t,n){"use strict";n.d(t,{$:function(){return i}});var r=n(5893),a=n(1344),o=n.n(a);function i(){return(0,r.jsx)("div",{className:o().footer,children:(0,r.jsxs)("ul",{children:[(0,r.jsxs)("li",{children:["\xa9 ",new Date().getFullYear()]}),(0,r.jsx)("li",{children:(0,r.jsxs)("a",{href:"https://github.com/hejny/rapid-prototyping-wizard/",children:["v","3.4.12"]})})]})})}},5319:function(e,t,n){"use strict";n.d(t,{w:function(){return p}});var r=n(5893),a=n(5675),o=n.n(a),i={src:"/_next/static/media/collboard.3341350e.png",height:111,width:111,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAGFBMVEUAnd3+//8Po9+I0u8nreNoxutDt+ak3fMJ3TeiAAAACXBIWXMAAAsTAAALEwEAmpwYAAAALElEQVR4nE3GMRIAMAgCQRDU//8449Dkmlvgqyr3btRyUFLgbgMYkaQGt+sBC2sAYRhZPEkAAAAASUVORK5CYII=",blurWidth:8,blurHeight:8},l={src:"/_next/static/media/hackprague.61c190c0.svg",height:65,width:40},s={src:"/_next/static/media/startup-weekend-bratislava.92d7da58.png",height:320,width:320,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAHlBMVEVVSZ9bT6K/u9trYKuBeLiQiMB3brKfmMmuqNGooc7iZKmzAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMklEQVR4nB3GuREAIBADsbXvpf+GGVAkJJxIiDgOXroyf8Lun/LOi3ZmA0hXnQIiuzO4FbAAtT/ith8AAAAASUVORK5CYII=",blurWidth:8,blurHeight:8},u={src:"/_next/static/media/startup-weekend-prague.5e6f7b6e.png",height:2048,width:2048,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAKlBMVEVMaXF2TXFSkshaUYo9MIEvN5JlZJApNpaaUFRfXY6MSlpOgr1Mgb1nWoZQfNZiAAAADXRSTlMA+YM0w2OsO+Ot4WZl/MWUBgAAAAlwSFlzAAALEwAACxMBAJqcGAAAAChJREFUeJxjYEACrOxQBgsLlMHFAaGZGRmZwQw2Xl5OMIObiYkHSS8ADWgAc3O2zuUAAAAASUVORK5CYII=",blurWidth:8,blurHeight:8},c={src:"/_next/static/media/startupbox.f1204d88.png",height:240,width:240,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAASFBMVEUFOpAFOY4IO44DOY9hg7szVo17l8M4T3OmfTVyZ08YQoWQcTrIihwpSHlFba0YSJVFYI2MptJyksabdjVidI56jalRbZi9gx4rWXE+AAAACnRSTlPv+////v7+/v7+xNLlNgAAAAlwSFlzAAALEwAACxMBAJqcGAAAAEBJREFUeJwVxkkSgCAMBMCpDAokYUf9/08t+tQA5QBaE7azOu45w6i4dt39fTryZ2bLC7InW8kjNEopqgpQSBI/U9oCVw51+FkAAAAASUVORK5CYII=",blurWidth:8,blurHeight:8},d={src:"/_next/static/media/undout.af1e153b.png",height:512,width:512,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAFVBMVEUREBAIBweDg4NramocGxs5OTmVlJR6u60nAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAKElEQVR4nGNgwASMzKwsjGAGExMzC4TBzMwEEmJkZWNjhcixQNRAAQAJBQBJqhp2lwAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:8},A=n(6638),f=n(2360),h=n.n(f);function p(){return(0,r.jsxs)("div",{className:h().Partners,children:[(0,r.jsx)("h2",{children:"Partneři"}),(0,r.jsx)("div",{className:h().list,children:(0,r.jsx)(A.g,{seed:"partners",children:[{name:"Startup Weekend Prague",image:u,link:"https://www.facebook.com/swprague/"},{name:"Startup Weekend Bratislava",image:s,link:"https://www.facebook.com/StartupWeekendBratislava/"},{name:"Undout Sleep Box",image:d,link:"https://undout.com/"},{name:"HackPrague",image:l,link:"https://hackprague.com/"},{name:"StartupBox",image:c,link:"https://www.startupbox.cz/"},{name:"Collboard",image:i,link:"https://www.collboard.com/"}].map(e=>{let{name:t,image:n,link:a}=e;return(0,r.jsxs)("a",{href:a,target:"_blank",rel:"noopener noreferrer",title:t,children:[(0,r.jsx)(o(),{src:n,alt:"Logo of ".concat(t),draggable:"false",placeholder:"blur"}),t]},t)})})})]})}},6638:function(e,t,n){"use strict";n.d(t,{g:function(){return s}});var r=n(5893),a=n(7294),o=n(6377),i=n.n(o);let l=(0,a.createContext)("");function s(e){let{children:t,seed:n}=e,o=i()((0,a.useContext)(l).toString()+((null==n?void 0:n.toString())||"")),s=[...t].sort(()=>o()>.5?1:-1);return(0,r.jsx)(r.Fragment,{children:s})}},9623:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return O},default:function(){return U}});var r=n(5893),a=n(737),o=n(2317),i=n(1658),l=n(4430),s=n(4435),u=n(7294),c=n(1888),d=n(5319),A=n(8114),f=n(8175),h=n(9076),p=n(9897),m=n.n(p);function x(e){return(0,r.jsxs)("form",{className:m().SubscribeForm,onSubmit:async t=>{t.preventDefault();let n=t.target,r=new FormData(n);if(!r.get("gdpr")){alert("Potřebujeme od V\xe1s zaškrtnout souhlas se zpracov\xe1n\xedm osobn\xedch \xfadajů.");return}let a=r.get("email"),o=r.get("fullname"),l=(0,i.M)(f.L,{email:a,fullname:o,source:window.location.toString()});try{let t=await e.apiClient.postSubscriber(l);console.log("result",t),n.reset(),alert("Děkujeme, můžete se těšit na dalš\xed email!")}catch(e){if(!(e instanceof Error))throw e;console.error(e),alert((0,A.ZP)("\n                            Omlouv\xe1me se, ale něco se pokazilo\n\n                            Vyzkoušejte se přihl\xe1sit později nebo mi napište na pavol@hejny.org"))}},children:[(0,r.jsxs)("div",{className:"group",children:[(0,r.jsx)("label",{htmlFor:"name",children:"Vaše jm\xe9no:"}),(0,r.jsx)("input",{type:"text",name:"fullname",className:m().field,defaultValue:""})]}),(0,r.jsxs)("div",{className:"group",children:[(0,r.jsx)("label",{htmlFor:"email",children:"E-mail: *"}),(0,r.jsx)("input",{type:"email",name:"email",defaultValue:"@",required:!0,className:m().field})]}),(0,r.jsxs)("div",{className:(0,h.A)("group","checkbox",m().gdpr),children:[(0,r.jsx)("input",{type:"checkbox",name:"gdpr",id:"gdpr",defaultChecked:!1}),(0,r.jsx)("label",{htmlFor:"gdpr",children:"Souhlas\xedm se zpracov\xe1n\xedm osobn\xedch \xfadajů"})]}),(0,r.jsx)("div",{className:m().center,children:(0,r.jsx)("input",{value:"Přihl\xe1sit se ",type:"submit",id:"submit",name:"submit",className:m().button})})]})}var g=n(5675),v=n.n(g),b=n(6723),j=n(1664),w=n.n(j),E=n(6701),_=n(6895),y=n(1354),M=n(8204),S=n(6638);function k(e){let t=(0,_.n)(e),{newsletterContents:n}=t;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("h2",{children:(0,r.jsx)(M.T,{newsletterContents:n,position:E.t.SUBJECT})}),(0,r.jsxs)("p",{children:["Ahoj,",(0,r.jsx)("br",{}),"opět jsme pro v\xe1s ","sestavili ","seznam ud\xe1lost\xed, na kter\xe9 se vyplat\xed zaj\xedt."]}),(0,r.jsxs)("p",{children:["Nově si tak\xe9 můžete přidat"," ",(0,r.jsx)("a",{href:"https://api.pavolhejny.com/czech-events/export/ical/czech-events.ics",children:"ud\xe1losti př\xedmo do sv\xe9ho kalend\xe1ře"}),".",(0,r.jsx)("br",{})]}),(0,r.jsx)(M.T,{newsletterContents:n,position:E.t.HEAD}),(0,r.jsx)(y.O,{newsletter:t}),(0,r.jsx)(M.T,{newsletterContents:n,position:E.t.BOTTOM}),(0,r.jsxs)("i",{children:["PS: Pokud n\xe1m v seznamu ud\xe1lost\xed někter\xe1 chyb\xed, ",(0,r.jsx)(w(),{href:"/propose",children:"navrhněte n\xe1m ji!"})]}),(0,r.jsx)("br",{}),(0,r.jsx)("br",{}),(0,r.jsxs)(S.g,{seed:"authors",children:[(0,r.jsx)("a",{href:"https://www.pavolhejny.com/?utm_source=czech.events-mail&utm_medium=referral&utm_campaign=signature",children:"Pavol Hejn\xfd"}),(0,r.jsx)(r.Fragment,{})]}),(0,r.jsx)(r.Fragment,{children:"\xa0&\xa0"}),(0,r.jsx)("a",{href:"https://www.linkedin.com/in/tereza-texlova/",children:"Tereza Texlov\xe1"})]})}let C=[{value:"CURRENT_MONTH-NEXT_MONTH",desc:"s aktu\xe1ln\xedm děn\xedm:"},{value:"NEXT_MONTH-NEXT_NEXT_MONTH",desc:"na dalš\xed měs\xedc:"}];function N(e){let{apiClient:t,prerenderedEvents:n}=e,[a,o]=(0,u.useState)(c.C.fromConstant("CURRENT_MONTH-NEXT_MONTH")),i=function(e,t){let[n,r]=u.useState(null);return u.useEffect(()=>{let t=!1,n=e();if(null!=n)return n.then(e=>{t||r(e)}),()=>{t=!0}},t),n}(async()=>{try{return await t.getEvents()}catch(e){if(!(e instanceof Error))throw e;console.error(e)}},[t]);return(0,r.jsxs)("div",{className:"page",children:[(0,r.jsxs)("div",{className:"group",children:[(0,r.jsx)("div",{className:"front black",children:(0,r.jsxs)("div",{className:"inner",children:[(0,r.jsxs)("div",{className:"head",children:[(0,r.jsx)(v(),{alt:"Czech.events logo",src:b.Z,width:200,draggable:"false",placeholder:"blur"}),(0,r.jsx)("h1",{children:"Mějte přehled o nejzaj\xedmavějš\xedch ud\xe1lostech z IT & startupov\xe9ho světa."})]}),(0,r.jsx)("h2",{className:"font-light",children:"Dejte n\xe1m Vaš\xed emailovou adresu a my V\xe1m budeme pravidelně jednou za měs\xedc pos\xedlat co se děje:"}),(0,r.jsx)(x,{apiClient:t}),(0,r.jsxs)("h2",{className:"line separator font-light",children:["A jak takov\xfd mail vypad\xe1? Tady m\xe1te živou uk\xe1zku z rozpracovan\xe9ho mailu",(0,r.jsx)("select",{className:"font-light select-inline",onChange:e=>void o(c.C.fromConstant(e.target.value)),children:C.map(e=>(0,r.jsx)("option",{value:e.value,children:e.desc},e.value))})]})]})}),(0,r.jsx)("div",{className:"letter white",children:(0,r.jsx)("div",{className:"inner",children:(0,r.jsx)(k,{events:i||n,range:a})})})]}),(0,r.jsx)("div",{className:"group",children:(0,r.jsx)(d.w,{})})]})}var O=!0;function U(e){let{eventsData:t}=e,n=t.map(e=>(0,i.M)(o.ju,e)),u=(0,a.m)();return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(l.Y,{}),(0,r.jsx)(N,{apiClient:u,prerenderedEvents:n}),(0,r.jsx)(s.$,{})]})}},1344:function(e){e.exports={footer:"Footer_footer__nKPS_"}},2360:function(e){e.exports={Partners:"Partners_Partners__7vaOu",list:"Partners_list__gWzCz"}},9897:function(e){e.exports={SubscribeForm:"SubscribeForm_SubscribeForm__ke_1X",gdpr:"SubscribeForm_gdpr__sxAld",field:"SubscribeForm_field__VVAqZ",button:"SubscribeForm_button__jiFrh",center:"SubscribeForm_center__HnXmd"}},1664:function(e,t,n){e.exports=n(1551)},8114:function(e,t,n){"use strict";n.d(t,{ZP:function(){return function e(t){if("string"==typeof t)return s(t);if("function"==typeof t){var n;return"string"==typeof(n=t(i))?u(n):n.then(u)}throw Error(e("\n              spaceTrim expected\n\n          "))}}});var r="38ea8d83-fe54-47cd-9519-90a90c58596f_"+Math.floor(1e5*Math.random()),a="__SPACE_"+r+"__",o="__NEWLINE_"+r+"__";function i(e){return e.split("\n").join(o).split(" ").join(a)}function l(e){var t,n,r=[],a=!1,o=e.split("\n");try{for(var i=/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}(o),l=i.next();!l.done;l=i.next()){var s=l.value;""!==s.trim()&&(a=!0),a&&r.push(s)}}catch(e){t={error:e}}finally{try{l&&!l.done&&(n=i.return)&&n.call(i)}finally{if(t)throw t.error}}return r.join("\n")}function s(e){t=l(t=e);var t,n=(e=t=l(t.split("\n").reverse().join("\n")).split("\n").reverse().join("\n")).split("\n"),r=n.filter(function(e){return""!==e.trim()}).map(function(e){var t=e.length-e.trimStart().length,n=t+e.trim().length;return{contentStart:t,contentEnd:n}});if(0===r.length)return"";var a=r.reduce(function(e,t){var n=e.minContentStart,r=e.maxContentEnd;return{minContentStart:Math.min(n,t.contentStart),maxContentEnd:Math.max(r,t.contentEnd)}},{minContentStart:r[0].contentStart,maxContentEnd:r[0].contentEnd}),o=a.minContentStart,i=a.maxContentEnd;return n.map(function(e){return e.substring(o,i)}).join("\n")}function u(e){var t=s(e).split("\n");return(t=t.map(function(e){var t=e.split(o),n=t[0],r=n.length-n.trimStart().length,i=" ".repeat(r);return t.map(function(e){return""+i+e.trimStart().split(a).join(" ")}).join("\n")})).join("\n")}},5042:function(){}},function(e){e.O(0,[773,292,885,869,549,377,668,774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);