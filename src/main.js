import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './assets/reset.css'
import 'animate.css';
Vue.config.productionTip = false;
Vue.filter("filterIndex",(n)=>{
    return n < 10 ? "0" + n : n;
  });
// 全局过滤器，转换数量单位，万
Vue.filter("people",(num)=> {
    return num>=100000?(num / 10000).toFixed(1) + "万":num;
  });

// 全局过滤器，转换时间戳
Vue.filter("filterTime",(value,formatStr='YYYY年mm月dd日 H时M分s秒')=>{
let date=new Date(value);
let date1=null;
if(date){
  date1={
    Y:date.getFullYear(),
    m:date.getMonth()+1,
    d:date.getDate(),
    H:date.getHours(),
    M:date.getMinutes(),
    s:date.getSeconds()
  };
  for(let key in date1){
    let reg=new RegExp(`${key}+`,"g");
    let v=date1[key];
    v=v<10?"0"+v:v;
    formatStr=formatStr.replace(reg,v);
  }
  return formatStr;
}
return value;
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
