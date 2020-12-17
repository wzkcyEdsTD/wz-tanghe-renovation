<template>
  <div class="layerhub-wrapper">
    <div class="sign-wrapper" style="right: 24%">
      <img src="/static/images/common/sign2@2x.png" />
    </div>
    <MarkRule v-if="showMark" />
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
                :style="{
                  color: item.attributes.YS != 30 ? '#FF9124' : '#14D1D1',
                }"
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
          <span class="title">项目统计-{{currentZrdw}}</span>
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
        <!-- <div class="base-info">
          <div class="base-item">
            <div class="progressEmpty">
              <img src="./images/0（蓝）.png" class="empty" />
              <div
                class="progressFull"
                :style="{ width: `${currentData.stsRate / 10}vh` }"
              >
                <img src="./images/100（蓝）.png" class="full" />
              </div>
              <span class="progressTitle">{{ currentData.stsRate }}%</span>
            </div>
          </div>
          <div class="base-item">
            <div class="progressEmpty">
              <img src="./images/0（红）.png" class="empty" />
              <div
                class="progressFull"
                :style="{ width: `${currentData.amoundRate / 10}vh` }"
              >
                <img src="./images/100（红）.png" class="full" />
              </div>
              <span class="progressTitleRight"
                >{{ currentData.amoundRate }}%</span
              >
            </div>
          </div>
        </div> -->
        <div class="content-box">
          <div class="content-title">
            <span class="pre"></span>
            <div class="title">年度开工完成率</div>
          </div>
          <div class="content-item">
            <p class="text">年度计划开工项目数</p>
            <span class="number blue">{{currentData.jhkg_num}}</span>
            <span class="unit">个</span>
          </div>
          <div class="content-item">
            <p class="text">年度累计开工项目数</p>
            <span class="number orange">{{currentData.ljkg_num}}</span>
            <span class="unit">个</span>
          </div>
          <div class="progress-wrapper">
            <div class="progress" :style="{width: `${currentData.kg_rate/2}%`}"></div>
            <span class="rate">{{currentData.kg_rate}}%</span>
          </div>
          <!-- <div
            style="height: 16vh; width: 100%"
            class="echart"
            ref="jsqkEchart"
          ></div> -->
        </div>
        <div class="content-box">
          <!-- <div class="sub-title-wrapper">
            <div class="sub-title">年度计划建成完成率</div>
            <div class="decorate"></div>
          </div> -->
          <div class="content-title">
            <span class="pre"></span>
            <div class="title">年度计划建成完成率</div>
          </div>
          <div class="content-item">
            <p class="text">年度计划建成项目数</p>
            <span class="number blue">{{currentData.jhjc_num}}</span>
            <span class="unit">个</span>
          </div>
          <div class="content-item">
            <p class="text">年度累计建成项目数</p>
            <span class="number orange">{{currentData.ljjc_num}}</span>
            <span class="unit">个</span>
          </div>
          <div class="progress-wrapper">
            <div class="progress" :style="{width: `${currentData.jc_rate/2}%`}"></div>
            <span class="rate">{{currentData.jc_rate}}%</span>
          </div>
          <!-- <div class="chart-wrapper">
            <p class="xiaobiaoti">{{ "完工计划(个)" }}</p>
            <div
              style="height: 16vh; width: 100%"
              class="echart"
              ref="wgjhEchart"
            ></div>
          </div> -->
        </div>
        <div class="content-box">
          <!-- <div class="sub-title-wrapper">
            <div class="sub-title">
              滞后项目<span class="number">{{
                "(" + delayXmList.length + ")个"
              }}</span>
            </div>
            <div class="sub-title">年度投资完成率</div>
            <div class="decorate"></div>
          </div> -->
          <div class="content-title">
            <span class="pre"></span>
            <div class="title">年度投资完成率</div>
          </div>
          <div class="content-item">
            <p class="text">年度计划总投资</p>
            <span class="number blue">{{currentData.jhtz_num}}</span>
            <span class="unit">亿元</span>
          </div>
          <div class="content-item">
            <p class="text">年度累计投资额</p>
            <span class="number orange">{{currentData.ljtz_num}}</span>
            <span class="unit">亿元</span>
          </div>
          <div class="progress-wrapper">
            <div class="progress" :style="{width: `${currentData.tz_rate/2}%`}"></div>
            <span class="rate">{{currentData.tz_rate}}%</span>
          </div>
          <!-- <div class="result-wrapper">
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
          </div> -->
        </div>
        <div class="content-box">
          <!-- <div class="sub-title-wrapper">
            <div class="sub-title">年度政府性投资完成率</div>
            <div class="decorate"></div>
          </div> -->
          <div class="content-title">
            <span class="pre"></span>
            <div class="title">年度政府性投资完成率</div>
          </div>
          <div class="content-item">
            <p class="text">年度计划政府性投资</p>
            <span class="number blue">{{currentData.jhzf_num}}</span>
            <span class="unit">亿元</span>
          </div>
          <div class="content-item">
            <p class="text">年度累计完成政府性投资</p>
            <span class="number orange">{{currentData.ljzf_num}}</span>
            <span class="unit">亿元</span>
          </div>
          <div class="progress-wrapper">
            <div class="progress" :style="{width: `${currentData.zf_rate/2}%`}"></div>
            <span class="rate">{{currentData.zf_rate}}%</span>
          </div>
          <!-- <div class="chart-wrapper">
            <p class="xiaobiaoti">{{ "完工计划(个)" }}</p>
            <div
              style="height: 16vh; width: 100%"
              class="echart"
              ref="wgjhEchart"
            ></div>
          </div> -->
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
            <div class="amount-item bg1" v-for="(item,index) in amountData.slice(0,3)" :key="index">
              <div class="number">{{item.num}}<span class="unit">亿元</span></div>
              <div class="name">{{item.name}}</div>
            </div>
          </div>
          <div class="amount-rank" style="margin-top:1.5vh">
            <div class="amount-item bg2" v-for="(item,index) in amountData.slice(3)" :key="index">
              <div class="number">{{item.num}}<span class="unit">亿元</span></div>
              <div class="name">{{item.name}}</div>
            </div>
          </div>
        </div>
        <div class="content-box">
          <div class="sub-title-wrapper">
            <div class="sub-title">年度计划建成项目完成率</div>
            <div class="decorate"></div>
          </div>
          <div class="rate-rank">
            <div class="rate-item" v-for="(item,index) in finishData" :key="index">
              <p class="name">{{item.name}}</p>
              <el-progress class="goodrate" :text-inside="true" :stroke-width="26" :percentage="item.rate"></el-progress>
            </div>
          </div>
        </div>
        <div class="content-box">
          <div class="sub-title-wrapper">
            <div class="sub-title">年度投资完成率</div>
            <div class="decorate"></div>
          </div>
          <div class="invest-rank">
            <div class="invest-item" v-for="(item,index) in investData.slice(0,3)" :key="index">
              <el-progress
                type="circle"
                class="goodinvest"
                :width="investCircleWidth"
                :percentage="item.num"
                color="#00FFFF"
                base-color="rgba(255,255,255,0.1)"
                :inner-circle="true"
                innerCircleColor="(rgba(0,0,0,0.15),rgba(0,225,255,0.49))"
              ></el-progress>
              <p class="name">{{item.name}}</p>
            </div>
          </div>
          <div class="invest-rank">
            <div class="invest-item" v-for="(item,index) in investData.slice(3)" :key="index">
              <el-progress
                type="circle"
                class="badinvest"
                :width="investCircleWidth"
                :percentage="item.num"
                color="#8DE1FF"
                base-color="rgba(255,255,255,0.1)"
                :inner-circle="true"
                innerCircleColor="(rgba(0,0,0,0.15),rgba(141,225,255,0.49))"
              ></el-progress>
              <p class="name">{{item.name}}</p>
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
import MarkRule from "./components/MarkRule";
import MapTool from "../../sourcelayer/layerHub/components/mapTool";
import { drawJSQK, drawWGJH, drawXMSL } from "./EchartsDrawTool";
import {
  getProjStatusByDept,
  getProjDeptNumAmound,
  getProjStatusAmound,
  getProjNumAndAmound,
  getProjByConsdate,
} from "api/tangheAPI";

