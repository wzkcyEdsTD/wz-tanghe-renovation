<template>
  <div class="regionAnalysis">
    <div class="title-wrapper">
      <span class="pre"></span>
      <span class="title">区域分析统计</span>
    </div>
    <div class="titleFlex">
      <span>项目统计（个）</span>
      <el-select v-model="value" class="select" @change="selectChange">
        <el-option
          v-for="item in regionData"
          :key="item.sysOrgCode"
          :label="item.deptName"
          :value="item.sysOrgCode"
        >
        </el-option>
      </el-select>
    </div>
    <div style="height: 30vh; width: 45vh" ref="barEchart"></div>
  </div>
</template>

<script>
export default {
  props: ["regionData"],
  data() {
    return {
      value: "A02A01",
      barEchart: null,
    };
  },
  methods: {
    selectChange(e) {
      console.log('selectChange', e)
      this.drawBar(e)
    },
    drawBar(regionCode) {
      let nameList
      let numberList
      this.regionData.forEach(item => {
        if (item.sysOrgCode == regionCode) {
          nameList = item.streetInfos.map(streetInfo => {
            return streetInfo.streetName
          })
          numberList = item.streetInfos.map(streetInfo => {
            return streetInfo.streetSum
          })
        }
      })
      this.barEchart = this.$echarts.init(this.$refs.barEchart);
      this.barEchart.setOption({
        grid: {
          top: 10,
        },
        xAxis: {
          data: nameList,
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
          // max: 70,
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
            data: numberList,
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
      window.addEventListener("resize", () => {
        this.barEchart.resize();
      });
    },
  },
  mounted() {
  },
  watch: {
    regionData(val) {
      this.drawBar(this.value);
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./regionAnalysis.less");
</style>
<style>
.el-select-dropdown {
  background-color: rgba(0, 28, 146, 0.6) !important;
  border: 1px solid #165fea !important;
}
.el-select-dropdown__item {
  color: #fff;
}
.el-select-dropdown__item.hover {
  background: none !important;
}
.el-select-dropdown__item.selected {
  color: #69FEE5;
}
</style>
