(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f11a8672"],{"0c23":function(e,t,r){e.exports=r.p+"img/close.3cc1bee2.png"},"2b14":function(e,t,r){},"419b":function(e,t,r){"use strict";r.r(t);var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[r("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),r("el-breadcrumb-item",[e._v("收费管理")]),r("el-breadcrumb-item",[e._v("用户费用")])],1),r("el-card",[e.time||e.price?r("el-alert",{attrs:{title:e.status?"您是管理员，可以随意！":"当前已看视频"+e.minute+"分钟"+e.second+"秒，您目前欠费"+e.expense+"元(RMB),请及时缴费!",type:"warning","show-icon":"",closable:!1}}):e._e(),e.programs?r("history",{attrs:{pro:e.programs,id:e.id}}):e._e()],1)],1)},n=[],a=r("5530"),i=(r("96cf"),r("1da1")),c=r("2f62"),o=r("caad"),u=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"block"},[e._m(0),e.programs?s("div",{staticClass:"program-list"},e._l(e.programs,(function(t,n){return s("div",{key:n,class:["program",{hidelist:e.hidelist===n}]},[s("div",{staticClass:"imgccover",on:{click:function(r){return e.goplay(t._id,t.path)}}},[s("img",{staticClass:"proimg",attrs:{src:"http://127.0.0.1:3000"+t.cover,alt:t.title}}),s("el-tag",{staticClass:"tag-new",attrs:{effect:"dark",type:n>2?"":"success",size:"mini"}},[e._v(e._s(0===n?"最新":"HD"))]),s("div",{staticClass:"rtop"},[s("img",{staticClass:"close-img",attrs:{src:r("0c23"),alt:""},on:{click:function(r){return r.stopPropagation(),e.remove(t._id,n)}}})])],1),s("span",{staticClass:"list-span"},[s("el-tag",{staticClass:"tag",attrs:{effect:"dark",type:n>2?"":"danger",size:"mini"}},[e._v(e._s(n+1))]),e._v(" "+e._s(t.title)+" ")],1)])})),0):s("div",{staticClass:"seen"},[e._v(e._s(this.status?"尊贵的管理员，您可以享受VIP免费服务！":"暂无观看记录"))])])},l=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"history"},[r("i",{staticClass:"el-icon-pie-chart"}),r("span",[e._v("观看历史")])])}],m=(r("4de4"),{data:function(){return{hidelist:-1,none:!1,programs:null}},created:function(){this.programs=this.pro},props:{pro:{type:Array,defaults:[]},id:{type:String}},methods:{remove:function(e,t){var r=this;return Object(i["a"])(regeneratorRuntime.mark((function s(){var n,a,i;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.next=2,r.$http.delete("/home/rehistory",{params:{_id:e,id:r.id}});case 2:n=s.sent,a=n.data,1===a.code&&(r.hidelist=t,i=t,setTimeout((function(){r.programs=r.programs.filter((function(e,t){return t!==i})),console.log(r.programs)}),1e3));case 5:case"end":return s.stop()}}),s)})))()},goplay:function(e,t){console.log(e,t),this.$router.push({path:"/detail",query:{id:e,title:t}})}},computed:Object(a["a"])({},Object(c["c"])(["status"]))}),p=m,d=(r("8bdd"),r("2877")),f=Object(d["a"])(p,u,l,!1,null,"82171026",null),g=f.exports,h={data:function(){return{minute:null,second:null,expense:null,username:"",programs:null,time:0,price:0}},components:{history:g},created:function(){this.username=sessionStorage.getItem("username"),this.getprograms()},methods:{computedata:function(){this.minute=parseInt(this.time/60),this.second=this.time-60*this.minute,this.expense=this.price/10},getprograms:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(o["b"])("/home/users",{username:e.username});case 2:r=t.sent,s=r.data,e.programs=s[0].program.reverse(),e.time=s[0].minutes,e.price=s[0].minute,e.computedata();case 8:case"end":return t.stop()}}),t)})))()}},computed:Object(a["a"])({},Object(c["c"])(["userinfo","status"]),{id:function(){return this.userinfo._id}})},b=h,v=Object(d["a"])(b,s,n,!1,null,"0fea8fd7",null);t["default"]=v.exports},"8bdd":function(e,t,r){"use strict";var s=r("2b14"),n=r.n(s);n.a},caad:function(e,t,r){"use strict";r.d(t,"b",(function(){return o})),r.d(t,"a",(function(){return u}));r("d3b7"),r("96cf");var s=r("1da1"),n=r("bc3a"),a=r.n(n),i=r("5c96");a.a.defaults.baseURL="http://127.0.0.1:3000";var c=a.a.create({baseURL:"http://127.0.0.1:3000",timeout:"5000"});c.interceptors.request.use((function(e){var t=sessionStorage.getItem("token");return e.headers.common["Authorization"]="Bearer "+t,e}));var o=function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t,r){var s,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c({url:t,params:r});case 2:return s=e.sent,n=s.data,e.abrupt("return",n);case 5:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}(),u=function(e,t){return new Promise((function(r){i["MessageBox"].confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(s["a"])(regeneratorRuntime.mark((function s(){var n,c;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.next=2,a.a.delete(e,{params:t});case 2:if(n=s.sent,c=n.data,1===c.code){s.next=8;break}return s.abrupt("return",i["Message"].error({showClose:!0,duration:1500,message:c.msg}));case 8:if(100!==c.code){s.next=10;break}return s.abrupt("return",i["Message"].error({showClose:!0,duration:1500,message:c.msg}));case 10:return i["Message"].success({showClose:!0,duration:1500,message:"删除成功"}),s.abrupt("return",r(c.code));case 12:case"end":return s.stop()}}),s)})))).catch((function(){i["Message"].info({showClose:!0,duration:1500,message:"已取消"})}))}))}}}]);
//# sourceMappingURL=chunk-f11a8672.34766892.js.map