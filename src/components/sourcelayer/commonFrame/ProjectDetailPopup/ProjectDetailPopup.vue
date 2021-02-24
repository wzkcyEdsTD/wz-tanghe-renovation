<template>
  <div>
    <transition name="fade">
      <div class="project-detail-popup" v-show="isShow">
        <span class="close-btn" @click="closeDetail"></span>
        <div class="title-wrapper">
          <span class="pre"></span>
          <span class="title">{{ detailData.name }}</span>
        </div>
        <div class="content-info">
          <div class="jgt-wrapper" v-show="jgtList.length">
            <div class="swiper-buttons jgt-swiper-button-left"></div>
            <swiper
              class="swiper-wrapper"
              :options="jgtSwiperOptions"
            >
              <swiper-slide
                v-for="(item, i) in jgtList"
                :key="i"
                class="swiper-item"
              >
                <el-image
                  style="height:100%;"
                  :src="item"
                  fit="cover"
                  @click="onJGTPreview(jgtList, i)"
                ></el-image>
              </swiper-slide>
            </swiper>
            <div class="swiper-buttons jgt-swiper-button-right"></div>
          </div>
          <div class="btn-list">
            <button
              class="btn-item"
              :disabled="!detailData.overallViews || !detailData.overallViews.length"
              :class="{
                active: currentShow == 'qj',
                disabled: !detailData.overallViews || !detailData.overallViews.length,
              }"
              @click="onTypeClick('qj')"
            >
              全景
            </button>
            <button
              class="btn-item"
              :disabled="!detailData.videos || !detailData.videos.length"
              :class="{
                active: currentShow == 'sp',
                disabled: !detailData.videos || !detailData.videos.length,
              }"
              @click="onTypeClick('sp')"
            >
              视频
            </button>
            <button
              class="btn-item"
              :disabled="!detailData.photos || !detailData.photos.length"
              :class="{
                active: currentShow == 'photo',
                disabled: !detailData.photos || !detailData.photos.length,
              }"
              @click="onTypeClick('photo')"
            >
              图片
            </button>
          </div>
          <div class="media-content">
            <div class="top">
              <div class="swiper-buttons swiper-button-left"></div>
              <swiper
                ref="mySwiper"
                class="swiper-wrapper"
                :options="swiperOptions"
                v-show="currentShow == 'qj'"
              >
                <swiper-slide
                  v-for="(item, i) in currentData.qjslt"
                  :key="i"
                  class="swiper-item"
                >
                  <el-image
                    style="height:100%;"
                    fit="cover"
                    :src="`${MediaServer}/${item}`"
                    @click="openQJ(i)"
                  ></el-image>
                </swiper-slide>
                <swiper-slide class="swiper-item" v-if="!currentData.qjslt">
                  <div class="no-tip">暂无数据</div>
                </swiper-slide>
                <div class="swiper-scrollbar" slot="scrollbar"></div>
              </swiper>
              <swiper
                ref="mySwiper"
                class="swiper-wrapper"
                :options="swiperOptions"
                v-show="currentShow == 'sp'"
              >
                <swiper-slide
                  v-for="(item, i) in currentData.sp"
                  :key="i"
                  class="swiper-item"
                >
                  <video
                    ref="video"
                    style="width:100%;height:100%;"
                    :src="`${MediaServer}/${item}`"
                    controls="controls"
                    muted
                  ></video>
                </swiper-slide>
                <swiper-slide class="swiper-item" v-if="!currentData.sp">
                  <div class="no-tip">暂无数据</div>
                </swiper-slide>
                <div class="swiper-scrollbar" slot="scrollbar"></div>
              </swiper>
              <swiper
                ref="mySwiper"
                class="swiper-wrapper"
                :options="swiperOptions"
                v-show="currentShow == 'photo'"
              >
                <swiper-slide
                  v-for="(item, i) in currentData.photo"
                  :key="i"
                  class="swiper-item"
                >
                  <el-image
                    style="height:100%;"
                    :src="`${MediaServer}/${item}`"
                    fit="cover"
                    @click="onPreview(currentData.photo, i)"
                  ></el-image>
                </swiper-slide>
                <swiper-slide class="swiper-item" v-if="!currentData.photo">
                  <div class="no-tip">暂无数据</div>
                </swiper-slide>
                <div class="swiper-scrollbar" slot="scrollbar"></div>
              </swiper>
              <div class="swiper-buttons swiper-button-right"></div>
            </div>
            <div class="bottom">
              <swiper
                ref="SwiperTime"
                class="swiper-time"
                :options="timeSwiperOption"
              >
                <swiper-slide
                  v-for="(item, index) in finalList"
                  :key="index"
                  :class="{ active: currentIndex == index }"
                >
                  <div class="item-content">
                    <span>{{ item.date && item.date.substring(0, 4) }}</span>
                    <span>{{ item.date && item.date.substring(5) }}</span>
                  </div>
                </swiper-slide>
              </swiper>
              <div class="item-wrapper"></div>
              <div class="item-check"></div>
            </div>
          </div>
        </div>
        <div class="base-info">
          <div class="title-wrapper">
            <span class="title">信息详情</span>
            <div class="more-group">
              <span
                class="more"
                v-show="resourceType=='project_all' && isImportant"
                @click="openPlan(detailData)"
                >查看计划>></span
              >
              <span
                class="more"
                v-show="resourceType=='project_all'"
                @click="openInfo()"
                >查看更多>></span
              >
            </div>            
          </div>
          <div class="base-content">
            <div class="base-item">
              <div class="title">
                <img src="./images/name-icon.png" />
                <span>名称：</span>
              </div>
              <div class="value">{{ detailData.name }}</div>
            </div>
            <div class="inline bg">
              <div class="base-item" v-if="resourceType=='project_all'">
                <div class="title">
                  <img src="./images/type-icon.png" />
                  <span>类型：</span>
                </div>
                <div class="value">{{ detailData.fundType }}</div>
              </div>
              <div class="base-item" v-if="resourceType=='greenway_all'">
                <div class="title">
                  <img src="./images/length-icon.png" />
                  <span>断点长度：</span>
                </div>
                <div class="value">{{ detailData.length }}米</div>
              </div>
              <div class="base-item" v-if="resourceType=='project_all'">
                <div class="title">
                  <img src="./images/count-icon.png" />
                  <span>总投资：</span>
                </div>
                <div class="value">
                  {{
                    detailData.totalamount
                      ? `${detailData.totalamount}万元`
                      : "无"
                  }}
                </div>
              </div>
            </div>
            <div class="inline">
              <div class="base-item">
                <div class="title">
                  <img src="./images/unit-icon.png" />
                  <span>责任单位：</span>
                </div>
                <div class="value">
                  {{
                    detailData.sysOrgCodeName
                  }}
                </div>
              </div>
              <div class="base-item">
                <div class="title">
                  <img src="./images/street-icon.png" />
                  <span>所属街道：</span>
                </div>
                <div class="value">{{ detailData.street }}</div>
              </div>
            </div>
            <div class="base-item bg">
              <div class="title">
                <img src="./images/question-icon.png" />
                <span>问题：</span>
              </div>
              <div class="value">
                {{
                  detailData.problems
                    ? detailData.problems
                    : "无"
                }}
              </div>
            </div>
            <div class="base-item" v-if="resourceType=='project_all'">
              <div class="title">
                <img src="./images/question-icon.png" />
                <span>规模：</span>
              </div>
              <div class="value">
                {{
                  detailData.contentgm
                    ? detailData.contentgm
                    : "无"
                }}
              </div>
            </div>
            <div class="base-item bg">
              <div class="title">
                <img src="./images/question-icon.png" />
                <span>最新进展：</span>
              </div>
              <div class="value">
                {{
                  detailData.recentStatus
                    ? detailData.recentStatus
                    : "无"
                }}
              </div>
            </div>
            <div class="base-item">
              <div class="title">
                <img src="./images/plan-icon.png" />
                <span>计划时间：</span>
              </div>
            </div>
            <div
              class="time-line-wrapper"
              v-if="resourceType=='project_all'"
            >
              <div class="time-line">
                <div class="progressEmpty">
                  <img src="./images/计划时间轴底.png" class="empty" />
                  <div
                    class="progressFull"
                    v-if="detailData.status == '前期研究'"
                  >
                    <img src="./images/前期研究.png" class="full" />
                  </div>
                  <div
                    class="progressFull"
                    v-if="detailData.status == '前期(滞后)'"
                  >
                    <img src="./images/前期滞后.png" class="full" />
                  </div>
                  <div
                    class="progressFull"
                    v-if="detailData.status == '在建'"
                  >
                    <img src="./images/正在建设.png" class="full" />
                  </div>
                  <div
                    class="progressFull"
                    v-if="detailData.status == '在建(滞后)'"
                  >
                    <img src="./images/建设滞后.png" class="full" />
                  </div>
                  <div
                    class="progressFull"
                    v-if="detailData.status == '完工'"
                  >
                    <img src="./images/完美建设.png" class="full" />
                  </div>
                </div>
                <div v-if="detailData.status == '前期研究'">
                  <div class="pop pop1">前期研究</div>
                </div>
                <div
                  v-if="detailData.status == '前期(滞后)'"
                >
                  <div class="pop pop2">前期滞后</div>
                </div>
                <div v-if="detailData.status == '在建'">
                  <div class="pop pop3">正在建设</div>
                </div>
                <div
                  v-if="detailData.status == '在建(滞后)'"
                >
                  <div class="pop pop4">在建滞后</div>
                </div>
                <div v-if="detailData.status == '完工'">
                  <div class="pop pop5">完工建设</div>
                </div>
              </div>
              <div class="time-desc">
                <div class="start-time">
                  计划开工时间：{{ detailData.consdates }}
                </div>
                <div class="end-time">
                  计划建成时间：{{ detailData.consdatee }}
                </div>
              </div>
            </div>
            <div
              class="time-line-wrapper"
              v-if="resourceType=='greenway_all'"
            >
              <div class="time-line">
                <div
                  class="line-item green"
                  :style="{
                    flex:
                      detailData.consdatee && detailData.consdatee.substring(0, 4) > 2021
                        ? 0.5
                        : 3,
                  }"
                ></div>
                <div class="line-item light-blue"></div>
                <div
                  v-if="detailData.consdatee && detailData.consdatee.substring(0, 4) > 2021"
                >
                  <div class="pop pop6">{{ date }}</div>
                  <div class="circle circle6"></div>
                </div>
                <div v-else>
                  <div class="pop pop7">{{ date }}</div>
                  <div class="circle circle7"></div>
                </div>
              </div>
              <div class="time-desc flex-end">
                <div class="end-time">
                  计划贯通时间：{{ detailData.consdatee }}
                </div>
              </div>
            </div>
            <div class="base-item">
              <div class="title">
                <img src="./images/remark-icon.png" />
                <span>备注：</span>
              </div>
              <div class="value">
                {{
                  detailData.remark ? detailData.remark : "无"
                }}
              </div>
            </div>
          </div>
        </div>
        <Around
          ref="around"
          :forceEntity="forceEntity"
          :aroundData="aroundData"
        />
        <div class="qrcode-wrapper" v-show="showQRcode">
          <div class="title-wrapper">
            <span class="title">项目二维码</span>
          </div>
          <div class="qrcode-content">
            <div id="qrcode" class="qrcode" ref="qrCodeUrl"></div>
          </div>
        </div>
      </div>
    </transition>
    <el-image-viewer
      v-if="showViewer"
      :on-close="closeViewer"
      :url-list="srcList"
      :initial-index="srcIndex"
    />
    <el-image-viewer :style="{ right: showLarge ? '45%' : '0' }"
      v-if="showJGTViewer"
      :on-close="closeJGTViewer"
      :url-list="jgtList"
      :initial-index="jgtIndex"
    />
    <div class="QJFrame" v-show="showQJ">
      <i class="close" @click="closeQJ"></i>
      <iframe id="content" :src="QJURL"></iframe>
    </div>
    <div class="SPFrame" v-show="showSP">
      <i class="close" @click="closeSP"></i>
      <video id="content" :src="SPURL" controls="controls" autoplay muted></video>
    </div>
    <ProjectInfoPopup ref="ProjectInfoPopup" :id="projectId" />
    <SingleProjectTable ref="SingleProjectTable" :id="projectId" />
  </div>
