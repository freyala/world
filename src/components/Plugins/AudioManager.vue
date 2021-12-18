<template>
    <div>
        <audio :key='currentAudio' type='audio/mpeg' loop autoplay muted id='audio-player'>
            <source v-bind:src='getCurrentAudio(currentAudio)'>
        </audio>
    </div>
</template>

<script>
    export default {
        name: "AudioManager",
        props: {
            routeName: {
                type: String,
                default: "world-map"
            }
        },
        data() {
            return {
                fakeVolume: 1,
                volume: 1,
                volumeStep: 0.1,
                prevVolume: 1,
                currentAudio: undefined,

                isTransition: false,
                preFadeVolume: 0,
                transitionTimeout: undefined,

                audioMap: {
                    'world-map': 'Freya_Theme.mp3',
                    'casino': 'Luderion.mp3',
                    'marketplace': 'Marketplace.mp3'
                }
            };
        },
        mounted() {
            this.$nextTick(() => {
                if (!localStorage.volume) {
                    localStorage.volume = 1;
                } else this.volume = localStorage.volume * 1;
            });
        },
        methods: {
            play() {
                const audioPlayer = document.getElementById('audio-player');
                if (!audioPlayer) return;
                this.setPlayerVolume(this.volume);
                audioPlayer.play();
            },

            changeVolume(direction) {
                if (this.isTransition) return;
                this.volume += direction * this.volumeStep;
                this.volume = Math.max(0, Math.min(1, this.volume));
            },

            toggleVolume() {
                if (this.isTransition) return;
                const prevVolume = this.volume;
                this.volume = this.volume === 0 ? this.prevVolume : 0;
                this.prevVolume = prevVolume;
            },

            setPlayerVolume() {
                const audioPlayer = document.getElementById('audio-player');
                if (!audioPlayer) return;
                audioPlayer.volume = this.volume;

                if (!this.isTransition) {
                    localStorage.volume = this.volume;
                    this.fakeVolume = this.volume;
                }
            },

            getCurrentAudio(audio) {
                return `music/${audio}`;
            },

            setAudioForRoute(route) {
                for (const [key, value] of Object.entries(this.audioMap)) {
                    if (route.path.indexOf(key) > -1 || route.name.indexOf(key) > -1) {
                        if (value === this.currentAudio) return;
                        this.currentAudio = value;
                    }
                }
                if (!this.currentAudio) this.currentAudio = 'Freya_Theme.mp3';
            },

            setTransitionToRoute(route) {
                let nextAudio = undefined;
                clearInterval(this.transitionTimeout);

                for (const [key, value] of Object.entries(this.audioMap)) {
                    if (route.path.indexOf(key) > -1 || route.name.indexOf(key) > -1) {
                        if (value === this.currentAudio) return;
                        nextAudio = value;
                    }
                }
                if (!nextAudio) return;

                this.preFadeVolume = this.volume;
                this.isTransition = true;
                this.transitionTimeout = setInterval(() => {
                    if (this.volume <= 0) {
                        this.currentAudio = nextAudio;
                        this.volume = this.preFadeVolume;
                        this.setPlayerVolume();
                        
                        setTimeout(() => {
                            this.isTransition = false;
                            this.volume = this.preFadeVolume;
                            this.setPlayerVolume();
                            this.play();
                        }, 500);
                        clearInterval(this.transitionTimeout);
                    }
                    this.volume = Math.max(0, Math.min(1, this.volume - this.volumeStep / 2));
                }, 100);
            }
        },

        watch: {
            volume() {
                this.setPlayerVolume(this.volume);
            },
        }
    };
</script>

<style scoped>
    .fade-icon {
        background-color: rgba(34, 34, 34, 0.4);
        cursor: pointer;
        color: white;
    }

    .fade-icon:hover {
        transform: scale(1.05);
    }
</style>