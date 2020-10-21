<template>
  <div class="source-tree">
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
        default-expand-all
        @check-change="nodeCheckChange">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <div class="img-wrapper" v-if="!data.children">
            <img v-if="~selectedSourceList.indexOf(node.label)" class="icon" :src="`/static/images/source-icon/${node.label}icon@2x.png`" />
            <img v-else class="icon" :src="`/static/images/source-icon/${node.label}icon-未选择@2x.png`" />
          </div>
          <span class="label">{{ node.label }}</span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { treeDrawTool } from "../TreeDrawTool";
import { getIserverFields } from "api/iServerAPI";
import { CESIUM_TREE_OPTION } from "config/server/tangheTreeOption";
const Cesium = window.Cesium;

export default {
  name: "sourceTree",
  data() {
    return {
      data: CESIUM_TREE_OPTION,
      tileLayers: {},
      saveDataMap: {},
      selectedSourceList: []
    };
  },
  mounted() {
    this.$refs.tree.setCheckedKeys(['十二景', '断点', '绿道']);
  },
  methods: {
    ...mapActions("map", ["setSourceMap", "setCurrentource", "setSejList"]),
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
            console.log(119, fields);
            treeDrawTool(this, res, node, fields, fn);
          },
          processFailed: (msg) => console.log(msg),
        },
      });
      getFeatureBySQLService.processAsync(getFeatureBySQLParams);
    },
    nodeCheckChange(node, checked) {
      if (checked) {
        this.selectedSourceList.push(node.id)
        console.log('selectedSourceList', this.selectedSourceList)
        if (node.type == "mvt" && node.id) {
          this.setCurrentource(node.id);
          // if (node.id == '项目') this.showSign = true
          if (node.withImage) {
            node.withImage.forEach((item) => {
              const LAYER = this.tileLayers[item.name];
              if (LAYER) {
                LAYER.show = true;
              } else {
                this.tileLayers[
                  item.name
                ] = window.earth.imageryLayers.addImageryProvider(
                  new Cesium.SuperMapImageryProvider({
                    url: item.url,
                  })
                );
                item.alpha && (this.tileLayers[item.name].alpha = item.alpha);
              }
            });
          }
          // if (node.id && this.entityMap[node.id]) {
          if (node.id && window.billboardMap[node.id]) {
            node.saveData
              ? this[node.saveData](this.saveDataMap[node.id])
              : null;
            this.$bus.$emit("source-change", { value: node.id });
            // this.entityMap[node.id].show = true;
            window.billboardMap[node.id]._billboards.map(
              (v) => (v.show = true)
            );
            // window.labelMap[node.id].setAllLabelsVisible(true);
            window.currentMapType == "vectorwhite"
              ? window.blackLabelMap[node.id].setAllLabelsVisible(true)
              : window.whiteLabelMap[node.id].setAllLabelsVisible(true);
          } else {
            this.getPOIPickedFeature(node, () => {
              this.$bus.$emit("source-change", { value: node.id });
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
            : (this.tileLayers[
                node.id
              ] = window.earth.imageryLayers.addImageryProvider(
                new Cesium.SuperMapImageryProvider({
                  url: node.url,
                  name: node.id,
                })
              ));
        } else if (node.type == "cesium_town") {
          console.log("cesium_town_on");
          // this.$parent.removeAll(true);
          this.$bus.$emit("remove-texiao", { value: true });
        } else if (node.type == "cesium_lvdao") {
          console.log("cesium_lvdao_on");
          // this.$parent.switchLvdao(true);
          this.$bus.$emit("switch-lvdao", { value: true });
        } else if (node.type == "cesium_thfwm") {
          console.log("cesium_thfwm_on");
          // this.$parent.switchThfwmlayer(true);
          this.$bus.$emit("switch-thfwm", { value: true });
        } else if (node.type == "cesium_xzqx") {
          console.log("cesium_xzqx_on");
          // this.$parent.switchXzjxqxlayer(true);
          this.$bus.$emit("switch-xzjxqx", { value: true });
        } else if (node.type == "cesium_xzjd") {
          console.log("cesium_xzjd_on");
          // this.$parent.switchXzjxjdlayer(true);
          this.$bus.$emit("switch-xzjxjd", { value: true });
        }
        // else if (node.type == "cesium_thyx") {
        //   console.log('cesium_thyx_on')
        //   this.$parent.switchThyx(true);
        // }
        //  有相机视角配置 -> 跳视角
        node.camera && window.earth.scene.camera.setView(node.camera);
      } else {
        this.selectedSourceList.splice(this.selectedSourceList.indexOf(node.id), 1);
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
          // window.labelMap[node.id].setAllLabelsVisible(false);
          window.currentMapType == "vectorwhite"
            ? window.blackLabelMap[node.id].setAllLabelsVisible(false)
            : window.whiteLabelMap[node.id].setAllLabelsVisible(false);
        }
        node.componentEvent &&
          this.$bus.$emit(node.componentEvent, { value: null });
        if (node.type == "cesium_town") {
          console.log("cesium_town_off");
          this.$bus.$emit("remove-texiao", { value: false });
        }
        if (node.type == "cesium_lvdao") {
          console.log("cesium_lvdao_off");
          this.$bus.$emit("switch-lvdao", { value: false });
        }
        if (node.type == "cesium_thfwm") {
          console.log("cesium_thfwm_off");
          this.$bus.$emit("switch-thfwm", { value: false });
        }
        if (node.type == "cesium_xzqx") {
          console.log("cesium_xzqx_off");
          this.$bus.$emit("switch-xzjxqx", { value: false });
        }
        if (node.type == "cesium_xzjd") {
          console.log("cesium_xzjd_off");
          this.$bus.$emit("switch-xzjxjd", { value: false });
        }
        // if (node.type == "cesium_thyx") {
        //   console.log('cesium_thyx_off')
        //   this.$parent.switchThyx(false);
        // }
        // if (node.id == '项目') this.showSign = false
      }
    },
  },
};
</script>

