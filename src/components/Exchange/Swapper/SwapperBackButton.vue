<template>
  <!-- back to Swap -->
  <div @click="back" class="flex h-9 items-center space-x-2 ss:space-x-0 xs:space-x-2 rounded-full group bg-gray-100 hover:bg-gray-200 dark:bg-Dark-gray dark:hover:bg-gray-900 pr-3 ss:pr-0 xs:pr-3 cursor-pointer">
    <i class="las la-arrow-left text-lg p-2 text-gray-500 dark:text-primary-head-light rounded-full bg-gray-100 dark:bg-Dark-gray group-hover:bg-primary-head dark:group-hover:text-Dark-gray group-hover:text-gray-100 border-2 border-gray-200 dark:border-gray-700"></i>
    <p class="ss:hidden xs:block text-sm text-gray-500 dark:text-primary-head-light">back</p>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'SwapperBackButton',
    methods: {
      ...mapActions('exchange', ['goTo']),

      back() {
        this.goTo('swap')
      }
    }
  }
</script>