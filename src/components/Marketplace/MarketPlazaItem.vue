<template>
    <div v-on:click='onClick()' class='market-item'>
        <slot name='header'></slot>
        <slot name='body'></slot>
        <slot name='footer'></slot>
    </div>
</template>



<script>
    export default {
        name: 'MarketNFTCard',
        props: {
            disabled: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {

            };
        },

        methods: {
            onClick() {
                if (this.disabled) return;
                this.$emit('cardClick');
            }
        }
    }
</script>

<style>
    .market-item {
        position: relative;
        width: 20vw;
        height: 40vh;

        max-height: 375px;
        max-width: 250px;
        box-shadow: 0 5px 10px rgba(#000, .8);
        transform-origin: center top;
        transform-style: preserve-3d;
        transform: translateZ(0);
        overflow: hidden;
        transition: .3s;
        border-radius: 6px;
        cursor: pointer;
        box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);
    }

    .market-item-header {
        width: 100%;
        height: 62.5%;
    }

    .market-item:after {
        position: absolute;
        content: '';
        z-index: 1;
        width: 200%;
        height: 100%;
        top: -90%;
        left: -20px;
        opacity: .1;
        transform: rotate(45deg);
        transition: .3s;
        background: linear-gradient(to top, transparent, rgb(197, 255, 214) 15%, rgba(255, 255, 255, 0.15));
        user-select: none;
        pointer-events: none;
    }

    .market-item:hover:after {
        transform: rotate(25deg);
        top: -40%;
        opacity: .15;
    }

    .market-item:hover {
        box-shadow: 0px 0px 36px rgba(0, 0, 0, 0.55);
        transform: translateY(-3px) rotateX(5deg);
    }

    .market-item img {
        border-radius: 12px;
        width: 100%;
        height: 100%;
        background-size: cover;
    }

    .market-item:hover .caption {
        transform: none;
    }
</style>