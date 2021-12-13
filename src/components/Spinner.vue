<template>
  <div class="spinner" :style="`width: ${size}px; height: ${size}px;`">
    <div
      class="spinner-child"
      :style="`width: ${size}px; height: ${size}px; border-width:${width}px`"
    >
      Loading...
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: function () {
        return 32;
      },
    },
    width: {
      type: Number,
      default: function () {
        return 3;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
/**
Created by @lukehaas
https://projects.lukehaas.me/css-loaders/
*/
.spinner {
  position: relative;
  /**
    This is just to counteract a global css style from the casiono:
    button:hover > div{
        color: white!important;
        top: 6px;
        right: 24px;  
    }
    TODO: Remove this when resolved!
    */
  top: 0;
  right: 0;
}


.spinner-child {
  position: relative;
  top: 0; 
  left: 0;
  border-radius: 50%;
  //   font-size: 10px;
  text-indent: -9999em;
  border-top: 1em solid rgba(255, 255, 255, 0.2);
  border-right: 1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1em solid rgba(255, 255, 255, 0.2);
  border-left: 1em solid #ffffff;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
  overflow: hidden;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>