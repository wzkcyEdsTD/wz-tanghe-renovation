<template>
  <div class="target-wrapper">
    <ul class="content">
      <!-- <li class="item" :class="{selected: ~currentTarget.indexOf(item.type)}" :style="{cursor: (item.click ? 'pointer' : 'default')}"
        v-for="(item, i) in targetList" :key="i" @click="changeTarget(item)"> -->
      <li class="item" v-for="(item, i) in targetList" :key="i" >
        <div class="left">
          <img class="icon" :src="require('./images/'+item.icon+'.png')" />
        </div>
        <div class="right">
          <div class="title">
            {{item.title}}<span class="small"></span>
              <!-- /{{item.year}}年</span> -->
          </div>
          <div class="info">
            <div class="number" :style="{fontSize: item.unit ? '27px' : '20px'}">
              {{item.number}}
              <span class="tiny" v-show="item.unit">({{item.unit}})</span>
            </div>
            <!-- <div class="desc">
              <span class="text">同比去年增加投资</span>
              <div class="content">
                <span class="amount" style="color: #FC5453">-34.223万元</span>
                <i class="ratio-down"></i>
              </div>
            </div> -->
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
  // computed: {
  //   ...mapGetters("map", ["WzAllData"]),
  // },
  data() {
    return {
      targetList: [{
        title: '项目',
        type: '项目',
        year: '2020',
        number: '132',
        unit: '个',
        icon: 'item1',
        click: true
      }, {
        title: '卡点断点',
        type: '绿道断点',
        year: '2020',
        number: '37',
        unit: '个',
        icon: 'item2',
        click: true
      }, {
        title: '十二景',
        type: '十二景',
        year: '2020',
        number: '12',
        unit: '个',
        icon: 'item6',
        click: true
      }, {
        title: '县市区',
        type: '资源',
        year: '2020',
        number: '三区一市',
        unit: undefined,
        icon: 'item3',
        click: false
      }, 
      // {
      //   title: '三区一市',
      //   type: '规划',
      //   year: '2020',
      //   number: '98821',
      //   unit: '个',
      //   icon: 'item4',
      //   click: false
      // }, 
      // {
      //   title: '项目分析',
      //   type: '分析',
      //   year: '2020',
      //   number: '2882',
      //   unit: '个',
      //   icon: 'item5',
      //   click: false
      // }
      ],
      currentTarget: []
    }
  },
  async mounted() {
    // await this.fetchWzAllData();
    // this.changeTarget(this.targetList[0])
  },
  methods: {
    ...mapActions("map", ["SetWzAllData"]),
    /**
     * 概览数据
     */
    // async fetchWzAllData() {
    //   await this.SetWzAllData();
    // },
    // changeTarget(item) {
    //   if (item.click) {
    //     let index = this.currentTarget.indexOf(item.type)
    //     if (index >= 0) {
    //       this.currentTarget.splice(index, 1)
    //     } else {
    //       this.currentTarget.push(item.type)
    //     }
    //     this.$bus.$emit("cesium-targetChange", {
    //       target: item.type
    //     });
    //   }
    // }
  },
};
</script>

<style scoped lang="less">
.target-wrapper {
  position: absolute;
  top: 15vh;
  left: 2vw;
  z-index: 999;

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
        .item2 {
          width: 46px;
        }
        .item3 {
          width: 42px;
        }
        .item5 {
          width: 44px;
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
              // font-family: PingFang;
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
          // font-family: PingFang;
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
