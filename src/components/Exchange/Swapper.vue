<template>
  <div class="flex flex-col pb-5 pt-2.5">
    <div class="flex flex-col p-4 st5 bg-gradient-to-l from-slightGray dark:from-slightDark to-transparent ss:w-80 xs:w-96 rounded-3xl border-l border-yellow h-auto">
      <div class="flex items-center space-x-2 mb-3">
        <i class="las la-random text-xl dark:text-gray-300"></i>
        <p class="text-sm dark:text-gray-300">Swap</p>
      </div>
      <div class="flex flex-col st5 dark:bg-Dark-gray bg-gray-100 absolute bottom-0 left-4 text-white opacity-80 pb-2">
        <div class="flex flex-col st5 dark:bg-Dark-gray bg-gray-100 absolute bottom-0 left-4 text-white opacity-80 pb-2">
          <div class="flex shadow-lg flex-col space-y-3 st5 dark:bg-Dark-gray bg-gray-100 p-3 absolute bottom-0 left-4 text-white opacity-80 pb-2">
            <SwapperToken0 />
            <SwapperToken1 />
          </div>
        </div>
        <SwapperRateImpact />
      </div>
      <SwapperRate />
      
      <Warning :warnings="getWarnings" />

      <div class="flex pt-3">
        <div class="flex w-full h-10 items-center">
          <SwapperBackButton />
          <div class="flex flex-1 h-full space-x-2 justify-end">
            <div class="flex items-center w-28 h-full relative">
              <SwapperApprove />
            </div>
            <div class="flex items-center w-28 h-full relative">
              <SwapperSwap @reload='reload' />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SwapperToken0 from './Swapper/SwapperToken0'
  import SwapperToken1 from './Swapper/SwapperToken1'
  import SwapperRate from './Swapper/SwapperRate'
  import SwapperRateImpact from './Swapper/SwapperRateImpact'
  import SwapperBackButton from './Swapper/SwapperBackButton'
  import SwapperApprove from './Swapper/SwapperApprove'
  import SwapperSwap from './Swapper/SwapperSwap'
  import Warning from './Warning'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Swapper',
    components: {
      SwapperToken0,
      SwapperToken1,
      SwapperRate,
      SwapperRateImpact,
      SwapperBackButton,
      SwapperApprove,
      SwapperSwap,
      Warning
    },
    mounted(){
      if(!this.getUserSignedIn){
        this.setBtnState({swap: 'swapped'})
      }

    },
    computed: {
      ...mapGetters('exchange/swapper/buttons', ['getBtnState']),
      ...mapGetters('exchange/swapper', ['getWarnings']),
      ...mapGetters('wallet', ['getUserSignedIn']),
    },
    methods: {
      ...mapActions('exchange/swapper/buttons', ['setBtnState']),

      reload() {
        this.$emit('reload', true)
      },
    }
  }
</script>