<template>
  <div class="info-screen rounded-xl">
      <slot name='content'></slot>
  </div>
</template>

<script>
export default {
  name: "SlotScreen",
  data() {
    return {
      gameLoop: null,
      reels: [],
    };
  },
  mounted() {},
  methods: {},
  computed: {
  },
};
</script>

<style scoped>
.info-screen {
  cursor: pointer;
  position: relative;
  background-color: var(--var-slots-dark-bg);
  color: white;
  text-shadow: 2px 2px --var-soft-shadow-color;
  height: 100%;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 12px 12px var(--var-shadow-color);
  text-shadow: 2px 2px 10px var(--var-hilight-color);
  transform: rotate3d(1, 0, 0, 41deg);
}

.info-screen p {
  font-size: 16px;
}

.info-screen span{
    font-size: 18px;
    color: var(--var-hilight-strong);
}

.info-screen::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: var(--var-border-radius);
  padding: 1px;
  background: linear-gradient(
    0deg,
    var(--var-hilight-strong),
    var(--var-hilight-color),
    var(--var-soft-shadow-color)
  );
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
}

.info-screen.glow-red{
    animation: screen-glow-red 0.6s ease-in-out infinite;
}

.info-screen.glow-green{
    animation: screen-glow-green 0.6s ease-in-out infinite;
}

@keyframes screen-glow-green {
  0% {
      box-shadow: inset 0 0px 0px var(--var-hilight-color);
  }
  50% {
      box-shadow: inset 0 0px 64px var(--var-hilight-color);
  }
}

@keyframes screen-glow-red {
  0% {
      box-shadow: inset 0 0px 0px rgb(212, 69, 69, 0.25);
  }
  50% {
      box-shadow: inset 0 0px 64px rgb(212, 69, 69, 0.25);
  }
}
</style>