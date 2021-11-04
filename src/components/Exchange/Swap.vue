<template>
  <div
      class="flex flex-col st5 p-4 bg-gradient-to-l from-slightGray dark:from-slightDark to-transparent text-gray-500 dark:text-gray-300 ss:w-80 xs:w-96 rounded-3xl swap-border">
    <div class="flex items-center space-x-2 mb-3">
      <i class="las la-random text-xl"></i>
      <p class="text-sm">Swap</p>
    </div>

    <div @click="selectToken('token1')">
      <TokenSelect whichToken="token1"/>
    </div>

    <div @click="selectToken('token2')">
      <TokenSelect whichToken="token2"/>
    </div>

    <SwapTokenButtons/>
  </div>
</template>

<script>
import TokenSelect from './TokenSelect';
import SwapTokenButtons from './Swap/SwapTokenButtons';

export default {
  name: 'Swap',
  components: {
    TokenSelect,
    SwapTokenButtons
  },
  methods: {
    selectToken(token) {
      this.$emit('triggerModal', token)
    }
  }
}
</script>