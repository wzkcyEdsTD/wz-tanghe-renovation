<template>
  <div class="target-wrapper">
    <ul class="content">
      <li class="item selected">
        <div class="left">
          <img class="icon" src="./images/item1.png" />
        </div>
        <div class="right">
          <div class="title">
            项目总数<span class="small">/2020年</span>
          </div>
          <div class="info">
            <div class="number">31242<span class="tiny">(个)</span></div>
            <div class="desc">
              <span class="text">同比去年增加投资</span>
              <div class="content">
                <span class="amount" style="color: #FC5453">-34.223万元</span>
                <i class="ratio-down"></i>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="item">
        <div class="left">
          <img class="icon" src="./images/item2.png" />
        </div>
        <div class="right">
          <div class="title">
            卡点断点数<span class="small">/2020年</span>
          </div>
          <div class="info">
            <div class="number">6623<span class="tiny">(个)</span></div>
            <div class="desc">
              <span class="text">同比去年增加数量</span>
              <div class="content">
                <span class="amount" style="color: #FC5453">-214个</span>
                <i class="ratio-down"></i>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="item">
        <div class="left">
          <img class="icon" src="./images/item3.png" />
        </div>
        <div class="right">
          <div class="title">
            资源数量<span class="small">/2020年</span>
          </div>
          <div class="info">
            <div class="number">99732<span class="tiny">(个)</span></div>
            <div class="desc">
              <span class="text">同比去年增加数量</span>
              <div class="content">
                <span class="amount" style="color: #2EEA16">+142个</span>
                <i class="ratio-up"></i>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="item">
        <div class="left">
          <img class="icon" src="./images/item4.png" />
        </div>
        <div class="right">
          <div class="title">
            未来规划<span class="small">/2020年</span>
          </div>
          <div class="info">
            <div class="number">98821<span class="tiny">(个)</span></div>
            <div class="desc">
              <span class="text">同比去年增加数量</span>
              <div class="content">
                <span class="amount" style="color: #2EEA16">+623万元</span>
                <i class="ratio-up"></i>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="item">
        <div class="left">
          <img class="icon" src="./images/item5.png" />
        </div>
        <div class="right">
          <div class="title">
            项目分析<span class="small">/2020年</span>
          </div>
          <div class="info">
            <div class="number">2882<span class="tiny">(个)</span></div>
            <div class="desc">
              <span class="text">同比去年增加数量</span>
              <div class="content">
                <span class="amount" style="color: #2EEA16">+623个</span>
                <i class="ratio-up"></i>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "totalTarget",
  computed: {
    ...mapGetters("map", ["WzAllData"]),
  },
  async mounted() {
    // await this.fetchWzAllData();
  },
  methods: {
    ...mapActions("map", ["SetWzAllData"]),
    /**
     * 概览数据
     */
    // async fetchWzAllData() {
    //   await this.SetWzAllData();
    // },
  },
};
</script>

<style scoped lang="less">
.target-wrapper {
  position: absolute;
  top: 15vh;
  left: 2vw;
  z-index: 200000;

  .content {
    .item {
      display: flex;
      align-items: center;
      margin-top: 3vh;
      &.selected {
        .left {
          .bg-image("./images/light-sel");
        }
        .right {
          .title::before {
            background-image: linear-gradient(90deg, #16EAEA 0%, transparent 100%);
          }
        }
      }
      .left {
        position: relative;
        width: 54px;
        height: 35px;
        .bg-image("./images/light-unsel");
        .icon {
          position: absolute;
          width: 41px;
          top: -16px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        color: #fff;
        margin-left: 14px;
        .title {
          display: block;
          height: 35px;
          line-height: 35px;
          font-family: YouSheBiaoTiHei;
          font-size: 20px;
          letter-spacing: 0px;
          color: #ffffff;
          text-shadow: 0px 2px 3px rgba(0, 0, 0, 0.64);
          position: relative;
        }
        .title::before {
          content: "";
          position: absolute;
          bottom: 0;
          width: 100px;
          height: 15px;
          z-index: -1;
          background-image: linear-gradient(90deg, #1950B9 0%, transparent 100%);
          transform: skewX(-30deg);
        }
        .info {
          margin-top: .7vh;
          display: flex;
          .number {
            width: 120px;
            color: #fff;
            font-size: 27px;
            font-family: DIN;
            font-weight: bold;
          }
          .desc {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            font-size: 12px;
            .text {
              color: #c9c9c9;
              font-family: PingFang;
            }
            .content {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .amount {
                font-family: DIN;
              }
              >i {
                position: relative;
                display: inline-block;
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
              }
              .ratio-up {
                border-bottom: 5px solid #04b72d;
              }
              .ratio-down {
                border-top: 5px solid #fc5453;
              }
            }
          }
        }
        .small {
          font-size: 11px;
          font-family: PingFang;
          color: #fff;
          opacity: 0.81;
        }
        .tiny {
          display: inline-block;
          font-size: 12px;
          font-family: DIN;
          font-weight: bold;
          color: #fff;
          -webkit-transform: scale(0.66);
          opacity: 0.81;
        }
      }
    }
  }
}
</style>
