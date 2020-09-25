<template>
  <div id="forcePopUp" v-if="showPopUp">
    <div id="forcePopUpContent" class="leaflet-popup">
      <a class="leaflet-popup-close-button" href="#" @click="closePopup"></a>
      <div class="leaflet-popup-content-wrapper">
        <div id="forcePopUpLink" class="leaflet-popup-content">
          <div class="leaflet-popup-content">
            <div class="name-wrapper">
              <span class="name">{{forceEntity.NAME}}</span>
            </div>
            <div class="desc-wrapper" v-show="type == 'project'">
              <div class="desc-item">
                <div class="title">
                  <span class="title-pre"></span>投资类型
                </div>
                <div class="content">{{forceEntity.FUNDTYPE}}</div>
              </div>
              <div class="desc-item">
                <div class="title">
                  <span class="title-pre"></span>建设类型
                </div>
                <div class="content">{{forceEntity.CONSTYPE_1}}{{forceEntity.CONSTYPE2?`-${forceEntity.CONSTYPE2}`:''}}</div>
              </div>
              <div class="desc-item">
                <div class="title">
                  <span class="title-pre"></span>建设性质
                </div>
                <div class="content">{{forceEntity.STATE}}</div>
              </div>
              <div class="desc-item">
                <div class="title">
                  <span class="title-pre"></span>建设地点
                </div>
                <div class="content">{{forceEntity.ADDR_SCOPE}}{{forceEntity.ADDR_STREET?`-${forceEntity.ADDR_STREET}`: ''}}</div>
              </div>
              <div class="desc-item">
                <div class="title">
                  <span class="title-pre"></span>计划建设期限
                </div>
                <div class="content">{{forceEntity.CONSYEARB2}}-{{forceEntity.CONSYEARE2}}</div>
              </div>
              <div class="desc-item">
                <div class="title">
                  <span class="title-pre"></span>总投资
                </div>
                <div class="content">{{forceEntity.TOTALAMOUNT}}</div>
              </div>
              <div class="desc-item">
                <div class="title">
                  <span class="title-pre"></span>责任单位
                </div>
                <div class="content">{{forceEntity.ZR_DEPTID}}</div>
              </div>
              <div class="desc-item">
                <div class="title">
                  <span class="title-pre"></span>组织实施单位
                </div>
                <div class="content">{{forceEntity.SS_DEPTID}}</div>
              </div>
            </div>
            <div class="desc-wrapper" v-show="type == 'duandian'">
              <div class="desc-item">
                <div class="title">
                  <span class="title-pre"></span>断点位置
                </div>
                <div class="content">{{forceEntity.NAME}}</div>
              </div>
              <div class="desc-item">
                <div class="title">
                  <span class="title-pre"></span>断点长度
                </div>
                <div class="content">{{forceEntity.LENGTH}}</div>
              </div>
              <div class="desc-item">
                <div class="title">
                  <span class="title-pre"></span>计划贯通时间
                </div>
                <div class="content">{{forceEntity.JHGTSJ}}</div>
              </div>
              <div class="desc-item">
                <div class="title">
                  <span class="title-pre"></span>责任单位
                </div>
                <div class="content">{{forceEntity.ZRDW}}</div>
              </div>
            </div>
            <div class="plan-wrapper">
              <div class="title">
                <span class="title-pre"></span>存在问题
              </div>
              <div class="question">
                {{forceEntity.CZWT}}
              </div>
            </div>
            <div class="btn-wrapper">
              <div class="btn-item can">视频</div>
              <div class="btn-item can">无人机</div>
              <div class="btn-item cant">全景</div>
              <div class="btn-item cant">效果</div>
            </div>
            <div class="img-wrapper" v-show="type == 'duandian'">
              <div class="decorate-line"></div>
              <div class="name-wrapper">
                <span class="name">现场记录</span>
              </div>
              <div class="flex-container">
                <div class="swiper-buttons swiper-button-left"></div>
                <swiper ref="mySwiper" class="swiper-wrapper" :options="swiperOptions">
                  <!-- <swiper-slide v-for="(item,i) in imgs" :key="i" class="swiper-item"> -->
                  <swiper-slide class="swiper-item">
                    <!-- <img :src="`/static/images/${item}.png`" /> -->
                    <viewer>
                        <img :src="`/static/images/断点/${forceEntity.PHOTO}`">
                    </viewer>
                  </swiper-slide>
                  <swiper-slide class="swiper-item">
                    <!-- <img :src="`/static/images/${item}.png`" /> -->
                    <viewer>
                        <img :src="`/static/images/断点/${forceEntity.PHOTO}`">
                    </viewer>
                  </swiper-slide>
                  <swiper-slide class="swiper-item">
                    <!-- <img :src="`/static/images/${item}.png`" /> -->
                    <viewer>
                        <img :src="`/static/images/断点/${forceEntity.PHOTO}`">
                    </viewer>
                  </swiper-slide>
                  <swiper-slide class="swiper-item">
                    <!-- <img :src="`/static/images/${item}.png`" /> -->
                    <viewer>
                        <img :src="`/static/images/断点/${forceEntity.PHOTO}`">
                    </viewer>
                  </swiper-slide>
                  <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
                <div class="swiper-buttons swiper-button-right"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPopUp: false,
      forceEntity: {},
      swiperOptions: {
        slidesPerView: 3,
        // pagination: {
        //   el: ".swiper-pagination",
        //   clickable: true,
        // },
        navigation: {
          nextEl: ".swiper-button-right",
          prevEl: ".swiper-button-left",
        },
      },
      // imgs: ["img", "img", "img", "img"],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ]
    };
  },
  async mounted() {
    this.eventRegsiter();
  },
  methods: {
    eventRegsiter() {
      this.$bus.$off("cesium-projectClick");
      this.$bus.$on("cesium-projectClick", (item) => {
        console.log("extra_data", item.extra_data);
        this.forceEntity = item.extra_data;
        this.showPopUp = true;
        this.type = 'project'
      });
      this.$bus.$off("cesium-kadianClick");
      this.$bus.$on("cesium-kadianClick", (item) => {
        console.log("extra_data", item.extra_data);
        this.forceEntity = item.extra_data;
        this.showPopUp = true;
        this.type = 'duandian'
      });
    },
    closePopup() {
      this.showPopUp = false;
      this.forceEntity = {};
    },
  },
};
</script>

