<template>
  <div class="partLeft">
    <div class="top">
      <div class="title-wrapper">
        <span class="pre"></span>
        <span class="title">投资类型分析</span>
      </div>
      <div class="content">
        <div class="item">
          <img src="./images/podetium.png" />
          <div class="number">
            {{ investData.gov }}<span class="small">个</span>
          </div>
          <div class="desc">政府性投资</div>
        </div>
        <div class="item">
          <img src="./images/podetium.png" />
          <div class="number">
            {{ investData.social }}<span class="small">个</span>
          </div>
          <div class="desc">社会性投资</div>
        </div>
      </div>
      <div class="complete-rate">
        <span class="desc">完成率：</span>
        <el-progress
          :text-inside="true"
          :stroke-width="22"
          :percentage="investData.rate"
        ></el-progress>
      </div>
    </div>
    <div class="middle">
      <div class="title-wrapper">
        <span class="pre"></span>
        <span class="title">建设类型分析</span>
      </div>
      <div class="content">
        <div class="item" v-for="(item, index) in buildArr" :key="index">
          <div class="title">
            <div class="type">{{ item }}&nbsp;</div>
            <div class="number" :class="`number${index + 1}`">{{ buildData[item] }}</div>
            个
          </div>
          <div class="dash"></div>
          <div class="img-box" :class="`img-box${index + 1}`">
            <img :src="require(`./images/pie${index + 1}.png`)" />
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="title-wrapper">
        <span class="pre"></span>
        <span class="title">区域投资额</span>
      </div>
      <div
        style="margin-top: 1vh; height: 30vh; width: 45vh"
        ref="barEchart"
      ></div>
    </div>
  </div>
</template>

<script>
import {
  getProjFundType,
  getProjStatusAmound,
  getProjConsType,
} from "api/tangheAPI";
export default {
  props: ["zrdw", "regionData"],
  data() {
    return {
      investData: {
        gov: 0,
        social: 0,
        rate: 0,
      },
      buildData: {
        基础类: 0,
        公共类: 0,
        产业类: 0,
        其他: 0,
      },
      // regionData: {
        // longwan: {
        //   street: [
        //     "海滨街道",
        //     "蒲州街道",
        //     "瑶溪街道",
        //     "永兴街道",
        //     "永中街道",
        //     "状元街道",
        //   ],
        //   number: [0.21, 19.36, 24.03, 1, 0.62, 0.08],
        // }
        // street: [],
        // number: []
      // },
      barEchart: null,
    };
  },
  computed: {
    buildArr() {
      let res = Object.keys(this.buildData).sort((a, b) => {
        return this.buildData[b] - this.buildData[a];
      });
      return res
    },
  },
  methods: {
    async initData() {
      let fundTypeRes = await getProjFundType({ sysOrgCode: this.zrdw });
      if (fundTypeRes.code === 200) {
        fundTypeRes.result.forEach((item) => {
          if (item.name === "社会性投资") {
            this.investData.social = item.num;
          }
          if (item.name === "政府性投资") {
            this.investData.gov = item.num;
          }
        });
      }
      let statusRes = await getProjStatusAmound({
        sysOrgCode: `*${this.zrdw}*`,
        status: "*完工*",
      });
      if (statusRes.code === 200) {
        this.investData.rate = Number(statusRes.result.stsRate.toFixed(2));
      }
      let consTypeRes = await getProjConsType({ sysOrgCode: this.zrdw });
      if (consTypeRes.code === 200) {
        consTypeRes.result.forEach((item) => {
          if (~item.name.indexOf("基础类")) {
            this.buildData["基础类"] = item.num;
          }
          if (~item.name.indexOf("公共类")) {
            this.buildData["公共类"] = item.num;
          }
          if (~item.name.indexOf("产业类")) {
            this.buildData["产业类"] = item.num;
          }
          if (~item.name.indexOf("其他")) {
            this.buildData["其他"] = item.num;
          }
        });
      }
    },
    drawBar() {
      let nameList
      let numberList
      this.regionData.forEach(item => {
        if (~item.sysOrgCode.indexOf(this.zrdw)) {
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
    this.initData();
    this.drawBar();
  },
  watch: {
    zrdw(val) {
      this.drawBar()
    }
  },
};
</script>

<style lang="less" scoped>
@import url("./PartLeft.less");
</style>
<style lang="less">
// .el-progress {
//   display: inline;
// }
.el-progress-bar {
  width: 70%;
  .el-progress-bar__outer {
    border: 1px solid #0d7b8e;
    background-color: #02364f;
  }
  .el-progress-bar__inner {
    background-color: #16e8e8;
  }
  .el-progress-bar__innerText {
    color: #037cf4;
  }
}
</style>