<template>
  <div class="topic">
    <div class="topic-list">
      <div
        class="topic-item"
        :class="{ active: currentTopic == item.value }"
        v-for="item in topicList"
        :key="item.value"
        @click="itemClick(item)"
      >
        <img
          v-show="currentTopic != item.value"
          :src="require(`./images/${item.label}.png`)"
        />
        <img
          v-show="currentTopic == item.value"
          :src="require(`./images/${item.label}select.png`)"
        />
        <p>{{ item.label }}</p>
        <ul
          class="children-list"
          v-show="currentTopic == item.value && item.children"
        >
          <li
            class="children-item"
            @click.stop="childClick(child)"
            :class="{ active: currentChild == child }"
            v-for="(child, index) in item.children"
            :key="index"
          >
            {{ child }}
          </li>
        </ul>
      </div>
    </div>
    <Analyze v-show="showAnalyze" />
    <DelayProject :show="currentChild == '滞后项目'" />
    <ProblemProject :show="currentChild == '问题项目'" />
    <ProjectSpread :show="currentChild == '项目分布'" />
    <AmountSpread :show="currentChild == '项目投资额分布'" />
    <Supervise ref="Supervise" />
  </div>
</template>

<script>
import { ServiceUrl, LayerList } from "@/config/server/mapConfig";
import Analyze from "../Frame/TopicSub/Analyze";
import DelayProject from "../Frame/TopicSub/DelayProject";
import ProblemProject from "../Frame/TopicSub/ProblemProject";
import AmountSpread from "../Frame/TopicSub/AmountSpread";
import ProjectSpread from "../Frame/TopicSub/ProjectSpread";
import Supervise from "../Frame/TopicSub/Supervise";
export default {
  name: "Topic",
  components: {
    Analyze,
    DelayProject,
    ProblemProject,
    AmountSpread,
    ProjectSpread,
    Supervise,
  },
  data() {
    return {
      topicList: [
        {
          label: "进度预警专题",
          value: 1,
          children: ["滞后项目", "问题项目"],
        },
        {
          label: "项目投资专题",
          value: 2,
          children: ["项目分布", "项目投资额分布"],
        },
        {
          label: "绿化覆盖专题",
          value: 3,
        },
        {
          label: "城市规划专题",
          value: 4,
        },
        {
          label: "领导督办专题",
          value: 5,
        },
        {
          label: "周边活跃度分析",
          value: 6,
        },
        {
          label: "考核分析",
          value: 7,
        },
      ],
      currentTopic: 0,
      currentChild: "",
      ldfwFace: undefined,
      ldfwLine: undefined,
      konggui: undefined,
      showAnalyze: false,
      // showSupervise: false,
    };
  },
  methods: {
    itemClick(item) {
      this.ldfwFace && (this.ldfwFace.show = false);
      this.ldfwLine && (this.ldfwLine.show = false);
      this.konggui && (this.konggui.show = false);

      this.showAnalyze = false;
      // this.showSupervise = false;
      this.currentChild = "";
      this.superviseHandle(false);
      this.$bus.$emit("set-bufferFlag", {
        value: false,
      });

      if (item.value == this.currentTopic) {
        this.currentTopic = 0;
        this.$parent.showHub = true;
        return;
      }
      this.currentTopic = item.value;
      if (item.value == 3) {
        this.ldfwFace = window.earth.imageryLayers.addImageryProvider(
          new Cesium.SuperMapImageryProvider({
            url:
              "http://172.168.3.183:8090/iserver/services/3D-ldfw_polygon/rest/realspace/datas/ldfw_polygon",
          })
        );
        this.ldfwFace.alpha = 0.6;
        this.ldfwLine = window.earth.imageryLayers.addImageryProvider(
          new Cesium.SuperMapImageryProvider({
            url:
              "http://172.168.3.183:8090/iserver/services/3D-ldfw_line/rest/realspace/datas/ldfw_line",
          })
        );
      }
      if (item.value == 4) {
        this.konggui = window.earth.imageryLayers.addImageryProvider(
          new Cesium.SuperMapImageryProvider({
            url:
              "http://172.168.3.183:8090/iserver/services/3D-KGSQ/rest/realspace/datas/KGSQ",
          })
        );
        this.konggui.alpha = 0.8;
      }
      if (item.value == 5) {
        // this.showSupervise = true;
        this.superviseHandle(true);
      }
      if (item.value == 6) {
        this.$bus.$emit("set-bufferFlag", {
          value: true,
        });
      }
      if (item.value == 7) {
        this.showAnalyze = true;
      }
    },
    childClick(item) {
      this.$parent.$refs.LayerHub.showPopover = false;

      if (item == this.currentChild) {
        this.currentChild = "";
        this.$parent.showHub = true;
        return;
      }
      this.$parent.showHub = false;
      this.currentChild = item;
      // if (item == "滞后项目") {
      // }
      // if (item == "问题项目") {
      // }
      // if (item == "项目分布") {
      //   // this.showHeatMap = 'number'
      // }
      // if (item == "项目投资额分布") {
      //   // this.showHeatMap = `amount${this.cu}`
      // }
    },
    filterData(array) {
      window.billboardMap["项目"]._billboards.forEach((v) => {
        v.show = false;
        array.forEach((item) => {
          if (v.id == `billboard@${item.attributes.SMID}@项目`) {
            v.show = true;
          }
        });
      });
      window.whiteLabelMap["项目"]._labels.forEach((v) => {
        v.show = false;
        array.forEach((item) => {
          if (v.id == `label@${item.attributes.SMID}@项目`) {
            v.show = true;
          }
        });
      });
    },
    superviseHandle(check) {
      window.billboardMap["项目"]._billboards.map((v) => (v.show = false));
      // if (window.billboardMap["supervise"]) {
      //   window.billboardMap["supervise"]._billboards.map(
      //     (v) => (v.show = check)
      //   );
      // } else if (check && !window.billboardMap["supervise"]) {
      //   this.addProjectLayer();
      // }
      if (check) {
        this.addProjectLayer();
      } else {
        if (window.billboardMap["supervise"]) {
          window.billboardMap["supervise"]._billboards.map(
            (v) => (v.show = false)
          );
        }
        this.$refs.Supervise.showSupervise = false;
        if (LayerList[1].check) {
          window.billboardMap["项目"]._billboards.map((v) => (v.show = true));
        }
      }
    },
    // 添加项目图层
    async addProjectLayer() {
      const { result } = await this.fetchProjectData();
      console.log("rettttttt", result);
      window.billboardMap["supervise"] = window.earth.scene.primitives.add(
        new Cesium.BillboardCollection()
      );

      const forceDrawFeatures = result.features;
      forceDrawFeatures.map((item) => {
        !window.featureMap["supervise"] &&
          (window.featureMap["supervise"] = {});
        window.featureMap["supervise"][item.attributes.SMID] = {
          name:
            item.attributes.SHORT_NAME ||
            item.attributes.NAME ||
            item.attributes.MC ||
            item.attributes.JC,
          attributes: item.attributes,
          geometry: item.geometry,
          type: "supervise",
        };

        const position = Cesium.Cartesian3.fromDegrees(
          item.geometry.x,
          item.geometry.y,
          4
        );

        window.billboardMap["supervise"].add({
          id: `billboard@${item.attributes.SMID}@supervise`,
          image: `/static/images/map-ico/${item.attributes.STATUS.trim()}-问题.png`,
          width: 34,
          height: 34,
          scaleByDistance: new Cesium.NearFarScalar(500, 1.5, 6000, 1),
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          position,
        });
      });
    },
    // 获取项目数据
    fetchProjectData() {
      return new Promise((resolve, reject) => {
        const getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(
          ServiceUrl.FEATUREMVT,
          {
            eventListeners: {
              processCompleted: (data) => {
                data && resolve(data);
              },
              processFailed: (err) => reject(err),
            },
          }
        );
        getFeatureBySQLService.processAsync(
          new SuperMap.REST.GetFeaturesBySQLParameters({
            queryParameter: new SuperMap.REST.FilterParameter({
              attributeFilter: "(commend != '' OR star > 0)",
            }),
            toIndex: -1,
            datasetNames: ["thxm:th_spatial_project_view"],
          })
        );
      });
    },
  },
  watch: {
    currentChild(val, oldVal) {
      console.log("val", val);
      console.log("oldVal", oldVal);
      if (oldVal == "滞后项目" || oldVal == "问题项目") {
        window.billboardMap["项目"]._billboards.map((v) => (v.show = true));
        window.whiteLabelMap["项目"].setAllLabelsVisible(true);
      }
    },
  },
};
</script>

<style lang="less">
@import url("./Topic.less");
</style>

<style lang="less">
.el-input__inner {
  background: transparent !important;
  border: solid 1px #40a1c5 !important;
  color: white !important;
}
.analyze-select {
  .el-input__inner {
    height: 30px;
    background-image: linear-gradient(
      90deg,
      #0065cb 0%,
      #002b8b 100%
    ) !important;
    color: #fff !important;
    border-radius: 30px !important;
  }
  .el-input__icon {
    line-height: 30px !important;
  }
}
.el-select-dropdown {
  background-color: rgba(0, 28, 146, 0.6) !important;
  border: 1px solid #165fea !important;
}
.el-select-dropdown__item {
  color: #fff;
}
.el-select-dropdown__item.hover {
  background: none !important;
}
.el-select-dropdown__item.selected {
  color: #69fee5;
}
.total-rate {
  .el-rate__icon {
    margin-right: 0;
    font-size: 24px;
  }
}
.comment-rate {
  .el-rate__icon {
    margin-right: 0;
  }
}
</style>