<template>
  <div class="sightSummary">
    <div class="bottom-wrapper">
       <div class="btn"></div>
       <ul class="sight-list">
         <li class="sight-item" v-for="(item,index) in sightList" :key="index">
           <img :src="`/static/images/景点/${item.attributes.NAME}.png`" />
         </li>
       </ul>
    </div>
    <div class="content-wrapper">
      <div class="title-wrapper">
        <span class="pre"></span>
        <span class="title">南塘印象</span>
        <span class="desc">截至2020年5月15日</span>
      </div>
      <div class="desc-wrapper">
        <div class="subtitle-wrapper">
          <span class="subtitle">简 介</span>
          <div class="subtitle-bg"></div>
        </div>
        <div class="text">
          南塘文化旅游区位于鹿城区中心地带，主要景点包括南塘河、南塘风貌街、白鹿洲公园、文化村、庄头滨水公园。南塘河及南塘街均有千年历史，有丰富的文化底蕴，且文化村内拥有谷超豪故居，全面展示了温州“数学之乡”的特点和风采。
        </div>
        <div class="video">
          <img src="/static/images/video.png" alt="">
        </div>
      </div>
      <div class="img-wrapper">
        <div class="subtitle-wrapper">
          <span class="subtitle">自然风光</span>
          <div class="subtitle-bg"></div>
        </div>
      </div>
    </div>
    <div class="mask-right"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters("map", ["sightList"]),
  },
  mounted() {
    
  },
  methods: {
    
  },
};
</script>

<style lang="less">
@import url("./sightSummary.less");
</style>