<template>
  <div class="legend">
    <img src="./images/legend.png" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.legend {
  position: fixed;
  bottom: 2vh;
  right: 3vh;
  z-index: 999;

  img {
    width: 18vh;
    // height: 18.75vh;
  }
}
</style>