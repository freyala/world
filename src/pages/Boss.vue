<template>
  <light-box>
    <template v-slot:header>
      <h1 class="text-2xl md:text-5xl text-primary-alt font-semibold">Boss</h1>
    </template>

    <back-button :to="{ name: 'world-map' }" />
    <BossCard :id="bossId" class="mb-6" />

    <div v-if="hasTeam">
      <h2 class="text-2xl p-2">Team</h2>
      <section
        class="team grid sm:grid-cols-1 md:grid-cols-4 gap-1"
        :class="{ isOwner }"
      >
        <team-slot
          v-for="idx in teamsize"
          @leave="leave(getMemberId(idx - 1))"
          class="teammember mx-auto"
          :id="getMemberId(idx - 1)"
          :key="'temmember-' + idx"
        />
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
        v-if="isOwner"
      >
        Start Fight
      </button>

      <request-button v-if="offlineTeam" :action="initializeTeam"
        >Create Team</request-button
      >
    </div>
    <div v-else>
      <button
        class="flex justify-center bg-green text-white"
        @click="createTeam"
      >
        Create Team
      </button>
    </div>

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
  </light-box>
</template>

<script>
import LightBox from "../components/LightBox.vue";
import BossCard from "../components/Boss/BossCard.vue";
import TeamSlot from "../components/Boss/TeamSlot.vue";
import BackButton from "../components/BackButton.vue";
import RequestButton from "../components/RequestButton.vue";

import { createToastInterface } from "vue-toastification";

export default {
  components: { BackButton, LightBox, BossCard, TeamSlot, RequestButton },
  created() {
    const toast = createToastInterface();
    this.$data.toast = toast;

    if (this.hasTeam) {
      let team = window.localStorage.getItem("team-" + this.team);

      if (team) {
        console.log(team);
        try {
          let t = JSON.parse(team);
          this.$data.owner = t.owner;
          this.$data.teammembers = t.teammembers;
        } catch (e) {
          console.error(e);
        }

        // let team = JSON.parse(team)
      } else {
        //Navigate to no team
      }
    }
  },
  data: function () {
    return {
      owner: null,
      teamsize: 4,
      teammembers: [],
      availableFreys: [11, 1002, 39],
    };
  },
  methods: {
    getMemberId(id) {
      const img = id < this.teammembers?.length ? this.teammembers[id] : -1;
      return img;
    },
    requestJoin: function (id) {
      return function () {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            try {
              this.join(id);
            } catch (e) {
              reject(e);
            }
            resolve();
          }, 1000);
        });
      }.bind(this);
    },
    join(id) {
      const idx = this.availableFreys.indexOf(id);
      if (idx === -1) {
        throw new Error("You don't own that Frey!");
      } else if (this.teammembers.length >= this.teamsize) {
        throw new Error("Team is already full!");
      } else {
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
    createTeam() {
      console.log(this.$route);
      this.$router.replace({ params: { team: 0 } });
    },
    async initializeTeam() {
      if (this.teammembers.length == 0) throw new Error("No teammembers set!");
      else {
        const num = Math.floor(Math.random() * 10000).toString();

        const teamOptions = {
          owner: this.$store.getters.metaMaskAccount,
          teammembers: this.teammembers,
        };

        window.localStorage.setItem("team-" + num, JSON.stringify(teamOptions));
        this.$router.replace({ params: { team: num } });
      }
    },
  },
  computed: {
    bossId() {
      return this.$route.params.id;
    },
    hasTeam() {
      return this.team != null;
    },
    team() {
      return this.$route.params.team;
    },
    offlineTeam() {
      return this.$route.params?.team == 0;
    },
    teamAndOwner() {
      return this.hasTeam;
    },
    isOwner() {
      console.log(this.owner == this.$store.getters.metaMaskAccount);
      return this.owner == this.$store.getters.metaMaskAccount;
    },
  },
};
</script>

<style scoped>
.isOwner {
  border: 3px solid gold;
  position: relative;
}

.isOwner::before {
  color: gold;
  content: "You are the owner";
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translateY(100%);
}
</style>