const SERVER_HOST = "http://172.168.3.183:8090/iserver/services";
const SW_DATA = "/data-alldata/rest/data";
const SW_DATA_NAME = "172.168.3.181_thxm:";
const SERVER_DEFAULT_DATA = SERVER_HOST + SW_DATA;
const orientation = {
  heading: 0.01768860454315663,
  pitch: Cesium.Math.toRadians(-90),
  roll: 0.0,
};

export default {
  name: "LayerHub",
  components: {
    MapTool,
    MarkRule
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
      // jsqkEchart: null,
      wgjhEchart: null,
      xmslEchart: null,
      xmActive: "",
      showMark: false,
      finishData: [
        {
          name: "瑞安市政府",
          num: 1,
          rate: 300,
        },
        {
          name: "鹿城区政府",
          num: 4,
          rate: 100,
        },
        {
          name: "龙湾区政府",
          num: 3,
          rate: 100,
        },
        {
          name: "瓯海区政府",
          num: 6,
          rate: 100,
        },
        {
          name: "温州城发集团",
          num: 2,
          rate: 100,
        },
        {
          name: "温州现代集团",
          num: 4,
          rate: 60,
        },
        {
          name: "浙南产业区",
          num: 0,
          rate: 0,
        },
      ],
      amountData: [
        {
          name: "瓯海区政府",
          num: 22.6,
        },
        {
          name: "鹿城区政府",
          num: 7.54,
        },
        {
          name: "龙湾区政府",
          num: 5.51,
        },
        {
          name: "温州城发集团",
          num: 5.46,
        },
        {
          name: "瑞安市政府",
          num: 2.71,
        },
        {
          name: "温州现代集团",
          num: 2.58,
        },
        {
          name: "浙南产业区",
          num: 0.3,
        },
      ],
      investData: [
        {
          name: "瑞安市政府",
          num: 178,
        },
        {
          name: "浙南产业区",
          num: 150,
        },
        {
          name: "瓯海区政府",
          num: 144,
        },
        {
          name: "龙湾区政府",
          num: 134,
        },
        {
          name: "温州城发集团",
          num: 117,
        },
        {
          name: "鹿城区政府",
          num: 112,
        },
        {
          name: "温州现代集团",
          num: 97,
        },
      ],
      projData: [
        {
          name: "鹿城区政府",
          num: 18,
          amount: 7.54,
          jhkg_num: 4,
          ljkg_num: 8,
          kg_rate: 200,
          jhjc_num: 4,
          ljjc_num: 4,
          jc_rate: 100,
          jhtz_num: 6.35,
          ljtz_num: 7.54,
          tz_rate: 112,
          jhzf_num: 2.35,
          ljzf_num: 2.47,
          zf_rate: 105
        },
        {
          name: "瓯海区政府",
          num: 17,
          amount: 22.6,
          jhkg_num: 5,
          ljkg_num: 5,
          kg_rate: 100,
          jhjc_num: 9,
          ljjc_num: 9,
          jc_rate: 100,
          jhtz_num: 15.72,
          ljtz_num: 22.6,
          tz_rate: 144,
          jhzf_num: 14.6,
          ljzf_num: 21.48,
          zf_rate: 148
        },
        {
          name: "温州城发集团",
          num: 12,
          amount: 5.46,
          jhkg_num: 2,
          ljkg_num: 2,
          kg_rate: 100,
          jhjc_num: 2,
          ljjc_num: 2,
          jc_rate: 100,
          jhtz_num: 4.66,
          ljtz_num: 5.46,
          tz_rate: 117.17,
          jhzf_num: 4.66,
          ljzf_num: 5.46,
          zf_rate: 117.17
        },
        {
          name: "龙湾区政府",
          num: 8,
          amount: 5.51,
          jhkg_num: 2,
          ljkg_num: 2,
          kg_rate: 100,
          jhjc_num: 4,
          ljjc_num: 4,
          jc_rate: 100,
          jhtz_num: 4.09,
          ljtz_num: 5.51,
          tz_rate: 134,
          jhzf_num: 4.09,
          ljzf_num: 5.51,
          zf_rate: 134
        },
        {
          name: "瑞安市政府",
          num: 7,
          amount: 2.71,
          jhkg_num: 5,
          ljkg_num: 7,
          kg_rate: 140,
          jhjc_num: 1,
          ljjc_num: 3,
          jc_rate: 300,
          jhtz_num: 1.52,
          ljtz_num: 2.71,
          tz_rate: 178.3,
          jhzf_num: 1.52,
          ljzf_num: 2.71,
          zf_rate: 178.3
        },
        {
          name: "温州现代集团",
          num: 5,
          amount: 2.58,
          jhkg_num: 5,
          ljkg_num: 4,
          kg_rate: 80,
          jhjc_num: 5,
          ljjc_num: 3,
          jc_rate: 60,
          jhtz_num: 2.64,
          ljtz_num: 2.58,
          tz_rate: 97.6,
          jhzf_num: 2.64,
          ljzf_num: 2.58,
          zf_rate: 97.6
        },
        {
          name: "浙南产业区",
          num: 1,
          amount: 0.3,
          jhkg_num: 0,
          ljkg_num: 0,
          kg_rate: 0,
          jhjc_num: 0,
          ljjc_num: 0,
          jc_rate: 0,
          jhtz_num: 0.2,
          ljtz_num: 0.3,
          tz_rate: 150,
          jhzf_num: 0.2,
          ljzf_num: 0.3,
          zf_rate: 150
        },
      ],
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
          zf_rate: 0
        // stsRate: 0,
        // amoundRate: 0,
      },
      项目res: {},
      绿道断点res: {},
      investCircleWidth: 0
    };
  },
  computed: {
    ...mapGetters("map", ["sourceMap"]),
    drawData() {
      return this.$store.state.map.sourceMap;
    },
    allList() {
      let tempArr = this.xmList.concat(this.ddList);
      let isKeyArr = []
      let noKeyArr = []
      tempArr.forEach(item => {
        if (item.attributes.YS != 30) {
          isKeyArr.push(item)
        } else {
          noKeyArr.push(item)
        }
      })
      return isKeyArr.concat(noKeyArr);
    },
    // delayXmList() {
    //   let result = [];
    //   let alldata = this.sourceMap["项目"];
    //   if (alldata) {
    //     if (this.currentZrdw != "指挥部") {
    //       result = alldata.filter((item) => {
    //         return (
    //           item.attributes.ZR_DEPTID == this.currentZrdw &&
    //           ~item.attributes.CURRENT_STATE.indexOf("滞后")
    //         );
    //       });
    //     } else {
    //       result = alldata.filter((item) => {
    //         return ~item.attributes.CURRENT_STATE.indexOf("滞后");
    //       });
    //     }
    //   }
    //   return result;
    // },
    // questionDdList() {
    //   let result = [];
    //   let alldata = this.sourceMap["绿道断点"];
    //   if (alldata) {
    //     if (this.currentZrdw != "指挥部") {
    //       result = alldata.filter((item) => {
    //         return (
    //           item.attributes.ZRDW == this.currentZrdw &&
    //           item.attributes.CZWT != "无"
    //         );
    //       });
    //     } else {
    //       result = alldata.filter((item) => {
    //         return item.attributes.CZWT != "无";
    //       });
    //     }
    //   }
    //   return result;
    // },
  },
  methods: {
    ...mapActions("map", ["setSourceMap"]),
    async initData() {
      // let res = await getProjStatusByDept({ status: "完工" });
      // if (res.code === 200) {
      //   res.result.forEach((i) => {
      //     this.finishData.forEach((j) => {
      //       if (j.name == i.deptName) {
      //         j.num = i.statusInfos[0].num;
      //         j.rate = Number(i.statusInfos[0].rate.toFixed(1));
      //       }
      //     });
      //   });
      //   this.finishData.sort((a, b) => {
      //     return b.rate - a.rate;
      //   });
      // }

      // let projRes = await getProjDeptNumAmound();
      // if (projRes.code === 200) {
      //   projRes.result.forEach((item) => {
      //     if (item.name) {
      //       this.amountData.push(item);
      //       this.projData.push(item)
      //     }
      //   });
      //   this.amountData.sort((a, b) => {
      //     return b.projAmountSum - a.projAmountSum;
      //   });
      //   this.projData.sort((a, b) => {
      //     return b.num - a.num;
      //   });
      //   drawXMSL(this, this.projData)
      // }

      drawXMSL(this)
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
            this[`${node.id}res`] = res;
            const fields = await getIserverFields(url, newdataset);
            treeDrawTool(this, res, node, fields, fn);
          },
          processFailed: (msg) => console.log(msg),
        },
      });
      getFeatureBySQLService.processAsync(getFeatureBySQLParams);
    },
    async selectZrdw(zrdw) {
      // 点击，列表回到顶部
      $("#xm-list").scrollTop(0);
      $("#dd-list").scrollTop(0);

      // 关闭详情
      this.$parent.$refs.projectDetailPopup.closeDetail();

      // 不再重复操作
      if (this.currentZrdw == zrdw.title) return;

      this.currentZrdw = zrdw.title;
      this.searchXMText = "";
      this.$bus.$emit("change-zrdw", { value: zrdw.sysOrgCode });

      if (zrdw.title === "指挥部") {
        this.changeType = "all";
      } else {
        this.changeType = "other";

        this.projData.forEach(item => {
          if (item.name == zrdw.title) {
            this.currentData.num = item.num
            this.currentData.amount = item.amount
            this.currentData.jhkg_num = item.jhkg_num
            this.currentData.ljkg_num = item.ljkg_num
            this.currentData.kg_rate = item.kg_rate
            this.currentData.jhjc_num = item.jhjc_num
            this.currentData.ljjc_num = item.ljjc_num
            this.currentData.jc_rate = item.jc_rate
            this.currentData.jhtz_num = item.jhtz_num
            this.currentData.ljtz_num = item.ljtz_num
            this.currentData.tz_rate = item.tz_rate
            this.currentData.jhzf_num = item.jhzf_num
            this.currentData.ljzf_num = item.ljzf_num
            this.currentData.zf_rate = item.zf_rate
          }
        })

        // let numRes = await getProjNumAndAmound({ sysOrgCode: zrdw.sysOrgCode });
        // if (numRes.code === 200) {
        //   this.currentData.num = numRes.result.num;
        //   this.currentData.amount = (
        //     numRes.result.projAmountSum / 10000
        //   ).toFixed(1);
        // }
        // let rateRes = await getProjStatusAmound({
        //   sysOrgCode: zrdw.sysOrgCode,
        //   status: "*完工*",
        // });
        // if (rateRes.code === 200) {
        //   this.currentData.stsRate = rateRes.result.stsRate.toFixed(1);
        //   this.currentData.amoundRate = rateRes.result.amoundRate.toFixed(1);
        // }

        // let barRes = await getProjStatusByDept({ sysOrgCode: zrdw.sysOrgCode });
        // if (barRes.code === 200) {
        //   let barData = {};
        //   barRes.result[0].statusInfos.forEach((item) => {
        //     if (item.name === "前期(滞后)") {
        //       barData.preLag = item.num;
        //     }
        //     if (item.name === "前期研究") {
        //       barData.pre = item.num;
        //     }
        //     if (item.name === "完工") {
        //       barData.finish = item.num;
        //     }
        //     if (item.name === "在建") {
        //       barData.build = item.num;
        //     }
        //     if (item.name === "在建(滞后)") {
        //       barData.buildLag = item.num;
        //     }
        //   });
        //   drawJSQK(this, barData);
        // }

        // let lineRes = await getProjByConsdate({ sysOrgCode: zrdw.sysOrgCode });
        // if (lineRes.code === 200) {
        //   drawWGJH(this, lineRes.result);
        // }
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

      this.$bus.$emit("click-item", { value: item });

      window.earth.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(x, y, 1200),
        orientation: orientation,
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
      window.earth.dataSources.getByName("location")[0].entities.removeAll();

      if (this.currentZrdw != "指挥部") {
        let currentXmRes = this.项目res.result.features.filter((item) => {
          return ~item.attributes.ZR_DEPTID.indexOf(this.currentZrdw);
        });
        let currentDdRes = this.绿道断点res.result.features.filter((item) => {
          return ~item.attributes.ZRDW.indexOf(this.currentZrdw);
        });
        treeDrawTool(
          this,
          { result: { features: currentXmRes } },
          { id: "项目", icon: false }
        );
        treeDrawTool(
          this,
          { result: { features: currentDdRes } },
          { id: "绿道断点", icon: "断点" }
        );

        this.xmList = this.sourceMap["项目"];
        this.ddList = this.sourceMap["绿道断点"];
      } else {
        treeDrawTool(this, this.项目res, { id: "项目", icon: false });
        treeDrawTool(this, this.绿道断点res, { id: "绿道断点", icon: "断点" });

        this.xmList = this.sourceMap["项目"];
        this.ddList = this.sourceMap["绿道断点"];
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

    this.$nextTick(() => {
      let investCircleDiv = document.getElementsByClassName('invest-item')[0];
      this.investCircleWidth = investCircleDiv.clientWidth
    })
  },
  watch: {
    drawData(val) {
      console.log("drawData", val);
      this.sourceMap["项目"] && (this.xmList = this.sourceMap["项目"]);
      this.sourceMap["绿道断点"] && (this.ddList = this.sourceMap["绿道断点"]);
    },
    currentZrdw(val) {
      this.filterData();
      if (val == "龙湾区政府") {
        window.earth.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            120.803145,
            27.933237,
            15000
          ),
          orientation: orientation,
        });
      } else if (val == "瑞安市政府") {
        window.earth.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            120.685643,
            27.792632,
            15000
          ),
          orientation: orientation,
        });
      } else if (val == "浙南产业区") {
        window.earth.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            120.789269,
            27.847479,
            15000
          ),
          orientation: orientation,
        });
      } else if (val == "瓯海区政府") {
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
    .el-progress-bar__inner{
      background-color: unset;
      background-image: linear-gradient(to right, #3587d8 , #f14bff);
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
    .el-progress-bar__inner{
      background-color: unset;
      background-image: linear-gradient(to right, #3587d8 , #974bff);
      border-radius: 0;
      max-width: 100%;
      .el-progress-bar__innerText {
        color: #fff;
      }
    }
  }
}
</style>
