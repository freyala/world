<template>
  <div id="wrapper">
    <div v-if="windowWidth < 1020">
      <mobile></mobile>
    </div>
    <div v-else>
      <desktop></desktop>
    </div>
  </div>
</template>

<script>
import Mobile from './Mobile/Index';
import Desktop from './Desktop/Index';

export default {
  name: 'Portal',
  data() {
    return {
      windowWidth: window.innerWidth
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },

  methods: {
    onResize() {
      this.windowWidth = window.innerWidth
    }
  },
  components: {
    Mobile,
    Desktop
  }
}
</script>