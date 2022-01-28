<template>
    <div v-on:click='closeModal'
        class='fixed modal-overlay flex items-center justify-center top-0 bottom-0 right-0 left-0 bg-opacity-50 bg-dark w-full h-full'
        style='z-index: 9999'>
        <div v-if='!showCollection'
            class='xl:w-6/12 w-10/12 sm:h-auto h-72 py-6 rounded-xl flex flex-col justify-start items-center bg-dark dark-panel'>
            <h2 class='text-white lg:text-4xl sm:text-3xl text-xl opacity-80 text-center mt-1'>Plot Slot {{ slotNumber }}</h2>
            <div class='h-16 lg:mt-4 w-8/10 mx-auto lg:text-xl sm:text-base text-xs text-center'>
                Choose Collection
            </div>
            <div class='w-full h-3/5 sm:px-6 px-2 flex mb-6'>
                <div v-on:click='openCollectionTab(collection)'
                    class='w-4/12 h-full lg:mx-6 mx-2 sm:pb-0 pb-2 dark-panel rounded-xl flex flex-col cursor-pointer justify-center'
                    v-bind:class='{"opacity-25": !collection.active || collection.count === 0}'
                    style='border: 1px solid #22222;' v-for='(collection, index) in getCollections' :key='index'>
                    <img class='rounded-xl w-full h-3/5' v-lazy='collection.image' />
                    <div class='sm:h-12 h-10 mt-6 text-center w-full text-white opacity-80 lg:text-2xl sm:text-xl text-xs'>
                        {{ collection.name }}
                    </div>
                    <p class='sm:h-12 h-12 text-center w-full sm:text-lg text-xs'>
                        ({{collection.count}})
                    </p>
                </div>
            </div>
        </div>
        <div v-else
            class='xl:w-6/12 w-10/12 h-auto py-2 pb-6 rounded-xl flex flex-col justify-start items-center bg-dark dark-panel'>
            <h2 class='text-white lg:text-4xl sm:text-3xl text-xl opacity-80 text-center mt-6'>Plot Slot {{ slotNumber }}</h2>
            <div class='w-full lg:h-20 h-12 lg:mb-0 mb-4 relative flex items-center'>
                <i v-on:click='closeCollectionTab()'
                    class='absolute left-12 fa fa-arrow-left cursor-pointer sm:text-3xl text-lg'></i>
                <h2 class='lg:text-3xl sm:text-xl text-sm w-full text-center'>Your {{ currentCollection.name }}'s</h2>
            </div>
            <div class="sm:w-8/10 w-9/10 rounded-xl p-4 mb-6 dark-panel">
                <select class="p-1 cursor-pointer xya-input rounded-xl sm:text-lg text-sm" style='width: 100%' name="neighbourhood"
                    v-model="selectedNFT">
                    <option v-for="(nft, index) in currentCollection.userNFTs" :value="index" :key='index'>
                        {{currentCollection.name}} - {{ resolveTokenId(nft) }}</option>
                </select>
            </div>
            <div
                class='sm:w-8/10 w-9/10 h-72 flex flex-row justify-center items-center overflow-y-hidden overflow-x-hidden dark-panel rounded-xl relative mb-2'>
                <div class='h-auto w-full flex sm:flex-row flex-col justify-center items-center sm:overflow-y-hidden overflow-y-scroll'>
                    <img v-if='currentNFT' class='rounded-xl lg:4-/12 sm:w-5/12 w-6/12 mx-4 h-5/5 my-4' v-lazy='currentNFT.image' />
                    <div class='w-7/12 h-4/5 sm:items-start items-center flex flex-col'>
                        <h2 class='lg:text-3xl sm:text-xl text-lg'>{{ currentCollection.name }}</h2>
                        <hr class='sm:w-9/10 w-full opacity-30' />
                        <p class='lg:text-xl text-base mt-2 text-white opacity-80'>Bonus</p>
                        <p v-for='(bonus, index) in currentBonuses' :key='index' class='lg:text-xl sm:text-base text-xs mt-2'>{{ bonus }}</p>
                    </div>
                </div>
            </div>
            <div v-if='approvedCollection' class='w-8/10 lg:mt-10 sm:mt-6 mt-2 h-auto flex flex-row justify-end items-center'>
                <p v-on:click='$emit("close")'
                    class='sm:w-3/10 w-5/10 lg:text-xl sm:text-lg text-base opacity-80 hover:text-white cursor-pointer text-center mx-4'>
                    Cancel
                </p>
                <p v-on:click='placeNFT(currentCollection.address, currentNFT, slotNumber)'
                    class='sm:w-3/10 w-5/10 lg:text-xl sm:text-lg text-sm xya-btn2 text-center'>
                    Confirm
                </p>
            </div>
            <div class='w-8/10 my-4 h-auto flex flex-col justify-center items-center' v-else>
                <p class='text-white text-start my-2 w-full opacity-60'>
                    In order to stake NFT's, the staking contract must be approved for the current NFT collection!
                </p>
                <p v-on:click='approveCurrentCollection(currentCollection)' class='w-4/10 xya-btn2 text-center'>
                    Approve Collection
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import HRC721 from '../../plugins/artifacts/HRC721.json';
    import plotBuffHandler from '../../plugins/artifacts/plotBuffHandler.json';

    import {
        ethers
    } from "ethers";
    import {
        mapGetters
    } from "vuex";

    export default {
        name: "NFTPickerModal",

        props: {
            slotNumber: {
                type: Number,
                default: 1
            },

            collections: {
                type: Array,
                default: []
            },

            operator: {
                type: String,
                default: ""
            }
        },

        computed: {
            ...mapGetters(["metaMaskAccount", "metaMaskWallet"]),

            getCollections() {
                if (this.slotNumber === 3) {
                    return this.collections.filter(c => c.special);
                } else return this.collections.filter(c => !c.special);
            }
        },

        data() {
            return {
                showCollection: false,
                approvedCollection: false,
                currentCollection: undefined,
                selectedNFT: 0,
                currentNFT: undefined,
                userNFTs: [],
                currentBonuses: [],
                buffHandlerContract: undefined,

                attributes: [
                    "Fertility",
                    "Level",
                    "Crime",
                    "Defense",
                ],

            }
        },

        async mounted() {
            this.buffHandlerContract = await new ethers.Contract(plotBuffHandler.address, plotBuffHandler.abi, this
                .metaMaskWallet.signer);
            this.currentCollection = this.collections[0];
        },

        watch: {
            async selectedNFT(newVal) {
                if (this.currentCollection.userNFTs.length === 0) return;
                const currentNFT = this.currentCollection.userNFTs[newVal];
                await this.getCurrentNFTModifiers(currentNFT);
                this.currentNFT = currentNFT;
            }
        },

        methods: {
            placeNFT(address, currentNFT, slotNumber) {
                this.$emit("confirm", {
                    address: address,
                    tokenId: this.resolveTokenId(currentNFT),
                    slotNumber: slotNumber
                })
            },

            async getCurrentNFTModifiers(currentNFT) {
                const modifiers = await this.buffHandlerContract.getAssetModifierValues(this.currentCollection
                    .address, this.resolveTokenId(currentNFT));
                const attributes = modifiers[1];
                const values = modifiers[2];
                this.currentBonuses = [];
                for (let i = 0; i < 4; i++) {
                   if(i >= attributes.length || i >= values.length) return;
                   if(values[i] * 1 === 0) continue;

                   this.currentBonuses.push(`+${values[i] * 1} ${this.attributes[attributes[i] * 1]}`)
                }
            },

            createLoaderToast(message) {
                let toastId = Date.now();
                let toast = this.$toast(message, {
                    timeout: 0,
                    closeButton: "button",
                    icon: "fa fa-gear fa-spin",
                    id: toastId
                });
                return toast;
            },

            async openCollectionTab(collection) {
                if (collection.count <= 0) return;
                const hrc721 = new ethers.Contract(collection.address, HRC721.abi, this.metaMaskWallet.signer);
                this.approvedCollection = await hrc721.isApprovedForAll(this.metaMaskAccount, this.operator);

                this.currentNFT = collection.userNFTs[0];
                this.currentCollection = collection;
                await this.getCurrentNFTModifiers(this.currentNFT);
                this.showCollection = true;
            },

            async approveCurrentCollection(collection) {
                const hrc721 = new ethers.Contract(collection.address, HRC721.abi, this.metaMaskWallet.signer);
                let toast = undefined;
                try {
                    const tx = await hrc721.setApprovalForAll(this.operator, true);
                    toast = this.createLoaderToast("Pending - Approving Collection");
                    await tx.wait(1);
                    this.$toast.success("Collection Approved");
                    this.approvedCollection = true;
                } catch (err) {
                    this.handleError(err);
                }
                this.$toast.dismiss(toast);
            },

            resolveTokenId(nft) {
                if (nft["tokenId"]) return nft["tokenId"];
                if (nft["id"]) return nft["id"];
                return "";
            },

            closeCollectionTab() {
                this.currentCollection = undefined;
                this.showCollection = false;
            },

            closeModal(event) {
                if (event.target.classList.contains('modal-overlay')) {
                    this.$emit('close');
                }
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
        },
    };
</script>