<template>
  <div class="hud-container">
    <img :src="src" alt="">
    <div class="load-text"><span>加</span><span>载</span><span>中</span>...</div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data() {
    return {
      src: require('../../common/images/loading.gif')
    }
  }
}
</script>

<style scoped>
img{
  width: 300px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.load-text{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #00b7ff;}
.load-text span{
  font-size: 0.18rem;
  font-family: "Microsoft Yahei",sans-serif;
  display: inline-block;
  animation:flip 2.6s infinite linear;
  transform-origin:0 70%;
  letter-spacing: 0.1rem;
  font-weight: 600;
  transform-style:preserve-3d;
  -webkit-transform-style:preserve-3d;
  }
@keyframes flip{
  35%{
    transform: rotateX(360deg);
  }
  100%{
    transform: rotatex(360deg);
  }
}
.load-text>span:nth-child(2){
  animation-delay: 0.3s;
}

.load-text>span:nth-child(3){
  animation-delay: 0.6s;
}
.hud-container{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    background: rgba(1,30,51,0.5);
    width: 100%;
    height: 100%;
}
#hud {
  height: 100%;
  max-height: 350px;
  max-width: 350px;
  z-index: 1;
  left: 50%;
  position: fixed;
  top: 50%;
  width: 100%;
  -webkit-transition: all 1s ease-in-out;
  -sand-transition: all 1s ease-in-out;
  -moz-transition: all 1s ease-in-out;
  -ms-transition: all 1s ease-in-out;
  -o-transition: all 1s ease-in-out;
  transition: all 1s ease-in-out;
  -webkit-transform: translate(-50%, -50%);
  -sand-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

#hud.active {
  -webkit-transform: translate(-50%, -50%);
  -sand-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

#hud.loading {
  -webkit-transition: all 0.5s ease-in-out;
  -sand-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-transform: translate(-50%, -50%) scale(0.5);
  -sand-transform: translate(-50%, -50%) scale(0.5);
  -moz-transform: translate(-50%, -50%) scale(0.5);
  -ms-transform: translate(-50%, -50%) scale(0.5);
  -o-transform: translate(-50%, -50%) scale(0.5);
  transform: translate(-50%, -50%) scale(0.5);
}

#hud.loading svg {
  -webkit-transform-origin: 50% 50%;
  -sand-transform-origin: 50% 50%;
  -moz-transform-origin: 50% 50%;
  -ms-transform-origin: 50% 50%;
  -o-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
  -webkit-animation: hud_spin_counter_clockwise 3s infinite linear;
  -sand-animation: hud_spin_counter_clockwise 3s infinite linear;
  -moz-animation: hud_spin_counter_clockwise 3s infinite linear;
  -ms-animation: hud_spin_counter_clockwise 3s infinite linear;
  -o-animation: hud_spin_counter_clockwise 3s infinite linear;
  animation: hud_spin_counter_clockwise 3s infinite linear;
}

#hud.loading svg .hatching {
  opacity: 0;
  -webkit-animation: none;
  -sand-animation: none;
  -moz-animation: none;
  -ms-animation: none;
  -o-animation: none;
  animation: none;
}

#hud.loading svg .outer-ring {
  -webkit-animation: none;
  -sand-animation: none;
  -moz-animation: none;
  -ms-animation: none;
  -o-animation: none;
  animation: none;
}

#hud.loading svg .inner-ring,
#hud.loading svg .trace {
  stroke-width: 6 !important;
}

#hud.loading svg .inner-ring {
  -webkit-animation: hud_spin_clockwise 1s infinite linear;
  -sand-animation: hud_spin_clockwise 1s infinite linear;
  -moz-animation: hud_spin_clockwise 1s infinite linear;
  -ms-animation: hud_spin_clockwise 1s infinite linear;
  -o-animation: hud_spin_clockwise 1s infinite linear;
  animation: hud_spin_clockwise 1s infinite linear;
}

#hud.exploded {
  opacity: 0;
  -webkit-transition: all 0.5s ease-in-out;
  -sand-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-transform: translate(-50%, -50%) scale(2.5);
  -sand-transform: translate(-50%, -50%) scale(2.5);
  -moz-transform: translate(-50%, -50%) scale(2.5);
  -ms-transform: translate(-50%, -50%) scale(2.5);
  -o-transform: translate(-50%, -50%) scale(2.5);
  transform: translate(-50%, -50%) scale(2.5);
}

