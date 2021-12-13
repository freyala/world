<template>
  <button
    class="flex justify-center bg-green text-white"
    @click="performAction"
  >
    <spinner v-if="pending" />
    <slot v-else />
  </button>
</template>

<script>
import Spinner from "./Spinner.vue";
export default {
  components: { Spinner },
    props: {
      action: Function,
    },
  data() {
    return {
      pending: false,
    };
  },
  methods: {
    performAction() {
      if (!this.pending) {
        this.$data.pending = true;

        this.action()
          .then((...args) => {
            this.$emit("done", ...args);
          })
          .catch((err) => {
            //TODO: Implement proper error handling.
            console.error(err);
          })
          .finally(() => {
            this.$data.pending = false;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>