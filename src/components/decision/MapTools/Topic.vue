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
        <el-select class="analyze-select" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
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
    <div class="delay" v-show="currentChild=='延期项目'">
      <div class="title-wrapper">
        <span class="pre"></span>
        <span class="title">延期项目</span>
      </div>
      <div class="count">
        <div class="count-item">
          <div class="name">鹿城区政府</div>
          <div class="number red">09</div>
        </div>
        <div class="count-item">
          <div class="name">鹿城区政府</div>
          <div class="number red">09</div>
        </div>
        <div class="count-item">
          <div class="name">鹿城区政府</div>
          <div class="number red">09</div>
        </div>
        <div class="count-item">
          <div class="name">鹿城区政府</div>
          <div class="number blue">09</div>
        </div>
        <div class="count-item">
          <div class="name">鹿城区政府</div>
          <div class="number blue">09</div>
        </div>
        <div class="count-item">
          <div class="name">鹿城区政府</div>
          <div class="number blue">09</div>
        </div>
        <div class="count-item">
          <div class="name">鹿城区政府</div>
          <div class="number blue">09</div>
        </div>
      </div>
      <div class="bottom">
        <div class="header">
          <div class="line"></div>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
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
            <li class="result-item">
              <span class="flex2">{{ "葡萄8-5地块" }}</span>
              <span class="content">{{ "2020-02-04" }}</span>
              <span class="content">{{ "2020-02-04" }}</span>
              <span class="flex2">{{ "延期" }}</span>
            </li>
            <li class="result-item">
              <span class="flex2">{{ "葡萄8-5地块" }}</span>
              <span class="content">{{ "2020-02-04" }}</span>
              <span class="content">{{ "2020-02-04" }}</span>
              <span class="flex2">{{ "延期" }}</span>
            </li>
            <li class="result-item">
              <span class="flex2">{{ "葡萄8-5地块" }}</span>
              <span class="content">{{ "2020-02-04" }}</span>
              <span class="content">{{ "2020-02-04" }}</span>
              <span class="flex2">{{ "延期" }}</span>
            </li>
            <!-- <li class="result-item" v-for="(item, index) in lightXmList" :key="index">
              <span class="index">{{ index }}</span>
              <span class="name">{{ item.attributes.NAME }}</span>
              <span class="content">{{ item.attributes.ZR_DEPTID }}</span>
              <span class="content">{{ item.attributes.CURRENT_STATE }}</span>
            </li> -->
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
        <div class="count-item">
          <div class="name">鹿城区政府</div>
          <div class="number red">09</div>
        </div>
        <div class="count-item">
          <div class="name">鹿城区政府</div>
          <div class="number red">09</div>
        </div>
        <div class="count-item">
          <div class="name">鹿城区政府</div>
          <div class="number red">09</div>
        </div>
        <div class="count-item">
          <div class="name">鹿城区政府</div>
          <div class="number blue">09</div>
        </div>
        <div class="count-item">
          <div class="name">鹿城区政府</div>
          <div class="number blue">09</div>
        </div>
        <div class="count-item">
          <div class="name">鹿城区政府</div>
          <div class="number blue">09</div>
        </div>
        <div class="count-item">
          <div class="name">鹿城区政府</div>
          <div class="number blue">09</div>
        </div>
      </div>
      <div class="bottom">
        <div class="header">
          <div class="line"></div>
          <el-select class="delay-select" v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
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
            <li class="result-item">
              <span class="flex2">{{ "葡萄8-5地块" }}</span>
              <span class="content">{{ "因为疫情影响，无法开工" }}</span>
            </li>
            <li class="result-item">
              <span class="flex2">{{ "葡萄8-5地块" }}</span>
              <span class="content">{{ "因为疫情影响，无法开工" }}</span>
            </li>
            <li class="result-item">
              <span class="flex2">{{ "葡萄8-5地块" }}</span>
              <span class="content">{{ "因为疫情影响，无法开工" }}</span>
            </li>
            <!-- <li class="result-item" v-for="(item, index) in lightXmList" :key="index">
              <span class="index">{{ index }}</span>
              <span class="name">{{ item.attributes.NAME }}</span>
              <span class="content">{{ item.attributes.ZR_DEPTID }}</span>
              <span class="content">{{ item.attributes.CURRENT_STATE }}</span>
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
        <div class="tip">各责任单位投资总额（万元）</div>
      </div>
      <div class="count">
        <div class="count-item">
          <div class="name">鹿城区政府</div>
          <div class="number red">09</div>
        </div>
        <div class="count-item">
          <div class="name">鹿城区政府</div>
          <div class="number red">09</div>
        </div>
        <div class="count-item">
          <div class="name">鹿城区政府</div>
          <div class="number red">09</div>
        </div>
        <div class="count-item">
          <div class="name">鹿城区政府</div>
          <div class="number blue">09</div>
        </div>
        <div class="count-item">
          <div class="name">鹿城区政府</div>
          <div class="number blue">09</div>
        </div>
        <div class="count-item">
          <div class="name">鹿城区政府</div>
          <div class="number blue">09</div>
        </div>
        <div class="count-item">
          <div class="name">鹿城区政府</div>
          <div class="number blue">09</div>
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
            <li class="result-item">
              <span class="flex2">{{ "葡萄8-5地块" }}</span>
              <span class="content">{{ "2000万元" }}</span>
              <span class="content">{{ "鹿城区政府" }}</span>
            </li>
            <li class="result-item">
              <span class="flex2">{{ "葡萄8-5地块" }}</span>
              <span class="content">{{ "2000万元" }}</span>
              <span class="content">{{ "鹿城区政府" }}</span>
            </li>
            <li class="result-item">
              <span class="flex2">{{ "葡萄8-5地块" }}</span>
              <span class="content">{{ "2000万元" }}</span>
              <span class="content">{{ "鹿城区政府" }}</span>
            </li>
            <!-- <li class="result-item" v-for="(item, index) in lightXmList" :key="index">
              <span class="index">{{ index }}</span>
              <span class="name">{{ item.attributes.NAME }}</span>
              <span class="content">{{ item.attributes.ZR_DEPTID }}</span>
              <span class="content">{{ item.attributes.CURRENT_STATE }}</span>
            </li> -->
          </ul>
        </div>
      </div>
      <div class="year-wrapper">
        <div class="year-item active">2020</div>
        <div class="year-item">2021</div>
      </div>
    </div>
    <div class="proj-spread" v-show="currentChild=='项目分布'">
      <div class="title-wrapper">
        <span class="pre"></span>
        <span class="title">各乡镇街道项目数排名</span>
      </div>
      <div class="content">
        <div class="rank-item">
          <span class="name">景山街道</span>
          <div class="progress red" :style="{width: `70%`}"></div>
          <span class="rate">11</span>
        </div>
        <div class="rank-item">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ServiceUrl, LayerList } from "@/config/server/mapConfig";
import { switchHeatMap, doHeatMap } from "./HeatMap";
export default {
  data() {
    return {
      topicList: [
        {
          label: "进度预警专题",
          value: 1,
          children: ['延期项目', '问题项目']
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
      options: [{
        value: '选项1',
        label: '鹿城区政府'
      }, {
        value: '选项2',
        label: '瑞安市政府'
      }, {
        value: '选项3',
        label: '现代集团'
      }, {
        value: '选项4',
        label: '城发集团'
      }, {
        value: '选项5',
        label: '浙南产业区'
      }],
      value: '选项1',
      showScore: false,
      value1: 4,
    };
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

      if (item.value == this.currentTopic) {
        this.currentChild = ''
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
      this.currentChild = item
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
  },
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