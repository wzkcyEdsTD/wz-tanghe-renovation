<template>
  <div class="partMiddle">
    <div class="top">
      <img src="./images/bg.png" alt="" />
    </div>
    <div class="bottom">
      <div class="title-wrapper">
        <span class="pre"></span>
        <span class="title">项目投资计划表</span>
      </div>
      <div
        style="margin-top: 1vh; height: 30vh; width: 100%"
        ref="lineEchart"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lineEchart: null,
    };
  },
  methods: {
    getFontSize() {
      let e = this.screenWidth;
      if (e > 4000) {
        e = 16;
      } else {
        e = 12;
      }
      return e;
    },
    drawLine() {
      this.lineEchart = this.$echarts.init(this.$refs.lineEchart);
      const that = this;
      let e = this.getFontSize();
      console.log(e);
      this.lineEchart.setOption({
        legend: {
          orient: "horizontal",
          top: "0",
          left: "24%",
          icon: "rect",
          itemWidth: 6,
          itemHeight: 6,
          textStyle: {
            color: "#fff",
          },
          data: ["1"],
        },
        color: ["#8C6AFF"],
        grid: {
          left: "5%",
          top: "8%",
          width: "90%",
          height: "90%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            label: {
              backgroundColor: "#6a7985",
              textStyle: {
                fontSize: e,
              },
            },
          },
        },
        xAxis: {
          name: '时间',
          // boundaryGap: false,
          axisTick: {
            show: true,
          },
          // splitLine: {
          //   show: true,
          //   lineStyle: {
          //     type: "dotted",
          //     color: "#5C5C5C",
          //   },
          // },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(255, 255, 255, 0.7)",
            },
          },
          axisLabel: {
            // rotate: 40,
            interval: 0,
            color: "#fff",
            textStyle: {
              // fontSize:12
              fontSize: e,
            },
          },
          data: [
            "2020.12",
            "2021.1",
            "2021.2",
            "2021.3",
            "2021.4",
            "2021.5",
            "2021.6",
            "2021.7",
            "2021.8",
            "2021.9",
            "2021.10",
            "2021.11",
            "2021.12"
          ],
        },
        yAxis: {
          name: '投资计划(万元)',
          nameTextStyle: {
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: 16
          },
          splitNumber: 3,
          // axisLine: {
          //   show: false,
          // },
          // axisLine: {
          //   show: true,
          //   lineStyle: {
          //     color: "rgba(255, 255, 255, 0.7)",
          //   },
          // },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#fff",
              fontSize: e,
            },
          },
          splitLine: {
            show: false,
          },
        },
        dataZoom : [
          {
            type: 'slider',
            show: true,
            start: 0,
            end: 50,
            width: "90%",
            height: "5%",
            // right:'1%',
            // left:'1%',
            bottom: 0,
            // xAxisIndex: [0],
          },
        ],
        series: [
          {
            type: "line",
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
              color: "#8C6AFF"
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#371A98" },
                ]),
              },
            },
            data: [200, 191, 212, 198, 230, 240, 171, 212, 240, 340, 270, 140, 280],
          },
        ],
      });
      window.addEventListener("resize", function () {
        that.lineEchart.resize();
      });
    },
  },
  mounted() {
    this.drawLine();
  },
};
</script>

<style lang="less" scoped>
@import url("./PartMiddle.less");
</style>