<template>
  <div class="topic">
    <!-- <img class="bg" src="./images/topic-bg.png" alt="" /> -->
    <div class="topic-list">
      <div
        class="topic-item"
        :class="{ active: currentTopic == item.value }"
        v-for="item in topicList"
        :key="item.value"
        @click="itemClick(item)"
      >
        <img v-show="currentTopic != item.value" :src="require(`./images/${item.label}.png`)" >
        <img v-show="currentTopic == item.value" :src="require(`./images/${item.label}select.png`)" >
        <p>{{item.label}}</p>
        <ul class="children-list" v-show="currentTopic == item.value && item.children">
          <li class="children-item" @click.stop="childClick(child)" :class="{ active: currentChild == child }"
            v-for="(child, index) in item.children" :key="index">{{child}}</li>
        </ul>
      </div>
    </div>
    <div class="analyze" v-show="showAnalyze">
      <img class="bg" src="./images/analyze-bg.png">
      <div class="top">
        <el-select class="analyze-select" v-model="zrdwValue" placeholder="请选择">
          <el-option
            v-for="item in zrdwOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="content">
        <div class="start-item start1">
          <img src="./images/star1.png" >
          <p class="number">6<span class="unit">个</span></p>
        </div>
        <div class="start-item start2">
          <img src="./images/star2.png" >
          <p class="number">6<span class="unit">个</span></p>
        </div>
        <div class="start-item start3">
          <img src="./images/star3.png" >
          <p class="number">6<span class="unit">个</span></p>
        </div>
        <div class="start-item start4">
          <img src="./images/star4.png" >
          <p class="number">6<span class="unit">个</span></p>
        </div>
        <div class="start-item start5">
          <img src="./images/star5.png" >
          <p class="number">6<span class="unit">个</span></p>
        </div>
      </div>
    </div>
    <div class="score" v-show="showScore">
      <div class="title">
        <p>打分</p>
        <img src="./images/score-title.png" >
      </div>
      <img class="close" src="./images/close.png" @click="showScore=false">
      <div class="score-box">
        <div class="top">
          <div class="left">
            <img src="./images/暂无图片.png" >
          </div>
          <div class="right">
            <div class="name">高连大厦</div>
            <div class="rate">
              <span>总体评分</span>
              <el-rate class="total-rate" disabled v-model="value1"></el-rate>
            </div>
          </div>
        </div>
        <div class="comment">
          <div class="text">历史评论</div>
          <div class="comment-list">
            <div class="comment-item">
              <div class="comment-header">
                <div class="left">
                  <img class="avatar" src="./images/avatar.png" >
                  <div class="info">
                    <p class="name">XXX</p>
                    <el-rate class="comment-rate" disabled v-model="value1"></el-rate>
                  </div>
                </div>
                <div class="right">2020.12.20  14:40:00</div>
              </div>
              <div class="comment-content">
                评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评
              </div>
            </div>
            <div class="comment-item">
              <div class="comment-header">
                <div class="left">
                  <img class="avatar" src="./images/avatar.png" >
                  <div class="info">
                    <p class="name">XXX</p>
                    <el-rate class="comment-rate" disabled v-model="value1"></el-rate>
                  </div>
                </div>
                <div class="right">2020.12.20  14:40:00</div>
              </div>
              <div class="comment-content">
                评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="delay" v-show="currentChild=='滞后项目'">
      <div class="title-wrapper">
        <span class="pre"></span>
        <span class="title">滞后项目</span>
      </div>
      <div class="count">
        <div class="count-item" v-for="(item,index) in delayData" :key="index">
          <div class="name">{{item.label}}</div>
          <div class="number" :class="{red: index<=2, blue: index>=3}">{{item.number}}</div>
        </div>
      </div>
      <div class="bottom">
        <div class="header">
          <div class="line"></div>
          <el-select v-model="zrdwValue" placeholder="请选择">
            <el-option
              v-for="item in zrdwOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="result-wrapper">
          <ul class="result-list">
            <li class="result-item header">
              <span class="flex2">项目名称</span>
              <span class="content">计划开工时间</span>
              <span class="content">计划建成时间</span>
              <span class="flex2">当前状态</span>
            </li>
            <li class="result-item" v-for="(item, index) in currentList" :key="index">
              <span class="flex2">{{ item.name }}</span>
              <span class="content">{{ item.consdates || '-' }}</span>
              <span class="content">{{ item.consdatee }}</span>
              <span class="flex2">{{ item.status }}</span>
            </li>
            <p class="no-data" v-show="!currentList.length">暂无数据</p>
          </ul>
        </div>
      </div>
    </div>
    <div class="problem" v-show="currentChild=='问题项目'">
      <div class="title-wrapper">
        <span class="pre"></span>
        <span class="title">问题项目</span>
      </div>
      <div class="count">
        <div class="count-item" v-for="(item,index) in problemData" :key="index">
          <div class="name">{{item.name}}</div>
          <div class="number" :class="{red: index<=2, blue: index>=3}">{{item.num}}</div>
        </div>
      </div>
      <div class="bottom">
        <div class="header">
          <div class="line"></div>
          <el-select class="delay-select" v-model="zrdwValue" placeholder="请选择">
            <el-option
              v-for="item in zrdwOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="result-wrapper">
          <ul class="result-list">
            <li class="result-item header">
              <span class="flex2">项目名称</span>
              <span class="content">存在问题</span>
            </li>
            <li class="result-item" v-for="(item, index) in currentList" :key="index">
              <span class="flex2">{{ item.name }}</span>
              <span class="content">{{ item.problem }}</span>
            </li>
            <p class="no-data" v-show="!currentList.length">暂无数据</p>
            <!-- <li class="result-item">
              <span class="flex2">{{ "葡萄8-5地块" }}</span>
              <span class="content">{{ "因为疫情影响，无法开工" }}</span>
            </li> -->
          </ul>
        </div>
      </div>
    </div>
    <div class="amount-spread" v-show="currentChild=='项目投资额分布'">
      <div class="title-wrapper">
        <span class="pre"></span>
        <span class="title">项目投资额分布</span>
      </div>
      <div class="header">
        <div class="tip">各责任单位投资总额（亿元）</div>
      </div>
      <div class="count">
        <div class="count-item" v-for="(item, index) in amountData" :key="index">
          <div class="name">{{item.name}}</div>
          <div class="number" :class="{red: index<=2, blue: index>=3}">{{parseInt(item.num/10000)}}</div>
        </div>
      </div>
      <div class="bottom">
        <div class="header">
          <div class="tip">项目投资额排名列表</div>
        </div>
        <div class="result-wrapper">
          <ul class="result-list">
            <li class="result-item header">
              <span class="flex2">项目名称</span>
              <span class="content">总投资额</span>
              <span class="content">责任单位</span>
            </li>
            <li class="result-item" v-for="(item, index) in amountList" :key="index">
              <span class="flex2">{{ item.name }}</span>
              <span class="content">{{ (item.totalamount).toFixed(1) }}万元</span>
              <span class="content">{{ item.sysOrgCode_dictText }}</span>
            </li>
            <!-- <li class="result-item">
              <span class="flex2">{{ "葡萄8-5地块" }}</span>
              <span class="content">{{ "2000万元" }}</span>
              <span class="content">{{ "鹿城区政府" }}</span>
            </li>
            <li class="result-item">
              <span class="flex2">{{ "葡萄8-5地块" }}</span>
              <span class="content">{{ "2000万元" }}</span>
              <span class="content">{{ "鹿城区政府" }}</span>
            </li> -->
          </ul>
        </div>
      </div>
      <div class="year-wrapper">
        <div class="year-item" :class="{'active': currentYear==2020}" @click="currentYear=2020">2020</div>
        <div class="year-item" :class="{'active': currentYear==2021}" @click="currentYear=2021">2021</div>
      </div>
    </div>
    <div class="proj-spread" v-show="currentChild=='项目分布'">
      <div class="title-wrapper">
        <span class="pre"></span>
        <span class="title">各乡镇街道项目数排名</span>
        <el-select style="width:100px;" v-model="districtValue" placeholder="请选择">
          <el-option
            v-for="item in districtOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="content">
        <div class="rank-item" v-for="(item, index) in currentStreetList" :key="index">
          <span class="name">{{item.name}}</span>
          <div class="progress" :class="{red: index<=2, blue: index>=3}" :style="{width: `${item.num*7}%`}"></div>
          <span class="num">{{item.num}}</span>
        </div>
        <!-- <div class="rank-item">
          <span class="name">景山街道</span>
          <div class="progress red" :style="{width: `62%`}"></div>
          <span class="rate">10</span>
        </div>
        <div class="rank-item">
          <span class="name">景山街道</span>
          <div class="progress red" :style="{width: `54%`}"></div>
          <span class="rate">9</span>
        </div>
        <div class="rank-item">
          <span class="name">景山街道</span>
          <div class="progress blue" :style="{width: `46%`}"></div>
          <span class="rate">8</span>
        </div>
        <div class="rank-item">
          <span class="name">景山街道</span>
          <div class="progress blue" :style="{width: `38%`}"></div>
          <span class="rate">7</span>
        </div>
        <div class="rank-item">
          <span class="name">景山街道</span>
          <div class="progress blue" :style="{width: `30%`}"></div>
          <span class="rate">6</span>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { ServiceUrl, LayerList } from "@/config/server/mapConfig";
