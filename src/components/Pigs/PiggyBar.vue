<template>
    <div v-on:mouseleave='hideTooltip()' v-on:mouseover='showTooltip()' v-on:click='$emit("click")'
        class="cursor-pointer mx-1 sm:mx-2 md:w-auto sm:w-2/10 w-3/10 flex h-full relative tmg-btn z-50">
        <div class='w-8/10 h-full flex flex-col justify-center items-center'>
            <transition name='fade'>
                <img v-if='!attribute.loading' class="inline" width="100%" v-bind:src="getButtonImage(attribute.name)">
            </transition>
            <transition name='fade'>
                <img v-if='attribute.loading' class="inline fa-spin absolute" width="50%" src='/pigs/snout_dark.svg'>
            </transition>
            <transition name='fade'>
                <p v-if='!attribute.loading && attribute.freePowerUp' class='text-xs hidden sm:block opacity-75 uppercase'>
                    {{ attribute.freePowerUp.name }}</p>
            </transition>
        </div>
        <div class='tmg-bar' v-bind:class='getFillBgColor(attribute)'>
            <div v-bind:style='getBarFillMeter(attribute)' class='tmg-bar-fill' v-bind:class='getFillColor(attribute)'>
            </div>
        </div>
        <transition name='tooltip'>
            <div v-if='tooltip' style='width: 150%; height: 164px; left: calc(-25% - 2px)'
                class='absolute text-sm py-1 -top-44 w-full text-center z-50 bg-white rounded-xl pink-border-bottom shadow-lg'>
                <p class='mt-1 text-light opacity-75'>
                    {{attribute.name}}
                </p>
                <p class='mt-1 text-sm opacity-75'>
                    {{attribute.current}}/{{attribute.max}}
                </p>
                <p class='mt-1 text-light opacity-75'>
                    Cooldown
                </p>
                <p class='mt-1 text-sm opacity-75'>
                    {{ calculateCooldown(attribute.freePowerUp.cooldown) }}
                </p>
                <p class='mt-1 text-light opacity-75'>
                    Effect
                </p>
                <p class='mt-1 text-sm opacity-75'>
                    +{{attribute.freePowerUp.boostInitialisers[0].effect}}
                </p>
            </div>
        </transition>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from "vuex";

    export default {
        name: "PiggyBar",
        props: {
            attribute: {
                type: Object,
                default: undefined
            },
            tamagotchiContract: {
                type: Object,
                default: undefined
            }
        },
        data() {
            return {
                tooltipTimeout: undefined,
                tooltip: false
            };
        },
        mounted() {},
        methods: {
            showTooltip() {
                clearTimeout(this.tooltipTimeout);
                this.tooltipTimeout = setTimeout(() => {
                    this.tooltip = true;
                }, 300);
            },

            hideTooltip() {
                this.tooltip = false;
                clearTimeout(this.tooltipTimeout);
            },

            getButtonImage(name) {
                return `/pigs/${name}.svg`
            },

            getBarFillMeter(attribute) {
                const fill = Math.max(0, Math.min(1, attribute.current / attribute.max));
                return {
                    transform: `scaleY(${fill})`
                };
            },

            getFillColor(attribute) {
                const fillPercent = Math.min(1, attribute.current / attribute.max);
                const color = fillPercent > 0.5 ? 'green' : fillPercent > 0.25 ? 'yellow' : 'red';

                return `${color}-bar ${fillPercent < 0.25 ? "alert-fill" : ""}`;
            },

            getFillBgColor(attribute) {
                const fillPercent = Math.max(0, Math.min(1, attribute.current / attribute.max));
                const color = fillPercent > 0.5 ? 'green' : fillPercent > 0.25 ? 'yellow' : 'red';

                return `${color}-fill`;
            },

            calculateCooldown(cooldown){
                const seconds = cooldown / 1000;
                const minutes = parseInt(seconds / 60);
                const hours = parseInt(minutes / 60);

                if(hours > 0) return `~${hours} h`;
                if(minutes > 0) return `~${minutes} m`;
                if(minutes <= 0 && seconds > 0) return '< 1 m';
                return 'Ready';
            }
        },
    };
</script>

<style scoped>
    .tmg-btn {
        min-width: 96px;
        min-height: 96px;
        padding: 8px;

        background: white;
        box-sizing: border-box;
        border-radius: 12px;
        margin: 0px 4px 0px px;
    }


    @media only screen and (max-width: 512px) {
        .tmg-btn {

            min-width: 48px !important;
            min-height: 48px !important;
        }

        .tmg-btn img {
            height: 32px;
            width: 32px;
        }
    }

    .green-bar {
        background: linear-gradient(to bottom, #bbffe2 5%, #62C59A 5.5%, #62C59A 40.21%);

    }

    .yellow-bar {
        background: linear-gradient(to bottom, #fff1ce 5%, #EDC357 6%, #EDC357 40.21%);
    }

    .red-bar {
        background: linear-gradient(to bottom, #ffd2ce 5%, #ed6657 6%, #ed6657 40.21%);
    }

    .green-fill {
        background: linear-gradient(to bottom, #CECECE 9.47%, #62C59A86 40.21%);
    }


    .yellow-fill {
        background: linear-gradient(to bottom, #CECECE 9.47%, #EDC35786 40.21%);
    }


    .red-fill {
        background: linear-gradient(to bottom, #CECECE 9.47%, #ed665786 40.21%);
    }

    .no-fill {
        background-color: #CECECE;
    }

    .tmg-bar-fill {
        width: 100%;
        height: 100%;
        transform-origin: 0 100%;
        pointer-events: none;
        border-radius: 6px;
        transition: all 0.5s ease-out;
    }

    .alert-fill {
        animation: alert 0.5s infinite;
    }

    .tmg-bar {
        width: 10px;
        height: 100%;
        margin: 0px 4px 0px 2px;
        pointer-events: none;
        border-radius: 6px;
        min-height: 90% !important;
    }

    .tooltip-enter-active,
    .tooltip-leave-active {
        opacity: 1;
        transition: all .35s;
        transform: translateY(-0px);
    }

    .tooltip-enter,
    .tooltip-leave-to {
        opacity: 0;
        transform: translateY(20px);
    }

    @keyframes alert {
        0% {
            background-color: #ed6657 !important;
            background: linear-gradient(to bottom, #CECECE00 0%, #CECECE00 100%);
        }
    }
</style>