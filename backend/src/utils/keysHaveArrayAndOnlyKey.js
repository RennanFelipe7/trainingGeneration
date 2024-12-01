module.exports = function keysHaveArrayAndOnlyKey(obj) {
    for (let key in obj) {
        const keys = Object.keys(obj[key]);
        if (keys.length !== 1 || keys[0] !== 'exercicios' || !Array.isArray(obj[key]['exercicios']) || obj[key]['exercicios'].some(item => Array.isArray(item)))  {
            return false;
        }
    }
    return true;
}
