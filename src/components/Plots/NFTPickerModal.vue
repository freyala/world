<template>
    <div class='fixed modal-overlay flex items-center justify-center top-0 bottom-0 right-0 left-0 bg-opacity-50 bg-dark w-full h-full' style='z-index: 9999'>
        <div class='w-6/12 h-4/5 rounded-xl flex flex-col justify-start bg-dark dark-panel'>
            <h2 class='text-white text-4xl opacity-80 text-center mt-6'>Plot Slot {{ slotNumber }}</h2>
            <div class='h-16 mt-4 w-8/10 mx-auto text-xl text-center'>
                Choose Collection
            </div>
            <div class='w-full h-3/5 p-6 flex justify-space-around'>
                <div class='w-4/12 h-full mx-6 dark-panel rounded-xl flex flex-col cursor-pointer' 
                 v-bind:class='{"opacity-25": !collection.active || collection.count === 0}' style='border: 1px solid #22222;' v-for='(collection, index) in collections' :key='index'>
                    <img class='rounded-xl w-full h-3/5' v-bind:src='collection.image' />
                    <div class='h-auto mt-6 text-center w-full text-white opacity-80 text-2xl'>
                            {{ collection.name }}
                    </div>
                    <p class='h-auto text-center w-full text-lg'>
                        ({{collection.count}})
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HRC721 from '../../plugins/artifacts/HRC721.json';
    import HRC20 from '../../plugins/artifacts/freyala.json';
    import FreyRegistry from '../../plugins/artifacts/freyRegistry.json';
    import fromExponential from "from-exponential";

    import {
        mapGetters
    } from "vuex";
    import {
        ethers
    } from "ethers";
    
    export default {
        name: "NFTPickerModal",

        props: {
            slotNumber: {
                type: Number,
                default: 1
            }
        },

        computed: {
            ...mapGetters(["metaMaskAccount", "metaMaskWallet"]),
        },

        data() {
            return {
                collections: [{
                        name: "Crypto Pigs",
                        address: "0xe5fd335819edb8da8395f8ec48beca747a0790ab",
                        count: 0,
                        image: "https://ipfs.io/ipfs/QmaacTD6EMZvJVkcVjNrzob58srQ88dxoSGNANDNeY6SY6",
                        active: true
                    },
                    {
                        name: "Frey",
                        address: "0xd9d6b8c7f63cc2f5d5df5f3a77b2f596a66230d2",
                        count: 0,
                        image: "https://frey.freyala.com/images/3820.png",
                        active: true
                    },
                    {
                        name: "Orcs",
                        address: "",
                        count: 0,
                        image: "https://frey.freyala.com/images/3820.png",
                        active: false
                    },
                ]
            }
        },

        async mounted() {
            for(let i = 0; i < this.collections.length; i++){
                if(!this.collections[i].active) continue;

                const contract = await new ethers.Contract(this.collections[i].address, HRC721.abi, this.metaMaskWallet.signer);
                const balance = await contract.balanceOf(this.metaMaskAccount);
                
                this.collections[i].count = balance * 1;
            }

            console.log("COLLECTIONS", this.collections);
        },
        methods: {

        },
    };
</script>