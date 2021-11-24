<template>
    <div>
        <div v-on:click='closeModal()' class='fixed top-0 bottom-0 right-0 left-0'
            style='background-color: rgba(0,0,0,0.5); z-index: z-50;'></div>
        <transition name="details">
            <div class='fixed bg-light rounded-2xl h-auto shadow-xl details-modal overflow-y-auto'
                style='border: 1px solid rgba(84, 182, 122, 1); z-index: 100'>
                <div class='w-full h-3/6 flex z-5'>
                    <div class='w-4/12 p-4 flex h-full'>
                        <img v-bind:src='image' class='w-full h-full rounded-xl' />
                    </div>
                    <div class='w-8/12 p-4 h-full'>
                        <slot name='header-content'>

                        </slot>
                    </div>
                </div>
                <div class='w-full p-4 h-auto'>
                    <div style='background-color: #151515' v-bind:class='{"rounded-b-none": expandAttributes}'
                        class='w-full p-4 flex items-center transition-colors h-10 rounded-xl border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white'>
                        <div v-on:click='expandAttributes = !expandAttributes'
                            class='w-full flex cursor-pointer'>
                            <h2 class='text-xl'>Attributes</h2>
                            <span class='ml-auto'>Expand</span>
                        </div>
                    </div>
                    <div v-if='expandAttributes' style='background-color: #151515'
                        class='flex flex-wrap rounded-xl rounded-t-none px-4 py-4 h-auto w-full'>
                        <div class='w-4/12 h-12 flex' v-for='(attribute, index) in item.attributes'
                            :key='index'>
                            <div class='w-9/12'>
                                {{ attribute.trait_type }}:
                            </div>
                            <div class='w-full text-white mt-1 text-sm'>
                                {{ attribute.value }}
                            </div>
                        </div>
                    </div>
                    <div style='background-color: #151515' v-bind:class='{"rounded-b-none": expandSales}'
                        class='w-full mt-4 p-4 flex items-center transition-colors h-10 rounded-xl border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white'>
                        <div v-on:click='expandSales = !expandSales' class='w-full flex cursor-pointer'>
                            <h2 class='text-xl'>Sale History</h2>
                            <span class='ml-auto'>Expand</span>
                        </div>
                    </div>
                    <div v-if='expandSales' style='background-color: #151515'
                        class='flex flex-wrap px-4 py-4 h-auto w-full rounded-xl rounded-t-none'>
                        <div class='w-full'>
                            No sales, ser.
                        </div>
                    </div>
                    <div style='background-color: #151515' v-bind:class='{"rounded-b-none": expandDetails}'
                        class='w-full p-4 flex items-center mt-4 transition-colors h-10 rounded-xl border border-primary-alt bg-transparent hover:bg-primary-alt hover:text-white'>
                        <div v-on:click='expandDetails = !expandDetails' class='w-full flex cursor-pointer'>
                            <h2 class='text-xl'>Details</h2>
                            <span class='ml-auto'>Expand</span>
                        </div>
                    </div>
                    <div v-if='expandDetails' style='background-color: #151515'
                        class='flex flex-wrap px-4 py-4 h-auto w-full rounded-xl rounded-t-none'>
                        <div class='w-full'>
                            No details, ser.
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>


<script>
    export default {
        name: 'MarketModal',
        props: {
            item: {
                type: Object,
                default: undefined
            },
            image: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                expandAttributes: false,
                expandSales: false,
                expandDetails: false
            };
        },
        methods: {
            onClick() {
                this.$emit('cardClick');
            },
            closeModal(){
                this.$emit('closeModal');
            }
        }
    }
</script>

<style>

</style>