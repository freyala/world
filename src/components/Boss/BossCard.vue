<template>
  <div class="boss-card grid md:grid-cols-2 grid-cols-1  gap-5">
    <img :src="'https://frey.freyala.com/images/' + id + '.png'" alt="" />
    <div class="attributes">
      <h2 class="text-2xl">{{boss.name}}</h2>
        <ul>
            <li v-for="([name, val]) of attributes" :key="'attr-'+name">{{name}}: {{val}}</li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "BossCard",
  props: {
    id: { type: String, required: true },
  },
  data() {
      return {
          boss: {
              name: "Karak Gar'thok",
              rarity: "Legendary",
              element: "Nature",
              maxHealth: 10000000,
              loot: 900000,
              attack: 900,
              defense: 50,
          }
      }
  },
  computed: {
      attributes(){
          return Object.entries(this.boss).filter((val)=> val[0] != "name")
      }
  }
};
</script>

<style>
</style>