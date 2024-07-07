let baseJson = require('./baseJson');

module.exports = function prompt(userInformationJson){
    return `A partir do JSON: ${JSON.stringify(userInformationJson)}, onde os valores das chaves foram fornecidos por um usuário, crie um treino 
    físico com base nessas infomações, caso o usuário insira informações irrelevantes, então desconsidere, esse é o json base:
    ${baseJson} onde você deve preencher apenas os valores para as chaves, em hipótese alguma altere essas chaves. O valor das repetições deve ser inteiro
    e o valor da chave descanso deve ser retornado apenas a unidade e a medida, como por exemplo 1 minuto. Responda somente com
    o json preenchido com seus respectivos valores, não responda mais nada a não ser o json. Caso o dia da semana não contenha exercicio, retorne o array equivalente vazio`
}
  