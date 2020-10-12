<template>
  <div class="layerhub-wrapper">
    <div class="sign-wrapper">
      <img src="/static/images/common/sign@2x.png">
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { treeDrawTool } from "../../sourcelayer/layerHub/TreeDrawTool";
import { getIserverFields } from "api/iServerAPI";
export default {
  data() {
    return {
      entityMap: {},
      featureMap: {},
    }
  },
  methods: {
    ...mapActions("map", ["setSourceMap"]),
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
            console.log(999, res)
            const fields = await getIserverFields(url, newdataset);
            console.log(119, fields)
            treeDrawTool(this, res, node, fields);
            fn && fn();
          },
          processFailed: (msg) => console.log(msg),
        },
      });
      getFeatureBySQLService.processAsync(getFeatureBySQLParams);
    },
  },
  mounted() {
    const SERVER_HOST = "http://172.168.3.183:8090/iserver/services"
    const SW_DATA = "/data-alldata/rest/data";
    const SW_DATA_NAME = "172.168.3.181_thxm:";
    const SERVER_DEFAULT_DATA = SERVER_HOST + SW_DATA;
    this.getPOIPickedFeature({
      id: "项目",
      label: "项目",
      url: SERVER_DEFAULT_DATA,
      newdataset: `${SW_DATA_NAME}项目`,
      icon: false,
    });
  }
}
</script>

<style lang="less">

</style>