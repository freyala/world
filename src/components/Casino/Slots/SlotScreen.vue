<template>
  <div id='screen-wrapper' class="info-screen rounded-xl terminal-window">
    <div v-bind:class="{
            'glow-red': glowRed,
            'glow-green': glowGreen,
          }" class='scanlines w-full h-full z-50'></div>
    <div class='crt-overlay w-full h-full z-25'></div>
    <slot name='content'></slot>
  </div>
</template>

<script>
  export default {
    name: "SlotScreen",
    props: {
      glowRed: false,
      glowGreen: false
    },
    data() {
      return {
        gameLoop: null,
        reels: [],
      };
    },
    mounted() {},
    methods: {},
    computed: {},
  };
</script>

<style lang="scss">
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
    font-size: calc(0.35vw + 0.6rem);
  }

  .info-screen span {
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
    background: linear-gradient(0deg,
        var(--var-hilight-strong),
        var(--var-hilight-color),
        var(--var-soft-shadow-color));
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
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
      box-shadow: inset 0 0px 0px rgba(212, 69, 69, 0.25);
    }

    50% {
      box-shadow: inset 0 0px 64px rgba(212, 69, 69, 0.25);
    }
  }

  #screen-wrapper {
    text-align: center;
  }

  @mixin glitch-shadow {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .glitch {
    position: relative;
    color: #fff;
    font-size: 12px;
    letter-spacing: 1px;

    &::after {
      @include glitch-shadow;
      opacity: 0.5;
      left: -2px;
      text-shadow: -2px 0 var(--var-hilight-color), 2px 2px var(--var-hilight-color);
      clip: rect(44px, 450px, 56px, 0);
      animation: glitch-anim 3s infinite linear alternate-reverse;
      animation-delay: 7.8s;
    }
  }

  .glitch2 {
    position: relative;
    color: #fff;
    font-size: 12px;
    letter-spacing: 2px;

    &::after {
      @include glitch-shadow;
      left: -2px;
      opacity: 0.5;
      text-shadow: -2px 0 var(--var-hilight-color), 2px 2px var(--var-hilight-color);
      clip: rect(44px, 450px, 56px, 0);
      animation: glitch-anim2 3s infinite linear alternate-reverse;
      animation-delay: 6s;
    }
  }

  @keyframes glitch-anim {
    $steps: 20;

    @for $i from 0 to $steps {
      #{percentage($i*(1/$steps))} {
        clip: rect((random(300)) + px, 9999px, (random(200)) + px, 0);
        transform: skew((random(300) / 100) + deg);
      }
    }
  }

  @keyframes glitch-anim2 {
    $steps: 20;

    @for $i from 0 to $steps {
      #{percentage($i*(1/$steps))} {
        clip: rect((random(300)) + px, 9999px, (random(200)) + px, 0);
        transform: skew((random(300) / 100) + deg);
      }
    }
  }

  .scanlines {
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.2) 70%, rgba(0, 0, 0, 0.3));
    background-size: 100% 0.3rem;
    border-radius: 2rem;
    position: absolute;
  }

  .scanlines.glow-red {
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.2) 70%, rgba(204, 41, 41, 0.3));
    background-size: 100% 0.3rem;
    border-radius: 2rem;
    position: absolute;
  }

  .scanlines.glow-green {
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.2) 70%, rgba(41, 193, 204, 0.3));
    background-size: 100% 0.3rem;
    border-radius: 2rem;
    position: absolute;
  }


  .crt-overlay {
    position: absolute;
    animation: crt-glow 0.2s infinite;
    background: radial-gradient(circle at center, #1bd459 0%, rgba(27, 212, 89, 0.88) 58%, rgba(21, 235, 92, 0.57) 80%, rgba(19, 94, 29, 0.27) 93%, rgba(10, 23, 12, 0) 100%);
    opacity: 0.05;
    pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  @keyframes crt-glow {
    0% {
      opacity: 0.05;
    }

    25% {
      opacity: 0.06;
    }

    50% {
      opacity: 0.04;
    }
  }
</style>