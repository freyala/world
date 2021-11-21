<template>
    <div v-on:click='onClick()' class='card'>
        <img v-bind:class='{"disabled-card": disabled}' v-bind:src='image' />
        <div class='caption'>{{ caption }}</div>
    </div>
</template>






<script>
export default {
    name: 'MarketCard',
    props: {
        caption: {
            type: String,
            default: ''
        },
        image: {
            type: String,
            default: ''
        },
        disabled:{
            type: Boolean,
            default: false
        }
    },
    data() {
        return {

        };
    },
    methods:{
        onClick(){
            if(this.disabled) return;
            this.$emit('cardClick');
        }
    }
}
</script>

<style>
    .card {
        position: relative;
        width: 220px;
        height: 280px;
        box-shadow: 0 5px 10px rgba(#000, .8);
        transform-origin: center top;
        transform-style: preserve-3d;
        transform: translateZ(0);
        overflow: hidden;
        transition: .3s;
        border-radius: 6px;
        cursor: pointer;
        box-shadow: 0px 0px 36px rgba(0, 0, 0, 0.5);
    }

    .disabled-card{
        -webkit-filter: grayscale(100%);
        filter:grayscale(100%);
    }


    .card:hover {
        box-shadow: 0 8px 16px 3px rgba(#000, .6);
        transform: translateY(-3px) rotateX(0deg);
    }

    .card img {
        width: 100%;
        height: 100%;
        background-size: contain;
    }

    .caption {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 20px;
        padding-bottom: 10px;
        font-size: 20px;
        background: none;
        color: #fff;
        transition: .3s;
        z-index: 10;
        transform: translateY(100%);
        text-shadow: 3px 3px 6px #000;
    }

    .card:hover .caption {
        transform: none;
    }
</style>