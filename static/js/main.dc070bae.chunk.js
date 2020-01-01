(this["webpackJsonpczech-events"]=this["webpackJsonpczech-events"]||[]).push([[0],{14:function(e,t,n){e.exports=n(29)},19:function(e,t,n){},29:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(8),o=n.n(c);n(19),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var i=n(1),l=n.n(i),s=n(2),u=n(5),m=n(12),h=n(9),d=n(13),p=function(){function e(t,n){Object(s.a)(this,e),this.from=t,this.to=n}return Object(u.a)(e,[{key:"isIn",value:function(e){return!(this.from&&this.from>e)&&!(this.to&&this.to<e)}}],[{key:"forMonth",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date,n=t.getMonth(),r=t.getFullYear(),a=new Date(r,n,1),c=new Date(r,n,31);return new e(a,c)}}]),e}();p.ALL=new p,p.CURRENT_MONTH=p.forMonth(),p.FROM_CURRENT_MONTH=new p(p.CURRENT_MONTH.from);var v,f,E=n(6),y=E.ConfigChecker.from({EVENTS_CSV_URL:"https://docs.google.com/spreadsheets/d/e/2PACX-1vRq0s15Wi8g4c61FOqIhpn0Lw4azPJdgQ3XmJ3uLDSCqQVs52nJa99YJjOGhl-XJZ713zCprzuYOpVu/pub?gid=0&single=true&output=csv"}).get("EVENTS_CSV_URL").url().required().value,g=n(4),b=n(10),w=n.n(b);function N(e){return Object.keys(e).map((function(t){return e[t]})).filter((function(e){return"string"===typeof e}))}!function(e){e.CONFERENCE="CONFERENCE",e.MEETUP="MEETUP",e.WORKSHOP="WORKSHOP",e.HACKATHON="HACKATHON"}(v||(v={})),function(e){e[e.CZK=0]="CZK",e[e.EUR=1]="EUR"}(f||(f={}));var O=function e(t){Object(s.a)(this,e),this.name=void 0,this.topic=void 0,this.city=void 0,this.year=void 0,this.month=void 0,this.day=void 0,this.days=void 0,this.date=void 0,this.time=void 0,this.priceAmount=void 0,this.priceCurrency=void 0,this.codeName=void 0,this.codePercent=void 0,this.type=void 0,this.web=void 0,this.inMail=void 0,this.topParagraph=void 0,this.topParagraphOrder=void 0;var n=E.ConfigChecker.from(t);if(this.name=n.get("name").required().value,this.topic=n.get("topic").value,this.city=n.get("city").value,this.year=n.get("year").number().required().value,this.month=n.get("month").number().required().value,this.days=n.get("days").required().value,this.day=parseInt(this.days.split("-")[0].trim()),isNaN(this.day))throw new Error('Day parsed from "'.concat(this.days,'" is NaN.'));try{if(this.date=new Date(this.year,this.month-1,this.day),isNaN(this.date.getDate()))throw new Error}catch(r){throw new Error("Cannot create a valie new Date(".concat(this.year,", ").concat(this.month," - 1, ").concat(this.day,");"))}if(this.time=n.get("time").required().value,this.priceAmount=n.get("priceAmount").number().value,this.priceCurrency=n.get("priceCurrency").value,this.codeName=n.get("codeName").value,this.codePercent=n.get("codePercent").number().value,this.codePercent&&(this.codePercent=this.codePercent/100),this.type=n.get("type").required().asType().value,!N(v).includes(this.type))throw new Error('Wrong type "'.concat(this.type,'".'));this.web=n.get("web").url().required().value,this.inMail=n.get("inMail").boolean().required().value,this.topParagraph=n.get("topParagraph").value,this.topParagraphOrder=n.get("topParagraphOrder").number().default(999).value};function k(e,t){return"string"===typeof e&&(e=void 0),"string"===typeof t&&(t=void 0),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new Date;try{var n=new Date(t)-new Date(e);return n>0?-1:n<0?1:0}catch(r){return console.warn(r),-1}}(e?e.date:void 0,t?t.date:void 0)}function C(){var e,t,n,r;return l.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,l.a.awrap(fetch(y.toString(),{cache:"reload"}));case 2:return e=a.sent,a.next=5,l.a.awrap(e.text());case 5:return t=a.sent,n=w.a.parse(t,{header:!0}),r=n.data,a.abrupt("return",r.map((function(e){return Object(g.emptyKeysAsUndefined)(e,(function(e){return!["","write","NULL"].includes((e||"").trim())}))})).map(g.decapitalize).filter(g.isNotEmpty).filter((function(e){return e.inMail})).map((function(e){try{return new O(e)}catch(t){return t.message}})).sort(k));case 8:case"end":return a.stop()}}))}function P(e){var t=e.children;return r.createElement(r.Fragment,null,r.createElement("div",{className:"error"},t))}function j(){return r.createElement(r.Fragment,null,r.createElement("form",{action:"https://www.pavolhejny.com/",method:"post",target:"_blank"},r.createElement("input",{type:"hidden",name:"sp_list",value:"2197"}),r.createElement("input",{type:"hidden",name:"sendpress",value:"post"}),r.createElement("div",{className:"group"},r.createElement("input",{type:"email",id:"email",name:"sp_email",required:!0,defaultValue:"@",onFocus:function(e){}}),r.createElement("label",{htmlFor:"email"},"E-mail: *"),r.createElement("div",{className:"bar"})),r.createElement("div",{className:"center"},r.createElement("input",{value:"\ud83d\udce7 P\u0159ihl\xe1sit se ",type:"submit",id:"submit",name:"submit",className:"button"}))))}function F(){return r.createElement(r.Fragment,null,r.createElement("div",{className:"loading"},"Na\u010d\xedt\xe1n\xed..."))}var z=n(11);function R(e){var t=e.event,n=e.price;return n||(n=t.priceAmount),Object(z.isNullOrUndefined)(n)?r.createElement(r.Fragment,null):0===n?r.createElement(r.Fragment,null,"\ud83d\udcb8\xa0Zdarma"):r.createElement(r.Fragment,null,"\ud83d\udcb8\xa0","".concat(Math.ceil(100*n)/100," ").concat(function(e){switch(e){case"CZK":case f.CZK:return"K\u010d";case"EUR":case f.EUR:return"\u200e\u20ac";default:return e}}(t.priceCurrency)))}function T(e){var t=e.event,n=e.verbose;return r.createElement(r.Fragment,null,t.codeName&&t.codePercent&&t.priceAmount&&t.priceCurrency&&r.createElement(r.Fragment,null,r.createElement("br",null),"A s k\xf3dem ",r.createElement("b",null,t.codeName)," to budete m\xedt o ",Math.floor(100*t.codePercent),"% levn\u011bj\u0161\xed",n&&r.createElement(r.Fragment,null,"tzn. za ",r.createElement(R,{event:t,price:t.priceAmount*(1-t.codePercent)})),"."))}var L=n(3),M=n.n(L);n(28);function A(e){var t=e.event;return r.createElement("span",{className:t.date<new Date?"past":""},t.topParagraph?"\u2b50":"",r.createElement("a",{href:t.web.toString(),target:"_blank",rel:"nofolow noopener noreferrer"},r.createElement("b",null,t.name),t.topic?" \u2013 ".concat(t.topic):""),r.createElement("br",null),r.createElement(r.Fragment,null,"\ud83c\udf06\xa0",t.city),"\xa0",r.createElement(r.Fragment,null,"\ud83d\udcc5\xa0",function(e){try{M.a.locale("cs");var t=M()(e).format("LLLL");return t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=(t=t.split("0:00")[0]).replace("leden","Ledna")).replace("\xfanor","\xdanora")).replace("b\u0159ezen","B\u0159ezna")).replace("duben","Dubna")).replace("kv\u011bten","Kv\u011btna")).replace("\u010derven","\u010cervna")).replace("\u010dervenec","\u010cervence")).replace("srpen","Srpna")).replace("z\xe1\u0159\xed","Z\xe1\u0159\xed")).replace("\u0159\xedjen","\u0158\xedjna")).replace("listopad","Listopadu")).replace("prosinec","Prosince")).substr(0,1).toUpperCase()+t.substr(1)}catch(n){throw new Error("Problem when parsing moment('".concat(e,"').format('LLLL');"))}}(t.date)),t.time&&r.createElement(r.Fragment,null,"\xa0",r.createElement(r.Fragment,null,"\u23f1\ufe0f\xa0",function(e){try{return M.a.locale("cs"),M()("2010-10-20 "+e).format("LT")}catch(t){throw new Error("Problem when parsing moment('2010-10-20 ' + '".concat(e,"').format('LT');"))}}(t.time))),"\xa0",r.createElement(R,{event:t}),r.createElement(T,{event:t,verbose:!0}),r.createElement("br",null),r.createElement("br",null))}function S(e){var t=e.events,n=e.range,a=function(e){var t={},n=!0,r=!1,a=void 0;try{for(var c,o=N(v)[Symbol.iterator]();!(n=(c=o.next()).done);n=!0){t[c.value]=[]}}catch(g){r=!0,a=g}finally{try{n||null==o.return||o.return()}finally{if(r)throw a}}var i=!0,l=!1,s=void 0;try{for(var u,m=e[Symbol.iterator]();!(i=(u=m.next()).done);i=!0){var h=u.value,d=void 0;t[d=h instanceof O?h.type:"errors"]=t[d]||[],t[d].push(h)}}catch(g){l=!0,s=g}finally{try{i||null==m.return||m.return()}finally{if(l)throw s}}for(var p={},f=0,E=Object.keys(t);f<E.length;f++){var y=E[f];t[y].length>0&&(p[y]=t[y])}return p}(t.filter((function(e){return!(e instanceof O)||n.isIn(e.date)})));return r.createElement(r.Fragment,null,r.createElement("h2",null,"\ud83d\udcc5 Konference / meetupy / hackathony \u2013 co se d\u011bje z IT / Startupov\xe9 akce \ud83c\udf06"),"Ahoj,",r.createElement("br",null),"op\u011bt jsme dali dohromady seznam ud\xe1lost\xed, na kter\xe9 se vyplat\xed zaj\xedt:",r.createElement("br",null),t.filter((function(e){return e instanceof O})).filter((function(e){return e.topParagraph})).sort((function(e,t){return e.topParagraphOrder>t.topParagraphOrder?1:-1})).map((function(e,t){return r.createElement("p",{key:t},e.topParagraph,r.createElement(T,{event:e,verbose:!1}))})),Object.keys(a).map((function(e){return r.createElement("p",{key:e},r.createElement("h2",null,function(e){switch(e){case v.HACKATHON:return"Hackathony";case v.CONFERENCE:return"\u200eKonference";case v.MEETUP:return"\u200eMeetupy";case v.WORKSHOP:return"\u200eWorkshopy"}}(e)),r.createElement("span",null,a[e].map((function(e,t){return e instanceof O?r.createElement(A,{event:e,key:t}):r.createElement(P,{key:t},e)}))))})),r.createElement("br",null),r.createElement("i",null,"PS: ",r.createElement("b",null,"Budeme r\xe1di za va\u0161e n\xe1vrhy a p\u0159ipom\xednky"),", m\u016f\u017eete ",r.createElement("b",null,"odpov\u011bd\u011bt rovnou na email"),"."),r.createElement("br",null),r.createElement("br",null),r.createElement("a",{href:"https://www.pavolhejny/"},"Pavol"),"\xa0&\xa0",r.createElement("a",{href:"https://www.linkedin.com/in/tereza-texlova/"},"Tereza"))}var U=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(m.a)(this,Object(h.a)(t).call(this,e))).state={error:null,range:p.FROM_CURRENT_MONTH,events:null},n.loadEvents(),n}return Object(d.a)(t,e),Object(u.a)(t,[{key:"loadEvents",value:function(){var e;return l.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,l.a.awrap(C());case 3:e=t.sent,this.setState({events:e}),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),this.setState({error:t.t0.message});case 10:case"end":return t.stop()}}),null,this,[[0,7]])}},{key:"render",value:function(){return r.createElement(r.Fragment,null,r.createElement("div",{className:"content"},r.createElement("div",{className:"front black"},r.createElement("div",{className:"inner"},r.createElement("h1",null,"M\xe1me p\u0159ehled o nejzaj\xedmav\u011bj\u0161\xedch ud\xe1lostech z IT & startupov\xe9ho sv\u011bta."),r.createElement("h2",{className:"font-light"},"Dejte n\xe1m Va\u0161\xed emailovou adresu a my V\xe1m budeme pravideln\u011b jednou za m\u011bs\xedc pos\xedlat co se d\u011bje:"),r.createElement(j,null),r.createElement("h2",{className:"separator font-light"},"A jak takov\xfd mail vypad\xe1? Tady m\xe1te \u017eivou uk\xe1zku z rozpracovan\xe9ho mailu na dal\u0161\xed m\u011bs\xedc:"))),r.createElement("div",{className:"letter white"},r.createElement("div",{className:"inner"},this.state.error?r.createElement(P,null,r.createElement("pre",null,this.state.error)):this.state.events?r.createElement(S,{events:this.state.events,range:this.state.range}):r.createElement(F,null))),r.createElement("footer",{className:"footer black"})))}}]),t}(r.Component);o.a.render(a.a.createElement(U,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[14,1,2]]]);
//# sourceMappingURL=main.dc070bae.chunk.js.map