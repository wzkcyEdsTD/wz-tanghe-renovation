
<template>
  <div class="layerhub-wrapper">
    <div class="left-menu-wrapper" >
      <div class="switch-menu-wrapper">
        <div class="switch-menu-container">
          <span :class="{active: showMenu}" @click="switchMenu(true)">塘河简介</span>
          <span :class="{active: !showMenu}" @click="switchMenu(false)">资源目录</span>
        </div>
        <div class="switch-menu-decorate"></div>
      </div>
      <SourceTree ref="SourceTree" v-show="!leftOrRight" />
      <RightSummary v-show="leftOrRight" />
    </div>
    <div class="sign-wrapper" :style="{right: showLarge?'20%':'21%'}" v-if="showSign">
      <img src="/static/images/common/sign@2x.png">
    </div>
    <MapTool />
    <!-- <CalTool /> -->
  </div>
</template>

<script>
import RightSummary from"../summary/rightSummary/rightSummary";
import SourceTree from "./components/sourceTree";
import MapTool from "./components/mapTool";
import CalTool from "../commonFrame/calTool/calTools"

export default {
  name: "layerHub",
  components:{
    RightSummary,
    SourceTree,
    MapTool,
    // CalTool
  },
  data() {
    return {
      leftOrRight:true,
      showSign: true,
      showMenu: true,
    };
  },
  computed: {
  },
  created() {
  },
  methods: {
    switchMenu(bol) {
      this.leftOrRight = bol;
      this.showMenu = bol
      this.$parent.isTotalTarget = !this.showMenu;
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./layerHub.less");
</style>
