<template>
  <button @click="clickthis" class="small normal save"></button>
  <!-- <button class="small"></button> -->
</template>

<script>
var $ = require("jquery");

export default {
  name: "Settings",
  props: [],
  methods: {
    clickthis() {
      this.$emit("clickthis");
    },
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {
    var msClickDelay = 500;
    var msSpinningTime = 2000 + msClickDelay;
    var msActive = 2000;

    $("button").click(function (ev) {
      ev.preventDefault();

      var $button = $(this);

      setTimeout(function () {
        $button.addClass("spinning-loader");
      }, msClickDelay);

      setTimeout(function () {
        $button.removeClass("spinning-loader");
        $button.addClass("active");

        $button.addClass("bubble");
        setTimeout(callback, msActive);
      }, msSpinningTime);

      function callback() {
        $button.removeClass("active");
        $button.removeClass("bubble");
      }
    });
  },
};
</script>

<style scoped lang="scss">
// Colors
/**
Author: JH
**/

.container {
  text-align: center;
  padding-top: 50px;
}
/** Default tint **/
$tint-default: #e85757;
/** Transition speed, delay **/
$transition-delay: 0.25s;
/** Speed of the spinning loader (speed = 360deg) **/
$spinning-speed: 1s;
/** Bubble iteration count, 2 looks good imo **/
$bubble-bounces: 2;

/**
Creates a new button size, named by identifier.

@param $identifier Classidentifier of the new size
@param $width Width of button 
@param $height Height of button, also used for spinner
@param $fontSize, default 14px
**/
@mixin button-size($identifier, $width, $height, $fontSize: 14px) {
  button.#{$identifier} {
    height: $height;
    width: $width;
    font-size: $fontSize;

    &.spinning-loader {
      height: $height;
      width: $height;
    }
  }
}

/**
Creates a new button theme, named by identifier.

@param $identifier Classidentifier of the new theme
@param $color New buttons color
@param $label Only used for showcase purpose for codepen
**/
@mixin button-theme($identifier, $color, $label: "Send") {
  button.#{$identifier} {
    border-color: $color;
    color: $color;
    &:hover {
      background-color: $color;
    }
    &:after {
      content: $label;
    }
    &.spinning-loader {
      border-color: rgba(0, 0, 0, 0.25);
      border-left-color: $color;
    }
    &.active {
      background: $color;
    }
  }
}

@include button-size(large, 200px, 60px, 16px);
@include button-size(normal, 150px, 50px);
@include button-size(small, 100px, 30px, 12px);

@include button-theme(primary, #57bde8, "Primary");
@include button-theme(edit, #f7bd51, "Save");
@include button-theme(save, #c1e819, "Save");

button {
  display: inline-block;
  background: transparent;
  color: $tint-default;
  padding: 0;
  border: 2px solid $tint-default;
  border-radius: 40px;
  text-transform: uppercase;
  outline: 0;
  font: {
    family: "Roboto", sans-serif;
    weight: bold;
  }
  letter-spacing: 2px;
  transition: all $transition-delay ease;
  width: 150px;
  height: 50px;
  cursor: pointer;
  &:hover {
    background-color: $tint-default;
    color: rgb(255, 255, 255);
  }
  &:active {
    letter-spacing: 1px;
  }
  &:after {
    content: "Send";
    opacity: 1;
  }
}

.active {
  color: rgb(255, 255, 255) !important;
  background: $tint-default;
  &:after {
    font-family: "FontAwesome";
    content: "\f00c" !important;
    opacity: 1;
  }
}

.bubble {
  animation: bubble $transition-delay $transition-delay ease $bubble-bounces;
}

@keyframes bubble {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(0.95, 0.95);
  }
  100% {
    transform: scale(1, 1);
  }
}

.spinning-loader {
  vertical-align: middle;
  border-radius: 50% !important;
  border: 2px solid rgba(0, 0, 0, 0.25);
  padding: 0;
  border-left-color: $tint-default;
  background: transparent;
  transform: rotate(0deg);
  color: rgb(255, 255, 255) !important;
  animation: spinning $spinning-speed $transition-delay linear infinite;
  &:after {
    content: "";
    opacity: 0;
  }
  &:hover {
    background-color: transparent !important;
  }
}

@keyframes spinning {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
