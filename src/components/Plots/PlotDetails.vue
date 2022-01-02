<template>
    <div class='w-8/10 h-full bg-dark'>
        <i class='fa fa-close' v-on:click='$emit("close")'></i>
    </div>
</template>

<script>
export default {
  name: 'Casino'
}
</script>

<style>
.new-ribbon{
  position: absolute;
  top: -16px;
  right: 16px;
  transform: rotate(45deg);
  color: #8cd1a6;
  font-size: calc(0.75rem + 0.5vw);
  width: 32px;
  height: 100%;
  transition: 0.3s;
}
button:hover > div{
  color: white!important;
  top: 6px;
  right: 24px;
  transform: rotate(0deg);
}
</style>