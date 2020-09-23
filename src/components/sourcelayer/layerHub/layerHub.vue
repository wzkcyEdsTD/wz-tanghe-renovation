
<template>
  <div class="layerhub-wrapper">
    <div class="bottom-wrapper">
      <div class="show-btn" v-show="!showHub" @click="showHub = true">
        <img src="./images/show-btn2.png">
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
          <div class="layer" @click="toggleBaimo">
            <img v-if="showBaimo" src="./images/3d-sel.png">
            <img v-else src="./images/3d-unsel.png">
          </div>
          <div class="layer" @click="toggleMenu">
            <img v-if="showMenu" src="./images/menu-sel.png">
            <img v-else src="./images/menu-unsel.png">
          </div>
        </div>
        <div class="yxyear-container" v-show="currentLayer=='yx'">
          <div class="year" :class="{selected: currentYear==item}" 
          v-for="(item, index) in yearList" :key="index"
          @click="currentYear = item">
            {{item}}
          </div>
        </div>
      </div>
    </div>
    <div class="left-menu-wrapper" v-show="showMenu">
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
          @check-change="nodeCheckChange"
        />
      </div>
    </div>
    <div class="sign-wrapper">
      <img src="/static/images/common/sign@2x.png">
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { treeDrawTool } from "./TreeDrawTool";
import {
  TARGET_SOURCE,
  CESIUM_TREE_OPTION,
} from "config/server/tangheTreeOption";
const Cesium = window.Cesium;

export default {
  name: "layerHub",
  data() {
    return {
      TARGET_SOURCE,
      //  tile layers
      tileLayers: {},
      //  cesium Object
      entityMap: {},
      featureMap: {}, //  源数据,量小
      showHub: false,
      currentLayer: 'yx',
      yearList: [2016, 2017, 2018, 2019],
      currentYear: 2019,
      currentTarget: '',
      showBaimo: false,
      showMenu: false,
      data: CESIUM_TREE_OPTION,
    };
  },
  computed: {
  },
  created() {
    console.log(666)
    this.eventRegsiter()
  },
  methods: {
    ...mapActions("map", ["setProject"]),
    eventRegsiter() {
      this.$bus.$off("cesium-targetChange");
      this.$bus.$on("cesium-targetChange", ({target}) => {
        console.log("target", target);
        this.currentTarget = target
      });
    },
    /**
     * POI fetch
     * @param {object} node
     */
    getPOIPickedFeature(node, fn) {
      const { newdataset, url } = node;
      console.log(888, newdataset, url)
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
            console.log(999, res)
            treeDrawTool(this, res, node);
          },
          processFailed: (msg) => console.log(msg),
        },
      });
      getFeatureBySQLService.processAsync(getFeatureBySQLParams);
    },

    toggleLayer(type) {
      console.log('toggleLayer', type)
      this.currentLayer = type
    },
    toggleBaimo() {
      this.showBaimo = !this.showBaimo
      this.$bus.$emit("cesium-3d-switch", { value: this.showBaimo });
    },
    toggleMenu() {
      this.showMenu = !this.showMenu
      this.$parent.isTotalTarget = !this.showMenu;
    },
    filterNode(value, data) {
      return !value ? true : data.label.indexOf(value) !== -1;
    },
    nodeCheckChange(node, checked) {
      if (checked) {
        if (node.type == "mvt" && node.id) {
          if (node.id && this.entityMap[node.id]) {
            this.entityMap[node.id].show = true;
          } else {
            this.getPOIPickedFeature(node);
          }
        } else if (node.type == "model") {
          node.componentEvent &&
            node.componentKey &&
            this.$bus.$emit(node.componentEvent, { value: node.componentKey });
        } else if (node.type == "image") {
          const LAYER = this.tileLayers[node.id];
          this.tileLayers[
            node.id
          ] = window.earth.imageryLayers.addImageryProvider(
            new Cesium.SuperMapImageryProvider({
              url: node.url,
              name: node.id,
            })
          );
        }
        //  有相机视角配置 -> 跳视角
        node.camera && window.earth.scene.camera.setView(node.camera);
      } else {
        const LAYER =
          node.type == "model"
            ? window.earth.scene.layers.find(node.id)
            : this.tileLayers[node.id];
        LAYER && (LAYER.show = false);
        if (
          node.icon &&
          this.entityMap[node.id] &&
          window.earth.dataSources.length
        ) {
          this.entityMap[node.id].show = false;
        }
        node.componentEvent &&
          this.$bus.$emit(node.componentEvent, { value: null });
      }
    },
  },
  watch: {
    currentLayer(val) {
      console.log('newval', val)
      if (val === 'vector') {
        this.$bus.$emit("cesium-layer-switch", { value: 'vector' });
      } else {
        this.$bus.$emit("cesium-layer-switch", { value: 'yx', year: this.currentYear });
      }
    },
    currentTarget(val) {
      console.log('newval', val)
      if (val === '绿道断点') {
        this.$bus.$emit("cesium-lvdao-switch", { value: true });
      } else {
        this.$bus.$emit("cesium-lvdao-switch", { value: false });
      }
      this.TARGET_SOURCE.forEach((item) => {
        if (item.id == val) {
          console.log(666)
          if (item.id && this.entityMap[item.id]) {
            this.entityMap[item.id].show = true;
          } else {
            console.log(777)
            this.getPOIPickedFeature(item);
          }
        } else {
          if (item.id && this.entityMap[item.id]) {
            this.entityMap[item.id].show = false;
          }
        }
      })
    }
    // currentYear(val) {
    //   this.$bus.$emit("cesium-layer-switch", { value: 'yx', year: this.currentYear });
    // }
  },
};
</script>

<style lang="less">
@import url("./layerHub.less");
</style>
