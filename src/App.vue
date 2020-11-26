<template>
  <div id="app">
    <m-header></m-header>
    <loading v-show="isLoading"></loading>
    <div id="content" class="content">
      <router-view />
    </div>
    <div class="rightScreen-wrapper" v-if="showRightScreen && currentPage=='sourcelayer'">
      <div class="player-wrapper">
        <video class="video" v-show="showType=='video'" :src="showSrc" controls="controls" autoplay muted></video>
        <iframe class="iframe" v-show="showType=='qj'" :src="showSrc"></iframe>
        <div v-show="showType=='jk'" id="player" class="frequency-pic type1" />
        <!-- <video-player v-show="showType=='jk'" class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions" controls></video-player> -->
      </div>
    </div>
    <div class="rightScreen-wrapper" v-if="showRightScreen && currentPage=='compare'">
      <RightChart />
      <div class="player-wrapper compare" v-show="showPlayer">
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
import RightChart from "components/compare/rightChart/rightChart";
import { getUserInfo } from "./api/public/public";
import { mapGetters, mapActions, mapState } from "vuex";

const Aliplayer = window.Aliplayer;
export default {
  name: "App",
  components: {
    MHeader,
    Loading,
    RightChart
  },
  data() {
    return {
      showRightScreen: false,
      showType: 'video',
      // showSrc: 'https://720yun.com/t/08vkOm1hrry?scene_id=57144125'
      showSrc: 'static/video/温瑞塘河.mp4',
      // videoSrc: 'static/video/温瑞塘河/温瑞塘河.mp4',
      // qjSrc: ''
      video: undefined,
      // playerOptions: {  // vue-video-player方式
      //   // videojs and plugin options
      //   autoplay: true,
      //   fluid: true,
      //   aspectRatio: '16:9',
      //   sources: [{
      //     withCredentials: false,
      //     type: "application/x-mpegURL",
      //     src: ""
      //   }],
      //   controlBar: {
      //     timeDivider: false,
      //     durationDisplay: false,
      //   },
      //   flash: { hls: { withCredentials: false }},
      //   html5: { hls: { withCredentials: false }},
      // }
      currentPage: '',
      showPlayer: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    ...mapState({
      isLoading: "isLoading",
    }),
    // player() {
    //   return this.$refs.videoPlayer.player
    // }
  },
  watch: {
    '$route' (to) {
      this.showPlayer = false
      this.currentPage = to.name
      this.getKuanGao()
    }
  },
  created() {
    window.showLarge = false;
  },
  mounted() {
    this.eventRegsiter()
  },
  methods: {
    getKuanGao() {
      //4320*1280
      let screenWidth = document.body.clientWidth
      let screeHeight = document.body.clientHeight
      console.log('screenWidth!!!!', screenWidth);
      if(screenWidth>4000 && screeHeight>1000){
        window.showLarge = true
      }else {
        window.showLarge = false
      }
      this.initScreen()
    },
    initScreen() {
      if (window.showLarge) {
        if (this.currentPage == 'sourcelayer' || this.currentPage == 'compare') {
          this.showRightScreen = true
          document.getElementById('header').style.width = '55%'
          document.getElementById('content').style.width = '55%'
          // document.getElementById('content').style.display = 'none'
        } else {
          document.getElementById('header').style.width = '100%'
          document.getElementById('content').style.width = '100%'
        }
      } else {
        document.getElementById('header').style.width = '100%'
        document.getElementById('content').style.width = '100%'
      }
    },
    initRtmp() {  // aliplayer方式
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
          document.getElementById('header').style.width = '55%'
          document.getElementById('content').style.width = '55%'
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
        this.showPlayer = true
        this.showType = type
        this.showSrc = value
        if (type == 'jk') {
          this.initRtmp()
          // this.playerOptions.sources[0].src = this.showSrc
          // console.log('fuckplayer', this.player)
          // this.player.play()
        }
      })
      this.$bus.$off("close-rightPlayer");
      this.$bus.$on("close-rightPlayer", () => {
        this.showPlayer = false
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
.cesium-viewer-bottom,
.cesium-viewer-navigationContainer {
    display: none;
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
  z-index: 1;
  position: absolute;
  top: 5vh;
  bottom: 0;
  left: 55%;
  width: 45%;
  padding: 1%;
  background-color: #040D33;
  color: #fff;
  .player-wrapper {
    width: 100%;
    height: 100%;
    // display: flex;
    // align-items: center;
    &.compare {
      position: absolute;
      top: 2%;
      left: 2%;
      width: 96%;
      height: 96%;
    }
    .video, .iframe {
      width: 100%;
      height: 100%;
      border: 1px solid #165FEA;
    }
    // .iframe {
    //   height: 100%;
    // }
  }
}
</style>
