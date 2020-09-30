<template>
  <div id="trackPopUp" v-if="shallPop">
    <div
      v-for="(item, index) in popList"
      :key="index"
      :id="`trackPopUpContent_${index}`"
      class="leaflet-popup-sej"
      :style="{ transform: `translate3d(${item.x}px,${item.y + 5}px, 0)` }"
    >
      <div class="popup-name-container">
        {{item.name}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      shallPop: false,
      popList: [],
    }
  },
  computed: {
    ...mapGetters("map", ["sejList"]),
  },
  methods: {
    fixPopup() {
      const list = this.sejList;
      if (list && list.length) {
        const G_list = [];
        list.map((item) => {
          if (item.geometry) {
            const { x, y } = item.geometry;
            const pointToWindow = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
              window.earth.scene,
              Cesium.Cartesian3.fromDegrees(x, y, 0)
            );
            pointToWindow && G_list.push({ ...item, pointToWindow });
          }
        });
        this.doPopup(G_list);
      } else {
        this.doPopup([]);
      }
    },
    doPopup(G_list) {
      const popList = [];
      if (G_list.length) {
        G_list.map((item, index) => {
          popList.push({
            id: item.id,
            name: item.attributes.NAME,
            x:
              item.pointToWindow.x -
              ($(`#trackPopUpContent_${index}`).width() || 0) / 2,
            y:
              item.pointToWindow.y -
              ($(`#trackPopUpContent_${index}`).height() || 0),
          });
        });
        this.popList = popList;
        !this.shallPop &&
          this.$nextTick(() => {
            console.log('goal!!!!')
            this.shallPop = true;
          });
      } else {
        this.shallPop && this.closePopup();
      }
    },
    closePopup() {
      this.shallPop = false;
    },
  }
}
</script>

<style lang="less">
.leaflet-popup-sej {
  position: fixed;
  text-align: center;
  top: -20px;
  left: 0;
  .popup-name-container {
    width: 100px;
    height: 45px;
    line-height: 45px;
    .bg-image("./images/bg");
    font-size: 20px;
    color: #61F5F5;
  }
}
</style>