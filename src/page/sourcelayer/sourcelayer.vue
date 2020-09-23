<template>
  <div class="page-map">
    <div class="cesium-map" v-if="currentMapType == 'cesiumMap'">
      <CesiumMap />
    </div>
    <div class="mask-wrapper">
      <div class="top"></div>
      <div class="left"></div>
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
    return {};
  },
  computed: {
    ...mapGetters("map", ["currentMapType"]),
  },
  mounted() {
    this.eventRegsiter();
  },
  methods: {
    eventRegsiter() {},
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
    top: 0;
    left: 0;
    width: 22vw;
    height: 100%;
    background-image: linear-gradient(
      90deg,
      rgba(0, 13, 26, 0.84) 0%,
      rgba(0, 17, 34, 0.55) 70%,
      rgba(0, 19, 38, 0) 100%
    );
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