#hud.exploded svg {
  -webkit-transform-origin: 50% 50%;
  -sand-transform-origin: 50% 50%;
  -moz-transform-origin: 50% 50%;
  -ms-transform-origin: 50% 50%;
  -o-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
}

#hud.hidden:before {
  opacity: 0;
}

#hud.hidden svg .hatching,
#hud.hidden svg .glow-img,
#hud.hidden svg .glow-img-inner,
#hud.hidden svg .outer-ring-blue,
#hud.hidden svg .outer-ring-red,
#hud.hidden svg .inner-ring {
  -webkit-animation: none;
  -sand-animation: none;
  -moz-animation: none;
  -ms-animation: none;
  -o-animation: none;
  animation: none;
}

#hud:before {
  content: " ";
  top: 50%;
  left: 50%;
  height: 1px;
  position: absolute;
  width: 1px;
  -webkit-transition: all 0.5s ease-in-out;
  -sand-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-box-shadow: 0 0 1000px 200px rgba(70, 131, 176, 0.3);
  -sand-box-shadow: 0 0 1000px 200px rgba(70, 131, 176, 0.3);
  -moz-box-shadow: 0 0 1000px 200px rgba(70, 131, 176, 0.3);
  -ms-box-shadow: 0 0 1000px 200px rgba(70, 131, 176, 0.3);
  -o-box-shadow: 0 0 1000px 200px rgba(70, 131, 176, 0.3);
  box-shadow: 0 0 1000px 200px rgba(70, 131, 176, 0.3);
}

#hud svg {
  opacity: 1;
  overflow: visible;
  -webkit-transform-origin: 50% 50%;
  -sand-transform-origin: 50% 50%;
  -moz-transform-origin: 50% 50%;
  -ms-transform-origin: 50% 50%;
  -o-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
  -webkit-transition: all 0.5s ease-in-out;
  -sand-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
}

#hud svg .hatching {
  opacity: 0.4;
  fill: #fffff9;
  enable-background: new;
  -webkit-transform-origin: 50% 50%;
  -sand-transform-origin: 50% 50%;
  -moz-transform-origin: 50% 50%;
  -ms-transform-origin: 50% 50%;
  -o-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
  -webkit-transform: translate(1px, 0);
  -sand-transform: translate(1px, 0);
  -moz-transform: translate(1px, 0);
  -ms-transform: translate(1px, 0);
  -o-transform: translate(1px, 0);
  transform: translate(1px, 0);
  -webkit-animation: hud_pulsate 2s infinite ease-in-out;
  -sand-animation: hud_pulsate 2s infinite ease-in-out;
  -moz-animation: hud_pulsate 2s infinite ease-in-out;
  -ms-animation: hud_pulsate 2s infinite ease-in-out;
  -o-animation: hud_pulsate 2s infinite ease-in-out;
  animation: hud_pulsate 2s infinite ease-in-out;
}

#hud svg .glow-img {
  -webkit-transform-origin: 50% 50%;
  -sand-transform-origin: 50% 50%;
  -moz-transform-origin: 50% 50%;
  -ms-transform-origin: 50% 50%;
  -o-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
  -webkit-transform: scale(1.07);
  -sand-transform: scale(1.07);
  -moz-transform: scale(1.07);
  -ms-transform: scale(1.07);
  -o-transform: scale(1.07);
  transform: scale(1.07);
}

#hud svg .glow-img-inner {
  -webkit-transform: scale(0.94);
  -sand-transform: scale(0.94);
  -moz-transform: scale(0.94);
  -ms-transform: scale(0.94);
  -o-transform: scale(0.94);
  transform: scale(0.94);
}

#hud svg .outer-ring-blue {
  -webkit-transform-origin: 50% 50%;
  -sand-transform-origin: 50% 50%;
  -moz-transform-origin: 50% 50%;
  -ms-transform-origin: 50% 50%;
  -o-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
  -webkit-transform: translate(1px, 0);
  -sand-transform: translate(1px, 0);
  -moz-transform: translate(1px, 0);
  -ms-transform: translate(1px, 0);
  -o-transform: translate(1px, 0);
  transform: translate(1px, 0);
  -webkit-animation: hud_spin_clockwise 20s infinite linear;
  -sand-animation: hud_spin_clockwise 20s infinite linear;
  -moz-animation: hud_spin_clockwise 20s infinite linear;
  -ms-animation: hud_spin_clockwise 20s infinite linear;
  -o-animation: hud_spin_clockwise 20s infinite linear;
  animation: hud_spin_clockwise 20s infinite linear;
}

