<template>
  <div
    class="project-table"
    v-show="tableShow"
    :style="{ right: showLarge ? '45%' : '0' }"
  >
    <div class="project-table-mask"></div>
    <div class="project-table-body">
      <header>
        <span>2021年度“塘河沿线”工作任务清单</span>
        <div class="statistical">
          重点项目个数:<i>46</i>个；总投资:<i>311167.69</i>万元；年度投资计划总额:<i>158729.1</i>万元
        </div>
        <a class="panel-close" @click="closeTable">×</a>
      </header>
      <div>
        <el-table
          :data="tableData"
          style="width: 100%"
          height="100%"
          class="project-table-wrapper"
          cell-class-name="project-table-cell"
          header-row-class-name="project-table-header"
        >
          <el-table-column
            type="index"
            label="序号"
            width="60"
            align="center"
            fixed
          ></el-table-column>
          <el-table-column
            prop="projectName"
            label="项目名称"
            width="150"
            fixed
          ></el-table-column>
          <el-table-column
            prop="constructionScale"
            label="建设规模和内容"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="InvestmentType"
            label="投资类型"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="constructionProgress"
            label="建设进展"
            width="100"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="constructionSite"
            label="建设地点"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="constructionPeriod"
            label="计划建设期限"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="totalInvestment"
            label="总投资（万元）"
            width="90"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="completeInvestment"
            label="开工至2020年底预计完成投资（万元）"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="department"
            label="责任单位"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="implementation"
            label="组织实施单位"
            width="140"
          ></el-table-column>
          <el-table-column label="2021年项目投资计划">
            <el-table-column
              prop="InvestmentPlan"
              label="年底投资计划"
              width="140"
            ></el-table-column>
            <el-table-column
              prop="visualSchedule"
              label="年度工程形象进度"
              width="140"
            ></el-table-column>
            <el-table-column
              prop="February"
              label="2月份投资计划及形象进度"
              width="140"
            ></el-table-column>
            <el-table-column
              prop="March"
              label="3月份投资计划及形象进度"
              width="140"
            ></el-table-column>
            <el-table-column
              prop="April"
              label="4月份投资计划及形象进度"
              width="140"
            ></el-table-column>
            <el-table-column
              prop="May"
              label="5月份投资计划及形象进度"
              width="140"
            ></el-table-column>
            <el-table-column
              prop="June"
              label="6月份投资计划及形象进度"
              width="140"
            ></el-table-column>
            <el-table-column
              prop="July"
              label="7月份投资计划及形象进度"
              width="140"
            ></el-table-column>
            <el-table-column
              prop="August"
              label="8月份投资计划及形象进度"
              width="140"
            ></el-table-column>
            <el-table-column
              prop="September"
              label="9月份投资计划及形象进度"
              width="140"
            ></el-table-column>
            <el-table-column
              prop="October"
              label="10月份投资计划及形象进度"
              width="140"
            ></el-table-column>
            <el-table-column
              prop="November"
              label="11月份投资计划及形象进度"
              width="140"
            ></el-table-column>
            <el-table-column
              prop="December"
              label="12月份投资计划及形象进度"
              width="140"
            ></el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import peojectData from "@/mock/peojectData";
export default {
  data() {
    return {
      showLarge: window.showLarge,
      tableData: peojectData,
    };
  },

  props: { tableShow: Boolean },

  methods: {
    closeTable() {
      this.$emit("closeTable");
    },
  },
};
</script>

<style lang="less" scoped>
.project-table {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;

  .project-table-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0.5;
    background: #000;
  }

  .project-table-body {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 10%;
    left: 10%;
    width: 80%;
    height: 80%;
    background-color: #00124d;
    border: solid 0.1vh #2cf6ff;
    box-sizing: border-box;
    padding: 2.5vh 4vh;

    > header {
      position: relative;
      padding-bottom: 1.5vh;
      border-bottom: solid 0.1vh #273953;
      margin-bottom: 1.5vh;

      span {
        display: block;
        text-align: center;
        font-family: YouSheBiaoTiHei;
        font-size: 2.8vh;
        text-shadow: 0px 0.8vh 0.8vh rgba(0, 0, 0, 0.64);
        color: #fff;
      }

      .statistical {
        text-align: right;
        font-family: YouSheBiaoTiHei;
        font-size: 2vh;
        margin-top: 1.5vh;
        color: #00cbff;

        > i {
          font-family: YouSheBiaoTiHei;
          font-style: normal;
          font-size: 2.6vh;
          color: #fff;
        }
      }

      .panel-close {
        position: absolute;
        top: -1.5vh;
        right: -3vh;
        font-size: 4.5vh;
        color: #01d3ff;
        cursor: pointer;
      }
    }

    > div {
      flex: 1;
      height: 0;
    }
  }
}
</style>
<style lang="less">
.project-table-wrapper {
  background-color: #00124d !important;
  border-color: #286bba !important;

  &::before,
  &::after {
    background-color: #286bba !important;
  }

  .el-table__fixed::before {
    background-color: #286bba !important;
  }

  .project-table-cell {
    background-color: #00124d !important;
    border-color: #286bba !important;
    color: #fff;
  }

  .project-table-header {
    > th {
      text-align: center;
      font-weight: normal;
      background-color: #0c2e67 !important;
      border-color: #286bba !important;
      color: #fff;
    }
  }

  *::-webkit-scrollbar {
    width: 1.2vh;
    height: 1.2vh;
  }
}
</style>