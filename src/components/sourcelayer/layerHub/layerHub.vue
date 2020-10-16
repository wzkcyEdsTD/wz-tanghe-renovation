
<template>
  <div class="layerhub-wrapper">
    <!-- <div class="bottom-wrapper">
      <div class="show-btn" v-show="!showHub">
        <img src="./images/show-btn2.png" @click="showHub = true">
      </div>
      <div class="hub-container" v-show="showHub">
        <div class="hide-btn" @click="showHub = false">
          <img src="./images/hide-btn.png">
        </div>
        <div class="layers-container">
          <div class="layer" @click="currentLayer = 'vector'">
            <img v-if="currentLayer=='vector'" src="./images/vector-sel.png">
            <img v-else src="./images/vector-unsel.png">
          </div>
          <div class="layer" @click="currentLayer = 'yx'">
            <img v-if="currentLayer=='yx'" src="./images/yx-sel.png">
            <img v-else src="./images/yx-unsel.png">
          </div>
          <div class="layer" @click="currentLayer = '3d'">
            <img v-if="currentLayer=='3d'" src="./images/3d-sel.png">
            <img v-else src="./images/3d-unsel.png">
          </div>
          <div class="layer" @click="toggleMenu">
            <img v-if="showMenu" src="./images/menu-sel.png">
            <img v-else src="./images/menu-unsel.png">
          </div>
        </div>
        <div class="sub-container" v-show="currentLayer=='yx'">
          <div class="sub-item" :class="{selected: currentYear==item}"
          v-for="(item, index) in yearList" :key="index"
          @click="currentYear = item">
            {{item}}
          </div>
        </div>
        <div class="sub-container" v-show="currentLayer=='vector'">
          <div class="sub-item" :class="{selected: currentVector==item.value || item.selected}"
          v-for="(item, index) in vectorList" :key="index"
          @click="changeVector(item)">
            {{item.label}}
          </div>
        </div>
        <div class="sub-container" v-show="currentLayer=='3d'">
          <div class="sub-item" :class="{selected: current3d==item.value}"
          v-for="(item, index) in threeDList" :key="index"
          @click="change3d(item)">
            {{item.label}}
          </div>
        </div>
      </div>
    </div> -->
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
    <div class="switch-menu-wrapper">
      <div class="switch-menu-container" v-if="!showLarge">
        <span :class="{active: !showMenu}" @click="switchMenu(false)">资源目录</span>
        <span :class="{active: showMenu}" @click="switchMenu(true)">塘河简介</span>
      </div>
      <div class="switch-menu-decorate"></div>
    </div>
    <div :class="showLarge?'left-menu-wrapperda':'left-menu-wrapper'" >
      <div :class="showLarge?'ssjda2':''">
        <div class="ulsda" v-if="showLarge">
          <div class="lefts">
            <RightSummary ></RightSummary>
          </div>
          <div class="rig">
            <div class="zsj">
              <div class="title-wrapper">
                <span class="pre"></span>
                <span class="titleda">资源目录</span>
              </div>
              <div class="ssjda">
                <div class="tree-container">
                  <el-tree
                    ref="tree"
                    :data="data"
                    show-checkbox
                    node-key="id"
                    :filter-node-method="filterNode"
                    default-expand-all
                    @check-change="nodeCheckChange"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!showLarge">
          <div v-if="!leftOrRight">
            <div class="title-wrapper">
              <span class="pre"></span>
              <span class="title">资源目录</span>
            </div>
            <div class="tree-container">
              <el-tree
                ref="tree"
                :data="data"
                show-checkbox
                node-key="id"
                :filter-node-method="filterNode"
                default-expand-all
                @check-change="nodeCheckChange"
              />
            </div>
          </div>
          <div v-if="leftOrRight">
            <div class="gdkd">
              <RightSummary ></RightSummary>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sign-wrapper" v-if="showSign">
      <img src="/static/images/common/sign@2x.png">
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { treeDrawTool } from "./TreeDrawTool";
import { getIserverFields } from "api/iServerAPI";
import RightSummary from"../summary/rightSummary/rightSummary";
import {
  // TARGET_SOURCE,
  CESIUM_TREE_OPTION,
} from "config/server/tangheTreeOption";
const Cesium = window.Cesium;