#hud svg .outer-ring-blue .trace {
  opacity: 0.5;
  fill: none;
  stroke: #ffffff;
  stroke-width: 1.5;
  enable-background: new;
}

#hud svg .outer-ring-blue .glow {
  fill: none;
  stroke: #11a6fd;
  stroke-width: 9.5;
  -webkit-animation: hud_fade 2s infinite linear;
  -sand-animation: hud_fade 2s infinite linear;
  -moz-animation: hud_fade 2s infinite linear;
  -ms-animation: hud_fade 2s infinite linear;
  -o-animation: hud_fade 2s infinite linear;
  animation: hud_fade 2s infinite linear;
}

#hud svg .outer-ring-red {
  -webkit-transform-origin: 50% 50%;
  -sand-transform-origin: 50% 50%;
  -moz-transform-origin: 50% 50%;
  -ms-transform-origin: 50% 50%;
  -o-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
  -webkit-transform: translate(1px, 0);
  -sand-transform: translate(1px, 0);
  -moz-transform: translate(1px, 0);
  -ms-transform: translate(1px, 0);
  -o-transform: translate(1px, 0);
  transform: translate(1px, 0);
  -webkit-animation: hud_spin_counter_clockwise 10s infinite linear;
  -sand-animation: hud_spin_counter_clockwise 10s infinite linear;
  -moz-animation: hud_spin_counter_clockwise 10s infinite linear;
  -ms-animation: hud_spin_counter_clockwise 10s infinite linear;
  -o-animation: hud_spin_counter_clockwise 10s infinite linear;
  animation: hud_spin_counter_clockwise 10s infinite linear;
  -webkit-animation-delay: -1s;
  -sand-animation-delay: -1s;
  -moz-animation-delay: -1s;
  -ms-animation-delay: -1s;
  -o-animation-delay: -1s;
  animation-delay: -1s;
}

#hud svg .outer-ring-red .trace {
  opacity: 0.5;
  fill: none;
  stroke: #ffffff;
  stroke-width: 1.5;
  enable-background: new;
}

#hud svg .outer-ring-red .glow {
  fill: none;
  stroke: #e23528;
  stroke-width: 9.5;
  -webkit-transform: translate(1px, 0);
  -sand-transform: translate(1px, 0);
  -moz-transform: translate(1px, 0);
  -ms-transform: translate(1px, 0);
  -o-transform: translate(1px, 0);
  transform: translate(1px, 0);
  -webkit-animation: hud_flicker 2s infinite linear;
  -sand-animation: hud_flicker 2s infinite linear;
  -moz-animation: hud_flicker 2s infinite linear;
  -ms-animation: hud_flicker 2s infinite linear;
  -o-animation: hud_flicker 2s infinite linear;
  animation: hud_flicker 2s infinite linear;
  -webkit-animation-delay: -1s;
  -sand-animation-delay: -1s;
  -moz-animation-delay: -1s;
  -ms-animation-delay: -1s;
  -o-animation-delay: -1s;
  animation-delay: -1s;
}

#hud svg .inner-ring {
  opacity: 0.5;
  fill: none;
  stroke: #fff;
  enable-background: new;
  -webkit-transform-origin: 50% 50%;
  -sand-transform-origin: 50% 50%;
  -moz-transform-origin: 50% 50%;
  -ms-transform-origin: 50% 50%;
  -o-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
  -webkit-transform: translate(1px, 0);
  -sand-transform: translate(1px, 0);
  -moz-transform: translate(1px, 0);
  -ms-transform: translate(1px, 0);
  -o-transform: translate(1px, 0);
  transform: translate(1px, 0);
  -webkit-animation: hud_wind_release 4s infinite ease-out;
  -sand-animation: hud_wind_release 4s infinite ease-out;
  -moz-animation: hud_wind_release 4s infinite ease-out;
  -ms-animation: hud_wind_release 4s infinite ease-out;
  -o-animation: hud_wind_release 4s infinite ease-out;
  animation: hud_wind_release 4s infinite ease-out;
}

