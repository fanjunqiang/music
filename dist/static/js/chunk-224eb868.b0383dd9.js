(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-224eb868"],{"0b66":function(t,i,e){"use strict";e.r(i);var s=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"hot"},[s("div",{staticClass:"hot-head"},[s("div",{staticClass:"top-words"}),s("div",{staticClass:"mid"}),s("div",{staticClass:"box1"}),t.updataTime?s("div",{staticClass:"updatatime"},[t._v(" 更新时间:"+t._s(t._f("filterTime")(t.updataTime,"m月d日"))+" ")]):t._e(),s("div",{staticClass:"all-list",on:{click:function(i){return t.$emit("listall",t.music1)}}},[s("img",{attrs:{src:e("0d08"),alt:""}})])]),t.music1.length<1?s("my-load"):t._e(),s("ul",t._l(t.music1,(function(i,e){return s("li",{key:i.id},[s("div",{staticClass:"number",style:{color:e+1<=3?"red":"#999"}},[t._v(" "+t._s(t._f("filterIndex")(e+1))+" ")]),s("music-list",{staticClass:"number-song",attrs:{songIfa:i},on:{play:function(i){return t.$emit("play",i)}}})],1)})),0),t.music1.length>=1?s("div",{ref:"foot",staticClass:"dianji",on:{click:t.dianji}},[t._v(" "+t._s(t.page>=10?"到底了哟":"点击加载")+" ")]):t._e()],1)},a=[],n=e("1da1"),r=(e("96cf"),e("fb6a"),e("f382")),c=e("4618"),o={data:function(){return{music:[],updataTime:0,page:1,br:[],music1:[]}},methods:{hotMusic:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function i(){var e,s;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.next=2,t.axios.get("/playlist/detail?id=3778678");case 2:for(e=i.sent,t.music=e.data.playlist.tracks,t.br=e.data.privileges,s=0;s<t.music.length;s++)t.music[s]["maxbr"]=t.br[s].maxbr;t.music1=t.music.slice(0,20*t.page),t.updataTime=e.data.playlist.trackUpdateTime;case 8:case"end":return i.stop()}}),i)})))()},dianji:function(){this.page<10&&(this.page++,this.music1=this.music.slice(0,20*this.page))},scrollbar:function(){var t=document.documentElement||document.body,i=t.scrollTop+t.clientHeight,e=this.$refs.foot.offsetTop,s=this;i>=e+21&&s.dianji()}},beforeRouteEnter:function(t,i,e){e((function(t){window.addEventListener("scroll",t.scrollbar)}))},beforeRouteLeave:function(t,i,e){window.removeEventListener("scroll",this.scrollbar),e()},created:function(){this.hotMusic()},components:{MusicList:r["a"],MyLoad:c["a"]}},l=o,u=(e("8bb4"),e("2877")),d=Object(u["a"])(l,s,a,!1,null,"c0225ce0",null);i["default"]=d.exports},"0d08":function(t,i,e){t.exports=e.p+"static/img/danlieliebiao.ac9991e6.svg"},"8bb4":function(t,i,e){"use strict";e("e424")},"8e27":function(t,i,e){},e424:function(t,i,e){},f382:function(t,i,e){"use strict";var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{attrs:{id:"musics"}},[e("ul",[e("li",{on:{click:function(i){return t.play(t.songIfa)}}},[e("div",[e("div",{staticClass:"left"},[e("div",[t._v(t._s(t.songIfa.name)),t._l(t.songIfa.alia,(function(i){return e("span",{key:i.id,style:{color:"#999"}},[t._v("("+t._s(i)+")")])}))],2),e("div",[(t.songIfa.maxbr||t.songIfa.song.privilege.maxbr)>32e4?e("span",{staticClass:"sq"}):t._e(),t._l(t.songIfa.ar||t.songIfa.song.artists,(function(i,s){return e("span",{key:i.id,staticClass:"right-art"},[s%2==1?e("span",[t._v("-")]):t._e(),t._v(" "+t._s(i.name))])}))],2)])]),t._m(0)])])])},a=[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"right"},[e("span")])}],n={props:{songIfa:Object||Array},data:function(){return{bb:!0}},methods:{play:function(t){this.$emit("play",t)}}},r=n,c=(e("fd0f"),e("2877")),o=Object(c["a"])(r,s,a,!1,null,"b7d20e5a",null);i["a"]=o.exports},fb6a:function(t,i,e){"use strict";var s=e("23e7"),a=e("da84"),n=e("e8b5"),r=e("68ee"),c=e("861d"),o=e("23cb"),l=e("07fa"),u=e("fc6a"),d=e("8418"),f=e("b622"),m=e("1dde"),p=e("f36a"),v=m("slice"),b=f("species"),g=a.Array,h=Math.max;s({target:"Array",proto:!0,forced:!v},{slice:function(t,i){var e,s,a,f=u(this),m=l(f),v=o(t,m),_=o(void 0===i?m:i,m);if(n(f)&&(e=f.constructor,r(e)&&(e===g||n(e.prototype))?e=void 0:c(e)&&(e=e[b],null===e&&(e=void 0)),e===g||void 0===e))return p(f,v,_);for(s=new(void 0===e?g:e)(h(_-v,0)),a=0;v<_;v++,a++)v in f&&d(s,a,f[v]);return s.length=a,s}})},fd0f:function(t,i,e){"use strict";e("8e27")}}]);
//# sourceMappingURL=chunk-224eb868.b0383dd9.js.map