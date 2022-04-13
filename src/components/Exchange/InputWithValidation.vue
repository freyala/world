<template>
  <div class="relative flex w-full items-center st5 st5-all focus-within:text-primary-head-dark dark:focus-within:text-primary-head dark:text-gray-500 text-gray-400">
    <input type="text" v-model="input" :class="this.invalidInput ? 'ring-red-400 focus:ring-red-400 ring-1 focus:ring-1 focus:outline-none ' + this.rounded : 'ring-black ring-opacity-10 focus:ring-yellow ring-1 focus:outline-none ' + this.rounded" class="flex w-full z-20 bg-gray-100 py-2 items-center pl-3 dark:bg-Dark-gray dark:placeholder-gray-600 placeholder-gray-300" :placeholder="placeholder">
    <slot />

    <transition name="invalid-input-body">
      <div v-if="this.invalidInput" class="flex z-10 w-full absolute py-2 my-2 top-0 left-0 bg-red-400 shadow-lg" :class="errorTop">
        <div class="relative flex flex-col space-y-2">
          <div v-for="(error, index) in this.errors" :key="index" class="text-xs text-gray-50 mx-3 flex">
            {{error}}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'InputWithValidation',
    props: {
      input: String,
      errors: Object,
      rounded: String,
      placeholder: String,
      errorTop: String
    },
    watch: {
      input(value) {
        this.$emit('catchInput', value)
      }
    },
    computed: {
      invalidInput() {
        return Object.keys(this.errors).length > 0;
      }
    }
  }
</script>