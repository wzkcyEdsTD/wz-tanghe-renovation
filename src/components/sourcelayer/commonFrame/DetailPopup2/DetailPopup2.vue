
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
            <header>{{forceEntity.extra_data.SHORTNAME || forceEntity.extra_data.NAME}}</header>
            <ul class="content-body">
              <li>
                <span>所属区县:</span>
                <span>{{forceEntity.extra_data.DISTRICT}}</span>
              </li>
              <li>
                <span>所属街道:</span>
                <span>{{forceEntity.extra_data.STREET}}</span>
              </li>
              <!-- <li v-for="(item,key,index) in forceEntity.fix_data" :key="index">
                <span>{{key}}</span>
                <span>{{item}}</span>
              </li> -->
            </ul>
            <div class="detail">查看详情 >></div>
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
      console.log('aaa', forceEntity)
    },
    /**
     *  框体移动
     *  @param {object} position
     */
    renderForceEntity() {
      const forceEntity = this.forceEntity;
      if (forceEntity.extra_data) {
        const pointToWindow = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
          window.earth.scene,
          forceEntity.position
        );
        if (
          this.forcePosition.x !== pointToWindow.x ||
          this.forcePosition.y !== pointToWindow.y
        ) {
          this.forcePosition = pointToWindow;
        }
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
  }

  .leaflet-popup-close-button {
    .bg-image("./images/close");
    position: absolute;
    top: -10px;
    right: -10px;
    width: 32px;
    height: 32px;
    text-decoration: none;
    cursor: pointer;
  }

  .leaflet-popup-content-wrapper {
    .bg-image("./images/bg");
    text-align: center;
    height: 132px;
    width: 240px;
    box-sizing: border-box;
    padding: 15px 20px 5px 20px;
  }

  .leaflet-popup-content {
    position: relative;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
    width: 100%;
    height: 100%;
    > header {
      height: 24px;
      line-height: 24px;
      box-sizing: border-box;
      padding-right: 20px;
      font-size: 18px;
      font-family: YouSheBiaoTiHei;
      text-align: left;
      text-shadow: 0px 2px 2px rgba(0, 0, 0, 1);
      // overflow: hidden;
      // white-space: nowrap;
      // text-overflow: ellipsis;
    }
    .content-body {
      // flex: 1;
      // overflow-y: auto;
      margin-top: 8px;
      text-align: left;
      >li {
        font-size: 14px;
        height: 22px;
        line-height: 22px;
      }
    }
    .detail {
      position: absolute;
      bottom: 5px;
      right: 0;
      color: #2ACBFE;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
