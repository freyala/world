<template>
  <div style="width: 100vw; min-height:100vh; height: 100vh; z-index: 999"
       class="flex flex-row w-full h-full relative bg-detail-bg">

    <div class='absolute flex flex-row h-16 w-full top-0 dark-panel items-center' style="z-index: 1000">
      <div class='ml-6 mt-5 mb-4 w-auto text-xl cursor-pointer absolute z-50 w-2/5 flex flex-row items-center'>
        <router-link class='flex items-center' :to="{ name: 'world-map' }">
          <i class='fa fa-arrow-left mr-2'></i>
          <span class='sm:block hidden'>Back</span>
        </router-link>
      </div>
      <div class='w-full text-center lg:text-3xl sm:text-xl text-xl font-bold absolute'>
        <p>Beacon</p>
      </div>

    </div>

    <div class="w-full flex flex-wrap mt-24">
      <div class='lg:px-8 lg:py-4 md:px-8 md:py-0 px-4 py-4 w-full h-full flex items-start justify-center'>

        <div class='w-4/5 flex justify-center flex-wrap'>
          <div class="relative">
            Coming soon...
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import wallet from "../plugins/wallet";

export default {
  name: 'Beacon',
  mixins: [wallet],
  data() {
    return {
      showSideBar: false
    }
  }
}
</script>