<template>
  <div id="wrapper">
    <main style="height: 100vh; position: relative">
      <div id="world-map">
        <div class="relative" style="cursor: grab">
          <img src="/images/map/worldmap.png" alt="Freyala worldmap">

          <!--          ICONS-->
          <div class="absolute w-full h-full" style="top: -1.5vw; left: -1.75vw;">
            <div class="relative w-full h-full">
              <img class="cursor-pointer absolute" style="left: 58.1063%; top: 8.9681%; width: 17vw"
                   src="/images/map/WallTop.png" alt="WallTop">
              <img class="cursor-pointer absolute" style="left: 49.8312%; top: 62.0653%; width: 8vw;"
                   src="/images/map/WallBottom.png" alt="WallBottom">

              <img class="cursor-pointer absolute" style="left: 41.2226%; top: 56.9306%; width: 10.6vw;"
                   src="/images/map/WallMid.png" alt="WallMid">
              <!--              <div @click="$store.dispatch('setOpenWindow', 'casino')" class="cursor-pointer opacity-0 hover:opacity-100 absolute" style="left: 41.2226%; top: 56.9306%; width: 10.6vw;">-->
              <!--                <img class="w-full" src="/images/map/WallMid_MO.png" alt="WallMid">-->
              <!--                <p class="text-center font-bold text-xl text-yellow outline-brown">-->
              <!--                  Luderion-->
              <!--                </p>-->
              <!--              </div>-->

              <div @click="$store.dispatch('setOpenWindow', 'delegate')"
                   class="cursor-pointer absolute"
                   style="left: 30.6719%;top: 36.139%; width: 4vw;">
                <div class="relative">
                  <img class="w-full" src="/images/map/Beacon.png" alt="Beacon">

<!--                  <p class="text-center font-bold text-yellow absolute"-->
<!--                     style="pointer-events: none; top: 6.5vw; left: -0.2vw; font-size: 4px">-->
<!--                    Beacon-->
<!--                  </p>-->
                </div>
              </div>

              <div @click="$store.dispatch('setOpenWindow', 'harmons')"
                   class="cursor-pointer absolute"
                   style="left: 80.6172%; top: 37.6319%; width: 7vw;">
                <div class="relative">
                  <img class="w-full" src="/images/map/FreyalaTree.png" alt="FreyalaTree">

<!--                  <p class="text-center font-bold text-yellow absolute"-->
<!--                     style="pointer-events: none; top: 8vw; left: 0; font-size: 4px;">-->
<!--                    Sneak Peek-->
<!--                  </p>-->
                </div>
              </div>

              <div @click="$store.dispatch('setOpenWindow', 'faucet')"
                   class="cursor-pointer absolute"
                   style="left: 42.3555%; top: 51.1806%; width: 5vw;">
                <div class="relative">
                  <img class="w-full" src="/images/map/Soup.png" alt="Soup Kitchen">

<!--                  <p class="text-center font-bold text-yellow absolute"-->
<!--                     style="pointer-events: none; top: 3vw; left: 0; font-size: 4px">-->
<!--                    Kitchen-->
<!--                  </p>-->
                </div>
              </div>

              <div @click="$store.dispatch('setOpenWindow', 'staking')"
                   class="cursor-pointer absolute"
                   style="left: 71.0156%; top: 47.6111%; width: 4.54vw;">
                <div class="relative">
                  <img class="w-full" src="/images/map/Drill.png" alt="Drill">

<!--                  <p class="text-center font-bold text-yellow absolute"-->
<!--                     style="pointer-events: none; top: 4vw; left: -1.5vw; font-size: 4px">-->
<!--                    Extraction Site-->
<!--                  </p>-->
                </div>
              </div>

              <div @click="$store.dispatch('setOpenWindow', 'casino')"
                   class="cursor-pointer absolute"
                   style="left: 38.3555%; top: 44.9792%; width: 5vw;">
                <div class="relative">
                  <img class="w-full" src="/images/map/Casino.png" alt="Casino">

