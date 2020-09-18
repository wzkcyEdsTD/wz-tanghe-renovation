<template>
  <div id="forcePopUp" v-if="forcePosition.x && forcePosition.y">
    <div
      id="forcePopUpContent"
      class="leaflet-popup"
      :style="{transform:`translate3d(${forcePosition.x}px,${forcePosition.y}px, 0)`}"
    >
      <a class="leaflet-popup-close-button" href="#" @click="closePopup"></a>
      <div class="leaflet-popup-content-wrapper">
        <div id="forcePopUpLink" class="leaflet-popup-content">
          <div class="leaflet-popup-content">
            <div class="desc-wrapper">
              <div class="item">
                <span class="label">点位名称：</span>
                <span class="content">{{forceEntity.extra_data.NAME}}</span>
              </div>
              <div class="item">
                <span class="label">地址：</span>
                <span class="content">{{forceEntity.extra_data.ADDR_SCOPE}}</span>
              </div>
              <div class="item">
                <span class="label">建设状态：</span>
                <span class="content state">{{forceEntity.extra_data.STATE}}</span>
              </div>
              <div class="item">
                <span class="label">负责人：</span>
                <span class="content">{{forceEntity.extra_data.ZHB_DEPTID}}</span>
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
      forceEntity: {},
      forcePosition: {},
    };
  },
  async mounted() {
    this.eventRegsiter();
  },
  methods: {
    eventRegsiter() {},
    /**
     *  详情点赋值
     *  @param {object} forceEntity 详情点信息
     */
    getForceEntity(forceEntity) {
      this.forceEntity = forceEntity;
      console.log("olei", forceEntity);
    },
    /**
     *  框体移动
     *  @param {object} position
     */
    renderForceEntity(pointToWindow) {
      if (
        this.forcePosition.x !== pointToWindow.x ||
        this.forcePosition.y !== pointToWindow.y
      ) {
        this.forcePosition = pointToWindow;
      }
    },
    closePopup() {
      this.forcePosition = {};
      this.forceEntity = {};
    },
  },
};
</script>

<style lang="less" scoped>
#forcePopUp {
  .leaflet-popup {
    top: -80px;
    left: 30px;
    position: absolute;
    text-align: center;
  }

  .leaflet-popup-close-button {
    position: absolute;
    top: -25px;
    right: -15px;
    width: 38px;
    height: 38px;
    .bg-image("./images/detail_close2");
  }

  .leaflet-popup-content-wrapper {
    background-image: url("./images/detail2.png");
    text-align: center;
    height: 253px;
    width: 253px;
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
          background: #165FEA;
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
          color: #C9C9C9;
          line-height: 18px;
        }
        .state {
          color: #16EAEA;
        }
      }
    }
  }
}
</style>
