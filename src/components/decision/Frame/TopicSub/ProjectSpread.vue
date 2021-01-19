<template>
  <div class="proj-spread" v-show="show">
    <div class="title-wrapper">
      <span class="pre"></span>
      <span class="title">各乡镇街道项目数排名</span>
      <el-select
        style="width: 100px"
        v-model="districtValue"
        placeholder="请选择"
      >
        <el-option
          v-for="item in districtOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="content">
      <div
        class="rank-item"
        v-for="(item, index) in currentStreetList"
        :key="index"
      >
        <span class="name">{{ item.name }}</span>
        <div
          class="progress"
          :class="{ red: index <= 2, blue: index >= 3 }"
          :style="{ width: `${item.num * 7}%` }"
        ></div>
        <span class="num">{{ item.num }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ServiceUrl } from "@/config/server/mapConfig";
import { switchHeatMap } from "../../MapTools/HeatMap";
import { countProjectStreetNum } from "api/tangheAPI";
export default {
  props: ["show"],
  data() {
    return {
      districtOptions: [
        { label: "鹿城区", value: "鹿城区" },
        { label: "龙湾区", value: "龙湾区" },
        { label: "瓯海区", value: "瓯海区" },
        { label: "瑞安市", value: "瑞安市" },
      ],
      districtValue: "鹿城区",
      streetData: [],
    };
  },
  computed: {
    currentStreetList() {
      let res = this.streetData.find((item) => {
        return item.name == this.districtValue;
      });
      if (res) {
        let arr = res.countBaseRespList;
        arr.sort((a, b) => {
          if (a.num < b.num) {
            return 1;
          } else if (a.num > b.num) {
            return -1;
          } else {
            return 0;
          }
        });
        console.log("bbb", arr);
        return arr;
      }
    },
  },
  methods: {
    async getStreetData(child) {
      let res = await countProjectStreetNum();
      if (res.code == 200) {
        this.streetData = res.result;
        this.currentChild = child;
      }
    },
    async addHeatMap(type) {
      const { result } = await this.fetchProjectData();
      console.log("resultttt", result);
      let areaArr = [];
      result.features.forEach((v) => {
        areaArr.push([v.geometry.x, v.geometry.y, 1]);
      });
      switchHeatMap(true, "k1", areaArr, 0, 3);
    },
    // 获取项目数据
    fetchProjectData() {
      return new Promise((resolve, reject) => {
        const getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(
          ServiceUrl.FEATUREMVT,
          {
            eventListeners: {
              processCompleted: (data) => {
                data && resolve(data);
              },
              processFailed: (err) => reject(err),
            },
          }
        );
        getFeatureBySQLService.processAsync(
          new SuperMap.REST.GetFeaturesBySQLParameters({
            queryParameter: new SuperMap.REST.FilterParameter({
              attributeFilter: "",
            }),
            toIndex: -1,
            datasetNames: ["172.168.3.181_thxm_manage:th_spatial_project_view"],
          })
        );
      });
    },
  },
  watch: {
    show(val) {
      if (val) {
        this.getStreetData();
        this.addHeatMap()
      } else {
        switchHeatMap(false, "k1");
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>