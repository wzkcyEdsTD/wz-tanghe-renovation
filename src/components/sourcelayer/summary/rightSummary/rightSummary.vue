<template>
  <div class="rightSummary">
    <div class="frame_">
      <div class="title-wrapper">
        <span class="pre"></span>
        <span class="title">温瑞塘河</span>
      </div>
      <div class="wenzi">
        <!-- <div class="jianju">
            <span class="xbt">简介</span>
            <img src="./img/装饰.png" alt="" class="zs" />
          </div> -->
        <p class="lab">{{ temp || "暂无简介" }}</p>
        <video
          ref="video"
          controls
          class="sp"
          src="static/video/温瑞塘河.mp4"
        ></video>
        <div class="jianju">
          <span class="xbt">流域</span>
          <img src="./img/装饰.png" alt="" class="zs" />
        </div>
        <div class="box">
          <div class="left1">
            <div class="lywz">塘河长度</div>
            <div class="deh">
              <span class="lybq">1178.4</span>
              <span class="lydw"> 千米</span>
            </div>
            <div class="lywz">蓄水量</div>
            <div class="deh">
              <span class="lybq">{{ `${lable.xsl}` }}</span>
              <span class="lydw"> 万立方米</span>
            </div>
            <div class="lywz">灌溉面积</div>
            <div class="deh">
              <span class="lybq">48.2</span>
              <span class="lydw"> 万亩</span>
            </div>
          </div>
          <div class="right1">
            <div class="lywz">流域面积</div>
            <div class="deh">
              <span class="lybq">740</span>
              <span class="lydw"> 平方千米</span>
            </div>
            <div class="lywz">平均流量</div>
            <div class="deh">
              <span class="lybq">{{ `${lable.pjll}` }}</span>
              <span class="lydw"> 亿立方米</span>
            </div>
            <div class="lywz">源头</div>
            <div class="deh">
              <span class="ly">瞿溪、雄溪、郭溪</span>
            </div>
          </div>
        </div>
      </div>
      <div class="title-wrapper">
        <span class="pre"></span>
        <span class="title">温瑞塘河航道</span>
      </div>
      <div class="zsj">
        <div class="ssj">
          <img src="./img/塘河示意图.gif" class="hangdao" />
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
      showLarge: window.showLarge,
      temp:
        "温瑞塘河位于瓯江以南、飞云江以北的温瑞平原，是温州市境内十分重要的河道水系，分属于鹿城、瓯海、龙湾、瑞安等“三区一市”管辖。",
      attributes: {},
      lable: {
        lymj: 740,
        xsl: 6500,
        thcd: 1178.4,
        pjll: 9.13,
      },
      currentType: "total",
    };
  },
  computed: {},
  methods: {},
  mounted() {
    this.$refs.video.addEventListener("play", (e) => {
      this.showLarge &&
        this.$bus.$emit("change-rightContent", {
          type: "video",
          value: e.target.currentSrc,
        });
    });
  },
};
</script>

<style lang="less" scoped>
@import url("./rightSummary.less");
</style>
