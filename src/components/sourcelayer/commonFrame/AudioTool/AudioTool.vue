<template>
  <div class="audioTool">
    <audio class="audio" :src="src" controls="controls"></audio>
    <div class="audioKit">
      <img
        class="control"
        :src="require(`./images/${status ? 'pause' : 'play'}.png`)"
        @click="changeStatus"
      />
      <span class="duration">0:00/0:00</span>
      <div class="bar">
        <el-slider v-model="progress" :show-tooltip="false"></el-slider>
      </div>
      <img
        class="sound"
        src="./images/sound.png"
        @mouseenter="mouseEnterHandle($event)"
        @mouseleave="mouseLeaveHandle($event)"
      />
    </div>
    <div
      class="soundKit"
      v-show="soundShow"
      @mouseenter="soundMouseEnterHandle($event)"
      @mouseleave="soundMouseLeaveHandle($event)"
    >
      <div class="soundBar">
        <!-- <span class="soundSpot"></span> -->
        <el-slider
          v-model="soundValue"
          :show-tooltip="false"
          vertical
          height="7vh"
        ></el-slider>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: false,
      progress: 30,
      soundValue: 0,
      soundShow: true,
      soundMouseEnter: false,
    };
  },
  props: ["src"],
  mounted() {},
  methods: {
    // 播放状态
    changeStatus() {
      this.status = !this.status;
    },

    // 音量按钮悬停
    mouseEnterHandle(event) {
      this.soundShow = true;
    },

    // 音量按钮离开
    mouseLeaveHandle(event) {
      setTimeout(() => {
        this.soundShow = this.soundMouseEnter;
      }, 2000);
    },

    // 音量组件悬停
    soundMouseEnterHandle(event) {
      this.soundMouseEnter = true;
    },

    // 音量组件离开
    soundMouseLeaveHandle(event) {
      setTimeout(() => {
        this.soundShow = this.soundMouseEnter = false;
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
.audioTool {
  position: relative;
  width: 30vh;

  .audio {
    width: 30vh;
    height: 6vh;
  }

  .audioKit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 5vh;
    border: 0.25vh solid #3fd0b9;
    background: radial-gradient(circle, #2b72c6 0%, #113476 100%);
    border-radius: 5vh;
    padding: 0 1.9vh;

    .control,
    .sound {
      width: 1.3vh;
      height: 1.3vh;
      cursor: pointer;
    }

    .duration {
      font-family: PingFang;
      font-size: 1.4vh;
      color: #fff;
      opacity: 0.7;
    }

    .bar {
      width: 11vh;

      /deep/ .el-slider__runway {
        background-color: #040d33;
      }

      /deep/ .el-slider__bar {
        border-radius: 3px;
        background-color: #14c0ff;
      }

      /deep/ .el-slider__button {
        border: none;
        background-color: transparent;
      }
    }
  }

  .soundKit {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    top: -10.3vh;
    right: 1.8vh;
    width: 2.5vh;
    height: 10vh;
    border-radius: 2.5vh;
    border: 0.25vh solid #3fd0b9;
    background: radial-gradient(circle, #2769bb 0%, #040d33 100%);

    .soundBar {
      width: 100%;
      height: 65%;
      display: flex;
      justify-content: center;

      /deep/ .el-slider__runway {
        height: 100% !important;
        background-color: #040d33;
      }

      /deep/ .el-slider__bar {
        border-radius: 3px;
        background-color: #5b8b9d;
      }

      /deep/ .el-slider__button {
        width: 1vh;
        height: 1vh;
        border: none;
        background-color: #14c0ff;
      }
    }
  }
}
</style>