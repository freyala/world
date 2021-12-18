import AudioManagerComponent from '@/components/Plugins/AudioManager';

const AudioManager = {
    install(Vue, options) {
        const root = new Vue({
            data: {},
            render: createElement => createElement(AudioManagerComponent)
        })

        root.$mount(document.body.appendChild(document.createElement('div')));

        Vue.mixin({
            mounted() {}
        })

        Vue.prototype.$audio = root.$children[0]
    }
}

export default AudioManager;