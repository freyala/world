<template>
    <div v-on:click='$emit("click")' class="cursor-pointer mx-2 w-full flex h-full relative tmg-btn">
        <div class='w-8/10 h-full flex flex-col justify-center items-center'>
            <transition name='fade'>
                <img v-if='!attribute.loading' class="inline" width="100%" v-bind:src="getButtonImage(attribute.name)"
                    alt="Nap Button">
            </transition>
            <transition name='fade'>
                <img v-if='attribute.loading' class="inline fa-spin absolute" width="50%" src='/pigs/snout_dark.svg'
                    alt="Nap Button">
            </transition>
            <transition name='fade'>
                <p v-if='!attribute.loading && attribute.freeEvent' class='text-xs uppercase'>{{ attribute.freeEvent.name }}</p>
            </transition>
        </div>
        <div class='tmg-bar' v-bind:class='getFillBgColor(attribute)'>
            <div v-bind:style='getBarFillMeter(attribute)' class='tmg-bar-fill' v-bind:class='getFillColor(attribute)'>
            </div>
        </div>
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
            }
        },
        data() {
            return {};
        },
        mounted() {},
        methods: {
            ...mapGetters("exchange", ["getToken"]),
            ...mapActions("exchange", ["resetTokens", "goTo"]),

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
        border: 1px solid #FBCCDE;
        box-sizing: border-box;
        border-radius: 12px;
        margin: 0px 4px 0px px;
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
        border-radius: 6px;
        min-height: 90% !important;
    }

    @keyframes alert {
        0% {
            background-color: #ed6657 !important;
            background: linear-gradient(to bottom, #CECECE00 0%, #CECECE00 100%);
        }
    }
</style>