import { switchHeatMap, doHeatMap } from "./HeatMap";
import {
  resourceProjectList,
  getProjStatusByDept,
  countProjectProgressNum,
  queryProgressList,
  countProjectStreetNum,
  countProjectAmound
} from "api/tangheAPI";
export default {
  data() {
    return {
      topicList: [
        {
          label: "进度预警专题",
          value: 1,
          children: ['滞后项目', '问题项目']
        },
        {
          label: "项目投资专题",
          value: 2,
          children: ['项目分布', '项目投资额分布']
        },
        {
          label: "绿化覆盖专题",
          value: 3,
        },
        {
          label: "城市规划专题",
          value: 4,
        },
        {
          label: "领导督办专题",
          value: 5,
        },
        {
          label: "周边活跃度分析",
          value: 6,
        },
        {
          label: "考核分析",
          value: 7,
        },
      ],
      currentTopic: 0,
      currentChild: '',
      ldfwFace: undefined,
      ldfwLine: undefined,
      konggui: undefined,
      xianzhuang: undefined,
      datasource: [],
      showAnalyze: false,
      // options: [{
      //   value: '选项1',
      //   label: '鹿城区政府'
      // }, {
      //   value: '选项2',
      //   label: '瑞安市政府'
      // }, {
      //   value: '选项3',
      //   label: '现代集团'
      // }, {
      //   value: '选项4',
      //   label: '城发集团'
      // }, {
      //   value: '选项5',
      //   label: '浙南产业区'
      // }],
      // value: '选项1',
      zrdwOptions: [
        // { label: "指挥部", value: "A02" },
        { label: "鹿城区政府", value: "A02A01" },
        { label: "龙湾区政府", value: "A02A03" },
        { label: "瓯海区政府", value: "A02A02" },
        { label: "瑞安市政府", value: "A02A04" },
        { label: "浙南产业区", value: "A02A05" },
        { label: "温州城发集团", value: "A02A07" },
        { label: "温州现代集团", value: "A02A06" },
      ],
      zrdwValue: 'A02A01',
      districtOptions: [
        { label: "鹿城区", value: "鹿城区" },
        { label: "龙湾区", value: "龙湾区" },
        { label: "瓯海区", value: "瓯海区" },
        { label: "瑞安市", value: "瑞安市" },
      ],
      districtValue: '鹿城区',
      showScore: false,
      value1: 4,
      projectList: [],
      delayData: [
        { label: "鹿城区政府", value: "A02A01", number: 0 },
        { label: "龙湾区政府", value: "A02A03", number: 0 },
        { label: "瓯海区政府", value: "A02A02", number: 0 },
        { label: "瑞安市政府", value: "A02A04", number: 0 },
        { label: "浙南产业区", value: "A02A05", number: 0 },
        { label: "温州城发集团", value: "A02A07", number: 0 },
        { label: "温州现代集团", value: "A02A06", number: 0 },
      ],
      problemData: [],
      streetData: [],
      amountData: [],
      // currentStreetList: [],
      amountList: [],
      currentYear: 2020
    };
  },
  computed: {
    currentList() {
      let res = this.projectList.filter(item => {
        return item.sysOrgCode == this.zrdwValue
      })
      return res
    },
    currentStreetList() {
      let res = this.streetData.find(item => {
        return item.name == this.districtValue
      })
      console.log('aaaaaaaaaaa', res)
      if (res) {
        let arr = res.countBaseRespList
        arr.sort((a, b) => {
          if (a.num < b.num) {
            return 1
          } else if (a.num > b.num) {
            return -1
          } else {
            return 0
          }
        })
        console.log('bbb', arr)
        return arr
      }
    }
  },
  methods: {
    itemClick(item) {
      // this.ldfwFace && (this.ldfwFace.show = false);
      // this.ldfwLine && (this.ldfwLine.show = false);
      // this.konggui && (this.konggui.show = false);
      // this.xianzhuang && (this.xianzhuang.show = false);
      // // 关闭热力图
      // switchHeatMap(false, "k1");
      // switchHeatMap(false, "k2");

      this.showAnalyze = false
      this.showScore = false
      this.currentChild = ''

      if (item.value == this.currentTopic) {
        this.currentTopic = 0;
        return;
      }
      this.currentTopic = item.value;
      if (item.value == 5) {
        this.showScore = true
      }
      if (item.value == 7) {
        this.showAnalyze = true
      }
      // if (item.value == 1) {
      //   if (this.datasource.length) {
      //     this.addHeatMap();
      //   } else {
      //     let node = LayerList[1];
      //     const url = ServiceUrl.FEATUREMVT;
      //     let getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams;
      //     getFeatureParam = new SuperMap.REST.FilterParameter({
      //       attributeFilter: `SMID <= 1000`,
      //     });
      //     getFeatureBySQLParams = new SuperMap.REST.GetFeaturesBySQLParameters({
      //       queryParameter: getFeatureParam,
      //       toIndex: -1,
      //       datasetNames: [node.dataset],
      //     });
      //     getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(
      //       url,
      //       {
      //         eventListeners: {
      //           processCompleted: async (res) => {
      //             this.datasource = res.result.features
      //             this.addHeatMap();
      //           },
      //           processFailed: (msg) => console.log(msg),
      //         },
      //       }
      //     );
      //     getFeatureBySQLService.processAsync(getFeatureBySQLParams);
      //   }
      // }
      // if (item.value == 2) {
      //   this.ldfwFace = window.earth.imageryLayers.addImageryProvider(
      //     new Cesium.SuperMapImageryProvider({
      //       url:
      //         "http://172.168.3.183:8090/iserver/services/3D-ldfw_polygon/rest/realspace/datas/ldfw_polygon",
      //     })
      //   );
      //   this.ldfwFace.alpha = 0.6;
      //   this.ldfwLine = window.earth.imageryLayers.addImageryProvider(
      //     new Cesium.SuperMapImageryProvider({
      //       url:
      //         "http://172.168.3.183:8090/iserver/services/3D-ldfw_line/rest/realspace/datas/ldfw_line",
      //     })
      //   );
      // }
      // if (item.value == 3) {
      //   this.konggui = window.earth.imageryLayers.addImageryProvider(
      //     new Cesium.SuperMapImageryProvider({
      //       url:
      //         "http://172.168.3.183:8090/iserver/services/3D-KGSQ/rest/realspace/datas/KGSQ",
      //     })
      //   );
      //   this.konggui.alpha = 0.8;
      // }
      // if (item.value == 4) {
      //   this.xianzhuang = window.earth.imageryLayers.addImageryProvider(
      //     new Cesium.SuperMapImageryProvider({
      //       url:
      //         "http://172.168.3.183:8090/iserver/services/3D-dltb/rest/realspace/datas/dltb",
      //     })
      //   );
      //   // window.earth.imageryLayers.lowerToBottom(this.xianzhuang);
      // }
    },
    childClick(item) {
      if (item == this.currentChild) {
        this.currentChild = '';
        this.$parent.showHub = true
        return;
      }
      this.$parent.showHub = false
      if (item == '滞后项目') {
        this.getDelayCount()
        this.getDelayList('*滞后*', item)
      }
      if (item == '问题项目') {
        this.getProblemCount()
        this.getProblemList(item)
      }
      if (item == '项目分布') {
        this.getStreetData(item)
      }
      if (item == '项目投资额分布') {
        this.getAmountCount(this.currentYear, item)
        this.getAoumtList()
      }
    },
    addHeatMap() {
      let smallHeatArr = [];
      let bigHeatArr = [];
      this.datasource.forEach((v) => {
        if (v.attributes.TOTALAMOUNT <= 3000) {
          smallHeatArr.push([
            v.geometry.x,
            v.geometry.y,
            v.attributes.TOTALAMOUNT,
          ]);
        }
        if (v.attributes.TOTALAMOUNT > 3000) {
          bigHeatArr.push([
            v.geometry.x,
            v.geometry.y,
            v.attributes.TOTALAMOUNT,
          ]);
        }
      });
      console.log("smallHeatArr???", smallHeatArr);
      console.log("bigHeatArr???", bigHeatArr);
      switchHeatMap(true, "k1", smallHeatArr, 30, 3000);
      switchHeatMap(true, "k2", bigHeatArr, 3000, 300000);
    },
    async getDelayCount() {
      let res = await getProjStatusByDept({
        status: '滞后'
      })
      if (res.code == 200) {
        this.delayData.forEach(item => {
          res.result.forEach(v => {
            if (item.value == v.sysOrgCode) {
              let number = 0
              v.statusInfos.forEach(info => {
                number += info.num
              })
              item.number = number
            }
          })
        })
        this.delayData.sort((a, b) => {
          if (a.number < b.number) {
            return 1
          } else if (a.number > b.number) {
            return -1
          } else {
            return 0
          }
        })
      }
    },
    async getDelayList(status, child) {
      let res = await resourceProjectList({
        delFlag: 0,
        status,
        pageNo: 1,
        pageSize: 9999,
      })
      if (res.code == 200) {
        this.projectList = res.result.records
        console.log('projectList', this.projectList)
        this.currentChild = child
      }
    },
    async getProblemCount() {
      let res = await countProjectProgressNum()
      if (res.code == 200) {
        this.problemData = res.result.slice(1)
      }
    },
    async getProblemList(child) {
      let res = await queryProgressList()
      if (res.code == 200) {
        this.projectList = res.result
        this.currentChild = child
      }
    },
    async getStreetData(child) {
      let res = await countProjectStreetNum()
      if (res.code == 200) {
        this.streetData = res.result
        this.currentChild = child
      }
    },
    async getAmountCount(year, child) {
      let res = await countProjectAmound({
        tag: year
      })
      if (res.code == 200) {
        let index = res.result.findIndex(item => {
          return item.name == '指挥部'
        })
        res.result.splice(index, 1)
        this.amountData = res.result
        this.amountData.sort((a, b) => {
          if (a.num < b.num) {
            return 1
          } else if (a.num > b.num) {
            return -1
          } else {
            return 0
          }
        })
        this.currentChild = child
      }
    },
    async getAoumtList(year) {
      let res = await resourceProjectList( {
        delFlag: 0,
        status,
        pageNo: 1,
        pageSize: 9999,
        tag: year,
        column: 'totalamount',
        order: 'desc'
      })
      if (res.code == 200) {
        this.amountList = res.result.records
      }
    }
  },
  watch: {
    currentYear(val) {
      this.getAoumtList(val)
      this.getAmountCount(this.currentYear, '项目投资额分布')
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./Topic.less");
</style>

<style lang="less">
.el-input__inner {
  background: transparent !important;
  border: solid 1px #40a1c5 !important;
  color: white !important;
}
.analyze-select {
  .el-input__inner {
    height: 30px;
    background-image: linear-gradient(90deg, #0065cb 0%, #002b8b 100%) !important;
    color: #fff !important;
    border-radius: 30px !important;
  }
  .el-input__icon {
    line-height: 30px !important;
  }
}
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
.total-rate {
  .el-rate__icon {
    margin-right: 0;
    font-size: 24px;
  }
}
.comment-rate {
  .el-rate__icon {
    margin-right: 0;
  }
}
</style>