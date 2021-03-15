<template>
  <div class="delay" v-show="show">
    <div class="title-wrapper">
      <span class="pre"></span>
      <span class="title">滞后项目</span>
    </div>
    <div class="count">
      <div class="count-item" v-for="(item, index) in delayData" :key="index">
        <div class="name">{{ item.label }}</div>
        <div class="number" :class="{ red: index <= 2, blue: index >= 3 }">
          {{ item.number }}
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="header">
        <div class="line"></div>
        <el-select v-model="zrdwValue" placeholder="请选择">
          <el-option
            v-for="item in zrdwOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="result-wrapper">
        <ul class="result-list">
          <li class="result-item header-item">
            <span class="flex2">项目名称</span>
            <span class="content">计划开工时间</span>
            <span class="content">计划建成时间</span>
            <span class="flex2">当前状态</span>
          </li>
          <li
            class="result-item"
            v-for="(item, index) in currentList"
            :key="index"
          >
            <span class="flex2" :title="item.name">{{ item.name }}</span>
            <span class="content">{{ item.consdates || "-" }}</span>
            <span class="content">{{ item.consdatee || "-" }}</span>
            <span class="flex2">{{ item.status }}</span>
          </li>
          <p class="no-data" v-show="!currentList.length">暂无数据</p>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {
  resourceProjectList,
  getProjStatusByDept,
} from "api/tangheAPI";
export default {
  props: ["show"],
  data() {
    return {
      zrdwOptions: [
        // { label: "指挥部", value: "A02" },
        { label: "鹿城区政府", value: "A02A01" },
        { label: "龙湾区政府", value: "A02A03" },
        { label: "瓯海区政府", value: "A02A02" },
        { label: "瑞安市政府", value: "A02A04" },
        { label: "浙南产业区", value: "A02A05" },
        { label: "温州城发集团", value: "A02A07" },
        { label: "温州现代集团", value: "A02A06" },
      ],
      zrdwValue: "A02A01",
      delayData: [
        { label: "鹿城区政府", value: "A02A01", number: 0 },
        { label: "龙湾区政府", value: "A02A03", number: 0 },
        { label: "瓯海区政府", value: "A02A02", number: 0 },
        { label: "瑞安市政府", value: "A02A04", number: 0 },
        { label: "浙南产业区", value: "A02A05", number: 0 },
        { label: "温州城发集团", value: "A02A07", number: 0 },
        { label: "温州现代集团", value: "A02A06", number: 0 },
      ],
      projectList: [],
    }
  },
  computed: {
    currentList() {
      let res = this.projectList.filter((item) => {
        return item.sysOrgCode == this.zrdwValue;
      });
      return res;
    },
  },
  methods: {
    async getDelayCount() {
      let res = await getProjStatusByDept({
        status: "滞后",
      });
      if (res.code == 200) {
        this.delayData.forEach((item) => {
          res.result.forEach((v) => {
            if (item.value == v.sysOrgCode) {
              let number = 0;
              v.statusInfos.forEach((info) => {
                number += info.num;
              });
              item.number = number;
            }
          });
        });
        this.delayData.sort((a, b) => {
          if (a.number < b.number) {
            return 1;
          } else if (a.number > b.number) {
            return -1;
          } else {
            return 0;
          }
        });
      }
    },
    async getDelayList() {
      let res = await resourceProjectList({
        delFlag: 0,
        status: "*滞后*",
        pageNo: 1,
        pageSize: 9999,
      });
      if (res.code == 200) {
        this.projectList = res.result.records;
        // this.currentChild = child;
        let tempArr = [];
        for (let key in window.featureMap["项目"]) {
          let item = window.featureMap["项目"][key];
          if (~item.attributes.STATUS.indexOf("滞后")) {
            tempArr.push(item);
          }
        }
        this.$parent.filterData(tempArr);
      }
    },
  },
  watch: {
    show(val) {
      if (val) {
        this.getDelayCount()
        this.getDelayList()
      }
    }
  },
};
</script>

<style lang="less" scoped>
</style>