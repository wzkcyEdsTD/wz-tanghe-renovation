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
          value: "lucheng",
          label: "鹿城区",
        },
        {
          value: "longwan",
          label: "龙湾区",
        },
        {
          value: "ouhai",
          label: "瓯海区",
        },
        {
          value: "ruian",
          label: "瑞安市",
        },
        {
          value: "zhenan",
          label: "浙南产业区",
        },
        {
          value: "xiandai",
          label: "现代集团",
        },
        {
          value: "chengfa",
          label: "城发集团",
        },
      ],
      regionData: {
        longwan: {
          street: ['海滨街道', '蒲州街道', '瑶溪街道', '永兴街道', '永中街道', '状元街道'],
          number: [2, 3, 1, 1, 2, 1]
        },
        lucheng: {
          street: ['滨江街道', '大南街道', '广化街道', '南汇街道', '南郊街道', '蒲鞋市街道', '松台街道'],
          number: [1, 2, 1, 5, 7, 4, 2]
        },
        ouhai: {
          street: ['景山街道', '南白象街道', '梧田街道', '新桥街道'],
          number: [3, 11, 6, 3]
        },
        ruian: {
          street: ['安阳街道', '东山街道', '上望街道', '莘塍街道', '塘下镇', '汀田街道'],
          number: [2, 1, 2, 2, 1, 3]
        },
        chengfa: {
          street: ['大南街道', '南汇街道', '南郊街道', '蒲鞋市街道', '蒲州街道', '梧埏镇', '梧田街道', '永中街道'],
          number: [1, 3, 1, 2, 2, 1, 1, 1]
        },
        xiandai: {
          street: ['大南街道', '丽岙街道', '南白象街道', '新桥街道'],
          number: [4, 1, 1, 1]
        },
        zhenan: {
          street: ['海城街道', '永中街道'],
          number: [1, 1]
        }
      },
      value: "lucheng",
      barEchart: null,
    };
  },
  methods: {
    selectChange(e) {
      console.log('selectChange', e)
      this.drawBar(e)
    },
    drawBar(region) {
      const that = this;
      this.barEchart = this.$echarts.init(this.$refs.barEchart);
      this.barEchart.setOption({
        grid: {
          top: 10,
        },
        xAxis: {
          // data: [
          //   "滨江街道",
          //   "大南街道",
          //   "广化街道",
          //   "南郊街道",
          //   "南汇街道",
          //   "松台街道",
          //   "蒲鞋市街道",
          // ],
          data: this.regionData[region].street,
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
            // data: [45, 37, 26, 32, 50, 19, 22],
            data: this.regionData[region].number,
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
    this.drawBar(this.value);
  },
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
