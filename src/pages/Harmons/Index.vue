<template>
  <section style="background: url('/images/map/worldmap.png') no-repeat; background-size: cover; min-height: 100vh"
           class="flex p-4 md:p-16 lg:px-32">
    <div style="background: #1c1c1c; z-index: 9999; overflow-y: auto;" class="screen rounded-2xl w-full">
      <section id="section-i-1" class="border-b-4 border-primary-alt"
               style="background: url('/images/SVG/homepage-bg-top.svg') no-repeat top right">
        <div class="container mx-auto text-center pt-16 md:pt-24 pb-16 md:pb-20">
          <h1 class="text-2xl md:text-5xl text-primary-alt font-semibold">
            Sneak Peek
          </h1>
        </div>
      </section>

      <div class="p-4 md:p-8 relative">
        <div class="absolute top-0 left-0 p-4 md:p-8">
          <router-link :to="{ name: 'world-map' }">
            <i class="fas fa-long-arrow-alt-left"></i> Back
          </router-link>
        </div>

        <div class="flex flex-wrap">
          <div class="flex w-full md:w-1/2 md:px-4">
            <img class="m-auto" src="/harmons/harmon1.gif" alt="Harmon">
          </div>
          <div class="flex w-full md:w-1/2 md:px-4">
            <img class="m-auto" src="/harmons/harmon2.gif" alt="Harmon">
          </div>

          <hr class="w-full my-4">

          <div class="w-full md:w-1/2 md:px-4 mb-2">
            <div class="small text-center">Drag me!</div>
          </div>
          <div class="w-full md:w-1/2 md:px-4 mb-2">
            <div class="small text-center">Drag me!</div>
          </div>

          <div class="w-full md:w-1/2 md:px-4">
            <model-obj src="/harmons/harmon1.obj"></model-obj>
          </div>
          <div class="w-full md:w-1/2 md:px-4">
            <model-obj src="/harmons/harmon2.obj"></model-obj>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import {ModelObj} from 'vue-3d-model';
import {mapGetters} from "vuex";

export default {
  name: 'Harmons',
  components: {ModelObj},
  computed: {
    ...mapGetters([
      'openWindow'
    ])
  },
}
</script>