<template>
  <div id="app">
    <div v-if="$router.name !== 'login'" class="absolute w-full top-0 left-0 opacity-25"
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
      <div v-show="!loading && $route.name !== 'world-map'" style='transition: opacity 1s' class='absolute mb-8 top-12 ml-6 w-auto mt-4 transition-all'>
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
    name: 'Freyala',
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

        window.addEventListener('click', () => {
          if (!this.$audio) return;
          this.$audio.play();
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