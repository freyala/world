export default {
    install(Vue, options) {
        const functions = {
            lerp: (x, y, a) => {
                if (y - x < 2) return y;
                return x * (1 - a) + y * a;
            },

            elasticOut: (x) => {
                const c4 = (2 * Math.PI) / 3;

                return x === 0 ?
                    0 :
                    x === 1 ?
                    1 :
                    Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
            }
        };

        Vue.prototype.$mathFunctions = functions
    }
}