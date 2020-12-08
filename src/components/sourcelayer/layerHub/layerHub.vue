
<template>
  <div class="layerhub-wrapper">
    <div class="left-wrapper" >
      <div class="switch-menu-wrapper">
        <div class="switch-menu-container">
          <span :class="{active: selected=='synopsis'}" @click="switchMenu('synopsis')">塘河简介</span>
          <span :class="{active: selected=='source'}" @click="switchMenu('source')">资源目录</span>
        </div>
        <div class="switch-menu-decorate"></div>
      </div>
      <SourceTree ref="SourceTree" v-show="selected=='source'" />
      <Synopsis v-show="selected=='synopsis'" />
    </div>
    <!-- <div class="right-wrapper">
      <div class="box">
        <div class="buttonpd" :class="{active: currentType=='summary'}" @click="currentType='summary'">
          <div class="tp">
            <img src="./images/组合.png" alt="" v-if="currentType=='summary'" class="tupianxuanzhong"/>
            <img src="./images/button.png" alt="" v-if="currentType=='source'"   class="tupian"/>
            <span class="button">总览</span>
          </div>
        </div>
        <div class="buttonpd" :class="{active: currentType=='source'}" @click="currentType='source'">
          <div class="tp">
            <img src="./images/组合.png" alt="" v-if="currentType=='source'" class="tupianxuanzhong"/>
            <img src="./images/button.png" alt="" v-if="currentType=='summary'" class="tupian"/>
            <span class="button">资源</span>
          </div>
        </div>
      </div>
      <img src="./images/switch-decorate.png" class="zhuangshi"/>
      <Summary v-show="currentType == 'summary'" />
      <Source v-show="currentType == 'source'" />
    </div> -->
    <div class="sign-wrapper" :style="{right: showLarge?'22%':'22%'}" v-if="showSign">
      <img src="/static/images/common/sign@2x.png">
    </div>
    <MapTool />
  </div>
</template>

<script>
import Synopsis from "./components/synopsis";
import SourceTree from "./components/sourceTree";
import MapTool from "./components/mapTool";
import Source from "./components/source";
import Summary from "./components/summary"

export default {
  name: "layerHub",
  components:{
    Synopsis,
    SourceTree,
    MapTool,
    Summary,
    Source,
  },
  data() {
    return {
      showLarge:window.showLarge,
      selected: 'synopsis',
      currentType: 'summary',
      showSign: true,
    };
  },
  computed: {
  },
  created() {
  },
  methods: {
    switchMenu(value) {
      this.selected = value;
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./layerHub.less");
</style>
