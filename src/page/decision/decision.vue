<template>
  <div class="page-map">
    <div class="cesium-map">
      <CesiumMap />
    </div>
    <div class="mask-wrapper">
      <div class="top"></div>
    </div>
  </div>
</template>

<script>
import CesiumMap from "components/decision/cesium_map";

export default {
  name: "decision",
  components: {
    CesiumMap,
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
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
}
</style>