<template>
  <div class="map-tool" :style="{right: currentPage=='sourcelayer'?'22%':'24%'}">
    <div class="box">
      <div class="sub-container" :class="{light: currentVector=='black'}" :style="{visibility: currentMouse=='yx' ? 'visible' : 'hidden'}" @mouseenter="currentMouse='yx'" @mouseleave="currentMouse=''">
        <div class="sub-item" :class="{selected: currentYear==item}" :style="{'padding-top': showLarge ? '1.1vh' : '0.9vh'}"
             v-for="(item, index) in yearList" :key="index"
             @click="changeYear(item)">
          {{item}}
        </div>
      </div>
      <div class="sub-container" :class="{light: currentVector=='black'}" :style="{visibility: currentMouse=='vector' ? 'visible' : 'hidden'}" @mouseenter="currentMouse='vector'" @mouseleave="currentMouse=''">
        <div class="sub-item" :style="{'padding-top': showLarge ? '1.1vh' : '0.9vh'}" :class="{selected: currentVector==item.value || item.selected}"
             v-for="(item, index) in vectorList" :key="index"
             @click="changeVector(item)">
          {{item.label}}
        </div>
      </div>
      <div class="sub-container" :class="{light: currentVector=='black'}" :style="{visibility: currentMouse=='3d' ? 'visible' : 'hidden'}" @mouseenter="currentMouse='3d'" @mouseleave="currentMouse=''">
        <div class="sub-item" :style="{'padding-top': showLarge ? '1.1vh' : '0.9vh'}" :class="{selected: item.selected}"
             v-for="(item, index) in threeDList" :key="index"
             @click="change3d(item)">
          {{item.label}}
        </div>
      </div>
      <div class="sub-container" :class="{light: currentVector=='black'}" :style="{visibility: currentMouse=='tool' ? 'visible' : 'hidden'}" @mouseenter="currentMouse='tool'" @mouseleave="currentMouse=''">
        <div class="sub-item"  :style="{'padding-top': showLarge ? '1.1vh' : '0.9vh'}" :class="{selected: currentTool==item}"
             v-for="(item, index) in toolList" :key="index"
             @click="changeTool(item)">
          {{item.label}}
        </div>
      </div>
    </div>
    <div class="hub-list light" v-if="currentVector=='black'">
      <div class="hub-item light" :class="{selected: currentLayer=='yx'}" @mouseenter="currentMouse='yx'" @mouseleave="currentMouse=''">
        <img v-if="currentLayer=='yx'" src="../images/yx-sel2.png" class="otherIcon">
        <img v-else src="../images/yx-unsel.png" class="otherIcon">
        <span>影像图</span>
      </div>
      <div class="hub-item light" :class="{selected: currentLayer=='vector'}" @mouseenter="currentMouse='vector'" @mouseleave="currentMouse=''">
        <img v-if="currentLayer=='vector'" src="../images/vector-sel2.png" class="otherIcon">
        <img v-else src="../images/vector-unsel.png" class="otherIcon">
        <span>矢量图</span>
      </div>
      <div class="hub-item light" :class="{selected: is3D}" @mouseenter="currentMouse='3d'" @mouseleave="currentMouse=''">
        <img v-if="is3D" src="../images/3d-sel2.png" class="otherIcon">
        <img v-else src="../images/3d-unsel.png" class="otherIcon">
        <span>三维图</span>
      </div>
      <div class="hub-item light" :class="{selected: isTool}" @mouseenter="currentMouse='tool'" @mouseleave="currentMouse=''">
        <img v-if="isTool" src="../images/tool-sel2.png" class="toolIcon">
        <img v-else src="../images/tool-unsel.png" class="toolIcon">
        <span style="padding-left: 0.5vh">工具</span>
      </div>
    </div>
    <div class="hub-list" v-else>
      <div class="hub-item" :class="{selected: currentLayer=='yx'}" @mouseenter="currentMouse='yx'" @mouseleave="currentMouse=''">
        <img v-if="currentLayer=='yx'" src="../images/yx-sel.png" class="otherIcon">
        <img v-else src="../images/yx-unsel.png" class="otherIcon">
        <span>影像图</span>
      </div>
      <div class="hub-item" :class="{selected: currentLayer=='vector'}" @mouseenter="currentMouse='vector'" @mouseleave="currentMouse=''">
        <img v-if="currentLayer=='vector'" src="../images/vector-sel.png" class="otherIcon">
        <img v-else src="../images/vector-unsel.png" class="otherIcon">
        <span>矢量图</span>
      </div>
      <div class="hub-item" :class="{selected: is3D}" @mouseenter="currentMouse='3d'" @mouseleave="currentMouse=''">
        <img v-if="is3D" src="../images/3d-sel.png" class="otherIcon">
        <img v-else src="../images/3d-unsel.png" class="otherIcon">
        <span>三维图</span>
      </div>
      <div class="hub-item" :class="{selected: isTool}" @mouseenter="currentMouse='tool'" @mouseleave="currentMouse=''">
        <img v-if="isTool" src="../images/tool-sel.png" class="toolIcon">
        <img v-else src="../images/tool-unsel.png" class="toolIcon">
        <span style="padding-left: 0.5vh">工具</span>
      </div>
    </div>
    <calTools ref="tools" v-show="false"/>
  </div>
