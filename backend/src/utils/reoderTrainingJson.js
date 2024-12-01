module.exports = function reorderTrainingJson(inputJson) {
    const orderedDays = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"]
    const orderedJson = {};
    orderedDays.forEach(day => {
        if (inputJson[day]) {
            orderedJson[day] = {};
            const orderedProperties = ['nome', 'repeticoes', 'descanso'];
            orderedJson[day].exercicios = inputJson[day].exercicios.map(exercise => {
                return orderedProperties.reduce((accumulator, currentValue) => {                    
                    accumulator[currentValue] = exercise[currentValue];
                    return accumulator;
                }, {});
            });
        }
    });
    return orderedJson;
}
