<template>
  <div
    class="single-project-table"
    v-show="tableShow"
    :style="{ right: showLarge ? '45%' : '0' }"
  >
    <div class="project-table-mask"></div>
    <div class="project-table-body">
      <header>
        <span>{{ name }}</span>
        <a class="panel-close" @click="closeTable">×</a>
      </header>
      <div>
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          class="single-project-table-wrapper"
          cell-class-name="single-project-table-cell"
          header-row-class-name="single-project-table-header"
        >
          <el-table-column
            type="index"
            label="序号"
            width="60"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="年度投资计划"
            label="年度投资计划"
            width="140"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="年度工程形象进度"
            label="年度工程形象进度"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="2月份投资计划及形象进度"
            label="2月份投资计划及形象进度"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="3月份投资计划及形象进度"
            label="3月份投资计划及形象进度"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="4月份投资计划及形象进度"
            label="4月份投资计划及形象进度"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="5月份投资计划及形象进度"
            label="5月份投资计划及形象进度"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="6月份投资计划及形象进度"
            label="6月份投资计划及形象进度"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="7月份投资计划及形象进度"
            label="7月份投资计划及形象进度"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="8月份投资计划及形象进度"
            label="8月份投资计划及形象进度"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="9月份投资计划及形象进度"
            label="9月份投资计划及形象进度"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="10月份投资计划及形象进度"
            label="10月份投资计划及形象进度"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="11月份投资计划及形象进度"
            label="11月份投资计划及形象进度"
            width="140"
          ></el-table-column>
          <el-table-column
            prop="12月份投资计划及形象进度"
            label="12月份投资计划及形象进度"
            width="140"
          ></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import peojectData from "@/mock/peojectData";
import { queryPlansDetailById } from "api/tangheAPI";
export default {
  data() {
    return {
      tableShow: false,
      showLarge: window.showLarge,
      tableData: [],
      name: "",
    };
  },

  methods: {
    // 获取详情
    async getDetail(data) {
      this.name = data.name;
      const res = await queryPlansDetailById({ id: data.id });
      if (res.code == 200) {
        const result = res.result;
        if (!result.length) {
          return this.$message("暂无计划");
        }

        this.tableData = [];
        const obj = {};
        result.reverse().map(({ head, text }) => {
          obj[head] = text;
        });

        this.tableData.push(obj);
        this.tableShow = true;
      }
    },

    // 关闭
    closeTable() {
      this.tableShow = false;
    },
  },
};
</script>

<style lang="less" scoped>
.single-project-table {
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
    position: fixed;
    top: 50%;
    left: 10%;
    transform: translateY(-50%);
    width: 80%;
    background-color: #00124d;
    border: solid 0.1vh #2cf6ff;
    box-sizing: border-box;
    padding: 2.5vh 4vh 5vh;

    > header {
      position: relative;
      padding-bottom: 2.5vh;
      border-bottom: solid 0.1vh #273953;
      margin-bottom: 1.5vh;

      span {
        display: block;
        text-align: center;
        font-family: YouSheBiaoTiHei;
        font-size: 2.8vh;
        text-shadow: 0px 0.8vh 0.8vh rgba(0, 0, 0, 0.64);
        color: #fff;
        margin-bottom: 3vh;
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
.single-project-table-wrapper {
  background-color: #00124d !important;
  border-color: #286bba !important;

  &::before,
  &::after {
    background-color: #286bba !important;
  }

  .el-table__fixed::before {
    background-color: #286bba !important;
  }

  .single-project-table-cell {
    background-color: #00124d !important;
    border-color: #286bba !important;
    color: #fff;
  }

  .single-project-table-header {
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