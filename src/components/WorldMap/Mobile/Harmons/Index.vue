<template>
  <transition name="slide">
    <div class="slide-in shadow-xl relative" v-if="openWindow === 'harmons'"
         style="background: url('/images/ui/screen-bg.png') repeat-y; width: 100%; top: 57px; background-size: contain; overflow-y: scroll; padding-left: 1rem; padding-right: 1rem">

      <div class="absolute top-0 left-0 py-4 px-6">
        <i @click="$store.dispatch('setOpenWindow', '')" class="fas fa-times cursor-pointer text-xl"></i>
      </div>

      <div class="flex relative cursor-pointer mt-6">
        <div class="text-center w-full" style="top: 80px; line-height: 0.25">
          <p class="text-2xl">Sneak peek</p>
        </div>
      </div>

      <div class="flex flex-wrap pb-24 mt-6">
        <div class="flex w-full md:w-1/2 md:px-4">
          <img class="m-auto" src="/harmons/harmon1.gif" alt="Harmon">
        </div>
        <div class="flex w-full md:w-1/2 md:px-4 mt-2">
          <img class="m-auto" src="/harmons/harmon2.gif" alt="Harmon">
        </div>
        <div class="w-full md:w-1/2 md:px-4 mt-2">
          <model-obj src="/harmons/harmon1.obj"></model-obj>
        </div>
        <div class="w-full md:w-1/2 md:px-4 mt-2">
          <model-obj src="/harmons/harmon2.obj"></model-obj>
        </div>
      </div>
    </div>
  </transition>
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