<template>
  <div class="target-wrapper">
    <ul class="content">
      <li class="item">
        <img class="icon" src="../../../common/images/item1.png" />
        <div class="right">
          <div class="title">
            项目总数<span class="small">/2020年</span>
          </div>
          <div class="info">
            <div class="number">{{WzAllData.outpatientCount}}<span class="tiny">(个)</span></div>
            <div class="desc"> 
              <span class="small">同比去年增加投资</span>
              <span class="amount">-34.223万元</span>
            </div>
          </div>
        </div>
      </li>
      <li class="item">
        <img class="icon" src="../../../common/images/item2.png" />
        <div class="right">
          <div class="title">
            卡点断点数<span class="small">/2020年</span>
          </div>
          <div class="info">
            <div class="number">{{WzAllData.designatedHospitals}}<span class="tiny">(个)</span></div>
            <div class="desc">
              <span class="small">同比去年增加数量</span>
              <span class="amount">-214个</span>
            </div>
          </div>
        </div>
      </li>
      <li class="item">
        <img class="icon" src="../../../common/images/item3.png" />
        <div class="right">
          <div class="title">
            资源数量<span class="small">/2020年</span>
          </div>
          <div class="info">
            <div class="number">{{WzAllData.medicalInsuranceInstitution}}<span class="tiny">(个)</span></div>
            <div class="desc">
              <span class="small">同比去年增加数量</span>
              <span class="amount">+142个</span>
            </div>
          </div>
        </div>
      </li>
      <li class="item">
        <img class="icon" src="../../../common/images/item4.png" />
        <div class="right">
          <div class="title">
            未来规划<span class="small">/2020年</span>
          </div>
          <div class="info">
            <div class="number">{{WzAllData.medicalInsurancePayment}}<span class="tiny">(个)</span></div>
            <div class="desc">
              <span class="small">同比去年增加数量</span>
              <span class="amount">+623万元</span>
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
    await this.fetchWzAllData();
  },
  methods: {
    ...mapActions("map", ["SetWzAllData"]),
    /**
     * 概览数据
     */
    async fetchWzAllData() {
      await this.SetWzAllData();
    },
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
      margin-top: 2vh;
      .icon {
        width: 0.52rem;
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
          // margin-bottom: 3vh;
          // padding-left: 15px;
        }
        .title::before {
          content: "";
          position: absolute;
          bottom: 0;
          // left: 5px;
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
            color: #fff;
            font-size: 27px;
            font-family: DIN;
            font-weight: bold;
          }
          .desc {
            display: flex;
            flex-direction: column;
            margin-left: 30px;
            .amount {
              font-family: DIN;
              font-size: 12px;
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
