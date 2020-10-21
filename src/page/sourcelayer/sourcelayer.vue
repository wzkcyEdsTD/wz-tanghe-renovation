<template>
  <div class="page-map">
    <div class="cesium-map" v-if="currentMapType == 'cesiumMap'">
      <CesiumMap />
    </div>
    <div class="mask-wrapper">
      <div class="top"></div>
      <!-- <div class="left" v-if="!showLarger"></div> -->
      <!-- <div class="leftlarger" v-if="showLarger"></div> -->
      <!-- <div class="bottom"></div> -->
    </div>
  </div>
</template>
<script>
import CesiumMap from "components/sourcelayer/cesium_map";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Map",
  data() {
    return {
      showLarger:false,
      screenWidth: document.body.clientWidth,
      screeHeight: document.body.clientHeight,

    };
  },
  computed: {
    ...mapGetters("map", ["currentMapType"]),
  },
  mounted() {
    this.eventRegsiter();
    this.getKuanGao();
  },
  methods: {
    eventRegsiter() {},
    getKuanGao(){
      //4320*1280
      console.log(this.screenWidth);
      if(this.screenWidth>4000&this.screeHeight>1000){
        this.showLarger = true;
      }else {
        this.showLarger = false;
      }
    },
  },
  components: {
    CesiumMap,
  },
  watch: {},
};
</script>
<style scoped lang="less">
.page-map {
  .cesium-map {
    height: 100%;
    width: 100%;
  }
}
.mask-wrapper {
  position: relative;
  .top {
    position: fixed;
    top: 0;
    width: 100%;
    height: 10vh;
    background: linear-gradient(
      180deg,
      #040d33 0%,
      rgba(4, 13, 51, 0.94) 50%,
      rgba(4, 13, 51, 0) 100%
    );
  }
  .left {
    position: fixed;
    top: 5vh;
    left: 0;
    width: 40vh;
    height: 100%;
    background: linear-gradient(90deg, #040D33 0%, rgba(4, 13, 51, 0.6) 75%, rgba(4, 13, 51, 0.1) 100%);
  }
  .leftlarger {
    position: fixed;
    top: 0;
    left: 0;
    width: 29vw;
    height: 100%;
    background: linear-gradient(90deg, #040D33 0%, rgba(4, 13, 51, 0.6) 75%, rgba(4, 13, 51, 0.1) 100%);
  }
  .bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 15vh;
    background-image: linear-gradient(
      0deg,
      #031d38 0%,
      rgba(0, 29, 59, 0.64) 61%,
      rgba(3, 45, 62, 0) 100%
    );
  }
}
</style>
