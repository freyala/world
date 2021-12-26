const TimeStamper = {
    install(Vue, options) {

        Vue.mixin({})

        Vue.prototype.$timeStamper = function(milliseconds) {
            const seconds = milliseconds / 1000;
            const minutes = parseInt(seconds / 60);
            const hours = parseInt(minutes / 60);

            if (hours > 0) return `~${hours} hours`;
            if (minutes > 0) return `~${minutes} minutes`;
            if (minutes <= 0 && seconds > 0) return '< 1 m';

            return 'Ready';
        }
    }
}

export default TimeStamper;