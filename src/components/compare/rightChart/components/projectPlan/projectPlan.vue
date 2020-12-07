<template>
  <div class="projectPlan" >
    <div class="title-wrapper">
      <span class="pre"></span>
      <span class="title">区域投资计划（亿元）</span>
    </div>
    <ul style="padding-top: 3vh">
      <li class="info-item-right" v-for="item in regionData" :key="item.sysOrgCode">
        <div class="key">
          <div class="keyAllText">
            <p>{{item.deptName}}</p>
            <div class="text">{{(item.projAmountSum / 10000).toFixed(1)}}</div>
          </div>
        </div>
        <div class="value">
          <p>
            <span v-for="(street,index) in item.streetInfos" :key="index">{{street.streetName}}({{(street.streetAmound/ 10000).toFixed(2)}})</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ["regionData"],
    data(){
      return{
      };
    }
  }
</script>

<style lang="less" scoped>
  @import url("./projectPlan.less");
</style>
