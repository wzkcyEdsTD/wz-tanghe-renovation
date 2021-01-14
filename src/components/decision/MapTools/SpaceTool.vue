<template>
  <div class="space-tool">
    <div class="tool-wrapper">
      <div class="tool-list">
        <div
          class="tool-item"
          :class="{ active: currentTool == item.value }"
          v-for="item in toolList"
          :key="item.value"
          @click="toolClick(item)"
        >
          <img
            class="dot"
            v-show="currentTool == item.value"
            src="./images/space-dot.png"
          />
          <span>{{ item.label }}</span>
        </div>
      </div>
      <div class="children-list" v-show="showChild">
        <div
          class="children-item"
          @click.stop="childClick(item)"
          :class="{ active: currentChild == item.value }"
          v-for="(item, index) in childList"
          :key="index"
        >
          <img
            v-show="currentChild != item.value"
            :src="require(`./images/${item.label}.png`)"
          />
          <img
            v-show="currentChild == item.value"
            :src="require(`./images/${item.label}高亮.png`)"
          />
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>
    <calTools ref="tools" v-show="false" />
    <DrawTool />
    
  </div>
</template>

<script>
import calTools from "../../sourcelayer/commonFrame/calTool/calTools";
import DrawTool from "../Frame/DrawTool"

export default {
  name: "spaceTool",
  components: { calTools, DrawTool },
  data() {
    return {
      showChild: false,
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
      currentTool: 0,
      childList: [
        {
          label: "测距",
          value: "ju",
        },
        {
          label: "测面",
          value: "mian",
        },
        {
          label: "清除",
          value: "clear",
        },
      ],
      currentChild: "",
    };
  },
  methods: {
    toolClick(item) {
      this.$parent.$refs.Topic.currentTopic = 0;
      this.$parent.$refs.Topic.currentChild = "";

      if (this.currentTool == item.value) {
        this.currentTool = 0;
        return;
      }
      this.showChild = false;
      this.currentTool = item.value;

      if (this.currentTool == 2) {
        this.showChild = true;
      }
      if (this.currentTool == 3) {
        this.$refs.tools.gaugeAreaAnalyze();
      }
    },
    childClick(item) {
      this.currentChild = item.value;
      if (item.value == "ju") {
        this.$refs.tools.gaugeDistance();
      } else if (item.value == "mian") {
        this.$refs.tools.gaugeArea();
      } else if (item.value == "clear") {
        this.currentChild = "";
        this.$refs.tools.clearGauge();
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./SpaceTool.less");
</style>