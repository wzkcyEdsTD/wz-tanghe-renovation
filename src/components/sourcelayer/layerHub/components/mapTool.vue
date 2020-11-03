<template>
  <div class="map-tool" :style="{right: showLarge?'20%':'21%'}">
    <div class="box">
      <div class="sub-container" :style="{visibility: currentMouse=='yx' ? 'visible' : 'hidden'}" @mouseenter="currentMouse='yx'" @mouseleave="currentMouse=''">
        <div class="sub-item" :class="{selected: currentYear==item}" :style="{'padding-top': showLarge ? '1.1vh' : '0.9vh'}"
             v-for="(item, index) in yearList" :key="index"
             @click="changeYear(item)">
          {{item}}
        </div>
      </div>
      <div class="sub-container" :style="{visibility: currentMouse=='vector' ? 'visible' : 'hidden'}" @mouseenter="currentMouse='vector'" @mouseleave="currentMouse=''">
        <div class="sub-item" :style="{'padding-top': showLarge ? '1.1vh' : '0.9vh'}" :class="{selected: currentVector==item.value || item.selected}"
             v-for="(item, index) in vectorList" :key="index"
             @click="changeVector(item)">
          {{item.label}}
        </div>
      </div>
      <div class="sub-container" :style="{visibility: currentMouse=='3d' ? 'visible' : 'hidden'}" @mouseenter="currentMouse='3d'" @mouseleave="currentMouse=''">
        <div class="sub-item" :style="{'padding-top': showLarge ? '1.1vh' : '0.9vh'}" :class="{selected: item.selected}"
             v-for="(item, index) in threeDList" :key="index"
             @click="change3d(item)">
          {{item.label}}
        </div>
      </div>
      <div class="sub-container" :style="{visibility: currentMouse=='tool' ? 'visible' : 'hidden'}" @mouseenter="currentMouse='tool'" @mouseleave="currentMouse=''">
        <div class="sub-item"  :style="{'padding-top': showLarge ? '1.1vh' : '0.9vh'}" :class="{selected: currentTool==item}"
             v-for="(item, index) in toolList" :key="index"
             @click="changeTool(item)">
          {{item.label}}
        </div>
      </div>
    </div>
    <div class="hub-list">
      <div class="hub-item" :class="{selected: currentLayer=='yx'}" @mouseenter="currentMouse='yx'" @mouseleave="currentMouse=''">
        <img v-if="currentLayer=='yx'" src="../images/yx-sel2.png" class="otherIcon">
        <img v-else src="../images/yx-unsel2.png" class="otherIcon">
        <span>影像图</span>
      </div>
      <div class="hub-item" :class="{selected: currentLayer=='vector'}" @mouseenter="currentMouse='vector'" @mouseleave="currentMouse=''">
        <img v-if="currentLayer=='vector'" src="../images/vector-sel2.png" class="otherIcon">
        <img v-else src="../images/vector-unsel2.png" class="otherIcon">
        <span>矢量图</span>
      </div>
      <div class="hub-item" :class="{selected: currentLayer=='3d'}" @mouseenter="currentMouse='3d'" @mouseleave="currentMouse=''">
        <img v-if="currentLayer=='3d'" src="../images/3d-sel2.png" class="otherIcon">
        <img v-else src="../images/3d-unsel2.png" class="otherIcon">
        <span>三维图</span>
      </div>
      <div class="hub-item" :class="{selected: tools=='tool'}" @mouseenter="currentMouse='tool'" @mouseleave="currentMouse=''">
        <img v-if="tools=='tool'" src="../images/tool-sel.png" class="toolIcon">
        <img v-else src="../images/tool-unsel.png" class="toolIcon">
        <span style="padding-left: 0.5vh">工具</span>
      </div>
    </div>
  </div>
</template>

<script>
import CalTools from "../../commonFrame/calTool/calTools";
export default {
  name: "mapTool",
  components: {CalTools},
  data() {
    return {
      showLarge:window.showLarge,
      currentMouse: '',
      currentLayer: 'vector',
      yearList: [2018, 2019],
      currentYear: '',
      currentTool:'',
      tools:"",
      toolList:[{
        label: '测距',
        value: 'ju',
        selected: false
      },{
        label: '测面',
        value: 'mian',
        selected: false
      },{
        label: '测高',
        value: 'gao',
        selected: false
      },{
        label: '清除',
        value: 'clear',
        selected: false
      }],
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
    }
  },
  methods: {
    changeYear(item) {
      this.currentVector = ''
      this.currentYear = item
      this.currentLayer = 'yx'
    },
    changeTool(item) {
      this.tools = 'tool'
      this.currentYear = ''
      this.currentVector = ''
      this.currentTool = item;
      if (item.value == 'ju'){
        this.$parent.$refs.caltool.gaugeDistance();
      }else if (item.value == 'mian'){
        this.$parent.$refs.caltool.gaugeArea();
      }else if (item.value == 'gao'){
        this.$parent.$refs.caltool.gaugeHeight();
      }else if (item.value == 'clear'){
        this.currentTool = '';
        this.tools = '';
        this.$parent.$refs.caltool.clearGauge();
      }
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
      this.currentLayer = '3d'
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
}
</script>

<style lang="less" scoped>
.map-tool {
  z-index: 999;
  position: absolute;
  top: 9vh;
  /*width: 11vh;*/
  display: flex;
  /*height: 10vh;*/
  // right: 25%;
  text-align: center;
  .hub-list {
    display: flex;
    flex-direction: column;
    /*height: 100%;*/
    background-color: rgba(4,13,51,0.8);
    .toolIcon{
      width:2.7vh;
      padding-left: 0.5vh
    }
    .otherIcon{
      width:3vh;
    }
    .hub-item {
      display: flex;
      align-items: center;
      width: 11vh;
      padding: 0.5vh 1vh;
      border-bottom: 0.1vh solid #2283FC;
      font-family: PingFang;
      color: #2283FC;
      height: 3.5vh;
      img {
        padding-right: 0.3vh;
      }
      &.selected {
        color: #69FEE5;
        background-color: rgba(0, 206, 136, 0.4);
        border: 0.1vh solid;
      }
      &:last-child {
        border: none;
      }
    }
  }
  .box {
    display: flex;
    flex-direction: column;

    .sub-container {
      /*width: 11vh;*/
      height: 100%;
      background-color: rgba(4,13,51,0.8);
      color: #2283FC;
      display: flex;
      .sub-item {
        /*padding-bottom: 0.3vh;*/
        padding-left: 0.5vh;
        padding-right: 0.5vh;
        padding-top: 0.9vh;
        flex: 1;
        border-right: 1px solid #2283FC;
        cursor: pointer;
        &.selected {
          color: #69FEE5;
          background-color: rgba(0, 206, 136, 0.4);
        }
        /*&:last-child {*/
        /*  border: none;*/
        /*}*/
      }
    }
  }
}
</style>
