<template>
  <light-box>
    <template v-slot:header>
      <h1 class="text-2xl md:text-5xl text-primary-alt font-semibold">Boss</h1>
    </template>

    <back-button :to="{ name: 'world-map' }" />
    <div class="boss-wrapper">
      <BossCard :id="bossId" class="mb-6" />
      <div class="attack" ref="attack-anim">BOOM</div>
    </div>

    <h2 v-if="inFight" class="text-2xl p-2">Deck</h2>
    <deck v-if="inFight" @attack="attack" />

    <div v-if="hasTeam">
      <h2 class="text-2xl p-2">Team</h2>
      <section
        class="team grid sm:grid-cols-1 md:grid-cols-4 gap-1"
        :class="{ isOwner }"
      >
        <team-slot
          v-for="idx in teamsize"
          :leavable="!inFight"
          @leave="leave(getMemberId(idx - 1))"
          class="teammember mx-auto"
          :id="getMemberId(idx - 1)"
          :key="'temmember-' + idx"
        />
      </section>

      <request-button
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
        :action="startFight"
        >Fight Boss</request-button
      >

      <request-button v-if="offlineTeam" :action="initializeTeam"
        >Create Team</request-button
      >
    </div>
    <div v-else>
      <button
        class="flex justify-center bg-green text-white"
        @click="createTeam"
      >
        New Team
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
import Deck from "../components/Boss/Deck.vue";

export default {
  components: { BackButton, LightBox, BossCard, TeamSlot, RequestButton, Deck },
  created() {
    const toast = createToastInterface();
    this.$data.toast = toast;

    if (this.hasTeam) {
      let team = this.teamOptions;
      this.$data.owner = team.owner;
      this.$data.teammembers = team.teammembers;
      this.$data.inFight = team.inFight;
    }
  },
  data: function () {
    return {
      owner: null,
      mode: "setup",
      inFight: false,
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
      const idx = this.teammembers.indexOf(id);
      if (idx != -1) {
        this.teammembers.splice(idx, 1);
        this.availableFreys.push(id);
      }
    },
    createTeam() {
      this.$router.replace({ params: { team: 0 } });
    },
    async initializeTeam() {
      if (this.teammembers.length == 0) this.$data.toast("No teammembers set!");
      else {
        const id = Math.floor(Math.random() * 10000).toString();

        const teamOptions = {
          id: id,
          inFight: false,
          owner: this.$store.getters.metaMaskAccount,
          teammembers: this.teammembers,
        };

        this.saveTeam(teamOptions);
        this.$router.replace({ params: { team: id } });
      }
    },
    async startFight() {
      let team = this.teamOptions;

      if (!team.inFight) {
        this.mode = "fight";
        team.inFight = true;
        this.inFight = true;
        this.saveTeam(team);
      } else {
        this.$data.toast.error("Team is already in fight!");
      }
    },
    saveTeam(teamOptions) {
      window.localStorage.setItem(
        "team-" + this.team,
        JSON.stringify(teamOptions)
      );
    },
    async attack() {
      if (this.$refs["attack-anim"]) {
        this.$refs["attack-anim"].classList.remove("animate");
        await this.hiccup()
        this.$refs["attack-anim"].classList.add("animate");
      }
    },
    async hiccup(){
      return new Promise(r => setTimeout(r, 1))
    }
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
      return this.owner == this.$store.getters.metaMaskAccount;
    },

    teamOptions() {
      let teamString = window.localStorage.getItem("team-" + this.team);
      let team;
      try {
        team = JSON.parse(teamString.toString());
      } catch (error) {
        console.error(error);
      }
      return team;
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

.boss-wrapper {
  position: relative;
}

.attack {
  position: absolute;
  left: 0;
  right: 50%;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100000;
  opacity: 0;

  color: red;
  font-size: 100px;
}
.attack.animate {
  animation: boom 1s;
}

@keyframes boom {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>

