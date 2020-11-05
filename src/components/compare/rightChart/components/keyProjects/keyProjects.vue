<template>
  <div class="keyProjects">
    <div class="title-wrapper">
      <span class="pre"></span>
      <span class="title">重点项目统计</span>
    </div>
    <div class="allFlex">
      <div class="childFlex">
        <img src="./img/select.png" class="icon">
        <div class="allText">
          <p :style="{color:'#F2F468'}" class="title">总体项目</p>
          <div class="otherFlex">
            <span class="text" >176</span>
            <span class="textSmall">/个</span>
          </div>
          <div class="otherFlex">
            <span class="text">2100</span>
            <span class="textSmall">万元</span>
          </div>
        </div>
      </div>
      <div class="childFlex">
        <img src="./img/unselect.png" class="icon">
        <div class="allText">
          <p class="title">鹿城区政府</p>
          <div class="otherFlex">
            <span class="text" >50</span>
            <span class="textSmall">/个</span>
          </div>
          <div class="otherFlex">
            <span class="text">300</span>
            <span class="textSmall">万元</span>
          </div>
        </div>
      </div>
    </div>
    <div class="allFlex">
      <div class="childFlex">
        <img src="./img/unselect.png" class="icon">
        <div class="allText">
          <p class="title">瓯海区政府</p>
          <div class="otherFlex">
            <span class="text" >50</span>
            <span class="textSmall">/个</span>
          </div>
          <div class="otherFlex">
            <span class="text">300</span>
            <span class="textSmall">万元</span>
          </div>
        </div>
      </div>
      <div class="childFlex">
        <img src="./img/unselect.png" class="icon">
        <div class="allText">
          <p class="title">龙湾区政府</p>
          <div class="otherFlex">
            <span class="text" >10</span>
            <span class="textSmall">/个</span>
          </div>
          <div class="otherFlex">
            <span class="text">300</span>
            <span class="textSmall">万元</span>
          </div>
        </div>
      </div>
    </div>
    <div class="allFlex">
      <div class="childFlex">
        <img src="./img/unselect.png" class="icon">
        <div class="allText">
          <p class="title">瑞安市政府</p>
          <div class="otherFlex">
            <span class="text" >12</span>
            <span class="textSmall">/个</span>
          </div>
          <div class="otherFlex">
            <span class="text">300</span>
            <span class="textSmall">万元</span>
          </div>
        </div>
      </div>
      <div class="childFlex">
        <img src="./img/unselect.png" class="icon">
        <div class="allText">
          <p class="title">浙南产业区</p>
          <div class="otherFlex">
            <span class="text" >41</span>
            <span class="textSmall">/个</span>
          </div>
          <div class="otherFlex">
            <span class="text">300</span>
            <span class="textSmall">万元</span>
          </div>
        </div>
      </div>
    </div>
    <div class="allFlex">
      <div class="childFlex">
        <img src="./img/unselect.png" class="icon">
        <div class="allText">
          <p class="title">市现代集团</p>
          <div class="otherFlex">
            <span class="text" >12</span>
            <span class="textSmall">/个</span>
          </div>
          <div class="otherFlex">
            <span class="text">300</span>
            <span class="textSmall">万元</span>
          </div>
        </div>
      </div>
      <div class="childFlex">
        <img src="./img/unselect.png" class="icon">
        <div class="allText">
          <p class="title">市城发集团</p>
          <div class="otherFlex">
            <span class="text" >41</span>
            <span class="textSmall">/个</span>
          </div>
          <div class="otherFlex">
            <span class="text">300</span>
            <span class="textSmall">万元</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "keyProjects"
    }
</script>

<style lang="less" scoped>
  @import url("./keyProjects.less");
</style>
