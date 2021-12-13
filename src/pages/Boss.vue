<template>
  <light-box>
    <template v-slot:header>
      <h1 class="text-2xl md:text-5xl text-primary-alt font-semibold">Boss</h1>
    </template>

    <back-button :to="{ name: 'world-map' }" />
    <BossCard :id="bossId" class="mb-6" />

    <h2 class="text-2xl p-2">Team</h2>
    <section class="team grid sm:grid-cols-1 md:grid-cols-4 gap-1">
      <team-slot
        v-for="idx in teamsize"
        @leave="leave(getMemberId(idx - 1))"
        class="teammember mx-auto"
        :id="getMemberId(idx - 1)"
        :key="'temmember-' + idx"
      />
    </section>

    <h2 class="text-2xl p-2">Available Freys</h2>

    <section class="team grid sm:grid-cols-1 md:grid-cols-4 gap-1">
      <div
        v-for="frey in availableFreys"
        :key="`aval-${frey}`"
        class="relative"
      >
        <img :src="`https://frey.freyala.com/images/${frey}.png`" alt="" />

        <request-button
          class="
            absolute
            w-4/5
            bottom-0
            left-1/2
            transform
            -translate-x-1/2 -translate-y-1
          "
          :action="requestJoin(frey)"
        >
          Join
        </request-button>
      </div>
    </section>

    <button
      class="
        w-full
        my-12
        rounded-none
        border border-primary-alt
        hover:bg-primary-alt hover:text-brown
        px-4
        py-2
        min-h-12
      "
    >
      Start Fight
    </button>
  </light-box>
</template>

<script>
import LightBox from "../components/LightBox.vue";
import BossCard from "../components/Boss/BossCard.vue";
import TeamSlot from "../components/Boss/TeamSlot.vue";
import BackButton from "../components/BackButton.vue";
import RequestButton from "../components/RequestButton.vue";
export default {
  components: { BackButton, LightBox, BossCard, TeamSlot, RequestButton },
  data: function () {
    return {
      teamsize: 4,
      teammembers: [557, 223],
      availableFreys: [11, 1002, 39],
    };
  },
  methods: {
    getMemberId(id) {
      const img = id < this.teammembers.length ? this.teammembers[id] : -1;
      console.log(id, img);
      return img;
    },
    requestJoin: function (id) {
      return function () {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log("JOIM");
            this.join(id);
            resolve();
          }, 3000);
        });
      }.bind(this);
    },
    join(id) {
      const idx = this.availableFreys.indexOf(id);
      if (idx != -1 && this.teammembers.length < this.teamsize) {
        this.availableFreys.splice(idx, 1);
        this.teammembers.push(id);
      }
    },
    leave(id) {
      console.log("leave");
      const idx = this.teammembers.indexOf(id);
      if (idx != -1) {
        this.teammembers.splice(idx, 1);
        this.availableFreys.push(id);
      }
    },
  },
  computed: {
    bossId() {
      return this.$route.params.id;
    },
  },
};
</script>

