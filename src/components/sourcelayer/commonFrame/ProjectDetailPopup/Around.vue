<template>
  <el-collapse v-model="activeNames" @change="collapseChange">
    <el-collapse-item title="查看周边" name="查看周边">
      <div class="perimeterSearch">
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
        <div
          v-show="
            qjList && currentPage == 'sourcelayer'
              ? qjList.length > 0
                ? true
                : false
              : false
          "
        >
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
        <div
          v-show="
            spList && currentPage == 'sourcelayer'
              ? spList.length > 0
                ? true
                : false
              : false
          "
        >
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
        <div
          v-show="bridgeList ? (bridgeList.length > 0 ? true : false) : false"
        >
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

        <div
          v-show="
            !isListEmpty(xmList) &&
            !isListEmpty(ddList) &&
            !isListEmpty(qjList) &&
            !isListEmpty(spList) &&
            !isListEmpty(spotList) &&
            !isListEmpty(wharfList) &&
            !isListEmpty(bridgeList)
          "
          class="description"
        >
          暂无周边信息
        </div>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  props: ["forceEntity", "aroundData"],
  data() {
    return {
      activeNames: [],
      questionXmList: null,
      questionDdList: null,
      questionQjList: null,
      questionSpList: null,
      questionSpotList: null,
      questionBusList: null,
      questionToiletList: null,
      questionWharfList: null,
      questionBridgeList: null,
      xmList: [],
      ddList: [],
      qjList: [],
      spList: [],
      spotList: [],
      busList: [],
      toiletList: [],
      wharfList: [],
      bridgeList: [],
    };
  },
  computed: {
    currentPage() {
      // vue中获取当前路由name
      return this.$route.name;
    },
  },
  methods: {
    // 折叠面板事件监听
    collapseChange(val) {
      this.activeNames = val
      // 展开画圆，收起清除
      if (val.length) {
        this.$parent.$parent.drawProjectCircle(this.forceEntity, this.forceEntity.name);
      } else {
        this.$parent.$parent.removeProjectCircle();
      }
    },
    itemClick(item) {
      console.log("itemClick!!!???", item);
      // const { x, y } = item.geometry;

      // // 定位图标，详情变换
      // this.$parent.addLocationIcon(item.geometry, item.id);
      // if (~item.type.indexOf("项目") || item.type == "绿道断点") {
      //   this.getForceEntity(item);
      // } else {
      //   this.$parent.$refs.commonDetailPopup.goDetail(item)
      // }
      // this.closeCollapse();

      // window.earth.camera.flyTo({
      //   destination: Cesium.Cartesian3.fromDegrees(x, y, 1200),
      //   orientation: {
      //     heading: 0.01768860454315663,
      //     pitch: Cesium.Math.toRadians(-90),
      //     roll: 0.0,
      //   },
      //   complete: () => {
      //     this.$bus.$emit("clickFly");
      //   },
      // });
    },
    getdata() {
      let temp = this.aroundData
      console.log('aroundData', temp)
      let name = this.forceEntity.name;
      this.$nextTick(() => {
        this.questionQjList = temp["th_spatial_all"];
        this.questionXmList = temp["th_spatial_project_view"];
        this.questionDdList = temp["th_spatial_greenway_view"];
        this.questionSpList = temp["th_spatial_all"];
        this.questionSpotList = temp["sp_point_resource"];
        this.questionBusList = temp["resource_jiaotong"];
        this.questionToiletList = temp["resource_toilet"];
        this.questionWharfList = temp["resource_wharf"];
        this.questionBridgeList = temp["resource_bridge"];
        if (this.questionQjList) {
          this.questionQjList = this.questionQjList.filter((item) => {
            return item.attributes.NAME != name;
          });
        }
        if (this.questionXmList) {
          this.questionXmList = this.questionXmList.filter((item) => {
            return item.attributes.NAME != name;
          });
        }
        if (this.questionDdList) {
          this.questionDdList = this.questionDdList.filter((item) => {
            return item.attributes.NAME != name;
          });
        }
        if (this.questionSpList) {
          this.questionSpList = this.questionSpList.filter((item) => {
            return item.attributes.NAME != name;
          });
        }
        if (this.questionSpotList) {
          this.questionSpotList = this.questionSpotList.filter((item) => {
            return item.attributes.NAME != name;
          });
        }
        if (this.questionBusList) {
          this.questionBusList = this.questionBusList.filter((item) => {
            return item.attributes.NAME != name;
          });
        }
        if (this.questionToiletList) {
          this.questionToiletList = this.questionToiletList.filter((item) => {
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
        this.busList = this.questionBusList;
        this.toiletList = this.questionToiletList;
        this.wharfList = this.questionWharfList;
        this.bridgeList = this.questionBridgeList;
      });
    },

    // 判断数组是否为空
    isListEmpty(list) {
      if (!list) return false;
      if (list instanceof Array) {
        if (list.length) return true;
      }
      return false;
    },
  },
  watch: {
    aroundData(val) {
      this.getdata()
    }
  },
};
</script>

<style lang="less" scoped>
@import url("./Around.less");
</style>