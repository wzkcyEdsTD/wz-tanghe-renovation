<template>
  <div class="rightChart">
    <div class="left">
      <regionAnalysis :regionData="regionData" v-show="zrdw=='all'"></regionAnalysis>
      <projectPlan :regionData="regionData" v-show="zrdw=='all'"></projectPlan>
      <PartLeft :zrdw="zrdw" :regionData="regionData" v-if="zrdw!='all'" />
    </div>
    <div class="middle">
      <div class="center-box" v-show="zrdw=='all'">
        <Swivel />
      </div>
      <projectProcess v-show="zrdw=='all'"></projectProcess>
      <PartMiddle :zrdw="zrdw" v-if="zrdw!='all'" />
    </div>
    <div class="right">
      <KeyProjects :projData="projData" v-show="zrdw=='all'"></KeyProjects>
      <HightlightProject v-show="zrdw=='all'"></HightlightProject>
      <PartRight :projData="projData" :zrdw="zrdw" v-if="zrdw!='all'" />
    </div>
  </div>
</template>

<script>
  import projectProcess from "./components/projectProcess/projectProcess";
  import regionAnalysis from "./components/regionAnalysis/regionAnalysis";
  import projectPlan from "./components/projectPlan/projectPlan";
  import KeyProjects from "./components/keyProjects/keyProjects";
  import HightlightProject from "./components/highlightProject/hightlightProject";
  import Swivel from "./components/Swivel/Swivel";
  import PartLeft from "./components/PartLeft/PartLeft";
  import PartMiddle from "./components/PartMiddle/PartMiddle";
  import PartRight from "./components/PartRight/PartRight"
  import { getProjNumByStreet, getProjDeptNumAmound } from "api/tangheAPI";
  export default {
    components:{
      HightlightProject,
      KeyProjects,
      projectProcess,
      regionAnalysis,
      projectPlan,
      Swivel,
      PartLeft,
      PartMiddle,
      PartRight
    },
    data(){
      return{
        zrdw: 'all',
        regionData: [],
        projData: []
      };
    },
    methods: {
      async initData() {
        let regionRes = await getProjNumByStreet()
        if (regionRes.code === 200) {
          this.regionData = regionRes.result
        }
        let projRes = await getProjDeptNumAmound({isImportant: 1})
        if (projRes.code === 200) {
          this.projData = projRes.result
        }
      },
    },
    mounted() {
      this.initData()
      this.$bus.$off("change-zrdw");
      this.$bus.$on("change-zrdw", ({ value }) => {
        this.zrdw = value
      })
    }
  }
</script>

<style lang="less" scoped>
  @import url("./rightChart.less");
</style>
