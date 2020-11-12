<template>
  <div class="rightChart">
    <div class="left">
      <regionAnalysis v-show="zrdw=='all'"></regionAnalysis>
      <projectPlan v-show="zrdw=='all'"></projectPlan>
      <PartLeft :zrdw="zrdw" v-if="zrdw!='all'" />
    </div>
    <div class="middle">
      <div class="center-box" v-show="zrdw=='all'">
        <Swivel />
      </div>
      <projectProcess v-show="zrdw=='all'"></projectProcess>
      <PartMiddle v-if="zrdw!='all'" />
    </div>
    <div class="right">
      <KeyProjects v-show="zrdw=='all'"></KeyProjects>
      <HightlightProject v-show="zrdw=='all'"></HightlightProject>
      <PartRight :zrdw="zrdw" v-if="zrdw!='all'" />
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
        zrdw: 'all'
      };
    },
    mounted() {
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
