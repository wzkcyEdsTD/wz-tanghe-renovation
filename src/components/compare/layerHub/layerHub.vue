<template>
  <div class="layerhub-wrapper">
    <div class="sign-wrapper" style="right: 24%">
      <img src="/static/images/common/sign2@2x.png" />
    </div>
    <div class="mark-popup" v-if="showMark">
      <div class="mask"></div>
      <div class="content">
        <p class="text">扫描二维码进行评分</p>
        <img class="qrcode" src="./images/qrcode.png" />
        <img
          class="close"
          src="./images/mark-close.png"
          @click="showMark = false"
        />
      </div>
    </div>
    <MapTool />
    <div class="left-wrapper">
      <div class="left-content">
        <ul class="zrdw-list">
          <li
            class="zrdw-item"
            :class="{ active: currentZrdw == item.title }"
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
              v-for="(item, index) in allList"
              :key="index"
              :class="{ xmActive: xmActive == item.attributes.GUID }"
              @click="itemClick(item)"
            >
              <div
                class="name"
                :style="{ color: index < 3 ? '#FF9124' : '#14D1D1' }"
              >
                {{ index + 1 }}.{{ item.attributes.NAME }}
              </div>
              <div class="info-box" v-if="item.type == '项目'">
                <div class="info-item">
                  <div class="key">建设状态</div>
                  <div class="value">{{ item.attributes.CURRENT_STATE }}</div>
                </div>
                <div class="split"></div>
                <div class="info-item">
                  <div class="key">投资计划</div>
                  <div class="value">{{ item.attributes.TOTALAMOUNT }}万元</div>
                </div>
                <div class="split"></div>
                <div class="info-item jcsj">
                  <div class="key">计划建成时间</div>
                  <div class="value">{{ item.attributes.CONSYEARE }}</div>
                </div>
              </div>
              <div class="info-box" v-if="item.type == '绿道断点'">
                <div class="info-item">
                  <div class="key">计划贯穿时间</div>
                  <div class="value">{{ item.attributes.JHGTSJ }}</div>
                </div>
                <div class="split"></div>
                <div class="info-item">
                  <div class="key">长度（米）</div>
                  <div class="value">{{ item.attributes.LENGTH }}</div>
                </div>
              </div>
            </li>
          </ul>
          <div class="no-tip" v-show="!allList.length">暂无数据</div>
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
          <span class="title">项目统计</span>
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
            <div class="titleRight" style="color: #ff8b4f">投资计划</div>
            <div class="textRight">
              {{ currentData.amount }}<span class="unit">亿元</span>
            </div>
            <img src="./images/台子-红.png" alt="" class="rightPictureBottom" />
          </div>
        </div>
        <div class="base-info">
          <div class="base-item">
            <div class="progressEmpty">
              <img src="./images/0%（蓝）.png" class="empty" />
              <div
                class="progressFull"
                :style="{ width: `${currentData.stsRate / 10}vh` }"
              >
                <img src="./images/100%（蓝）.png" class="full" />
              </div>
              <span class="progressTitle">{{ currentData.stsRate }}%</span>
            </div>
          </div>
          <div class="base-item">
            <div class="progressEmpty">
              <img src="./images/0%（红）.png" class="empty" />
              <div
                class="progressFull"
                :style="{ width: `${currentData.amoundRate / 10}vh` }"
              >
                <img src="./images/100%（红）.png" class="full" />
              </div>
              <span class="progressTitleRight"
                >{{ currentData.amoundRate }}%</span
              >
            </div>
          </div>
        </div>
        <div class="jsqk-info">
          <div class="sub-title-wrapper">
            <div class="sub-title">建设情况</div>
            <div class="decorate"></div>
          </div>
          <div
            style="height: 16vh; width: 36vh"
            class="echart"
            ref="barEchart"
          ></div>
        </div>
        <div class="jd-info">
          <div class="sub-title-wrapper">
            <div class="sub-title">项目投资计划表</div>
            <div class="decorate"></div>
          </div>
          <div class="chart-wrapper">
            <div class="rate-item">
              <p class="xiaobiaoti">{{ "投资计划(万元)" }}</p>
              <div
                style="height: 16vh; width: 35vh"
                class="echart"
                ref="lineEchart"
              ></div>
            </div>
          </div>
        </div>
        <div class="czwt-info">
          <div class="sub-title-wrapper">
            <div class="sub-title">
              滞后项目<span class="number">{{
                "(" + delayXmList.length + ")个"
              }}</span>
            </div>
            <div class="decorate"></div>
          </div>
          <div class="result-wrapper">
            <ul class="result-list">
              <li class="result-item header">
                <span class="index">序号</span>
                <span class="name">名称</span>
                <span class="content">建设状态</span>
                <span class="content">责任单位</span>
              </li>
              <li
                class="result-item"
                v-for="(item, index) in delayXmList"
                :key="index"
              >
                <span class="index">{{ index + 1 }}</span>
                <span class="name" :title="item.attributes.NAME">{{
                  item.attributes.NAME
                }}</span>
                <span class="flex-2 content">{{
                  item.attributes.CURRENT_STATE
                }}</span>
                <span class="flex-2 content">{{
                  item.attributes.ZR_DEPTID
                }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="right-content" v-show="changeType == 'all'">
      <div class="xmtj-container" v-show="currentType == 'xm'">
        <div class="titleHxhb-wrapper">
          <span class="pre"></span>
          <span class="title">项目统计</span>
        </div>
        <div class="xmtzjh-info">
          <div class="sub-title-wrapper">
            <div class="sub-title">当年项目投资计划完成率排行</div>
            <div class="decorate"></div>
          </div>
          <div class="mxph">
            <img src="./images/xmtzjh.png" class="xmtzPicture" />
            <div class="rank-text-wrapper">
              <div class="rank-text-item" style="margin-top: 2vh">
                <div class="second">111%</div>
                <div class="secondText">总 15.7亿元</div>
              </div>
              <div class="rank-text-item">
                <div class="first">154%</div>
                <div class="firstText">总 1.5亿元</div>
              </div>
              <div class="rank-text-item" style="margin-top: 4vh">
                <div class="third">109%</div>
                <div class="thirdText">总 0.2亿元</div>
              </div>
            </div>
          </div>
          <div class="progressFlex">
            <span class="xmtz-item second">瓯海区</span>
            <span class="xmtz-item first">瑞安市</span>
            <span class="xmtz-item third">浙南产业区</span>
          </div>
          <ul>
            <li class="info-item-right">
              <span class="value">温州城发集团</span>
              <span class="value">龙湾区</span>
              <span class="value">鹿城区</span>
              <span class="value">温州现代集团</span>
            </li>
            <li class="info-item-right">
              <div class="key">
                <div class="keyAllText">
                  <p class="firstKeyText">103%</p>
                  <p class="secondKeyText">4.6亿元</p>
                </div>
              </div>
              <div class="key">
                <div class="keyAllText">
                  <p class="firstKeyText">100%</p>
                  <p class="secondKeyText">4.1亿元</p>
                </div>
              </div>
              <div class="key">
                <div class="keyAllText">
                  <p class="firstKeyText">67%</p>
                  <p class="secondKeyText">6.3亿元</p>
                </div>
              </div>
              <div class="key">
                <div class="keyAllText">
                  <p class="firstKeyText">2.6%</p>
                  <p class="secondKeyText">2.6亿元</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="xmwgl-info">
          <div class="sub-title-wrapper">
            <div class="sub-title">项目完工率</div>
            <div class="decorate"></div>
          </div>
          <div class="pictureFlex">
            <div class="xmwg">
              <el-progress
                class="second"
                type="circle"
                :stroke-width="10"
                :percentage="finishData[1].rate"
                color="#299CFF"
              ></el-progress>
            </div>
            <div class="xmwg">
              <el-progress
                class="first"
                type="circle"
                :stroke-width="10"
                :percentage="finishData[0].rate"
                color="#B967FF"
              ></el-progress>
            </div>
            <div class="xmwg">
              <el-progress
                class="third"
                type="circle"
                :stroke-width="10"
                :percentage="finishData[2].rate"
                color="#29D1EF"
              ></el-progress>
            </div>
          </div>
          <div class="pictureFlex">
            <p class="compleRateText second">
              {{ finishData[1].name }}<br />{{ finishData[1].num }}个
            </p>
            <p class="compleRateText first">
              {{ finishData[0].name }}<br />{{ finishData[0].num }}个
            </p>
            <p class="compleRateText third">
              {{ finishData[2].name }}<br />{{ finishData[2].num }}个
            </p>
          </div>
          <ul>
            <li class="info-item-right">
              <span
                class="value"
                v-for="(item, index) in finishData.slice(3, 7)"
                :key="index"
                >{{ item.name }}</span
              >
            </li>
            <li class="info-item-right">
              <div
                class="key"
                v-for="(item, index) in finishData.slice(3, 7)"
                :key="index"
              >
                <div class="keyAllText">
                  <p class="firstKeyText">{{ item.rate }}%</p>
                  <p class="secondKeyText">{{ item.num }}个</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="zrdwxmsjz">
          <div class="sub-title-wrapper">
            <div class="sub-title">责任单位项目时间轴</div>
            <div class="decorate"></div>
          </div>
          <div class="progressFlexIn">
            <div class="buleText">
              <div
                class="item"
                :style="{ left: `${25 * index}%` }"
                v-for="(item, index) in upList"
                :key="index"
              >
                <p class="buleLabTitle">{{ item.name.substr(0, 10) }}完成</p>
                <p class="buleLabText">{{ item.deptName }}</p>
                <p class="buleLabText">
                  项目个数<span class="number">{{ item.num }}</span
                  >个
                </p>
                <p class="buleLabText">
                  投资计划<span class="number">{{
                    (item.projAmountSum / 10000).toFixed(2)
                  }}</span
                  >亿元
                </p>
              </div>
            </div>
          </div>
          <div class="end">
            <div class="blueLine">
              <img
                :style="{ left: `${25 * index}%` }"
                v-for="(item, index) in upList"
                :key="item.sysOrgCode"
                src="./images/蓝线.png"
                class="up-img"
              />
              <img
                :style="{ left: `${30 * index + 10}%` }"
                v-for="(item, index) in downList"
                :key="item.sysOrgCode"
                src="./images/蓝线.png"
                class="down-img"
              />
              <div class="straightLine"></div>
            </div>
          </div>
          <div class="progressFlexIn">
            <div class="buleText">
              <div
                class="item"
                :style="{ left: `${30 * index + 10}%` }"
                v-for="(item, index) in downList"
                :key="index"
              >
                <p class="buleLabTitle">{{ item.name.substr(0, 10) }}完成</p>
                <p class="buleLabText">{{ item.deptName }}</p>
                <p class="buleLabText">
                  项目个数<span class="number">{{ item.num }}</span
                  >个
                </p>
                <p class="buleLabText">
                  投资计划<span class="number">{{
                    (item.projAmountSum / 10000).toFixed(2)
                  }}</span
                  >亿元
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { treeDrawTool } from "../../sourcelayer/layerHub/TreeDrawTool";
import { getIserverFields } from "api/iServerAPI";
import MapTool from "../../sourcelayer/layerHub/components/mapTool";
import { drawBar, drawLine } from "./EchartsDrawTool";
import {
  getProjStatusByDept,
  getProjDeptNumAmound,
  getProjStatusAmound,
  getProjNumAndAmound,
} from "api/tangheAPI";

const SERVER_HOST = "http://172.168.3.183:8090/iserver/services";
const SW_DATA = "/data-alldata/rest/data";
const SW_DATA_NAME = "172.168.3.181_thxm:";
const SERVER_DEFAULT_DATA = SERVER_HOST + SW_DATA;

export default {
  components: {
    MapTool,
  },
  data() {
    return {
      showLarge: window.showLarge,
      currentType: "xm",
      changeType: "all",
      zrdwList: [
        { title: "指挥部", value: "all", sysOrgCode: "all" },
        { title: "鹿城区政府", value: "lucheng", sysOrgCode: "A02A01" },
        { title: "龙湾区政府", value: "longwan", sysOrgCode: "A02A03" },
        { title: "瓯海区政府", value: "ouhai", sysOrgCode: "A02A02" },
        { title: "瑞安市政府", value: "ruian", sysOrgCode: "A02A04" },
        { title: "浙南产业区", value: "zhenan", sysOrgCode: "A02A05" },
        { title: "温州城发集团", value: "chengfa", sysOrgCode: "A02A07" },
        { title: "温州现代集团", value: "xiandai", sysOrgCode: "A02A06" },
      ],
      currentZrdw: "指挥部",
      ddList: [],
      xmList: [],
      searchXMText: "",
      barEchart: null,
      lineEchart: null,
      xmActive: "",
      showMark: false,
      finishData: [
        {
          name: "鹿城区政府",
          num: 0,
          rate: 0,
        },
        {
          name: "瓯海区政府",
          num: 0,
          rate: 0,
        },
        {
          name: "龙湾区政府",
          num: 0,
          rate: 0,
        },
        {
          name: "瑞安市政府",
          num: 0,
          rate: 0,
        },
        {
          name: "浙南产业园",
          num: 0,
          rate: 0,
        },
        {
          name: "温州现代集团",
          num: 0,
          rate: 0,
        },
        {
          name: "温州城发集团",
          num: 0,
          rate: 0,
        },
      ],
      projData: [],
      currentData: {
        num: 0,
        amount: 0,
        stsRate: 0,
        amoundRate: 0,
      },
    };
  },
  computed: {
    ...mapGetters("map", ["sourceMap"]),
    drawData() {
      return this.$store.state.map.sourceMap;
    },
    allList() {
      return this.xmList.concat(this.ddList);
    },
    delayXmList() {
      let result = [];
      let alldata = this.sourceMap["项目"];
      if (alldata) {
        if (this.currentZrdw != "指挥部") {
          result = alldata.filter((item) => {
            return (
              item.attributes.ZR_DEPTID == this.currentZrdw &&
              ~item.attributes.CURRENT_STATE.indexOf("滞后")
            );
          });
        } else {
          result = alldata.filter((item) => {
            return ~item.attributes.CURRENT_STATE.indexOf("滞后");
          });
        }
      }
      return result;
    },
    questionDdList() {
      let result = [];
      let alldata = this.sourceMap["绿道断点"];
      if (alldata) {
        if (this.currentZrdw != "指挥部") {
          result = alldata.filter((item) => {
            return (
              item.attributes.ZRDW == this.currentZrdw &&
              item.attributes.CZWT != "无"
            );
          });
        } else {
          result = alldata.filter((item) => {
            return item.attributes.CZWT != "无";
          });
        }
      }
      return result;
    },
    upList() {
      let result = [];
      this.projData.forEach((item, index) => {
        if (index % 2 == 0) {
          result.push(item);
        }
      });
      console.log("upList", result);
      return result;
    },
    downList() {
      let result = [];
      this.projData.forEach((item, index) => {
        if (index % 2 == 1) {
          result.push(item);
        }
      });
      console.log("downList", result);
      return result;
    },
  },
  methods: {
    ...mapActions("map", ["setSourceMap"]),
    async initData() {
      let res = await getProjStatusByDept({ status: "完工" });
      if (res.code === 200) {
        res.result.forEach((i) => {
          this.finishData.forEach((j) => {
            if (j.name == i.deptName) {
              j.num = i.statusInfos[0].num;
              j.rate = Number(i.statusInfos[0].rate.toFixed(1));
            }
          });
        });
        this.finishData.sort((a, b) => {
          return b.rate - a.rate;
        });
      }

      let projRes = await getProjDeptNumAmound();
      if (projRes.code === 200) {
        projRes.result.forEach((item) => {
          item.name && this.projData.push(item);
        });
      }
    },
    getPOIPickedFeature(node, fn) {
      const { newdataset, url, query } = node;
      var getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams;
      getFeatureParam = new SuperMap.REST.FilterParameter({
        attributeFilter: query ? `SMID <= 1000 AND ${query}` : `SMID <= 1000`,
      });
      getFeatureBySQLParams = new SuperMap.REST.GetFeaturesBySQLParameters({
        queryParameter: getFeatureParam,
        toIndex: -1,
        datasetNames: [newdataset],
      });
      getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(url, {
        eventListeners: {
          processCompleted: async (res) => {
            const fields = await getIserverFields(url, newdataset);
            treeDrawTool(this, res, node, fields, fn);
          },
          processFailed: (msg) => console.log(msg),
        },
      });
      getFeatureBySQLService.processAsync(getFeatureBySQLParams);
    },
    // drawBars() {
    //   drawBar(this);
    // },
    // drawLines() {
    //   drawLine(this);
    // },
    async selectZrdw(item) {
      // 点击，列表回到顶部
      $("#xm-list").scrollTop(0);
      $("#dd-list").scrollTop(0);

      // 不再重复操作
      if (this.currentZrdw == item.title) return;

      this.currentZrdw = item.title;
      this.searchXMText = "";
      this.$bus.$emit("change-zrdw", { value: item.sysOrgCode });

      if (item.title === "指挥部") {
        this.changeType = "all";
      } else {
        this.changeType = "other";
        let numRes = await getProjNumAndAmound({ sysOrgCode: item.sysOrgCode });
        if (numRes.code === 200) {
          this.currentData.num = numRes.result.num;
          this.currentData.amount = (
            numRes.result.projAmountSum / 10000
          ).toFixed(1);
        }
        let rateRes = await getProjStatusAmound({
          sysOrgCode: item.sysOrgCode,
          status: "*完工*",
        });
        if (rateRes.code === 200) {
          this.currentData.stsRate = rateRes.result.stsRate.toFixed(1);
          this.currentData.amoundRate = rateRes.result.amoundRate.toFixed(1);
        }

        // this.$nextTick(() => {
        //   this.drawLines();
        //   this.drawBars();
        // });
        let barRes = await getProjStatusByDept({ sysOrgCode: item.sysOrgCode });
        if (barRes.code === 200) {
          let barData = {};
          barRes.result[0].statusInfos.forEach((item) => {
            if (item.name === "前期(滞后)") {
              barData.preLag = item.num;
            }
            if (item.name === "前期研究") {
              barData.pre = item.num;
            }
            if (item.name === "完工") {
              barData.finish = item.num;
            }
            if (item.name === "在建") {
              barData.build = item.num;
            }
            if (item.name === "在建(滞后)") {
              barData.buildLag = item.num;
            }
          });
          drawBar(this, barData);
        }
      }

      // 大屏下关闭多媒体窗口
      this.$bus.$emit("close-rightPlayer");
    },
    itemClick(item) {
      if (this.currentType == "xm") {
        this.xmActive = item.attributes.GUID;
      }

      const { x, y } = item.geometry;

      // 定位图标，详情变换
      this.$parent.addLocationIcon(item.geometry, item.id);
      this.$parent.$refs.projectDetailPopup.getForceEntity(item);
      this.$parent.$refs.commonDetailPopup.closePopup();

      window.earth.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(x, y, 1200),
        orientation: {
          heading: 0.01768860454315663,
          pitch: Cesium.Math.toRadians(-90),
          roll: 0.0,
        },
        complete: () => {
          this.$bus.$emit("clickFly");
        },
      });
    },
    filterData() {
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

      if (this.currentZrdw != "指挥部") {
        this.xmList = this.sourceMap["项目"].filter((item) => {
          return ~item.attributes.ZR_DEPTID.indexOf(this.currentZrdw);
        });
        this.ddList = this.sourceMap["绿道断点"].filter((item) => {
          return ~item.attributes.ZRDW.indexOf(this.currentZrdw);
        });
        this.getPOIPickedFeature({
          id: "项目",
          label: "项目",
          url: SERVER_DEFAULT_DATA,
          newdataset: `${SW_DATA_NAME}项目`,
          icon: false,
          query: `ZR_DEPTID like '%${this.currentZrdw}'`,
        });
        this.getPOIPickedFeature({
          id: "绿道断点",
          label: "断点",
          url: SERVER_DEFAULT_DATA,
          newdataset: `${SW_DATA_NAME}绿道断点`,
          icon: "断点",
          iconSize: "small",
          query: `ZRDW like '%${this.currentZrdw}'`,
        });
      } else {
        this.xmList = this.sourceMap["项目"];
        this.ddList = this.sourceMap["绿道断点"];
        this.getPOIPickedFeature({
          id: "项目",
          label: "项目",
          url: SERVER_DEFAULT_DATA,
          newdataset: `${SW_DATA_NAME}项目`,
          icon: false,
        });
        this.getPOIPickedFeature({
          id: "绿道断点",
          label: "断点",
          url: SERVER_DEFAULT_DATA,
          newdataset: `${SW_DATA_NAME}绿道断点`,
          icon: "断点",
          iconSize: "small",
        });
      }
    },
    searchXMFilter() {
      console.log("searchXMFilter", this.searchXMText);
      this.xmList = this.searchXMText
        ? this.sourceMap["项目"].filter((item) => {
            return item.attributes.NAME.indexOf(this.searchXMText) >= 0;
          })
        : this.sourceMap["项目"];
      this.ddList = this.searchXMText
        ? this.sourceMap["绿道断点"].filter((item) => {
            return item.attributes.NAME.indexOf(this.searchXMText) >= 0;
          })
        : this.sourceMap["绿道断点"];
    },
    searchXMClear() {
      this.searchXMText = "";
      this.filterData();
    },
    goMark() {
      this.showMark = true;
    },
  },
  mounted() {
    this.initData();
    this.getPOIPickedFeature({
      id: "项目",
      label: "项目",
      url: SERVER_DEFAULT_DATA,
      newdataset: `${SW_DATA_NAME}项目`,
      icon: false,
    });
    this.getPOIPickedFeature({
      id: "绿道断点",
      label: "断点",
      url: SERVER_DEFAULT_DATA,
      newdataset: `${SW_DATA_NAME}绿道断点`,
      icon: "断点",
      iconSize: "small",
    });
  },
  watch: {
    drawData(val) {
      console.log("drawData", val);
      this.sourceMap["项目"] && (this.xmList = this.sourceMap["项目"]);
      this.sourceMap["绿道断点"] && (this.ddList = this.sourceMap["绿道断点"]);
    },
    currentZrdw(val) {
      this.filterData();
    },
    currentType(val) {
      // 点击，列表回到顶部
      $("#xm-list").scrollTop(0);

      // 选中置空
      this.xmActive = "";
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
  &.first {
    .el-progress__text {
      color: #b967ff !important;
    }
  }
  &.second {
    .el-progress__text {
      color: #299cff !important;
    }
  }
  &.third {
    .el-progress__text {
      color: #29d1ef !important;
    }
  }
  .el-progress__text {
    font-size: 2vh !important;
  }
}
</style>
