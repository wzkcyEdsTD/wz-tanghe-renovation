<template>
  <div class="topic">
    <img class="bg" src="./images/topic-bg.png" alt="" />
    <div class="button-list">
      <div
        class="button-item"
        :class="{ active: currentTopic == item.value }"
        v-for="item in topicList"
        :key="item.value"
        @click="itemClick(item)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script>
import { ServiceUrl, LayerList } from "@/config/server/mapConfig";
import { switchHeatMap, doHeatMap } from "./HeatMap";
export default {
  data() {
    return {
      topicList: [
        {
          label: "项目投资专题",
          value: 1,
        },
        {
          label: "绿化覆盖专题",
          value: 2,
        },
        {
          label: "用地规划专题",
          value: 3,
        },
        {
          label: "用地现状专题",
          value: 4,
        },
        {
          label: "项目监管专题",
          value: 5,
        },
        {
          label: "领导督办专题",
          value: 6,
        },
      ],
      currentTopic: 0,
      ldfwFace: undefined,
      ldfwLine: undefined,
      konggui: undefined,
      xianzhuang: undefined,
      blocks: [
        { label: "项目投资", k: "k1" },
      ],
      forceKey: "k1"
    };
  },
  methods: {
    itemClick(item) {
      this.ldfwFace && (this.ldfwFace.show = false)
      this.ldfwLine && (this.ldfwLine.show = false)
      this.konggui && (this.konggui.show = false)
      this.xianzhuang && (this.xianzhuang.show = false)
      switchHeatMap(this.blocks, 'k2', []);
      if (item.value == this.currentTopic) {
        this.currentTopic = 0
        return
      }
      this.currentTopic = item.value
      if (item.value == 1) {
        let node = LayerList[1]
        const url = ServiceUrl.FEATUREMVT;
        let getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams;
        getFeatureParam = new SuperMap.REST.FilterParameter({
          attributeFilter: `SMID <= 1000`,
        });
        getFeatureBySQLParams = new SuperMap.REST.GetFeaturesBySQLParameters({
          queryParameter: getFeatureParam,
          toIndex: -1,
          datasetNames: [node.dataset],
        });
        getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(url, {
          eventListeners: {
            processCompleted: async (res) => {
              let heatArr = res.result.features.map((v) => [
                v.geometry.x,
                v.geometry.y,
                v.attributes.TOTALAMOUNT,
              ])
              console.log('heatArr???', heatArr)
              switchHeatMap(this.blocks, this.forceKey, heatArr);
            },
            processFailed: (msg) => console.log(msg),
          },
        });
        getFeatureBySQLService.processAsync(getFeatureBySQLParams);
      }
      if (item.value  == 2) {
        this.ldfwFace = window.earth.imageryLayers.addImageryProvider(
          new Cesium.SuperMapImageryProvider({
            url: 'http://172.168.3.183:8090/iserver/services/3D-ldfw_polygon/rest/realspace/datas/ldfw_polygon'
          })
        );
        this.ldfwFace.alpha = 0.8;
        this.ldfwLine = window.earth.imageryLayers.addImageryProvider(
          new Cesium.SuperMapImageryProvider({
            url: 'http://172.168.3.183:8090/iserver/services/3D-ldfw_line/rest/realspace/datas/ldfw_line'
          })
        );
      }
      if (item.value  == 3) {
        this.konggui = window.earth.imageryLayers.addImageryProvider(
          new Cesium.SuperMapImageryProvider({
            url: 'http://172.20.83.223:8090/iserver/services/map-KongGui_LuCheng/rest/maps/%E6%8E%A7%E8%A7%84%E4%B8%89%E5%8C%BA20200304%40172.20.83.196_swdata'
          })
        );
      }
      if (item.value  == 4) {
        this.xianzhuang = window.earth.imageryLayers.addImageryProvider(
          new Cesium.SuperMapImageryProvider({
            url: 'http://172.168.3.183:8090/iserver/services/3D-dltb/rest/realspace/datas/dltb'
          })
        );
        // window.earth.imageryLayers.lowerToBottom(this.xianzhuang);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.topic {
  .bg-image(@url) {
    background: url("@{url}.png") no-repeat center;
    background-size: 100% 100%;
  }
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  .bg {
    width: 80%;
  }
  .button-list {
    display: flex;
    justify-content: center;
    position: absolute;
    top: -2vh;
    left: 50%;
    transform: translateX(-50%);
    .button-item {
      margin: 0 1vh;
      padding: 0 1vh;
      width: 13vh;
      height: 4vh;
      line-height: 4vh;
      color: #eee;
      opacity: 0.9;
      cursor: pointer;
      .bg-image("./images/topic-unsel");
      &.active {
        .bg-image("./images/topic-sel");
        margin-top: -5px;
        width: 14vh;
        height: 5vh;
        font-weight: bold;
        color: #fff;
        opacity: 1;
      }
    }
  }
}
</style>