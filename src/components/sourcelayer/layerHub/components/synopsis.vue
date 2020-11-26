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
            <img src="../images/装饰.png" alt="" class="zs" />
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
          <img src="../images/装饰.png" alt="" class="zs" />
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
          <img src="../images/塘河示意图.gif" class="hangdao" />
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
.rightSummary {
  .frame_ {
    position: relative;
    height: 100%;
    .title-wrapper {
      display: flex;
      align-items: flex-end;
      .pre {
        display: block;
        width: 1vh;
        height: 2.5vh;
        background: linear-gradient(180deg, #16EAEA 0%, rgba(11, 48, 117, 0) 100%);
        transform: skewX(-30deg);
      }
      .title {
        display: block;
        height: 3.6vh;
        line-height: 3.6vh;
        font-family: YouSheBiaoTiHei;
        font-size: 3vh;
        letter-spacing: 0vh;
        color: #ffffff;
        text-shadow: 0px 2px 3px rgba(0, 0, 0, 0.64);
        position: relative;
        padding-left: 1.2vh;
      }
      .title::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0.2vh;
        width: 30vh;
        height: 1.5vh;
        z-index: -1;
        background-image: linear-gradient(90deg, #1950B9 0%, transparent 100%);
        transform: skewX(-30deg);
      }
      .desc {
        margin-left: 4px;
        font-size: 11px;
        // font-family: PingFang;
        color: #fff;
        opacity: .8;
      }
    }
  }
  .left1 {
    margin-top: 1vh;
    margin-right: 10vh;
    height: 18vh;
    flex: 1;
    text-align: left;
    padding-left: 1vh;
  }
  .hangdao{
    width:35vh;
    height: 25vh;
  }
  .right1 {
    flex-shrink: 0;
    margin-top: 1vh;
    height: 18vh;
    flex: 1;
    text-align:left
  }
  .lybq {
    font-size: 2vh;
    color: #2acbfe;
    font-family: DIN;
    line-height: 2vh;
  }
  .deh {
    padding-bottom: 1.2vh;
  }
  .lydw {
    font-size: 1.2vh;
    color: #2acbfe;
    font-family: DIN;
    line-height: 1.8vh;
  }
  .ly {
    font-size: 1.3vh;
    color: #2acbfe;
    font-family: DIN;
    line-height: 1.8vh;
    opacity: 1;
  }
  .lywz {
    font-size: 1.7vh;
    line-height: 2vh;
    color: #ffffff;
    margin-bottom: 1vh;
  }
  .lab {
    margin-bottom: 1vh;
    font-size: 1.5vh;
    width: 35vh;
    color: #dedede;
    line-height: 2vh;
    padding-top: 0.5vh;
    text-indent: 2em;
    text-align:left;
    padding-left: 1vh;
  }
  .xbt {
    font-size: 2vh;
    font-family: YouSheBiaoTiHei;
    line-height: 2vh;
    color: #ffffff;
    overflow-y: auto;
    letter-spacing: 1.5vh;
  }
  .zs {
    width: 70%;
  }
  .wenzi {
    padding-left: 1vh;
  }
  .jianju{
    padding-top: 1vh;
    text-align: left;
    padding-left: 1vh;
  }
  .box {
    display: flex;
    flex-direction: row;
  }
  .zsj {
    padding-left: 1vh;
  }
  .ssj {
    padding-top: 1vh;
  }
  .sp {
    width: 35vh;
    padding-right: 1vh;
  }
}
</style>
