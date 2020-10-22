
<template>
  <div class="layerhub-wrapper">
    <div class="layer-wrapper">
      <div class="hub-list">
        <div class="hub-item" :class="{selected: currentLayer=='yx'}" @mouseenter="currentMouse='yx'" @mouseleave="currentMouse=''">
          <img v-if="currentLayer=='yx'" src="./images/yx-sel2.png">
          <img v-else src="./images/yx-unsel2.png">
          <span>影像图</span>
        </div>
        <div class="hub-item" :class="{selected: currentLayer=='vector'}" @mouseenter="currentMouse='vector'" @mouseleave="currentMouse=''">
          <img v-if="currentLayer=='vector'" src="./images/vector-sel2.png">
          <img v-else src="./images/vector-unsel2.png">
          <span>矢量图</span>
        </div>
        <div class="hub-item" :class="{selected: currentLayer=='3d'}" @mouseenter="currentMouse='3d'" @mouseleave="currentMouse=''">
          <img v-if="currentLayer=='3d'" src="./images/3d-sel2.png">
          <img v-else src="./images/3d-unsel2.png">
          <span>三维图</span>
        </div>
      </div>
      <div class="box">
        <div class="sub-container" :style="{visibility: currentMouse=='yx' ? 'visible' : 'hidden'}" @mouseenter="currentMouse='yx'" @mouseleave="currentMouse=''">
          <div class="sub-item" :class="{selected: currentYear==item}"
          v-for="(item, index) in yearList" :key="index"
          @click="changeYear(item)">
            {{item}}
          </div>
        </div>
        <div class="sub-container" :style="{visibility: currentMouse=='vector' ? 'visible' : 'hidden'}" @mouseenter="currentMouse='vector'" @mouseleave="currentMouse=''">
          <div class="sub-item" :class="{selected: currentVector==item.value || item.selected}"
          v-for="(item, index) in vectorList" :key="index"
          @click="changeVector(item)">
            {{item.label}}
          </div>
        </div>
        <div class="sub-container" :style="{visibility: currentMouse=='3d' ? 'visible' : 'hidden'}" @mouseenter="currentMouse='3d'" @mouseleave="currentMouse=''">
          <div class="sub-item" :class="{selected: item.selected}"
            v-for="(item, index) in threeDList" :key="index"
            @click="change3d(item)">
              {{item.label}}
          </div>
        </div>
      </div>
    </div>
    <div :class="showLarge?'left-menu-wrapperda':'left-menu-wrapper'" >
      <div class="ulsda" v-if="showLarge">
        <div class="lefts">
          <RightSummary />
        </div>
        <div class="rig">
          <SourceTree />
        </div>
      </div>
      <div v-if="!showLarge">
        <div class="switch-menu-wrapper">
          <div class="switch-menu-container">
            <span :class="{active: !showMenu}" @click="switchMenu(false)">资源目录</span>
            <span :class="{active: showMenu}" @click="switchMenu(true)">塘河简介</span>
          </div>
          <div class="switch-menu-decorate"></div>
        </div>
        <SourceTree v-if="!leftOrRight" />
        <RightSummary v-if="leftOrRight" />
      </div>
    </div>
    <div class="sign-wrapper" :style="{right: showLarge?'85vh':'52vh'}" v-if="showSign">
      <img src="/static/images/common/sign@2x.png">
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
// import { treeDrawTool } from "./TreeDrawTool";
// import { getIserverFields } from "api/iServerAPI";
import RightSummary from"../summary/rightSummary/rightSummary";
import SourceTree from "./components/sourceTree"
// import {
//   CESIUM_TREE_OPTION,
// } from "config/server/tangheTreeOption";
// const Cesium = window.Cesium;

export default {
  name: "layerHub",
  components:{
    RightSummary,
    SourceTree
  },
  data() {
    return {
      leftOrRight:false,
      showLarge:window.showLarge,
      showHub: false,
      currentMouse: '',
      currentLayer: 'vector',
      yearList: [2018, 2019],
      currentYear: '',
      // vectorList: ['白色', '黑色'],
      vectorList: [{
        label: '日景',
        value: 'white'
      }, {
        label: '夜景',
        value: 'black'
      }, {
        label: '手绘',
        value: 'handdrawn',
        selected: false
      }],
      currentVector: 'white',
      threeDList: [{
        label: '粗模',
        value: 'baimo',
        selected: false
      }, {
        label: '精模',
        value: 'jingmo',
        selected: false
      }],
      current3d: '',
      // currentTarget: '',
      showSign: true,
      // showBaimo: false,
      showMenu: false,
      // data: CESIUM_TREE_OPTION,
    };
  },
  computed: {
  },
  created() {
    this.eventRegsiter()

  },
  // mounted() {
  //   this.$refs.tree.setCheckedKeys(['十二景', '断点', '绿道']);
  // },
  methods: {
    // ...mapActions("map", ["setSourceMap", "setCurrentource", "setSejList"]),
    eventRegsiter() {
    },

    // toggleLayer(type) {
    //   console.log('toggleLayer', type)
    //   this.currentLayer = type
    // },
    // toggleBaimo() {
    //   this.showBaimo = !this.showBaimo
    //   this.$bus.$emit("cesium-3d-switch", { value: this.showBaimo });
    // },
    switchMenu(bol) {
      this.leftOrRight = bol;
      this.showMenu = bol
      this.$parent.isTotalTarget = !this.showMenu;
    },
    changeYear(item) {
      this.currentVector = ''
      this.currentYear = item
      this.currentLayer = 'yx'
    },
    changeVector(item) {
      this.currentYear = ''
      this.currentLayer = 'vector'
      if (item.value == 'handdrawn') {
        item.selected = !item.selected
        this.$parent.switchHanddrawn(item.selected);
      } else {
        this.currentVector = item.value
      }
    },
    change3d(item) {
      item.selected = !item.selected
      this.current3d = item.value
      this.$bus.$emit("cesium-3d-switch", { type: item.value , value: item.selected });
    },
  },
  watch: {
    currentYear(val) {
      if (val) {
        this.$bus.$emit("cesium-layer-switch", { type: 'yx', value: val });
      }
    },
    currentVector(val) {
      if (val) {
        this.$bus.$emit("cesium-layer-switch", { type: 'vector', value: val });
      }
    },
  },
};
</script>

<style lang="less">
@import url("./layerHub.less");
</style>
