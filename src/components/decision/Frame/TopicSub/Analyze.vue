<template>
  <div class="analyze">
    <img class="bg" src="../images/analyze-bg.png" />
    <div class="top">
      <div class="top-title">项目评分</div>
      <el-select
        class="analyze-select"
        v-model="zrdwValue"
        placeholder="请选择"
      >
        <el-option
          v-for="item in zrdwOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="content">
      <div class="start-item start1">
        <img src="../images/star1.png" />
        <p class="number">
          {{ currentStarData.data.star1 || 0 }}<span class="unit">个</span>
        </p>
      </div>
      <div class="start-item start2">
        <img src="../images/star2.png" />
        <p class="number">
          {{ currentStarData.data.star2 || 0 }}<span class="unit">个</span>
        </p>
      </div>
      <div class="start-item start3">
        <img src="../images/star3.png" />
        <p class="number">
          {{ currentStarData.data.star3 || 0 }}<span class="unit">个</span>
        </p>
      </div>
      <div class="start-item start4">
        <img src="../images/star4.png" />
        <p class="number">
          {{ currentStarData.data.star4 || 0 }}<span class="unit">个</span>
        </p>
      </div>
      <div class="start-item start5">
        <img src="../images/star5.png" />
        <p class="number">
          {{ currentStarData.data.star5 || 0 }}<span class="unit">个</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  countProjectStar,
} from "api/tangheAPI";
export default {
  data() {
    return {
      zrdwOptions: [
        // { label: "指挥部", value: "A02" },
        { label: "鹿城区政府", value: "A02A01" },
        { label: "龙湾区政府", value: "A02A03" },
        { label: "瓯海区政府", value: "A02A02" },
        { label: "瑞安市政府", value: "A02A04" },
        { label: "浙南产业区", value: "A02A05" },
        { label: "温州城发集团", value: "A02A07" },
        { label: "温州现代集团", value: "A02A06" },
      ],
      zrdwValue: "A02A01",
      starData: [
        {
          label: "鹿城区政府",
          value: "A02A01",
          data: { star1: 0, star2: 0, star3: 0, star4: 0, star5: 0 },
        },
        {
          label: "瓯海区政府",
          value: "A02A02",
          data: { star1: 0, star2: 0, star3: 0, star4: 0, star5: 0 },
        },
        {
          label: "龙湾区政府",
          value: "A02A03",
          data: { star1: 0, star2: 0, star3: 0, star4: 0, star5: 0 },
        },
        {
          label: "瑞安市政府",
          value: "A02A04",
          data: { star1: 0, star2: 0, star3: 0, star4: 0, star5: 0 },
        },
        {
          label: "浙南产业区",
          value: "A02A05",
          data: { star1: 0, star2: 0, star3: 0, star4: 0, star5: 0 },
        },
        {
          label: "温州城发集团",
          value: "A02A07",
          data: { star1: 0, star2: 0, star3: 0, star4: 0, star5: 0 },
        },
        {
          label: "温州现代集团",
          value: "A02A06",
          data: { star1: 0, star2: 0, star3: 0, star4: 0, star5: 0 },
        },
      ],
    }
  },
  computed: {
    currentStarData() {
      let res = this.starData.find((item) => {
        return item.value == this.zrdwValue;
      });
      return res;
    },
  },
  methods: {
    async getStarCount() {
      let res = await countProjectStar();
      if (res.code == 200) {
        this.starData.forEach((item) => {
          res.result.forEach((v) => {
            if (item.label == v.name) {
              // const data = {};

              // 增加评分数据
              v.countBaseRespList.map(({ name, num }) => {
                name == "1" && (item.data.star1 = num);
                name == "2" && (item.data.star2 = num);
                name == "3" && (item.data.star3 = num);
                name == "4" && (item.data.star4 = num);
                name == "5" && (item.data.star5 = num);
              });

              // item.data = data;
            }
          });
        });
        this.showAnalyze = true;
      }
    },
  },
  mounted() {
    this.getStarCount()
  }
};
</script>

<style lang="less" scoped>
.analyze {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  .bg {
    width: 100%;
  }
  .top {
    position: absolute;
    top: -5%;
    left: 50%;
    transform: translateX(-50%);
    .top-title {
      margin-top: -30px;
      font-family: YouSheBiaoTiHei;
      font-size: 2.8vh;
      text-align: center;
      color: #fff;
    }
  }
  .content {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    // width: 95%;
    width: 100%;
    display: flex;
    text-align: center;
    // .bg-image("./images/analyze-bg");
    .start-item {
      position: relative;
      // margin: 0 1vh;
      flex: 1;
      .number {
        position: absolute;
        top: 32%;
        left: 50%;
        transform: translateX(-50%);
        font-family: YouSheBiaoTiHei;
        font-size: 4vh;
        color: #fff;
        .unit {
          font-family: YouSheBiaoTiHei;
          font-size: 1.6vh;
          vertical-align: middle;
        }
      }
    }
  }
  .analyze-select {
    width: 120px;
    /deep/ .el-input__inner {
      text-align: center;
    }
  }
}
</style>