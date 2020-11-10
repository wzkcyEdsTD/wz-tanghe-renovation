<template>
  <div class="rightChart">
    <div class="left">
      <regionAnalysis v-show="showType=='all'"></regionAnalysis>
      <projectPlan v-show="showType=='all'"></projectPlan>
      <PartLeft v-show="showType=='other'" />
    </div>
    <div class="middle">
      <div class="center-box" v-show="showType=='all'">
        <Swivel />
      </div>
      <projectProcess v-show="showType=='all'"></projectProcess>
      <PartMiddle v-if="showType=='other'" />
    </div>
    <div class="right">
      <KeyProjects v-show="showType=='all'"></KeyProjects>
      <HightlightProject v-show="showType=='all'"></HightlightProject>
      <PartRight v-show="showType=='other'" />
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
        showType: 'all'
      };
    },
    mounted() {
      this.$bus.$off("change-showtype");
      this.$bus.$on("change-showtype", ({ value }) => {
        console.log('showType???????', value)
        this.showType = value
      })
    }
  }
</script>

<style lang="less" scoped>
  @import url("./rightChart.less");
</style>
