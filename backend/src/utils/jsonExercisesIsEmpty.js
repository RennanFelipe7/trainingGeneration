module.exports = function jsonExercisesIsEmpty(inputJson){
    let cont = 0;
    for (let key in inputJson) {
        if(Array.isArray(inputJson[key].exercicios)){
            if (inputJson[key].exercicios.length > 0){
                cont++
            };
        }else{
            if (inputJson[key] === null || inputJson[key] === undefined || inputJson[key] === '' || inputJson[key].length === 0) {
                cont = -7
            }
        }
    }
    if(cont <= 0){
        return true
    }else{
        return false
    }
}