<!--                  <p class="text-center font-bold text-yellow absolute"-->
<!--                     style="pointer-events: none; top: 4vw; left: -2vw; font-size: 4px;">-->
<!--                    Luderion-->
<!--                  </p>-->
                </div>
              </div>

              <div @click="$store.dispatch('setOpenWindow', 'governance')"
                   class="cursor-pointer absolute"
                   style="left: 41.8906%; top: 43.1389%; width: 6vw;">
                <div class="relative">
                  <img class="w-full" src="/images/map/Palace.png" alt="Palace">

<!--                  <p class="text-center font-bold text-yellow absolute"-->
<!--                     style="pointer-events: none; top: 4vw; left: 0.5vw; font-size: 4px;">-->
<!--                    Palace-->
<!--                  </p>-->
                </div>
              </div>

              <div @click="$store.dispatch('setOpenWindow', 'jennymines')"
                   class="cursor-pointer absolute"
                   style="left: 81.8281%; top: 29.8611%; width: 3vw;">
                <div class="relative">
                  <img class="w-full" src="/images/map/Mine.png" alt="Mine">

<!--                  <p class="text-center font-bold text-yellow absolute"-->
<!--                     style="pointer-events: none; top: -3vw; left: -0.5vw; font-size: 4px;">-->
<!--                    Jenny's Mine-->
<!--                  </p>-->
                </div>
              </div>

              <img @click="showWindow('11')" class="cursor-pointer opacity-60 hover:opacity-100 absolute z-10"
                   style="left: 76.5547%; top: 42.84722222222222%; width: 2.5vw;" src="/images/map/Generic_Camp.png"
                   alt="Generic_Camp">
              <img @click="showWindow('8')" class="cursor-pointer opacity-60 hover:opacity-100 absolute z-10"
                   style="left: 65.646875%; top: 23.0806%; width: 2.5vw;" src="/images/map/Generic_Camp.png"
                   alt="Generic_Camp">
              <img @click="showWindow('13')" class="cursor-pointer opacity-60 hover:opacity-100 absolute z-10"
                   style="left: 49.6406%; top: 66.75%; width: 2.5vw;" src="/images/map/Generic_Camp.png"
                   alt="Generic_Camp">
              <img @click="showWindow('1')" class="cursor-pointer opacity-60 hover:opacity-100 absolute z-10"
                   style="left: 35.347%; top: 18.5556%; width: 2.5vw;" src="/images/map/Generic_Camp.png"
                   alt="Generic_Camp">

              <img class="cursor-pointer opacity-60 hover:opacity-100 absolute z-10"
                   style="left: 45.35%; top: 60.0278%; width: 2.75vw;" src="/images/map/Generic_Poi_Large.png"
                   alt="Generic_Poi_Large">

              <img class="cursor-pointer opacity-60 hover:opacity-100 absolute z-10"
                   style="left: 78.4688%; top: 32%; width: 2vw;" src="/images/map/Generic_Poi_Small.png"
                   alt="Generic_Poi_Small">
              <img class="cursor-pointer opacity-60 hover:opacity-100 absolute z-10"
                   style="left: 74.2625%; top: 41.458333333333336%; width: 2vw;" src="/images/map/Generic_Poi_Small.png"
                   alt="Generic_Poi_Small">
              <img class="cursor-pointer opacity-60 hover:opacity-100 absolute z-10"
                   style="left: 62.45%; top: 42%; width: 2vw;" src="/images/map/Generic_Poi_Small.png"
                   alt="Generic_Poi_Small">
              <img class="cursor-pointer opacity-60 hover:opacity-100 absolute z-10"
                   style="left: 54.5891%; top: 28.7222%; width: 2vw;" src="/images/map/Generic_Poi_Small.png"
                   alt="Generic_Poi_Small">
              <img class="cursor-pointer opacity-60 hover:opacity-100 absolute z-10"
                   style="left: 52.46562500000001%; top: 82.84722222222223%; width: 2vw;"
                   src="/images/map/Generic_Poi_Small.png" alt="Generic_Poi_Small">
              <img class="cursor-pointer opacity-60 hover:opacity-100 absolute z-10"
                   style="left: 17.1921875%; top: 26.2778%; width: 2vw;" src="/images/map/Generic_Poi_Small.png"
                   alt="Generic_Poi_Small">

              <img @click="showWindow('16')" class="cursor-pointer opacity-60 hover:opacity-100 absolute z-10"
                   style="left: 61.99687499999999%; top: 82.63888888888889%; width: 3.5vw;"
                   src="/images/map/Generic_Chapel.png" alt="Generic_Chapel">
              <img @click="showWindow('6')" class="cursor-pointer opacity-60 hover:opacity-100 absolute z-10"
                   style="left: 48.7453125%; top: 34.86111111111111%; width: 3.5vw;"
                   src="/images/map/Generic_Chapel.png" alt="Generic_Chapel">

              <img @click="showWindow('9')" class="cursor-pointer opacity-60 hover:opacity-100 absolute z-10"
                   style="left: 67.565625%; top: 29.0139%; width: 2.5vw;" src="/images/map/Generic_Tower.png"
                   alt="Generic_Tower">
              <img @click="showWindow('15')" class="cursor-pointer opacity-60 hover:opacity-100 absolute z-10"
                   style="left: 44.05%; top: 84.26388888888889%; width: 2.5vw;" src="/images/map/Generic_Tower.png"
                   alt="Generic_Tower">
              <img @click="showWindow('3')" class="cursor-pointer opacity-60 hover:opacity-100 absolute z-10"
                   style="left: 28.6203125%; top: 29.8444%; width: 2.5vw;" src="/images/map/Generic_Tower.png"
                   alt="Generic_Tower">

              <img @click="showWindow('7')" class="cursor-pointer opacity-60 hover:opacity-100 absolute z-10"
                   style="left: 59.0234%; top: 43.5472%;; width: 3vw;" src="/images/map/Generic_Town_Large.png"
                   alt="Generic_Town_Large">
              <img @click="showWindow('2')" class="cursor-pointer opacity-60 hover:opacity-100 absolute z-10"
                   style="left: 44.075%; top: 16.9194%;; width: 3vw;" src="/images/map/Generic_Town_Large.png"
                   alt="Generic_Town_Large">

              <img @click="showWindow('10')" class="cursor-pointer opacity-60 hover:opacity-100 absolute z-10"
                   style="left: 67.6171875%; top: 49.0556%; width: 3.5vw;" src="/images/map/Generic_Town_Small.png"
                   alt="Generic_Town_Small">
              <img @click="showWindow('5')" class="cursor-pointer opacity-60 hover:opacity-100 absolute z-10"
                   style="left: 45.4344%; top: 33.22%; width: 3.5vw;" src="/images/map/Generic_Town_Small.png"
                   alt="Generic_Town_Small">
              <img @click="showWindow('12')" class="cursor-pointer opacity-60 hover:opacity-100 absolute z-10"
                   style="left: 42.4609%; top: 65.1667%; width: 3.5vw;" src="/images/map/Generic_Town_Small.png"
                   alt="Generic_Town_Small">
              <img @click="showWindow('4')" class="cursor-pointer opacity-60 hover:opacity-100 absolute z-10"
                   style="left: 33.5016%; top: 37.3889%;; width: 3.5vw;" src="/images/map/Generic_Town_Small.png"
                   alt="Generic_Town_Small">
              <img @click="showWindow('14')" class="cursor-pointer opacity-60 hover:opacity-100 absolute z-10"
                   style="left: 24.4453125%; top: 83.47222222222223%; width: 3.5vw;"
                   src="/images/map/Generic_Town_Small.png" alt="Generic_Town_Small">
            </div>
          </div>
        </div>
      </div>

      <top-bar></top-bar>
      <favourites></favourites>

      <casino></casino>
      <faucet></faucet>
      <staking></staking>
      <delegate></delegate>
      <governance></governance>
      <jenny-mines></jenny-mines>

      <harmons></harmons>

      <div id="modals">
        <window name="1" width="90%" height="70%">
          <div class="flex flex-wrap py-2 px-3">
            <div class="w-4/5">
              <div class="text-xl">Projar Camp</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="hideWindow('1')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <p class="w-full mt-4">
              This small camp near the coast of Projar is secluded from the kingdom of Freyala. Not much is known
              besides that Projar, who was a former member of the monarch, is supposedly living out the rest of his days
              as a fisherman here.
            </p>
          </div>
        </window>
        <window name="2" width="90%" height="70%">
          <div class="flex flex-wrap py-2 px-3">
            <div class="w-4/5">
              <div class="text-xl">Everglen</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="hideWindow('2')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <p class="w-full mt-4">
              Closely monitored by the monarch, Everglen is the primary residence for the Freyfolk. The village elder,
              Zarius, and his council reside in the town of Everglen. Despite growing tensions between Zarius and
              Carroway, the regent is still seen to occasionally visit for business matters.
            </p>
          </div>
        </window>
        <window name="3" width="90%" height="70%">
          <div class="flex flex-wrap py-2 px-3">
            <div class="w-4/5">
              <div class="text-xl">Everglen Outpost</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="hideWindow('3')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <p class="w-full mt-4">
              The Everglen Outpost is reserved for the regent’s royal guards only, and any curious members of the
              Freyfolk near the outpost are killed on sight. Many prized possessions, relics and weapons are stored
              here, ready to be used in the event of an emergency.
            </p>
          </div>
        </window>
        <window name="4" width="90%" height="70%">
          <div class="flex flex-wrap py-2 px-3">
            <div class="w-4/5">
              <div class="text-xl">Xyara Keep</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="hideWindow('4')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <p class="w-full mt-4">
              Named after the regent’s daughter, Xyara Keep watches over the Beacon of Light and was created as a way to
              pay tribute to Xyara. No one, not even Carroway’s closest allies or family, have been allowed near the
              keep without his express permission.
            </p>
          </div>
        </window>
        <window name="5" width="90%" height="70%">
          <div class="flex flex-wrap py-2 px-3">
            <div class="w-4/5">
              <div class="text-xl">Yang Lair</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="hideWindow('5')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <p class="w-full mt-4">
              Home to the Yang faction, this small town fairly exceeds the technological and economic development of any
              other, with the use of XYA as a valuable building resource. Violence is strictly forbidden unless
              absolutely necessary for Yang.
            </p>
          </div>
        </window>
        <window name="6" width="90%" height="70%">
          <div class="flex flex-wrap py-2 px-3">
            <div class="w-4/5">
              <div class="text-xl">Everglen Castle</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="hideWindow('6')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <p class="w-full mt-4">
              The Everglen Castle, also known as the Monarch’s Castle, is where all of the monarch’s operations are
              planned. Insides lies the stability crystal, which is a tool used to determine the volatility of XYA’s
              ore. However, much like the Beacon of Light, Regent Carroway has prohibited everyone from accessing the
              stability crystal.
            </p>
          </div>
        </window>
        <window name="7" width="90%" height="70%">
          <div class="flex flex-wrap py-2 px-3">
            <div class="w-4/5">
              <div class="text-xl">Ardenia</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="hideWindow('7')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <p class="w-full mt-4">
              Ardenia is a plentiful town populated by mostly farmers, sourcing a large portion of the produce and crops
              for the Freyala kingdom. Ardenia is known to be a safe haven that welcomes people from all walks of life.
              There are rumors that magical creatures reside in the village.
            </p>
          </div>
        </window>
        <window name="8" width="90%" height="70%">
          <div class="flex flex-wrap py-2 px-3">
            <div class="w-4/5">
              <div class="text-xl">Lightside Barracks</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="hideWindow('8')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <p class="w-full mt-4">
              Ever since the Law of Glory was formed, every family was required to send their firstborn child to the
              Lightside Barracks. These children are meticulously trained in the event of a war, with only a select few
              being chosen every year to serve as the regent’s royal guards.
            </p>
          </div>
        </window>
        <window name="9" width="90%" height="70%">
          <div class="flex flex-wrap py-2 px-3">
            <div class="w-4/5">
              <div class="text-xl">Temple of Litha</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="hideWindow('9')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <p class="w-full mt-4">
              Every delinquent and deserter from the Lightside army would be sent to the Temple of Litha. Everyone who
              set foot into the temple would emerge as a new, enlightened person, who would obediently obey every
              command from the monarch.
            </p>
          </div>
        </window>
        <window name="10" width="90%" height="70%">
          <div class="flex flex-wrap py-2 px-3">
            <div class="w-4/5">
              <div class="text-xl">Payne's Shack</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="hideWindow('10')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <p class="w-full mt-4">
              Known to be the first of the Freyfolk to come across XYA, Payne’s crew were praised by the Freyfolk and
              promised riches by the regent. However, rumors of their whereabouts quickly spread after their
              disappearance, and this shack has since been abandoned with no signs of its former inhabitants
            </p>
          </div>
        </window>
        <window name="11" width="90%" height="70%">
          <div class="flex flex-wrap py-2 px-3">
            <div class="w-4/5">
              <div class="text-xl">Rowe's Camp</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="hideWindow('11')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <p class="w-full mt-4">
              Home to Rowe’s merry band of scouts, this campsite lies on the outskirts of the Ardent plains beside the
              legendary Fræy tree. Rowe and his men were known for their skills in procuring rare items, often embarking
              on dangerous expeditions, but only for the right price
            </p>
          </div>
        </window>
        <window name="12" width="90%" height="70%">
          <div class="flex flex-wrap py-2 px-3">
            <div class="w-4/5">
              <div class="text-xl">Muraspire</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="hideWindow('12')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <p class="w-full mt-4">
              Muraspire is a desolate town with nameless people that have no life, hope or future. There have been
              numerous disappearances and mysterious deaths, with many speculating this is due to experiments conducted
              by Regent Carraway
            </p>
          </div>
        </window>
        <window name="13" width="90%" height="70%">
          <div class="flex flex-wrap py-2 px-3">
            <div class="w-4/5">
              <div class="text-xl">Ranspire Pavilion</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="hideWindow('13')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <p class="w-full mt-4">
              The former regent, Ranspire, was brutally killed during the Gulch Wars. After the construction of the
              Gulch Wall to block off Cymoru, his family now reside in this pavilion and are not to be disturbed, as per
              Regent Carroway’s orders.
            </p>
          </div>
        </window>
        <window name="14" width="90%" height="70%">
          <div class="flex flex-wrap py-2 px-3">
            <div class="w-4/5">
              <div class="text-xl">Luderia Refuge</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="hideWindow('14')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <p class="w-full mt-4">
              Outside of the main city walls, the Luderia Refuge is home to many bandits and outcasts that frequently
              partake in the renown Luderion games. The founder of Luderion is also reportedly staying at the refuge,
              but their identity remains unknown to this day
            </p>
          </div>
        </window>
        <window name="15" width="90%" height="70%">
          <div class="flex flex-wrap py-2 px-3">
            <div class="w-4/5">
              <div class="text-xl">Crimson Dungeon</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="hideWindow('15')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <p class="w-full mt-4">
              The Crimson Dungeon, which are remnants of what was once a glorious castle from the Gulch Wars, now serves
              as a prison for those accused of treason to live out a slow and sufferable death.
            </p>
          </div>
        </window>
        <window name="16" width="90%" height="70%">
          <div class="flex flex-wrap py-2 px-3">
            <div class="w-4/5">
              <div class="text-xl">Yin Lair</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="hideWindow( '16')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <p class="w-full mt-4">
              Formerly known as Halisor Lair, this small town was taken over by the Yin faction. Believing that XYA
              should be used to its utmost potential, members of the Yin faction have utilized body augmentation
              technology with the mystical ore to enhance their strength, speed and power. Many believe that a war may
              be brewing…
            </p>
          </div>
        </window>
      </div>

      <div id="tutorial">
        <window name="tutorial" height="auto">
          <div v-if="tutorialWindow === 1" class="flex flex-wrap py-2 px-3">
            <div class="w-4/5">
              <div class="text-xl">WELCOME TO FREYALA!</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="hideWindow('tutorial')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <p class="w-full mt-4">
              This app showcases the world of Freyala, allowing easy access to different decentralized applications and
              features in our ecosystem. Explore what Freyala has to offer with ease and uncover hidden lore.
            </p>
            <div class="flex w-full mt-8 mb-2">
              <div class="w-1/2 pr-2">
                <button type="button"
                        class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                        @click="skipOrEnd()">
                  Skip
                </button>
              </div>
              <div class="w-1/2 pl-2">
                <button type="button"
                        class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                        @click="tutorialWindow = 2">
                  Next
                </button>
              </div>
            </div>
          </div>
          <div v-if="tutorialWindow === 2" class="flex flex-wrap py-2 px-3">
            <div class="w-4/5">
              <div class="text-xl">WALLET BALANCE</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="hideWindow('tutorial')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <p class="w-full mt-4">
              On the top bar of the screen is information about your wallet. You can view your XYA balance, your amount
              of XYA tokens staked and your unclaimed staking rewards. This is based on the wallet connected to the app,
              not the device you are using.
            </p>
            <div class="flex w-full mt-8 mb-2">
              <div class="w-1/2 pr-2">
                <button type="button"
                        class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                        @click="tutorialWindow = 1">
                  Previous
                </button>
              </div>
              <div class="w-1/2 pl-2">
                <button type="button"
                        class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                        @click="tutorialWindow = 3">
                  Next
                </button>
              </div>
            </div>
          </div>
          <div v-if="tutorialWindow === 3" class="flex flex-wrap py-2 px-3">
            <div class="w-4/5">
              <div class="text-xl">MAIN LOCATIONS</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="hideWindow('tutorial')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <p class="w-full mt-4">
              Hovering over any main location will automatically highlight it. Each location has lore and a function,
              like staking in the Extraction Site or using our faucet in the Soup Kitchen. You can also favorite up to
              four different locations, which will be located in the bottom left of your screen for easy access.
            </p>
            <div class="flex w-full mt-8 mb-2">
              <div class="w-1/2 pr-2">
                <button type="button"
                        class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                        @click="tutorialWindow = 2">
                  Previous
                </button>
              </div>
              <div class="w-1/2 pl-2">
                <button type="button"
                        class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                        @click="tutorialWindow = 4">
                  Next
                </button>
              </div>
            </div>
          </div>
          <div v-if="tutorialWindow === 4" class="flex flex-wrap py-2 px-3">
            <div class="w-4/5">
              <div class="text-xl">MINOR LOCATIONS</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="hideWindow('tutorial')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <p class="w-full mt-4">
              Small building icons, also known as minor locations, can be found all over the map. While these minor
              locations are not decentralized apps, they each provide small pieces of lore when clicked that help bring
              together the story of Freyala.
            </p>
            <div class="flex w-full mt-8 mb-2">
              <div class="w-1/2 pr-2">
                <button type="button"
                        class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                        @click="tutorialWindow = 3">
                  Previous
                </button>
              </div>
              <div class="w-1/2 pl-2">
                <button type="button"
                        class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                        @click="skipOrEnd()">
                  Finish
                </button>
              </div>
            </div>
          </div>
        </window>
      </div>

      <div id="wallet-connected">
        <window name="walletConnected" width="90%" height="auto">
          <div class="flex flex-wrap py-2 px-3">
            <div class="w-4/5">
              <div class="text-xl">Connection failed</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="hideWindow('walletConnected')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <p class="w-full mt-4">
              Please connect your MetaMask wallet to the Freyala world.
            </p>
            <div class="flex w-full mt-8 mb-2">
              <div class="w-full">
                <button type="button"
                        class="w-full rounded-none border border-yellow bg-transparent hover:bg-yellow hover:text-brown px-4 py-2 min-h-12"
                        @click="connectWallet()">
                  Connect!
                </button>
              </div>
            </div>
          </div>
        </window>
      </div>

      <div id="chain-wrong">
        <window name="chainWrong" width="90%" height="auto">
          <div class="flex flex-wrap py-2 px-3">
            <div class="w-4/5">
              <div class="text-xl">Wrong network!</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="hideWindow('chainWrong')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <p class="w-full mt-4">
              Please connect to the Harmony Shard 0 network.

              <br>
              <br>

              For more information about connecting to the Harmony chain visit the harmony docs.

              <br>
              <br>

              <a href="https://docs.harmony.one/home/network/wallets/browser-extensions-wallets/metamask-wallet" style="word-break: break-all" target="_blank">
                https://docs.harmony.one/home/network/wallets/browser-extensions-wallets/metamask-wallet
              </a>
            </p>
          </div>
        </window>
      </div>

      <div id="logo" class="absolute" style="top: 15px; left: 15px; z-index: 99999999">
        <a href="https://www.freyala.com/" target="_blank">
          <img class="w-8 -mt-1" src="/images/XYA.png" alt="XYA logo">
        </a>
      </div>
    </main>
  </div>
