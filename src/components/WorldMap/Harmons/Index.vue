<template>
  <transition name="slide">
    <div class="slide-in shadow-xl relative" v-if="openWindow === 'harmons'"
         style="background: url('/images/ui/screen-bg.png') repeat-y; width: 100%; top: 64px; min-width: 500px; background-size: contain; overflow-y: scroll;">

      <div class="flex flex-wrap pb-24">
        <div class="w-full text-center mb-4">
          <p class="text-2xl">
            Sneak peek
          </p>
        </div>

        <div class="w-full flex mb-8">
          <div class="w-1/6 mx-auto">
            <button type="button"
                    class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                    @click="$store.dispatch('setOpenWindow', '')">
              Leave
            </button>
          </div>
        </div>

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