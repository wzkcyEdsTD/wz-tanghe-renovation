<template>
  <div id="app">
    <m-header></m-header>
    <loading v-show="isLoading"></loading>
    <div id="content" class="content">
      <router-view />
    </div>
    <div class="rightScreen-wrapper" v-if="showRightScreen">
      <div class="player-wrapper">
        <video class="video" :src="videoSrc" controls="controls"></video>
      </div>
    </div>
  </div>
</template>

<script>
import MHeader from "components/m-header/m-header";
import Loading from "components/loading/loading";
import { getUserInfo } from "./api/public/public";
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  name: "App",
  components: {
    MHeader,
    Loading,
  },
  data() {
    return {
      showRightScreen: false,
      showVideo: true,
      videoSrc: 'https://www.w3school.com.cn/i/movie.ogg',
      showQj: false,
      qjSrc: ''
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    ...mapState({
      isLoading: "isLoading",
    }),
  },
  watch: {
  },
  created() {
  },
  mounted() {
    this.$bus.$off("change-screen");
    this.$bus.$on("change-screen", ({ value }) => {
      console.log('gogogo')
      this.showRightScreen = value
    })
  },
  methods: {
  },
};
</script>

<style lang="less">
@import "common/css/reset";
@import "common/css/rem";
@import "common/css/flex";
@import "common/css/transition";
* {
  box-sizing: border-box;
  font-family: "Microsoft YaHei";
}
body {
  font-size: 0.16rem;
}
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
#app > .content {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  // transition: width 1s linear;
  // z-index: 9;
  > * {
    width: 100%;
    height: 100%;
  }
}
.rightScreen-wrapper {
  position: absolute;
  top: 5vh;
  bottom: 0;
  left: 60%;
  width: 40%;
  padding: 3%;
  background-color: #040D33;
  color: #fff;
  .player-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    .video {
      width: 100%;
      border: 1px solid #165FEA;
    }
  }
}
</style>