</template>

<script>
  import calTools from "../../commonFrame/calTool/calTools";
export default {
  name: "mapTool",
  components: {calTools},
  data() {
    return {
      showLarge:window.showLarge,
      currentMouse: '',
      currentLayer: 'vector',
      yearList: [2018, 2019],
      currentYear: '',
      currentTool:'',
      isTool: false,
      is3D: false,
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
  computed: {
    currentPage () {
      return this.$route.name
    }
  },
  methods: {
    changeYear(item) {
      this.currentVector = ''
      this.currentYear = item
      this.currentLayer = 'yx'
    },
    changeTool(item) {
      this.isTool = true
      // this.currentYear = ''
      // this.currentVector = ''
      this.currentTool = item;
      if (item.value == 'ju'){
        this.$refs.tools.gaugeDistance();
      }else if (item.value == 'mian'){
        this.$refs.tools.gaugeArea();
      }else if (item.value == 'gao'){
        this.$refs.tools.gaugeHeight();
      }else if (item.value == 'clear'){
        this.currentTool = '';
        this.isTool = false;
        this.$refs.tools.clearGauge();
      }
    },
    changeVector(item) {
      this.currentYear = ''
      this.currentLayer = 'vector'
      // debugger;
      if (item.value == 'handdrawn') {
        item.selected = !item.selected
        this.$parent.$parent.switchHanddrawn(item.selected);
      } else {
        this.currentVector = item.value
      }
    },
    change3d(item) {
      // this.currentLayer = '3d'
      item.selected = !item.selected
      item.selected ? this.is3D = true : this.is3D = false
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
  display: flex;
  text-align: center;
  .hub-list {
    display: flex;
    flex-direction: column;
    background-color: rgba(4,13,51,0.8);
    &.light {
      background-color: #E2F6FF;
    }
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
      color: #2283FC;
      height: 3.5vh;
      img {
        padding-right: 0.3vh;
      }
      &.light {
        &.selected {
          color: #FFFFFF;
          background-color: #2283FC;
        }
      }
      &.selected {
        color: #69FEE5;
        background-color: rgba(0, 206, 136, 0.4);
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
      height: 100%;
      background-color: rgba(4,13,51,0.8);
      color: #2283FC;
      display: flex;
      .sub-item {
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
      }
      &.light {
        background-color: #E2F6FF;
        .sub-item {
          &.selected {
            color: #FFFFFF;
            background-color: #2283FC;
          }
        }
      }
    }
  }
}
</style>
