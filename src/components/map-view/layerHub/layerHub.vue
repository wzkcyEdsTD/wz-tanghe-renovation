
<template>
  <div class="layerhub-wrapper">
  </div>
</template>

<script>
import { treeDrawTool, fixTreeWithExtra } from "./TreeDrawTool";
import {
  FIXED_SOURCE,
} from "config/server/tangheTreeOption";
const Cesium = window.Cesium;

export default {
  name: "layerHub",
  data() {
    return {
      FIXED_SOURCE,
      //  tile layers
      tileLayers: {},
      //  cesium Object
      entityMap: {},
      featureMap: {}, //  源数据,量小
    };
  },
  computed: {
  },
  created() {
    this.FIXED_SOURCE.forEach((item) => {
      this.getPOIPickedFeature(item)
    })
  },
  methods: {
    /**
     * POI fetch
     * @param {object} node
     */
    getPOIPickedFeature(node, fn) {
      const { dataset, url } = node;
      var getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams;
      getFeatureParam = new SuperMap.REST.FilterParameter({
        attributeFilter: `SMID <= 1000`,
      });
      getFeatureBySQLParams = new SuperMap.REST.GetFeaturesBySQLParameters({
        queryParameter: getFeatureParam,
        toIndex: -1,
        datasetNames: [dataset],
      });
      getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(url, {
        eventListeners: {
          processCompleted: async (res) => {
            treeDrawTool(this, res, node);
          },
          processFailed: (msg) => console.log(msg),
        },
      });
      getFeatureBySQLService.processAsync(getFeatureBySQLParams);
    },
  },
};
</script>

<style scoped lang="less">
@import url("./layerHub.less");
</style>
