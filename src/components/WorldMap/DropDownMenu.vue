<template>

  <section class="dropDownMenuWrapper">

    <div class="iconWrapper cursor-pointer bg-detail-bg" @click="openClose">
      <div class="bar1" :class="{ 'bar1--open' : isOpen }" />
      <div class="bar2" :class="{ 'bar2--open' : isOpen }" />
      <div class="bar3" :class="{ 'bar3--open' : isOpen }" />
    </div>

    <section class="menuIconWrapper bg-detail-bg p-4 text-right" v-if="isOpen">
      <router-link :to="{ name: 'staking' }">Staking</router-link>
      <hr class="my-3">
      <router-link :to="{ name: 'plots', params: {neighbourhood: '0'} }">Plots of Land</router-link>
      <hr class="my-3">
      <router-link :to="{ name: 'barracks' }">Frey Barracks</router-link>
      <hr class="my-3">
      <router-link :to="{ name: 'pigs' }">Pigsty</router-link>
      <hr class="my-3">
      <router-link :to="{ name: 'marketplace' }">Marketplace</router-link>
      <hr class="my-3">
      <router-link :to="{ name: 'beacon' }">Beacon of Light</router-link>
      <hr class="my-3">
      <router-link :to="{ name: 'tree' }">Tree of Peek</router-link>
    </section>

  </section>

</template>

<script>
  export default {
    props: ['menu'],
    data() {
      return {
        isOpen: false
      }
    },
    methods: {
      openClose() {
        this.isOpen = !this.isOpen
      }
    }
  }
</script>

<style>
  .iconWrapper {
    width: 25px;
    height: 25px;
    position: absolute;
    right: 15px;
    top: 50px;
    transform: translate(0, -50%);
    z-index: 1;
    padding: 22px;
  }

  .menuIconWrapper {
    min-height: 50px;
    width: 92vw;
    max-width: 225px;
    position: absolute;
    top: 75px;
    right: 15px;
    z-index: 999;
  }

  .bar1 {
    width: 100%;
    max-width: 28px;
    height: 3px;
    background: #173544;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, calc(-50% - 8px));
    transition: all 0.2s ease;
  }

  .bar1--dark {
    background: #eee;
  }

  .bar1--open {
    transform: translate(-50%, -50%) rotate(45deg);
    margin-top: 0;
    background: #173544;
  }

  .bar2 {
    width: 100%;
    max-width: 28px;
    height: 3px;
    background: #173544;
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 1;
    transform: translate(-50%, -50%);
    transition: all 0.2s ease;
  }

  .bar2--dark {
    background: #eee;
  }

  .bar2--open {
    opacity: 0;
  }

  .bar3 {
    width: 100%;
    max-width: 28px;
    height: 3px;
    background: #173544;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, calc(-50% + 8px));
    transition: all 0.2s ease;
  }

  .bar3--dark {
    background: #eee;
  }

  .bar3--open {
    top: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    background: #173544;
  }
</style>