#hud.disabled,
#hud.hidden {
  display: block;
  z-index: -1;
}

#hud.disabled svg,
#hud.hidden svg {
  opacity: 0;
  -webkit-transform: scale(0) rotate(-180deg);
  -sand-transform: scale(0) rotate(-180deg);
  -moz-transform: scale(0) rotate(-180deg);
  -ms-transform: scale(0) rotate(-180deg);
  -o-transform: scale(0) rotate(-180deg);
  transform: scale(0) rotate(-180deg);
}

#hud.spin-in svg {
  opacity: 0;
  -webkit-transform: scale(0) rotate(-180deg);
  -sand-transform: scale(0) rotate(-180deg);
  -moz-transform: scale(0) rotate(-180deg);
  -ms-transform: scale(0) rotate(-180deg);
  -o-transform: scale(0) rotate(-180deg);
  transform: scale(0) rotate(-180deg);
}

#hud.spin-out svg {
  opacity: 0;
  -webkit-transform: scale(3) rotate(-180deg);
  -sand-transform: scale(3) rotate(-180deg);
  -moz-transform: scale(3) rotate(-180deg);
  -ms-transform: scale(3) rotate(-180deg);
  -o-transform: scale(3) rotate(-180deg);
  transform: scale(3) rotate(-180deg);
}

.st0 {
  opacity: 0.4;
  fill: #fffff9;
  enable-background: new;
}

.st1 {
  fill: none;
}

.st2 {
  opacity: 0.5;
  fill: none;
  stroke: #ffffff;
  stroke-width: 1.5;
  enable-background: new;
}

.st3 {
  fill: none;
  stroke: #11a6fd;
  stroke-width: 9.5;
}

.st4 {
  fill: none;
  stroke: #e23528;
  stroke-width: 9.5;
}

.st5 {
  opacity: 0.5;
  fill: none;
  stroke: #ffffff;
  enable-background: new;
}

@-webkit-keyframes hud_flicker {
  10% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  90% {
    opacity: 1;
  }

  100% {
    opacity: 0.7;
  }
}

@-moz-keyframes hud_flicker {
  10% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  90% {
    opacity: 1;
  }

  100% {
    opacity: 0.7;
  }
}

@-ms-keyframes hud_flicker {
  10% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  90% {
    opacity: 1;
  }

  100% {
    opacity: 0.7;
  }
}

@keyframes hud_flicker {
  10% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  90% {
    opacity: 1;
  }

  100% {
    opacity: 0.7;
  }
}

@-webkit-keyframes hud_fade {
  50% {
    opacity: 0.5;
  }
}

@-moz-keyframes hud_fade {
  50% {
    opacity: 0.5;
  }
}

@-ms-keyframes hud_fade {
  50% {
    opacity: 0.5;
  }
}

@keyframes hud_fade {
  50% {
    opacity: 0.5;
  }
}

@-webkit-keyframes hud_pulsate {
  50% {
    -webkit-transform: scale(0.95);
    -sand-transform: scale(0.95);
    -moz-transform: scale(0.95);
    -ms-transform: scale(0.95);
    -o-transform: scale(0.95);
    transform: scale(0.95);
  }
}

@-moz-keyframes hud_pulsate {
  50% {
    -webkit-transform: scale(0.95);
    -sand-transform: scale(0.95);
    -moz-transform: scale(0.95);
    -ms-transform: scale(0.95);
    -o-transform: scale(0.95);
    transform: scale(0.95);
  }
}

@-ms-keyframes hud_pulsate {
  50% {
    -webkit-transform: scale(0.95);
    -sand-transform: scale(0.95);
    -moz-transform: scale(0.95);
    -ms-transform: scale(0.95);
    -o-transform: scale(0.95);
    transform: scale(0.95);
  }
}

@keyframes hud_pulsate {
  50% {
    -webkit-transform: scale(0.95);
    -sand-transform: scale(0.95);
    -moz-transform: scale(0.95);
    -ms-transform: scale(0.95);
    -o-transform: scale(0.95);
    transform: scale(0.95);
  }
}

