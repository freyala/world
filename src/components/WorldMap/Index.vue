<template>
  <div id="wrapper">
    <main style="height: 100vh; position: relative">
      <div id="world-map">
        <div class="relative" style="cursor: grab">
          <img src="/images/map/world.png" alt="Xangaea worldmap">

          <!--          ICONS-->
          <div class="absolute w-full h-full" style="top: -1.5vw; left: -1.75vw;">
            <div class="relative w-full h-full">
              <img class="cursor-pointer absolute" style="left: 58.1063%; top: 8.9681%; width: 17vw"
                   src="/images/map/WallTop.png" alt="WallTop">
              <img class="cursor-pointer absolute" style="left: 49.8312%; top: 62.0653%; width: 8vw;"
                   src="/images/map/WallBottom.png" alt="WallBottom">

              <img class="cursor-pointer absolute" style="left: 41.2226%; top: 56.9306%; width: 10.6vw;"
                   src="/images/map/WallMid.png" alt="WallMid">

              <div @mouseenter="hovering = 'nft'" @mouseleave="hovering = ''">
                <router-link :to="{ name: 'frey-nft' }">
                  <img class="cursor-pointer opacity-90 hover:opacity-0 absolute"

                       style="left: 61.90625%; top: 27.395833333333336%; width: 6vw;" src="/images/map/Barracks.png"
                       alt="XangaeaPlots">
                  <div class="cursor-pointer opacity-0 hover:opacity-90 absolute"
                       style="left: 61.90625%; top: 27.395833333333336%; width: 6vw;">
                    <div class="relative">
                      <img class="w-full" src="/images/map/Barracks_MO.png" alt="XangaeaPlots">
                    </div>
                  </div>
                  <p :class="hovering === 'nft' ? 'md:opacity-90' : 'md:opacity-70'"
                     class="text-center bubble text-white absolute"
                     style="pointer-events: none; left: 62.90625%; top: 35.005833333333336%;">
                    Frey Barracks
                  </p>
                </router-link>
              </div>

              <div @mouseenter="hovering = 'marketplace'" @mouseleave="hovering = ''">
                <router-link :to="{ name: 'marketplace' }">
                  <img class="cursor-pointer opacity-90 hover:opacity-0 absolute"

                       style="left: 47.90625%; top: 49.895833333333336%; width: 5vw;" src="/images/map/Auction.png"
                       alt="XangaeaPlots">
                  <div class="cursor-pointer opacity-0 hover:opacity-90 absolute"
                       style="left: 47.90625%; top: 49.895833333333336%; width: 5vw;">
                    <div class="relative">
                      <img class="w-full" src="/images/map/Auction_MO.png" alt="XangaeaPlots">
                    </div>
                  </div>
                  <p :class="hovering === 'marketplace' ? 'md:opacity-90' : 'md:opacity-70'"
                     class="text-center bubble text-white absolute"
                     style="pointer-events: none; left: 48.70625%; top: 56.05833333333336%;">
                    Marketplace
                  </p>
                </router-link>
              </div>

              <div @mouseenter="hovering = 'plots'" @mouseleave="hovering = ''">
                <router-link :to="{ name: 'plots', params: {neighbourhood: '0'} }">
                  <img class="cursor-pointer opacity-90 hover:opacity-0 absolute"

                       style="left: 38.6171875%;top: 38.78472222222222%; width: 3vw;" src="/images/map/XangaeaPlots.png"
                       alt="XangaeaPlots">
                  <div class="cursor-pointer opacity-0 hover:opacity-90 absolute"
                       style="left: 38.6171875%;top: 38.78472222222222%; width: 3vw;">
                    <div class="relative">
                      <img class="w-full" src="/images/map/XangaeaPlots_MO.png" alt="XangaeaPlots">
                    </div>
                  </div>
                  <p :class="hovering === 'plots' ? 'md:opacity-90' : 'md:opacity-70'"
                     class="text-center bubble text-white absolute"
                     style="pointer-events: none; left: 38.2172%; top: 42.7847%;">
                    Plots of Land
                  </p>
                </router-link>
              </div>

              <div @mouseenter="hovering = 'delegate'" @mouseleave="hovering = ''">
                <router-link :to="{ name: 'delegating' }">
                  <img class="cursor-pointer opacity-90 hover:opacity-0 absolute"

                       style="left: 30.6719%;top: 36.139%; width: 4vw;" src="/images/map/Beacon.png" alt="Beacon">
                  <div class="cursor-pointer opacity-0 hover:opacity-90 absolute"
                       style="left: 30.6719%;top: 36.139%; width: 4vw;">
                    <div class="relative">
                      <img class="w-full" src="/images/map/Beacon_MO.png" alt="Beacon">
                    </div>
                  </div>
                  <p :class="hovering === 'delegate' ? 'md:opacity-90' : 'md:opacity-70'"
                     class="text-center bubble text-white absolute"
                     style="pointer-events: none; left: 30.1719%; top: 46.839%;">
                    Beacon of Light
                  </p>
                </router-link>
              </div>

              <div @mouseenter="hovering = 'harmons'" @mouseleave="hovering = ''">
                <router-link :to="{ name: 'sneak-peek' }">
                  <img class="cursor-pointer absolute" style="left: 80.6172%; top: 37.6319%; width: 7vw;"
                       src="/images/map/XangaeaTree.png" alt="XangaeaTree">
                  <div class="cursor-pointer opacity-0 hover:opacity-90 absolute"
                       style="left: 80.6172%; top: 37.6319%; width: 7vw;">
                    <div class="relative">
                      <img class="w-full" src="/images/map/XangaeaTree_MO.png" alt="XangaeaTree">
                    </div>
                  </div>
                  <p :class="hovering === 'harmons' ? 'md:opacity-100' : 'md:opacity-80'"
                     class="text-center bubble text-white absolute"
                     style="pointer-events: none; left: 82.3172%; top: 51.6319%">
                    Tree of Peek
                  </p>
                </router-link>
              </div>

              <div @mouseenter="hovering = 'faucet'" @mouseleave="hovering = ''">
                <router-link :to="{ name: 'faucet' }">
                  <img class="cursor-pointer opacity-90 hover:opacity-0 absolute"
                       style="left: 42.3555%; top: 51.1806%; width: 5vw;" src="/images/map/Soup.png" alt="Soup">
                  <div class="cursor-pointer opacity-0 hover:opacity-90 absolute"
                       style="left: 42.3555%; top: 51.1806%; width: 5vw;">
                    <div class="relative">
                      <img class="w-full" src="/images/map/Soup_MO.png" alt="XangaeaTree">
                    </div>
                  </div>
                  <p :class="hovering === 'faucet' ? 'md:opacity-90' : 'md:opacity-70'"
                     class="text-center bubble text-white absolute"
                     style="pointer-events: none; left: 44.0555%; top: 56.8806%">
                    Faucet
                  </p>
                </router-link>
              </div>

              <div @mouseenter="hovering = 'staking'" @mouseleave="hovering = ''">
                <router-link :to="{ name: 'staking' }">
                  <img class="cursor-pointer opacity-90 hover:opacity-0 absolute"
                       style="left: 71.0156%; top: 47.6111%; width: 4.54vw;" src="/images/map/Drill.png" alt="Drill">
                  <div class="cursor-pointer opacity-0 hover:opacity-90 absolute"
                       style="left: 71.0156%; top: 47.6111%; width: 4.54vw;">
                    <div class="relative">
                      <img class="w-full" src="/images/map/Drill_MO.png" alt="XangaeaTree">
                    </div>
                  </div>
                  <p :class="hovering === 'staking' ? 'md:opacity-90' : 'md:opacity-70'"
                     class="text-center bubble text-white absolute"
                     style="pointer-events: none; left: 71.2156%; top: 54.8111%">
                    Extractor
                  </p>
                </router-link>
              </div>

              <div @mouseenter="hovering = 'casino'" @mouseleave="hovering = ''">
                <router-link :to="{ name: 'casino' }">
                  <img class="cursor-pointer opacity-90 hover:opacity-0 absolute"
                       style="left: 38.3555%; top: 44.9792%; width: 5vw;" src="/images/map/Casino.png" alt="Casino">
                  <div class="cursor-pointer opacity-0 hover:opacity-90 absolute"
                       style="left: 38.3555%; top: 44.9792%; width: 5vw;">
                    <div class="relative">
                      <img class="w-full" src="/images/map/Casino_MO.png" alt="Casino">
                    </div>
                  </div>
                  <p :class="hovering === 'casino' ? 'md:opacity-90' : 'md:opacity-70'"
                     class="text-center bubble text-white absolute"
                     style="pointer-events: none; left: 38.555%; top: 51.9792%">
                    Luderion Casino
                  </p>
                </router-link>
              </div>

              <div @mouseenter="hovering = 'governance'" @mouseleave="hovering = ''">
                <router-link :to="{ name: 'governance' }">
                  <img class="cursor-pointer absolute" style="left: 41.8906%; top: 43.1389%; width: 6vw;"
                       src="/images/map/Palace.png" alt="Palace">
                  <div class="cursor-pointer opacity-0 hover:opacity-90 absolute"
                       style="left: 41.8906%; top: 43.1389%; width: 6vw;">
                    <div class="relative">
                      <img class="w-full" src="/images/map/Palace_MO.png" alt="Palace">
                    </div>
                  </div>
                  <p :class="hovering === 'governance' ? 'md:opacity-90' : 'md:opacity-70'"
                     style="pointer-events: none; left: 42.7906%; top: 50.1389%;"
                     class="text-center everglen bubble text-white absolute">
                    Governance
                  </p>
                </router-link>
              </div>

              <div @mouseenter="hovering = 'jennymines'" @mouseleave="hovering = ''">
                <router-link :to="{ name: 'jennymines' }">
                  <img class="cursor-pointer opacity-90 hover:opacity-0 absolute"
                       style="left: 81.8281%; top: 29.8611%; width: 3vw;" src="/images/map/Mine.png" alt="Mine">
                  <div class="cursor-pointer opacity-0 hover:opacity-90 absolute"
                       style="left: 81.8281%; top: 29.8611%; width: 3vw;">
                    <div class="relative">
                      <img class="w-full" src="/images/map/Mine_MO.png" alt="Mine">
                    </div>
                  </div>
                  <p :class="hovering === 'jennymines' ? 'md:opacity-90' : 'md:opacity-70'"
                     class="text-center bubble text-white absolute"
                     style="pointer-events: none; left: 81.4281%; top: 34.9611%">
                    Mine rewards
                  </p>
                </router-link>
              </div>


              <div @mouseenter="hovering = 'pigsty'" @mouseleave="hovering = ''">
                <router-link :to="{ name: 'pigs' }">
                  <img class="cursor-pointer opacity-90 hover:opacity-0 absolute"
                       style="left: 64.4281%; top: 40%; width: 5vw;" src="/images/map/Pigsty.png" alt="Pigsty">
                  <div class="cursor-pointer opacity-0 hover:opacity-90 absolute"
                       style="left: 64.4281%; top: 40%; width: 5vw;">
                    <div class="relative">
                      <img class="w-full" src="/images/map/Pigsty_MO.png" alt="Pigsty">
                    </div>
                  </div>
                  <p :class="hovering === 'pigsty' ? 'md:opacity-90' : 'md:opacity-70'"
                     class="text-center bubble text-white absolute"
                     style="pointer-events: none; left: 65.8281%; top: 45.6611%">
                    Pigsty
                  </p>
                </router-link>
              </div>

              <div>
                <img @click="showWindow('11')" class="cursor-pointer opacity-60 hover:opacity-90 absolute z-10"
                     style="left: 76.5547%; top: 42.84722222222222%; width: 2.5vw;" src="/images/map/Generic_Camp.png"
                     alt="Generic_Camp">
                <img @click="showWindow('8')" class="cursor-pointer opacity-60 hover:opacity-90 absolute z-10"
                     style="left: 65.646875%; top: 23.0806%; width: 2.5vw;" src="/images/map/Generic_Camp.png"
                     alt="Generic_Camp">
                <img @click="showWindow('13')" class="cursor-pointer opacity-60 hover:opacity-90 absolute z-10"
                     style="left: 49.6406%; top: 66.75%; width: 2.5vw;" src="/images/map/Generic_Camp.png"
                     alt="Generic_Camp">
                <img @click="showWindow('1')" class="cursor-pointer opacity-60 hover:opacity-90 absolute z-10"
                     style="left: 35.347%; top: 18.5556%; width: 2.5vw;" src="/images/map/Generic_Camp.png"
                     alt="Generic_Camp">

                <img class="cursor-pointer opacity-60 hover:opacity-90 absolute z-10"
                     style="left: 45.35%; top: 60.0278%; width: 2.75vw;" src="/images/map/Generic_Poi_Large.png"
                     alt="Generic_Poi_Large">

                <img class="cursor-pointer opacity-60 hover:opacity-90 absolute z-10"
                     style="left: 78.4688%; top: 32%; width: 2vw;" src="/images/map/Generic_Poi_Small.png"
                     alt="Generic_Poi_Small">
                <img class="cursor-pointer opacity-60 hover:opacity-90 absolute z-10"
                     style="left: 74.2625%; top: 41.458333333333336%; width: 2vw;"
                     src="/images/map/Generic_Poi_Small.png"
                     alt="Generic_Poi_Small">
                <img class="cursor-pointer opacity-60 hover:opacity-90 absolute z-10"
                     style="left: 62.45%; top: 42%; width: 2vw;" src="/images/map/Generic_Poi_Small.png"
                     alt="Generic_Poi_Small">
                <img class="cursor-pointer opacity-60 hover:opacity-90 absolute z-10"
                     style="left: 54.5891%; top: 28.7222%; width: 2vw;" src="/images/map/Generic_Poi_Small.png"
                     alt="Generic_Poi_Small">
                <img class="cursor-pointer opacity-60 hover:opacity-90 absolute z-10"
                     style="left: 52.46562500000001%; top: 82.84722222222223%; width: 2vw;"
                     src="/images/map/Generic_Poi_Small.png" alt="Generic_Poi_Small">
                <img class="cursor-pointer opacity-60 hover:opacity-90 absolute z-10"
                     style="left: 17.1921875%; top: 26.2778%; width: 2vw;" src="/images/map/Generic_Poi_Small.png"
                     alt="Generic_Poi_Small">

                <img @click="showWindow('16')" class="cursor-pointer opacity-60 hover:opacity-90 absolute z-10"
                     style="left: 61.99687499999999%; top: 82.63888888888889%; width: 3.5vw;"
                     src="/images/map/Generic_Chapel.png" alt="Generic_Chapel">
                <img @click="showWindow('6')" class="cursor-pointer opacity-60 hover:opacity-90 absolute z-10"
                     style="left: 48.7453125%; top: 34.86111111111111%; width: 3.5vw;"
                     src="/images/map/Generic_Chapel.png" alt="Generic_Chapel">

                <img @click="showWindow('9')" class="cursor-pointer opacity-60 hover:opacity-90 absolute z-10"
                     style="left: 67.565625%; top: 29.0139%; width: 2.5vw;" src="/images/map/Generic_Tower.png"
                     alt="Generic_Tower">
                <img @click="showWindow('15')" class="cursor-pointer opacity-60 hover:opacity-90 absolute z-10"
                     style="left: 44.05%; top: 84.26388888888889%; width: 2.5vw;" src="/images/map/Generic_Tower.png"
                     alt="Generic_Tower">
                <img @click="showWindow('3')" class="cursor-pointer opacity-60 hover:opacity-90 absolute z-10"
                     style="left: 28.6203125%; top: 29.8444%; width: 2.5vw;" src="/images/map/Generic_Tower.png"
                     alt="Generic_Tower">

                <img @click="showWindow('7')" class="cursor-pointer opacity-60 hover:opacity-90 absolute z-10"
                     style="left: 59.0234%; top: 43.5472%;; width: 3vw;" src="/images/map/Generic_Town_Large.png"
                     alt="Generic_Town_Large">
                <img @click="showWindow('2')" class="cursor-pointer opacity-60 hover:opacity-90 absolute z-10"
                     style="left: 44.075%; top: 16.9194%;; width: 3vw;" src="/images/map/Generic_Town_Large.png"
                     alt="Generic_Town_Large">

                <img @click="showWindow('10')" class="cursor-pointer opacity-60 hover:opacity-90 absolute z-10"
                     style="left: 67.6171875%; top: 49.0556%; width: 3.5vw;" src="/images/map/Generic_Town_Small.png"
                     alt="Generic_Town_Small">
                <img @click="showWindow('5')" class="cursor-pointer opacity-60 hover:opacity-90 absolute z-10"
                     style="left: 45.4344%; top: 33.22%; width: 3.5vw;" src="/images/map/Generic_Town_Small.png"
                     alt="Generic_Town_Small">
                <img @click="showWindow('12')" class="cursor-pointer opacity-60 hover:opacity-90 absolute z-10"
                     style="left: 42.4609%; top: 65.1667%; width: 3.5vw;" src="/images/map/Generic_Town_Small.png"
                     alt="Generic_Town_Small">
                <img @click="showWindow('4')" class="cursor-pointer opacity-60 hover:opacity-90 absolute z-10"
                     style="left: 33.5016%; top: 37.3889%;; width: 3.5vw;" src="/images/map/Generic_Town_Small.png"
                     alt="Generic_Town_Small">
                <img @click="showWindow('14')" class="cursor-pointer opacity-60 hover:opacity-90 absolute z-10"
                     style="left: 24.4453125%; top: 83.47222222222223%; width: 3.5vw;"
                     src="/images/map/Generic_Town_Small.png" alt="Generic_Town_Small">
              </div>
            </div>
          </div>
        </div>
      </div>

      <top-bar></top-bar>

      <div class='absolute mb-8 md:top-36 top-32 left-0 md:ml-12 ml-0 w-auto md:mt-4'>
        <AudioManagerInterface></AudioManagerInterface>
      </div>
      <div v-if="claimableDrop > 0 || claimableUsdc > 0">
        <button class="absolute bottom-0 left-0 mb-4 ml-4 md:mb-8 md:ml-8 w-auto xya-btn">
          <div @click="$modal.show('drop')">
            CLAIM DROP
          </div>
        </button>
        <button class="absolute left-0 mb-4 ml-4 md:mb-8 md:ml-8 w-auto xya-btn" style="bottom: 50px">
          <a href="https://docs.freyala.com/freyala" target="_blank">
            PROJECT INFO
          </a>
        </button>
      </div>
      <div v-else>

        <button class="absolute bottom-0 left-0 mb-4 ml-4 md:mb-8 md:ml-8 w-auto xya-btn">
          <a href="https://docs.freyala.com/freyala" target="_blank">
            PROJECT INFO
          </a>
        </button>
      </div>

      <div id="modals">
        <window name="1" width="80%">
          <div class="flex flex-wrap p-6 bg-dark h-full">
            <div class="w-4/5">
              <div class="text-2xl">Projar Camp</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="hideWindow('1')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <p class="w-full mt-4">
              This small camp near the coast of Projar is secluded from the kingdom of Xangaea. Not much is known
              besides that Projar, who was a former member of the monarch, is supposedly living out the rest of his days
              as a fisherman here.
            </p>
          </div>
        </window>
        <window name="2" width="80%">
          <div class="flex flex-wrap p-6 bg-dark h-full">
            <div class="w-4/5">
              <div class="text-2xl">Everglen</div>
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
        <window name="3" width="80%">
          <div class="flex flex-wrap p-6 bg-dark h-full">
            <div class="w-4/5">
              <div class="text-2xl">Everglen Outpost</div>
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
        <window name="4" width="80%">
          <div class="flex flex-wrap p-6 bg-dark h-full">
            <div class="w-4/5">
              <div class="text-2xl">Xyara Keep</div>
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
        <window name="5" width="80%">
          <div class="flex flex-wrap p-6 bg-dark h-full">
            <div class="w-4/5">
              <div class="text-2xl">Yang Lair</div>
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
        <window name="6" width="80%">
          <div class="flex flex-wrap p-6 bg-dark h-full">
            <div class="w-4/5">
              <div class="text-2xl">Everglen Castle</div>
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
        <window name="7" width="80%">
          <div class="flex flex-wrap p-6 bg-dark h-full">
            <div class="w-4/5">
              <div class="text-2xl">Ardenia</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="hideWindow('7')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <p class="w-full mt-4">
              Ardenia is a plentiful town populated by mostly farmers, sourcing a large portion of the produce and crops
              for the Xangaea kingdom. Ardenia is known to be a safe haven that welcomes people from all walks of life.
              There are rumors that magical creatures reside in the village.
            </p>
          </div>
        </window>
        <window name="8" width="80%">
          <div class="flex flex-wrap p-6 bg-dark h-full">
            <div class="w-4/5">
              <div class="text-2xl">Lightside Barracks</div>
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
        <window name="9" width="80%">
          <div class="flex flex-wrap p-6 bg-dark h-full">
            <div class="w-4/5">
              <div class="text-2xl">Temple of Litha</div>
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
        <window name="10" width="80%">
          <div class="flex flex-wrap p-6 bg-dark h-full">
            <div class="w-4/5">
              <div class="text-2xl">Payne's Shack</div>
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
        <window name="11" width="80%">
          <div class="flex flex-wrap p-6 bg-dark h-full">
            <div class="w-4/5">
              <div class="text-2xl">Rowe's Camp</div>
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
        <window name="12" width="80%">
          <div class="flex flex-wrap p-6 bg-dark h-full">
            <div class="w-4/5">
              <div class="text-2xl">Muraspire</div>
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
        <window name="13" width="80%">
          <div class="flex flex-wrap p-6 bg-dark h-full">
            <div class="w-4/5">
              <div class="text-2xl">Ranspire Pavilion</div>
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
        <window name="14" width="80%">
          <div class="flex flex-wrap p-6 bg-dark h-full">
            <div class="w-4/5">
              <div class="text-2xl">Luderia Refuge</div>
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
        <window name="15" width="80%">
          <div class="flex flex-wrap p-6 bg-dark h-full">
            <div class="w-4/5">
              <div class="text-2xl">Crimson Dungeon</div>
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
        <window name="16" width="80%">
          <div class="flex flex-wrap p-6 bg-dark h-full">
            <div class="w-4/5">
              <div class="text-2xl">Yin Lair</div>
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
        <window name="tutorial" height="auto" width="80%">
          <div v-if="tutorialWindow === 1" class="flex flex-wrap p-6 bg-dark h-full">
            <div class="w-4/5">
              <div class="text-2xl">WELCOME TO XANGAEA!</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="hideWindow('tutorial')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <p class="w-full mt-4">
              This app showcases the world of Xangaea, allowing easy access to different decentralized applications and
              features in our ecosystem. Explore what Xangaea has to offer with ease and uncover hidden lore.
            </p>
            <div class="flex w-full mt-8 mb-2">
              <div class="w-1/2 pr-2">
                <button type="button"
                        class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12"
                        @click="skipOrEnd()">
                  Skip
                </button>
              </div>
              <div class="w-1/2 pl-2">
                <button type="button"
                        class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12"
                        @click="tutorialWindow = 2">
                  Next
                </button>
              </div>
            </div>
          </div>
          <div v-if="tutorialWindow === 2" class="flex flex-wrap p-6 bg-dark h-full">
            <div class="w-4/5">
              <div class="text-2xl">WALLET BALANCE</div>
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
                        class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12"
                        @click="tutorialWindow = 1">
                  Previous
                </button>
              </div>
              <div class="w-1/2 pl-2">
                <button type="button"
                        class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12"
                        @click="tutorialWindow = 3">
                  Next
                </button>
              </div>
            </div>
          </div>
          <div v-if="tutorialWindow === 3" class="flex flex-wrap p-6 bg-dark h-full">
            <div class="w-4/5">
              <div class="text-2xl">MAIN LOCATIONS</div>
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
                        class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12"
                        @click="tutorialWindow = 2">
                  Previous
                </button>
              </div>
              <div class="w-1/2 pl-2">
                <button type="button"
                        class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12"
                        @click="tutorialWindow = 4">
                  Next
                </button>
              </div>
            </div>
          </div>
          <div v-if="tutorialWindow === 4" class="flex flex-wrap p-6 bg-dark h-full">
            <div class="w-4/5">
              <div class="text-2xl">MINOR LOCATIONS</div>
            </div>
            <div class="w-1/5 text-right">
              <i @click="hideWindow('tutorial')" class="fas fa-times cursor-pointer text-xl"></i>
            </div>
            <p class="w-full mt-4">
              Small building icons, also known as minor locations, can be found all over the map. While these minor
              locations are not decentralized apps, they each provide small pieces of lore when clicked that help bring
              together the story of Xangaea.
            </p>
            <div class="flex w-full mt-8 mb-2">
              <div class="w-1/2 pr-2">
                <button type="button"
                        class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12"
                        @click="tutorialWindow = 3">
                  Previous
                </button>
              </div>
              <div class="w-1/2 pl-2">
                <button type="button"
                        class="w-full rounded-none border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-brown px-4 py-2 min-h-12"
                        @click="skipOrEnd()">
                  Finish
                </button>
              </div>
            </div>
          </div>
        </window>

        <window @before-open="beforeDropModalOpen()" height='10%' width='80%' name='drop'>
          <div class="flex flex-wrap justify-center p-6 px-12 bg-dark h-full">
            <div class="w-full text-center">
              <div class="sm:text-3xl text-xl">Claimable drop</div>
            </div>
            <div class="absolute right-6">
              <i @click="$modal.hide('drop')"
                 class="fas fa-times cursor-pointer sm:text-xl text-base sm:mt-0 mt-1"></i>
            </div>
            <hr class='w-full my-4'/>

            <div class="mt-4 flex md:flex-row flex-row w-full items-start justify-start">

              Claimable xya: {{ claimableDrop }} XYA

            </div>

            <div class="mt-4 flex md:flex-row flex-row w-full items-start justify-start">
              <input class='w-full text-black px-2 rounded-lg' type="number" v-model='tokensToClaim'/>
              <div class="text-right md:text-center md:w-9/12 w-5/12 mx-2 md:mx-0">
                <button v-if="!claimingDrop" v-on:click="claimDrop()" type="button"
                        class="w-full md:w-10/12 md:text-base text-sm rounded-lg border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-2 mx-2 py-0">
                  <span>Claim</span>
                </button>

                <button v-else type="button"
                        class="w-full md:w-10/12 md:text-base text-sm rounded-lg border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-2 mx-2 py-0">
                  <span>Claiming</span>
                </button>
              </div>
            </div>

            <hr class='w-full my-4'/>

            <div class="mt-4 flex md:flex-row flex-row w-full items-start justify-start">

              Claimable usdc: {{ claimableUsdc }} USDC

            </div>

            <div class="mt-4 flex md:flex-row flex-row w-full items-start justify-start">
              <input class='w-full text-black px-2 rounded-lg' type="number" v-model='usdcToClaim'/>
              <div class="text-right md:text-center md:w-9/12 w-5/12 mx-2 md:mx-0">
                <button v-if="!claimingUsdc" v-on:click="claimUsdc()" type="button"
                        class="w-full md:w-10/12 md:text-base text-sm rounded-lg border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-2 mx-2 py-0">
                  <span>Claim</span>
                </button>

                <button v-else type="button"
                        class="w-full md:w-10/12 md:text-base text-sm rounded-lg border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white px-2 mx-2 py-0">
                  <span>Claiming</span>
                </button>
              </div>
            </div>

          </div>
        </window>
      </div>
    </main>
  </div>
