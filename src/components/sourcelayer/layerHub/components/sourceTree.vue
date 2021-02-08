<template>
  <div class="source-tree">
    <!-- <div class="title-wrapper">
      <span class="pre"></span>
      <span class="title">资源目录</span>
    </div> -->
    <div class="tree-container">
      <el-tree
        ref="tree"
        :data="menuList"
        show-checkbox
        node-key="id"
        :default-expanded-keys="['塘河沿线']"
        @check-change="nodeCheckChange">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <div class="img-wrapper" v-if="!data.children">
            <img v-if="~selectedSourceList.indexOf(node.label)" class="icon" :src="`${MediaServer}/${node.data.icon}`" />
            <img v-else class="icon gray" :src="`${MediaServer}/${node.data.icon}`" />
          </div>
          <span class="label">{{ node.label }}</span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
import { MediaServer } from "@/config/server/mapConfig";
import { mapGetters, mapActions } from "vuex";
import { treeDrawTool } from "../TreeDrawTool";
import { getIserverFields } from "api/iServerAPI";
import { rootList } from "api/tangheAPI";
// import { CESIUM_TREE_OPTION } from "config/server/tangheTreeOption";
const Cesium = window.Cesium;

export default {
  name: "sourceTree",
  data() {
    return {
      MediaServer,
      menuList: [],
      tileLayers: {},
      saveDataMap: {},
      selectedSourceList: []
    };
  },
  mounted() {
    this.initData()
  },
  methods: {
    ...mapActions("map", ["setSourceMap", "setCurrentsource", "setSejList"]),

    async initData() {
      let res = await rootList()
      if (res.code === 200) {
        this.menuList = res.result
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(['十二景', '项目', '绿道']);
        })
      }
    },
    /**
     * POI fetch
     * @param {object} node
     */
    getPOIPickedFeature(node, fn) {
      const { datasetName, src, param } = node;
      var getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams;
      getFeatureParam = new SuperMap.REST.FilterParameter({
        // attributeFilter: `SMID <= 1000`,
        attributeFilter: param,
      });
      getFeatureBySQLParams = new SuperMap.REST.GetFeaturesBySQLParameters({
        queryParameter: getFeatureParam,
        toIndex: -1,
        datasetNames: [datasetName],
      });
      getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(src, {
        eventListeners: {
          processCompleted: async (res) => {
            const fields = await getIserverFields(src, datasetName);
            // console.log('fields', fields)
            treeDrawTool(this, res, node, fields, fn);
          },
          processFailed: (msg) => console.log(msg),
        },
      });
      getFeatureBySQLService.processAsync(getFeatureBySQLParams);
    },
    nodeCheckChange(node, checked) {
      if (node.children) {
        return
      }
      let nodeDetail = Object.assign(JSON.parse(node.serivcePath), {id: node.id})
      if (checked) {
        this.selectedSourceList.push(node.label)
        console.log('selectedSourceList', this.selectedSourceList)
        if (~node.label.indexOf('项目')) this.$parent.showSign = true
        if (node.label == '视频' || node.label == '全景' || node.label == '绿道断点') {
          if (node.label == '视频') {
            this.$refs.tree.setChecked('quanjin', false)
            this.$refs.tree.setChecked('绿道断点', false)
          }
          if (node.label == '全景') {
            this.$refs.tree.setChecked('shipin', false)
            this.$refs.tree.setChecked('绿道断点', false)
          }
          if (node.label == '绿道断点') {
            this.$refs.tree.setChecked('quanjin', false)
            this.$refs.tree.setChecked('shipin', false)
          }
          this.$bus.$emit('toggle-select', { value:true, menu:node.id });
        }
        if (nodeDetail.withImage) {
          nodeDetail.withImage.forEach((item) => {
            const LAYER = this.tileLayers[item.name];
            if (LAYER) {
              LAYER.show = true;
            } else {
              this.tileLayers[
                item.name
              ] = window.earth.imageryLayers.addImageryProvider(
                new Cesium.SuperMapImageryProvider({
                  url: item.src,
                })
              );
              item.alpha && (this.tileLayers[item.name].alpha = item.alpha);
              window.earth.imageryLayers.lower(this.tileLayers[item.name]);
            }
          });
        }
        if (node.serivceType == 'layer') {
          this.$bus.$emit(nodeDetail.switch, { value: true });
        }
        if (node.serivceType == "mvt" && node.id) {
          if (node.id && window.billboardMap[node.id]) {
            nodeDetail.callback
              ? this[nodeDetail.callback](this.saveDataMap[node.id])
              : null;
            window.billboardMap[node.id]._billboards.map(
              (v) => (v.show = true)
            );
            this.setCurrentsource(node.id);
            window.currentMapType == "vectorwhite"
              ? window.blackLabelMap[node.id].setAllLabelsVisible(true)
              : window.whiteLabelMap[node.id].setAllLabelsVisible(true);
          } else {
            this.getPOIPickedFeature(nodeDetail, () => {
              this.setCurrentsource(node.id);
            });
          }
        } else if (node.serivceType == "model") {
          // node.componentEvent &&
          //   node.componentKey &&
          //   this.$bus.$emit(node.componentEvent, { value: node.componentKey });
        } else if (node.serivceType == "image") {
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
        }
        //  有相机视角配置 -> 跳视角
        node.camera && window.earth.scene.camera.setView(node.camera);
      } else {
        if (node.label == '视频' || node.label == '全景') this.$bus.$emit('toggle-select', { value:false, menu:node.id });
        // 去掉目录选中，清空定位
        const datasource = window.earth.dataSources.getByName("location")[0];
        const entity = datasource.entities.values[0];
        if(node && entity && node.id == entity.id) {
          datasource.entities.removeAll();
          this.$parent.$parent.removeProjectCircle();
        }

        ~this.selectedSourceList.indexOf(node.label) && this.selectedSourceList.splice(this.selectedSourceList.indexOf(node.label), 1);
        
        const LAYER =
          node.type == "model"
            ? window.earth.scene.layers.find(node.id)
            : this.tileLayers[node.id];
        LAYER && (LAYER.show = false);
        if (
          window.billboardMap[node.id]
        ) {
          nodeDetail.callback && this[nodeDetail.callback]([]);
          window.billboardMap[node.id]._billboards.map((v) => (v.show = false));
          window.blackLabelMap[node.id].setAllLabelsVisible(false)
          window.whiteLabelMap[node.id].setAllLabelsVisible(false)
        }
        if (nodeDetail.withImage) {
          nodeDetail.withImage.forEach((item) => {
            const LAYER = this.tileLayers[item.name];
            LAYER.show = false;
          });
        }
        // node.componentEvent &&
        //   this.$bus.$emit(node.componentEvent, { value: null });
        node.serivceType == 'layer' &&
          this.$bus.$emit(nodeDetail.switch, { value: false });
        if (node.id == '项目') this.$parent.showSign = false
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
      // height: 3.5vh;
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
        &.gray {
          filter: grayscale(1);
        }
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

