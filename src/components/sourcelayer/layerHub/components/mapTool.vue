<template>
  <div class="map-tool" :style="{right: showLarge?'20%':'21%'}">
    <div class="hub-list">
      <div class="hub-item" :class="{selected: currentLayer=='yx'}" @mouseenter="currentMouse='yx'" @mouseleave="currentMouse=''">
        <img v-if="currentLayer=='yx'" src="../images/yx-sel2.png">
        <img v-else src="../images/yx-unsel2.png">
        <span>影像图</span>
      </div>
      <div class="hub-item" :class="{selected: currentLayer=='vector'}" @mouseenter="currentMouse='vector'" @mouseleave="currentMouse=''">
        <img v-if="currentLayer=='vector'" src="../images/vector-sel2.png">
        <img v-else src="../images/vector-unsel2.png">
        <span>矢量图</span>
      </div>
      <div class="hub-item" :class="{selected: currentLayer=='3d'}" @mouseenter="currentMouse='3d'" @mouseleave="currentMouse=''">
        <img v-if="currentLayer=='3d'" src="../images/3d-sel2.png">
        <img v-else src="../images/3d-unsel2.png">
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
</template>

<script>
export default {
  name: "mapTool",
  data() {
    return {
      showLarge:window.showLarge,
      currentMouse: '',
      currentLayer: 'vector',
      yearList: [2018, 2019],
      currentYear: '',
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
}
</script>

<style lang="less" scoped>
.map-tool {
  z-index: 999;
  position: absolute;
  top: 9vh;
  // right: 25%;
  text-align: center;
  .hub-list {
    display: flex;
    background-color: rgba(4,13,51,0.8);
    .hub-item {
      display: flex;
      align-items: center;
      width: 11vh;
      padding: 0.5vh 1vh;
      border-right: 0.1vh solid #2283FC;
      font-family: PingFang;
      color: #2283FC;
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
    .sub-container {
      width: 11vh;
      height: 100%;
      background-color: rgba(4,13,51,0.8);
      color: #2283FC;
      .sub-item {
        padding: 0.3vh;
        border-bottom: 1px solid #2283FC;
        cursor: pointer;
        &.selected {
          color: #69FEE5;
          background-color: rgba(0, 206, 136, 0.4);
        }
        &:last-child {
          border: none;
        }
      }
    }
  }
}
</style>