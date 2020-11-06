<template>
  <div class="rightChart">
    <div class="leftAndRight">
      <regionAnalysis></regionAnalysis>
      <projectPlan></projectPlan>
    </div>
    <div class="middle">
      <projectProcess></projectProcess>
    </div>
    <div class="leftAndRight" :style="{width:'28%'}">
      <KeyProjects></KeyProjects>
      <HightlightProject></HightlightProject>
    </div>
    <div class="center-box">
      <Swivel />
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
export default {
  components:{
    HightlightProject,
    KeyProjects,
    projectProcess,
    regionAnalysis,
    projectPlan,
    Swivel
  },
  data(){
    return{
    };
  }
}
</script>

<style lang="less" scoped>
  @import url("./rightChart.less");
</style>
