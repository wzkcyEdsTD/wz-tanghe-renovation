<template>
  <div class="searchResult" v-show="showZB">
    <span class="close-btn" @click="closeSearch"></span>
    <div class="title-wrapper">
      <span class="pre"></span>
      <span class="title">周边搜索</span>
    </div>
    <div class="zhouBianFlex">
      <img src="./images/定位icon.png" class="dingwei">
      <div class="weizhi">当前位置：</div>
      <p class="text">{{name}}</p>
    </div>
    <div>
      <div class="fjxm">
        <div class="tp">
          <img src="./images/时间框.png" class="kuang">
          <span class="text">附近项目</span>
        </div>
      </div>
      <div class="list">
        <div class="search-header">
          <el-input
            v-model="searchXMText"
            class="searchFilterInput"
            placeholder="查找项目"
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
        <div class="result-wrapper">
          <ul class="result-list">
            <li class="result-item header">
              <span class="index">序号</span>
              <span class="name">项目名称</span>
              <span class="content">所属街道</span>
            </li>
            <li
              class="result-item"
              v-for="(item, index) in xmList"
              :key="index"
              @click="itemClick(item)"
            >
              <span class="index">{{ index + 1 }}</span>
              <span class="name" :title="item.attributes.NAME">{{
                    item.attributes.NAME
                  }}</span>
              <span class="content" :title="item.attributes.STREET">{{ item.attributes.STREET}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div>
      <div class="fjxm">
        <div class="tp">
          <img src="./images/时间框.png" class="kuang">
          <span class="text">附近断点</span>
        </div>
      </div>
      <div class="list">
        <div class="search-header">
          <el-input
            v-model="searchDDText"
            class="searchFilterInput"
            placeholder="查找断点"
            size="small"
            @keyup.enter.native="searchDDFilter"
          />
          <div class="button-container">
            <div class="button-item">
              <i class="icon-common icon-clear" @click="searchDDClear"></i>
            </div>
            <div class="button-item">
              <i class="icon-common icon-search" @click="searchDDFilter"></i>
            </div>
          </div>
        </div>
        <div class="result-wrapper">
          <ul class="result-list">
            <li class="result-item header">
              <span class="index">序号</span>
              <span class="name">断点名称</span>
              <span class="content">所属街道</span>
            </li>
            <li
              class="result-item"
              v-for="(item, index) in ddList"
              :key="index"
              @click="itemClick(item)"
            >
              <span class="index">{{ index + 1 }}</span>
              <!--            <div class="icon">-->
              <!--              <img src="static/images/source-icon/项目icon@2x.png" style="width: 2vh;">-->
              <!--            </div>-->

              <span class="name" :title="item.attributes.NAME">{{
                    item.attributes.NAME
                  }}</span>
              <span class="content" :title="item.attributes.STREET">{{ item.attributes.STREET}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div>
      <div class="fjxm">
        <div class="tp">
          <img src="./images/时间框.png" class="kuang">
          <span class="text">附近全景</span>
        </div>
      </div>
      <div class="list">
        <div class="search-header">
          <el-input
            v-model="searchQJText"
            class="searchFilterInput"
            placeholder="查找全景"
            size="small"
            @keyup.enter.native="searchQJFilter"
          />
          <div class="button-container">
            <div class="button-item">
              <i class="icon-common icon-clear" @click="searchQJClear"></i>
            </div>
            <div class="button-item">
              <i class="icon-common icon-search" @click="searchQJFilter"></i>
            </div>
          </div>
        </div>
        <div class="result-wrapper">
          <ul class="result-list">
            <li class="result-item header">
              <span class="index">序号</span>
              <span class="name">全景名称</span>
              <span class="content">所属街道</span>
            </li>
            <li
              class="result-item"
              v-for="(item, index) in qjList"
              :key="index"
              @click="itemClick(item)"
            >
              <span class="index">{{ index + 1 }}</span>
              <span class="name" :title="item.attributes.NAME">{{
                    item.attributes.NAME
                  }}</span>
              <span class="content" :title="item.attributes.STREET">{{ item.attributes.STREET}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      showLarge: window.showLarge,
      questionXmList:null,
      questionDdList:null,
      questionQjList:null,
      searchXMText:'',
      xmList:[],
      searchDDText:'',
      ddList:[],
      searchQJText:'',
      qjList:[],
      showZB:false,
      name:'',
      forceEntity: {},
      }
  },
  computed:{
    ...mapGetters("map", ["bufferQueryData"]),
  },
  methods:{
    searchXMClear() {
      this.searchXMText = "";
      this.xmList = [];
      this.searchXMFilter();
    },
    searchXMFilter() {
      // console.log(this.currentXmList);
      let allSearchList = this.questionXmList;
      allSearchList = allSearchList.filter(item => {
        return item.attributes.NAME.length
      })
      this.xmList = this.searchXMText
        ? allSearchList.filter((item) => {
          return item.attributes.NAME.indexOf(this.searchXMText) >= 0;
        })
        : allSearchList;
    },
    searchDDClear() {
      this.searchDDText = "";
      this.ddList = [];
      this.searchDDFilter();
    },
    searchDDFilter() {
      // console.log(this.currentXmList);
      let allSearchList = this.questionDdList;
      allSearchList = allSearchList.filter(item => {
        return item.attributes.NAME.length
      })
      this.ddList = this.searchDDText
        ? allSearchList.filter((item) => {
          return item.attributes.NAME.indexOf(this.searchDDText) >= 0;
        })
        : allSearchList;
    },
    searchQJClear() {
      this.searchQJText = "";
      this.qjList = [];
      this.searchQJFilter();
    },
    searchQJFilter() {
      // console.log(this.currentXmList);
      let allSearchList = this.questionQjList;
      allSearchList = allSearchList.filter(item => {
        return item.attributes.NAME.length
      })
      this.qjList = this.searchQJText
        ? allSearchList.filter((item) => {
          return item.attributes.NAME.indexOf(this.searchQJText) >= 0;
        })
        : allSearchList;
    },
    closeSearch(){
      this.showZB = false;
      this.questionQjList=[];
      this.questionXmList=[];
      this.questionDdList=[];
    },
    getdata(temp){
      this.name = this.forceEntity.attributes.NAME;
      this.questionQjList = temp['quanjin'];
      this.questionXmList = temp['项目'];
      this.questionDdList = temp['绿道断点'];
      this.xmList = this.questionXmList;
      this.ddList = this.questionDdList;
      this.qjList = this.questionQjList;
    },
    itemClick(item){
      const { x, y } = item.geometry;
      // const x = Number(item.attributes.JD);
      // const y = Number(item.attributes.WD);
      window.earth.camera.flyTo({
        //120.68369804064305 27.992073587314962
        destination: Cesium.Cartesian3.fromDegrees(x, y, 450),
        orientation: {
          heading: 0.01768860454315663,
          pitch: Cesium.Math.toRadians(-90),
          roll: 0.0,
        },
        maximumHeight: 450,
      });
    },
    getForceEntity(forceEntity) {
      this.forceEntity = forceEntity;
      this.showZB = true
    },
  },
  mounted() {
  },
}
</script>

<style lang="less">
@import url("./searchDetail.less");
</style>
