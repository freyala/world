<template>
  <section style="background: url('/images/map/worldmap_small.png') no-repeat; background-size: cover; min-height: 100vh"
           class="flex p-4 md:p-16 lg:px-32">
    <div style="background: #1c1c1c; z-index: 9999; overflow-y: auto;" class="screen rounded-2xl w-full">
      <section id="section-i-1" class="border-b-4 border-bbrown"
               style="background: url('/images/SVG/homepage-bg-top.svg') no-repeat top right">
        <div class="container mx-auto text-center pt-16 md:pt-24 pb-16 md:pb-20">
          <h1 class="text-2xl md:text-5xl text-primary-alt font-semibold">
            The Luderion Alleyway
          </h1>
        </div>
      </section>
      <div class="p-4 md:p-8 relative">
        <div class="absolute top-0 left-0 p-4 md:p-8">
          <router-link :to="{ name: 'world-map' }">
            <i class="fas fa-long-arrow-alt-left"></i> Back
          </router-link>
        </div>
        <br>

        <div class="flex">
          <div>

          </div>
          <div class="w-full md:w-4/5 lg:w-3/5 mx-auto">
          <h1 class='text-4xl w-full text-center'>Down for maintenance</h1>
            <p class="text-xl px-12 w-full text-center mt-16 opacity-75 pb-6">
              The casino is temporarily unavailable. Please check back very soon.
            </p>
            <p class='text-xl px-12 w-full text-center mt-2 pb-24'>
              Sorry for the incovenience!
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
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