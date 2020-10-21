<template>
  <transition name="slide" v-if="forceEntity.attributes">
    <div class="project-detail-popup" v-show="isShow">
      <span class="close-btn" @click="closeInfo"></span>
      <div class="title-wrapper">
        <span class="pre"></span>
        <span class="title">{{ forceEntity.attributes.NAME }}</span>
      </div>
      <div class="content-info">
        <div class="top">
          <div class="top-item">全景</div>
          <div class="top-item">视频</div>
          <div class="top-item">图片</div>
        </div>
        <div class="bottom">
          <div class="left">
            <ul class="date-list">
              <li class="date-item" v-for="(item,key,index) in finalData" :key="index">
                <img class="icon" src="./images/time-icon.png" />
                <span>{{`${key.substring(0,4)}-${key.substring(4,6)}-${key.substring(6,8)}`}}</span>
              </li>
              <!-- <li class="date-item">
                <img class="icon" src="./images/time-icon.png" />
                <span>2020-10-15</span>
              </li>
              <li class="date-item">
                <img class="icon" src="./images/time-icon.png" />
                <span>2020-10-15</span>
              </li> -->
            </ul>
          </div>
          <div class="right">
            <div class="swiper-buttons swiper-button-left"></div>
            <swiper
              ref="mySwiper"
              class="swiper-wrapper"
              :options="swiperOptions"
            >
              <!-- <swiper-slide v-for="(item,i) in imgs" :key="i" class="swiper-item"> -->
              <swiper-slide class="swiper-item">
                <img :src="`/static/images/img.png`" />
              </swiper-slide>
              <swiper-slide class="swiper-item">
                <img :src="`/static/images/img.png`" />
              </swiper-slide>
              <swiper-slide class="swiper-item">
                <img :src="`/static/images/img.png`" />
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
          <div class="time-line-wrapper" v-if="forceEntity.type == '项目'">
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
          <div class="time-line-wrapper" v-if="forceEntity.type == '断点'">
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
</template>

<script>
export default {
  data() {
    return {
      forceEntity: {},
      isShow: false,
      finalData: {},
      finalList: [],
      currentData: {},
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
    }
  },
  methods: {
    getForceEntity(forceEntity) {
      this.forceEntity = forceEntity;
      this.isShow = true
      console.log('aaa', forceEntity)
      this.initData()
    },
    initData() {
      if (this.forceEntity.attributes && this.forceEntity.attributes.PHOTO) {
        let photoStr = this.forceEntity.attributes.PHOTO
        if (photoStr.length) {
          if (~photoStr.indexOf(';')) {
            let photoTempArr = photoStr.split(';')
            photoTempArr.forEach(item => {
              let time = item.split('_')[1].split('.')[0]
              if (this.finalData[time]) {
                this.finalData[time].photo.push(`/static/images/${this.forceEntity.type}/${item}`)
              } else {
                this.finalData[time] = {}
                this.finalData[time].photo = [`/static/images/${this.forceEntity.type}/${item}`]
              }
            })
          }
          else {
            let time = photoStr.split('_')[1].split('.')[0]
            if (this.finalData[time]) {
              this.finalData[time].photo = [`/static/images/${this.forceEntity.type}/${photoStr}`]
            } else {
              this.finalData[time] = {}
              this.finalData[time].photo = [`/static/images/${this.forceEntity.type}/${photoStr}`]
            }
          }
        }
      }
      // if (this.forceEntity.attributes && this.forceEntity.attributes.QJ) {
      //   let QJStr = this.forceEntity.attributes.QJ
      //   if (QJStr.length) {
      //     if (~QJStr.indexOf(';')) {
      //       qjTempArr = QJStr.split(';')
      //       qjTempArr.forEach(item => {
      //         if (item.split('_')[1]) {
      //           let time = item.split('_')[1].split('.')[0]
      //           if (this.finalData[time]) {
      //             this.finalData[time].qj.push(item)
      //           } else {
      //             this.finalData[time] = {}
      //             this.finalData[time].qj = [item]
      //           }
      //         }
      //       })
      //     } else {
      //       if (QJStr.split('_')[1]) {
      //         let time = QJStr.split('_')[1].split('.')[0]
      //         if (this.finalData[time]) {
      //           this.finalData[time].qj = [QJStr]
      //         } else {
      //           this.finalData[time] = {}
      //           this.finalData[time].qj = [QJStr]
      //         }
      //       }
      //     }
      //   }
      // }
      if (this.forceEntity.attributes && this.forceEntity.attributes.QJSLT) {
        let QJSLTStr = this.forceEntity.attributes.QJSLT
        let QJStr = this.forceEntity.attributes.QJ
        if (QJSLTStr.length) {
          if (~QJSLTStr.indexOf(';')) {
            qjsltTempArr = QJSLTStr.split(';')
            qjTempArr = QJStr.split(';')
            qjsltTempArr.forEach((item, index) => {
              if (item.split('_')[1]) {
                let time = item.split('_')[1].split('.')[0]
                if (this.finalData[time]) {
                  this.finalData[time].qjslt.push(`/static/images/VRPic/${this.forceEntity.type}/${item}`)
                  this.finalData[time].qj.push(qjTempArr[index])
                } else {
                  this.finalData[time] = {}
                  this.finalData[time].qjslt = [`/static/images/VRPic/${this.forceEntity.type}/${item}`]
                  this.finalData[time].qj = [qjTempArr[index]]
                }
              }
            })
          } else {
            if (QJSLTStr.split('_')[1]) {
              let time = QJSLTStr.split('_')[1].split('.')[0]
              if (this.finalData[time]) {
                this.finalData[time].qjslt = [`/static/images/VRPic/${this.forceEntity.type}/${QJSLTStr}`]
                this.finalData[time].qj = [QJStr]
              } else {
                this.finalData[time] = {}
                this.finalData[time].qjslt = [`/static/images/VRPic/${this.forceEntity.type}/${QJSLTStr}`]
                this.finalData[time].qj = [QJStr]
              }
            }
          }
        }
      }
      if (this.forceEntity.attributes && this.forceEntity.attributes.SP) {
        let SPStr = this.forceEntity.attributes.SP
        if (SPStr.length) {
          if (~SPStr.indexOf(';')) {
            spTempArr = SPStr.split(';')
            spTempArr.forEach(item => {
              if (item.split('_')[1]) {
                let time = item.split('_')[1].split('.')[0]
                if (this.finalData[time]) {
                  this.finalData[time].sp.push(item)
                } else {
                  this.finalData[time] = {}
                  this.finalData[time].sp = [item]
                }
              }
            })
          } else {
            if (SPStr.split('_')[1]) {
              let time = SPStr.split('_')[1].split('.')[0]
              if (this.finalData[time]) {
                this.finalData[time].sp = [SPStr]
              } else {
                this.finalData[time] = {}
                this.finalData[time].sp = [SPStr]
              }
            }
          }
        }
      }
      console.log('finalData!!!!!!!!', this.finalData)
      for (let key in this.finalData) {
        this.currentData = this.finalData[key]
      }
      // this.finalList = Object.values(this.finalData).reverse()
      // console.log('finalList', this.finalList)
    },
    closeInfo() {
      this.isShow = false
    },
  }
};
</script>

<style lang="less" scoped>
@import url("./ProjectDetailPopup.less");
</style>