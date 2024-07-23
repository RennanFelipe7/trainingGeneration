module.exports = function jsonHasCorrectEntries(requiredKeys, inputJson) {
    
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
                if (value !== 'iniciante' && value !== 'intermediário' && value !== 'avançado') {
                    return `'nivel_de_condicionamento_fisico' deve ser um dos valores: "iniciante" ou "intermediário" ou "avançado". Valor recebido: ${value}`;
                }
                break;
            case 'preferencias_de_exercicio':
                if (value.length > 10) {
                    return `'preferencias_de_exercicio' não deve conter mais do que 10 preferência. quantidade de preferência: ${value.length}`;
                }else if(value.some(item => typeof item !== 'string')){
                    return `'preferencias_de_exercicio' deve ser uma string. Valor recebido: ${value}`;
                }
                break;
            case 'restricoes_de_saude':
                if (value.length > 10) {
                    return `'restricoes_de_saude' não deve conter mais do que 10 restrições. quantidade de restrições: ${value.length}`;
                }else if(value.some(item => typeof item !== 'string')){
                    return `'restricoes_de_saude' deve ser uma string. Valor recebido: ${value}`;
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
                }
                break;
            case 'nome':
                if (typeof value !== 'string'){
                    return `'nome' deve ser uma string. Valor recebido: ${value}`;
                }else if(value.length > 70){
                    return `'nome' não deve conter mais do que 70 caracteres. Valor recebido: ${value}`;
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
