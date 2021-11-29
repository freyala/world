<template>
  <div class="team-slot relative">
    <div v-if="empty">
      <img src="/images/LOADING.png" alt="Mint a Frey" />
      
    </div>
    <div v-else>
      <img :src="frey" alt="Mint a Frey" />
      <button
        class="
          absolute absolute
          bottom-0
          left-1/2
          transform
          -translate-x-1/2 -translate-y-1/2
          bg-green
          text-white
        "

        @click="()=>$emit('leave')"
      >
        Leave Party
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: -1,
    },
  },
  computed: {
    empty() {
      return this.id === -1;
    },
    frey() {
      return `https://frey.freyala.com/images/${this.id}.png`;
    },
  },
};
</script>

<style>
.team-slot img {
  display: block;
  width: 100%;
  object-fit: cover;
  background-color: red;
}
</style>