<template>
    <div class='w-full h-full flex justify-start'>
        <div v-on:click='toggleVolume()'
            class='md:rounded-lg rounded-r-lg bg-dark text-xl flex items-center justify-center w-12 h-12 fade-icon'>
            <i v-if='$audio.fakeVolume === 0' class='fa fa-volume-off opacity-50'></i>
            <i v-else-if='$audio.fakeVolume <= 0.5' class='fa fa-volume-down'></i>
            <i v-else-if='$audio.fakeVolume <= 1' class='fa fa-volume-up'></i>
        </div>
        <div class='w-2/10 rounded text-center ml-2 h-full flex flex-col items-start justify-evenly'>
            <div v-on:click='changeVolume(1)' class='w-6 bg-dark rounded-t fade-icon'>
                <i class="fa text-xs fa-plus"></i>
            </div>
            <div v-on:click='changeVolume(-1)' class='w-6 bg-dark text-center rounded-b fade-icon'>
                <i class='fa text-xs fa-minus'></i>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AudioManagerInterface",
        props: {},
        mounted() {
        },
        methods: {
            toggleVolume() {
                this.$audio.toggleVolume();
            },
            
            changeVolume(direction){
                this.$audio.changeVolume(direction);
            }
        },
    };
</script>

<style scoped>
    .fade-icon {
        cursor: pointer;
    }

    .fade-icon:hover {
        transform: scale(1.05);
    }
</style>