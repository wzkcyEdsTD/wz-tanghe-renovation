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
import {
  getProjConsdatee,
} from "api/tangheAPI";
export default {
  props: ["zrdw"],
  data() {
    return {
      lineEchart: null,
      investData: []
    };
  },
  methods: {
    async initData() {
      let res = await getProjConsdatee({sysOrgCode: this.zrdw})
      if (res.code === 200) {
        this.investData = res.result
        this.drawLine()
      }
    },
    drawLine() {
      let nameList = []
      let numberList = []
      this.investData.forEach(item => {
        if (item.name) {
          nameList.push(item.name.substr(0, 10))
          numberList.push(item.projAmountSum.toFixed(2))
        }
      })
      this.lineEchart = this.$echarts.init(this.$refs.lineEchart);
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
            },
          },
        },
        xAxis: {
          name: '时间',
          axisTick: {
            show: true,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(255, 255, 255, 0.7)",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#fff",
          },
          data: nameList,
        },
        yAxis: {
          name: '投资计划(万元)',
          nameTextStyle: {
            color: "rgba(255, 255, 255, 0.7)",
          },
          splitNumber: 3,
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
        dataZoom : [
          {
            type: 'slider',
            show: true,
            start: 0,
            end: 50,
            width: "90%",
            height: "5%",
            bottom: 0,
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
            data: numberList,
          },
        ],
      });
      window.addEventListener("resize", () => {
        this.lineEchart.resize();
      });
    },
  },
  mounted() {
    this.initData()
  },
  watch: {
    zrdw(val) {
      this.drawLine()
    }
  },
};
</script>

<style lang="less" scoped>
@import url("./PartMiddle.less");
</style>