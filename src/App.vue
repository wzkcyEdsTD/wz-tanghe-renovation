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
        <div v-show="showType=='jk'" id="player" class="frequency-pic type1" />
      </div>
    </div>
  </div>
</template>

<script>
import MHeader from "components/m-header/m-header";
import Loading from "components/loading/loading";
import { getUserInfo } from "./api/public/public";
import { mapGetters, mapActions, mapState } from "vuex";

const Aliplayer = window.Aliplayer;
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
      showSrc: 'static/video/温瑞塘河.mp4',
      // videoSrc: 'static/video/温瑞塘河/温瑞塘河.mp4',
      // qjSrc: ''
      screenWidth: document.body.clientWidth,
      screeHeight: document.body.clientHeight,
      video: undefined,
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
    window.showLarge = false;
    this.getKuanGao();
  },
  mounted() {
    this.initScreen()
    this.eventRegsiter()
  },
  methods: {
    getKuanGao(){
      //4320*1280
      console.log('screenWidth!!!!', this.screenWidth);
      if(this.screenWidth>4000&this.screeHeight>1000){
        window.showLarge = true
      }else {
        window.showLarge = false
      }
    },
    initScreen() {
      if (window.showLarge) {
        document.getElementById('header').style.width = '60%'
        document.getElementById('content').style.width = '60%'
        this.showRightScreen = true
      }
    },
    initRtmp() {
      console.log('initRtmp')
      this.video = undefined;
      this.video = new Aliplayer(
        {
          id: 'player',
          source: this.showSrc,
          // source: 'http://video-surveillance.ousutec.com.cn:6713/mag/hls/17190cca40ba4a7cab6d61c58bf56312/2/live.m3u8',
          width: "100%",
          height: "100%",
          autoplay: true,
          controlBarVisibility: "hover",
          useH5Prism: true,
          isLive: true,
        },
        (player) => {
          console.log("播放器创建");
          player.mute();
          player.play();
        }
      );
    },
    eventRegsiter() {
      this.$bus.$off("change-screen");
      this.$bus.$on("change-screen", ({ value }) => {
        console.log('changeScreen!!!!!!!!', value)
        if (value) {
          document.getElementById('header').style.width = '60%'
          document.getElementById('content').style.width = '60%'
          // document.getElementById('leftHide').style.display = 'none'
          // document.getElementById('rightHide').style.display = 'none'
        } else {
          document.getElementById('header').style.width = '100%'
          document.getElementById('content').style.width = '100%'
        }
        this.showRightScreen = value
      })
      this.$bus.$off("change-rightContent");
      this.$bus.$on("change-rightContent", ({ type, value }) => {
        this.showType = type
        this.showSrc = value
        if (type == 'jk') {
          this.initRtmp()
        }
      })
    }
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
  padding: 1%;
  background-color: #040D33;
  color: #fff;
  .player-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    .video, .iframe {
      width: 100%;
      height: 100%;
      border: 1px solid #165FEA;
    }
    .iframe {
      height: 100%;
    }
  }
}
</style>