<style lang="less">
.source-tree {
  .title-wrapper {
    display: flex;
    align-items: flex-end;
    .pre {
      display: block;
      width: 1vh;
      height: 2.5vh;
      background: linear-gradient(
        180deg,
        #16eaea 0%,
        rgba(11, 48, 117, 0) 100%
      );
      transform: skewX(-30deg);
    }
    .title {
      display: block;
      height: 3.5vh;
      line-height: 3.5vh;
      font-family: YouSheBiaoTiHei;
      font-size: 3vh;
      letter-spacing: 0px;
      color: #ffffff;
      text-shadow: 0vh 0.2vh 0.3vh rgba(0, 0, 0, 0.64);
      position: relative;
      padding-left: 1vh;
    }
    .title::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0.2vh;
      width: 20vh;
      height: 1.5vh;
      z-index: -1;
      background-image: linear-gradient(90deg, #1950b9 0%, transparent 100%);
      transform: skewX(-30deg);
    }
  }

  .tree-container {
    height: 78vh;
    overflow: auto;
    .el-tree {
      padding-right: 5vh;
      background: none;
    }

    .el-tree-node__expand-icon {
      color: #fff;
      font-size: 2.4vh;
    }

    .el-tree-node__expand-icon.is-leaf {
      color: transparent;
    }
    .el-tree-node__content {
      margin: 0.5vh 0;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      height: 2.6vh;
      cursor: pointer;
    }
    .el-tree-node {
      padding: 0.1vh 0;
    }

    .custom-tree-node {
      display: flex;
      align-items: center;
      .icon {
        height: 2vh;
        margin-right: 0.5vh;
      }
      .label {
        font-size: 1.6vh;
        color: #c7c7c7;
      }
    }

    .is-checked {
      .custom-tree-node {
        .label {
          color: #16E8E8;
        }
      }
    }

    .el-tree-node:focus > .el-tree-node__content {
      background: none;
    }

    .el-tree-node__content:hover {
      background: none;
    }

    .el-checkbox__inner {
      background-color: transparent;
      border: 0.1vh solid #16e7e8;
    }

    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: #0adffa;
      border-color: #0adffa;
    }

    .el-checkbox__inner::after {
      border: 0.1vh solid black;
      border-left: 0;
      border-top: 0;
    }

    .el-checkbox__inner::before {
      background-color: black !important;
    }
  }
}
</style>

