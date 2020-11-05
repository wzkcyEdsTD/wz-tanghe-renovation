<template>
  <div class="rightChart">
    <div class="center-box">
      <Swivel />
    </div>
  </div>
</template>

<script>
import Swivel from "./components/Swivel/Swivel";
export default {
  components: {
    Swivel
  }
}
</script>

<style lang="less" scoped>
@import url("./rightChart.less");
</style>