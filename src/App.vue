<template>
  <div id="app">
    <div v-if="$router.name !== 'login'" class="absolute w-full top-0 left-0 opacity-0"
      style="background: url('/images/map/world.png') no-repeat; background-size: cover; min-height: 100vh"></div>

    <div style="width: 0; height: 0">
      <div class="load-in-bg1"></div>
      <div class="load-in-bg2"></div>
      <div class="load-in-bg3"></div>
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="loading" class="flex flex-wrap h-screen w-full">

        <div class="m-auto text-center">
          <div class="w-full flex">
            <img class="w-24 h-24 m-auto" src="/images/XYA.png" alt="XYA logo"
              style="animation: rotation 2s infinite linear;">
          </div>
          <br>
          <p class="text-2xl">Loading...</p>
        </div>
      </div>
      <router-view v-else />
    </transition>

    <transition name="fade" mode="out-in">
      <div v-show="!loading && $route.name !== 'world-map'" style='transition: opacity 1s'
        class='opacity-0 md:absolute lg:block hidden mb-8 top-12 lg:ml-6 ml-2 w-auto mt-6 transition-all'>
        <AudioManagerInterface></AudioManagerInterface>
      </div>
    </transition>

  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import wallet from './plugins/wallet'
  import AudioManagerInterface from '@/components/Plugins/AudioManagerInterface'

  export default {
    name: 'Xangaea',
    components: {
      AudioManagerInterface
    },
    mixins: [wallet],
    data() {
      return {
        loading: true,
        mobile: false
      }
    },
    async mounted() {
      this.setFirstTime()
      this.setFavourites()

      await this.connectWallet().then((success) => {
        if (success === true) {
          this.loading = false
        } else {
          this.loading = false
          this.$router.push({
            name: 'login'
          })
        }
      })

      window.ethereum.on('accountsChanged', async () => {
        await this.connectWallet().then((success) => {
          if (success === true) {
            this.loading = false
          } else {
            this.loading = false
            this.$router.push({
              name: 'login'
            })
          }
        })
      })

      window.ethereum.on('chainChanged', async () => {
        await this.connectWallet().then((success) => {
          if (success === true) {
            this.loading = false
          } else {
            this.loading = false
            this.$router.push({
              name: 'login'
            })
          }
        })
      })

      this.$nextTick(() => {
        this.$audio.setAudioForRoute(this.$route);

        ['click', 'ontouchstart'].forEach(c => {
          window.addEventListener(c, () => {
            if (!this.$audio) return;
            this.$audio.play();
          }, {
            once: true
          });
        });

      });
    },
    watch: {
      $route(to, from) {
        if (to.name === from.name) return;
        this.$audio.setTransitionToRoute(this.$route);
      }
    },
    computed: {
      ...mapGetters([
        'loggedIn',
        'walletConnected',
        'metaMaskAccount',
        'metaMaskWallet',
        'firstTime'
      ])
    },
    methods: {
      ...mapActions([
        'setFavourites',
        'setFirstTime'
      ])
    }
  }
</script>

<style>
.Vue-Toastification__icon{
  width: auto!important;
  max-width: 20px!important;
}

</style>