<template>
  <div class="amount-spread" v-show="show">
    <div class="title-wrapper">
      <span class="pre"></span>
      <span class="title">项目投资额分布</span>
    </div>
    <div class="header">
      <div class="tip">各责任单位投资总额（亿元）</div>
    </div>
    <div class="count">
      <div class="count-item" v-for="(item, index) in amountData" :key="index">
        <div class="name">{{ item.name }}</div>
        <div class="number" :class="{ red: index <= 2, blue: index >= 3 }">
          {{ parseInt(item.num / 10000) }}
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="header">
        <div class="tip">项目投资额排名列表</div>
      </div>
      <div class="result-wrapper">
        <ul class="result-list">
          <li class="result-item header-item">
            <span class="flex2">项目名称</span>
            <span class="content">总投资额</span>
            <span class="content">责任单位</span>
          </li>
          <li
            class="result-item"
            v-for="(item, index) in amountList"
            :key="index"
          >
            <span class="flex2">{{ item.name }}</span>
            <span class="content">{{ item.totalamount.toFixed(1) }}万元</span>
            <span class="content">{{ item.sysOrgCode_dictText }}</span>
          </li>
          <p class="no-data" v-show="!amountList.length">暂无数据</p>
        </ul>
      </div>
    </div>
    <div class="year-wrapper">
      <div
        class="year-item"
        :class="{ active: currentYear == 2020 }"
        @click="currentYear = 2020"
      >
        2020
      </div>
      <div
        class="year-item"
        :class="{ active: currentYear == 2021 }"
        @click="currentYear = 2021"
      >
        2021
      </div>
    </div>
  </div>
</template>

<script>
import { ServiceUrl } from "@/config/server/mapConfig";
import { switchHeatMap } from "../../MapTools/HeatMap";
import { countProjectAmound, resourceProjectList } from "api/tangheAPI";
export default {
  props: ["show"],
  data() {
    return {
      amountData: [],
      amountList: [],
      currentYear: 2020,
    };
  },
  methods: {
    async getAmountCount(year, child) {
      let res = await countProjectAmound({
        tag: year,
      });
      if (res.code == 200) {
        let index = res.result.findIndex((item) => {
          return item.name == "指挥部";
        });
        res.result.splice(index, 1);
        this.amountData = res.result;
        this.amountData.sort((a, b) => {
          if (a.num < b.num) {
            return 1;
          } else if (a.num > b.num) {
            return -1;
          } else {
            return 0;
          }
        });
        this.currentChild = child;
      }
    },
    async getAoumtList(year) {
      let res = await resourceProjectList({
        delFlag: 0,
        status,
        pageNo: 1,
        pageSize: 9999,
        tag: year,
        column: "totalamount",
        order: "desc",
      });
      if (res.code == 200) {
        this.amountList = res.result.records;
      }
    },
    async addHeatMap() {
      switchHeatMap(false, "k2");
      switchHeatMap(false, "k3");
      const { result } = await this.fetchProjectData();
      console.log("resultttt", result);
      let smallHeatArr = [];
      let bigHeatArr = [];
      result.features.forEach((v) => {
        if (v.attributes.TAG == this.currentYear) {
          if (v.attributes.TOTALAMOUNT <= 3000) {
            smallHeatArr.push([
              v.geometry.x,
              v.geometry.y,
              v.attributes.TOTALAMOUNT,
            ]);
          }
          if (v.attributes.TOTALAMOUNT > 3000) {
            bigHeatArr.push([
              v.geometry.x,
              v.geometry.y,
              v.attributes.TOTALAMOUNT,
            ]);
          }
        }
      });
      console.log("smallHeatArr???", smallHeatArr);
      console.log("bigHeatArr???", bigHeatArr);
      switchHeatMap(true, "k1", smallHeatArr, 30, 3000);
      switchHeatMap(true, "k2", bigHeatArr, 3000, 300000);
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
        this.getAoumtList(this.currentYear);
        this.getAmountCount(this.currentYear);
        this.addHeatMap();
      } else {
        switchHeatMap(false, "k2");
        switchHeatMap(false, "k3");
      }
    },
    currentYear(val) {
      this.getAoumtList(val);
      this.getAmountCount(this.currentYear, "项目投资额分布");
    },
  },
};
</script>

<style lang="less" scoped>
</style>