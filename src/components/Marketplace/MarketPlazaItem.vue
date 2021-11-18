<template>
    <div v-on:click='onClick()' class='card'>
        <div class='card-header'>
            <img v-bind:class='{"disabled-card": disabled}' src='data:image/jpeg;base64,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' />
        </div>
        <div class='px-1 card-body'>
            <div class='mt-2 w-full ml-2 mr-2 mb-1 flex opacity-50'>
                <div class='w-8/12'>The Frey's</div>
                <div class='w-4/12'>Price</div>
            </div>
            <div class='ml-2 w-full ml-2 mr-2 flex'>
                <div class='w-8/12'>The Frey #555</div>
                <div class='w-4/12 text-white'>100 XYA</div>
            </div>
            <div class='w-full mt-2 ml-2 mr-2 flex text-white opacity-50'>
                <div class='w-8/12 text-right mr-2 my-auto mt-1 text-xs'>Last </div>
                <div class='w-4/12'>10 XYA</div>
            </div>
        </div>
    </div>
</template>






<script>
export default {
    name: 'MarketNFTCard',
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
        width: 250px;
        height: 325px;
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

    .card-header{
        width: 100%;
        height: 55%;
    }

    .disabled-card{
        -webkit-filter: grayscale(100%);
        filter:grayscale(100%);
    }

    .card:after {
        position: absolute;
        content: '';
        z-index: 10;
        width: 200%;
        height: 100%;
        top: -90%;
        left: -20px;
        opacity: .1;
        transform: rotate(45deg);
        transition: .3s;
        background: linear-gradient(to top, transparent, #fff 15%, rgba(255, 255, 255, 0.25));
    }

    .card:hover:after {
        transform: rotate(25deg);
        top: -40%;
        opacity: .15;
    }

    .card:hover {
        box-shadow: 0 8px 16px 3px rgba(#000, .6);
        transform: translateY(-3px) scale(1.07) rotateX(15deg);
    }

    .card img {
        width: 100%;
        height: 100%;
        background-size: cover;
    }

    .card:hover .caption {
        transform: none;
    }
</style>