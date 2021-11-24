<template>
  <section style="background: url('/images/map/worldmap.png') no-repeat; background-size: cover; min-height: 100vh"
           class="flex p-4 md:p-16 lg:px-32">
    <div style="background: #1c1c1c; z-index: 9999; overflow-y: auto;" class="screen rounded-2xl w-full">
      <section id="section-i-1" class="border-b-4 border-bbrown"
               style="background: url('/images/SVG/homepage-bg-top.svg') no-repeat top right">
        <div class="container mx-auto text-center pt-16 md:pt-24 pb-16 md:pb-20">
          <h1 class="text-2xl md:text-5xl text-primary-alt font-semibold">
            Beacon of Light
          </h1>
        </div>
      </section>

      <div class="flex flex-wrap p-4 md:p-8 relative">
        <div class="w-full md:w-1/4 mb-12">
          <div class="flex flex-wrap w-full mx-auto">
            <router-link class="w-full mx-auto mb-2" :to="{ name: 'world-map' }">
              <button class="mx-auto xya-btn">
                <i class="fas fa-long-arrow-alt-left"></i> Back to world
              </button>
            </router-link>
          </div>
        </div>


        <div class="w-full md:w-3/4 md:pl-12">
         <p class="text-center text-2xl md:text-4xl py-24">
           Coming soon...
         </p>

         <p class="md:text-lg pb-24">
           Seeing the limitless possibilities XYA had to offer, Regent Carroway sought out to harness all the magical power
           from the world’s core. He ordered a beacon to be constructed, which siphoned the world’s magic and shot up a
           blinding light to the sky, forever making the Freyala kingdom’s presence known. The regent proudly showed this
           beacon to Zarius, the village elder and his dear friend. Zarius was shocked to see these elaborate schemes that
           Carroway had been planning. The village elder turned his back away, determined to inform the public of his
           findings, and how Carroway was attempting to seize ultimate power.

           The regent shot Zarius a cold stare, then grasped tightly onto the village elder and propelled him towards the
           unstable beacon core before ultimately letting go. Carroway had parted ways with his dear friend. Yet, in front
           of him was the future. And this was all that mattered.
         </p>
       </div>
      </div>
    </div>
  </section>
</template>

<script>
import wallet from "../plugins/wallet"

export default {
  name: 'Delegating',
  mixins: [wallet]
}
</script>