export default {
  name: "layerHub",
  components:{
    RightSummary,
  },
  data() {
    return {
      leftOrRight:false,
      screenWidth: document.body.clientWidth,
      screeHeight: document.body.clientHeight,
      showLarge:false,
      // TARGET_SOURCE,
      tileLayers: {},
      saveDataMap: {},
      showHub: false,
      currentMouse: '',
      currentLayer: 'yx',
      yearList: [2018, 2019],
      currentYear: 2019,
      // vectorList: ['白色', '黑色'],
      vectorList: [{
        label: '白色',
        value: 'white'
      }, {
        label: '黑色',
        value: 'black'
      }, {
        label: '手绘',
        value: 'handdrawn',
        selected: false
      }],
      currentVector: '',
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
      showSign: false,
      // showBaimo: false,
      showMenu: false,
      showLvdao: false,
      data: CESIUM_TREE_OPTION,
    };
  },
  computed: {
  },
  created() {
    this.eventRegsiter()
    this.getKuanGao();
  },
  mounted() {
    this.$refs.tree.setCheckedKeys(['十二景', '断点', '绿道']);
  },
  methods: {
    ...mapActions("map", ["setSourceMap", "setCurrentource", "setSejList"]),
    eventRegsiter() {
      // this.$bus.$off("cesium-targetChange");
      // this.$bus.$on("cesium-targetChange", ({target}) => {
      //   console.log("target", target);
      //   // this.currentTarget = target
      //   this.targetChange(target)
      // });
    },
    getKuanGao(){
      //4320*1280
      console.log(this.screenWidth);
      if(this.screenWidth>4000&this.screeHeight>1000){
        this.showLarge = true;
      }else {
        this.showLarge = false;
      }
    },
    /**
     * POI fetch
     * @param {object} node
     */
    getPOIPickedFeature(node, fn) {
      const { newdataset, url } = node;
      var getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams;
      getFeatureParam = new SuperMap.REST.FilterParameter({
        attributeFilter: `SMID <= 1000`,
      });
      getFeatureBySQLParams = new SuperMap.REST.GetFeaturesBySQLParameters({
        queryParameter: getFeatureParam,
        toIndex: -1,
        datasetNames: [newdataset],
      });
      getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(url, {
        eventListeners: {
          processCompleted: async (res) => {
            const fields = await getIserverFields(url, newdataset);
            console.log(119, fields)
            treeDrawTool(this, res, node, fields, fn);
          },
          processFailed: (msg) => console.log(msg),
        },
      });
      getFeatureBySQLService.processAsync(getFeatureBySQLParams);
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
    toggleMenu() {
      this.showMenu = !this.showMenu
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
    filterNode(value, data) {
      return !value ? true : data.label.indexOf(value) !== -1;
    },
    nodeCheckChange(node, checked) {
      if (checked) {
        if (node.type == "mvt" && node.id) {
          this.setCurrentource(node.id)
          if (node.id == '项目') this.showSign = true
          if (node.withImage) {
            node.withImage.forEach(item => {
              const LAYER = this.tileLayers[item.name];
              if (LAYER) {
                LAYER.show = true
              } else {
                this.tileLayers[item.name] = window.earth.imageryLayers.addImageryProvider(
                  new Cesium.SuperMapImageryProvider({
                    url: item.url,
                  })
                )
                item.alpha && (this.tileLayers[item.name].alpha = item.alpha);
              }
            })
          }
          // if (node.id && this.entityMap[node.id]) {
          if (node.id && window.billboardMap[node.id]) {
            node.saveData ? this[node.saveData](this.saveDataMap[node.id]) : null
            this.$bus.$emit('source-change', { value: node.id });
            // this.entityMap[node.id].show = true;
            window.billboardMap[node.id]._billboards.map(
              (v) => (v.show = true)
            );
            window.labelMap[node.id].setAllLabelsVisible(true);
          } else {
            this.getPOIPickedFeature(node, () => {
              this.$bus.$emit('source-change', { value: node.id });
            });
          }
        } else if (node.type == "model") {
          node.componentEvent &&
            node.componentKey &&
            this.$bus.$emit(node.componentEvent, { value: node.componentKey });
        } else if (node.type == "image") {
          const LAYER = this.tileLayers[node.id];
          LAYER
            ? (LAYER.show = true)
            : (this.tileLayers[node.id] = window.earth.imageryLayers.addImageryProvider(
                new Cesium.SuperMapImageryProvider({
                  url: node.url,
                  name: node.id,
                })
              ));
        } else if (node.type == "cesium_town") {
          console.log('cesium_town_on')
          this.$parent.removeAll(true);
        } else if (node.type == "cesium_lvdao") {
          console.log('cesium_lvdao_on')
          this.$parent.switchLvdao(true);
        } else if (node.type == "cesium_thfwm") {
          console.log('cesium_thfwm_on')
          this.$parent.switchThfwmlayer(true);
        } else if (node.type == "cesium_xzqx") {
          console.log('cesium_xzqx_on')
          this.$parent.switchXzjxqxlayer(true);
        } else if (node.type == "cesium_xzjd") {
          console.log('cesium_xzjd_on')
          this.$parent.switchXzjxjdlayer(true);
        }
        // else if (node.type == "cesium_thyx") {
        //   console.log('cesium_thyx_on')
        //   this.$parent.switchThyx(true);
        // }
        //  有相机视角配置 -> 跳视角
        node.camera && window.earth.scene.camera.setView(node.camera);
      } else {
        const LAYER =
          node.type == "model"
            ? window.earth.scene.layers.find(node.id)
            : this.tileLayers[node.id];
        LAYER && (LAYER.show = false);
        if (
          // this.entityMap[node.id] &&
          // window.earth.dataSources.length
          window.billboardMap[node.id]
        ) {
          node.saveData && this[node.saveData]([]);
          // this.entityMap[node.id].show = false;
          // if (node.saveData) {
          //   this[node.saveData]([]);
          // }
          window.billboardMap[node.id]._billboards.map((v) => (v.show = false));
          window.labelMap[node.id].setAllLabelsVisible(false);
        }
        node.componentEvent &&
          this.$bus.$emit(node.componentEvent, { value: null });
        if (node.type == "cesium_town") {
          console.log('cesium_town_off')
          this.$parent.removeAll(false);
        }
        if (node.type == "cesium_lvdao") {
          console.log('cesium_lvdao_off')
          this.$parent.switchLvdao(false);
        }
        if (node.type == "cesium_thfwm") {
          console.log('cesium_thfwm_off')
          this.$parent.switchThfwmlayer(false);
        }
        if (node.type == "cesium_xzqx") {
          console.log('cesium_xzqx_off')
          this.$parent.switchXzjxqxlayer(false);
        }
        if (node.type == "cesium_xzjd") {
          console.log('cesium_xzjd_off')
          this.$parent.switchXzjxjdlayer(false);
        }
        // if (node.type == "cesium_thyx") {
        //   console.log('cesium_thyx_off')
        //   this.$parent.switchThyx(false);
        // }
        if (node.id == '项目') this.showSign = false
      }
    },
    // targetChange(target) {
    //   if (target === '绿道断点') {
    //     this.$bus.$emit("cesium-lvdao-switch", { value: !this.showLvdao });
    //   }
    //   this.TARGET_SOURCE.forEach((item) => {
    //     if (item.id == target) {
    //       console.log(666)
    //       if (item.id && this.entityMap[item.id]) {
    //         console.log(777)
    //         this.entityMap[item.id].show = !this.entityMap[item.id].show;
    //       } else {
    //         console.log(888)
    //         this.getPOIPickedFeature(item);
    //       }
    //     }
    //   })
    // }
  },
  watch: {
    // currentLayer(val) {
    //   console.log('newval', val)
    //   if (val === 'vector') {
    //     this.$bus.$emit("cesium-layer-switch", { type: 'vector', value: this.currentVector });
    //   }
    //   if (val === 'yx') {
    //     this.$bus.$emit("cesium-layer-switch", { type: 'yx', value: this.currentYear });
    //   }
    // },
    // currentTarget(val) {
    //   console.log('newval', val)
    //   if (val === '绿道断点') {
    //     this.$bus.$emit("cesium-lvdao-switch", { value: true });
    //   } else {
    //     this.$bus.$emit("cesium-lvdao-switch", { value: false });
    //   }
    //   this.TARGET_SOURCE.forEach((item) => {
    //     if (item.id == val) {
    //       console.log(666)
    //       if (item.id && this.entityMap[item.id]) {
    //         this.entityMap[item.id].show = true;
    //       } else {
    //         console.log(777)
    //         this.getPOIPickedFeature(item);
    //       }
    //     } else {
    //       if (item.id && this.entityMap[item.id]) {
    //         this.entityMap[item.id].show = false;
    //       }
    //     }
    //   })
    // }
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
.gdkd{
  width: 350px;
}
.uls{
  width: 100%;
  display: flex;
  align-items: flex-start;
}
.ulsda{
  width: 100%;
  display: flex;
  align-items: flex-start;
  height: 1280px;
}
 .lefts{
   width: 400px;
 }
  .rig{
    flex:1;
    padding-left: 3%;
    height: 1280px;
  }
  .ssjda{
    padding-top: 5%;
  }
.ssjda2{
  padding-top: 8%;

}
  .zsj{
    padding-left: 10%;
  }
</style>
