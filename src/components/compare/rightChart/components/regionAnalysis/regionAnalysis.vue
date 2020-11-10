<template>
  <div class="regionAnalysis">
    <div class="title-wrapper">
      <span class="pre"></span>
      <span class="title">区域分析统计</span>
    </div>
    <div class="titleFlex">
      <span>单位：个</span>
      <el-select v-model="value" placeholder="鹿城区" class="select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div style="height: 30vh; width: 45vh" ref="barEchart"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "鹿城区",
        },
        {
          value: "选项2",
          label: "龙湾区",
        },
        {
          value: "选项3",
          label: "瓯海区",
        },
        {
          value: "选项4",
          label: "瑞安市政府",
        },
        {
          value: "选项5",
          label: "浙南产业区",
        },
        {
          value: "选项6",
          label: "现代集团",
        },
        {
          value: "选项7",
          label: "城发集团",
        },
      ],
      value: "",
      barEchart: null,
    };
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
          max: 70,
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
            data: [45, 37, 26, 32, 50, 19, 22],
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
  },
};
</script>

<style lang="less" scoped>
@import url("./regionAnalysis.less");
</style>
<style>
.el-input {
  width: 45% !important;
  border-width: 0.5vh;
  border-color: #165fea;
}
</style>
