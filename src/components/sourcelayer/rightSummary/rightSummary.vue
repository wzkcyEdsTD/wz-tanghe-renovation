<template>
  <div class="rightSummary">
    <div class="_bimframe_">
      <div>
        <div class="title-wrapper">
          <span class="pre"></span>
          <span class="title">温瑞塘河</span>
        </div>
        <span class="summary" >简介</span>
        <div>
          <p class="lab" style="padding-top: 5px;text-indent: 2em;">{{ attributes.SUMMARY || temp }}</p>
          <video
            muted
            src="blob:https://baike.baidu.com/3ce199b3-9735-4717-ac1e-3477c9001e34"
            controls
            loop
            style="width: 100%;padding-top: 5px"
          />
          <div class="summary">流域</div>
        </div>
      </div>
      <div>
        <div class="title-wrapper">
          <span class="pre"></span>
          <span class="title">沿线项目</span>
        </div>
      </div>
      <div>
        <div class="title-wrapper">
          <span class="pre"></span>
          <span class="title">卡点</span>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  export default {
    data() {
      return {
        temp:"温瑞塘河位于瓯江以南、飞云江以北的温瑞平原，是温州市境内十分重要的河道水系，分属于鹿城、瓯海、龙湾、瑞安等“三区一市”管辖。",
        attributes: {},
      };
    },
    computed: {
      // ...mapGetters("map", ["projectList"]),
    },

  }
</script>

<style lang="less">
  @import url("./rightSummary.less");
</style>
