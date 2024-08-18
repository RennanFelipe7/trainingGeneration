let baseJson = require('./baseJson');

module.exports = function prompt(userInformationJson){
    return `A partir do JSON: ${JSON.stringify(userInformationJson)}, onde os valores das chaves foram fornecidos por um usuário, onde 
    a chave "peso" em kilograma é referente ao peso do usuário, a chave "biotipo_corporal" é referente ao biotipo corporal do usuário, a chave "objetivos_do_treino"
    é um array contendo todos os objetivos do treino que o usuário deseja alcançar, a chave "altura" em centímetros é referente a altura do usuário, 
    a chave "nivel_de_condicionamento_fisico" é referente ao nível de condicionamento fisíco do usuário, a chave "preferencias_de_exercicio" é um array contendo
    todas as partes do corpo que o usuário deseja dar foco, a chave "restricoes_de_saude" é um array contendo todas as restricões de saúde do usuário, a chave "disponibilidade"
    é um array referente aos dias da semana que o usuário tem disponível para por em prática o treino, a chave "idade" é referente a idade do usuário, a chave "sexo" é
    referente ao sexo do usuário, a chave "historico_de_lesoes" é um array contendo todo o histórico de lesões do usuário. Assim crie um treino físico para o mesmo
    com base nessas infomações, caso o usuário insira informações irrelevantes, então desconsidere, esse é o json base que você deve preencher:
    ${baseJson} onde você deve preencher apenas os valores para as chaves, se atente ao formato do mesmo, sendo assim feche todos as strings com aspas duplas,
    em hipótese alguma altere essas chaves. O valor das repetições deve ser inteiro e o valor da chave descanso deve ser retornado apenas a unidade e a medida, 
    como por exemplo 1 minuto. Responda somente com o json preenchido com seus respectivos valores, não responda mais nada a não ser o json. 
    Distribua os exercícios entre os dias inseridos respeitando a escolha do mesmo conforma os dias escolhidos na chave "disponibilidade", 
    caso o dia da semana não contenha exercício, retorne o array equivalente vazio.`
}
  