(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ca728bbc"],{3734:function(e,t,r){"use strict";var a=r("7e00"),s=r.n(a);s.a},"3e52":function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e.status?e._e():r("el-alert",{attrs:{title:"友情提示，播放后则会产生费用，且播且珍惜！",type:"warning","show-icon":"",closable:!0}}),r("el-row",{staticStyle:{height:"50px"}},[e.status?r("el-col",{staticStyle:{display:"flex","align-items":"center",height:"100%"},attrs:{span:3}},[r("el-button",{attrs:{type:"primary",icon:"el-icon-plus",size:"medium"},on:{click:function(t){return e.addfrom("save")}}},[e._v("添加")])],1):r("el-col",{staticStyle:{display:"flex","align-items":"center",height:"100%"},attrs:{span:3}},["pmovie"===e.path?r("h4",[e._v("电影")]):"ptvseries"===e.path?r("h4",[e._v("电视剧")]):"pvariety"===e.path?r("h4",[e._v("综艺")]):r("h4",[e._v("搞笑视频")])]),r("el-col",{staticClass:"sort",attrs:{span:21}},[r("i",{staticClass:"el-icon-sort"}),r("span",{staticClass:"span-sort"},[e._v("排序方式")]),r("div",{staticClass:"select-sort"},e._l(e.sort,(function(t,a){return r("span",{key:a,class:["select-sort-span",{"select-sort-span-active":e.sortClass===a}],on:{click:function(r){return e.sortpro(a,t.type)}}},[e._v(e._s(t.title))])})),0)])],1),r("div",{staticClass:"list"},e._l(e.programlist,(function(t,a){return r("div",{key:t.id,staticClass:"list-block",on:{click:function(r){return e.goplay(t._id,t.hot)}}},[r("div",{staticClass:"proimg",on:{mouseover:function(t){return e.hovers(a)},mouseleave:function(t){return e.remove()}}},[r("div",{class:["hidearea",{"hidearea-hover":e.hover===a}]},[r("span",[e._v("导演："+e._s(t.director))]),r("span",[e._v("主演："+e._s(t.star))])]),r("img",{class:["proimage",{"proimage-hover":e.hover===a}],attrs:{src:"http://127.0.0.1:3000"+t.cover,alt:t.title}}),r("el-tag",{staticClass:"tag-new",attrs:{effect:"dark",type:a>2?"":"success",size:"mini"}},[e._v(e._s(0===a?"最新":"HD"))])],1),r("span",{staticClass:"list-span"},[e._v(e._s(t.title))]),e.status?r("div",{staticClass:"bottom-btn-ad"},[r("el-tooltip",{attrs:{content:"编辑",placement:"top",enterable:!1}},[r("el-button",{attrs:{icon:"el-icon-edit",circle:"",type:"primary",size:"small"},on:{click:function(r){return r.stopPropagation(),e.findById(t._id)}}})],1),r("el-tooltip",{attrs:{content:"删除",placement:"top",enterable:!1}},[r("el-button",{attrs:{icon:"el-icon-delete",circle:"",type:"danger",size:"small"},on:{click:function(r){return r.stopPropagation(),e.deleted(t._id,t.title)}}})],1),r("el-tooltip",{attrs:{content:"收藏",placement:"top",enterable:!1}},[r("el-button",{attrs:{icon:"el-icon-star-off",circle:"",size:"small",type:"warning"}})],1)],1):r("div",{staticClass:"bottom-btn"},[e._v(e._s(t.subtitle))])])})),0)],1)},s=[],n=(r("fb6a"),r("5530")),i=(r("96cf"),r("1da1")),o=r("caad"),c=r("2f62"),u={data:function(){return{program:{title:this.$route.path.substr(1),data:{bio:"",title:"",director:"",writer:"",star:"",type:"",area:"",language:"",date:"",time:"",cover:"",src:"",subtitle:"",banner:""}},dialogAdd:!1,rulesadd:{title:[{required:!0,message:"不能为空",trigger:"blur"}],director:[{required:!0,message:"不能为空",trigger:"blur"}],writer:[{required:!0,message:"不能为空",trigger:"blur"}],star:[{required:!0,message:"不能为空",trigger:"blur"}],type:[{required:!0,message:"不能为空",trigger:"blur"}],area:[{required:!0,message:"不能为空",trigger:"blur"}],language:[{required:!0,message:"不能为空",trigger:"blur"}],date:[{required:!0,message:"不能为空",trigger:"blur"}],time:[{required:!0,message:"不能为空",trigger:"blur"},{max:11,message:"长度不能大于 11 个字符",trigger:"blur"}],cover:[{required:!0,message:"不能为空",trigger:"blur"}]},queryinfo:{title:this.$route.path.substr(1),pagesize:12,pagenum:1,id:""},type:"",parent:this.$parent.$parent,sort:[{title:"最新",type:"new"},{title:"最热",type:"hot"},{title:"推荐",type:"recommend"}],sortClass:0,sta:null,videoid:"",hover:-1}},props:{programlist:{type:Array,defaults:[]}},created:function(){console.log(this.program.data.title)},methods:{addfrom:function(){this.$router.push({path:"/addprogram",query:{title:this.$route.path.substr(1)}}),this.type="save"},deleted:function(e,t){var r=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(o["a"])("/home/program",{title:r.program.title,id:e,stitle:t});case 2:s=a.sent,1===s&&r.parent.getprogramlist();case 4:case"end":return a.stop()}}),a)})))()},findById:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.$router.push({path:"/addprogram",query:{title:t.path,id:e}});case 1:case"end":return r.stop()}}),r)})))()},sortpro:function(e,t){this.sortClass=e,this.$store.commit("editsort",t),this.parent.getprogramlist()},hovers:function(e){this.hover=e},remove:function(){this.hover=-1},goplay:function(e,t){var r=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var s,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,r.$http.put("/home/program/hot",{id:e,hot:t});case 2:if(s=a.sent,n=s.data,1===n.code){a.next=6;break}return a.abrupt("return",r.$message.error("服务器出错，请稍后再试！！"));case 6:r.$router.push({path:"/detail",query:{id:e,title:r.path}});case 7:case"end":return a.stop()}}),a)})))()}},computed:Object(n["a"])({},Object(c["c"])(["status","userinfo"]),{path:function(){return this.$route.path.slice(1)}})},l=u,p=(r("3734"),r("2877")),d=Object(p["a"])(l,a,s,!1,null,"5c40c776",null);t["a"]=d.exports},"7e00":function(e,t,r){},af12:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[r("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),r("el-breadcrumb-item",[e._v("节目管理")]),r("el-breadcrumb-item",[e._v("电视剧类")])],1),r("el-card",[r("programlist",{attrs:{programlist:e.programlist}})],1)],1)},s=[],n=(r("fb6a"),r("b0c0"),r("96cf"),r("1da1")),i=r("5530"),o=r("3e52"),c=r("2f62"),u={data:function(){return{programlist:null,name:""}},components:{programlist:o["a"]},created:function(){this.getprogramlist()},methods:Object(i["a"])({},Object(c["b"])(["getlist"]),{getprogramlist:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.getlist({title:e.$route.path.slice(1),name:e.name});case 2:if(r=t.sent,a=r.data,1===a.code){t.next=6;break}return t.abrupt("return",e.$message.error("获取数据失败"));case 6:e.programlist=a.data;case 7:case"end":return t.stop()}}),t)})))()}})},l=u,p=r("2877"),d=Object(p["a"])(l,a,s,!1,null,null,null);t["default"]=d.exports},caad:function(e,t,r){"use strict";r.d(t,"b",(function(){return c})),r.d(t,"a",(function(){return u}));r("d3b7"),r("96cf");var a=r("1da1"),s=r("bc3a"),n=r.n(s),i=r("5c96");n.a.defaults.baseURL="http://127.0.0.1:3000";var o=n.a.create({baseURL:"http://127.0.0.1:3000",timeout:"5000"});o.interceptors.request.use((function(e){var t=sessionStorage.getItem("token");return e.headers.common["Authorization"]="Bearer "+t,e}));var c=function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,r){var a,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o({url:t,params:r});case 2:return a=e.sent,s=a.data,e.abrupt("return",s);case 5:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}(),u=function(e,t){return new Promise((function(r){i["MessageBox"].confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(a["a"])(regeneratorRuntime.mark((function a(){var s,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,n.a.delete(e,{params:t});case 2:if(s=a.sent,o=s.data,1===o.code){a.next=8;break}return a.abrupt("return",i["Message"].error({showClose:!0,duration:1500,message:o.msg}));case 8:if(100!==o.code){a.next=10;break}return a.abrupt("return",i["Message"].error({showClose:!0,duration:1500,message:o.msg}));case 10:return i["Message"].success({showClose:!0,duration:1500,message:"删除成功"}),a.abrupt("return",r(o.code));case 12:case"end":return a.stop()}}),a)})))).catch((function(){i["Message"].info({showClose:!0,duration:1500,message:"已取消"})}))}))}},fb6a:function(e,t,r){"use strict";var a=r("23e7"),s=r("861d"),n=r("e8b5"),i=r("23cb"),o=r("50c4"),c=r("fc6a"),u=r("8418"),l=r("b622"),p=r("1dde"),d=r("ae40"),m=p("slice"),g=d("slice",{ACCESSORS:!0,0:0,1:2}),h=l("species"),f=[].slice,b=Math.max;a({target:"Array",proto:!0,forced:!m||!g},{slice:function(e,t){var r,a,l,p=c(this),d=o(p.length),m=i(e,d),g=i(void 0===t?d:t,d);if(n(p)&&(r=p.constructor,"function"!=typeof r||r!==Array&&!n(r.prototype)?s(r)&&(r=r[h],null===r&&(r=void 0)):r=void 0,r===Array||void 0===r))return f.call(p,m,g);for(a=new(void 0===r?Array:r)(b(g-m,0)),l=0;m<g;m++,l++)m in p&&u(a,l,p[m]);return a.length=l,a}})}}]);
//# sourceMappingURL=chunk-ca728bbc.821e69c2.js.map