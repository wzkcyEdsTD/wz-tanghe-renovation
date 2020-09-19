<template>
  <div id="forcePopUp" v-if="showPopUp">
    <div id="forcePopUpContent" class="leaflet-popup">
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
              <div class="item">
                <span class="label">点位名称：</span>
                <span class="content">{{forceEntity.NAME}}</span>
              </div>
              <div class="item">
                <span class="label">地址：</span>
                <span class="content">{{forceEntity.ADDR_SCOPE}}</span>
              </div>
              <div class="item">
                <span class="label">建设状态：</span>
                <span class="content state">{{forceEntity.STATE}}</span>
              </div>
              <div class="item">
                <span class="label">负责人：</span>
                <span class="content">{{forceEntity.ZHB_DEPTID}}</span>
              </div>
            </div>
            <!-- <div class="btn-wrapper">
              <span>视频</span>
              <span>无人机</span>
              <span>全景</span>
              <span>效果</span>
            </div>-->
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
        // slidesPerView: 3,
        // spaceBetween: 60,
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
        // navigation: {
        //   nextEl: ".swiper-button-right",
        //   prevEl: ".swiper-button-left",
        // },
      },
      imgs: ["img", "img", "img", "img"],
      // forcePosition: {},
    };
  },
  async mounted() {
    this.eventRegsiter();
  },
  methods: {
    eventRegsiter() {
      this.$bus.$off("cesium-projectClick");
      this.$bus.$on("cesium-projectClick", (item) => {
        console.log("wocao", item.extra_data);
        this.forceEntity = item.extra_data;
        this.showPopUp = true;
      });
    },
    // /**
    //  *  详情点赋值
    //  *  @param {object} forceEntity 详情点信息
    //  */
    // getForceEntity(forceEntity) {
    //   this.forceEntity = forceEntity;
    //   console.log("olei", forceEntity);
    // },
    // /**
    //  *  框体移动
    //  *  @param {object} position
    //  */
    // renderForceEntity(pointToWindow) {
    //   if (
    //     this.forcePosition.x !== pointToWindow.x ||
    //     this.forcePosition.y !== pointToWindow.y
    //   ) {
    //     this.forcePosition = pointToWindow;
    //   }
    // },
    closePopup() {
      // this.forcePosition = {};
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

  .leaflet-popup-close-button {
    position: absolute;
    top: -25px;
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
      text-align: left;
      .item {
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        font-family: PingFang;
        &::before {
          content: "";
          display: inline-block;
          width: 4px;
          height: 4px;
          background: #165fea;
          border-radius: 50%;
          margin-right: 3px;
        }
        .label {
          width: 80px;
          font-size: 14px;
        }
        .content {
          flex: 1;
          font-size: 12px;
          color: #c9c9c9;
          line-height: 18px;
        }
        .state {
          color: #16eaea;
        }
      }
    }
    .img-wrapper {
      position: relative;
      height: 100px;
      .swiper-wrapper {
        height: 100%;
        .swiper-item {
          >img {
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
  }
}
</style>
