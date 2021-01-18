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
      <div class="children-list" v-show="showMeasure">
        <div
          class="children-item"
          @click.stop="measureClick(item)"
          :class="{ active: currentMeasure == item.value }"
          v-for="(item, index) in measureList"
          :key="index"
        >
          <img
            v-show="currentMeasure != item.value"
            :src="require(`./images/${item.label}.png`)"
          />
          <img
            v-show="currentMeasure == item.value"
            :src="require(`./images/${item.label}高亮.png`)"
          />
          <span>{{ item.label }}</span>
        </div>
      </div>
      <div style="width: 52%;" class="children-list" v-show="showDraw">
        <div
          class="children-item"
          @click.stop="drawClick(item)"
          :class="{ active: currentDraw == item.value }"
          v-for="(item, index) in drawList"
          :key="index"
        >
          <img :style="{height: (index==0 ? 10 : 20)+'px'}"
            v-show="currentDraw != item.value"
            :src="require(`./images/${item.label}.png`)"
          />
          <img :style="{height: (index==0 ? 10 : 20)+'px'}"
            v-show="currentDraw == item.value"
            :src="require(`./images/${item.label}高亮.png`)"
          />
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>
    <calTools ref="measureTools" v-show="false" />
    <DrawTool ref="drawTools"/>
    
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
      showMeasure: false,
      showDraw: false,
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
      measureList: [
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
      currentMeasure: "",
      drawList: [
        {
          label: "点",
          value: "point",
        },
        {
          label: "线",
          value: "line",
        },
        {
          label: "面",
          value: "polygon",
        },
        {
          label: "清除",
          value: "clear",
        },
        {
          label: "历史查询",
          value: "history",
        },
      ],
      currentDraw: "",
    };
  },
  methods: {
    toolClick(item) {
      this.$parent.$refs.Topic.currentTopic = 0;
      this.$parent.$refs.Topic.currentChild = "";
      this.showMeasure = false;
      this.showDraw = false;
      this.$parent.showHub = false

      if (this.currentTool == item.value) {
        this.currentTool = 0;
        this.$parent.showHub = true
        return;
      }
      this.currentTool = item.value;

      if (this.currentTool == 1) {
        this.showDraw = true;
      }
      if (this.currentTool == 2) {
        this.showMeasure = true;
      }
      if (this.currentTool == 3) {
        this.$refs.measureTools.gaugeAreaAnalyze();
      }
    },
    measureClick(item) {
      this.currentMeasure = item.value;
      if (item.value == "ju") {
        this.$refs.measureTools.gaugeDistance();
      } else if (item.value == "mian") {
        this.$refs.measureTools.gaugeArea();
      } else if (item.value == "clear") {
        this.currentMeasure = "";
        this.$refs.measureTools.clearGauge();
      }
    },
    drawClick(item) {
      console.log(111, item)
      if (item.value == "point") {
        this.currentDraw = item.value;
        this.$refs.drawTools.drawPoint();
      } else if (item.value == "line") {
        this.currentDraw = item.value;
        this.$refs.drawTools.drawLine();
      } else if (item.value == "polygon") {
        this.currentDraw = item.value;
        this.$refs.drawTools.drawPolygon();
      } else if (item.value == "clear") {
        if (this.currentDraw != "history") {
          this.currentDraw = "";
        }
        this.$refs.drawTools.clearDraw();
      } else if (item.value == "history") {
        this.currentDraw = item.value;
        this.$refs.drawTools.showHistory();
      }
    }
  },
};
</script>

<style lang="less" scoped>
@import url("./SpaceTool.less");
</style>