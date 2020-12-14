<template>
  <div>
    <transition name="fade" v-if="forceEntity.attributes">
      <div class="project-detail-popup" v-show="isShow">
        <span class="close-btn" @click="closeDetail"></span>
        <div class="title-wrapper">
          <span class="pre"></span>
          <span class="title">{{ forceEntity.attributes.NAME }}</span>
        </div>
        <div class="content-info">
          <div class="btn-list">
            <button
              class="btn-item"
              :disabled="!this.forceEntity.attributes.QJ"
              :class="{
                active: currentShow == 'qj',
                disabled: !this.forceEntity.attributes.QJ,
              }"
              @click="onTypeClick('qj')"
            >
              全景
            </button>
            <button
              class="btn-item"
              :disabled="!this.forceEntity.attributes.SP"
              :class="{
                active: currentShow == 'sp',
                disabled: !this.forceEntity.attributes.SP,
              }"
              @click="onTypeClick('sp')"
            >
              视频
            </button>
            <button
              class="btn-item"
              :disabled="!this.forceEntity.attributes.PHOTO"
              :class="{
                active: currentShow == 'photo',
                disabled: !this.forceEntity.attributes.PHOTO,
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
                  <img
                    :src="`/static/images/VRPic/${item}`"
                    style="object-fit: contain"
                    @click="openQJ(i)"
                  />
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
                    style="width: 100%"
                    :src="`/static/video/${item}`"
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
                    :src="`/static/images/${forceEntity.type}/${item}`"
                    fit="contain"
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
                    <span>{{ item.date.substring(0, 4) }}</span>
                    <span
                      >{{ item.date.substring(4, 6) }}-{{
                        item.date.substring(6, 8)
                      }}</span
                    >
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
            <span
              class="more"
              v-show="~forceEntity.type.indexOf('项目')"
              @click="openInfo()"
              >查看更多>></span
            >
          </div>
          <div class="base-content">
            <div class="base-item">
              <div class="title">
                <img src="./images/name-icon.png" />
                <span>名称：</span>
              </div>
              <div class="value">{{ forceEntity.attributes.NAME }}</div>
            </div>
            <div class="inline bg">
              <div class="base-item" v-if="~forceEntity.type.indexOf('项目')">
                <div class="title">
                  <img src="./images/type-icon.png" />
                  <span>类型：</span>
                </div>
                <div class="value">{{ forceEntity.attributes.FUNDTYPE }}</div>
              </div>
              <div class="base-item" v-if="forceEntity.type == '绿道断点'">
                <div class="title">
                  <img src="./images/length-icon.png" />
                  <span>断点长度：</span>
                </div>
                <div class="value">{{ forceEntity.attributes.LENGTH }}米</div>
              </div>
              <div class="base-item">
                <div class="title">
                  <img src="./images/count-icon.png" />
                  <span>总投资：</span>
                </div>
                <div class="value">
                  {{
                    forceEntity.attributes.TOTALAMOUNT
                      ? `${forceEntity.attributes.TOTALAMOUNT}万元`
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
                    forceEntity.attributes.ZR_DEPTID ||
                    forceEntity.attributes.ZRDW
                  }}
                </div>
              </div>
              <div class="base-item">
                <div class="title">
                  <img src="./images/street-icon.png" />
                  <span>所属街道：</span>
                </div>
                <div class="value">{{ forceEntity.attributes.STREET }}</div>
              </div>
            </div>
            <div class="base-item bg">
              <div class="title">
                <img src="./images/question-icon.png" />
                <span>问题：</span>
              </div>
              <div class="value">
                {{
                  forceEntity.attributes.CZWT
                    ? forceEntity.attributes.CZWT
                    : "无"
                }}
              </div>
            </div>
            <div class="base-item" v-if="~forceEntity.type.indexOf('项目')">
              <div class="title">
                <img src="./images/question-icon.png" />
                <span>规模：</span>
              </div>
              <div class="value">
                {{
                  forceEntity.attributes.CONTENTGM
                    ? forceEntity.attributes.CONTENTGM
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
                  forceEntity.attributes.ZXJZ
                    ? forceEntity.attributes.ZXJZ
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
              v-if="~forceEntity.type.indexOf('项目')"
            >
              <div class="time-line">
                <div class="progressEmpty">
                  <img src="./images/计划时间轴底.png" class="empty" />
                  <div
                    class="progressFull"
                    v-if="forceEntity.attributes.CURRENT_STATE == '前期研究'"
                  >
                    <img src="./images/前期研究.png" class="full" />
                  </div>
                  <div
                    class="progressFull"
                    v-if="forceEntity.attributes.CURRENT_STATE == '前期(滞后)'"
                  >
                    <img src="./images/前期滞后.png" class="full" />
                  </div>
                  <div
                    class="progressFull"
                    v-if="forceEntity.attributes.CURRENT_STATE == '在建'"
                  >
                    <img src="./images/正在建设.png" class="full" />
                  </div>
                  <div
                    class="progressFull"
                    v-if="forceEntity.attributes.CURRENT_STATE == '在建(滞后)'"
                  >
                    <img src="./images/建设滞后.png" class="full" />
                  </div>
                  <div
                    class="progressFull"
                    v-if="forceEntity.attributes.CURRENT_STATE == '完工'"
                  >
                    <img src="./images/完美建设.png" class="full" />
                  </div>
                </div>
                <div v-if="forceEntity.attributes.CURRENT_STATE == '前期研究'">
                  <div class="pop pop1">前期研究</div>
                </div>
                <div
                  v-if="forceEntity.attributes.CURRENT_STATE == '前期(滞后)'"
                >
                  <div class="pop pop2">前期滞后</div>
                </div>
                <div v-if="forceEntity.attributes.CURRENT_STATE == '在建'">
                  <div class="pop pop3">正在建设</div>
                </div>
                <div
                  v-if="forceEntity.attributes.CURRENT_STATE == '在建(滞后)'"
                >
                  <div class="pop pop4">在建滞后</div>
                </div>
                <div v-if="forceEntity.attributes.CURRENT_STATE == '完工'">
                  <div class="pop pop5">完工建设</div>
                </div>
              </div>
              <div class="time-desc">
                <div class="start-time">
                  计划开工时间：{{ forceEntity.attributes.CONSYEARB }}
                </div>
                <div class="end-time">
                  计划建成时间：{{ forceEntity.attributes.CONSYEARE }}
                </div>
              </div>
            </div>
            <div
              class="time-line-wrapper"
              v-if="forceEntity.type == '绿道断点'"
            >
              <div class="time-line">
                <div
                  class="line-item green"
                  :style="{
                    flex:
                      forceEntity.attributes.JHGTSJ.substring(0, 4) > 2021
                        ? 0.5
                        : 3,
                  }"
                ></div>
                <div class="line-item light-blue"></div>
                <div
                  v-if="forceEntity.attributes.JHGTSJ.substring(0, 4) > 2021"
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
                  计划贯通时间：{{ forceEntity.attributes.JHGTSJ }}
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
                  forceEntity.attributes.BZ ? forceEntity.attributes.BZ : "无"
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
        <div class="qrcode-wrapper" v-show="~forceEntity.type.indexOf('项目')">
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
      :style="{ left: showLarge ? '55%' : '0' }"
      v-if="showViewer"
      :on-close="closeViewer"
      :url-list="srcList"
      :initial-index="srcIndex"
    />
    <div class="QJFrame" v-show="showQJ">
      <i class="close" @click="closeQJ"></i>
      <iframe id="content" :src="QJURL"></iframe>
    </div>
    <div class="SPFrame" v-show="showSP">
      <i class="close" @click="closeSP"></i>
      <video id="content" :src="SPURL" controls="controls" autoplay muted></video>
    </div>
    <ProjectInfoPopup v-if="showInfo" :id="projectId" />
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import { mapGetters } from "vuex";
import ProjectInfoPopup from "./ProjectInfoPopup";
import Around from "./Around";
import { queryForOneMapById } from "api/tangheAPI";
export default {
  components: {
    ElImageViewer,
    ProjectInfoPopup,
    Around,
  },
  computed: {
    ...mapGetters("map", ["bufferQueryData"]),
  },
  data() {
    return {
      showLarge: window.showLarge,
      forceEntity: {},
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
              this.$refs.video.forEach((item) => {
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
      showViewer: false,
      srcList: [],
      srcIndex: 0,
      showQJ: false,
      showSP: false,
      QJURL: "",
      SPURL: "",
      date: "",
      projectId: "",
      showInfo: false,
    };
  },
  mounted() {
    this.getNowFormatDate();
    this.eventRegsiter();
  },
  methods: {
    eventRegsiter() {
      // 列表点击事件
      this.$bus.$off("click-item");
      this.$bus.$on("click-item", ({ value }) => {
        let qj = value.attributes.QJ;
        let sp = value.attributes.SP;
        if (this.showQJ && qj) {
          this.QJURL = ~qj.indexOf(";") ? qj.split(";")[0] : qj;
        }
        if (this.showSP && sp) {
          this.SPURL = ~sp.indexOf(";") ? `/static/video/${sp.split(";")[0]}` : `/static/video/${sp}`;
        }
      });
    },
    getForceEntity(forceEntity) {
      this.forceEntity = forceEntity;
      this.projectId = this.forceEntity.attributes.XMID;
      this.isShow = true;
      console.log("aaa", forceEntity);
      this.$nextTick(() => {
        this.creatQrCode();
      });
      this.initData(forceEntity.attributes.GUID);
    },
    creatQrCode() {
      document.getElementById("qrcode").innerHTML = "";
      let qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: this.forceEntity.attributes.QJ, // 需要转换为二维码的内容
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    },
    async initData(id) {
      this.$nextTick(() => {
        this.$refs.SwiperTime.swiper.slideTo(0, 0, false);
      });

      this.currentIndex = 0;
      this.currentData = {};
      this.finalData = {};
      this.currentShow = "qj";

      // let res = await queryForOneMapById({id})
      // if (res.code === 200) {
      //   this.detailData = res.result
      //   console.log('detailData', detailData)
      // }

      this.formatData("PHOTO", "photo");
      this.formatData("JGT", "photo");
      this.formatData("QJSLT", "qjslt");
      // this.formatData('ZBQJSLT', 'qjslt')
      this.formatData("SP", "sp");
      console.log("finalData!!!!!!!!", this.finalData);
      this.finalList = Object.values(this.finalData).reverse();
      console.log("finalList", this.finalList);
      if (this.finalList.length) {
        this.currentData = this.finalList[this.currentIndex];
      }
    },
    formatData(attr, key) {
      if (this.forceEntity.attributes && this.forceEntity.attributes[attr]) {
        let QJStr =
          this.forceEntity.attributes.QJ || this.forceEntity.attributes.ZBQJ;
        let qjTempArr = QJStr && ~QJStr.indexOf(";") ? QJStr.split(";") : [];
        let attrValue = this.forceEntity.attributes[attr];
        if (attrValue.length) {
          if (~attrValue.indexOf(";")) {
            let tempArr = attrValue.split(";");
            tempArr.forEach((item, index) => {
              let time;
              if (item.split("_")[1]) {
                time = item.split("_")[1].split(".")[0];
              } else {
                time = "20200101";
              }
              if (this.finalData[time]) {
                !this.finalData[time][key] && (this.finalData[time][key] = []);
                this.finalData[time][key].push(item);
              } else {
                this.finalData[time] = { date: time };
                this.finalData[time][key] = [item];
              }
              if (~attr.indexOf("SLT")) {
                !this.finalData[time].qj && (this.finalData[time].qj = []);
                this.finalData[time].qj.push(qjTempArr[index]);
              }
            });
          } else {
            let time;
            if (attrValue.split("_")[1]) {
              time = attrValue.split("_")[1].split(".")[0];
              if (!this.finalData[time]) {
                this.finalData[time] = { date: time };
              }
            } else {
              time = "20200101";
              this.finalData[time] = { date: time };
            }
            this.finalData[time][key] = [attrValue];
            if (~attr.indexOf("SLT")) {
              this.finalData[time].qj = [QJStr];
            }
          }
        }
      }
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
    },
    openQJ(index) {
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
        return `/static/images/${this.forceEntity.type}/${item}`;
      });
      this.srcIndex = index;
      this.showViewer = true;
    },
    closeViewer() {
      this.showViewer = false;
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

    openInfo() {
      if (!this.projectId) {
        return this.$message("暂无更多数据");
      }
      this.showInfo = true;
    },
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
          this.$refs.video.forEach((item) => {
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
