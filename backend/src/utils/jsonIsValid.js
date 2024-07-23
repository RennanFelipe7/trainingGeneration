module.exports = function jsonIsValid(requiredKeys, inputJson){
    
    const hasAllRequiredKeys = requiredKeys.every(key => inputJson.hasOwnProperty(key));
    const hasNoExtraKeys = Object.keys(inputJson).every(key => requiredKeys.includes(key));
    const allKeysHaveValidValues = requiredKeys.every(key => inputJson[key] !== null && inputJson[key] !== undefined);
    
    return hasAllRequiredKeys && hasNoExtraKeys && allKeysHaveValidValues;
}