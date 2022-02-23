const TimeStamper = {
    install(Vue, options) {

        Vue.mixin({})

        Vue.prototype.$timeStamper = function(milliseconds) {
            const seconds = milliseconds / 1000;
            const minutes = parseInt(seconds / 60);
            const hours = parseInt(minutes / 60);
            const days = parseInt(hours / 24);

            if(days > 0) return `~${days} day(s)`;
            if (hours > 0) return `~${hours} hour(s)`;
            if (minutes > 0) return `~${minutes} minute(s)`;
            if (minutes <= 0 && seconds > 0) return '< 1 m';

            return 'Ready';
        }
    }
}

export default TimeStamper;