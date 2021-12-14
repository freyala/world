<template>
  <div class="card" :class="className" @click="() => $emit('use', card)">
    <span>
      {{ cardType }}
    </span>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    id: Number,
    type: Number,
    used: Boolean,
  },
  computed: {
    className() {
      let className = { used: this.used };
      className[this.cardType] = true;
      return className;
    },
    cardType() {
      const map = {
        0: "fireball",
        1: "poison",
        2: "club",
      };

      return map[this.type] || "blank";
    },
    card() {
      return {
        id: this.id,
        type: this.type,
        used: this.used,
      };
    },
  },
};
</script>

<style>
.card {
  width: 100px;
  height: 100px;
  transform-origin: center center;
  padding: 50px;
  transform: rotate(30deg) scale(0.75);
  background: gray;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card.used {
  filter: grayscale(90%);
}

.card span {
  display: block;
  text-align: center;
  color: #111;
  text-transform: uppercase;
}

.fireball {
  background-color: brown;
}

.poison {
  background-color: greenyellow;
}

.club {
  background-color: rgb(255, 47, 92);
}
</style>