<template>
  <div style="width: 100vw; min-height:100vh; height: 100vh; z-index: 999"
       class="flex flex-row w-full h-full relative bg-detail-bg">

    <div v-show='loading' class='absolute top-0 right-0 left-0 bottom-0'
         style='background-image: url(/img/map/plots_loading.png); background-size: cover'>
      <div class='absolute top-0 right-0 left-0 bottom-0 bg-detail-bg opacity-30 flex items-center justify-center'>
      </div>

      <div class='h-full w-full flex items-center justify-center'>
        <div class="m-auto text-center">
          <div class="w-full flex">
            <img class="w-24 h-24 m-auto" src="/images/XYA.png" alt="XYA logo"
                 style="animation: rotation 2s infinite linear;">
          </div>
          <br>
          <p class="text-2xl text-primary-head">Loading...</p>
        </div>
      </div>
    </div>

    <div v-show='!showSideBar' v-on:click='showSideBar = true'
         class='h-16 w-8 dark-panel absolute flex items-center justify-center block xl:hidden rounded-r-xl'
         style='top: 50%; left: 0%; z-index: 1'>
      <i class='fa fa-arrow-right'></i>
    </div>

    <div class='absolute flex flex-row h-16 w-full top-0 dark-panel items-center' style="z-index: 1000">
      <div class='ml-6 mt-5 mb-4 w-auto text-xl cursor-pointer absolute z-50 w-2/5 flex flex-row items-center'>
        <router-link class='flex items-center' :to="{ name: 'world-map' }">
          <i class='fa fa-arrow-left mr-2'></i>
          <span class='sm:block hidden'>Back</span>
        </router-link>
      </div>
      <div class='w-full text-center lg:text-3xl sm:text-xl text-xl font-bold absolute'>
        <p>The Frey Barracks</p>
      </div>
    </div>

    <div
        class='xl:relative absolute 2xl:w-1/5 xl:w-3/12 lg:w-5/12 sm:w-6/12 w-full h-full flex flex-row py-4 px-4 pt-16 overflow-y-auto overflow-x-hidden'
        v-bind:style='{"left": (showSideBar ? 0 : -600) + "px"}'
        style="border-right: 1px solid #363636; z-index: 1; background-color: #ebecc5; box-shadow: 8px 0 8px rgba(0,0,0,0.15); transition: all 0.15s linear">

      <div class="w-full px-12 mt-10">
        <router-link :to="{ name: 'barracks' }">
          <button class="w-full mt-6 xya-btn relative">
            Get Frey
          </button>
        </router-link>
        <router-link :to="{ name: 'barracks-collection' }">
          <button class="w-full mt-6 xya-btn relative">
            Your Frey
          </button>
        </router-link>
        <router-link :to="{ name: 'barracks-gallery' }">
          <button class="w-full mt-6 xya-btn relative">
            All Frey
          </button>
        </router-link>
        <router-link :to="{ name: 'barracks-attributes' }">
          <button class="w-full mt-6 xya-btn relative">
            All Attributes
          </button>
        </router-link>
      </div>


      <div v-on:click='showSideBar = !showSideBar'
           class='h-16 w-8 dark-panel absolute flex items-center justify-center block xl:hidden rounded-l-xl'
           style='top: 50%; right: 0'>
        <i v-if='showSideBar' class='fa fa-arrow-left'></i>
        <i v-else class='fa fa-arrow-right'></i>
      </div>

    </div>
    <div
        :class="`${showSideBar ? 'xl:w-4/5 w-full py-32 px-8' : 'w-full'} flex flex-wrap h-full relative overflow-y-scroll`">
      <div class="mb-4 w-full mx-auto">
        <input
            class="py-2 dark:bg-white text-center bg-detail-bg text-primary-head dark:text-dark w-full border-b border-primary-head"
            type="text"
            placeholder="Search attribute" v-model="search">
      </div>

      <div class="w-full flex flex-wrap text-center">
        <span class="w-full" :key="key + value" v-for="(key, value) in attributes">
          <strong v-if="search === ''" class="text-xl">
            {{ value }}
          </strong>
          <br v-if="search === ''">
          <span :key="keys + values" v-for="(keys, values) in key">
            <div :class="`${search === '' ? '' : 'underline strong text-lg'}`"
                 v-if="search === '' || values.toLowerCase().includes(search.toLowerCase())">{{ values }} ({{
                keys
              }}) </div>
          </span>
          <br>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import wallet from "../../plugins/wallet";

