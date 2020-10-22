<template>
  <div>
    <transition name="slide" v-if="forceEntity.attributes">
      <div class="project-detail-popup" :style="{width:showLarge?'83vh':'50vh'}" v-show="isShow">
        <span class="close-btn" @click="closeInfo"></span>
        <div class="title-wrapper">
          <span class="pre"></span>
          <span class="title">{{ forceEntity.attributes.NAME }}</span>
        </div>
        <div class="content-info">
          <div class="top">
            <button class="top-item" :disabled="!currentData.qj" :class="{'active':currentShow=='qj','disabled':!currentData.qj}" @click="currentShow='qj'">全景</button>
            <button class="top-item" :disabled="!currentData.sp" :class="{'active':currentShow=='sp','disabled':!currentData.sp}" @click="currentShow='sp'">视频</button>
            <button class="top-item" :disabled="!currentData.photo" :class="{'active':currentShow=='photo','disabled':!currentData.photo}" @click="currentShow='photo'">图片</button>
          </div>
          <div class="bottom">
            <div class="left">
              <ul class="date-list">
                <li class="date-item" :class="{'active': currentIndex==index}" v-for="(item,index) in finalList" :key="index" @click="currentIndex=index">
                  <img class="icon" src="./images/time-icon.png" />
                  <span>{{`${item.date.substring(0,4)}-${item.date.substring(4,6)}-${item.date.substring(6,8)}`}}</span>
                </li>
              </ul>
            </div>
            <div class="right">
              <div class="swiper-buttons swiper-button-left"></div>
              <swiper
                ref="mySwiper"
                class="swiper-wrapper"
                :options="swiperOptions"
                v-show="currentShow=='qj'"
              >
                <swiper-slide v-for="(item,i) in currentData.qjslt" :key="i" class="swiper-item">
                  <img :src="`/static/images/VRPic/${forceEntity.type}/${item}`" style="object-fit:contain;" :style="{height: showLarge?'35vh':'20vh'}" @click="openQJ(i)">
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
                v-show="currentShow=='sp'"
              >
                <swiper-slide v-for="(item,i) in currentData.sp" :key="i" class="swiper-item">
                  <video style="width:100%;" :style="{height: showLarge?'35vh':'20vh'}" :src="`/static/video/${item}`" 
                    controls="controls"></video>
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
                v-show="currentShow=='photo'"
              >
                <swiper-slide v-for="(item,i) in currentData.photo" :key="i" class="swiper-item">
                  <el-image :src="`/static/images/${forceEntity.type}/${item}`" fit="contain" :style="{height: showLarge?'35vh':'20vh'}"
                    @click="onPreview(currentData.photo, i)"></el-image>
                </swiper-slide>
                <swiper-slide class="swiper-item" v-if="!currentData.photo">
                  <div class="no-tip">暂无数据</div>
                </swiper-slide>
                <div class="swiper-scrollbar" slot="scrollbar"></div>
              </swiper>
              <div class="swiper-buttons swiper-button-right"></div>
            </div>
          </div>
        </div>
        <div class="base-info">
          <div class="title-wrapper">
            <span class="title">信息详情</span>
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
              <div class="base-item" v-if="forceEntity.type == '项目'">
                <div class="title">
                  <img src="./images/type-icon.png" />
                  <span>类型：</span>
                </div>
                <div class="value">{{ forceEntity.attributes.FUNDTYPE }}</div>
              </div>
              <div class="base-item" v-if="forceEntity.type == '断点'">
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
                  forceEntity.attributes.CZWT ? forceEntity.attributes.CZWT : "无"
                }}
              </div>
            </div>
            <div class="base-item">
              <div class="title">
                <img src="./images/plan-icon.png" />
                <span>计划时间：</span>
              </div>
            </div>
            <div class="time-line-wrapper" :class="{'large':showLarge}" v-if="forceEntity.type == '项目'">
              <div class="time-line">
                <div class="line-item blue"></div>
                <div class="line-item yellow"></div>
                <div class="line-item pink"></div>
                <div class="line-item red"></div>
                <div class="line-item green"></div>
                <div v-if="forceEntity.attributes.CURRENT_STATE == '前期研究'">
                  <div class="pop pop1">前期研究</div>
                  <div class="circle circle1"></div>
                </div>
                <div v-if="forceEntity.attributes.CURRENT_STATE == '前期(滞后)'">
                  <div class="pop pop2">前期滞后</div>
                  <div class="circle circle2"></div>
                </div>
                <div v-if="forceEntity.attributes.CURRENT_STATE == '在建'">
                  <div class="pop pop3">正在建设</div>
                  <div class="circle circle3"></div>
                </div>
                <div v-if="forceEntity.attributes.CURRENT_STATE == '在建(滞后)'">
                  <div class="pop pop4">在建滞后</div>
                  <div class="circle circle4"></div>
                </div>
                <div v-if="forceEntity.attributes.CURRENT_STATE == '完工'">
                  <div class="pop pop5">完工建设</div>
                  <div class="circle circle5"></div>
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
            <div class="time-line-wrapper" :class="{'large':showLarge}" v-if="forceEntity.type == '断点'">
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
                <div v-if="forceEntity.attributes.JHGTSJ.substring(0, 4) > 2021">
                  <div class="pop pop6">{{date}}</div>
                  <div class="circle circle6"></div>
                </div>
                <div v-else>
                  <div class="pop pop7">{{date}}</div>
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
                {{ forceEntity.attributes.BZ ? forceEntity.attributes.BZ : "无" }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <el-image-viewer
      v-if="showViewer"
      :on-close="closeViewer"
      :url-list="srcList"
      :initial-index="srcIndex" />
    <div class="QJFrame" v-show="showQJ">
      <i class="close" @click="closeQJ"></i>
      <iframe id="content" :src="QJURL"></iframe>
    </div>
  </div>
</template>

<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
export default {
  components: {
    ElImageViewer
  },
  data() {
    return {
      showLarge: window.showLarge,
      forceEntity: {},
      isShow: false,
      finalData: {},
      finalList: [],
      currentData: {},
      currentIndex: 0,
      currentShow: 'qj',
      swiperOptions: {
        slidesPerView: 1,
        scrollbar: {
          el: '.swiper-scrollbar'
        },
        navigation: {
          nextEl: ".swiper-button-right",
          prevEl: ".swiper-button-left",
        },
      },
      showViewer: false,
      srcList: [],
      srcIndex: 0,
      showQJ: false,
      QJURL: '',
      date: ''
    }
  },
  mounted() {
    this.getNowFormatDate()
  },
  methods: {
    getForceEntity(forceEntity) {
      this.forceEntity = forceEntity;
      this.isShow = true
      console.log('aaa', forceEntity)
      this.initData()
    },
    initData() {
      this.currentIndex = 0
      this.currentData = {}
      this.finalData = {}
      this.currentShow = 'qj'
      this.formatData('PHOTO', 'photo')
      this.formatData('JGT', 'photo')
      this.formatData('QJSLT', 'qjslt')
      // this.formatData('ZBQJSLT', 'qjslt')
      this.formatData('SP', 'sp')
      console.log('finalData!!!!!!!!', this.finalData)
      this.finalList = Object.values(this.finalData).reverse()
      console.log('finalList', this.finalList)
      if (this.finalList.length) {
        this.currentData = this.finalList[this.currentIndex]
      }
      console.log('currentData', this.currentData)
    },
    formatData(attr, key) {
      if (this.forceEntity.attributes && this.forceEntity.attributes[attr]) {
        let QJStr = this.forceEntity.attributes.QJ || this.forceEntity.attributes.ZBQJ
        console.log('QJStr', QJStr)
        let qjTempArr = QJStr.split(';')
        console.log('qjTempArr', qjTempArr)
        let attrValue = this.forceEntity.attributes[attr]
        if (attrValue.length) {
          if (~attrValue.indexOf(';')) {
            let tempArr = attrValue.split(';')
            tempArr.forEach((item, index) => {
              if (item.split('_')[1]) {
                let time = item.split('_')[1].split('.')[0]
                if (this.finalData[time]) {
                  !this.finalData[time][key] && (this.finalData[time][key] = [])
                  this.finalData[time][key].push(item)
                  if (~attr.indexOf('SLT')) {
                    this.finalData[time].qj.push(qjTempArr[index])
                  }
                } else {
                  this.finalData[time] = {date: time}
                  this.finalData[time][key] = [item]
                  if (~attr.indexOf('SLT')) {
                    this.finalData[time].qj = [qjTempArr[index]]
                  }
                }
              } else {
                let time = '20200101之前'
                this.finalData[time] = {date: time}
                this.finalData[time][key] = []
                this.finalData[time][key].push(item)
                if (~attr.indexOf('SLT')) {
                  this.finalData[time].qj = []
                  this.finalData[time].qj.push(qjTempArr[index])
                }
              }
            })
          } else {
            if (attrValue.split('_')[1]) {
              let time = attrValue.split('_')[1].split('.')[0]
              if (this.finalData[time]) {
                this.finalData[time][key] = [attrValue]
                if (~attr.indexOf('SLT')) {
                  this.finalData[time].qj = [QJStr]
                }
              } else {
                this.finalData[time] = {date: time}
                this.finalData[time][key] = [attrValue]
                if (~attr.indexOf('SLT')) {
                  this.finalData[time].qj = [QJStr]
                }
              }
            } else {
              let time = '20200101之前'
              this.finalData[time] = {date: time}
              this.finalData[time][key] = [attrValue]
              if (~attr.indexOf('SLT')) {
                this.finalData[time].qj = [QJStr]
              }
            }
          }
        }
      }
    },
    closeInfo() {
      this.isShow = false
    },
    openQJ(index) {
      this.QJURL = this.currentData.qj[index]
      console.log('QJURL', this.QJURL)
      this.showQJ = true
    },
    closeQJ() {
      this.showQJ = false
      this.QJURL = ''
    },
    onPreview(list, index) {
      this.srcList = list.map(item => {
        return `/static/images/${this.forceEntity.type}/${item}`
      })
      this.srcIndex = index
      this.showViewer = true
    },
    closeViewer() {
     this.showViewer = false
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
      this.date =  currentdate;
    }
  },
  watch: {
    currentIndex(val) {
      this.currentData = this.finalList[val]
      console.log('watchcurrentData', this.currentData)
      console.log('watchcurrentshow', this.currentShow)
    },
    currentData(val) {
      if (!val.qj) {
        if (val.sp) {
          this.currentShow = 'sp'
        } else {
          val.photo && (this.currentShow = 'photo')
        }
      } else {
        this.currentShow = 'qj'
      }
    }
  }
};
</script>

<style lang="less">
@import url("./ProjectDetailPopup.less");
</style>