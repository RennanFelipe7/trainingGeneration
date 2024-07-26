module.exports = function jsonTrainingGenerationIsEmpty(inputJson){
    for (let key in inputJson) {
        if (inputJson[key] === null || inputJson[key] === undefined || inputJson[key] === '' || inputJson[key].length === 0) {
            return true;
        }
    }
    return false;
}