</template>

<script>
import topBar from './TopBar';
import AudioManagerInterface from '../../components/Plugins/AudioManagerInterface.vue'
import wallet from '../../plugins/wallet';
import Panzoom from '@panzoom/panzoom'
import {mapGetters} from "vuex";
import {ethers} from "ethers";
import Xangaea from "../../plugins/artifacts/xangaea.json";
import Drop from "../../plugins/artifacts/slry.json";
import fromExponential from "from-exponential";

export default {
  name: 'WorldMap',
  mixins: [wallet],
  filters: {
    compressAddress(address) {
      if (address !== undefined) {
        return (
            address.substr(0, 10) +
            "..." +
            address.substr(address.length - 5, address.length)
        )
      }
    },
  },
  data() {
    return {
      claimingDrop: false,
      claimingUsdc: false,
      mainContract: undefined,
      dropContract: undefined,
      claimableDrop: 0,
      claimableUsdc: 0,
      tokensToClaim: 0,
      usdcToClaim: 0,
      event: {},
      window: undefined,
      hovering: '',
      tutorialWindow: 1,
      transactionHistory: [],
      finishedGettingTransactions: false
    }
  },
  components: {
    topBar,
    AudioManagerInterface
  },
  computed: {
    ...mapGetters([
      'firstTime',
      'metaMaskAccount',
      'metaMaskWallet'
    ])
  },
  created() {
    window.addEventListener("resize", this.editPanZoom);
  },
  destroyed() {
    window.removeEventListener("resize", this.editPanZoom);
  },
  async mounted() {
    this.mainContract = await new ethers.Contract(Xangaea.address, Xangaea.abi, this.metaMaskWallet.signer)
    this.dropContract = await new ethers.Contract(Drop.address, Drop.abi, this.metaMaskWallet.signer)

    const drop = (await this.dropContract.tokenAllowance(this.metaMaskAccount)) * 1
    const usdc = (await this.dropContract.usdcAllowance(this.metaMaskAccount)) * 1

    this.claimableDrop = drop / 1e18
    this.claimableUsdc = usdc / 1e6

    this.$nextTick(() => {
      const elem = document.getElementById('world-map')
      let panzoom = undefined

      if (window.innerWidth < 1024) {
        panzoom = Panzoom(elem, {
          maxScale: 10,
          minScale: 1,
          steps: 1,
          contain: 'outside',
          initialZoom: 1
        })
      } else {
        panzoom = Panzoom(elem, {
          maxScale: 10,
          minScale: 1,
          contain: 'outside',
          initialZoom: 1
        })
      }

      elem.parentElement.addEventListener('wheel', (e) => {
        const el = e.target.closest('#world-map');
        if (el && !el.length) {
          panzoom.zoomWithWheel(e)
        }
      })

      setTimeout(() => {
        panzoom.zoom(1, {animate: false})
      })

      if (this.firstTime === true) {
        this.$modal.show('tutorial')
      }
    });
  },
  methods: {
    editPanZoom() {
      const elem = document.getElementById('world-map')
      let panzoom = undefined

      if (window.innerWidth < 1024) {
        panzoom = Panzoom(elem, {
          maxScale: 10,
          minScale: 1,
          steps: 1,
          contain: 'outside'
        })
      } else {
        panzoom = Panzoom(elem, {
          maxScale: 10,
          minScale: 1,
          contain: 'outside'
        })
      }

      elem.parentElement.addEventListener('wheel', (e) => {
        if (!e.target.closest('#world-map').length) {
          panzoom.zoomWithWheel(e)
        }
      })

      setTimeout(() => {
        panzoom.zoom(1, {animate: false})
      })
    },
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
    },
    async claimDrop() {
      let actual = 0;

      if (this.tokensToClaim > 0) {
        actual = this.tokensToClaim * 10 ** 18;
      } else {
        actual = 0;
      }

      let toast = undefined;

      try {
        const arg = fromExponential(actual);
        const tx = await this.dropContract.withdrawToken(this.metaMaskAccount, arg)
        toast = this.createLoaderToast("Pending Transaction - Drop");

        this.claimingDrop = true
        await tx.wait(1);
        this.claimingDrop = false

        this.$toast.success("Drop successfully claimed")

        const drop = (await this.dropContract.tokenAllowance(this.metaMaskAccount)) * 1
        this.claimableDrop = drop / 1e18
      } catch (err) {
        this.handleError(err);
      }

      this.$toast.dismiss(toast)
    },
    async claimUsdc() {
      let actual = 0;

      if (this.usdcToClaim > 0) {
        actual = this.usdcToClaim * 10 ** 6;
      } else {
        actual = 0;
      }

      let toast = undefined;

      try {
        const arg = fromExponential(actual);
        const tx = await this.dropContract.withdrawUsdc(this.metaMaskAccount, arg)
        toast = this.createLoaderToast("Pending Transaction - Usdc");

        this.claimingUsdc = true
        await tx.wait(1);
        this.claimingUsdc = false

        this.$toast.success("Usdc successfully claimed")

        const usdc = (await this.dropContract.usdcAllowance(this.metaMaskAccount)) * 1
        this.claimableUsdc = usdc / 1e6
      } catch (err) {
        this.handleError(err);
      }

      this.$toast.dismiss(toast)
    },

    async beforeDropModalOpen() {
      const provider = new ethers.providers.WebSocketProvider(
          "wss://ws.s0.t.hmny.io/"
      );

      const contract = new ethers.Contract(Drop.address, Drop.abi, provider);

      const initialBlockNumber = 22398099
      const maxBlocks = 1024
      let blockNumber = await provider.getBlockNumber()

      while (
          blockNumber > initialBlockNumber
          ) {
        console.log(
            `loading events from block ${blockNumber} to ${blockNumber + maxBlocks}`
        );

        const events = await contract.queryFilter(
            contract.filters.MoneySent(this.metaMaskAccount),
            blockNumber,
            blockNumber + maxBlocks
        );

        events.map((event) => {
          const transaction = {
            _toAddress: event.args[0],
            _amount: (parseInt(event.args[1]) / 1e18),
            _blockNumber: event.blockNumber,
            _transactionHash: event.transactionHash
          }

          this.transactionHistory.push(transaction)
        })

        blockNumber -= maxBlocks
      }

      this.finishedGettingTransactions = true
    },

    createLoaderToast(message) {
      let toastId = Date.now();
      return this.$toast(message, {
        timeout: 0,
        closeButton: "button",
        icon: "fa fa-gear fa-spin",
        id: toastId
      });
    },

    handleError(error) {
      const errorMessage =
          typeof error == "object" ? error.message : error.toLowerCase();
      const lcMessage = errorMessage.toLowerCase();
      if (lcMessage.indexOf("user denied") > -1) return;
      if (lcMessage.indexOf("transaction failed") > -1) {
        this.$toast.error("Transaction Failed");
      } else if (errorMessage.length < 100) {
        this.$toast.error(errorMessage);
      } else {
        this.$toast.error('Transaction Failed');
      }
    },
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
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  background-color: #222222 !important;

  width: auto !important;
  max-width: 750px;
  margin-left: auto;
  margin-right: auto;
  transform: translate(-10vw, 0%);
  margin-top: -100px !important;
  height: auto !important;


  border-radius: 12px !important;
  border: 2px #54b67ac7 solid;
}
</style>
