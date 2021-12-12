<template>
  <section style="background: url('/images/map/worldmap_small.png') no-repeat; background-size: cover; min-height: 100vh"
           class="flex p-4 md:p-16 lg:px-32">
    <div style="background: #1c1c1c; z-index: 9999; overflow-y: auto;" class="screen rounded-2xl w-full">
      <section id="section-i-1" class="border-b-4 border-bbrown"
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

        <div class="flex flex-wrap mt-8">
          <video class="m-auto" width="auto" height="auto" controls>
            <source src="/videos/ALPHA.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
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