@-webkit-keyframes hud_spin_clockwise {
  0% {
    -webkit-transform: rotate(0deg);
    -sand-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    bottom: 0;
    -webkit-transform: rotate(-360deg);
    -sand-transform: rotate(-360deg);
    -moz-transform: rotate(-360deg);
    -ms-transform: rotate(-360deg);
    -o-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}

@-moz-keyframes hud_spin_clockwise {
  0% {
    -webkit-transform: rotate(0deg);
    -sand-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    bottom: 0;
    -webkit-transform: rotate(-360deg);
    -sand-transform: rotate(-360deg);
    -moz-transform: rotate(-360deg);
    -ms-transform: rotate(-360deg);
    -o-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}

@-ms-keyframes hud_spin_clockwise {
  0% {
    -webkit-transform: rotate(0deg);
    -sand-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    bottom: 0;
    -webkit-transform: rotate(-360deg);
    -sand-transform: rotate(-360deg);
    -moz-transform: rotate(-360deg);
    -ms-transform: rotate(-360deg);
    -o-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}

@keyframes hud_spin_clockwise {
  0% {
    -webkit-transform: rotate(0deg);
    -sand-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    bottom: 0;
    -webkit-transform: rotate(-360deg);
    -sand-transform: rotate(-360deg);
    -moz-transform: rotate(-360deg);
    -ms-transform: rotate(-360deg);
    -o-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}

@-webkit-keyframes hud_spin_counter_clockwise {
  0% {
    -webkit-transform: rotate(0deg);
    -sand-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    bottom: 0;
    -webkit-transform: rotate(360deg);
    -sand-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-moz-keyframes hud_spin_counter_clockwise {
  0% {
    -webkit-transform: rotate(0deg);
    -sand-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    bottom: 0;
    -webkit-transform: rotate(360deg);
    -sand-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-ms-keyframes hud_spin_counter_clockwise {
  0% {
    -webkit-transform: rotate(0deg);
    -sand-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    bottom: 0;
    -webkit-transform: rotate(360deg);
    -sand-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes hud_spin_counter_clockwise {
  0% {
    -webkit-transform: rotate(0deg);
    -sand-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    bottom: 0;
    -webkit-transform: rotate(360deg);
    -sand-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-webkit-keyframes hud_wind_release {
  90% {
    -webkit-transform: scale(0.8) rotate(210deg);
    -sand-transform: scale(0.8) rotate(210deg);
    -moz-transform: scale(0.8) rotate(210deg);
    -ms-transform: scale(0.8) rotate(210deg);
    -o-transform: scale(0.8) rotate(210deg);
    transform: scale(0.8) rotate(210deg);
  }
}

@-moz-keyframes hud_wind_release {
  90% {
    -webkit-transform: scale(0.8) rotate(210deg);
    -sand-transform: scale(0.8) rotate(210deg);
    -moz-transform: scale(0.8) rotate(210deg);
    -ms-transform: scale(0.8) rotate(210deg);
    -o-transform: scale(0.8) rotate(210deg);
    transform: scale(0.8) rotate(210deg);
  }
}

@-ms-keyframes hud_wind_release {
  90% {
    -webkit-transform: scale(0.8) rotate(210deg);
    -sand-transform: scale(0.8) rotate(210deg);
    -moz-transform: scale(0.8) rotate(210deg);
    -ms-transform: scale(0.8) rotate(210deg);
    -o-transform: scale(0.8) rotate(210deg);
    transform: scale(0.8) rotate(210deg);
  }
}

@keyframes hud_wind_release {
  90% {
    -webkit-transform: scale(0.8) rotate(210deg);
    -sand-transform: scale(0.8) rotate(210deg);
    -moz-transform: scale(0.8) rotate(210deg);
    -ms-transform: scale(0.8) rotate(210deg);
    -o-transform: scale(0.8) rotate(210deg);
    transform: scale(0.8) rotate(210deg);
  }
}

.movement {
  bottom: 30px;
  position: fixed;
  left: 100px;
}

.movement li {
  display: inline-block;
}

.buttons a {
  background: #fff;
  border-radius: 3px;
  color: #000;
  font: normal 14px "Verdana", sans-serif;
  padding: 5px 8px;
  text-decoration: none;
  text-transform: uppercase;
}

.buttons a:hover {
  background: #6aa9ff;
}
</style>
