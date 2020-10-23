<template>
  <div class="audioTool">
    <audio :src="src"></audio>
    <div class="audioKit">
      <img
        class="control"
        :src="require(`./images/${status ? 'pause' : 'play'}.png`)"
        @click="changeStatus"
      />
      <span class="duration">0:00/0:00</span>
      <div class="bar">
        <span class="inner-bar" :style="{ width: progress + '%' }"></span>
      </div>

      <img class="sound" src="./images/sound.png" />
    </div>
    <div class="soundKit">
      <div class="soundBar">
        <span class="soundSpot"></span>
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
    };
  },
  props: ["src"],
  mounted(){},
  methods: {
    // 播放状态
    changeStatus() {
      this.status = !this.status;
    },




  },
};
</script>

<style lang="less" scoped>
.audioTool {
  position: relative;
  width: 30vh;

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
      height: 0.6vh;
      border-radius: 0.6vh;
      background-color: #040d33;

      .inner-bar {
        display: block;
        height: 100%;
        border-radius: 0.6vh;
        background-color: #14c0ff;
      }
    }
  }

  .soundKit {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    top: -10.3vh;
    right: 1.9vh;

    width: 2.5vh;
    height: 10vh;
    border-radius: 2.5vh;
    border: 0.25vh solid #3fd0b9;
    background: radial-gradient(circle, #2769bb 0%, #040d33 100%);

    opacity: 0;

    .soundBar {
      width: 100%;
      height: 70%;
      // background-color: #040d33;
      display: flex;
      justify-content: center;

      &::after {
        content: "";
        position: absolute;
        width: 0.5vh;
        height: 70%;
        background-color: #040d33;
        border-radius: 0.5vh;
      }

      .soundSpot {
        display: block;
        width: 0.9vh;
        height: 0.9vh;
        border-radius: 50%;
        background-color: #14c0ff;
        cursor: pointer;
        z-index: 2;
      }
    }
  }
}
</style>