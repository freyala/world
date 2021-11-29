<template>
  <section
    style="
      background: url('/images/map/worldmap.png') no-repeat;
      background-size: cover;
      min-height: 100vh;
    "
    class="flex p-4 md:p-16 lg:px-32"
  >
    <div
      style="background: #1c1c1c; z-index: 9999; overflow-y: auto"
      class="screen rounded-2xl w-full mb-12"
    >
      <section
        id="section-i-1"
        class="border-b-4 border-primary-alt"
        style="
          background: url('/images/SVG/homepage-bg-top.svg') no-repeat top right;
        "
      >
        <div
          class="container mx-auto text-center pt-16 md:pt-24 pb-16 md:pb-20"
        >
          <slot name="header" />
        </div>
      </section>
      <div class="mx-12">
        <div class="w-full 2xl:w-2/3 mx-auto px-4 md:px-0">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "LightBox"
};
</script>
