module.exports = function jsonHasCorrectEntries(requiredKeys, inputJson) {
    let errorMessage = ''; 
    function validateTrainingInDay(element, index, day){

        let errorMessage = ''
        if (element.nome.length > 45) {
            errorMessage = errorMessage + `'nome' do exercício ${index + 1} no(a) ${day} não deve conter mais do que 45 caracteres. Valor recebido: ${element.nome}`;
        }
        if (typeof element.nome !== 'string') {
            errorMessage = errorMessage + `'nome' do exercício ${index + 1} no(a) ${day} deve ser uma string. Valor recebido: ${element.nome}`;
        }
        if (!Number.isInteger(element.repeticoes)) {
            errorMessage = errorMessage + `'repeticoes' do exercício ${index + 1} no(a) ${day} deve ser uma inteiro. Valor recebido: ${element.repeticoes}`;
        }
        if (element.repeticoes > 100) {
            errorMessage = errorMessage + `'repeticoes' do exercício ${index + 1} no(a) ${day} não deve ser maior que 100. Valor recebido: ${element.repeticoes}`;
        }
        if (element.repeticoes <= 0) {
            errorMessage = errorMessage + `'repeticoes' do exercício ${index + 1} no(a) ${day} deve ser maior que 0. Valor recebido: ${element.repeticoes}`;
        }
        if (element.descanso.length > 40) {
            errorMessage = errorMessage + `'descanso' do exercício ${index + 1} no(a) ${day} não deve conter mais do que 40 caracteres. Valor recebido: ${element.descanso}`;
        }
        if (typeof element.descanso !== 'string') {
            errorMessage = errorMessage + `'descanso' do exercício ${index + 1} no(a) ${day} deve ser uma string. Valor recebido: ${element.descanso}`;
        }
        
        return errorMessage
    }

    function validateKey(key, value) {
        switch (key) {
            case 'peso':
                if (typeof value !== 'number') {
                    return `'peso' deve ser um inteiro ou float e não uma string. Valor recebido: ${value}`;
                }else if(value <= 0){
                    return `'peso' deve ser um número maior que 0. Valor recebido: ${value}`
                }else if (value > 500){
                    return `'peso' deve ser um número menor ou igual a 500. Valor recebido: ${value}`
                }
                break;
            case 'biotipo_corporal':
                value = value.charAt(0).toLowerCase() + value.slice(1)
                if (value !== 'ectomorfo' && value !== 'endomorfo' && value !== 'mesomorfo') {
                    return `'biotipo_corporal' deve ser um dos valores: "ectomorfo" ou "endomorfo" ou "mesomorfo". Valor recebido: ${value}`;
                }
                break;
            case 'objetivos_do_treino':
                if (value.length > 10) {
                    return `'objetivos_do_treino' não deve conter mais do que 10 objetivos. quantidade de objetivos: ${value.length}`;
                }else if(value.some(item => typeof item !== 'string')){
                    return `'objetivos_do_treino' deve ser uma string. Valor recebido: ${value}`;
                }else if(value.some(item => item.length === 0)){
                    return `'objetivos_do_treino' deve ser uma string não vazia. Valor recebido: ${value}`;
                }else if(value.some(item => item.length > 50)){
                    return `'objetivos_do_treino' deve ser uma string de tamanho menor ou igual a 50 ${value}`;
                }
                break;
            case 'altura':
                if (typeof value !== 'number') {
                    return `'altura' deve ser um inteiro e não uma string. Valor recebido: ${value}`;
                }else if(value <= 0){
                    return `'altura' deve ser um número maior que 0. Valor recebido: ${value}`
                }else if (value > 250){
                    return `'altura' deve ser um número menor ou igual a 250. Valor recebido: ${value}`
                }else if(!Number.isInteger(value)){
                    return `'altura' deve ser um inteiro e não um float. Valor recebido: ${value}`;
                }
                break;
            case 'nivel_de_condicionamento_fisico':
                value = value.charAt(0).toLowerCase() + value.slice(1)
                console.log('BUG = ' + value);
                if (value !== 'iniciante' && value !== 'intermediário' && value !== 'avançado') {
                    return `'nivel_de_condicionamento_fisico' deve ser um dos valores: "iniciante" ou "intermediário" ou "avançado". Valor recebido: ${value}`;
                }
                break;
            case 'preferencias_de_exercicio':
                if (value.length > 10) {
                    return `'preferencias_de_exercicio' não deve conter mais do que 10 preferência. quantidade de preferência: ${value.length}`;
                }else if(value.some(item => typeof item !== 'string')){
                    return `'preferencias_de_exercicio' deve ser uma string. Valor recebido: ${value}`;
                }else if(value.some(item => item.length === 0)){
                    return `'preferencias_de_exercicio' deve ser uma string não vazia. Valor recebido: ${value}`;
                }else if(value.some(item => item.length > 50)){
                    return `'preferencias_de_exercicio' deve ser uma string de tamanho menor ou igual a 50 ${value}`;
                }
                break;
            case 'restricoes_de_saude':
                if (value.length > 10) {
                    return `'restricoes_de_saude' não deve conter mais do que 10 restrições. quantidade de restrições: ${value.length}`;
                }else if(value.some(item => typeof item !== 'string')){
                    return `'restricoes_de_saude' deve ser uma string. Valor recebido: ${value}`;
                }else if(value.some(item => item.length === 0)){
                    return `'restricoes_de_saude' deve ser uma string não vazia. Valor recebido: ${value}`;
                }else if(value.some(item => item.length > 50)){
                    return `'restricoes_de_saude' deve ser uma string de tamanho menor ou igual a 50 ${value}`;
                }
                break;
            case 'disponibilidade':
                if(value.some(item => typeof item !== 'string')){
                    return `'disponibilidade' deve ser uma string. Valor recebido: ${value}`;
                }else{
                    function lowercaseFirstLetter(array) {
                        return array.map(item => {
                            return item.charAt(0).toLowerCase() + item.slice(1);
                        });
                    }
                    value = lowercaseFirstLetter(value);
                    if(value.some(item => item !== 'segunda' && item !== 'terça' && item !== 'quarta' && item !== 'quinta' && item !== 'sexta' && item !== 'sábado' && item !== 'domingo')){
                        return `'disponibilidade' deve ser um ou mais dos valores: "segunda" ou "terça" ou "quarta" ou "quinta" ou "sexta" ou "sábado" ou "domingo". Valor recebido: ${value}`;
                    }
                    break;
                }
            case 'idade':
                if (typeof value !== 'number') {
                    return `'idade' deve ser um inteiro e não uma string. Valor recebido: ${value}`;
                }else if(value <= 0){
                    return `'idade' deve ser um número maior que 0. Valor recebido: ${value}`
                }else if (value > 120){
                    return `'idade' deve ser um número menor ou igual a 120. Valor recebido: ${value}`
                }else if(!Number.isInteger(value)){
                    return `'idade' deve ser um inteiro e não um float. Valor recebido: ${value}`;
                }
                break;
            case 'sexo':
                value = value.charAt(0).toLowerCase() + value.slice(1)
                if (value !== 'masculino' && value !== 'feminino') {
                    return `'sexo' deve ser um dos valores: "masculino" ou "feminino". Valor recebido: ${value}`;
                }
                break;
            case 'historico_de_lesoes':
                if (value.length > 10) {
                    return `'historico_de_lesoes' não deve conter mais do que 10 lesões. quantidade de lesões: ${value.length}`;
                }else if(value.some(item => typeof item !== 'string')){
                    return `'historico_de_lesoes' deve ser uma string. Valor recebido: ${value}`;
                }else if(value.some(item => item.length === 0)){
                    return `'historico_de_lesoes' deve ser uma string não vazia. Valor recebido: ${value}`;
                }else if(value.some(item => item.length > 50)){
                    return `'historico_de_lesoes' deve ser uma string de tamanho menor ou igual a 50 ${value}`;
                }
                break;
            case 'nome':
                if (typeof value !== 'string'){
                    return `'nome' deve ser uma string. Valor recebido: ${value}`;
                }else if(value.length > 70){
                    return `'nome' não deve conter mais do que 70 caracteres. Valor recebido: ${value}`;
                }
                break;
            case 'segunda':
                value.exercicios.forEach((element, index) => {
                    errorMessage = errorMessage + validateTrainingInDay(element, index, key)
                });
                break
            case 'terca':
                value.exercicios.forEach((element, index) => {
                    errorMessage = errorMessage + validateTrainingInDay(element, index, key)
                });
                break
            case 'quarta':
                value.exercicios.forEach((element, index) => {
                    errorMessage = errorMessage + validateTrainingInDay(element, index, key)
                });
                break
            case 'quinta':
                value.exercicios.forEach((element, index) => {
                    errorMessage = errorMessage + validateTrainingInDay(element, index, key)
                });
                break
            case'sexta':
                value.exercicios.forEach((element, index) => {
                    errorMessage = errorMessage + validateTrainingInDay(element, index, key)
                });
                break
            case'sabado':
                value.exercicios.forEach((element, index) => {
                    errorMessage = errorMessage + validateTrainingInDay(element, index, key)
                });
                break
            case 'domingo':
                value.exercicios.forEach((element, index) => {
                    errorMessage = errorMessage + validateTrainingInDay(element, index, key)
                });
                if (errorMessage.length > 0) {
                    return errorMessage;
                }
                break;
        }
        return null;
    }

    const errors = requiredKeys.map(key => validateKey(key, inputJson[key])).filter(error => error !== null);

    if (errors.length === 0) {
        return { success: true, errors: [] };
    } else {
        return { success: false, errors: errors };
    }
    
}
