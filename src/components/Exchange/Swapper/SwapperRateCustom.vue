<template>
  <div class="relative">
    <div @click="toggleCustomRate"
         :class="checkCustom ? 'border-l-2 border-yellow' : 'hover:bg-gray-50 dark:hover:bg-slightDark'"
         class="flex items-center justify-center cursor-pointer w-8 h-6 relative hover:bg-gray-50 dark:hover:bg-slightDark dark:bg-Dark-gray bg-gray-100 focus:outline-none">
      <i class="las la-sliders-h text-lg absolute dark:text-gray-300"></i>
    </div>

    <div @click="toggleCustomRate" v-if="isOpen" class="fixed inset-0 z-50"></div>

    <transition
        enter-active-class="transform transition duration-200 ease-out"
        enter-from-class="-translate-y-3 opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transform transition duration-150 ease-in"
        leave-from-class="translate-x-0 opacity-100"
        leave-to-class="-translate-y-3 opacity-0"
    >
      <div class="absolute z-50 w-48 mt-2 right-0" v-if="isOpen">
        <div
            class="bg-detail-bg relative flex flex-col space-y-2 py-2 border-l-2 border-yellow shadow-lg p-1 px-2 bg-gray-100 dark:bg-slightDark">
          <div class="flex items-center space-x-2">
            <p class="dark:text-gray-300">Custom Rate</p>
          </div>
          <InputWithValidation @keyup.enter="toggleCustomRate" :input="amount" :errors="errors"
                               @catchInput="inputAmount" :rounded="'absolute bottom-0 left-4 text-white opacity-80 pb-2'" :placeholder="'%'" :errorTop="'pt-8'">
            <p class="flex items-center justify-center text-xs z-30 right-0 absolute bg-gray-100 dark:bg-Dark-gray px-3 h-8">
              %</p>
          </InputWithValidation>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import InputWithValidation from '../InputWithValidation'

export default {
  name: 'SwapperRateCustom',
  components: {
    InputWithValidation,
  },
  props: {
    picked: String
  },
  data() {
    return {
      amount: "",
      errors: {},
      isOpen: false,
      tooltip: {
        name: new Date().getTime(),
        position: 'top',
        color: 'rgba(24, 213, 187, 1)',
        offset: 16,
        speed: 300,
        shift: 50
      },
    }
  },
  created() {
    window.addEventListener('keyup', this.doCommand)
  },
  unmounted() {
    window.removeEventListener('keyup', this.doCommand)
  },
  mounted() {
    this.$nextTick(() => {
      this.adjustTooltip()
      window.addEventListener('resize', () => {
        this.adjustTooltip()
      })
    })
  },
  computed: {
    checkCustom() {
      return this.picked !== '' && this.picked !== '0.1' && this.picked !== '0.3' && this.picked !== '0.5';
    }
  },
  methods: {
    doCommand(e) {
      if (e.code === 'Escape' && this.isOpen) {
        this.isOpen = !this.isOpen
      }
    },
    toggleCustomRate() {
      this.isOpen = !this.isOpen
      this.errors = {}
    },
    inputAmount(value) {
      if (value === "") {
        this.errors['empty'] = 'Cannot be empty.'
      } else {
        delete this.errors['empty']
        this.$emit('selectRate', value)
      }
      if (parseFloat(value) < 0.1) {
        this.errors['low'] = 'Too low!'
      } else {
        delete this.errors['low']
        this.$emit('selectRate', value)
      }
      if (!value.match(/^\d*\.?\d*$/)) {
        this.errors['format'] = 'Invalid format! e.g: 0.75'
      } else {
        delete this.errors['format']
        this.$emit('selectRate', value)
      }
      if (parseFloat(value) > 5) {
        this.errors['high'] = 'Be carefull with high values!'
      } else {
        delete this.errors['high']
        this.$emit('selectRate', value)
      }
    },
    getWindowSize() {
      return {
        height: window.innerHeight,
        width: window.innerWidth
      }
    },
    adjustTooltip() {
      let width = this.getWindowSize().width
      if (width > 0 && width < 540) {
        this.tooltip.shift = 65
      } else if (width >= 540) {
        this.tooltip.shift = 50
      }
    }
  }
}
</script>