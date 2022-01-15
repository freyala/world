<template>
    <div v-on:click='closeModal' class='fixed modal-overlay flex items-center justify-center top-0 bottom-0 right-0 left-0 bg-opacity-50 bg-dark w-full h-full'
        style='z-index: 9999'>
        <div v-if='!showCollection' class='w-6/12 h-auto py-12 rounded-xl flex flex-col justify-center items-center bg-dark dark-panel'>
            <h2 class='text-white text-4xl opacity-80 text-center'>Plot Slot {{ slotNumber }}</h2>
            <div class='h-16 mt-4 w-8/10 mx-auto text-xl text-center'>
                Choose Collection
            </div>
            <div class='w-full h-3/5 p-6 flex justify-space-around'>
                <div v-on:click='openCollectionTab(collection)'
                    class='w-4/12 h-full mx-6 dark-panel rounded-xl flex flex-col cursor-pointer'
                    v-bind:class='{"opacity-25": !collection.active || collection.count === 0}'
                    style='border: 1px solid #22222;' v-for='(collection, index) in collections' :key='index'>
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
        <div v-else class='w-6/12 h-auto py-2 rounded-xl flex flex-col justify-start items-center bg-dark dark-panel'>
            <h2 class='text-white text-4xl opacity-80 text-center mt-6'>Plot Slot {{ slotNumber }}</h2>
            <div class='w-full h-20 relative flex items-center'>
                <i v-on:click='closeCollectionTab()'
                    class='absolute left-12 fa fa-arrow-left cursor-pointer text-3xl'></i>
                <h2 class='text-3xl w-full text-center'>Your {{ currentCollection.name }}'s</h2>
            </div>
            <div class="w-8/10 rounded-xl p-4 mb-6 dark-panel">
                <select class="p-1 cursor-pointer xya-input rounded-xl text-lg" style='width: 100%' name="neighbourhood"
                    id="neighbourhood-select" v-model="selectedNFT">
                    <option v-for="(nft, index) in currentCollection.userNFTs" :value="index" :key='index'>
                        {{currentCollection.name}} - {{ resolveTokenId(nft) }}</option>
                </select>
            </div>
            <div
                class='w-8/10 h-72 flex flex-row justify-center items-center overflow-y-hidden overflow-x-hidden dark-panel rounded-xl relative mb-2'>
                <div class='h-72 w-full flex flex-row justify-start items-center'>
                    <img v-if='currentNFT' class='rounded-xl w-4/12 mx-4 h-5/5' v-bind:src='currentNFT.image' />
                    <div class='w-7/12 h-4/5 items-start flex flex-col'>
                        <h2 class='text-3xl'>{{ currentCollection.name }}</h2>
                        <hr class='w-full opacity-30' />
                        <p class='text-xl mt-2 text-white opacity-80'>Bonus - Katana</p>
                        <p class='text-xl mt-2'>+3 Plot Defense</p>
                    </div>
                </div>
            </div>
            <div class='w-8/10 mt-10 h-20 flex flex-row justify-end items-center'>
                <p v-on:click='$emit("close")' class='w-3/10 text-xl opacity-80 hover:text-white cursor-pointer text-center mx-4'>
                    Cancel
                </p>
                <p class='w-3/10 xya-btn2 text-center'>
                    Confirm
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import HRC721 from '../../plugins/artifacts/HRC721.json';

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
                showCollection: false,
                currentCollection: undefined,
                selectedNFT: 0,
                currentNFT: undefined,
                userNFTs: [],
                collections: [{
                        name: "Crypto Pig",
                        address: "0xe5fd335819edb8da8395f8ec48beca747a0790ab",
                        count: 0,
                        image: "https://ipfs.io/ipfs/QmaacTD6EMZvJVkcVjNrzob58srQ88dxoSGNANDNeY6SY6",
                        active: true,
                        metadata: "https://api.cryptopigs.one/meta/list?items=",
                        userNFTs: []
                    },
                    {
                        name: "Frey",
                        address: "0xd9d6b8c7f63cc2f5d5df5f3a77b2f596a66230d2",
                        count: 0,
                        image: "https://frey.freyala.com/images/3820.png",
                        active: true,
                        metadata: "https://frey.freyala.com/meta/list?items=",
                        userNFTs: []
                    },
                    {
                        name: "Orcs",
                        address: "",
                        count: 0,
                        image: "https://frey.freyala.com/images/3820.png",
                        active: false,
                        metadata: "",
                        userNFTs: []
                    },
                ]
            }
        },

        async mounted() {
            for (let i = 0; i < this.collections.length; i++) {
                if (!this.collections[i].active) continue;

                const contract = await new ethers.Contract(this.collections[i].address, HRC721.abi, this
                    .metaMaskWallet.signer);
                const balance = await contract.balanceOf(this.metaMaskAccount);
                const tokens = await contract.tokensOfOwner(this.metaMaskAccount);

                let ids = tokens.map((token) => token * 1);

                this.collections[i].userNFTs = await this.fetchUserNFTs(this.collections[i].metadata, ids);
                this.collections[i].count = balance * 1;
            }

            this.currentCollection = this.collections[0];
        },

        watch: {
            selectedNFT(newVal) {
                if (this.currentCollection.userNFTs.length === 0) return;
                const currentNFT = this.currentCollection.userNFTs[newVal];
                this.currentNFT = currentNFT;
                console.log(currentNFT);
            }
        },

        methods: {
            async fetchUserNFTs(metadataApi, ids) {
                try {
                    const userNFTs = await this.$http.get(`${metadataApi}${ids}`);
                    return userNFTs.data;
                } catch (err) {
                    return [];
                }
            },

            resolveTokenId(nft) {
                if (nft["tokenId"]) return nft["tokenId"];
                if (nft["id"]) return nft["id"];
                return "";
            },

            openCollectionTab(collection) {
                if (collection.count <= 0) return;
                this.currentNFT = collection.userNFTs[0];
                this.currentCollection = collection;
                this.showCollection = true;
            },

            closeCollectionTab() {
                this.currentCollection = undefined;
                this.showCollection = false;
            },

            closeModal(event){
                if(event.target.classList.contains('modal-overlay')){
                    this.$emit('close');
                }
            }
        },
    };
</script>