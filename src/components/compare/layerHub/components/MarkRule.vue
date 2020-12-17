<template>
  <div class="mark-popup">
    <div class="mask"></div>
    <div class="content">
      <!-- <p class="text">扫描二维码进行评分</p> -->
      <!-- <img class="qrcode" src="../images/qrcode.png" /> -->
      <div class="top">
        <img class="title" src="../images/mark-title.png" />
        <p class="tip">请在PAD端完成打分 总分值为<span>100</span>分</p>
      </div>
      <div class="rules">
        <div class="rule-item">
          <div class="index">①</div>
          <div class="rule-content">项目数量和总投资<span>25</span>分</div>
        </div>
        <div class="rule-item">
          <div class="index">②</div>
          <div class="rule-content">项目实施难度<span>30</span>分</div>
        </div>
        <div class="rule-item">
          <div class="index">③</div>
          <div class="rule-content">
            项目进度和完成质量情况<span>30</span>分
          </div>
        </div>
        <div class="rule-item">
          <div class="index">④</div>
          <div class="rule-content">执行力<span>15</span>分</div>
        </div>
      </div>
      <!-- <div class="note">
        <img src="../images/mark-note.png" />
        <p class="text">
          指挥部领导评分权重:
          指挥部领导成员占40%，其中总指挥占20%，2个副指挥各占10%
        </p>
      </div> -->
      <img class="close" src="../images/mark-close.png" @click="close" />
    </div>
  </div>
</template>

<script>
export default {
  name: "MarkRule",
  methods: {
    close() {
      this.$parent.showMark = false;
    },
  },
};
</script>

<style lang="less" scoped>
.mark-popup {
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .mask {
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.3;
  }
  .content {
    z-index: 999;
    position: absolute;
    top: 30%;
    left: 50%;
    width: 50%;
    padding: 3vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: translateX(-50%);
    .bg-image("../images/mark-bg");
    color: #ddf8ff;
    .top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .tip {
        > span {
          font-family: YouSheBiaoTiHei;
          font-size: 2vh;
          color: #ff46a0;
          vertical-align: middle;
        }
      }
    }
    .rules {
      display: flex;
      flex-wrap: wrap;
      margin-top: 1vh;
      padding: 2vh 3vh;
      background-color: rgba(82, 196, 226, 0.4);
      border: solid 1px #84d5ff;
      .rule-item {
        display: flex;
        align-items: center;
        width: 50%;
        margin: 1vh 0;
        font-size: 2vh;
        .index {
          font-family: YouSheBiaoTiHei;
          font-size: 2vh;
          color: #00ebff;
        }
        .rule-content {
          > span {
            color: #00ebff;
          }
        }
      }
    }
    .note {
      display: flex;
      align-items: center;
      margin-left: 1vh;
      width: 100%;
      margin-top: 1vh;
      > img {
        width: 2vh;
      }
      .text {
        margin-left: 10px;
        font-size: 1.4vh;
      }
    }
    .close {
      position: absolute;
      top: 1vh;
      right: 1vh;
      cursor: pointer;
    }
  }
}
</style>