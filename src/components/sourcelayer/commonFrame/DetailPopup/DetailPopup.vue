<template>
  <div id="forcePopUp" v-if="showPopUp">
    <div id="forcePopUpContent" class="leaflet-popup">
      <div class="leaflet-popup-title">
        <span class="pre"></span>
        <span class="title">详情</span>
      </div>
      <a class="leaflet-popup-close-button" href="#" @click="closePopup"></a>
      <div class="leaflet-popup-content-wrapper">
        <div id="forcePopUpLink" class="leaflet-popup-content">
          <div class="leaflet-popup-content">
            <div class="img-wrapper">
              <swiper ref="mySwiper" class="swiper-wrapper" :options="swiperOptions">
                <swiper-slide v-for="(item,i) in imgs" :key="i" class="swiper-item">
                  <img :src="`/static/images/${item}.png`" />
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
              </swiper>
            </div>
            <div class="desc-wrapper">
              <div class="desc-item">
                <span class="label">点位名称：</span>
                <span class="content">{{forceEntity.NAME}}</span>
              </div>
              <div class="desc-item">
                <span class="label">建设规模和内容：</span>
                <span class="content">{{forceEntity.CONTENTGM}}</span>
              </div>
              <div class="flex">
                <div class="desc-item">
                  <span class="label">投资类型：</span>
                  <span class="content">{{forceEntity.FUNDTYPE}}</span>
                </div>
                <div class="desc-item">
                  <span class="label">建设类型：</span>
                  <span class="content">{{forceEntity.CONSTYPE_1}}-{{forceEntity.CONSTYPE2}}</span>
                </div>
              </div>
              <div class="flex">
                <div class="desc-item">
                  <span class="label">建设性质：</span>
                  <span class="content">{{forceEntity.STATE}}</span>
                </div>
                <div class="desc-item">
                  <span class="label">建设地点：</span>
                  <span class="content">{{forceEntity.ADDR_SCOPE}}-{{forceEntity.ADDR_STREET}}</span>
                </div>
              </div>
              <div class="flex">
                <div class="desc-item">
                  <span class="label">计划建成期限：</span>
                  <span class="content">{{forceEntity.NAME}}</span>
                </div>
                <div class="desc-item">
                  <span class="label">总投资：</span>
                  <span class="content">{{forceEntity.TOTALAMOUNT}}</span>
                </div>
              </div>
              <div class="desc-item">
                <span class="label">责任单位：</span>
                <span class="content">{{forceEntity.ZR_DEPTID}}</span>
              </div>
              <div class="desc-item">
                <span class="label">组织实施单位：</span>
                <span class="content">{{forceEntity.SS_DEPTID}}</span>
              </div>
              <div class="desc-item">
                <span class="label">2020年项目投资计划：</span>
              </div>
            </div>
            <div class="plan-wrapper">
              <div class="plan-item">
                <div class="icon icon1"></div>
                <div class="title">投资计划</div>
                <div class="state">493</div>
              </div>
              <div class="plan-item">
                <div class="icon icon2"></div>
                <div class="title">年末工程形象进度</div>
                <div class="state">建成</div>
              </div>
              <div class="plan-item">
                <div class="icon icon3"></div>
                <div class="title">截至5月15日投资额</div>
                <div class="state">493</div>
              </div>
              <div class="plan-item">
                <div class="icon icon4"></div>
                <div class="title">截至5月15日形象进度</div>
                <div class="state">完工</div>
              </div>
            </div>
            <div class="btn-wrapper">
              <div class="btn-item can">视频</div>
              <div class="btn-item can">无人机</div>
              <div class="btn-item cant">全景</div>
              <div class="btn-item cant">效果</div>
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
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "3",
        coverflowEffect: {
          rotate: -40,
          stretch: -20,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
      imgs: ["img", "img", "img", "img"],
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
  }

  .leaflet-popup-title {
    position: absolute;
    top: -20px;
    left: 5px;
    display: flex;
    align-items: flex-end;
    .pre {
      display: block;
      width: 6px;
      height: 18px;
      background: linear-gradient(
        180deg,
        #16eaea 0%,
        rgba(11, 48, 117, 0) 100%
      );
      transform: skewX(-30deg);
    }
    .title {
      display: block;
      height: 25px;
      line-height: 25px;
      font-family: YouSheBiaoTiHei;
      font-size: 17px;
      letter-spacing: 0px;
      color: #ffffff;
      text-shadow: 0px 2px 3px rgba(0, 0, 0, 0.64);
      position: relative;
      padding-left: 12px;
    }
    .title::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 2px;
      width: 300px;
      height: 15px;
      z-index: -1;
      background-image: linear-gradient(90deg, #1950b9 0%, transparent 100%);
      transform: skewX(-30deg);
    }
  }

  .leaflet-popup-close-button {
    position: absolute;
    top: -20px;
    right: -20px;
    width: 38px;
    height: 38px;
    .bg-image("./images/detail_close2");
  }

  .leaflet-popup-content-wrapper {
    background-image: url("./images/detail.png");
    text-align: center;
    height: 462px;
    width: 500px;
    box-sizing: border-box;
    padding: 14px;
  }

  .leaflet-popup-content {
    color: #fff;
    overflow: hidden;
    height: 100%;
    .desc-wrapper {
      margin-top: 10px;
      text-align: left;
      .desc-item {
        margin-bottom: 5px;
        display: flex;
        align-items: top;
        font-family: PingFang;
        line-height: 18px;
        .label {
          font-size: 12px;
          &::before {
            content: "";
            display: inline-block;
            width: 4px;
            height: 4px;
            background: #165fea;
            border-radius: 50%;
            margin-right: 3px;
            vertical-align: middle;
          }
        }
        .content {
          flex: 1;
          font-size: 12px;
          color: #c9c9c9;
        }
        .state {
          color: #16eaea;
        }
      }
      .flex {
        > .desc-item {
          width: 50%;
        }
      }
    }
    .img-wrapper {
      position: relative;
      height: 100px;
      .swiper-wrapper {
        height: 100%;
        .swiper-item {
          > img {
            width: 100%;
          }
        }
        .swiper-pagination {
          position: absolute;
          bottom: 0;
        }
        .swiper-pagination-bullet {
          background: #fff;
          opacity: 0.38;
          width: 6px;
          height: 6px;
        }
        .swiper-pagination-bullet-active {
          background-color: #fff;
          opacity: 1;
        }
      }
    }
    .plan-wrapper {
      display: flex;
      justify-items: space-between;
      font-family: PingFang;
      .plan-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon {
          width: 60px;
          height: 80px;
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
        .title {
          margin-top: -5px;
          font-size: 12px;
          transform: scale(0.83);
        }
        .state {
          margin-top: 3px;
          font-size: 12px;
          color: #16eaea;
        }
      }
    }
    .btn-wrapper {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      .btn-item {
        width: 50px;
        height: 17px;
        line-height: 17px;
        margin: 0 10px;
        font-size: 12px;
      }
      .can {
        .bg-image("./images/btn-can");
      }
      .cant {
        .bg-image("./images/btn-cant");
      }
    }
  }
}
</style>
