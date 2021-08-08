<template>
  <div class="flex flex-wrap py-8">
    <div class="w-full text-center mb-4">
      <p class="text-3xl">
        Sneak peak
      </p>
    </div>

    <div class="flex w-full md:w-1/2 md:px-4">
      <img class="m-auto" src="/harmons/harmon1.gif" alt="Harmon">
    </div>
    <div class="flex w-full md:w-1/2 md:px-4">
      <img class="m-auto" src="/harmons/harmon2.gif" alt="Harmon">
    </div>

    <hr class="w-full mt-4">

    <div class="w-full md:w-1/2 md:px-4">
      <div class="small text-center">Drag me!</div>
    </div>
    <div class="w-full md:w-1/2 md:px-4">
      <div class="small text-center">Drag me!</div>
    </div>

    <div class="w-full md:w-1/2 md:px-4">
      <model-obj src="/harmons/harmon1.obj"></model-obj>
    </div>
    <div class="w-full md:w-1/2 md:px-4">
      <model-obj src="/harmons/harmon2.obj"></model-obj>
    </div>
  </div>
</template>
<script>
import { ModelObj } from 'vue-3d-model';
export default {
  components: { ModelObj }
}
</script>