(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-68d71e20"],{"1f10":function(t,e,n){},"25f0":function(t,e,n){"use strict";var a=n("6eeb"),r=n("825a"),i=n("d039"),c=n("ad6d"),s="toString",o=RegExp.prototype,l=o[s],u=i((function(){return"/a/b"!=l.call({source:"a",flags:"b"})})),d=l.name!=s;(u||d)&&a(RegExp.prototype,s,(function(){var t=r(this),e=String(t.source),n=t.flags,a=String(void 0===n&&t instanceof RegExp&&!("flags"in o)?c.call(t):n);return"/"+e+"/"+a}),{unsafe:!0})},2909:function(t,e,n){"use strict";function a(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}n("a4d3"),n("e01a"),n("d28b"),n("a630"),n("e260"),n("d3b7"),n("25f0"),n("3ca3"),n("ddb0");function r(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function c(t){return a(t)||r(t)||i()}n.d(e,"a",(function(){return c}))},"347b":function(t,e,n){"use strict";var a=n("ab51"),r=n.n(a);r.a},"3ca3":function(t,e,n){"use strict";var a=n("6547").charAt,r=n("69f3"),i=n("7dd0"),c="String Iterator",s=r.set,o=r.getterFor(c);i(String,"String",(function(t){s(this,{type:c,string:String(t),index:0})}),(function(){var t,e=o(this),n=e.string,r=e.index;return r>=n.length?{value:void 0,done:!0}:(t=a(n,r),e.index+=t.length,{value:t,done:!1})}))},4774:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-card",{staticClass:"new-col"},[a("el-row",{staticClass:"header",attrs:{gutter:20}},[a("el-col",{attrs:{span:6}},[a("div",{staticClass:"container-card"},[a("div",{staticClass:"img-contain"},[a("img",{staticClass:"wlecome-img",attrs:{src:n("4fec"),alt:""}})]),t._v(" 总播放量"+t._s(t.play)+" ")])]),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"container-card"},[a("div",{staticClass:"img-contain backpro"},[a("img",{staticClass:"wlecome-img",attrs:{src:n("4fec"),alt:""}})]),t._v(" 总节目数"+t._s(t.total)+" ")])]),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"container-card"},[a("div",{staticClass:"img-contain backup"},[a("img",{staticClass:"wlecome-img",attrs:{src:n("951c"),alt:""}})]),a("span",[t._v("今日更新"+t._s(t.dayup.length))])])]),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"container-card cursor",on:{click:t.iscomment}},[a("div",{staticClass:"img-contain backps"},[a("img",{staticClass:"wlecome-img",attrs:{src:n("9217"),alt:""}})]),a("span",[t._v("留言板")])])])],1),a("h4",[t._v("最新节目")]),a("piclist",{attrs:{piclist:t.picimg}})],1),a("el-dialog",{attrs:{title:t.status?"留言内容":"留言板",visible:t.comment,width:"40%"},on:{"update:visible":function(e){t.comment=e}}},[t.status?a("div",{},t._l(t.commentlist,(function(e){return a("div",{key:e._id},[a("div",[t._v(t._s(e.username)+"说："+t._s(e.content))]),a("div",{staticClass:"createtime"},[t._v(t._s(t._f("dateformat")(e.createtime)))])])})),0):a("div",[a("el-form",{ref:"comment",staticClass:"demo-ruleForm",attrs:{model:t.comments,"label-width":"80px",size:"small"}},[a("el-form-item",{attrs:{label:"留言内容"}},[a("el-input",{staticClass:"content",attrs:{type:"textarea",placeholder:"感谢你的建议！"},model:{value:t.comments.content,callback:function(e){t.$set(t.comments,"content",e)},expression:"comments.content"}})],1)],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small"},on:{click:function(e){t.comment=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.submitcontent}},[t._v("确 定")])],1)])],1)},r=[],i=(n("99af"),n("4de4"),n("4160"),n("fb6a"),n("4d90"),n("498a"),n("159b"),n("5530")),c=n("2909"),s=(n("96cf"),n("1da1")),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"container",on:{mouseover:t.cleartime,mouseleave:t.starttime}},[n("div",{ref:"lunbo",staticClass:"block"},t._l(t.piclist,(function(e,a){return n("img",{key:e.title,class:{active:a===t.selected&&!0===t.act,"block-act":a===t.selected},attrs:{src:"http://127.0.0.1:3000"+e.banner,alt:e.title},on:{click:function(n){return t.goplay(e._id,e.path)}}})})),0),n("ul",{staticClass:"side"},t._l(t.piclist,(function(e,a){return n("li",{key:a,class:["side-item",{"li-selected":a===t.selected}],on:{mouseover:function(e){return t.changeClass(a)},click:function(n){return t.goplay(e._id,e.path)}}},[n("span",{class:[{"side-item-title selected":a===t.selected}]},[t._v(t._s(e.title.slice(0,5)))]),a!==t.selected?n("span",[t._v("：")]):t._e(),n("span",{class:[{"side-item-bio selected":a===t.selected},"side-span"]},[t._v(t._s(e.subtitle))])])})),0)])])},l=[],u={data:function(){return{selected:0,timer:null,act:!0}},props:{piclist:{type:Array,defaults:[]}},created:function(){},mounted:function(){this.lunbo()},methods:{changeClass:function(t){this.selected=t},lunbo:function(){var t=this;this.timer=setInterval((function(){t.selected++,t.selected===t.piclist.length&&(t.selected=0)}),4e3)},cleartime:function(){clearInterval(this.timer),this.act=!1},starttime:function(){var t=this;this.lunbo(),setTimeout((function(){t.act=!0}),4e3)},goplay:function(t,e){console.log(t,e),this.$router.push({path:"/detail",query:{id:t,title:e}})}}},d=u,f=(n("347b"),n("2877")),m=Object(f["a"])(d,o,l,!1,null,"847de404",null),p=m.exports,v=n("2f62"),g={components:{piclist:p},data:function(){return{picimg:[],total:0,play:0,dayup:[],comment:!1,comments:{avatar:"",username:"",content:""},commentlist:null}},created:function(){this.getallprogram(),this.getcomment()},methods:{getallprogram:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var n,a,r,i,s,o,l,u,d;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("/home/program");case 2:a=e.sent,r=a.data,t.total=r.data[0].data.length+r.data[1].data.length+r.data[2].data.length+r.data[3].data.length,r.data.forEach((function(e){e.data.forEach((function(e){return t.play=t.play+e.hot}))})),i=new Date,s=t.dateformat(i),r.data.forEach((function(e){var n,a=e.data.filter((function(e){var n=t.dateformat(e.updatetime);return s===n}));(n=t.dayup).push.apply(n,Object(c["a"])(a)),console.log(t.dayup)})),o=r.data[0].data.sort((function(t,e){return parseInt(t.updatetime)-parseInt(e.updatetime)})).slice(0,3),o.forEach((function(t){t.path=r.data[0].title})),l=r.data[1].data.sort((function(t,e){return parseInt(t.updatetime)-parseInt(e.updatetime)})).slice(0,2),l.forEach((function(t){t.path=r.data[1].title})),u=r.data[2].data.reverse().slice(0,2),u.forEach((function(t){t.path=r.data[2].title})),d=r.data[3].data.sort((function(t,e){return parseInt(t.updatetime)-parseInt(e.updatetime)})).slice(0,4),d.forEach((function(t){t.path=r.data[3].title})),(n=t.picimg).push.apply(n,Object(c["a"])(o).concat(Object(c["a"])(l),Object(c["a"])(u),Object(c["a"])(d)));case 18:case"end":return e.stop()}}),e)})))()},dateformat:function(t){var e=new Date(t),n=e.getFullYear(),a=(e.getMonth()+1+"").padStart(2,"0"),r=(e.getDate()+"").padStart(2,"0");return"".concat(n,"-").concat(a,"-").concat(r)},iscomment:function(){this.comment=!0},submitcontent:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.comments.username=t.username,t.comments.content.trim(),e.next=4,t.$http.post("/comments",t.comments);case 4:if(n=e.sent,a=n.data,1===a.code){e.next=8;break}return e.abrupt("return",t.$message.error(a.msg));case 8:return t.comments=!1,e.abrupt("return",t.$message({message:a.msg,type:"success"}));case 10:case"end":return e.stop()}}),e)})))()},getcomment:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("/comments");case 2:if(n=e.sent,a=n.data,1===a.code){e.next=6;break}return e.abrupt("return",console.log(a.msg));case 6:t.commentlist=a.data;case 7:case"end":return e.stop()}}),e)})))()}},computed:Object(i["a"])({},Object(v["c"])({status:function(t){return t.status},username:function(t){return t.userinfo.username}}))},h=g,b=(n("f29e"),Object(f["a"])(h,a,r,!1,null,"e426bfb0",null));e["default"]=b.exports},"498a":function(t,e,n){"use strict";var a=n("23e7"),r=n("58a8").trim,i=n("c8d2");a({target:"String",proto:!0,forced:i("trim")},{trim:function(){return r(this)}})},"4df4":function(t,e,n){"use strict";var a=n("0366"),r=n("7b0b"),i=n("9bdd"),c=n("e95a"),s=n("50c4"),o=n("8418"),l=n("35a1");t.exports=function(t){var e,n,u,d,f,m,p=r(t),v="function"==typeof this?this:Array,g=arguments.length,h=g>1?arguments[1]:void 0,b=void 0!==h,y=l(p),w=0;if(b&&(h=a(h,g>2?arguments[2]:void 0,2)),void 0==y||v==Array&&c(y))for(e=s(p.length),n=new v(e);e>w;w++)m=b?h(p[w],w):p[w],o(n,w,m);else for(d=y.call(p),f=d.next,n=new v;!(u=f.call(d)).done;w++)m=b?i(d,h,[u.value,w],!0):u.value,o(n,w,m);return n.length=w,n}},"4fec":function(t,e,n){t.exports=n.p+"img/play.b5f63f1d.svg"},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,n){var a=n("1d80"),r=n("5899"),i="["+r+"]",c=RegExp("^"+i+i+"*"),s=RegExp(i+i+"*$"),o=function(t){return function(e){var n=String(a(e));return 1&t&&(n=n.replace(c,"")),2&t&&(n=n.replace(s,"")),n}};t.exports={start:o(1),end:o(2),trim:o(3)}},6547:function(t,e,n){var a=n("a691"),r=n("1d80"),i=function(t){return function(e,n){var i,c,s=String(r(e)),o=a(n),l=s.length;return o<0||o>=l?t?"":void 0:(i=s.charCodeAt(o),i<55296||i>56319||o+1===l||(c=s.charCodeAt(o+1))<56320||c>57343?t?s.charAt(o):i:t?s.slice(o,o+2):c-56320+(i-55296<<10)+65536)}};t.exports={codeAt:i(!1),charAt:i(!0)}},9217:function(t,e,n){t.exports=n.p+"img/push.70812082.svg"},"951c":function(t,e,n){t.exports=n.p+"img/update.74fe7b72.svg"},a630:function(t,e,n){var a=n("23e7"),r=n("4df4"),i=n("1c7e"),c=!i((function(t){Array.from(t)}));a({target:"Array",stat:!0,forced:c},{from:r})},ab51:function(t,e,n){},ad6d:function(t,e,n){"use strict";var a=n("825a");t.exports=function(){var t=a(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},c8d2:function(t,e,n){var a=n("d039"),r=n("5899"),i="​᠎";t.exports=function(t){return a((function(){return!!r[t]()||i[t]()!=i||r[t].name!==t}))}},d28b:function(t,e,n){var a=n("746f");a("iterator")},ddb0:function(t,e,n){var a=n("da84"),r=n("fdbc"),i=n("e260"),c=n("9112"),s=n("b622"),o=s("iterator"),l=s("toStringTag"),u=i.values;for(var d in r){var f=a[d],m=f&&f.prototype;if(m){if(m[o]!==u)try{c(m,o,u)}catch(v){m[o]=u}if(m[l]||c(m,l,d),r[d])for(var p in i)if(m[p]!==i[p])try{c(m,p,i[p])}catch(v){m[p]=i[p]}}}},e01a:function(t,e,n){"use strict";var a=n("23e7"),r=n("83ab"),i=n("da84"),c=n("5135"),s=n("861d"),o=n("9bf2").f,l=n("e893"),u=i.Symbol;if(r&&"function"==typeof u&&(!("description"in u.prototype)||void 0!==u().description)){var d={},f=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof f?new u(t):void 0===t?u():u(t);return""===t&&(d[e]=!0),e};l(f,u);var m=f.prototype=u.prototype;m.constructor=f;var p=m.toString,v="Symbol(test)"==String(u("test")),g=/^Symbol\((.*)\)[^)]+$/;o(m,"description",{configurable:!0,get:function(){var t=s(this)?this.valueOf():this,e=p.call(t);if(c(d,t))return"";var n=v?e.slice(7,-1):e.replace(g,"$1");return""===n?void 0:n}}),a({global:!0,forced:!0},{Symbol:f})}},f29e:function(t,e,n){"use strict";var a=n("1f10"),r=n.n(a);r.a},fb6a:function(t,e,n){"use strict";var a=n("23e7"),r=n("861d"),i=n("e8b5"),c=n("23cb"),s=n("50c4"),o=n("fc6a"),l=n("8418"),u=n("b622"),d=n("1dde"),f=n("ae40"),m=d("slice"),p=f("slice",{ACCESSORS:!0,0:0,1:2}),v=u("species"),g=[].slice,h=Math.max;a({target:"Array",proto:!0,forced:!m||!p},{slice:function(t,e){var n,a,u,d=o(this),f=s(d.length),m=c(t,f),p=c(void 0===e?f:e,f);if(i(d)&&(n=d.constructor,"function"!=typeof n||n!==Array&&!i(n.prototype)?r(n)&&(n=n[v],null===n&&(n=void 0)):n=void 0,n===Array||void 0===n))return g.call(d,m,p);for(a=new(void 0===n?Array:n)(h(p-m,0)),u=0;m<p;m++,u++)m in d&&l(a,u,d[m]);return a.length=u,a}})}}]);
//# sourceMappingURL=chunk-68d71e20.ab99e879.js.map