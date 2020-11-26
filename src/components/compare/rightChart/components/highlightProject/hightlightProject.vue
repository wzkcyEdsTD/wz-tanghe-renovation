<template>
  <div class="hightlightProject">
    <div class="title-wrapper">
      <span class="pre"></span>
      <span class="title">亮点工程</span>
    </div>
    <div class="result-wrapper">
      <ul class="result-list">
        <li class="result-item header">
          <span class="index">排名</span>
          <span class="name">项目名称</span>
          <span class="content">责任单位</span>
          <span class="content">进度</span>
        </li>
        <!-- <li class="result-item first">
          <span class="index">{{ "01" }}</span>
          <span class="name">{{ "葡萄8-5地块" }}</span>
          <span class="content">{{ "鹿城区" }}</span>
          <span class="content">{{ "完工" }}</span>
        </li>
        <li class="result-item second">
          <span class="index">{{ "02" }}</span>
          <span class="name">{{ "葡萄8-5地块" }}</span>
          <span class="content">{{ "鹿城区" }}</span>
          <span class="content">{{ "完工" }}</span>
        </li>
        <li class="result-item third">
          <span class="index">{{ "03" }}</span>
          <span class="name">{{ "葡萄8-5地块" }}</span>
          <span class="content">{{ "鹿城区" }}</span>
          <span class="content">{{ "完工" }}</span>
        </li> -->
        <li class="result-item" v-for="(item, index) in lightXmList" :key="index">
          <span class="index">{{ index }}</span>
          <span class="name">{{ item.attributes.NAME }}</span>
          <span class="content">{{ item.attributes.ZR_DEPTID }}</span>
          <span class="content">{{ item.attributes.CURRENT_STATE }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "hightlightProject",
  data() {
    return {
      xmList: []
    }
  },
  computed: {
    ...mapGetters("map", ["sourceMap"]),
    drawData() {
      return this.$store.state.map.sourceMap;
    },
    lightXmList() {
      let result = []
      result = this.xmList.filter(item => {
        return item.attributes.ZT == '亮点项目'
      })
      return result
    },
  },
  watch: {
    drawData(val) {
      this.sourceMap['项目'] && (this.xmList = this.sourceMap['项目'])
    },
  }
};
</script>

<style lang="less" scoped>
@import url("./hightlightProject.less");
</style>