export default {
  name: 'Attributes',
  mixins: [wallet],
  computed: {
    ...mapGetters([
      'metaMaskAccount',
      'metaMaskWallet'
    ])
  },
  mounted() {
    this.loading = false
  },
  data() {
    return {
      showSideBar: true,
      search: '',
      loading: true,
      sendingLoading: undefined,
      yourFrey: [],
      attributes: {
        "Type": {
          "Folk": "48.46%",
          "Undead": "6.84%",
          "Wraith": "4.93%",
          "Yin": "20.13%",
          "Yang": "19.64%"
        },
        "Gender": {
          "Male": "62.89%",
          "Female": "37.11%"
        },
        "Background": {
          "Pistachio": "12.13%",
          "Gray": "12.32%",
          "Pink": "12.31%",
          "Red": "12.41%",
          "Yellow": "12.01%",
          "Lime": "12.22%",
          "Green": "12.35%",
          "Black": "1.06%",
          "Aqua": "11.93%",
          "White": "1.26%"
        },
        "Weapon": {
          "None": "7.51%",
          "Grand Sword": "5.15%",
          "Axe": "5.31%",
          "Crimson Spear": "5.01%",
          "Quiver": "5.05%",
          "Pickaxe": "5.58%",
          "Bow": "5.25%",
          "Crossbow": "5.32%",
          "Katana": "4.77%",
          "Cutlass": "5.38%",
          "Spiky Shield": "4.96%",
          "Javelin Spear": "5.02%",
          "War Spear": "5.00%",
          "Bloody Mace": "5.12%",
          "Battle Axe": "5.08%",
          "Sceptre": "5.18%",
          "Sickle": "5.40%",
          "Broadsword": "4.88%",
          "Royal Blade": "5.03%"
        },
        "Base": {
          "Male Mory": "10.03%",
          "Male Honey": "10.45%",
          "Male Chestnut": "10.33%",
          "Elder Undead": "1.05%",
          "Thud Undead": "0.98%",
          "Male Wraith": "3.08%",
          "Male Yang": "12.21%",
          "Male Yin": "12.56%",
          "Female Mory": "5.72%",
          "Female Chestnut": "5.92%",
          "Female Honey": "6.01%",
          "Female Yang": "7.43%",
          "Female Yin": "7.57%",
          "Probed Undead": "2.22%",
          "Decayed Undead": "2.59%",
          "Female Wraith": "1.85%"
        },
        "Facial Feature": {
          "None": "83.63%",
          "Scar": "2.27%",
          "Eyepatch": "2.23%",
          "Heavily Bruised Eye": "2.04%",
          "Metal Patch": "1.81%",
          "Scarred Pupil": "1.88%",
          "Mutated Eye": "1.95%",
          "Bruised Eye": "2.12%",
          "Slightly Bruised Eye": "2.07%"
        },
        "Hair": {
          "None": "4.24%",
          "Blonde Ponytail": "2.16%",
          "Spike Mohawk": "2.52%",
          "Rainbow Spike Mohawk": "0.59%",
          "Blue Short": "2.20%",
          "Brown Short": "1.99%",
          "Blonde Short": "2.20%",
          "Blonde Wavy": "1.99%",
          "Brown Wavy": "1.93%",
          "Rainbow Wavy": "0.60%",
          "Blonde Spiky": "2.34%",
          "Brown Spiky": "2.33%",
          "Dark Long Curly": "2.10%",
          "Light Long Curly": "2.00%",
          "Blue Spiky": "2.07%",
          "Rainbow Spiky": "0.62%",
          "Brown Bowlcut": "2.14%",
          "Blonde bowlcut": "2.37%",
          "White Manbun": "2.27%",
          "Brown Manbun": "2.23%",
          "Rainbow Shaven": "0.50%",
          "Third Eye": "1.30%",
          "Royal Crown": "2.30%",
          "Spiked Mohawk": "0.18%",
          "Combed Ponytail": "2.53%",
          "Short": "0.19%",
          "Wavy": "0.15%",
          "Spiky": "0.23%",
          "Long Curly": "0.18%",
          "Curly": "2.40%",
          "Receding": "2.48%",
          "Messy Wave": "2.41%",
          "Bowlcut": "0.32%",
          "Manbun": "0.23%",
          "Shaven": "2.09%",
          "Ginger Ponytail": "3.75%",
          "Brown Ponytail": "5.30%",
          "Black Ponytail": "3.31%",
          "Viking Helmet Brown": "3.75%",
          "Viking Helmet Ginger": "3.60%",
          "Ginger Long": "3.76%",
          "Blonde Long": "3.48%",
          "Black Long": "3.54%",
          "Witch Hat Light": "3.57%",
          "Witch Hat Dark": "3.24%",
          "Ponytail": "0.59%",
          "Viking Helmet": "2.66%",
          "Long": "0.57%",
          "Witch Hat": "0.50%"
        },
        "Armor": {
          "Clean": "10.19%",
          "Bloody Shirt": "3.47%",
          "Pauldron": "4.01%",
          "Beige Tunic": "3.81%",
          "Green Tunic": "3.66%",
          "Blue Tunic": "3.73%",
          "Royal Guard": "6.98%",
          "Spiked Marauder Chestplate": "5.15%",
          "Luderion Vest": "4.79%",
          "Freyfolk Leather": "5.06%",
          "Halis Armor": "4.75%",
          "Wanderer Coat": "6.17%",
          "Marauder Chestplate": "4.84%",
          "Adventure Gear": "5.14%",
          "Ardenia Farmer": "5.10%",
          "Worned Tunic": "6.52%",
          "Noble Doublet": "4.62%",
          "Regal Cloak": "7.04%",
          "Fiend Chestplate": "4.97%"
        },
        "Mouth": {
          "None": "11.77%",
          "Chinstrap Stubble": "2.31%",
          "Chinstrap": "2.56%",
          "Goatee": "0.27%",
          "Smirk Stubble": "2.65%",
          "Big Grin": "2.53%",
          "Worried": "2.50%",
          "Beard Pony": "0.17%",
          "Smirk": "2.52%",
          "Stitched": "2.49%",
          "Straight": "2.68%",
          "Scarred Lip": "2.55%",
          "Golden Smirk": "2.36%",
          "Soul Patch": "0.27%",
          "Frown": "2.79%",
          "Frown Stubble": "2.69%",
          "Gasp": "2.40%",
          "Gritted Teeth": "2.52%",
          "Gritted Teeth Stubble": "2.58%",
          "Moustache": "0.30%",
          "Moustache Stubble": "0.31%",
          "Handlebars": "0.27%",
          "Hay in Mouth": "2.64%",
          "Hay in Mouth Stubble": "2.73%",
          "Pirate Smile": "2.97%",
          "Cute Lips": "2.56%",
          "Mouth Shield": "2.39%",
          "Scowl": "2.57%",
          "Red Lips": "10.61%",
          "Purple Lips": "10.65%",
          "Dark Purple Lips": "11.39%"
        },
        "Nose": {
          "None": "6.84%",
          "Aquiline": "8.26%",
          "Droopy": "8.66%",
          "Grecian": "8.17%",
          "Injured": "8.74%",
          "Roman": "8.54%",
          "Straight": "17.06%",
          "Pointy": "17.13%",
          "Round": "8.28%",
          "Pierced": "8.32%"
        },
        "Mask": {
          "None": "98.78%",
          "Kitsune": "0.47%",
          "Jack O' Lantern": "0.45%",
          "Freyfolk Rioter": "0.30%"
        }
      },
    }
  }
}
</script>
