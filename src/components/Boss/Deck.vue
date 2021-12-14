<template>
  <div class="deck">
    <card
      v-for="card of cards"
      :id="card.id"
      :key="'card-' + card.id"
      :used="card.used"
      :type="card.type"
      @use="cardUsed"
    />
  </div>
</template>

<script>
import Card from "./Card.vue";
export default {
  components: { Card },
  name: "Deck",
  mounted() {
    let id = 0;
    while (id++ < this.num) {
      const type = Math.floor(Math.random() * this.types);
      this.cards.push({ id, type, used: false });
    }
  },
  data() {
    return {
      types: 3,
      num: 12,
      cards: [],
    };
  },
  methods: {
    cardUsed(card) {
      let index = this.cards.findIndex((c) => (c.id === card.id));
      if (index != -1) {
        let nCard = this.cards[index];
        nCard.used = true;
        this.$emit("attack", nCard)
        this.cards.splice(index, 1, nCard);
      } else {
        console.error("Couldn't find card!");
      }
    },
  },
};
</script>

<style>
.deck {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
}
</style>