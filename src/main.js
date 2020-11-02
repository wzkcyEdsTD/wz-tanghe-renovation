/*
 * @Author: eds
 * @Date: 2020-07-01 15:22:04
 * @LastEditTime: 2020-09-03 19:47:41
 * @LastEditors: eds
 * @Description:
 * @FilePath: \wz-city-culture-tour\src\main.js
 */
import "element-ui/lib/theme-chalk/index.css";
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import "./font/Digital-7Mono.css";
import "./font/YouSheBiaoTiHei.css";
import "./font/PingFang.css";
import "./font/DIN.css";
import "./font/DIN-Regular.css"
import * as filters from "./filters"; // 全局过滤器
import ElementUI from "element-ui";
import VueBus from "vue-bus";
import echarts from "echarts";
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
// import VueVideoPlayer from 'vue-video-player'
// import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'
// const hls =require("videojs-contrib-hls")

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
})
// Vue.use(VueVideoPlayer)
// Vue.use(hls)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
Vue.use(VueBus);
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
