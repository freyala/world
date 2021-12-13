<template>
  <div class="team-slot relative">
    <div v-if="empty">
      <img src="/images/LOADING.png" alt="Mint a Frey" />
    </div>
    <div v-else>
      <img :src="frey" alt="Mint a Frey" />
      <request-button
        class="
          absolute
          w-4/5
          bottom-0
          left-1/2
          transform
          -translate-x-1/2 -translate-y-1
        "
        :action="requestLeave"
      >
        Leave
      </request-button>
    </div>
  </div>
</template>

<script>
import RequestButton from "../RequestButton.vue";
export default {
  components: { RequestButton },
  props: {
    id: {
      type: Number,
      default: -1,
    },
  },
  methods: {
    requestLeave: async function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.$emit("leave");
          resolve()
        }, 2000);
      });
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