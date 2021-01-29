<template>
  <div class="problem" v-show="show">
    <div class="title-wrapper">
      <span class="pre"></span>
      <span class="title">问题项目</span>
    </div>
    <div class="count">
      <div class="count-item" v-for="(item, index) in problemData" :key="index">
        <div class="name">{{ item.name }}</div>
        <div class="number" :class="{ red: index <= 2, blue: index >= 3 }">
          {{ item.num }}
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="header">
        <div class="line"></div>
        <el-select
          class="delay-select"
          v-model="zrdwValue"
          placeholder="请选择"
        >
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
            <span class="content">存在问题</span>
          </li>
          <li
            class="result-item"
            v-for="(item, index) in currentList"
            :key="index"
          >
            <span class="flex2" :title="item.name">{{ item.name }}</span>
            <span class="content">{{ item.problem || "-" }}</span>
          </li>
          <p class="no-data" v-show="!currentList.length">暂无数据</p>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {
  countProjectProgressNum,
  queryProgressList,
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
      projectList: [],
      problemData: [],
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
    async getProblemCount() {
      let res = await countProjectProgressNum();
      if (res.code == 200) {
        this.problemData = res.result.slice(1);
      }
    },
    async getProblemList() {
      let res = await queryProgressList({
        resourceType: 'project_all',
        tag: 1
      });
      if (res.code == 200) {
        this.projectList = res.result;
        let tempArr = [];
        for (let key in window.featureMap["项目"]) {
          let item = window.featureMap["项目"][key];
          if (item.attributes.PROBLEM) {
            tempArr.push(item);
          }
        }
        console.log("tempArr", tempArr);
        this.$parent.filterData(tempArr);
      }
    },
  },
  watch: {
    show(val) {
      if (val) {
        this.getProblemCount()
        this.getProblemList()
      }
    }
  },
};
</script>

<style lang="less" scoped>
</style>