<template>
  <div class="page-map">
    <div class="cesium-map">
      <CesiumMap />
    </div>
    <div class="mask-wrapper">
      <div class="top"></div>
      <!-- <div class="left" v-if="!showLarger"></div> -->
      <!-- <div class="bottom"></div> -->
    </div>
  </div>
</template>
<script>
import CesiumMap from "components/sourcelayer/cesium_map";

export default {
  name: "sourcelayer",
  data() {
    return {
    };
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
    top: 5vh;
    left: 0;
    width: 40vh;
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
