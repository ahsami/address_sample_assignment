
export default class GlobalUtils {
    static get_random_num(start, end, dec = 0) {
        const range = end - start
        return parseFloat(((Math.random() * range) + start).toFixed(dec))
    }
}
