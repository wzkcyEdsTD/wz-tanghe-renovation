<template>
  <div id="app">
    <m-header></m-header>
    <loading v-show="isLoading"></loading>
    <div id="content" class="content">
      <router-view />
    </div>
    <div class="rightScreen-wrapper" v-if="showRightScreen">
      <div class="player-wrapper">
        <video class="video" v-show="showType=='video'" :src="showSrc" controls="controls" autoplay muted></video>
        <iframe class="iframe" v-show="showType=='qj'" :src="showSrc"></iframe>
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
      showType: 'video',
      // showSrc: 'https://720yun.com/t/08vkOm1hrry?scene_id=57144125'
      showSrc: 'static/video/温瑞塘河.mp4'
      // videoSrc: 'static/video/温瑞塘河/温瑞塘河.mp4',
      // qjSrc: ''
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
      this.showRightScreen = value
    })
    this.$bus.$off("change-rightContent");
    this.$bus.$on("change-rightContent", ({ type, value }) => {
      console.log('gogogo')
      this.showType = type
      this.showSrc = value
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
    .video, .iframe {
      width: 100%;
      border: 1px solid #165FEA;
    }
    .iframe {
      height: 100%;
    }
  }
}
</style>
