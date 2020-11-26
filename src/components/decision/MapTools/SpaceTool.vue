<template>
  <div class="space-tool">
    <div
      class="tool-item"
      :class="{ active: currentTool == item.value }"
      v-for="item in toolList"
      :key="item.value"
    >
      <img class="dot" v-show="currentTool == item.value" src="./images/space-dot.png">
      {{ item.label }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toolList: [
        {
          label: "空间标绘",
          value: 1,
        },
        {
          label: "空间量算",
          value: 2,
        },
        {
          label: "空间分析",
          value: 3,
        },
      ],
      currentTool: 1
    };
  },
};
</script>

<style lang="less" scoped>
.space-tool {
  .bg-image(@url) {
    background: url("@{url}.png") no-repeat center;
    background-size: 100% 100%;
  }
  position: fixed;
  top: 10vh;
  left: 50%;
  transform: translateX(-50%);
  width: 80vh;
  height: 3.5vh;
  .bg-image("./images/space-bg");
  display: flex;
  justify-content: center;
  align-items: center;
  .tool-item {
    margin: 0.3vh 2.5vh 0 2.5vh;
    color: #fff;
    opacity: 0.7;
    &.active {
      color: #69fee5;
      opacity: 1;
    }
    .dot {
      width: 8px;
      height: 8px;
    }
  }
}
</style>