<style lang="less">
#forcePopUp {
  .leaflet-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 1000;
  }
  .name-wrapper {
    // display: flex;
    // align-items: flex-end;
    margin-top: 20px;
    text-align: left;
    .name {
      display: block;
      height: 25px;
      line-height: 25px;
      font-family: YouSheBiaoTiHei;
      font-size: 26px;
      letter-spacing: 0px;
      color: #ffffff;
      text-shadow: 0px 2px 3px rgba(0, 0, 0, 0.64);
      position: relative;
      padding-left: 12px;
      z-index: 2;
    }
    .name::before {
      content: "";
      position: absolute;
      bottom: -3px;
      left: 5px;
      width: 200px;
      height: 15px;
      z-index: -1;
      background-image: linear-gradient(90deg, #16EAEA 0%, transparent 100%);
      transform: skewX(-30deg);
    }
  }

  .leaflet-popup-close-button {
    position: absolute;
    top: -15px;
    right: -30px;
    width: 51px;
    height: 51px;
    cursor: pointer;
    .bg-image("./images/detail_close");
    z-index: 999;
  }

  .leaflet-popup-content-wrapper {
    .bg-image("./images/detail");
    text-align: center;
    height: 684px;
    width: 800px;
    box-sizing: border-box;
    padding: 14px;
    padding-top: 30px;
  }

  .leaflet-popup-content {
    color: #fff;
    overflow: hidden;
    height: 100%;
    .desc-wrapper {
      display: flex;
      flex-wrap:wrap;
      .desc-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 15px 0;
        width: 25%;
        border-right: 1px solid #16EAEA;
        .content {
          margin: 10px 0;
          padding: 0 15px;
          font-family: PingFang;
          font-size: 16px;
        }
        &:nth-child(4n) {
           border-right: none;
       }
      }
    }
    .img-wrapper {
      position: relative;
      margin-top: 20px;      
      .flex-container {
        margin-top: 30px;
        display: flex;
        align-items: top;
        justify-content: center;
        // height: 218px;
      }
      .swiper-buttons {
        cursor: pointer;
        width: 18px;
        height: 114px;
        .bg-image("./images/swiper-btn");
      }
      .swiper-button-left {
        margin-right: 20px;
      }
      .swiper-button-right {
        margin-left: 20px;
        transform: rotate(180deg);
      }
      .swiper-wrapper {
        margin: 0;
        width: 333px;
        .swiper-item {
          img {
            width: 160px;
            height: 114px;
          }
        }
        .swiper-pagination {
          position: absolute;
          bottom: 5px;
        }
        .swiper-pagination-bullet {
          background: #16EAEA;
          opacity: 0.38;
          width: 6px;
          height: 6px;
          border-radius: 0%;
        }
        .swiper-pagination-bullet-active {
          background-color: #16EAEA;
          opacity: 1;
        }
      }
      .decorate-line {
        // position: absolute;
        // bottom: 0;
        margin: 0 auto;
        width: 766px;
        height: 7px;
        .bg-image("./images/decorate-line");
      }
    }
    .plan-wrapper {
      margin-top: 15px;
      font-family: PingFang;
      .title {
        padding: 0 35px;
        margin-bottom: 15px;
      }
      .question {
        padding: 0 35px;
        text-align: left;
      }
      .plan-flex {
        display: flex;
        justify-content: space-between;
      }
      .plan-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon {
          width: 94px;
          height: 120px;
        }
        .icon1 {
          .bg-image("./images/icon1");
        }
        .icon2 {
          .bg-image("./images/icon2");
        }
        .icon3 {
          .bg-image("./images/icon3");
        }
        .icon4 {
          .bg-image("./images/icon4");
        }
        .label {
          font-size: 14px;
        }
        .state {
          margin-top: 3px;
          font-size: 18px;
          color: #16eaea;
        }
      }
    }
    .btn-wrapper {
      display: flex;
      justify-content: center;
      margin-top: 35px;
      .btn-item {
        width: 81px;
        height: 34px;
        line-height: 34px;
        margin: 0 10px;
        font-size: 14px;
      }
      .can {
        .bg-image("./images/btn-can");
      }
      .cant {
        .bg-image("./images/btn-cant");
      }
    }
  }
  .title {
    // padding: 0 50px;
    // margin-bottom: 15px;
    display: flex;
    align-items: center;
    font-family: YouSheBiaoTiHei;
    font-size: 20px;
    color: #00CBFF;
    .title-pre {
      margin-right: 5px;
      width: 7px;
      height: 16px;
      .bg-image("./images/title-bg");
    }
  }
}
</style>
