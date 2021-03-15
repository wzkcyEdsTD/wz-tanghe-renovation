<template>
  <div class="partRight">
    <div class="top">
      <div class="title-wrapper">
        <span class="pre"></span>
        <span class="title">重点项目分析</span>
      </div>
      <div class="content">
        <div class="item">
          <div class="decorate"></div>
          <div class="number">
            <span>{{ keyData.amount }}&nbsp;</span>亿元
          </div>
          <div class="text">金额</div>
        </div>
        <div class="item">
          <div class="decorate"></div>
          <div class="number">
            <span>{{ keyData.total }}&nbsp;</span>个
          </div>
          <div class="text">个数</div>
        </div>
        <!-- <div class="item">
          <div class="decorate"></div>
          <div class="number"><span>{{keyData[zrdw].hard}}&nbsp;</span>点</div>
          <div class="text">困难</div>
        </div> -->
      </div>
      <div class="time-wrapper">
        <div class="desc-box">
          <div class="time-box">
            <span class="number">{{ keyData.time.substr(0, 1) }}</span>
            <span class="number">{{ keyData.time.substr(1, 1) }}</span>
            <span class="number">{{ keyData.time.substr(2, 1) }}</span>
            <span class="number">{{ keyData.time.substr(3, 1) }}</span>
            <span>年</span>
            <span class="number">{{ keyData.time.substr(5, 1) }}</span>
            <span class="number">{{ keyData.time.substr(6, 1) }}</span>
            <span>月</span>
            <span class="number">{{ keyData.time.substr(8, 1) }}</span>
            <span class="number">{{ keyData.time.substr(9, 1) }}</span>
            <span>日</span>
          </div>
          <div class="text-box">最晚完成时间</div>
        </div>
      </div>
    </div>
    <div class="middle">
      <div class="title-wrapper">
        <span class="pre"></span>
        <span class="title">预警工程列表</span>
      </div>
      <div class="result-wrapper">
        <ul class="result-list warn">
          <li class="result-item header">
            <span class="index">排名</span>
            <span class="name">项目名称</span>
            <span class="content">责任单位</span>
            <span class="content">进度</span>
          </li>
          <li
            class="result-item"
            v-for="(item, index) in warnXmList"
            :key="index"
          >
            <span class="index">{{ index }}</span>
            <span class="name">{{ item.attributes.NAME }}</span>
            <span class="content">{{ item.attributes.ZR_DEPTID }}</span>
            <span class="content">{{ item.attributes.CURRENT_STATE }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom">
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
          <li
            class="result-item"
            v-for="(item, index) in lightXmList"
            :key="index"
          >
            <span class="index">{{ index }}</span>
            <span class="name">{{ item.attributes.NAME }}</span>
            <span class="content">{{ item.attributes.ZR_DEPTID }}</span>
            <span class="content">{{ item.attributes.CURRENT_STATE }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["zrdw", "projData"],
  data() {
    return {
      // keyData: {
      //   lucheng: {amount: 1.2, total: 3, hard: 0, time: '2021-12-30'},
      //   longwan: {amount: 0.66, total: 7, hard: 0, time: '2021-09-30'},
      //   ouhai: {amount: 11.72, total: 9, hard: 0, time: '2021-10-01'},
      //   ruian: {amount: 1.7, total: 6, hard: 0, time: '2021-09-30'},
      //   zhenan: {amount: 0.3, total: 1, hard: 0, time: '2021-12-01'},
      //   chengfa: {amount: 0, total: 0, hard: 0, time: '0000-00-00'},
      //   xiandai: {amount: 5, total: 4, hard: 0, time: '2021-09-01'},
      // },
      keyData: {
        amount: 0,
        total: 0,
        hard: 0,
        time: "",
      },
      xmList: [],
    };
  },
  computed: {
    ...mapGetters("map", ["sourceMap"]),
    drawData() {
      return this.$store.state.map.sourceMap;
    },
    lightXmList() {
      let result = [];
      result = this.xmList.filter((item) => {
        return item.attributes.ZT == "亮点项目";
      });
      return result;
    },
    warnXmList() {
      let result = [];
      result = this.xmList.filter((item) => {
        return item.attributes.ZT == "滞后工程";
      });
      return result;
    },
  },
  methods: {
    initData() {
      this.projData.forEach((item) => {
        if (item.sysOrgCode && ~item.sysOrgCode.indexOf(this.zrdw)) {
          this.keyData.amount = (item.projAmountSum/10000).toFixed(2)
          this.keyData.total = item.num
          this.keyData.time = item.name ? item.name : ''
        }
      });
    },
  },
  mounted() {
    this.initData();
  },
  watch: {
    drawData(val) {
      this.sourceMap["项目"] && (this.xmList = this.sourceMap["项目"]);
    },
    zrdw(val) {
      this.initData()
    }
  },
};
</script>

<style lang="less" scoped>
@import url("./PartRight.less");
</style>