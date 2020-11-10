<template>
  <div class="partLeft">
    <div class="top">
      <div class="title-wrapper">
        <span class="pre"></span>
        <span class="title">投资类型分析</span>
      </div>
      <div class="content">
        <div class="item">
          <img src="./images/podetium.png">
          <div class="number">62<span class="small">个</span></div>
          <div class="desc">政府性投资</div>
        </div>
        <div class="item">
          <img src="./images/podetium.png">
          <div class="number">5<span class="small">个</span></div>
          <div class="desc">社会性投资</div>
        </div>
      </div>
      <div class="complete-rate">
        <span class="desc">完成率：12/67</span>
        <el-progress :text-inside="true" :stroke-width="22" :percentage="18"></el-progress>
      </div>
    </div>
    <div class="middle">
      <div class="title-wrapper">
        <span class="pre"></span>
        <span class="title">建设类型分析</span>
      </div>
      <div class="content">
        <div class="item">
          <div class="title">
            <div class="type">基础类&nbsp;</div>
            <div class="number number1">37</div>个
          </div>
          <div class="dash"></div>
          <div class="img-box">
            <img src="./images/pie1.png">
          </div>
        </div>
        <div class="item">
          <div class="title">
            <div class="type">公共类&nbsp;</div>
            <div class="number number2">22</div>个
          </div>
          <div class="dash"></div>
          <div class="img-box" style="margin-right:20px">
            <img src="./images/pie2.png">
          </div>
        </div>
        <div class="item">
          <div class="title">
            <div class="type">专业类&nbsp;</div>
            <div class="number number3">7</div>个
          </div>
          <div class="dash"></div>
          <div class="img-box" style="margin-right:45px">
            <img src="./images/pie3.png">
          </div>
        </div>
        <div class="item">
          <div class="title">
            <div class="type">其他&nbsp;</div>
            <div class="number number4">7</div>个
          </div>
          <div class="dash"></div>
          <div class="img-box" style="margin-right:70px">
            <img src="./images/pie4.png">
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="title-wrapper">
        <span class="pre"></span>
        <span class="title">区域投资额</span>
      </div>
      <div style="margin-top: 1vh; height: 30vh; width: 45vh;" ref="barEchart"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      barEchart: null,
    }
  },
  methods: {
    drawBar() {
      const that = this;
      this.barEchart = this.$echarts.init(this.$refs.barEchart);
      this.barEchart.setOption({
        grid: {
          top: 10,
        },
        xAxis: {
          data: [
            "滨江街道",
            "大南街道",
            "广化街道",
            "南郊街道",
            "南汇街道",
            "松台街道",
            "蒲鞋市街道",
          ],
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff",
            },
          },
          axisLabel: {
            interval: 0,
            rotate: 45,
            color: "#fff",
          },
        },
        yAxis: {
          // max: 1000,
          axisLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "#fff",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#fff",
            },
          },
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            name: "分布",
            type: "bar",
            barWidth: "11",
            data: [450, 370, 260, 320, 500, 190, 220],
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#D81A80" },
                  { offset: 1, color: "rgba(216,26,128,0)" },
                ]),
              },
            },
          },
        ],
      });
      window.addEventListener("resize", function () {
        that.barEchart.resize();
      });
    },
  },
  mounted() {
    this.drawBar();
  }
}
</script>

<style lang="less" scoped>
@import url("./PartLeft.less");
</style>
<style lang="less">
.el-progress {
  display: inline;
}
.el-progress-bar {
  width: 70%;
  .el-progress-bar__outer {
    border: 1px solid #0D7B8E;
    background-color: #02364F;
  }
  .el-progress-bar__inner {
    background-color: #16E8E8;
  }
  .el-progress-bar__innerText {
    color: #037CF4;
  }
}
</style>