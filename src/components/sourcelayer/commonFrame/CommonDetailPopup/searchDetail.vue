<template>
  <div class="searchResult" v-show="showZB">
    <div class="head">
      <span class="close-btn" @click="closeSearch"></span>
      <div class="title-wrapper">
        <span class="pre"></span>
        <span class="title">周边搜索</span>
      </div>
      <div class="zhouBianFlex">
        <img src="./images/定位icon.png" class="dingwei" />
        <div class="weizhi">当前位置：</div>
        <p class="text">{{ name }}</p>
      </div>
    </div>
    <div class="result">
      <div v-show="xmList ? (xmList.length > 0 ? true : false) : false">
        <div class="fjxm">
          <div class="tp">
            <img src="./images/时间框.png" class="kuang" />
            <span class="text">附近项目</span>
          </div>
        </div>
        <div class="list">
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
                <span class="content" :title="item.attributes.STREET">{{
                  item.attributes.STREET
                }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-show="ddList ? (ddList.length > 0 ? true : false) : false">
        <div class="fjxm">
          <div class="tp">
            <img src="./images/时间框.png" class="kuang" />
            <span class="text">附近断点</span>
          </div>
        </div>
        <div class="list">
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
                <span class="content" :title="item.attributes.STREET">{{
                  item.attributes.STREET
                }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-show="qjList ? (qjList.length > 0 ? true : false) : false">
        <div class="fjxm">
          <div class="tp">
            <img src="./images/时间框.png" class="kuang" />
            <span class="text">附近全景</span>
          </div>
        </div>
        <div class="list">
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
                <span class="content" :title="item.attributes.STREET">{{
                  item.attributes.STREET
                }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-show="spList ? (spList.length > 0 ? true : false) : false">
        <div class="fjxm">
          <div class="tp">
            <img src="./images/时间框.png" class="kuang" />
            <span class="text">附近视频</span>
          </div>
        </div>
        <div class="list">
          <div class="result-wrapper">
            <ul class="result-list">
              <li class="result-item header">
                <span class="index">序号</span>
                <span class="name">视频名称</span>
                <span class="content">所属街道</span>
              </li>
              <li
                class="result-item"
                v-for="(item, index) in spList"
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
                <span class="content" :title="item.attributes.STREET">{{
                  item.attributes.STREET
                }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-show="spotList ? (spotList.length > 0 ? true : false) : false">
        <div class="fjxm">
          <div class="tp">
            <img src="./images/时间框.png" class="kuang" />
            <span class="text">附近景点</span>
          </div>
        </div>
        <div class="list">
          <div class="result-wrapper">
            <ul class="result-list">
              <li class="result-item header">
                <span class="index">序号</span>
                <span class="name">景点名称</span>
                <span class="content">所属街道</span>
              </li>
              <li
                class="result-item"
                v-for="(item, index) in spotList"
                :key="index"
                @click="itemClick(item)"
              >
                <span class="index">{{ index + 1 }}</span>
                <span class="name" :title="item.attributes.NAME">{{
                  item.attributes.NAME
                }}</span>
                <span class="content" :title="item.attributes.STREET">{{
                  item.attributes.STREET
                }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-show="wharfList ? (wharfList.length > 0 ? true : false) : false">
        <div class="fjxm">
          <div class="tp">
            <img src="./images/时间框.png" class="kuang" />
            <span class="text">附近码头</span>
          </div>
        </div>
        <div class="list">
          <div class="result-wrapper">
            <ul class="result-list">
              <li class="result-item header">
                <span class="index">序号</span>
                <span class="name">码头名称</span>
                <span class="content">所属街道</span>
              </li>
              <li
                class="result-item"
                v-for="(item, index) in wharfList"
                :key="index"
                @click="itemClick(item)"
              >
                <span class="index">{{ index + 1 }}</span>
                <span class="name" :title="item.attributes.NAME">{{
                  item.attributes.NAME
                }}</span>
                <span class="content" :title="item.attributes.STREET">{{
                  item.attributes.STREET
                }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-show="bridgeList ? (bridgeList.length > 0 ? true : false) : false">
        <div class="fjxm">
          <div class="tp">
            <img src="./images/时间框.png" class="kuang" />
            <span class="text">附近桥梁</span>
          </div>
        </div>
        <div class="list">
          <div class="result-wrapper">
            <ul class="result-list">
              <li class="result-item header">
                <span class="index">序号</span>
                <span class="name">桥梁名称</span>
                <span class="content">所属街道</span>
              </li>
              <li
                class="result-item"
                v-for="(item, index) in bridgeList"
                :key="index"
                @click="itemClick(item)"
              >
                <span class="index">{{ index + 1 }}</span>
                <span class="name" :title="item.attributes.NAME">{{
                  item.attributes.NAME
                }}</span>
                <span class="content" :title="item.attributes.STREET">{{
                  item.attributes.STREET
                }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      // showLarge: window.showLarge,
      questionXmList: null,
      questionDdList: null,
      questionQjList: null,
      questionSpList: null,
      questionSpotList: null,
      questionWharfList: null,
      questionBridgeList: null,
      // searchXMText:'',
      xmList: [],
      // searchDDText:'',
      ddList: [],
      // searchQJText:'',
      qjList: [],
      spList: [],
      spotList: [],
      wharfList: [],
      bridgeList: [],
      showZB: false,
      name: "",
      forceEntity: {},
    };
  },
  computed: {
    ...mapGetters("map", ["bufferQueryData"]),
  },
  methods: {
    closeSearch() {
      this.showZB = false;
      this.questionQjList = [];
      this.questionXmList = [];
      this.questionDdList = [];
      this.questionSpList = [];
      this.questionSpotList = [];
      this.questionWharfList = [];
      this.questionBridgeList = [];
    },
    getdata(temp) {
      this.name = this.forceEntity.attributes.NAME;
      this.questionQjList = temp["quanjin"];
      this.questionXmList = temp["项目"];
      this.questionDdList = temp["绿道断点"];
      this.questionSpList = temp["shipin"];
      this.questionSpotList = temp["scenic_spot"];
      this.questionWharfList = temp["wharf"];
      this.questionBridgeList = temp["bridge"];
      if (this.questionQjList) {
        this.questionQjList = this.questionQjList.filter((item) => {
          return item.attributes.NAME != this.name;
        });
      }
      if (this.questionXmList) {
        this.questionXmList = this.questionXmList.filter((item) => {
          return item.attributes.NAME != this.name;
        });
      }
      if (this.questionDdList) {
        this.questionDdList = this.questionDdList.filter((item) => {
          return item.attributes.NAME != this.name;
        });
      }
      if (this.questionSpList) {
        this.questionSpList = this.questionSpList.filter((item) => {
          return item.attributes.NAME != this.name;
        });
      }
      if (this.questionSpotList) {
        this.questionSpotList = this.questionSpotList.filter((item) => {
          return item.attributes.NAME != name;
        });
      }
      if (this.questionWharfList) {
        this.questionWharfList = this.questionWharfList.filter((item) => {
          return item.attributes.NAME != name;
        });
      }
      if (this.questionBridgeList) {
        this.questionBridgeList = this.questionBridgeList.filter((item) => {
          return item.attributes.NAME != name;
        });
      }
      this.xmList = this.questionXmList;
      this.ddList = this.questionDdList;
      this.qjList = this.questionQjList;
      this.spList = this.questionSpList;
      this.spotList = this.questionSpotList;
      this.wharfList = this.questionWharfList;
      this.bridgeList = this.questionBridgeList;
    },
    itemClick(item) {
      const { x, y } = item.geometry;
      window.earth.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(x, y, 450),
        orientation: {
          heading: 0.01768860454315663,
          pitch: Cesium.Math.toRadians(-90),
          roll: 0.0,
        },
        maximumHeight: 450,
        complete: () => {
          this.$bus.$emit("clickFly");
        },
      });
    },
    getForceEntity(forceEntity) {
      console.log("forceEntity", forceEntity);
      this.forceEntity = forceEntity;
      this.showZB = true;
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
@import url("./searchDetail.less");
</style>
