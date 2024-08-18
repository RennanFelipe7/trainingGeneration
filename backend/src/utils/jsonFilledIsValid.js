module.exports = function jsonFilledIsValid(requiredKeys, inputJson){
    let isValid = true; 
    for (let key in inputJson) {
        if(Array.isArray(inputJson[key].exercicios)){
            inputJson[key].exercicios.forEach(element => {
                const hasAllRequiredKeys = requiredKeys.every(keyInJson => element.hasOwnProperty(keyInJson));
                const hasNoExtraKeys = Object.keys(element).every(keyInJson => requiredKeys.includes(keyInJson));
                const allKeysHaveValidValues = Object.keys(element).every(keyInJson => 
                    element[keyInJson] !== null && element[keyInJson] !== undefined && element[keyInJson] !== ''
                );
                
                if(!(hasAllRequiredKeys && hasNoExtraKeys && allKeysHaveValidValues)){
                    isValid = false;
                }
            });
        }
    }
    return isValid;
}