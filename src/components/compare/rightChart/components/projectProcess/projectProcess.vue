<template>
  <div class="projectProcess">
    <div class="title-wrapper">
      <span class="pre"></span>
      <span class="title">项目全过程分析占比</span>
    </div>
    <div
      style="height: 32vh; width: 100%; padding-top: 2vh"
      ref="barEchart"
    ></div>
  </div>
</template>

<script>
import { getProjStatusByDept } from "api/tangheAPI";
export default {
  data() {
    return {
      processData: [],
      barEchart: null,
    };
  },
  methods: {
    async initData() {
      let res = await getProjStatusByDept()
      if (res.code === 200) {
        this.processData = res.result
        this.drawBars();
      }
    },
    drawBars() {
      let nameList = []
      let statusObj = {
        '前期研究': [],
        '前期(滞后)': [],
        '在建': [],
        '在建(滞后)': [],
        '完工': []
      }
      this.processData.forEach((item, index) => {
        nameList.push(item.deptName)
        for (let key in statusObj) {
          statusObj[key].push(0)
        }
        item.statusInfos.forEach(statusInfo => {
          statusObj[statusInfo.name][index] = statusInfo.rate.toFixed(2)
        })
      })
      this.barEchart = this.$echarts.init(this.$refs.barEchart);
      this.barEchart.setOption({
        legend: {
          data: ["前期研究", "前期(滞后)", "在建", "在建(滞后)", "完工"],
          textStyle: {
            color: "#fff",
          },
          // itemWidth: 14,
          // itemHeight: 14,
          // padding:[0,30],
        },
        grid: {
          left: 0,
          right: 0,
          bottom: "3%",
          containLabel: true,
        },
        yAxis: {
          type: "value",
          axisLabel: {
            color: "#fff",
          },
          axisLine: {
            lineStyle: {
              type: "dashed",
              color: "#fff",
            },
          },
          splitLine: {
            //网格线
            show: false,
          },
          axisTick: {
            //x轴刻度线
            show: false,
          },
        },
        xAxis: {
          type: "category",
          data: nameList,
          axisLabel: {
            rotate: 40,
            color: "#fff",
          },
          axisTick: {
            //x轴刻度线
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff",
            },
          },
        },
        series: [
          {
            name: "前期研究",
            type: "bar",
            stack: "总量",
            color: "#A2F6B6",
            label: {
              show: true,
              formatter: "{c}%",
            },
            data: statusObj['前期研究'],
          },
          {
            name: "前期(滞后)",
            type: "bar",
            stack: "总量",
            color: "#16E8E8",
            label: {
              show: true,
              formatter: "{c}%",
            },
            data: statusObj['前期(滞后)'],
          },
          {
            name: "在建",
            type: "bar",
            stack: "总量",
            color: "#52D1FE",
            label: {
              show: true,
              formatter: "{c}%",
            },
            data: statusObj['在建'],
          },
          {
            name: "在建(滞后)",
            type: "bar",
            stack: "总量",
            color: "#5286FE",
            label: {
              show: true,
              formatter: "{c}%",
            },
            data: statusObj['在建(滞后)'],
          },
          {
            name: "完工",
            type: "bar",
            stack: "总量",
            color: "#6852FE",
            label: {
              show: true,
              formatter: "{c}%",
            },
            data: statusObj['完工'],
          },
        ],
      });
      window.addEventListener("resize", () => {
        this.barEchart.resize();
      });
    },
  },
  mounted() {
    this.initData()
  },
};
</script>

<style lang="less" scoped>
@import url("./projectProcess.less");
</style>
