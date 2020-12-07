<template>
  <div class="keyProjects">
    <div class="title-wrapper">
      <span class="pre"></span>
      <span class="title">重点项目统计</span>
    </div>
    <div class="allFlex">
      <div class="childFlex" v-for="(item,index) in projData" :key="index">
        <img :src="item.deptName == '总体项目' ? require('./img/select.png') : require('./img/unselect.png')" class="icon" />
        <div class="allText">
          <p class="name" :class="{total: item.deptName == '总体项目'}">{{item.deptName}}</p>
          <div class="otherFlex">
            <span class="text">{{item.num}}</span>
            <span class="textSmall">/个</span>
          </div>
          <div class="otherFlex">
            <span class="text">{{(item.projAmountSum / 10000).toFixed(2)}}</span>
            <span class="textSmall">亿元</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "keyProjects",
  props: ["projData"],
  data() {
    return {
    }
  },
  methods: {
  },
  mounted() {
  }
};
</script>

<style lang="less" scoped>
@import url("./keyProjects.less");
</style>
