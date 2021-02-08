<template>
  <div class="layerhub-wrapper">
    <div class="left-wrapper">
      <div class="left-content">
        <ul class="zrdw-list">
          <li
            class="zrdw-item"
            :class="{ active: currentZrdw.title == item.title }"
            v-for="(item, index) in zrdwList"
            :key="index"
            @click="selectZrdw(item)"
          >
            <span>{{ item.title }}</span>
          </li>
        </ul>
        <div class="xm-container" v-show="currentType == 'xm'">
          <div class="titleHxhb-wrapper">
            <span class="pre"></span>
            <span class="title">列表</span>
          </div>
          <div class="search-header">
            <el-input
              v-model="searchXMText"
              class="searchFilterInput"
              placeholder="输入查找内容"
              size="small"
              @keyup.enter.native="searchXMFilter"
            />
            <div class="button-container">
              <div class="button-item">
                <i class="icon-common icon-clear" @click="searchXMClear"></i>
              </div>
              <div class="button-item">
                <i class="icon-common icon-search" @click="searchXMFilter"></i>
              </div>
            </div>
          </div>
          <ul id="xm-list" class="xm-list">
            <li
              class="xm-item"
              v-for="(item, index) in currentList"
              :key="index"
              :class="{ xmActive: activeId == item.resourceId }"
              @click="itemClick(item)"
            >
              <div
                class="name"
                :style="{
                  color: item.color == '1' ? '#FF9124' : '#14D1D1',
                }"
              >
                {{ index + 1 }}.{{ item.name }}
              </div>
              <div class="info-box" v-if="item.resourceType == 'project_all'">
                <div class="info-item">
                  <div class="key">建设状态</div>
                  <div class="value">{{ item.status }}</div>
                </div>
                <div class="split"></div>
                <div class="info-item">
                  <div class="key">投资计划</div>
                  <div class="value">{{ item.totalamount }}万元</div>
                </div>
                <div class="split"></div>
                <div class="info-item jcsj">
                  <div class="key">计划建成时间</div>
                  <div class="value">{{ item.consdatee }}</div>
                </div>
              </div>
              <div class="info-box" v-if="item.resourceType == 'greenway_all'">
                <div class="info-item">
                  <div class="key">计划贯穿时间</div>
                  <div class="value">{{ item.consdatee }}</div>
                </div>
                <div class="split"></div>
                <div class="info-item">
                  <div class="key">长度（米）</div>
                  <div class="value">{{ item.length }}</div>
                </div>
              </div>
            </li>
          </ul>
          <div class="no-tip" v-show="!currentList.length">暂无数据</div>
        </div>
        <div class="mark-container">
          <img class="button" src="./images/mark.png" @click="goMark" />
          <img class="line" src="./images/mark-line.png" />
        </div>
      </div>
    </div>
    <div class="right-content" v-show="changeType == 'other'">
      <div class="xmtj-container" v-show="currentType == 'xm'">
        <div class="titleHxhb-wrapper">
          <span class="pre"></span>
          <span class="title">项目统计-{{ currentZrdw.title }}</span>
        </div>
        <div class="base-info">
          <div class="base-item">
            <div class="leftPicture">
              <img src="./images/球-蓝.png" alt="" style="width: 13vh" />
            </div>
            <div class="title" style="color: #2fc8e9">总数</div>
            <div class="text">
              {{ currentData.num }}<span class="unit">个</span>
            </div>
            <img src="./images/台子-蓝.png" alt="" class="leftPictureBottom" />
          </div>
          <div class="base-item">
            <div class="rightPicture">
              <img src="./images/球-红.png" alt="" style="width: 15vh" />
            </div>
            <div class="titleRight" style="color: #f53a90">年度总投资额</div>
            <div class="textRight">
              {{ currentData.amount }}<span class="unit">亿元</span>
            </div>
            <img src="./images/台子-红.png" alt="" class="rightPictureBottom" />
          </div>
        </div>
        <div class="content-box">
          <div class="content-title">
            <span class="pre"></span>
            <div class="title">年度开工完成率</div>
          </div>
          <div class="content-item">
            <p class="text">年度计划开工项目数</p>
            <span class="number blue">{{ currentData.jhkg_num }}</span>
            <span class="unit">个</span>
          </div>
          <div class="content-item">
            <p class="text">年度累计开工项目数</p>
            <span class="number orange">{{ currentData.ljkg_num }}</span>
            <span class="unit">个</span>
          </div>
          <div class="progress-wrapper">
            <div
              class="progress"
              :style="{ width: `${currentData.kg_rate / 2}%` }"
            ></div>
            <span class="rate">{{ currentData.kg_rate }}%</span>
          </div>
        </div>
        <div class="content-box">
          <div class="content-title">
            <span class="pre"></span>
            <div class="title">年度计划建成完成率</div>
          </div>
          <div class="content-item">
            <p class="text">年度计划建成项目数</p>
            <span class="number blue">{{ currentData.jhjc_num }}</span>
            <span class="unit">个</span>
          </div>
          <div class="content-item">
            <p class="text">年度累计建成项目数</p>
            <span class="number orange">{{ currentData.ljjc_num }}</span>
            <span class="unit">个</span>
          </div>
          <div class="progress-wrapper">
            <div
              class="progress"
              :style="{ width: `${currentData.jc_rate / 2}%` }"
            ></div>
            <span class="rate">{{ currentData.jc_rate }}%</span>
          </div>
        </div>
        <div class="content-box">
          <div class="content-title">
            <span class="pre"></span>
            <div class="title">年度投资完成率</div>
          </div>
          <div class="content-item">
            <p class="text">年度计划总投资</p>
            <span class="number blue">{{ currentData.jhtz_num }}</span>
            <span class="unit">亿元</span>
          </div>
          <div class="content-item">
            <p class="text">年度累计投资额</p>
            <span class="number orange">{{ currentData.ljtz_num }}</span>
            <span class="unit">亿元</span>
          </div>
          <div class="progress-wrapper">
            <div
              class="progress"
              :style="{ width: `${currentData.tz_rate / 2}%` }"
            ></div>
            <span class="rate">{{ currentData.tz_rate }}%</span>
          </div>
        </div>
        <div class="content-box">
          <div class="content-title">
            <span class="pre"></span>
            <div class="title">年度政府性投资完成率</div>
          </div>
          <div class="content-item">
            <p class="text">年度计划政府性投资</p>
            <span class="number blue">{{ currentData.jhzf_num }}</span>
            <span class="unit">亿元</span>
          </div>
          <div class="content-item">
            <p class="text">年度累计完成政府性投资</p>
            <span class="number orange">{{ currentData.ljzf_num }}</span>
            <span class="unit">亿元</span>
          </div>
          <div class="progress-wrapper">
            <div
              class="progress"
              :style="{ width: `${currentData.zf_rate / 2}%` }"
            ></div>
            <span class="rate">{{ currentData.zf_rate }}%</span>
          </div>
        </div>
      </div>
    </div>
    <div class="right-content" v-show="changeType == 'all'">
      <div class="xmtj-container" v-show="currentType == 'xm'">
        <div class="titleHxhb-wrapper">
          <span class="pre"></span>
          <span class="title">各责任单位指标排行</span>
        </div>
        <div class="content-box">
          <div class="sub-title-wrapper">
            <div class="sub-title">项目数量</div>
            <div class="decorate"></div>
          </div>
          <div class="chart-wrapper">
            <p class="xiaobiaoti">{{ "单位(个)" }}</p>
            <div
              style="height: 16vh; width: 100%"
              class="echart"
              ref="xmslEchart"
            ></div>
          </div>
        </div>
        <div class="content-box">
          <div class="sub-title-wrapper">
            <div class="sub-title">年度项目总投资额</div>
            <div class="decorate"></div>
          </div>
          <div class="amount-rank">
            <div
              class="amount-item bg1"
              v-for="(item, index) in amountData.slice(0, 3)"
              :key="index"
            >
              <div class="number">
                {{ (item.num1/10000).toFixed(1) }}<span class="unit">亿元</span>
              </div>
              <div class="name">{{ item.name }}</div>
            </div>
          </div>
          <div class="amount-rank" style="margin-top: 1.5vh">
            <div
              class="amount-item bg2"
              v-for="(item, index) in amountData.slice(3)"
              :key="index"
            >
              <div class="number">
                {{ (item.num1/10000).toFixed(1) }}<span class="unit">亿元</span>
              </div>
              <div class="name">{{ item.name }}</div>
            </div>
          </div>
        </div>
        <div class="content-box">
          <div class="sub-title-wrapper">
            <div class="sub-title">年度计划建成项目完成率</div>
            <div class="decorate"></div>
          </div>
          <div class="rate-rank">
            <div
              class="rate-item"
              v-for="(item, index) in finishData"
              :key="index"
            >
              <p class="name">{{ item.name }}</p>
              <el-progress
                class="goodrate"
                :text-inside="true"
                :stroke-width="26"
                :percentage="Number((item.p*100).toFixed(1))"
              ></el-progress>
            </div>
          </div>
        </div>
        <div class="content-box">
          <div class="sub-title-wrapper">
            <div class="sub-title">年度投资完成率</div>
            <div class="decorate"></div>
          </div>
          <div class="invest-rank">
            <div
              class="invest-item"
              v-for="(item, index) in investData.slice(0, 3)"
              :key="index"
            >
              <el-progress
                type="circle"
                class="goodinvest"
                :width="investCircleWidth"
                :percentage="Number((item.p*100).toFixed(1))"
                color="#00FFFF"
                base-color="rgba(255,255,255,0.1)"
                :inner-circle="true"
                innerCircleColor="(rgba(0,0,0,0.15),rgba(0,225,255,0.49))"
              ></el-progress>
              <p class="name">{{ item.name }}</p>
            </div>
          </div>
          <div class="invest-rank">
            <div
              class="invest-item"
              v-for="(item, index) in investData.slice(3)"
              :key="index"
            >
              <el-progress
                type="circle"
                class="badinvest"
                :width="investCircleWidth"
                :percentage="Number((item.p*100).toFixed(1))"
                color="#8DE1FF"
                base-color="rgba(255,255,255,0.1)"
                :inner-circle="true"
                innerCircleColor="(rgba(0,0,0,0.15),rgba(141,225,255,0.49))"
              ></el-progress>
              <p class="name">{{ item.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="sign-wrapper" style="right: 22%" v-show="showSign">
      <img src="/static/images/common/sign2@2x.png" />
    </div>
    <MapTool v-show="showMapTool" /> -->
    <MarkRule v-if="showMark" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { treeDrawTool } from "../../sourcelayer/layerHub/TreeDrawTool";
import { getIserverFields } from "api/iServerAPI";
import MarkRule from "./components/MarkRule";
// import MapTool from "../../sourcelayer/layerHub/components/mapTool";
import { drawJSQK, drawWGJH, drawXMSL } from "./EchartsDrawTool";
import {
  queryMeetingSortFront,
  countProjForCurAmound,
  countProjByConsdates2,
  countProjByConsdatee2,
  countProjByAmound,
} from "api/tangheAPI";

const orientation = {
  heading: 0.01768860454315663,
  pitch: Cesium.Math.toRadians(-90),
  roll: 0.0,
};

export default {
  name: "LayerHub",
  components: {
    // MapTool,
    MarkRule,
  },
  data() {
    return {
      // showSign: true,
      // showMapTool: true,
      showLarge: window.showLarge,
      currentType: "xm",
      changeType: "all",
      zrdwList: [
        { title: "指挥部", sysOrgCode: "A02" },
        { title: "鹿城区政府", sysOrgCode: "A02A01" },
        { title: "龙湾区政府", sysOrgCode: "A02A03" },
        { title: "瓯海区政府", sysOrgCode: "A02A02" },
        { title: "瑞安市政府", sysOrgCode: "A02A04" },
        { title: "浙南产业区", sysOrgCode: "A02A05" },
        { title: "温州城发集团", sysOrgCode: "A02A07" },
        { title: "温州现代集团", sysOrgCode: "A02A06" },
      ],
      currentZrdw: { title: "指挥部", sysOrgCode: "A02" },
      allList: [],
      currentList: [],
      searchXMText: "",
      wgjhEchart: null,
      xmslEchart: null,
      activeId: "",
      showMark: false,
      startData: [],
      finishData: [],
      amountData: [],
      investData: [],
      zfInvestData: [],
      currentData: {
        num: 0,
        amount: 0,
        jhkg_num: 0,
        ljkg_num: 0,
        kg_rate: 0,
        jhjc_num: 0,
        ljjc_num: 0,
        jc_rate: 0,
        jhtz_num: 0,
        ljtz_num: 0,
        tz_rate: 0,
        jhzf_num: 0,
        ljzf_num: 0,
        zf_rate: 0,
      },
      investCircleWidth: 0,
    };
  },
  computed: {
    ...mapGetters("map", ["sourceMap"]),
  },
  methods: {
    ...mapActions("map", ["setSourceMap"]),
    async initData() {
      let listRes = await queryMeetingSortFront();
      console.log("listRes", listRes);
      if (listRes.code === 200) {
        this.allList = listRes.result;
        this.getCurrentList(true);
      }

      let res1 = await countProjForCurAmound();
      if (res1.code === 200) {
        let result = res1.result;
        result.sort((a, b) => {
          if (a.num < b.num) {
            return 1;
          } else if (a.num > b.num) {
            return -1;
          } else {
            return 0;
          }
        });
        console.log('xmsllllll', result)
        drawXMSL(this, result);

        this.amountData = JSON.parse(JSON.stringify(result))
        this.amountData.sort((a, b) => {
          if (a.num1 < b.num1) {
            return 1;
          } else if (a.num1 > b.num1) {
            return -1;
          } else {
            return 0;
          }
        });
        console.log('amountData', this.amountData)
      }

      let res4 = await countProjByConsdates2()
      if (res4.code === 200) {
        this.startData = res4.result
        console.log('startData', this.startData)
      }

      let res2 = await countProjByConsdatee2()
      if (res2.code === 200) {
        this.finishData = res2.result
        this.finishData.sort((a, b) => {
          if (a.p < b.p) {
            return 1;
          } else if (a.p > b.p) {
            return -1;
          } else {
            return 0;
          }
        });
        console.log('finishData', this.finishData)
      }

      let res3 = await countProjByAmound()
      if (res3.code === 200) {
        this.investData = res3.result
        this.investData.sort((a, b) => {
          if (a.p < b.projectDetailPopup) {
            return 1;
          } else if (a.p > b.p) {
            return -1;
          } else {
            return 0;
          }
        });
        this.$nextTick(() => {
          let investCircleDiv = document.getElementsByClassName("invest-item")[0];
          this.investCircleWidth = investCircleDiv.clientWidth;
        });
        console.log('investData', this.investData)
      }

      let res5 = await countProjByAmound({consType: '政府性投资'})
      if (res5.code === 200) {
        this.zfInvestData = res5.result
        console.log('zfInvestData', this.zfInvestData)
      }      
    },
    getCurrentList(draw) {
      let tempObj = this.allList.find((item) => {
        return item.sysOrgCode == this.currentZrdw.sysOrgCode;
      });
      this.currentList = tempObj.bsMeetingSortInfos.filter((item) => {
        if (item.resourceType == "project_all") {
          if (!item.status && !item.zt) {
            return false;
          }
        }
        return true;
      });

      if (draw) {
        // 清空地图标绘
        for (let i in window.billboardMap) {
          window.billboardMap[i]._billboards.map((v) => (v.show = false));
        }
        for (let i in window.blackLabelMap) {
          window.blackLabelMap[i].setAllLabelsVisible(false);
        }
        for (let i in window.whiteLabelMap) {
          window.whiteLabelMap[i].setAllLabelsVisible(false);
        }
        window.earth.dataSources.getByName("location")[0].entities.removeAll();

        let currentXmRes = this.currentList.filter((item) => {
          return item.resourceType == "project_all";
        });
        let currentDdRes = this.currentList.filter((item) => {
          return item.resourceType == "greenway_all";
        });
        treeDrawTool(
          this,
          { result: { features: currentXmRes } },
          { id: "项目", marker_icon: "项目" }
        );
        treeDrawTool(
          this,
          { result: { features: currentDdRes } },
          { id: "绿道断点", marker_icon: "断点" }
        );
      }
    },
    async selectZrdw(zrdw) {
      // 点击，列表回到顶部
      $("#xm-list").scrollTop(0);
      $("#dd-list").scrollTop(0);

      // 关闭详情
      this.$parent.$refs.projectDetailPopup.closeDetail();

      // 不再重复操作
      if (this.currentZrdw.title == zrdw.title) return;

      this.currentZrdw = zrdw;
      this.searchXMText = "";
      this.$bus.$emit("change-zrdw", { value: zrdw.sysOrgCode });

      if (zrdw.title === "指挥部") {
        this.changeType = "all";
      } else {
        this.changeType = "other";

        this.amountData.forEach(item => {
          if (item.name == zrdw.title) {
            this.currentData.num = item.num;
            this.currentData.amount = (item.num1/10000).toFixed(2);
          }
        })

        this.startData.forEach(item => {
          if (item.name == zrdw.title) {
            this.currentData.jhkg_num = item.num;
            this.currentData.ljkg_num = item.num1;
            this.currentData.kg_rate = (item.p*100).toFixed(1);
          }
        })

        this.finishData.forEach(item => {
          if (item.name == zrdw.title) {
            this.currentData.jhjc_num = item.num;
            this.currentData.ljjc_num = item.num1;
            this.currentData.jc_rate = (item.p*100).toFixed(1);
          }
        })

        this.investData.forEach(item => {
          if (item.name == zrdw.title) {
            this.currentData.jhtz_num = (item.num/10000).toFixed(2);
            this.currentData.ljtz_num = (item.num1/10000).toFixed(2);
            this.currentData.tz_rate = (item.p*100).toFixed(1);
          }
        })

        this.zfInvestData.forEach(item => {
          if (item.name == zrdw.title) {
            this.currentData.jhzf_num = (item.num/10000).toFixed(2);
            this.currentData.ljzf_num = (item.num1/10000).toFixed(2);
            this.currentData.zf_rate = (item.p*100).toFixed(1);
          }
        })

      }

      // 大屏下关闭多媒体窗口
      this.$bus.$emit("close-rightPlayer");
    },
    itemClick(item) {
      this.activeId = item.resourceId;

      let x = Number(item.lng);
      let y = Number(item.lat);
      let geometry = { x, y };

      // 定位图标，详情变换
      this.$parent.addLocationIcon(geometry, item.id);
      this.$parent.$refs.projectDetailPopup.closeCollapse();
      this.$parent.$refs.commonDetailPopup.closePopup();

      this.$parent.$refs.projectDetailPopup.getForceEntity(item);

      window.earth.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(x, y, 1200),
        orientation: orientation,
        complete: () => {
          this.$bus.$emit("clickFly");
        },
      });
    },
    searchXMFilter() {
      console.log("searchXMFilter", this.searchXMText);
      if (this.searchXMText) {
        this.currentList = this.currentList.filter((item) => {
          return item.name.indexOf(this.searchXMText) >= 0;
        });
      } else {
        this.getCurrentList(false);
      }
    },
    searchXMClear() {
      this.searchXMText = "";
      this.getCurrentList(false);
    },
    goMark() {
      this.showMark = true;
    },
  },
  mounted() {
    this.initData();
  },
  watch: {
    currentZrdw(val) {
      this.getCurrentList(true);
      if (val.title == "龙湾区政府") {
        window.earth.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            120.803145,
            27.933237,
            15000
          ),
          orientation: orientation,
        });
      } else if (val.title == "瑞安市政府") {
        window.earth.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            120.685643,
            27.792632,
            15000
          ),
          orientation: orientation,
        });
      } else if (val.title == "浙南产业区") {
        window.earth.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            120.789269,
            27.847479,
            15000
          ),
          orientation: orientation,
        });
      } else if (val.title == "瓯海区政府") {
        window.earth.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            120.646624,
            27.964185,
            15000
          ),
          orientation: orientation,
        });
      } else {
        window.earth.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            120.67625660935506,
            27.990332018707733,
            15000.0
          ),
          orientation: orientation,
        });
      }
    },
    currentType(val) {
      // 点击，列表回到顶部
      $("#xm-list").scrollTop(0);
      // 选中置空
      this.activeId = "";
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./layerHub.less");
</style>
<style lang="less">
.el-input__inner {
  background: transparent !important;
  border: none !important;
  color: white !important;
}
.el-progress--circle {
  &.goodinvest {
    .el-progress__text {
      color: #00ffff !important;
    }
  }
  &.badinvest {
    .el-progress__text {
      color: #8de1ff !important;
    }
  }
  .el-progress__text {
    font-size: 2vh !important;
  }
}
.goodrate {
  .el-progress-bar__outer {
    border: solid 1px #00618d;
    background-color: #00035c;
    .el-progress-bar__inner {
      background-color: unset;
      background-image: linear-gradient(to right, #3587d8, #f14bff);
      border-radius: 0;
      max-width: 100%;
      .el-progress-bar__innerText {
        color: #fff;
      }
    }
  }
}
.badrate {
  .el-progress-bar__outer {
    border: solid 1px #00618d;
    background-color: #00035c;
    .el-progress-bar__inner {
      background-color: unset;
      background-image: linear-gradient(to right, #3587d8, #974bff);
      border-radius: 0;
      max-width: 100%;
      .el-progress-bar__innerText {
        color: #fff;
      }
    }
  }
}
</style>
