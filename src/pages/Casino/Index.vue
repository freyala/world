<template>
  <section style="background: url('/images/map/worldmap.png') no-repeat; background-size: cover; min-height: 100vh"
           class="flex p-4 md:p-16 lg:px-32">
    <div style="background: #1c1c1c; z-index: 9999; overflow-y: auto;" class="screen rounded-2xl w-full">
      <section id="section-i-1" class="border-b-4 border-bbrown"
               style="background: url('/images/SVG/homepage-bg-top.svg') no-repeat top right">
        <div class="container mx-auto text-center pt-16 md:pt-24 pb-16 md:pb-20">
          <h1 class="text-2xl md:text-5xl text-primary-alt font-semibold">
            The Luderion Alleyway
          </h1>
        </div>
      </section>
      <div class="p-4 md:p-8 relative">
        <div class="absolute top-0 left-0 p-4 md:p-8">
          <router-link :to="{ name: 'world-map' }">
            <i class="fas fa-long-arrow-alt-left"></i> Back
          </router-link>
        </div>
        <br>

        <div class="flex">
          <div class="w-full md:w-4/5 lg:w-3/5 mx-auto">

            <div class="flex flex-wrap text-center mt-4">
              <div class="w-full mt-4">
                <router-link :to="{ name: 'roulette-medium' }">
                  <button type="button" class="mx-auto xya-btn w-full">
                    Roulette lobby
                  </button>
                </router-link>
              </div>
              <div class="w-full mt-4">
                <router-link :to="{ name: 'coinflip' }">
                  <button type="button" class="mx-auto xya-btn w-full">
                    Coinflip lobby
                  </button>
                </router-link>
              </div>
              <div class="w-full mt-4">
                <router-link :to="{ name: 'slots' }">
                  <button type="button" class="mx-auto xya-btn w-full">
                    Slots lobby
                      <div class='new-ribbon'>
                          <span>New</span>
                      </div>
                  </button>
                </router-link>
              </div>
              <div class="w-full mt-4">
                <router-link :to="{ name: 'blackjack' }">
                  <button type="button" class="mx-auto xya-btn w-full">
                    Blackjack lobby
                  </button>
                </router-link>
              </div>
            </div>
            <br>

            <br>
            <hr>
            <br>

            <p class="md:text-lg pb-24">
              After the monarch’s defenses grew stronger, thieves and outcasts retreated to the outskirts of the Freyala
              kingdom. Roaming in a secluded alleyway, deadly games of chance were hosted for those that were
              adventurous. To
              give these risky wagers more recognition, a covert organization called ‘Luderion’ was established, of
              which no
              one knew the founder. Word of this underground activity quickly spread amongst the Freyfolk.
              <br>
              <br>
              The most popular tale is that of an infamous hoodlum named Tariel. He was once the undefeated champion of
              these
              games, and eventually challenged the founder of Luderion himself to a duel, hoping to seize the position.
              But he
              was defeated after what seemed like mere minutes. Unable to pay his crippling debt, Tariel fell into
              madness and
              was found dead in the alleyway the following day. Despite Regent Carroway’s best attempts, Luderion was
              never
              successfully shut down.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Casino'
}
</script>

<style>
.new-ribbon{
  position: absolute;
  top: -16px;
  right: 16px;
  transform: rotate(45deg);
  color: #8cd1a6;
  font-size: calc(0.75rem + 0.5vw);
  width: 32px;
  height: 100%;
  transition: 0.3s;
}
button:hover > div{
  color: white!important;
  top: 6px;
  right: 24px;
  transform: rotate(0deg);
}
</style>