</template>

<script>
import topBar from './TopBar';
import favourites from './Favourites';
import casino from './Locations/Casino/Index';
import faucet from './Locations/Faucet';
import staking from './Locations/Staking';
import delegate from './Locations/Delegating';
import governance from './Locations/Governance';
import jennyMines from './Locations/JennyMines';
import harmons from './Harmons/Index';

import Panzoom from '@panzoom/panzoom'

import wallet from '../../../plugins/wallet';
import {mapGetters} from "vuex";

export default {
  name: 'WorldMap',
  mixins: [wallet],
  data() {
    return {
      window: undefined,
      tutorialWindow: 1
    }
  },
  components: {
    topBar,
    favourites,
    casino,
    faucet,
    staking,
    delegate,
    jennyMines,
    governance,
    harmons
  },
  computed: {
    ...mapGetters([
      'chainID',
      'chainStatus',
      'loggedIn',
      'walletConnected',
      'firstTime'
    ])
  },
  watch: {
    walletConnected() {
      if (this.chainStatus === 'wrong') {
        this.$modal.show('chainWrong')
      }

      if (this.walletConnected === false && this.chainStatus === 'correct') {
        this.$modal.show('walletConnected')
      }

      if (this.walletConnected === true)
      {
        this.$modal.hide('walletConnected')
      }
    }
  },
  async mounted() {
    const elem = document.getElementById('world-map')
    const panzoom = Panzoom(elem, {
      maxScale: 10,
      minScale: 2,
      startScale: 5,
      contain: 'outside'
    })
    elem.parentElement.addEventListener('wheel', panzoom.zoomWithWheel)


    await this.connectWallet();

    if (this.chainStatus === 'wrong') {
      this.$modal.show('chainWrong')
    }

    if (this.walletConnected === false && this.chainStatus === 'correct') {
      this.$modal.show('walletConnected')
    }

    if (this.firstTime === true) {
      this.$modal.show('tutorial')
    }
  },
  methods: {
    skipOrEnd() {
      this.$modal.hide('tutorial')
      localStorage.firstTime = false;
    },
    hideWindow(window) {
      this.window = undefined
      this.$modal.hide(window)
    },
    showWindow(window) {
      this.window = window
      this.$modal.show(window)
    },
    onInit: function (panzoomInstance, id) {
      panzoomInstance.setTransformOrigin(null)
    }
  }
}
</script>

<style>
body {
  overflow: hidden;
  margin: 0;
}

div {
  padding: 0;
  border: 0;
  outline: 0;
}

.slide-in {
  padding: 2em 3em;
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  background: #ddd;
  height: 100%;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
  transition: all 0.5s ease-in-out;
}

/* before the element is shown, start off the screen to the right */
.slide-enter, .slide-leave-active {
  right: -100%;
}

.close-btn {
  border: none;
  font-weight: bold;
  font-size: 2em;
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.5em;
}

/* General styles unrelated to slide in */
body {
  font-family: 'Mulish', sans-serif;
}

.toggle {
  margin: 1em;
}

button {
  padding: .5em 1em;
  border-radius: 3em;
  font-size: 1.1em;
}

h1 {
  font-weight: 200;
}

.outline-brown {
  text-shadow: -1px -1px 0 #211c17, 1px -1px 0 #211c17, -1px 1px 0 #211c17, 1px 1px 0 #211c17;
}

.vm--modal {
  --tw-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

  background: url("/images/ui/window-screen-bg.png") no-repeat;
  background-size: cover;

  border: 2px solid #74684b;
}
</style>
