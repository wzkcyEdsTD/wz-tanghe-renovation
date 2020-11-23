<template>
  <div>
    <transition name="fade" v-if="forceEntity.attributes">
      <!-- <div class="project-detail-popup" :style="{width:showLarge?'83vh':'50vh'}" v-show="isShow"> -->
      <div class="project-detail-popup" v-show="isShow">
        <span class="close-btn" @click="closeInfo"></span>
        <div class="title-wrapper">
          <span class="pre"></span>
          <span class="title">{{ forceEntity.attributes.NAME }}</span>
        </div>
        <div class="content-info">
          <div class="btn-list">
            <button class="btn-item" :disabled="!currentData.qj" :class="{'active':currentShow=='qj','disabled':!currentData.qj}" @click="currentShow='qj'">全景</button>
            <button class="btn-item" :disabled="!currentData.sp" :class="{'active':currentShow=='sp','disabled':!currentData.sp}" @click="currentShow='sp'">视频</button>
            <button class="btn-item" :disabled="!currentData.photo" :class="{'active':currentShow=='photo','disabled':!currentData.photo}" @click="currentShow='photo'">图片</button>
          </div>
          <div class="media-content">
            <div class="top">
              <div class="swiper-buttons swiper-button-left"></div>
              <swiper
                ref="mySwiper"
                class="swiper-wrapper"
                :options="swiperOptions"
                v-show="currentShow=='qj'"
              >
                <swiper-slide v-for="(item,i) in currentData.qjslt" :key="i" class="swiper-item">
                  <img :src="`/static/images/VRPic/${item}`" style="object-fit:contain;" @click="openQJ(i)">
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
                  <video ref="video" style="width:100%;" :src="`/static/video/${item}`"
                          controls="controls" muted></video>
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
                  <el-image :src="`/static/images/${forceEntity.type}/${item}`" fit="contain"
                            @click="onPreview(currentData.photo, i)"></el-image>
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
                    <span>{{ item.date.substring(0,4) }}</span>
                    <span
                      >{{ item.date.substring(4,6) }}-{{
                        item.date.substring(6,8)
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
            <span class="more" v-show="~forceEntity.type.indexOf('项目')" @click="openInfo()">查看更多>></span>
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
            <div class="base-item" v-if="~forceEntity.type.indexOf('项目')">
              <div class="title">
                <img src="./images/question-icon.png" />
                <span>规模：</span>
              </div>
              <div class="value">
                {{
                forceEntity.attributes.CONTENTGM ? forceEntity.attributes.CONTENTGM : "无"
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
                forceEntity.attributes.ZXJZ ? forceEntity.attributes.ZXJZ : "无"
                }}
              </div>
            </div>
            <div class="base-item">
              <div class="title">
                <img src="./images/plan-icon.png" />
                <span>计划时间：</span>
              </div>
            </div>
            <!-- <div class="time-line-wrapper" :class="{'large':showLarge}" v-if="forceEntity.type == '项目'"> -->
            <div class="time-line-wrapper" v-if="~forceEntity.type.indexOf('项目')">
              <div class="time-line">
                <div class="progressEmpty">
                  <img src="./images/计划时间轴底.png" class="empty">
                  <div class="progressFull" v-if="forceEntity.attributes.CURRENT_STATE == '前期研究'">
                    <img src="./images/前期研究.png" class="full">
                  </div>
                  <div class="progressFull" v-if="forceEntity.attributes.CURRENT_STATE == '前期(滞后)'">
                    <img src="./images/前期滞后.png" class="full">
                  </div>
                  <div class="progressFull" v-if="forceEntity.attributes.CURRENT_STATE == '在建'">
                    <img src="./images/正在建设.png" class="full">
                  </div>
                  <div class="progressFull" v-if="forceEntity.attributes.CURRENT_STATE == '在建(滞后)'">
                    <img src="./images/建设滞后.png" class="full">
                  </div>
                  <div class="progressFull" v-if="forceEntity.attributes.CURRENT_STATE == '完工'">
                    <img src="./images/完美建设.png" class="full">
                  </div>
                </div>
                <div v-if="forceEntity.attributes.CURRENT_STATE == '前期研究'">
                  <div class="pop pop1">前期研究</div>
<!--                  <div class="circle circle1"></div>-->
                </div>
                <div v-if="forceEntity.attributes.CURRENT_STATE == '前期(滞后)'">
                  <div class="pop pop2">前期滞后</div>
<!--                  <div class="circle circle2"></div>-->
                </div>
                <div v-if="forceEntity.attributes.CURRENT_STATE == '在建'">
                  <div class="pop pop3">正在建设</div>
<!--                  <div class="circle circle3"></div>-->
                </div>
                <div v-if="forceEntity.attributes.CURRENT_STATE == '在建(滞后)'">
                  <div class="pop pop4">在建滞后</div>
<!--                  <div class="circle circle4"></div>-->
                </div>
                <div v-if="forceEntity.attributes.CURRENT_STATE == '完工'">
                  <div class="pop pop5">完工建设</div>
<!--                  <div class="circle circle5"></div>-->
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
            <!-- <div class="time-line-wrapper" :class="{'large':showLarge}" v-if="forceEntity.type == '断点'"> -->
            <div class="time-line-wrapper" v-if="forceEntity.type == '绿道断点'">
              <div class="time-line">
                <div class="line-item green"
                  :style="{flex:forceEntity.attributes.JHGTSJ.substring(0, 4) > 2021? 0.5: 3,}"
                >
                </div>
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
        <el-collapse v-model="activeNames" @change="collapseChange">
          <el-collapse-item title="查看周边" name="查看周边">
            <div class="perimeterSearch">     
              <div v-show="xmList?xmList.length>0?true:false:false">
                <div class="fjxm">
                  <div class="tp">
                    <img src="./images/时间框.png" class="kuang">
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
                        <span class="content" :title="item.attributes.STREET">{{ item.attributes.STREET}}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div v-show="ddList?ddList.length>0?true:false:false">
                <div class="fjxm">
                  <div class="tp">
                    <img src="./images/时间框.png" class="kuang">
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
                        <span class="content" :title="item.attributes.STREET">{{ item.attributes.STREET}}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div v-show="qjList&&currentPage=='sourcelayer'?qjList.length>0?true:false:false">
                <div class="fjxm">
                  <div class="tp">
                    <img src="./images/时间框.png" class="kuang">
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
              <div v-show="spList&&currentPage=='sourcelayer'?spList.length>0?true:false:false">
                <div class="fjxm">
                  <div class="tp">
                    <img src="./images/时间框.png" class="kuang">
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
                        <span class="content" :title="item.attributes.STREET">{{ item.attributes.STREET}}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div v-show="(!isListEmpty(xmList) && !isListEmpty(ddList) && !isListEmpty(qjList) && !isListEmpty(spList)) || (!isListEmpty(xmList) && !isListEmpty(ddList))" class="description">
                暂无周边信息
              </div>
            
            </div>
          </el-collapse-item>
        </el-collapse>
        <div class="qrcode-wrapper" v-show="~forceEntity.type.indexOf('项目')">
          <div class="title-wrapper">
            <span class="title">项目二维码</span>
          </div>
          <div class="qrcode-content">
            <img src="./images/qrcode.png">
          </div>
        </div>
      </div>
    </transition>
    <el-image-viewer
      :style="{left:showLarge?'60%':'0'}"
      v-if="showViewer"
      :on-close="closeViewer"
      :url-list="srcList"
      :initial-index="srcIndex" />
    <div class="QJFrame" v-show="showQJ">
      <i class="close" @click="closeQJ"></i>
      <iframe id="content" :src="QJURL"></iframe>
    </div>
    <ProjectInfoPopup v-if="showInfo" :id="projectId" />
  </div>
</template>

<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import {mapGetters} from "vuex";
import ProjectInfoPopup from './ProjectInfoPopup'
export default {
  components: {
    ElImageViewer,
    ProjectInfoPopup
  },
  computed:{
    ...mapGetters("map", ["bufferQueryData"]),
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
        on: {
          slideChangeTransitionEnd: () => {
            console.log('slideChangeTransitionEnd!!', this.currentShow)
            if (this.currentShow == 'sp') {
              this.$refs.video1.pause()
              this.$refs.video2.pause()
              this.$refs.video3.pause()
            }
          },
        }
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
      QJURL: '',
      date: '',
      questionXmList:null,
      questionDdList:null,
      questionQjList:null,
      questionSpList:null,
      searchXMText:'',
      xmList:[],
      searchDDText:'',
      ddList:[],
      searchQJText:'',
      qjList:[],
      spList:[],
      activeNames: [],
      projectId: '',
      showInfo: false
    }
  },
  computed: {
    currentPage () {
      // vue中获取当前路由name
      return this.$route.name
    }
  },
  mounted() {
    this.getNowFormatDate()
  },
  methods: {
    // 关闭面板
    closeCollapse() {
      this.activeNames = [];
      this.collapseChange([]);
    },
    // 折叠面板事件监听
    collapseChange(val) {
      // 展开画圆，收起清除
      if(val.length) {
        this.$parent.drawProjectCircle(this.forceEntity, this.forceEntity.id);
      } else {
        this.$parent.removeProjectCircle();
      }
    },
    getForceEntity(forceEntity) {
      this.forceEntity = forceEntity;
      this.projectId = this.forceEntity.attributes.XMID
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
        console.log('currentData', this.currentData)
        // console.log('refsVideo', this.$refs.video)
      }
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
                let time = '20200101'
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
              let time = '20200101'
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
      this.closeViewer()
      if (this.showLarge) {
        this.$bus.$emit("change-rightContent", { type: 'qj', value: this.currentData.qj[index] });
      } else {
        this.QJURL = this.currentData.qj[index]
        console.log('QJURL', this.QJURL)
        this.showQJ = true
      }
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
    handlePlay(e) {
      this.closeViewer()
      console.log('handlePlay', e)
      this.$bus.$emit("change-rightContent", { type: 'video', value: e.target.currentSrc });
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
    },
    itemClick(item){
      console.log('itemClick!!!???', item)
      const { x, y } = item.geometry;

      // 定位图标，详情变换
      this.$parent.addLocationIcon(item.geometry, item.id);
      this.getForceEntity(item);
      this.closeCollapse();

      window.earth.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(x, y, 1200),
        orientation: {
          heading: 0.01768860454315663,
          pitch: Cesium.Math.toRadians(-90),
          roll: 0.0,
        },
        complete: () => {
          this.$bus.$emit('clickFly');
        }
      });
    },
    getdata(temp){
      let name = this.forceEntity.attributes.NAME;
      this.$nextTick(()=>{
        this.questionQjList = temp['quanjin'];
        this.questionXmList = temp['项目'];
        this.questionDdList = temp['绿道断点'];
        this.questionSpList = temp['shipin'];
        if(this.questionQjList){
          this.questionQjList = this.questionQjList.filter((item) => {
            return item.attributes.NAME !=name;
          })
        }
        if(this.questionXmList){
          this.questionXmList = this.questionXmList.filter((item) => {
            return item.attributes.NAME !=name;
          })
        }
        if(this.questionDdList){
          this.questionDdList = this.questionDdList.filter((item) => {
            return item.attributes.NAME !=name;
          })
        }
        if(this.questionSpList){
          this.questionSpList = this.questionSpList.filter((item) => {
            return item.attributes.NAME !=name;
          })
        }
        this.xmList = this.questionXmList;
        this.ddList = this.questionDdList;
        this.qjList = this.questionQjList;
        this.spList = this.questionSpList;
      })
    },

    // 判断数组是否为空
    isListEmpty(list) {
      if(!list) return false;
      if(list instanceof Array) {
        if(list.length) return true;
      }
      return false;
    },

    openInfo() {
      if (!this.projectId) {
        return this.$message('暂无更多数据');
      }
      this.showInfo = true
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
    },
    currentShow(val) {
      if (val == 'sp' && this.showLarge) {
        this.$refs.video.forEach(item => {
          item.addEventListener('play', (e) => {
            this.handlePlay(e)
          });
        })
        // this.$refs.video1.addEventListener('play', (e) => {
        //   console.log('eeee', e)
        //   this.handlePlay(e)
        // });
        // this.$refs.video2.addEventListener('play', (e) => {
        //   console.log('eeee', e)
        //   this.handlePlay(e)
        // });
        // this.$refs.video3.addEventListener('play', (e) => {
        //   console.log('eeee', e)
        //   this.handlePlay(e)
        // });
      }
    }
  }
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