</template>

<script>
import { MediaServer } from "@/config/server/mapConfig";
import QRCode from "qrcodejs2";
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import { mapGetters } from "vuex";
import ProjectInfoPopup from "./ProjectInfoPopup";
import Around from "./Around";
import { getProjectDetail, getPointDetail } from "api/tangheAPI";
import SingleProjectTable from "@/components/sourcelayer/layerHub/components/SingleProjectTable";
export default {
  name: "ProjectDetailPopup",
  components: {
    ElImageViewer,
    ProjectInfoPopup,
    SingleProjectTable,
    Around,
  },
  computed: {
    ...mapGetters("map", ["bufferQueryData"]),
  },
  data() {
    return {
      MediaServer,
      showLarge: window.showLarge,
      forceEntity: {},
      resourceType: '',
      // 是否重点企业
      isImportant: false,
      detailData: {},
      aroundData: {},
      isShow: false,
      finalData: {},
      finalList: [],
      currentData: {}, // 当前展示数据
      currentIndex: 0, // 当前展示索引
      currentShow: "qj", // 当前展示类型
      swiperOptions: {
        slidesPerView: 1,
        scrollbar: {
          el: ".swiper-scrollbar",
        },
        navigation: {
          nextEl: ".swiper-button-right",
          prevEl: ".swiper-button-left",
        },
        on: {
          slideChangeTransitionEnd: () => {
            console.log("slideChangeTransitionEnd!!", this.currentShow);
            if (this.currentShow == "sp") {
              this.$refs.video && this.$refs.video.forEach((item) => {
                item.pause();
              });
            }
          },
        },
      },
      timeSwiperOption: {
        slidesPerView: 3,
        slideToClickedSlide: true,
        centeredSlides: true,
        on: {
          slideChange: () => {
            this.currentIndex = this.$refs.SwiperTime.swiper.activeIndex;
          },
        },
      },
      jgtSwiperOptions: {
        slidesPerView: 1,
        navigation: {
          nextEl: ".jgt-swiper-button-right",
          prevEl: ".jgt-swiper-button-left",
        },
      },
      showViewer: false,
      showJGTViewer: false,
      srcList: [],
      srcIndex: 0,
      jgtList: [],
      jgtIndex: 0,
      showQJ: false,
      showSP: false,
      QJURL: "",
      SPURL: "",
      date: "",
      projectId: "",
      // showInfo: false,
      showQRcode: false
    };
  },
  mounted() {
    this.getNowFormatDate();
  },
  methods: {
    getForceEntity(forceEntity) {
      this.$parent.showSign = false;
      this.$parent.showMapTool = false;
      console.log("aaa", forceEntity);
      if (forceEntity.attributes) {
        this.isImportant = forceEntity.attributes.IS_IMPORTANT == "1" ? true : false;
        this.resourceType = forceEntity.attributes.resourceType || forceEntity.attributes.RESOURCE_TYPE
        let id = forceEntity.attributes.resourceId || forceEntity.attributes.RESOURCE_ID
        this.initData(id);
      } else {
        this.isImportant = false;
        this.resourceType = forceEntity.resourceType
        this.initData(forceEntity.resourceId);
      }
      this.forceEntity = forceEntity;
    },
    async initData(id) {
      // this.$nextTick(() => {
      //   this.$refs.SwiperTime.swiper.slideTo(0, 0, false);
      // });

      this.currentIndex = 0;
      this.currentData = {};
      this.finalData = {};
      this.jgtList = [];
      this.currentShow = "qj";
      this.showQRcode = false

      let res
      if (this.resourceType == 'project_all') {
        res = await getProjectDetail({id})
      }
      if (this.resourceType == 'greenway_all') {
        res = await getPointDetail({id})
      }
      if (res.code === 200) {
        this.isShow = true;
        this.detailData = res.result
        console.log('detailData', this.detailData)
        this.formatData()
        this.projectId = this.detailData.extraId;
        if (this.resourceType=='project_all' && this.detailData.overallViews && this.detailData.overallViews.length) {
          this.showQRcode = true
          this.creatQrCode();
        }
        if (this.detailData.photos.length) {
          this.detailData.photos.forEach(item => {
            if (item.type == 1) {
              this.jgtList.push(`${MediaServer}/${item.path}`)
            }
          })
        }
        if (this.showQJ && this.detailData.overallViews.length) {
          this.QJURL = this.detailData.overallViews[0].path
        }
        if (this.showSP && this.detailData.videos.length) {
          this.SPURL = `${MediaServer}/${this.detailData.videos[0].path}`;
        }
      }
    },
    formatData() {
      let overallViews = this.detailData.overallViews
      let videos = this.detailData.videos
      let photos = this.detailData.photos
      overallViews && overallViews.forEach(item => {
        let time = item.shotTime || '2020-01-01'
        if (this.finalData[time]) {
          !this.finalData[time].qj && (this.finalData[time].qj = []);
          !this.finalData[time].qjslt && (this.finalData[time].qjslt = []);
          this.finalData[time].qj.push(item.path);
          this.finalData[time].qjslt.push(item.thumbnail);
        } else {
          this.finalData[time] = { date: time };
          this.finalData[time].qj = [item.path];
          this.finalData[time].qjslt = [item.thumbnail];
        }
      })
      videos && videos.forEach(item => {
        let time = item.shotTime || '2020-01-01'
        if (this.finalData[time]) {
          !this.finalData[time].sp && (this.finalData[time].sp = []);
          this.finalData[time].sp.push(item.path);
        } else {
          this.finalData[time] = { date: time };
          this.finalData[time].sp = [item.path];
        }
      })
      photos && photos.forEach(item => {
        let time = item.shotTime || '2020-01-01'
        if (this.finalData[time]) {
          !this.finalData[time].photo && (this.finalData[time].photo = []);
          this.finalData[time].photo.push(item.path);
        } else {
          this.finalData[time] = { date: time };
          this.finalData[time].photo = [item.path];
        }
      })
      // console.log("finalData!!!!!!!!", this.finalData);
      this.finalList = Object.values(this.finalData);
      this.finalList.sort((a, b) => {
        if (a.date < b.date) {
          return 1
        } else if (a.date > b.date) {
          return -1
        } else {
          return 0
        }
      })
      console.log("finalList", this.finalList);
      if (this.finalList.length) {
        this.currentData = this.finalList[this.currentIndex];
      }

    },
    creatQrCode() {
      document.getElementById("qrcode").innerHTML = "";
      let qrcode = new QRCode(this.$refs.qrCodeUrl, {
        // text: this.forceEntity.attributes.QJ, // 需要转换为二维码的内容
        text: this.detailData.overallViews[0].path,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    },
    onTypeClick(type) {
      if (!this.currentData[type]) {
        for (let i = 0; i < this.finalList.length; i++) {
          if (this.finalList[i][type]) {
            this.currentIndex = i;
            this.$refs.SwiperTime.swiper.slideTo(i, 0, false);
            break;
          }
        }
      }
      this.currentShow = type;
    },
    closeDetail() {
      this.closeQJ()
      this.closeSP()
      this.closeViewer()
      this.isShow = false;
      !this.$parent.showSign && (this.$parent.showSign = true)
      !this.$parent.showMapTool && (this.$parent.showMapTool = true)
    },
    openQJ(index) {
      console.log('showLarge', this.showLarge)
      this.closeSP();
      this.closeViewer();
      if (this.showLarge) {
        this.$bus.$emit("change-rightContent", {
          type: "qj",
          value: this.currentData.qj[index],
        });
      } else {
        this.QJURL = this.currentData.qj[index];
        this.showQJ = true;
      }
    },
    closeQJ() {
      this.showQJ = false;
      this.QJURL = "";
    },
    closeSP() {
      this.showSP = false;
      this.SPURL = "";
    },
    onPreview(list, index) {
      this.closeQJ();
      this.closeSP();
      this.srcList = list.map((item) => {
        return `${MediaServer}/${item}`;
      });
      if (this.showLarge) {
        this.$bus.$emit("open-rightPreview", {
          value: this.srcList,
          index
        });
      } else {
        this.closeJGTViewer();
        this.srcIndex = index;
        this.showViewer = true;
      }
    },
    onJGTPreview(list, index) {
      this.closeQJ();
      this.closeSP();
      this.jgtIndex = index;
      this.showJGTViewer = true;
      !this.showLarge && this.closeViewer();
    },
    closeViewer() {
      this.showViewer = false;
    },
    closeJGTViewer() {
      this.showJGTViewer = false;
    },
    handlePlay(e) {
      this.closeViewer();
      console.log("handlePlay", e);
      e.target.pause()
      if (this.showLarge) {
        this.$bus.$emit("change-rightContent", {
          type: "video",
          value: e.target.currentSrc,
        });
      } else {
        this.closeQJ();
        this.closeViewer();
        this.showSP = true
        this.SPURL = e.target.currentSrc
      }
    },
    getNowFormatDate() {
      let date = new Date();
      let seperator1 = "-";
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      let currentdate = year + seperator1 + month + seperator1 + strDate;
      this.date = currentdate;
    },

    // 周边数据
    getdata(temp) {
      this.aroundData = temp;
    },

    // 关闭面板
    closeCollapse() {
      this.$nextTick(() => {
        this.$refs.around.collapseChange([]);
      });
    },

    // 查看计划
    openPlan(data) {
      this.$refs.SingleProjectTable.getDetail(data);
    },

    openInfo() {
      if (!this.projectId) {
        return this.$message("暂无更多数据");
      }
      // this.showInfo = true;
      this.$refs.ProjectInfoPopup.getDetail()
    },

    // closeInfo() {   // 父级页面使用
    //   this.showInfo = false;
    // }
  },
  watch: {
    currentIndex(val) {
      this.currentData = this.finalList[val];
    },
    currentData(val) {
      // 切换展示数据时优先展示有内容的类型
      if (!val[this.currentShow]) {
        if (val.qj) {
          this.currentShow = "qj";
          return;
        }
        if (val.sp) {
          this.currentShow = "sp";
          return;
        }
        if (val.photo) {
          this.currentShow = "photo";
          return;
        }
      }
    },
    currentShow(val) {
      if (val == "sp") {
        this.$nextTick(() => {
          this.$refs.video && this.$refs.video.forEach((item) => {
            item.addEventListener("play", (e) => {
              this.handlePlay(e);
            });
          });
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./ProjectDetailPopup.less");
</style>
<style>
.el-image-viewer__img {
  max-height: 80% !important;
  max-width: 90% !important;
}
.el-icon-circle-close {
  color: #fff !important;
}
</style>
