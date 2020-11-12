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
          <div class="number">{{investData[zrdw].gov}}<span class="small">个</span></div>
          <div class="desc">政府性投资</div>
        </div>
        <div class="item">
          <img src="./images/podetium.png">
          <div class="number">{{investData[zrdw].social}}<span class="small">个</span></div>
          <div class="desc">社会性投资</div>
        </div>
      </div>
      <div class="complete-rate">
        <span class="desc">完成率：</span>
        <el-progress :text-inside="true" :stroke-width="22" :percentage="investData[zrdw].complete"></el-progress>
      </div>
    </div>
    <div class="middle">
      <div class="title-wrapper">
        <span class="pre"></span> 
        <span class="title">建设类型分析</span>
      </div>
      <div class="content">
        <div class="item" v-for="(item,index) in buildData[zrdw]" :key="index">
          <div class="title">
            <div class="type">{{item.title}}&nbsp;</div>
            <div class="number" :class="`number${index+1}`">{{item.number}}</div>个
          </div>
          <div class="dash"></div>
          <div class="img-box" :class="`img-box${index+1}`">
            <img :src="require(`./images/pie${index+1}.png`)">
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
  props: ["zrdw"],
  data() {
    return {
      investData: {
        lucheng: {gov: 15, social: 3, complete: 13.64},
        longwan: {gov: 10, social: 0, complete: 10},
        ouhai: {gov: 15, social: 2, complete: 17.40},
        ruian: {gov: 7, social: 0, complete: 0},
        zhenan: {gov: 1, social: 0, complete: 0},
        chengfa: {gov: 12, social: 0, complete: 8.33},
        xiandai: {gov: 4, social: 0, complete: 28.57},
      },
      buildData: {
        lucheng: [{title:'基础类', number: 9}, {title:'公共类', number: 6}, {title:'专业类', number: 2}, {title:'其他', number: 1}],
        longwan: [{title:'基础类', number: 6}, {title:'公共类', number: 2}, {title:'专业类', number: 0}, {title:'其他', number: 0}],
        ouhai: [ {title:'公共类', number: 9}, {title:'基础类', number: 7}, {title:'专业类', number: 1}, {title:'其他', number: 0}],
        ruian: [{title:'基础类', number: 6}, {title:'公共类', number: 1}, {title:'专业类', number: 0}, {title:'其他', number: 0}],
        zhenan: [{title:'基础类', number: 1}, {title:'公共类', number: 0}, {title:'专业类', number: 0}, {title:'其他', number: 0}],
        chengfa: [{title:'基础类', number: 7}, {title:'公共类', number: 4}, {title:'专业类', number: 1}, {title:'其他', number: 0}],
        xiandai: [{title:'专业类', number: 3}, {title:'基础类', number: 0}, {title:'公共类', number: 1}, {title:'其他', number: 0}],
      },
      regionData: {
        longwan: {
          street: ['海滨街道', '蒲州街道', '瑶溪街道', '永兴街道', '永中街道', '状元街道'],
          number: [0.21, 19.36, 24.03, 1, 0.62, 0.08]
        },
        lucheng: {
          street: ['滨江街道', '大南街道', '广化街道', '南汇街道', '南郊街道', '蒲鞋市街道', '松台街道'],
          number: [0.06, 0.55, 6.19, 8.51, 2.53, 1.03, 31.63]
        },
        ouhai: {
          street: ['景山街道', '南白象街道', '梧田街道', '新桥街道'],
          number: [1.7, 15.04, 60.2, 38.22]
        },
        ruian: {
          street: ['安阳街道', '东山街道', '上望街道', '莘塍街道', '塘下镇', '汀田街道'],
          number: [0.08, 0.57, 1.44, 0.23, 0.15, 17.53]
        },
        chengfa: {
          street: ['大南街道', '南汇街道', '南郊街道', '蒲鞋市街道', '蒲州街道', '梧埏镇', '梧田街道', '永中街道'],
          number: [0.06, 2.86, 3.56, 19.04, 1.06, 5, 0, 3]
        },
        xiandai: {
          street: ['大南街道', '丽岙街道', '南白象街道', '新桥街道'],
          number: [2.09, 4.1, 0.43, 0.42]
        },
        zhenan: {
          street: ['海城街道', '永中街道'],
          number: [0.3, 11.49]
        }
      },
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
          // data: [
          //   "滨江街道",
          //   "大南街道",
          //   "广化街道",
          //   "南郊街道",
          //   "南汇街道",
          //   "松台街道",
          //   "蒲鞋市街道",
          // ],
          data: this.regionData[this.zrdw].street,
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
            // data: [450, 370, 260, 320, 500, 190, 220],
            data: this.regionData[this.zrdw].number,
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
  watch: {
    zrdw(val) {
      this.drawBar()
    }
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